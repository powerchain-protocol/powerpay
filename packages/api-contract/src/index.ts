export const POWERPAY_API_VERSION = '1.1' as const;
export const POWERPAY_PRODUCT_VERSION = '1.0.0' as const;

export const POWERPAY_HEADERS = {
  requestId: 'x-request-id',
  apiVersion: 'x-powerpay-api-version',
  cluster: 'x-powerpay-cluster',
  rpcProfile: 'x-powerpay-rpc-profile',
  suiNetwork: 'x-powerpay-sui-network',
  suiRpcProfile: 'x-powerpay-sui-rpc-profile',
  idempotencyKey: 'x-idempotency-key',
} as const;

export const API_ROUTES = {
  health: '/api/v1/health',
  ready: '/api/v1/ready',
  readiness: '/api/v1/readiness',
  capabilities: '/api/v1/capabilities',
  systemOverview: '/api/v1/system/overview',
  openApi: '/api/v1/openapi.json',
  rpcHealth: '/api/v1/rpc/health',
  programsVerify: '/api/v1/programs/verify',
  tokenMarket: '/api/v1/token/market',
  tokenMint: (mint: string) => `/api/v1/token/mint/${encodeURIComponent(mint)}`,
  solanaOverview: '/api/v1/solana/overview',
  solanaPrograms: '/api/v1/solana/programs',
  solanaMarket: '/api/v1/solana/market',
  solanaAsset: (mint: string) => `/api/v1/solana/assets/${encodeURIComponent(mint)}`,
  suiOverview: '/api/v1/sui/overview',
  suiPackages: '/api/v1/sui/packages',
  suiMarket: '/api/v1/sui/market',
  suiAsset: (coinType: string) => `/api/v1/sui/assets/${encodeURIComponent(coinType)}`,
  prices: '/api/v1/prices',
  account: '/api/v1/account',
  wallets: '/api/v1/wallets',
  activity: '/api/v1/activity',
  notifications: '/api/v1/notifications',
  solanaPortfolio: '/api/v1/portfolio/solana',
  paymentIntents: '/api/v1/payments/intents',
} as const;

export interface ApiErrorPayload {
  error: { code: string; message: string; details?: unknown };
  requestId?: string;
}

export interface ApiMeta {
  requestId?: string;
  observedAt?: string;
}

export type RpcProfile = 'managed' | 'custom' | 'public';
export type SolanaCluster = 'devnet' | 'mainnet-beta';
export type SuiNetwork = 'devnet' | 'testnet' | 'mainnet';

export interface PowerPayRequestContext {
  cluster?: SolanaCluster;
  rpcProfile?: RpcProfile;
  suiNetwork?: SuiNetwork;
  suiRpcProfile?: RpcProfile;
  requestId?: string;
}

export function createOpenApiDocument(origin = '/'): Record<string, unknown> {
  const read = (summary: string, parameters: unknown[] = []) => ({
    get: {
      summary,
      parameters,
      responses: {
        '200': { description: 'Successful PowerPay response' },
        '400': { description: 'Validation error' },
        '503': { description: 'Provider or configuration unavailable' },
      },
    },
  });
  const mintQuery = [{ name: 'mint', in: 'query', required: true, schema: { type: 'string' } }];
  const coinQuery = [{ name: 'coinType', in: 'query', required: true, schema: { type: 'string' } }];
  return {
    openapi: '3.1.0',
    info: {
      title: 'PowerPay API',
      version: POWERPAY_API_VERSION,
      description: 'Non-custodial payments plus Solana/Sui chain, program/package, asset, and market read APIs.',
    },
    servers: [{ url: origin }],
    paths: {
      [API_ROUTES.health]: read('Liveness'),
      [API_ROUTES.ready]: read('Deployment readiness'),
      [API_ROUTES.capabilities]: read('Effective PowerPay capabilities'),
      [API_ROUTES.systemOverview]: read('Safe provider and runtime overview'),
      [API_ROUTES.rpcHealth]: read('Solana RPC and cluster health'),
      [API_ROUTES.programsVerify]: read('Verify PowerPay and PowerChain program deployments'),
      [API_ROUTES.tokenMarket]: read('Resolve Solana token market data', mintQuery),
      '/api/v1/token/mint/{mint}': read('Inspect SPL or Token-2022 mint', [{ name: 'mint', in: 'path', required: true, schema: { type: 'string' } }]),
      [API_ROUTES.solanaOverview]: read('Solana overview'),
      [API_ROUTES.solanaPrograms]: read('Solana programs'),
      [API_ROUTES.solanaMarket]: read('Solana mint market data', mintQuery),
      '/api/v1/solana/assets/{mint}': read('Solana mint asset data', [{ name: 'mint', in: 'path', required: true, schema: { type: 'string' } }]),
      [API_ROUTES.suiOverview]: read('Sui overview'),
      [API_ROUTES.suiPackages]: read('Sui Move packages'),
      [API_ROUTES.suiMarket]: read('Sui coin market data', coinQuery),
      '/api/v1/sui/assets/{coinType}': read('Sui coin asset data', [{ name: 'coinType', in: 'path', required: true, schema: { type: 'string' } }]),
    },
    components: {
      securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } },
    },
  };
}
