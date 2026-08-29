import type { SolanaAssetDefinition } from './transaction-builder';
import type { JupiterTokenMarketSnapshot } from './jupiter-market';

const BASE58 = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
const TOKEN_PROGRAM_ID = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
const TOKEN_2022_PROGRAM_ID = 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
const WRAPPED_SOL_MINT = 'So11111111111111111111111111111111111111112';

type RpcResponse<T> = { result?: T; error?: { code: number; message: string } };
type PriceLookup = (base: string, quote: 'USD' | 'EUR') => Promise<unknown>;
type JupiterMarketLookup = (mint: string) => Promise<JupiterTokenMarketSnapshot>;

export type SolanaProgramDomain = 'POWERPAY' | 'POWERCHAIN_FINANCE' | 'POWERCHAIN_FACTORY' | 'POWERCHAIN_LAUNCHPAD';

export interface SolanaProgramDefinition {
  name: 'checkout' | 'settlement' | 'merchant' | 'escrow' | 'receipt' | 'vault' | 'finance' | 'factory' | 'launchpad';
  domain?: SolanaProgramDomain;
  programId?: string;
  version: string;
  implemented: boolean;
  verificationMode?: 'LOCAL' | 'EXTERNAL';
  features: string[];
}

export interface SolanaReadServiceConfig {
  rpcUrl: string;
  cluster: 'mainnet-beta' | 'devnet';
  rpcProfile: 'managed' | 'custom' | 'public' | 'default';
  assets: SolanaAssetDefinition[];
  programs: SolanaProgramDefinition[];
  getPrices?: PriceLookup;
  getJupiterMarket?: JupiterMarketLookup;
  rpcProvider?: 'HELIUS' | 'CUSTOM' | 'SOLANA_PUBLIC' | 'UNKNOWN';
}

export interface SolanaOverview {
  network: 'SOLANA';
  cluster: 'mainnet-beta' | 'devnet';
  rpcProfile: 'managed' | 'custom' | 'public' | 'default';
  rpc: {
    healthy: boolean;
    provider: 'HELIUS' | 'CUSTOM' | 'SOLANA_PUBLIC' | 'UNKNOWN';
    health?: string;
    slot?: number;
    blockHeight?: number;
    version?: string;
    featureSet?: number;
    latestBlockhash?: string;
    lastValidBlockHeight?: number;
  };
  programs: { implemented: number; configured: number; active: number };
  assets: { configured: number; symbols: string[] };
  observedAt: string;
}

export interface SolanaProgramInfo {
  name: SolanaProgramDefinition['name'];
  domain: SolanaProgramDomain;
  version: string;
  programId: string | null;
  implemented: boolean;
  verificationMode: 'LOCAL' | 'EXTERNAL';
  status: 'NOT_IMPLEMENTED' | 'UNCONFIGURED' | 'ACTIVE' | 'INACTIVE' | 'UNAVAILABLE';
  executable: boolean | null;
  deploymentVerified: boolean;
  owner: string | null;
  lamports: number | null;
  dataLength: number | null;
  features: string[];
}

export interface SolanaAssetInfo {
  mint: string;
  network: 'SOLANA';
  cluster: 'mainnet-beta' | 'devnet';
  symbol: string | null;
  registered: boolean;
  tokenProgram: 'SPL' | 'TOKEN_2022' | 'UNKNOWN';
  tokenProgramId: string;
  decimals: number | null;
  supply: string | null;
  uiSupply: string | null;
  mintAuthority: string | null;
  freezeAuthority: string | null;
  initialized: boolean | null;
  extensions: string[];
  capabilities: {
    payments: boolean;
    swap: boolean;
    bridge: boolean;
  };
  observedAt: string;
}

export interface SolanaMarketInfo {
  mint: string;
  symbol: string | null;
  network: 'SOLANA';
  cluster: 'mainnet-beta' | 'devnet';
  registered: boolean;
  onChain: {
    supply: string | null;
    uiSupply: string | null;
    decimals: number | null;
    source: 'SOLANA_RPC_GET_TOKEN_SUPPLY';
  };
  market: {
    usdPrice: number | null;
    liquidityUsd: number | null;
    priceChange24h: number | null;
    priceBlockId: number | null;
    decimals: number | null;
    decimalsMatchOnChain: boolean | null;
    priceSource: 'JUPITER_PRICE_V3' | 'UNAVAILABLE';
    liquiditySource: 'JUPITER_TOKENS_V2' | 'UNAVAILABLE';
  };
  priceAvailable: boolean;
  quotes: {
    USD?: unknown;
    EUR?: unknown;
  };
  oracleResolution: {
    attempted: Array<'PYTH' | 'COINGECKO' | 'COINMARKETCAP'>;
    usdAvailable: boolean;
    eurAvailable: boolean;
  };
  observedAt: string;
}

export class SolanaReadService {
  constructor(private readonly config: SolanaReadServiceConfig) {
    if (!config.rpcUrl) throw new Error('Solana read service requires an RPC URL');
  }

  async overview(): Promise<SolanaOverview> {
    const [healthResult, slotResult, blockHeightResult, versionResult, blockhashResult, programsResult] = await Promise.allSettled([
      this.rpc<string>('getHealth'),
      this.rpc<number>('getSlot', [{ commitment: 'confirmed' }]),
      this.rpc<number>('getBlockHeight', [{ commitment: 'confirmed' }]),
      this.rpc<{ 'solana-core'?: string; 'feature-set'?: number }>('getVersion'),
      this.rpc<{ value?: { blockhash?: string; lastValidBlockHeight?: number } }>('getLatestBlockhash', [{ commitment: 'confirmed' }]),
      this.programs(),
    ]);

    const programs = programsResult.status === 'fulfilled' ? programsResult.value : [];
    const slot = fulfilled(slotResult);
    const blockHeight = fulfilled(blockHeightResult);
    const version = fulfilled(versionResult);
    const latest = fulfilled(blockhashResult)?.value;
    const health = fulfilled(healthResult);
    const healthy = Boolean(slot !== undefined && version !== undefined && latest?.blockhash);

    return {
      network: 'SOLANA',
      cluster: this.config.cluster,
      rpcProfile: this.config.rpcProfile,
      rpc: {
        healthy,
        provider: this.config.rpcProvider ?? 'UNKNOWN',
        ...(health !== undefined ? { health } : {}),
        ...(slot !== undefined ? { slot } : {}),
        ...(blockHeight !== undefined ? { blockHeight } : {}),
        ...(version?.['solana-core'] ? { version: version['solana-core'] } : {}),
        ...(typeof version?.['feature-set'] === 'number' ? { featureSet: version['feature-set'] } : {}),
        ...(latest?.blockhash ? { latestBlockhash: latest.blockhash } : {}),
        ...(typeof latest?.lastValidBlockHeight === 'number' ? { lastValidBlockHeight: latest.lastValidBlockHeight } : {}),
      },
      programs: {
        implemented: this.config.programs.filter((program) => program.implemented).length,
        configured: programs.filter((program) => Boolean(program.programId)).length,
        active: programs.filter((program) => program.status === 'ACTIVE').length,
      },
      assets: {
        configured: this.config.assets.length,
        symbols: this.config.assets.map((asset) => asset.asset),
      },
      observedAt: new Date().toISOString(),
    };
  }

  async programs(): Promise<SolanaProgramInfo[]> {
    return Promise.all(this.config.programs.map(async (program) => {
      const external = program.verificationMode === 'EXTERNAL';
      if (!program.programId) return programResult(program, program.implemented || external ? 'UNCONFIGURED' : 'NOT_IMPLEMENTED');
      if (!program.implemented && !external) return programResult(program, 'NOT_IMPLEMENTED');
      if (!BASE58.test(program.programId)) return programResult(program, 'UNAVAILABLE');

      try {
        const info = await this.rpc<{ value?: RpcAccountInfo | null }>('getAccountInfo', [program.programId, { encoding: 'base64', commitment: 'confirmed' }]);
        const account = info.value;
        if (!account) return programResult(program, 'INACTIVE', { executable: false });
        return programResult(program, account.executable ? 'ACTIVE' : 'INACTIVE', {
          executable: account.executable,
          owner: account.owner,
          lamports: account.lamports,
          dataLength: dataLength(account.data),
        });
      } catch {
        return programResult(program, 'UNAVAILABLE');
      }
    }));
  }

  async asset(mint: string): Promise<SolanaAssetInfo | null> {
    if (!BASE58.test(mint)) throw new Error('Invalid Solana mint address');
    const registered = this.assetDefinitionForMint(mint);

    const [accountResult, supplyResult] = await Promise.allSettled([
      this.rpc<{ value?: RpcAccountInfo | null }>('getAccountInfo', [mint, { encoding: 'jsonParsed', commitment: 'confirmed' }]),
      this.rpc<{ value?: { amount?: string; decimals?: number; uiAmountString?: string } }>('getTokenSupply', [mint, { commitment: 'confirmed' }]),
    ]);

    const account = accountResult.status === 'fulfilled' ? accountResult.value.value : null;
    if (!account) return null;
    const supply = supplyResult.status === 'fulfilled' ? supplyResult.value.value : undefined;
    const parsed = parsedMintInfo(account.data);
    const owner = account.owner || '';
    const tokenProgram = owner === TOKEN_2022_PROGRAM_ID ? 'TOKEN_2022' : owner === TOKEN_PROGRAM_ID ? 'SPL' : 'UNKNOWN';
    const decimals = numberOrNull(parsed?.decimals ?? supply?.decimals ?? registered?.decimals);

    return {
      mint,
      network: 'SOLANA',
      cluster: this.config.cluster,
      symbol: registered?.asset ?? (mint === WRAPPED_SOL_MINT ? 'SOL' : null),
      registered: Boolean(registered || mint === WRAPPED_SOL_MINT),
      tokenProgram,
      tokenProgramId: owner,
      decimals,
      supply: typeof supply?.amount === 'string' ? supply.amount : stringOrNull(parsed?.supply),
      uiSupply: typeof supply?.uiAmountString === 'string' ? supply.uiAmountString : null,
      mintAuthority: addressOrNull(parsed?.mintAuthority),
      freezeAuthority: addressOrNull(parsed?.freezeAuthority),
      initialized: typeof parsed?.isInitialized === 'boolean' ? parsed.isInitialized : null,
      extensions: extensionNames(parsed?.extensions),
      capabilities: {
        payments: Boolean(registered),
        swap: false,
        bridge: false,
      },
      observedAt: new Date().toISOString(),
    };
  }

  async market(mint: string): Promise<SolanaMarketInfo | null> {
    const asset = await this.asset(mint);
    if (!asset) return null;
    const symbol = asset.symbol;

    let jupiter: JupiterTokenMarketSnapshot | null = null;
    if (this.config.getJupiterMarket) {
      try { jupiter = await this.config.getJupiterMarket(mint); } catch { jupiter = null; }
    }

    const quotes: SolanaMarketInfo['quotes'] = {};
    // Oracle/reference resolution is independent from Jupiter market data. This keeps
    // Pyth, CoinGecko and CoinMarketCap provenance visible instead of relabeling them.
    if (symbol && this.config.getPrices) {
      try { quotes.USD = await this.config.getPrices(symbol, 'USD'); } catch { /* unavailable */ }
      try { quotes.EUR = await this.config.getPrices(symbol, 'EUR'); } catch { /* unavailable */ }
    }

    const jupiterDecimals = jupiter?.decimals ?? null;
    const decimalsMatchOnChain = asset.decimals === null || jupiterDecimals === null
      ? null
      : asset.decimals === jupiterDecimals;

    return {
      mint,
      symbol: symbol ?? jupiter?.metadata.symbol ?? null,
      network: 'SOLANA',
      cluster: this.config.cluster,
      registered: asset.registered,
      onChain: {
        supply: asset.supply,
        uiSupply: asset.uiSupply,
        decimals: asset.decimals,
        source: 'SOLANA_RPC_GET_TOKEN_SUPPLY',
      },
      market: {
        usdPrice: jupiter?.usdPrice ?? null,
        liquidityUsd: jupiter?.liquidityUsd ?? null,
        priceChange24h: jupiter?.priceChange24h ?? null,
        priceBlockId: jupiter?.priceBlockId ?? null,
        decimals: jupiterDecimals,
        decimalsMatchOnChain,
        priceSource: jupiter ? 'JUPITER_PRICE_V3' : 'UNAVAILABLE',
        liquiditySource: jupiter ? 'JUPITER_TOKENS_V2' : 'UNAVAILABLE',
      },
      priceAvailable: (jupiter?.usdPrice !== null && jupiter?.usdPrice !== undefined) || Boolean(quotes.USD),
      quotes,
      oracleResolution: {
        attempted: ['PYTH', 'COINGECKO', 'COINMARKETCAP'],
        usdAvailable: Boolean(quotes.USD),
        eurAvailable: Boolean(quotes.EUR),
      },
      observedAt: new Date().toISOString(),
    };
  }

  private assetDefinitionForMint(mint: string): SolanaAssetDefinition | undefined {
    return this.config.assets.find((asset) => asset.mint === mint);
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
      if (!response.ok) throw new Error(`Solana RPC HTTP ${response.status}`);
      const body = await response.json() as RpcResponse<T>;
      if (body.error) throw new Error(`Solana RPC ${body.error.code}: ${body.error.message}`);
      if (body.result === undefined) throw new Error(`Solana RPC returned no result for ${method}`);
      return body.result;
    } finally {
      clearTimeout(timer);
    }
  }
}

type RpcAccountInfo = {
  executable?: boolean;
  owner?: string;
  lamports?: number;
  data?: unknown;
};

function fulfilled<T>(result: PromiseSettledResult<T>): T | undefined {
  return result.status === 'fulfilled' ? result.value : undefined;
}

function programResult(
  program: SolanaProgramDefinition,
  status: SolanaProgramInfo['status'],
  account: Partial<Pick<SolanaProgramInfo, 'executable' | 'owner' | 'lamports' | 'dataLength'>> = {},
): SolanaProgramInfo {
  return {
    name: program.name,
    domain: program.domain ?? 'POWERPAY',
    version: program.version,
    programId: program.programId || null,
    implemented: program.implemented,
    verificationMode: program.verificationMode ?? 'LOCAL',
    status,
    executable: account.executable ?? null,
    deploymentVerified: status === 'ACTIVE' && account.executable === true,
    owner: account.owner ?? null,
    lamports: account.lamports ?? null,
    dataLength: account.dataLength ?? null,
    features: [...program.features],
  };
}

function dataLength(data: unknown): number | null {
  if (Array.isArray(data) && typeof data[0] === 'string') return Math.floor(data[0].length * 0.75);
  if (typeof data === 'string') return Math.floor(data.length * 0.75);
  return null;
}

function parsedMintInfo(data: unknown): Record<string, unknown> | null {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return null;
  const parsed = (data as Record<string, unknown>).parsed;
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null;
  const info = (parsed as Record<string, unknown>).info;
  return info && typeof info === 'object' && !Array.isArray(info) ? info as Record<string, unknown> : null;
}

function extensionNames(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) return [];
    const extension = (entry as Record<string, unknown>).extension;
    return typeof extension === 'string' ? [extension] : [];
  });
}

function numberOrNull(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null;
  const number = Number(value);
  return Number.isInteger(number) && number >= 0 ? number : null;
}

function stringOrNull(value: unknown): string | null {
  return typeof value === 'string' ? value : typeof value === 'number' && Number.isFinite(value) ? String(value) : null;
}

function addressOrNull(value: unknown): string | null {
  return typeof value === 'string' && BASE58.test(value) ? value : null;
}

export function isLikelySolanaMint(value: string): boolean {
  return BASE58.test(value);
}
