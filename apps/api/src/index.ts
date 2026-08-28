import { createBackendHandler, NonCustodialSettlementService, PaymentEngine } from '@powerpay/backend';
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
} from '@powerpay/services';

interface Env {
  POWERPAY_ENV?: string;
  POWERPAY_PUBLIC_BASE_URL?: string;
  SOLANA_CLUSTER?: 'mainnet-beta' | 'devnet';
  HELIUS_API_KEY?: string;
  HELIUS_RPC_URL?: string;
  CUSTOM_SOLANA_RPC_URL?: string;
  USDC_MINT?: string;
  EURC_MINT?: string;
  PWRC_MINT?: string;
  PYTH_HERMES_URL?: string;
  PYTH_SOL_USD_FEED_ID?: string;
  PYTH_SUI_USD_FEED_ID?: string;
  COINGECKO_API_KEY?: string;
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
}

const developmentRepository = new InMemoryPaymentRepository();
const developmentAccounts = new InMemoryAccountDirectory();
const developmentNotifications = new InMemoryNotificationDirectory();

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const repository = env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY
      ? new SupabaseRestPaymentRepository({ url: env.SUPABASE_URL, serviceRoleKey: env.SUPABASE_SERVICE_ROLE_KEY })
      : developmentRepository;

    if (env.POWERPAY_ENV === 'production' && repository === developmentRepository) {
      return new Response(JSON.stringify({ error: { code: 'PERSISTENCE_REQUIRED', message: 'Production requires Supabase/PostgreSQL persistence.' } }), { status: 503, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
    }

    const authRequired = env.AUTH_REQUIRED === 'true' || env.POWERPAY_ENV === 'production';
    const authenticator = env.CLERK_JWKS_URL ? new JwksJwtAuthenticator({ jwksUrl: env.CLERK_JWKS_URL, issuer: env.CLERK_ISSUER, audience: env.CLERK_AUDIENCE }) : undefined;
    if (authRequired && !authenticator) {
      return new Response(JSON.stringify({ error: { code: 'AUTH_CONFIG_REQUIRED', message: 'Authenticated payment APIs require CLERK_JWKS_URL.' } }), { status: 503, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
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

    const rpcUrl = resolveSolanaRpc(env);
    const solanaAssets = defaultSolanaAssets(env);
    const builder = rpcUrl ? new SolanaPaymentTransactionBuilder({ rpcUrl, assets: solanaAssets }) : null;
    const solanaPortfolio = rpcUrl ? new SolanaPortfolioService(rpcUrl, solanaAssets) : null;
    const solanaAdapter = rpcUrl && builder ? new SolanaChainAdapter(rpcUrl, builder) : undefined;

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
      hermesUrl: env.PYTH_HERMES_URL || 'https://hermes.pyth.network',
      pythFeedIds: {
        ...(env.PYTH_SOL_USD_FEED_ID ? { SOL: env.PYTH_SOL_USD_FEED_ID } : {}),
        ...(env.PYTH_SUI_USD_FEED_ID ? { SUI: env.PYTH_SUI_USD_FEED_ID } : {}),
      },
      coinGeckoApiKey: env.COINGECKO_API_KEY,
    });
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
      iconUrl: `${publicBaseUrl.replace(/\/$/, '')}/icons/payment.png`,
      allowedActionHosts: [new URL(publicBaseUrl).host],
      getPrices: (base, quote) => oracle.getPrices(base, quote),
      heliusWebhookSecret: env.HELIUS_WEBHOOK_SECRET,
      authenticator,
      authRequired,
      accounts,
      notifications,
      getSolanaPortfolio: solanaPortfolio ? (address) => solanaPortfolio.get(address) : undefined,
      readiness: () => ({
        environment: env.POWERPAY_ENV || 'development',
        persistence: persistent,
        authentication: !authRequired || Boolean(authenticator),
        solanaRpc: Boolean(rpcUrl),
        quoteSigning: Boolean(env.PAYMENT_QUOTE_HMAC_SECRET),
        feeTreasury: Boolean(env.POWERPAY_FEE_TREASURY),
        assets: { usdc: Boolean(env.USDC_MINT), eurc: Boolean(env.EURC_MINT), pwrc: Boolean(env.PWRC_MINT) },
        requestedFeatures,
        effectiveFeatures,
        programs: { checkout: Boolean(env.POWERPAY_CHECKOUT_PROGRAM_ID), settlement: Boolean(env.POWERPAY_SETTLEMENT_PROGRAM_ID) },
      }),
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

function resolveSolanaRpc(env: Env): string | undefined {
  if (env.HELIUS_RPC_URL) return env.HELIUS_RPC_URL;
  if (env.CUSTOM_SOLANA_RPC_URL) return env.CUSTOM_SOLANA_RPC_URL;
  if (env.HELIUS_API_KEY) {
    const cluster = env.SOLANA_CLUSTER === 'devnet' ? 'devnet' : 'mainnet';
    return `https://${cluster}.helius-rpc.com/?api-key=${encodeURIComponent(env.HELIUS_API_KEY)}`;
  }
  if ((env.POWERPAY_ENV || 'development') !== 'production' && env.SOLANA_CLUSTER === 'devnet') return 'https://api.devnet.solana.com';
  return undefined;
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
