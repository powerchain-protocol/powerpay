const SUI_COIN_TYPE = /^0x[0-9a-fA-F]{1,64}::[A-Za-z_][A-Za-z0-9_]*::[A-Za-z_][A-Za-z0-9_]*$/;

export interface CetusMarketClientConfig {
  network: 'mainnet' | 'testnet' | 'devnet';
  poolsUrl?: string;
  stableCoinTypes?: string[];
  timeoutMs?: number;
}

export interface CetusMarketSnapshot {
  coinType: string;
  priceUsd: number | null;
  liquidityUsd: number | null;
  liquidityRaw: string | null;
  priceChange24h: number | null;
  poolCount: number;
  bestPoolId: string | null;
  source: 'CETUS_POOLS_API';
  observedAt: string;
}

type CetusPoolRecord = Record<string, unknown>;

/**
 * Read-only Cetus market adapter.
 *
 * It intentionally treats CLMM `liquidity` as a raw protocol value, not USD.
 * USD liquidity is only returned when Cetus supplies an explicit USD field or
 * when it can be conservatively derived from a stablecoin pair's coin balances.
 */
export class CetusMarketClient {
  private readonly poolsUrl: string;
  private readonly stableCoinTypes: Set<string>;
  private readonly timeoutMs: number;

  constructor(private readonly config: CetusMarketClientConfig) {
    this.poolsUrl = config.poolsUrl || 'https://api-sui.cetus.zone/v2/sui/pools_info';
    this.stableCoinTypes = new Set((config.stableCoinTypes || []).map(normalizeCoinType));
    this.timeoutMs = config.timeoutMs ?? 8_000;
  }

  async getTokenMarket(coinType: string, tokenDecimals: number | null): Promise<CetusMarketSnapshot> {
    if (!SUI_COIN_TYPE.test(coinType)) throw new Error('Invalid Sui coin type');
    if (this.config.network === 'devnet') {
      return emptySnapshot(coinType);
    }

    const pools = await this.fetchPools();
    const normalizedTarget = normalizeCoinType(coinType);
    const matching = pools.filter((pool) => {
      const a = normalizeCoinType(readString(pool, ['coinTypeA', 'coin_type_a']) || '');
      const b = normalizeCoinType(readString(pool, ['coinTypeB', 'coin_type_b']) || '');
      return a === normalizedTarget || b === normalizedTarget;
    });

    if (!matching.length) return emptySnapshot(coinType);

    const enriched = matching.map((pool) => this.enrichPool(pool, normalizedTarget, tokenDecimals));
    const best = [...enriched].sort((a, b) => scorePool(b) - scorePool(a))[0];
    const liquidityUsdValues = enriched.map((entry) => entry.liquidityUsd).filter((value): value is number => value !== null && value >= 0);

    return {
      coinType,
      priceUsd: best?.priceUsd ?? null,
      liquidityUsd: liquidityUsdValues.length ? liquidityUsdValues.reduce((sum, value) => sum + value, 0) : null,
      liquidityRaw: best?.liquidityRaw ?? null,
      priceChange24h: best?.priceChange24h ?? null,
      poolCount: matching.length,
      bestPoolId: best?.poolId ?? null,
      source: 'CETUS_POOLS_API',
      observedAt: new Date().toISOString(),
    };
  }

  private enrichPool(pool: CetusPoolRecord, target: string, tokenDecimals: number | null) {
    const coinA = normalizeCoinType(readString(pool, ['coinTypeA', 'coin_type_a']) || '');
    const coinB = normalizeCoinType(readString(pool, ['coinTypeB', 'coin_type_b']) || '');
    const targetIsA = coinA === target;
    const other = targetIsA ? coinB : coinA;
    const decimalsA = integerOrNull(readValue(pool, ['coinDecimalsA', 'coin_decimals_a', 'decimalsA', 'decimals_a']))
      ?? (targetIsA ? tokenDecimals : this.stableCoinTypes.has(coinA) ? 6 : null);
    const decimalsB = integerOrNull(readValue(pool, ['coinDecimalsB', 'coin_decimals_b', 'decimalsB', 'decimals_b']))
      ?? (!targetIsA ? tokenDecimals : this.stableCoinTypes.has(coinB) ? 6 : null);
    const resolvedTargetDecimals = targetIsA ? decimalsA : decimalsB;
    const otherDecimals = targetIsA ? decimalsB : decimalsA;

    let priceUsd = finiteOrNull(readValue(pool, targetIsA
      ? ['coinAPriceUsd', 'coin_a_price_usd', 'priceAUsd', 'price_a_usd']
      : ['coinBPriceUsd', 'coin_b_price_usd', 'priceBUsd', 'price_b_usd']));

    if (priceUsd === null) {
      const genericPrice = finiteOrNull(readValue(pool, ['priceUsd', 'price_usd', 'currentPriceUsd', 'current_price_usd']));
      if (genericPrice !== null) priceUsd = genericPrice;
    }

    if (priceUsd === null && this.stableCoinTypes.has(other) && resolvedTargetDecimals !== null && otherDecimals !== null) {
      const sqrt = readString(pool, ['current_sqrt_price', 'currentSqrtPrice']);
      const bPerA = sqrt && decimalsA !== null && decimalsB !== null ? sqrtPriceX64ToPrice(sqrt, decimalsA, decimalsB) : null;
      if (bPerA !== null && bPerA > 0) priceUsd = targetIsA ? bPerA : 1 / bPerA;
    }

    let liquidityUsd = finiteOrNull(readValue(pool, ['tvlUsd', 'tvl_usd', 'tvlInUsd', 'tvl_in_usd', 'liquidityUsd', 'liquidity_usd']));
    if (liquidityUsd === null && this.stableCoinTypes.has(other) && priceUsd !== null && resolvedTargetDecimals !== null && otherDecimals !== null) {
      const targetAmountRaw = readString(pool, targetIsA ? ['coinAmountA', 'coin_amount_a'] : ['coinAmountB', 'coin_amount_b']);
      const stableAmountRaw = readString(pool, targetIsA ? ['coinAmountB', 'coin_amount_b'] : ['coinAmountA', 'coin_amount_a']);
      const targetAmount = rawToUi(targetAmountRaw, resolvedTargetDecimals);
      const stableAmount = rawToUi(stableAmountRaw, otherDecimals);
      if (targetAmount !== null && stableAmount !== null) liquidityUsd = targetAmount * priceUsd + stableAmount;
    }

    const priceChange24h = finiteOrNull(readValue(pool, [
      'priceChange24h', 'price_change_24h', 'change24h', 'change_24h',
      'priceChange24H', 'price_change_24_h',
    ]));

    return {
      poolId: readString(pool, ['poolAddress', 'pool_address', 'poolId', 'pool_id', 'id']),
      priceUsd,
      liquidityUsd,
      liquidityRaw: readString(pool, ['liquidity']),
      priceChange24h,
    };
  }

  private async fetchPools(): Promise<CetusPoolRecord[]> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);
    try {
      const response = await fetch(this.poolsUrl, { headers: { accept: 'application/json' }, signal: controller.signal });
      if (!response.ok) throw new Error(`Cetus pools HTTP ${response.status}`);
      const body = await response.json() as unknown;
      return extractPoolArray(body);
    } finally {
      clearTimeout(timer);
    }
  }
}

function emptySnapshot(coinType: string): CetusMarketSnapshot {
  return {
    coinType,
    priceUsd: null,
    liquidityUsd: null,
    liquidityRaw: null,
    priceChange24h: null,
    poolCount: 0,
    bestPoolId: null,
    source: 'CETUS_POOLS_API',
    observedAt: new Date().toISOString(),
  };
}

function extractPoolArray(value: unknown): CetusPoolRecord[] {
  if (Array.isArray(value)) return value.filter(isRecord);
  if (!isRecord(value)) return [];
  for (const key of ['pools', 'lp_list', 'list', 'items']) {
    const candidate = value[key];
    if (Array.isArray(candidate)) return candidate.filter(isRecord);
  }
  if ('data' in value) return extractPoolArray(value.data);
  return [];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value));
}

function normalizeCoinType(value: string): string {
  if (!value) return '';
  const [address, module, type] = value.split('::');
  if (!address || !module || !type) return value.toLowerCase();
  const normalizedAddress = `0x${address.replace(/^0x/i, '').replace(/^0+/, '') || '0'}`.toLowerCase();
  return `${normalizedAddress}::${module}::${type}`;
}

function readValue(record: CetusPoolRecord, keys: string[]): unknown {
  for (const key of keys) if (record[key] !== undefined && record[key] !== null) return record[key];
  return null;
}

function readString(record: CetusPoolRecord, keys: string[]): string | null {
  const value = readValue(record, keys);
  return typeof value === 'string' && value.trim() ? value.trim() : typeof value === 'number' && Number.isFinite(value) ? String(value) : null;
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

function rawToUi(value: string | null, decimals: number): number | null {
  if (!value || !/^\d+$/.test(value)) return null;
  const number = Number(value);
  if (!Number.isFinite(number)) return null;
  return number / 10 ** decimals;
}

function sqrtPriceX64ToPrice(raw: string, decimalsA: number, decimalsB: number): number | null {
  if (!/^\d+$/.test(raw)) return null;
  const sqrt = Number(raw);
  if (!Number.isFinite(sqrt) || sqrt <= 0) return null;
  const q64 = 18446744073709551616;
  const ratio = sqrt / q64;
  const price = ratio * ratio * 10 ** (decimalsA - decimalsB);
  return Number.isFinite(price) && price > 0 ? price : null;
}

function scorePool(pool: { liquidityUsd: number | null; priceUsd: number | null; liquidityRaw: string | null }): number {
  if (pool.liquidityUsd !== null) return 1e15 + pool.liquidityUsd;
  if (pool.priceUsd !== null) return 1e12 + Number(pool.liquidityRaw || 0);
  return Number(pool.liquidityRaw || 0);
}

export function isLikelySuiCoinType(value: string): boolean {
  return SUI_COIN_TYPE.test(value);
}
