import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourcePath = resolve(root, 'env/.env.local');
const source = await readFile(sourcePath, 'utf8');

function select(prefixes, exact = []) {
  const exactSet = new Set(exact);
  return source.split(/\r?\n/).filter((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return true;
    const key = trimmed.split('=', 1)[0];
    return exactSet.has(key) || prefixes.some((prefix) => key.startsWith(prefix));
  }).join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

const outputs = [
  ['.env.local', source],
  ['apps/mobile/.env.local', select(['EXPO_PUBLIC_'])],
  ['apps/web/.env.local', select(['NEXT_PUBLIC_'], ['POWERPAY_API_URL','POWERPAY_API_URL_DEVNET','POWERPAY_API_URL_MAINNET_BETA','STRIPE_SECRET_KEY','MOONPAY_ONRAMP_URL','COINBASE_PAY_ONRAMP_URL'])],
  ['apps/api/.dev.vars', select([], [
    'POWERPAY_ENV','POWERPAY_PUBLIC_BASE_URL','POWERPAY_ALLOWED_ORIGINS','POWERPAY_RELEASE','POWERPAY_COMMIT_SHA','SOLANA_CLUSTER','HELIUS_API_KEY','HELIUS_RPC_URL','HELIUS_WS_URL','HELIUS_WEBHOOK_SECRET',
    'CUSTOM_SOLANA_RPC_URL','CUSTOM_SOLANA_WS_URL','JUPITER_API_KEY','JUPITER_BASE_URL','SUI_NETWORK','SUI_RPC_URL','CUSTOM_SUI_RPC_URL','CETUS_POOLS_URL','SUI_USDC_COIN_TYPE','SUI_USDT_COIN_TYPE','WPWRC_COIN_TYPE','USDC_MINT','EURC_MINT','PWRC_MINT','POWERPAY_FEE_TREASURY','PYTH_HERMES_URL',
    'PYTH_API_KEY','PYTH_SOL_USD_FEED_ID','PYTH_SUI_USD_FEED_ID','PYTH_USDC_USD_FEED_ID','PYTH_EURC_USD_FEED_ID','PYTH_PWRC_USD_FEED_ID','COINGECKO_API_KEY','COINGECKO_BASE_URL','COINMARKETCAP_API_KEY','COINMARKETCAP_BASE_URL','PAYMENT_QUOTE_HMAC_SECRET','AUTH_REQUIRED','CLERK_JWKS_URL',
    'CLERK_ISSUER','CLERK_AUDIENCE','CLERK_SECRET_KEY','BETTER_AUTH_SECRET','FIREBASE_PROJECT_ID','FIREBASE_API_KEY','SUPABASE_URL',
    'SUPABASE_ANON_KEY','SUPABASE_SERVICE_ROLE_KEY','DATABASE_URL','DIRECT_URL','SHADOW_DATABASE_URL','FEATURE_ESCROW','FEATURE_SUI_PAYMENTS',
    'FEATURE_BRIDGE','FEATURE_VAULT','FEATURE_SWAPS','FEATURE_SOLANA_ACTIONS','FEATURE_TOKEN_2022','DEMO_MERCHANT_ID','DEMO_MERCHANT_NAME',
    'DEMO_MERCHANT_WALLET','DEMO_CHECKOUT_ID','DEMO_CHECKOUT_NONCE','POWERPAY_CHECKOUT_PROGRAM_ID','POWERPAY_SETTLEMENT_PROGRAM_ID',
    'POWERPAY_MERCHANT_PROGRAM_ID','POWERPAY_ESCROW_PROGRAM_ID','POWERPAY_RECEIPT_PROGRAM_ID','POWERPAY_VAULT_PROGRAM_ID','POWERCHAIN_FINANCE_PROGRAM_ID','POWERCHAIN_FACTORY_PROGRAM_ID','POWERCHAIN_LAUNCHPAD_PROGRAM_ID','POWERPAY_SUI_PACKAGE_ID','POWERPAY_SUI_CHECKOUT_PACKAGE_ID','POWERPAY_SUI_MERCHANT_PACKAGE_ID','POWERPAY_SUI_VAULT_PACKAGE_ID','POWERPAY_SUI_BRIDGE_PACKAGE_ID'
  ])],
];

for (const [relative, content] of outputs) {
  const path = resolve(root, relative);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `# Generated from env/.env.local by pnpm env:sync.\n${content}`);
  console.log(`wrote ${relative}`);
}
