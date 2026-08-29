import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const required = [
  'packages/api-contract/package.json',
  'packages/api-contract/src/index.ts',
  'packages/api-client/package.json',
  'packages/api-client/src/index.ts',
  'apps/web/app/api/v1/health/route.ts',
  'apps/web/app/api/v1/ready/route.ts',
  'apps/web/app/api/v1/capabilities/route.ts',
  'apps/web/app/api/v1/system/overview/route.ts',
  'apps/web/app/api/v1/openapi.json/route.ts',
  'apps/web/app/status/page.tsx',
  'apps/web/components/system-status-dashboard.tsx',
  'apps/mobile/app/profile/system.tsx',
  'scripts/check-public-env-secrets.mjs',
  'docs/architecture/full-stack.md',
  'docs/api/openapi.md',
  '.github/workflows/powerpay-quality.yml',
];
const missing = required.filter((file) => !existsSync(resolve(root, file)));
if (missing.length) throw new Error(`Full-stack upgrade is incomplete:\n${missing.map((file) => `- ${file}`).join('\n')}`);

const contract = readFileSync(resolve(root, 'packages/api-contract/src/index.ts'), 'utf8');
for (const route of ['/api/v1/ready', '/api/v1/system/overview', '/api/v1/openapi.json', '/api/v1/solana/overview', '/api/v1/sui/packages']) {
  if (!contract.includes(route)) throw new Error(`Shared API contract missing ${route}`);
}
const handler = readFileSync(resolve(root, 'apps/backend/src/http/handler.ts'), 'utf8');
for (const value of ['POWERPAY_API_VERSION', 'access-control-allow-origin', 'server-timing', 'ORIGIN_NOT_ALLOWED', 'createOpenApiDocument']) {
  if (!handler.includes(value)) throw new Error(`Backend edge hardening missing ${value}`);
}
const webProxy = readFileSync(resolve(root, 'apps/web/app/api/powerpay/[...path]/route.ts'), 'utf8');
for (const value of ['x-powerpay-sui-network', 'POWERPAY_API_TIMEOUT', 'AbortController', 'x-powerpay-api-version']) {
  if (!webProxy.includes(value) && !webProxy.includes(value.replace('x-powerpay-sui-network', 'POWERPAY_HEADERS.suiNetwork').replace('x-powerpay-api-version', 'POWERPAY_HEADERS.apiVersion'))) throw new Error(`Web BFF proxy missing ${value}`);
}
const mobile = readFileSync(resolve(root, 'apps/mobile/services/api.ts'), 'utf8');
if (!mobile.includes("from '@powerpay/api-client'")) throw new Error('Mobile must use the shared PowerPay API client.');
const web = readFileSync(resolve(root, 'apps/web/lib/powerpay-api.ts'), 'utf8');
if (!web.includes("from '@powerpay/api-client'")) throw new Error('Web must use the shared PowerPay API client.');
const wrangler = readFileSync(resolve(root, 'apps/api/wrangler.toml'), 'utf8');
for (const flag of ['FEATURE_VAULT = "false"', 'FEATURE_SWAPS = "false"']) if (!wrangler.includes(flag)) throw new Error(`Worker defaults must fail closed: ${flag}`);
console.log(`PowerPay full-stack contract check passed (${required.length} upgrade files).`);
