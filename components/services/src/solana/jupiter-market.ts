const BASE58 = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

export interface JupiterMarketClientConfig {
  apiKey: string;
  baseUrl?: string;
  timeoutMs?: number;
}

export interface JupiterTokenMarketSnapshot {
  mint: string;
  usdPrice: number | null;
  liquidityUsd: number | null;
  priceChange24h: number | null;
  priceBlockId: number | null;
  decimals: number | null;
  metadata: {
    name: string | null;
    symbol: string | null;
    icon: string | null;
    verified: boolean | null;
    holderCount: number | null;
    marketCapUsd: number | null;
    fdvUsd: number | null;
  };
  sources: {
    price: 'JUPITER_PRICE_V3';
    liquidity: 'JUPITER_TOKENS_V2';
  };
  observedAt: string;
}

type PriceV3Record = {
  usdPrice?: unknown;
  blockId?: unknown;
  decimals?: unknown;
  priceChange24h?: unknown;
};

type TokenV2Record = {
  id?: unknown;
  name?: unknown;
  symbol?: unknown;
  icon?: unknown;
  decimals?: unknown;
  isVerified?: unknown;
  holderCount?: unknown;
  mcap?: unknown;
  fdv?: unknown;
  usdPrice?: unknown;
  priceBlockId?: unknown;
  liquidity?: unknown;
  stats24h?: { priceChange?: unknown } | null;
};

/**
 * Market-data adapter for Jupiter.
 *
 * Price API V3 is authoritative for price, price block, decimals and 24h change.
 * Tokens API V2 is used only for liquidity/metadata because Price V3 intentionally
 * does not expose a liquidity field.
 */
export class JupiterMarketClient {
  private readonly baseUrl: string;
  private readonly timeoutMs: number;

  constructor(private readonly config: JupiterMarketClientConfig) {
    if (!config.apiKey) throw new Error('Jupiter API key is required');
    this.baseUrl = (config.baseUrl || 'https://api.jup.ag').replace(/\/$/, '');
    this.timeoutMs = config.timeoutMs ?? 8_000;
  }

  async getTokenMarket(mint: string): Promise<JupiterTokenMarketSnapshot> {
    if (!BASE58.test(mint)) throw new Error('Invalid Solana mint address');

    const [priceResult, tokenResult] = await Promise.allSettled([
      this.getPriceV3(mint),
      this.getTokenV2(mint),
    ]);

    const price = priceResult.status === 'fulfilled' ? priceResult.value : null;
    const token = tokenResult.status === 'fulfilled' ? tokenResult.value : null;

    if (!price && !token) throw new Error('Jupiter market data unavailable');

    return {
      mint,
      usdPrice: finiteOrNull(price?.usdPrice ?? token?.usdPrice),
      liquidityUsd: finiteOrNull(token?.liquidity),
      priceChange24h: finiteOrNull(price?.priceChange24h ?? token?.stats24h?.priceChange),
      priceBlockId: integerOrNull(price?.blockId ?? token?.priceBlockId),
      decimals: integerOrNull(price?.decimals ?? token?.decimals),
      metadata: {
        name: stringOrNull(token?.name),
        symbol: stringOrNull(token?.symbol),
        icon: urlOrNull(token?.icon),
        verified: typeof token?.isVerified === 'boolean' ? token.isVerified : null,
        holderCount: integerOrNull(token?.holderCount),
        marketCapUsd: finiteOrNull(token?.mcap),
        fdvUsd: finiteOrNull(token?.fdv),
      },
      sources: {
        price: 'JUPITER_PRICE_V3',
        liquidity: 'JUPITER_TOKENS_V2',
      },
      observedAt: new Date().toISOString(),
    };
  }

  private async getPriceV3(mint: string): Promise<PriceV3Record | null> {
    const url = new URL(`${this.baseUrl}/price/v3`);
    url.searchParams.set('ids', mint);
    const body = await this.getJson<Record<string, PriceV3Record>>(url);
    return body[mint] ?? null;
  }

  private async getTokenV2(mint: string): Promise<TokenV2Record | null> {
    const url = new URL(`${this.baseUrl}/tokens/v2/search`);
    url.searchParams.set('query', mint);
    const body = await this.getJson<TokenV2Record[]>(url);
    if (!Array.isArray(body)) return null;
    return body.find((entry) => entry && entry.id === mint) ?? body[0] ?? null;
  }

  private async getJson<T>(url: URL): Promise<T> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);
    try {
      const response = await fetch(url, {
        headers: {
          accept: 'application/json',
          'x-api-key': this.config.apiKey,
        },
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`Jupiter HTTP ${response.status}`);
      return await response.json() as T;
    } finally {
      clearTimeout(timer);
    }
  }
}

function finiteOrNull(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function integerOrNull(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null;
  const number = Number(value);
  return Number.isSafeInteger(number) && number >= 0 ? number : null;
}

function stringOrNull(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function urlOrNull(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.toString() : null;
  } catch {
    return null;
  }
}
