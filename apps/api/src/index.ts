import { createBackendHandler, NonCustodialSettlementService, PaymentEngine } from '@powerpay/backend';
import { POWERPAY_API_VERSION, POWERPAY_HEADERS } from '@powerpay/api-contract';
import { SolanaChainAdapter } from '@powerpay/chain-adapters';
import {
  InMemoryPaymentRepository,
  SolanaPaymentTransactionBuilder,
  StaticMerchantDirectory,
  SupabaseMerchantDirectory,
  SupabaseRestPaymentRepository,
  defaultSolanaAssets,
  featureFlags,
  OracleRouter,
  type CheckoutRecord,
  JwksJwtAuthenticator,
  InMemoryAccountDirectory,
  SupabaseAccountDirectory,
  InMemoryNotificationDirectory,
  SupabaseNotificationDirectory,
  SolanaPortfolioService,
  SolanaReadService,
  JupiterMarketClient,
  SuiReadService,
  CetusMarketClient,
  type SolanaProgramDefinition,
  type SuiPackageDefinition,
} from '@powerpay/services';

interface Env {
  POWERPAY_ENV?: string;
  POWERPAY_PUBLIC_BASE_URL?: string;
  POWERPAY_ALLOWED_ORIGINS?: string;
  POWERPAY_RELEASE?: string;
  POWERPAY_COMMIT_SHA?: string;
  SOLANA_CLUSTER?: 'mainnet-beta' | 'devnet';
  HELIUS_API_KEY?: string;
  HELIUS_RPC_URL?: string;
  CUSTOM_SOLANA_RPC_URL?: string;
  JUPITER_API_KEY?: string;
  JUPITER_BASE_URL?: string;
  SUI_NETWORK?: 'mainnet' | 'testnet' | 'devnet';
  SUI_RPC_URL?: string;
  CUSTOM_SUI_RPC_URL?: string;
  CETUS_POOLS_URL?: string;
  SUI_USDC_COIN_TYPE?: string;
  SUI_USDT_COIN_TYPE?: string;
  WPWRC_COIN_TYPE?: string;
  USDC_MINT?: string;
  EURC_MINT?: string;
  PWRC_MINT?: string;
  PYTH_HERMES_URL?: string;
  PYTH_API_KEY?: string;
  PYTH_SOL_USD_FEED_ID?: string;
  PYTH_SUI_USD_FEED_ID?: string;
  PYTH_USDC_USD_FEED_ID?: string;
  PYTH_EURC_USD_FEED_ID?: string;
  PYTH_PWRC_USD_FEED_ID?: string;
  COINGECKO_API_KEY?: string;
  COINGECKO_BASE_URL?: string;
  COINMARKETCAP_API_KEY?: string;
  COINMARKETCAP_BASE_URL?: string;
  POWERPAY_FEE_TREASURY?: string;
  PAYMENT_QUOTE_HMAC_SECRET?: string;
  HELIUS_WEBHOOK_SECRET?: string;
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  FEATURE_ESCROW?: string;
  FEATURE_SUI_PAYMENTS?: string;
  FEATURE_BRIDGE?: string;
  FEATURE_VAULT?: string;
  FEATURE_SWAPS?: string;
  FEATURE_SOLANA_ACTIONS?: string;
  FEATURE_TOKEN_2022?: string;
  AUTH_REQUIRED?: string;
  CLERK_JWKS_URL?: string;
  CLERK_ISSUER?: string;
  CLERK_AUDIENCE?: string;
  DEMO_MERCHANT_ID?: string;
  DEMO_MERCHANT_NAME?: string;
  DEMO_MERCHANT_WALLET?: string;
  DEMO_CHECKOUT_ID?: string;
  DEMO_CHECKOUT_NONCE?: string;
  POWERPAY_CHECKOUT_PROGRAM_ID?: string;
  POWERPAY_SETTLEMENT_PROGRAM_ID?: string;
  POWERPAY_MERCHANT_PROGRAM_ID?: string;
  POWERPAY_ESCROW_PROGRAM_ID?: string;
  POWERPAY_RECEIPT_PROGRAM_ID?: string;
  POWERPAY_VAULT_PROGRAM_ID?: string;
  POWERCHAIN_FINANCE_PROGRAM_ID?: string;
  POWERCHAIN_FACTORY_PROGRAM_ID?: string;
  POWERCHAIN_LAUNCHPAD_PROGRAM_ID?: string;
  POWERPAY_SUI_PACKAGE_ID?: string;
  POWERPAY_SUI_CHECKOUT_PACKAGE_ID?: string;
  POWERPAY_SUI_MERCHANT_PACKAGE_ID?: string;
  POWERPAY_SUI_VAULT_PACKAGE_ID?: string;
  POWERPAY_SUI_BRIDGE_PACKAGE_ID?: string;
}

const developmentRepository = new InMemoryPaymentRepository();
const developmentAccounts = new InMemoryAccountDirectory();
const developmentNotifications = new InMemoryNotificationDirectory();

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const requestedCluster = request.headers.get('x-powerpay-cluster');
    if (requestedCluster && requestedCluster !== 'devnet' && requestedCluster !== 'mainnet-beta') {
      return configError(request, env, 'INVALID_CLUSTER', 'Unsupported Solana cluster selection.', 400);
    }
    if (requestedCluster && env.SOLANA_CLUSTER && requestedCluster !== env.SOLANA_CLUSTER) {
      return configError(request, env, 'CLUSTER_MISMATCH', `This PowerPay API deployment serves ${env.SOLANA_CLUSTER}; requested ${requestedCluster}.`, 409);
    }
    const requestedRpcProfile = request.headers.get('x-powerpay-rpc-profile');
    if (requestedRpcProfile && !['managed', 'custom', 'public'].includes(requestedRpcProfile)) {
      return configError(request, env, 'INVALID_RPC_PROFILE', 'Unsupported Solana RPC profile.', 400);
    }
    const requestedSuiNetwork = request.headers.get('x-powerpay-sui-network');
    if (requestedSuiNetwork && !['mainnet', 'testnet', 'devnet'].includes(requestedSuiNetwork)) {
      return configError(request, env, 'INVALID_SUI_NETWORK', 'Unsupported Sui network selection.', 400);
    }
    if (requestedSuiNetwork && env.SUI_NETWORK && requestedSuiNetwork !== env.SUI_NETWORK) {
      return configError(request, env, 'SUI_NETWORK_MISMATCH', `This PowerPay API deployment serves Sui ${env.SUI_NETWORK}; requested ${requestedSuiNetwork}.`, 409);
    }
    const requestedSuiRpcProfile = request.headers.get('x-powerpay-sui-rpc-profile');
    if (requestedSuiRpcProfile && !['managed', 'custom', 'public'].includes(requestedSuiRpcProfile)) {
      return configError(request, env, 'INVALID_SUI_RPC_PROFILE', 'Unsupported Sui RPC profile.', 400);
    }
    const repository = env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY
      ? new SupabaseRestPaymentRepository({ url: env.SUPABASE_URL, serviceRoleKey: env.SUPABASE_SERVICE_ROLE_KEY })
      : developmentRepository;

    if (env.POWERPAY_ENV === 'production' && repository === developmentRepository) {
      return configError(request, env, 'PERSISTENCE_REQUIRED', 'Production requires Supabase/PostgreSQL persistence.', 503);
    }

    const authRequired = env.AUTH_REQUIRED === 'true' || env.POWERPAY_ENV === 'production';
    const authenticator = env.CLERK_JWKS_URL ? new JwksJwtAuthenticator({ jwksUrl: env.CLERK_JWKS_URL, issuer: env.CLERK_ISSUER, audience: env.CLERK_AUDIENCE }) : undefined;
    if (authRequired && !authenticator) {
      return configError(request, env, 'AUTH_CONFIG_REQUIRED', 'Authenticated payment APIs require CLERK_JWKS_URL.', 503);
    }

    const persistent = Boolean(env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY);
    const accounts = persistent
      ? new SupabaseAccountDirectory(env.SUPABASE_URL!, env.SUPABASE_SERVICE_ROLE_KEY!)
      : developmentAccounts;
    const notifications = persistent
      ? new SupabaseNotificationDirectory(env.SUPABASE_URL!, env.SUPABASE_SERVICE_ROLE_KEY!)
      : developmentNotifications;
    const merchants = persistent
      ? new SupabaseMerchantDirectory(env.SUPABASE_URL!, env.SUPABASE_SERVICE_ROLE_KEY!)
      : new StaticMerchantDirectory(demoCheckouts(env));

    const rpcProfile = requestedRpcProfile as 'managed' | 'custom' | 'public' | null;
    const rpcUrl = resolveSolanaRpc(env, rpcProfile);
    const solanaAssets = defaultSolanaAssets(env);
    const builder = rpcUrl ? new SolanaPaymentTransactionBuilder({ rpcUrl, assets: solanaAssets }) : null;
    const solanaPortfolio = rpcUrl ? new SolanaPortfolioService(rpcUrl, solanaAssets) : null;
    const solanaAdapter = rpcUrl && builder ? new SolanaChainAdapter(rpcUrl, builder) : undefined;
    const suiRpcProfile = requestedSuiRpcProfile as 'managed' | 'custom' | 'public' | null;
    const suiRpcUrl = resolveSuiRpc(env, suiRpcProfile);
    const suiNetwork = env.SUI_NETWORK || 'devnet';

    const engine = new PaymentEngine({
      repository,
      nonceStore: repository,
      adapters: { SOLANA: solanaAdapter },
      settlement: new NonCustodialSettlementService(),
      feeTreasury: env.POWERPAY_FEE_TREASURY,
      merchantTrust: async (merchantId) => (await merchants.getMerchant(merchantId))?.trustStatus ?? 'UNVERIFIED',
      merchantName: async (merchantId) => (await merchants.getMerchant(merchantId))?.name,
      quoteSigner: env.PAYMENT_QUOTE_HMAC_SECRET ? (quote) => signQuote(quote, env.PAYMENT_QUOTE_HMAC_SECRET!) : undefined,
    });

    const publicBaseUrl = env.POWERPAY_PUBLIC_BASE_URL || new URL(request.url).origin;
    const oracle = new OracleRouter({
      hermesUrl: env.PYTH_HERMES_URL || 'https://pyth.dourolabs.app/hermes',
      pythApiKey: env.PYTH_API_KEY,
      pythFeedIds: {
        ...(env.PYTH_SOL_USD_FEED_ID ? { SOL: env.PYTH_SOL_USD_FEED_ID } : {}),
        ...(env.PYTH_SUI_USD_FEED_ID ? { SUI: env.PYTH_SUI_USD_FEED_ID } : {}),
        ...(env.PYTH_USDC_USD_FEED_ID ? { USDC: env.PYTH_USDC_USD_FEED_ID } : {}),
        ...(env.PYTH_EURC_USD_FEED_ID ? { EURC: env.PYTH_EURC_USD_FEED_ID } : {}),
        ...(env.PYTH_PWRC_USD_FEED_ID ? { PWRC: env.PYTH_PWRC_USD_FEED_ID } : {}),
      },
      coinGeckoApiKey: env.COINGECKO_API_KEY,
      coinGeckoBaseUrl: env.COINGECKO_BASE_URL,
      coinMarketCapApiKey: env.COINMARKETCAP_API_KEY,
      coinMarketCapBaseUrl: env.COINMARKETCAP_BASE_URL,
    });
    const jupiter = env.JUPITER_API_KEY ? new JupiterMarketClient({
      apiKey: env.JUPITER_API_KEY,
      baseUrl: env.JUPITER_BASE_URL,
    }) : null;
    const solanaRead = rpcUrl ? new SolanaReadService({
      rpcUrl,
      cluster: env.SOLANA_CLUSTER || 'devnet',
      rpcProfile: rpcProfile || 'default',
      rpcProvider: resolveSolanaRpcProvider(env, rpcProfile),
      assets: solanaAssets,
      programs: solanaProgramDefinitions(env),
      getPrices: (base, quote) => oracle.getPrices(base, quote),
      getJupiterMarket: jupiter ? (mint) => jupiter.getTokenMarket(mint) : undefined,
    }) : null;
    const cetus = suiRpcUrl && suiNetwork !== 'devnet' ? new CetusMarketClient({
      network: suiNetwork,
      poolsUrl: env.CETUS_POOLS_URL,
      stableCoinTypes: [env.SUI_USDC_COIN_TYPE, env.SUI_USDT_COIN_TYPE].filter((value): value is string => Boolean(value)),
    }) : null;
    const suiRead = suiRpcUrl ? new SuiReadService({
      rpcUrl: suiRpcUrl,
      network: suiNetwork,
      rpcProfile: suiRpcProfile || 'default',
      packages: suiPackageDefinitions(env),
      knownCoins: suiKnownCoins(env),
      getCetusMarket: cetus ? (coinType, decimals) => cetus.getTokenMarket(coinType, decimals) : undefined,
    }) : null;
    const requestedFeatures = featureFlags(env);
    // Effective capabilities are fail-closed. A rollout flag cannot enable a protocol
    // whose execution/reconciliation adapter is not present in this release.
    const effectiveFeatures = {
      ...requestedFeatures,
      escrow: false,
      suiPayments: false,
      bridge: false,
      vault: false,
      swaps: false,
      solanaActions: Boolean(solanaAdapter) && requestedFeatures.solanaActions,
      token2022: Boolean(env.PWRC_MINT) && requestedFeatures.token2022,
    };
    const handle = createBackendHandler({
      engine,
      merchants,
      nonceStore: repository,
      features: effectiveFeatures,
      publicBaseUrl,
      iconUrl: `${publicBaseUrl.replace(/\/$/, '')}/assets/brand/powerpay-mark-green.png`,
      allowedActionHosts: [new URL(publicBaseUrl).host],
      getPrices: (base, quote) => oracle.getPrices(base, quote),
      heliusWebhookSecret: env.HELIUS_WEBHOOK_SECRET,
      authenticator,
      authRequired,
      accounts,
      notifications,
      getSolanaPortfolio: solanaPortfolio ? (address) => solanaPortfolio.get(address) : undefined,
      getSolanaOverview: solanaRead ? () => solanaRead.overview() : undefined,
      getSolanaPrograms: solanaRead ? () => solanaRead.programs() : undefined,
      getSolanaMarket: solanaRead ? (mint) => solanaRead.market(mint) : undefined,
      getSolanaAsset: solanaRead ? (mint) => solanaRead.asset(mint) : undefined,
      defaultSolanaMarketMint: env.PWRC_MINT,
      getSuiOverview: suiRead ? () => suiRead.overview() : undefined,
      getSuiPackages: suiRead ? () => suiRead.packages() : undefined,
      getSuiMarket: suiRead ? (coinType) => suiRead.market(coinType) : undefined,
      getSuiAsset: suiRead ? (coinType) => suiRead.asset(coinType) : undefined,
      defaultSuiMarketCoinType: env.WPWRC_COIN_TYPE,
      readiness: () => ({
        environment: env.POWERPAY_ENV || 'development',
        persistence: persistent,
        authentication: !authRequired || Boolean(authenticator),
        solanaRpc: Boolean(rpcUrl),
        solanaReadApi: Boolean(solanaRead),
        solanaCluster: env.SOLANA_CLUSTER || 'devnet',
        rpcProfile: rpcProfile || 'default',
        heliusRpc: resolveSolanaRpcProvider(env, rpcProfile) === 'HELIUS',
        jupiterMarket: Boolean(jupiter),
        marketProviders: { pyth: Boolean(env.PYTH_API_KEY), coingecko: true, coinmarketcap: Boolean(env.COINMARKETCAP_API_KEY) },
        suiRpc: Boolean(suiRpcUrl),
        suiReadApi: Boolean(suiRead),
        suiNetwork,
        suiRpcProfile: suiRpcProfile || 'default',
        cetusMarket: Boolean(cetus),
        quoteSigning: Boolean(env.PAYMENT_QUOTE_HMAC_SECRET),
        feeTreasury: Boolean(env.POWERPAY_FEE_TREASURY),
        assets: { usdc: Boolean(env.USDC_MINT), eurc: Boolean(env.EURC_MINT), pwrc: Boolean(env.PWRC_MINT) },
        requestedFeatures,
        effectiveFeatures,
        programs: { checkout: Boolean(env.POWERPAY_CHECKOUT_PROGRAM_ID), settlement: Boolean(env.POWERPAY_SETTLEMENT_PROGRAM_ID) },
      }),
      systemOverview: () => ({
        product: 'PowerPay',
        release: env.POWERPAY_RELEASE || '1.0.0',
        apiVersion: POWERPAY_API_VERSION,
        commit: env.POWERPAY_COMMIT_SHA || null,
        environment: env.POWERPAY_ENV || 'development',
        runtime: 'cloudflare-workers',
        networks: {
          solana: { cluster: env.SOLANA_CLUSTER || 'devnet', rpcProfile: rpcProfile || 'default', provider: resolveSolanaRpcProvider(env, rpcProfile), configured: Boolean(rpcUrl) },
          sui: { network: suiNetwork, rpcProfile: suiRpcProfile || 'default', configured: Boolean(suiRpcUrl) },
        },
        providers: {
          helius: resolveSolanaRpcProvider(env, rpcProfile) === 'HELIUS',
          jupiter: Boolean(jupiter),
          pyth: Boolean(env.PYTH_API_KEY),
          coinGecko: Boolean(env.COINGECKO_API_KEY || env.COINGECKO_BASE_URL),
          coinMarketCap: Boolean(env.COINMARKETCAP_API_KEY),
          cetus: Boolean(cetus),
          supabase: persistent,
          clerk: Boolean(authenticator),
        },
        security: {
          authenticationRequired: authRequired,
          quoteSigning: Boolean(env.PAYMENT_QUOTE_HMAC_SECRET),
          feeTreasuryConfigured: Boolean(env.POWERPAY_FEE_TREASURY),
        },
      }),
      allowedOrigins: resolveAllowedOrigins(env, publicBaseUrl),
      allowDevelopmentIdentity: env.POWERPAY_ENV !== 'production' && !authRequired,
      assetForSolanaMint: (mint) => {
        if (!mint) return 'SOL';
        if (env.USDC_MINT && mint === env.USDC_MINT) return 'USDC';
        if (env.EURC_MINT && mint === env.EURC_MINT) return 'EURC';
        if (env.PWRC_MINT && mint === env.PWRC_MINT) return 'PWRC';
        return null;
      },
    });
    return handle(request);
  },
} satisfies ExportedHandler<Env>;

function solanaProgramDefinitions(env: Env): SolanaProgramDefinition[] {
  return [
    { name: 'checkout', domain: 'POWERPAY', programId: env.POWERPAY_CHECKOUT_PROGRAM_ID, version: '1.0.0', implemented: true, features: ['checkout', 'merchant-reference', 'expiry'] },
    { name: 'settlement', domain: 'POWERPAY', programId: env.POWERPAY_SETTLEMENT_PROGRAM_ID, version: '1.0.0', implemented: true, features: ['settlement', 'receipt', 'fee-routing'] },
    { name: 'merchant', domain: 'POWERPAY', programId: env.POWERPAY_MERCHANT_PROGRAM_ID, version: '1.0.0', implemented: false, features: ['merchant-registry'] },
    { name: 'escrow', domain: 'POWERPAY', programId: env.POWERPAY_ESCROW_PROGRAM_ID, version: '1.0.0', implemented: false, features: ['escrow', 'refunds', 'disputes'] },
    { name: 'receipt', domain: 'POWERPAY', programId: env.POWERPAY_RECEIPT_PROGRAM_ID, version: '1.0.0', implemented: false, features: ['immutable-receipts'] },
    { name: 'vault', domain: 'POWERPAY', programId: env.POWERPAY_VAULT_PROGRAM_ID, version: '1.0.0', implemented: false, features: ['vault', 'limits', 'approvals'] },
    { name: 'finance', domain: 'POWERCHAIN_FINANCE', programId: env.POWERCHAIN_FINANCE_PROGRAM_ID, version: '1.0.0', implemented: false, verificationMode: 'EXTERNAL', features: ['finance', 'treasury', 'capital'] },
    { name: 'factory', domain: 'POWERCHAIN_FACTORY', programId: env.POWERCHAIN_FACTORY_PROGRAM_ID, version: '1.0.0', implemented: false, verificationMode: 'EXTERNAL', features: ['factory', 'deployment-registry'] },
    { name: 'launchpad', domain: 'POWERCHAIN_LAUNCHPAD', programId: env.POWERCHAIN_LAUNCHPAD_PROGRAM_ID, version: '1.0.0', implemented: false, verificationMode: 'EXTERNAL', features: ['launchpad', 'token-launch'] },
  ];
}

function suiPackageDefinitions(env: Env): SuiPackageDefinition[] {
  return [
    { name: 'payments', packageId: env.POWERPAY_SUI_PACKAGE_ID, version: '1.0.0', implemented: true, features: ['payments', 'receipt'] },
    { name: 'checkout', packageId: env.POWERPAY_SUI_CHECKOUT_PACKAGE_ID, version: '1.0.0', implemented: false, features: ['checkout', 'expiry'] },
    { name: 'merchant', packageId: env.POWERPAY_SUI_MERCHANT_PACKAGE_ID, version: '1.0.0', implemented: false, features: ['merchant-registry'] },
    { name: 'vault', packageId: env.POWERPAY_SUI_VAULT_PACKAGE_ID, version: '1.0.0', implemented: false, features: ['vault', 'limits'] },
    { name: 'bridge', packageId: env.POWERPAY_SUI_BRIDGE_PACKAGE_ID, version: '1.0.0', implemented: false, features: ['bridge', 'reconciliation'] },
  ];
}

function suiKnownCoins(env: Env): Record<string, { symbol: string; payments?: boolean; swap?: boolean; bridge?: boolean }> {
  const coins: Record<string, { symbol: string; payments?: boolean; swap?: boolean; bridge?: boolean }> = {
    '0x2::sui::SUI': { symbol: 'SUI', payments: true, swap: true },
  };
  if (env.SUI_USDC_COIN_TYPE) coins[normalizeSuiCoinType(env.SUI_USDC_COIN_TYPE)] = { symbol: 'USDC', payments: true, swap: true, bridge: true };
  if (env.WPWRC_COIN_TYPE) coins[normalizeSuiCoinType(env.WPWRC_COIN_TYPE)] = { symbol: 'wPWRC', payments: true, swap: true, bridge: true };
  return coins;
}

function normalizeSuiCoinType(value: string): string {
  const [address, module, type] = value.split('::');
  if (!address || !module || !type) return value;
  const normalizedAddress = `0x${address.replace(/^0x/i, '').replace(/^0+/, '') || '0'}`.toLowerCase();
  return `${normalizedAddress}::${module}::${type}`;
}

function resolveSuiRpc(env: Env, profile: 'managed' | 'custom' | 'public' | null = null): string | undefined {
  const network = env.SUI_NETWORK || 'devnet';
  const publicRpc = `https://fullnode.${network}.sui.io:443`;
  if (profile === 'custom') return env.CUSTOM_SUI_RPC_URL;
  if (profile === 'public') return publicRpc;
  if (profile === 'managed') return env.SUI_RPC_URL || publicRpc;
  return env.SUI_RPC_URL || env.CUSTOM_SUI_RPC_URL || publicRpc;
}

function resolveSolanaRpcProvider(env: Env, profile: 'managed' | 'custom' | 'public' | null): 'HELIUS' | 'CUSTOM' | 'SOLANA_PUBLIC' | 'UNKNOWN' {
  if (profile === 'custom') return env.CUSTOM_SOLANA_RPC_URL ? 'CUSTOM' : 'UNKNOWN';
  if (profile === 'public') return 'SOLANA_PUBLIC';
  if (env.HELIUS_RPC_URL || env.HELIUS_API_KEY) return 'HELIUS';
  if (!profile && env.CUSTOM_SOLANA_RPC_URL) return 'CUSTOM';
  if ((env.POWERPAY_ENV || 'development') !== 'production' && env.SOLANA_CLUSTER === 'devnet') return 'SOLANA_PUBLIC';
  return 'UNKNOWN';
}

function resolveSolanaRpc(env: Env, profile: 'managed' | 'custom' | 'public' | null = null): string | undefined {
  const managed = () => {
    if (env.HELIUS_RPC_URL) return env.HELIUS_RPC_URL;
    if (env.HELIUS_API_KEY) {
      const cluster = env.SOLANA_CLUSTER === 'devnet' ? 'devnet' : 'mainnet';
      return `https://${cluster}.helius-rpc.com/?api-key=${encodeURIComponent(env.HELIUS_API_KEY)}`;
    }
    // Development-only fallback keeps the managed profile usable without exposing an RPC URL to the browser.
    if ((env.POWERPAY_ENV || 'development') !== 'production' && env.SOLANA_CLUSTER === 'devnet') return 'https://api.devnet.solana.com';
    return undefined;
  };

  if (profile === 'managed') return managed();
  if (profile === 'custom') return env.CUSTOM_SOLANA_RPC_URL;
  if (profile === 'public') {
    if ((env.POWERPAY_ENV || 'development') === 'production' || env.SOLANA_CLUSTER !== 'devnet') return undefined;
    return 'https://api.devnet.solana.com';
  }

  return managed()
    || env.CUSTOM_SOLANA_RPC_URL
    || ((env.POWERPAY_ENV || 'development') !== 'production' && env.SOLANA_CLUSTER === 'devnet' ? 'https://api.devnet.solana.com' : undefined);
}

function configError(request: Request, env: Env, code: string, message: string, status: number): Response {
  const requestId = request.headers.get(POWERPAY_HEADERS.requestId) || crypto.randomUUID();
  const headers = new Headers({ 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', [POWERPAY_HEADERS.requestId]: requestId, [POWERPAY_HEADERS.apiVersion]: POWERPAY_API_VERSION, 'x-content-type-options': 'nosniff', 'referrer-policy': 'no-referrer' });
  const origin = request.headers.get('origin');
  const publicBaseUrl = env.POWERPAY_PUBLIC_BASE_URL || new URL(request.url).origin;
  if (origin && resolveAllowedOrigins(env, publicBaseUrl).includes(origin)) {
    headers.set('access-control-allow-origin', origin);
    headers.set('access-control-allow-credentials', 'true');
    headers.set('vary', 'origin');
  }
  return new Response(JSON.stringify({ error: { code, message }, requestId }), { status, headers });
}

function resolveAllowedOrigins(env: Env, publicBaseUrl: string): string[] {
  const values = new Set<string>();
  try { values.add(new URL(publicBaseUrl).origin); } catch { /* validated elsewhere */ }
  for (const entry of (env.POWERPAY_ALLOWED_ORIGINS || '').split(',')) {
    const candidate = entry.trim();
    if (!candidate) continue;
    try { values.add(new URL(candidate).origin); } catch { /* ignore malformed optional origin */ }
  }
  if ((env.POWERPAY_ENV || 'development') !== 'production') values.add('http://localhost:3000');
  return [...values];
}

function demoCheckouts(env: Env): CheckoutRecord[] {
  if (!env.DEMO_MERCHANT_WALLET) return [];
  return [{
    id: env.DEMO_CHECKOUT_ID || 'demo-local-shop',
    merchant: {
      id: env.DEMO_MERCHANT_ID || 'demo-merchant',
      name: env.DEMO_MERCHANT_NAME || 'Demo Local Shop',
      trustStatus: 'VERIFIED',
      recipient: env.DEMO_MERCHANT_WALLET,
    },
    amount: '24.50',
    asset: 'USDC',
    network: 'SOLANA',
    reference: 'PP-DEMO-LOCAL-SHOP',
    nonce: env.DEMO_CHECKOUT_NONCE || 'demo-local-shop-nonce-v1',
    expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    multiUse: false,
  }];
}

async function signQuote(quote: unknown, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(JSON.stringify(quote)));
  return [...new Uint8Array(signature)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}
