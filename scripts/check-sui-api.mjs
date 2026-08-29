import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const required = [
  'components/services/src/sui/read-api.ts',
  'components/services/src/sui/cetus-market.ts',
  'apps/web/app/api/v1/sui/overview/route.ts',
  'apps/web/app/api/v1/sui/packages/route.ts',
  'apps/web/app/api/v1/sui/market/route.ts',
  'apps/web/app/api/v1/sui/assets/[coinType]/route.ts',
  'apps/web/app/api/sui/overview/route.ts',
  'apps/web/app/api/sui/packages/route.ts',
  'apps/web/app/api/sui/market/route.ts',
  'apps/web/app/api/sui/assets/[coinType]/route.ts',
];
for (const file of required) if (!existsSync(resolve(root, file))) throw new Error(`Missing Sui API file: ${file}`);

const handler = readFileSync(resolve(root, 'apps/backend/src/http/handler.ts'), 'utf8');
for (const route of [
  '/api/v1/sui/overview',
  '/api/v1/sui/packages',
  '/api/v1/sui/market',
  'api\\/v1\\/sui\\/assets',
  '/api/sui/overview',
  '/api/sui/packages',
  '/api/sui/market',
  'api\\/sui\\/assets',
]) {
  if (!handler.includes(route)) throw new Error(`Backend handler missing ${route}`);
}
if (!handler.includes('packages: await deps.getSuiPackages()')) throw new Error('Sui package response must use packages key');
if (!handler.includes("deprecatedAlias: url.pathname.endsWith('/programs')")) throw new Error('Legacy /programs alias must be explicitly marked deprecated');

const api = readFileSync(resolve(root, 'apps/api/src/index.ts'), 'utf8');
for (const token of ['SuiReadService', 'CetusMarketClient', 'suiPackageDefinitions', 'getSuiOverview', 'getSuiPackages', 'getSuiMarket', 'getSuiAsset']) {
  if (!api.includes(token)) throw new Error(`API composition missing ${token}`);
}

const service = readFileSync(resolve(root, 'components/services/src/sui/read-api.ts'), 'utf8');
for (const method of ['sui_getChainIdentifier', 'sui_getLatestCheckpointSequenceNumber', 'suix_getLatestSuiSystemState', 'suix_getCoinMetadata', 'suix_getTotalSupply', 'sui_getObject']) {
  if (!service.includes(`'${method}'`)) throw new Error(`Sui read service missing RPC method ${method}`);
}

const cetus = readFileSync(resolve(root, 'components/services/src/sui/cetus-market.ts'), 'utf8');
for (const token of ['CETUS_POOLS_API', 'current_sqrt_price', 'liquidityUsd', 'priceChange24h']) {
  if (!cetus.includes(token)) throw new Error(`Cetus market adapter missing ${token}`);
}
if (cetus.includes('private key') || cetus.includes('mnemonic')) throw new Error('Read-only Cetus adapter must not contain wallet signing material');

console.log('PowerPay Sui API route contract passed (8 canonical/compatibility endpoints + deprecated legacy aliases).');
