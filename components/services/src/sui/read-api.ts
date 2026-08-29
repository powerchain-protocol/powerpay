import { isLikelySuiCoinType, type CetusMarketSnapshot } from './cetus-market';

type RpcResponse<T> = { result?: T; error?: { code: number; message: string } };

export type SuiNetwork = 'mainnet' | 'testnet' | 'devnet';

export interface SuiPackageDefinition {
  name: 'payments' | 'checkout' | 'merchant' | 'vault' | 'bridge';
  packageId?: string;
  version: string;
  implemented: boolean;
  features: string[];
}

export interface SuiReadServiceConfig {
  rpcUrl: string;
  network: SuiNetwork;
  rpcProfile: 'managed' | 'custom' | 'public' | 'default';
  packages: SuiPackageDefinition[];
  knownCoins?: Record<string, { symbol: string; payments?: boolean; swap?: boolean; bridge?: boolean }>;
  getCetusMarket?: (coinType: string, decimals: number | null) => Promise<CetusMarketSnapshot>;
}

export interface SuiOverview {
  network: 'SUI';
  suiNetwork: SuiNetwork;
  rpcProfile: SuiReadServiceConfig['rpcProfile'];
  rpc: {
    healthy: boolean;
    chainIdentifier?: string;
    checkpoint?: string;
    epoch?: string;
    protocolVersion?: string;
    referenceGasPrice?: string;
  };
  packages: { implemented: number; configured: number; active: number };
  marketProvider: 'CETUS' | 'UNCONFIGURED';
  observedAt: string;
}

export interface SuiPackageInfo {
  name: SuiPackageDefinition['name'];
  version: string;
  packageId: string | null;
  implemented: boolean;
  status: 'NOT_IMPLEMENTED' | 'UNCONFIGURED' | 'ACTIVE' | 'INACTIVE' | 'UNAVAILABLE';
  objectType: string | null;
  digest: string | null;
  objectVersion: string | null;
  features: string[];
}

export interface SuiAssetInfo {
  coinType: string;
  network: 'SUI';
  suiNetwork: SuiNetwork;
  symbol: string | null;
  name: string | null;
  description: string | null;
  iconUrl: string | null;
  metadataObjectId: string | null;
  registered: boolean;
  decimals: number | null;
  totalSupply: string | null;
  capabilities: { payments: boolean; swap: boolean; bridge: boolean };
  observedAt: string;
}

export interface SuiMarketInfo {
  coinType: string;
  symbol: string | null;
  network: 'SUI';
  suiNetwork: SuiNetwork;
  registered: boolean;
  onChain: {
    totalSupply: string | null;
    decimals: number | null;
    source: 'SUI_RPC';
  };
  market: {
    usdPrice: number | null;
    liquidityUsd: number | null;
    liquidityRaw: string | null;
    priceChange24h: number | null;
    observedCheckpoint: string | null;
    poolCount: number;
    bestPoolId: string | null;
    source: 'CETUS_POOLS_API' | 'UNAVAILABLE';
  };
  priceAvailable: boolean;
  observedAt: string;
}

export class SuiReadService {
  constructor(private readonly config: SuiReadServiceConfig) {
    if (!config.rpcUrl) throw new Error('Sui read service requires an RPC URL');
  }

  async overview(): Promise<SuiOverview> {
    const [chainResult, checkpointResult, stateResult, packagesResult] = await Promise.allSettled([
      this.rpc<string>('sui_getChainIdentifier'),
      this.rpc<string>('sui_getLatestCheckpointSequenceNumber'),
      this.rpc<Record<string, unknown>>('suix_getLatestSuiSystemState'),
      this.packages(),
    ]);
    const chainIdentifier = fulfilled(chainResult);
    const checkpoint = fulfilled(checkpointResult);
    const state = fulfilled(stateResult);
    const packages = packagesResult.status === 'fulfilled' ? packagesResult.value : [];
    const healthy = Boolean(chainIdentifier && checkpoint !== undefined);

    return {
      network: 'SUI',
      suiNetwork: this.config.network,
      rpcProfile: this.config.rpcProfile,
      rpc: {
        healthy,
        ...(chainIdentifier ? { chainIdentifier } : {}),
        ...(checkpoint !== undefined ? { checkpoint } : {}),
        ...(stringValue(state?.epoch) ? { epoch: stringValue(state?.epoch)! } : {}),
        ...(stringValue(state?.protocolVersion) ? { protocolVersion: stringValue(state?.protocolVersion)! } : {}),
        ...(stringValue(state?.referenceGasPrice) ? { referenceGasPrice: stringValue(state?.referenceGasPrice)! } : {}),
      },
      packages: {
        implemented: this.config.packages.filter((entry) => entry.implemented).length,
        configured: packages.filter((entry) => Boolean(entry.packageId)).length,
        active: packages.filter((entry) => entry.status === 'ACTIVE').length,
      },
      marketProvider: this.config.getCetusMarket ? 'CETUS' : 'UNCONFIGURED',
      observedAt: new Date().toISOString(),
    };
  }

  async packages(): Promise<SuiPackageInfo[]> {
    return Promise.all(this.config.packages.map(async (entry) => {
      if (!entry.implemented) return packageResult(entry, 'NOT_IMPLEMENTED');
      if (!entry.packageId) return packageResult(entry, 'UNCONFIGURED');
      if (!isLikelySuiObjectId(entry.packageId)) return packageResult(entry, 'UNAVAILABLE');
      try {
        const response = await this.rpc<{ data?: Record<string, unknown> | null; error?: unknown }>('sui_getObject', [
          entry.packageId,
          { showType: true, showOwner: true, showContent: false, showDisplay: false, showBcs: true },
        ]);
        const data = response.data;
        if (!data) return packageResult(entry, 'INACTIVE');
        const type = stringValue(data.type);
        const bcs = isRecord(data.bcs) ? data.bcs : null;
        const active = type === 'package' || type === 'PACKAGE' || bcs?.dataType === 'package';
        return packageResult(entry, active ? 'ACTIVE' : 'INACTIVE', {
          objectType: type,
          digest: stringValue(data.digest),
          objectVersion: stringValue(data.version),
        });
      } catch {
        return packageResult(entry, 'UNAVAILABLE');
      }
    }));
  }

  async asset(coinType: string): Promise<SuiAssetInfo | null> {
    if (!isLikelySuiCoinType(coinType)) throw new Error('Invalid Sui coin type');
    const normalized = normalizeCoinType(coinType);
    const known = this.config.knownCoins?.[normalized];
    const [metadataResult, supplyResult] = await Promise.allSettled([
      this.rpc<Record<string, unknown> | null>('suix_getCoinMetadata', [coinType]),
      this.rpc<{ value?: unknown }>('suix_getTotalSupply', [coinType]),
    ]);
    const metadata = metadataResult.status === 'fulfilled' ? metadataResult.value : null;
    const supply = supplyResult.status === 'fulfilled' ? supplyResult.value : null;
    if (!metadata && !supply) return null;

    return {
      coinType,
      network: 'SUI',
      suiNetwork: this.config.network,
      symbol: stringValue(metadata?.symbol) ?? known?.symbol ?? null,
      name: stringValue(metadata?.name),
      description: stringValue(metadata?.description),
      iconUrl: httpsUrlOrNull(metadata?.iconUrl ?? metadata?.icon_url),
      metadataObjectId: stringValue(metadata?.id),
      registered: Boolean(known),
      decimals: integerOrNull(metadata?.decimals),
      totalSupply: stringValue(supply?.value),
      capabilities: {
        payments: Boolean(known?.payments),
        swap: Boolean(known?.swap),
        bridge: Boolean(known?.bridge),
      },
      observedAt: new Date().toISOString(),
    };
  }

  async market(coinType: string): Promise<SuiMarketInfo | null> {
    const asset = await this.asset(coinType);
    if (!asset) return null;
    const checkpointResult = await Promise.allSettled([this.rpc<string>('sui_getLatestCheckpointSequenceNumber')]);
    const checkpoint = checkpointResult[0].status === 'fulfilled' ? checkpointResult[0].value : null;
    let cetus: CetusMarketSnapshot | null = null;
    if (this.config.getCetusMarket) {
      try { cetus = await this.config.getCetusMarket(coinType, asset.decimals); } catch { cetus = null; }
    }

    return {
      coinType,
      symbol: asset.symbol,
      network: 'SUI',
      suiNetwork: this.config.network,
      registered: asset.registered,
      onChain: {
        totalSupply: asset.totalSupply,
        decimals: asset.decimals,
        source: 'SUI_RPC',
      },
      market: {
        usdPrice: cetus?.priceUsd ?? null,
        liquidityUsd: cetus?.liquidityUsd ?? null,
        liquidityRaw: cetus?.liquidityRaw ?? null,
        priceChange24h: cetus?.priceChange24h ?? null,
        observedCheckpoint: checkpoint,
        poolCount: cetus?.poolCount ?? 0,
        bestPoolId: cetus?.bestPoolId ?? null,
        source: cetus ? 'CETUS_POOLS_API' : 'UNAVAILABLE',
      },
      priceAvailable: cetus?.priceUsd !== null && cetus?.priceUsd !== undefined,
      observedAt: new Date().toISOString(),
    };
  }

  private async rpc<T>(method: string, params: unknown[] = []): Promise<T> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8_000);
    try {
      const response = await fetch(this.config.rpcUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({ jsonrpc: '2.0', id: crypto.randomUUID(), method, params }),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`Sui RPC HTTP ${response.status}`);
      const body = await response.json() as RpcResponse<T>;
      if (body.error) throw new Error(`Sui RPC ${body.error.code}: ${body.error.message}`);
      if (body.result === undefined) throw new Error(`Sui RPC returned no result for ${method}`);
      return body.result;
    } finally {
      clearTimeout(timer);
    }
  }
}

function packageResult(entry: SuiPackageDefinition, status: SuiPackageInfo['status'], values: Partial<SuiPackageInfo> = {}): SuiPackageInfo {
  return {
    name: entry.name,
    version: entry.version,
    packageId: entry.packageId || null,
    implemented: entry.implemented,
    status,
    objectType: values.objectType ?? null,
    digest: values.digest ?? null,
    objectVersion: values.objectVersion ?? null,
    features: [...entry.features],
  };
}

function fulfilled<T>(result: PromiseSettledResult<T>): T | undefined {
  return result.status === 'fulfilled' ? result.value : undefined;
}

function stringValue(value: unknown): string | null {
  return typeof value === 'string' && value.length ? value : typeof value === 'number' && Number.isFinite(value) ? String(value) : null;
}

function integerOrNull(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null;
  const number = Number(value);
  return Number.isSafeInteger(number) && number >= 0 ? number : null;
}

function httpsUrlOrNull(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.toString() : null;
  } catch {
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value));
}

function normalizeCoinType(value: string): string {
  const [address, module, type] = value.split('::');
  const normalizedAddress = `0x${address.replace(/^0x/i, '').replace(/^0+/, '') || '0'}`.toLowerCase();
  return `${normalizedAddress}::${module}::${type}`;
}

function isLikelySuiObjectId(value: string): boolean {
  return /^0x[0-9a-fA-F]{1,64}$/.test(value);
}
