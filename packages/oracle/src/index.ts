export interface PriceQuote {
  base: string;
  quote: 'USD' | 'EUR';
  price: string;
  confidence?: string;
  source: 'pyth' | 'coingecko' | 'fixed-stablecoin';
  observedAt: string;
  publishTime?: number;
  feedId?: string;
  transactional: boolean;
  expiresAt: string;
}

export interface PriceProvider {
  getPrice(input: { base: string; quote: 'USD' | 'EUR' }): Promise<PriceQuote>;
}

export interface OracleValidationPolicy {
  maxPriceAgeSeconds: number;
  maxConfidenceRatio?: number;
  quoteTtlSeconds: number;
}

export const DEFAULT_ORACLE_POLICY: OracleValidationPolicy = {
  maxPriceAgeSeconds: 30,
  maxConfidenceRatio: 0.02,
  quoteTtlSeconds: 30,
};

export function validatePriceQuote(quote: PriceQuote, policy: OracleValidationPolicy = DEFAULT_ORACLE_POLICY, now = Date.now()): void {
  const numericPrice = Number(quote.price);
  if (!Number.isFinite(numericPrice) || numericPrice <= 0) throw new Error('Oracle price is invalid');
  const observed = quote.publishTime ? quote.publishTime * 1000 : Date.parse(quote.observedAt);
  if (!Number.isFinite(observed) || now - observed > policy.maxPriceAgeSeconds * 1000) throw new Error('Oracle price is stale');
  if (quote.confidence && policy.maxConfidenceRatio !== undefined) {
    const confidence = Number(quote.confidence);
    if (Number.isFinite(confidence) && confidence / numericPrice > policy.maxConfidenceRatio) throw new Error('Oracle confidence interval is too wide');
  }
}

export class PythHermesProvider implements PriceProvider {
  constructor(
    private readonly hermesUrl: string,
    private readonly feedIds: Record<string, string>,
    private readonly policy: OracleValidationPolicy = DEFAULT_ORACLE_POLICY,
  ) {}

  async getPrice(input: { base: string; quote: 'USD' | 'EUR' }): Promise<PriceQuote> {
    if (input.quote !== 'USD') throw new Error('Transactional Pyth conversion currently requires a configured USD feed');
    const feedId = this.feedIds[input.base];
    if (!feedId) throw new Error(`No Pyth feed configured for ${input.base}`);
    const url = new URL('/v2/updates/price/latest', this.hermesUrl);
    url.searchParams.append('ids[]', feedId);
    const response = await fetch(url, { headers: { accept: 'application/json' } });
    if (!response.ok) throw new Error(`Pyth Hermes HTTP ${response.status}`);
    const body = await response.json() as { parsed?: Array<{ price?: { price?: string; conf?: string; expo?: number; publish_time?: number } }> };
    const item = body.parsed?.[0]?.price;
    if (!item?.price || item.expo === undefined || item.publish_time === undefined) throw new Error('Pyth response missing price data');
    const scale = Math.pow(10, item.expo);
    const price = String(Number(item.price) * scale);
    const confidence = item.conf ? String(Number(item.conf) * scale) : undefined;
    const observedAt = new Date(item.publish_time * 1000).toISOString();
    const quote: PriceQuote = {
      base: input.base,
      quote: input.quote,
      price,
      confidence,
      source: 'pyth',
      observedAt,
      publishTime: item.publish_time,
      feedId,
      transactional: true,
      expiresAt: new Date(Date.now() + this.policy.quoteTtlSeconds * 1000).toISOString(),
    };
    validatePriceQuote(quote, this.policy);
    return quote;
  }
}

export class CoinGeckoReferenceProvider implements PriceProvider {
  constructor(private readonly baseUrl = 'https://api.coingecko.com/api/v3', private readonly apiKey?: string) {}
  async getPrice(input: { base: string; quote: 'USD' | 'EUR' }): Promise<PriceQuote> {
    const ids: Record<string, string> = { SOL: 'solana', SUI: 'sui', USDC: 'usd-coin', EURC: 'euro-coin' };
    const id = ids[input.base];
    if (!id) throw new Error(`No CoinGecko mapping for ${input.base}`);
    const url = new URL('/simple/price', this.baseUrl);
    url.searchParams.set('ids', id);
    url.searchParams.set('vs_currencies', input.quote.toLowerCase());
    const headers: Record<string, string> = { accept: 'application/json' };
    if (this.apiKey) headers['x-cg-pro-api-key'] = this.apiKey;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`CoinGecko HTTP ${response.status}`);
    const body = await response.json() as Record<string, Record<string, number>>;
    const value = body[id]?.[input.quote.toLowerCase()];
    if (typeof value !== 'number' || value <= 0) throw new Error('CoinGecko response missing price');
    const observedAt = new Date().toISOString();
    return { base: input.base, quote: input.quote, price: String(value), source: 'coingecko', observedAt, transactional: false, expiresAt: new Date(Date.now() + 60_000).toISOString() };
  }
}

export class FixedStablecoinProvider implements PriceProvider {
  async getPrice(input: { base: string; quote: 'USD' | 'EUR' }): Promise<PriceQuote> {
    const supported = (input.base === 'USDC' && input.quote === 'USD') || (input.base === 'EURC' && input.quote === 'EUR');
    if (!supported) throw new Error('Fixed stablecoin provider only supports USDC/USD or EURC/EUR');
    const now = new Date();
    return { base: input.base, quote: input.quote, price: '1', source: 'fixed-stablecoin', observedAt: now.toISOString(), transactional: true, expiresAt: new Date(now.getTime() + 30_000).toISOString() };
  }
}
