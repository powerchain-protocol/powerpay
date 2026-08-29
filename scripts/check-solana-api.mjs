import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const required = [
  'components/services/src/solana/read-api.ts',
  'components/services/src/solana/jupiter-market.ts',
  'components/services/src/oracle/router.ts',
  'packages/oracle/src/index.ts',
  'apps/web/lib/powerpay-read-proxy.ts',
  'apps/web/app/api/v1/rpc/health/route.ts',
  'apps/web/app/api/v1/programs/verify/route.ts',
  'apps/web/app/api/v1/token/mint/[mint]/route.ts',
  'apps/web/app/api/v1/token/market/route.ts',
  'apps/web/app/api/v1/solana/overview/route.ts',
  'apps/web/app/api/v1/solana/programs/route.ts',
  'apps/web/app/api/v1/solana/market/route.ts',
  'apps/web/app/api/v1/solana/assets/[mint]/route.ts',
  'apps/web/app/api/solana/overview/route.ts',
  'apps/web/app/api/token/market/route.ts',
  'apps/web/app/api/assets/[mint]/route.ts',
];
for (const file of required) if (!existsSync(resolve(root, file))) throw new Error(`Missing Solana API file: ${file}`);

const handler = readFileSync(resolve(root, 'apps/backend/src/http/handler.ts'), 'utf8');
for (const route of [
  '/api/v1/rpc/health',
  '/api/v1/programs/verify',
  'api\\/v1\\/token\\/mint',
  '/api/v1/token/market',
  '/api/v1/solana/overview',
  '/api/v1/solana/programs',
  '/api/v1/solana/market',
  'api\\/v1\\/solana\\/assets',
  '/api/solana/overview',
  '/api/token/market',
  'api\\/assets',
]) {
  if (!handler.includes(route)) throw new Error(`Backend handler missing ${route}`);
}
if (!handler.includes("url.pathname === '/api/token/market' ? deps.defaultSolanaMarketMint")) throw new Error('Compatibility /api/token/market must retain configured PWRC_MINT default behavior');
if (!handler.includes("mint is required for the canonical v1 market route")) throw new Error('Canonical /api/v1/token/market must require an explicit mint');

const api = readFileSync(resolve(root, 'apps/api/src/index.ts'), 'utf8');
for (const token of [
  'SolanaReadService', 'JupiterMarketClient', 'solanaProgramDefinitions', 'getSolanaOverview', 'getSolanaPrograms', 'getSolanaMarket', 'getSolanaAsset',
  'POWERCHAIN_FINANCE_PROGRAM_ID', 'POWERCHAIN_FACTORY_PROGRAM_ID', 'POWERCHAIN_LAUNCHPAD_PROGRAM_ID',
  'PYTH_API_KEY', 'COINMARKETCAP_API_KEY',
]) {
  if (!api.includes(token)) throw new Error(`API composition missing ${token}`);
}

const service = readFileSync(resolve(root, 'components/services/src/solana/read-api.ts'), 'utf8');
for (const method of ['getHealth', 'getSlot', 'getBlockHeight', 'getVersion', 'getLatestBlockhash', 'getAccountInfo', 'getTokenSupply']) {
  if (!service.includes(`'${method}'`)) throw new Error(`Solana read service missing RPC method ${method}`);
}
if (service.includes('HELIUS_API_KEY') || service.includes('CUSTOM_SOLANA_RPC_URL')) throw new Error('Read service must not own provider secrets');
for (const field of ['SOLANA_RPC_GET_TOKEN_SUPPLY', 'JUPITER_PRICE_V3', 'JUPITER_TOKENS_V2', 'liquidityUsd', 'priceChange24h', 'priceBlockId', 'oracleResolution']) {
  if (!service.includes(field)) throw new Error(`Solana market response missing ${field}`);
}

const oracle = readFileSync(resolve(root, 'packages/oracle/src/index.ts'), 'utf8');
for (const provider of ['PythHermesProvider', 'CoinGeckoReferenceProvider', 'CoinMarketCapReferenceProvider']) {
  if (!oracle.includes(provider)) throw new Error(`Oracle package missing ${provider}`);
}
for (const marker of ['authorization', 'X-CMC_PRO_API_KEY', '/v3/cryptocurrency/quotes/latest']) {
  if (!oracle.includes(marker)) throw new Error(`Oracle provider implementation missing ${marker}`);
}

const jupiter = readFileSync(resolve(root, 'components/services/src/solana/jupiter-market.ts'), 'utf8');
for (const path of ['/price/v3', '/tokens/v2/search', 'x-api-key']) {
  if (!jupiter.includes(path)) throw new Error(`Jupiter market adapter missing ${path}`);
}
console.log('PowerPay Solana API contract passed (11 endpoints: canonical RPC/program/mint/market + Solana routes + compatibility aliases; Helius/selected RPC, Pyth/CoinGecko/CoinMarketCap, Jupiter V3/V2).');
