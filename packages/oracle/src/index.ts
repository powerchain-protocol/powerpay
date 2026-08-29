export interface PriceQuote {
  base: string;
  quote: 'USD' | 'EUR';
  price: string;
  confidence?: string;
  source: 'pyth' | 'coingecko' | 'coinmarketcap' | 'fixed-stablecoin';
  observedAt: string;
  publishTime?: number;
  feedId?: string;
  transactional: boolean;
  expiresAt: string;
  metadata?: Record<string, string | number | boolean | null>;
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
    private readonly apiKey?: string,
    private readonly timeoutMs = 8_000,
  ) {}

  async getPrice(input: { base: string; quote: 'USD' | 'EUR' }): Promise<PriceQuote> {
    if (input.quote !== 'USD') throw new Error('Transactional Pyth conversion currently requires a configured USD feed');
    const feedId = this.feedIds[input.base];
    if (!feedId) throw new Error(`No Pyth feed configured for ${input.base}`);
    const url = new URL('/v2/updates/price/latest', this.hermesUrl);
    url.searchParams.append('ids[]', feedId);
    const headers: Record<string, string> = { accept: 'application/json' };
    if (this.apiKey) headers.authorization = `Bearer ${this.apiKey}`;
    const response = await fetchWithTimeout(url, { headers }, this.timeoutMs);
    if (!response.ok) throw new Error(`Pyth Hermes HTTP ${response.status}`);
    const body = await response.json() as { parsed?: Array<{ price?: { price?: string; conf?: string; expo?: number; publish_time?: number }; metadata?: { slot?: number } }> };
    const parsed = body.parsed?.[0];
    const item = parsed?.price;
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
      ...(typeof parsed?.metadata?.slot === 'number' ? { metadata: { slot: parsed.metadata.slot } } : {}),
    };
    validatePriceQuote(quote, this.policy);
    return quote;
  }
}

export class CoinGeckoReferenceProvider implements PriceProvider {
  constructor(private readonly baseUrl = 'https://api.coingecko.com/api/v3', private readonly apiKey?: string, private readonly timeoutMs = 8_000) {}
  async getPrice(input: { base: string; quote: 'USD' | 'EUR' }): Promise<PriceQuote> {
    const ids: Record<string, string> = { SOL: 'solana', SUI: 'sui', USDC: 'usd-coin', EURC: 'euro-coin' };
    const id = ids[input.base];
    if (!id) throw new Error(`No CoinGecko mapping for ${input.base}`);
    const url = new URL('/simple/price', this.baseUrl);
    url.searchParams.set('ids', id);
    url.searchParams.set('vs_currencies', input.quote.toLowerCase());
    url.searchParams.set('include_last_updated_at', 'true');
    const headers: Record<string, string> = { accept: 'application/json' };
    if (this.apiKey) headers['x-cg-pro-api-key'] = this.apiKey;
    const response = await fetchWithTimeout(url, { headers }, this.timeoutMs);
    if (!response.ok) throw new Error(`CoinGecko HTTP ${response.status}`);
    const body = await response.json() as Record<string, Record<string, number>>;
    const value = body[id]?.[input.quote.toLowerCase()];
    if (typeof value !== 'number' || value <= 0) throw new Error('CoinGecko response missing price');
    const updatedAt = body[id]?.last_updated_at;
    const observedAt = typeof updatedAt === 'number' && updatedAt > 0 ? new Date(updatedAt * 1000).toISOString() : new Date().toISOString();
    return { base: input.base, quote: input.quote, price: String(value), source: 'coingecko', observedAt, transactional: false, expiresAt: new Date(Date.now() + 60_000).toISOString() };
  }
}

export class CoinMarketCapReferenceProvider implements PriceProvider {
  constructor(private readonly baseUrl = 'https://pro-api.coinmarketcap.com', private readonly apiKey?: string, private readonly timeoutMs = 8_000) {}

  async getPrice(input: { base: string; quote: 'USD' | 'EUR' }): Promise<PriceQuote> {
    const symbol = input.base.toUpperCase();
    const url = new URL(this.apiKey ? '/v3/cryptocurrency/quotes/latest' : '/public-api/v3/cryptocurrency/quotes/latest', this.baseUrl);
    url.searchParams.set('symbol', symbol);
    url.searchParams.set('convert', input.quote);
    const headers: Record<string, string> = { accept: 'application/json' };
    if (this.apiKey) headers['X-CMC_PRO_API_KEY'] = this.apiKey;
    const response = await fetchWithTimeout(url, { headers }, this.timeoutMs);
    if (!response.ok) throw new Error(`CoinMarketCap HTTP ${response.status}`);
    const body = await response.json() as {
      data?: Array<{ id?: number; symbol?: string; last_updated?: string; quote?: Record<string, { price?: number; volume_24h?: number; market_cap?: number; percent_change_24h?: number; last_updated?: string }> }> | Record<string, unknown>;
    };
    const records = Array.isArray(body.data) ? body.data : Object.values(body.data ?? {}).flatMap((value) => Array.isArray(value) ? value : [value]) as Array<any>;
    const item = records.find((entry) => entry && typeof entry === 'object' && String(entry.symbol || '').toUpperCase() === symbol) ?? records[0];
    const market = item?.quote?.[input.quote];
    const price = market?.price;
    if (typeof price !== 'number' || !Number.isFinite(price) || price <= 0) throw new Error('CoinMarketCap response missing price');
    const observedAt = typeof market?.last_updated === 'string' ? market.last_updated : typeof item?.last_updated === 'string' ? item.last_updated : new Date().toISOString();
    return {
      base: input.base,
      quote: input.quote,
      price: String(price),
      source: 'coinmarketcap',
      observedAt,
      transactional: false,
      expiresAt: new Date(Date.now() + 60_000).toISOString(),
      metadata: {
        id: typeof item?.id === 'number' ? item.id : null,
        volume24h: typeof market?.volume_24h === 'number' ? market.volume_24h : null,
        marketCap: typeof market?.market_cap === 'number' ? market.market_cap : null,
        percentChange24h: typeof market?.percent_change_24h === 'number' ? market.percent_change_24h : null,
      },
    };
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


async function fetchWithTimeout(input: URL | string, init: RequestInit, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') throw new Error(`Market provider timed out after ${timeoutMs}ms`);
    throw error;
  } finally {
    clearTimeout(timer);
  }
}
