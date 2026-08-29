import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const required = [
  'actions.json',
  'packages/api-contract/src/index.ts',
  'packages/api-client/src/index.ts',
  'apps/web/app/api/v1/health/route.ts',
  'apps/web/app/api/v1/ready/route.ts',
  'apps/web/app/api/v1/capabilities/route.ts',
  'apps/web/app/api/v1/system/overview/route.ts',
  'apps/web/app/api/v1/openapi.json/route.ts',
  'apps/web/app/status/page.tsx',
  'apps/mobile/app/profile/system.tsx',
  'scripts/check-public-env-secrets.mjs',
  'scripts/check-full-stack.mjs',
  '.github/workflows/powerpay-quality.yml',
  'docs/architecture/full-stack.md',
  'docs/api/openapi.md',
  'CHANGELOG.md',
  '.nvmrc',
  '.node-version',
  '.npmrc',
  'env/.env.example',
  'env/.env.local',
  'env/README.md',
  'scripts/check-runtime.mjs',
  'scripts/doctor-local.sh',
  'scripts/repair-macos-runtime.sh',
  'scripts/clean.mjs',
  'scripts/sync-env.mjs',
  'apps/backend/src/payments/engine.ts',
  'apps/backend/src/http/handler.ts',
  'components/services/src/solana/transaction-builder.ts',
  'components/services/src/solana/read-api.ts',
  'components/services/src/solana/jupiter-market.ts',
  'components/services/src/sui/read-api.ts',
  'components/services/src/sui/cetus-market.ts',
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
  'apps/web/app/api/v1/sui/overview/route.ts',
  'apps/web/app/api/v1/sui/packages/route.ts',
  'apps/web/app/api/v1/sui/market/route.ts',
  'apps/web/app/api/v1/sui/assets/[coinType]/route.ts',
  'apps/web/app/api/sui/overview/route.ts',
  'apps/web/app/api/sui/packages/route.ts',
  'apps/web/app/api/sui/market/route.ts',
  'apps/web/app/api/sui/assets/[coinType]/route.ts',
  'scripts/check-sui-api.mjs',
  'scripts/check-solana-api.mjs',
  'components/services/src/repositories/supabase-rest.ts',
  'apps/mobile/app/(tabs)/index.tsx',
  'apps/mobile/app/(tabs)/pay.tsx',
  'apps/mobile/app/(tabs)/scan.tsx',
  'apps/mobile/app/(tabs)/activity.tsx',
  'apps/mobile/app/(tabs)/wallet.tsx',
  'apps/mobile/app/checkout/[id].tsx',
  'apps/mobile/app/receipt/[id].tsx',
  'apps/mobile/app/(auth)/wallet-setup.tsx',
  'apps/mobile/app/(auth)/security-setup.tsx',
  'apps/mobile/app/(auth)/ready.tsx',
  'apps/mobile/providers/RecoveryProvider.tsx',
  'apps/mobile/app/profile/security/pin.tsx',
  'apps/mobile/hooks/useResponsive.ts',
  'apps/mobile/hooks/useCapabilities.ts',
  'docs/architecture/capabilities.md',
  'scripts/check-actions-manifest.mjs',
  'scripts/check-payment-invariants.mjs',
  'packages/payment-core/src/machine/payment-machine.ts',
  'packages/chain-adapters/src/index.ts',
  'packages/transaction-recovery/src/index.ts',
  'packages/qr/src/index.ts',
  'packages/fees/src/index.ts',
  'packages/ledger/src/index.ts',
  'packages/security/src/index.ts',
  'packages/oracle/src/index.ts',
  'packages/explorers/src/index.ts',
  'packages/capabilities/src/index.ts',
  'packages/program-clients/src/index.ts',
  'packages/database/prisma/schema.prisma',
  'programs/manifest/programs.json',
  'programs/solana/programs/powerpay-checkout/src/lib.rs',
  'programs/solana/programs/powerpay-settlement/src/lib.rs',
  'programs/sui/sources/payments.move',
  'programs/sui/deployments/devnet.json',
  'programs/sui/deployments/testnet.json',
  'programs/sui/deployments/mainnet.json',
  'docs/api/sui.md',
  'apps/web/public/assets/brand/powerpay-mark-green.png',
  'apps/web/public/assets/tokens/pwrc-coin.png',
  'packages/shared/src/assets.ts',
  'packages/ui/src/components/AssetIcon.tsx',
  'packages/ui/src/components/SelectDropdown.tsx',
  'packages/ui/src/components/StatusBadge.tsx',
  'apps/web/components/logo.tsx',
  'apps/web/components/network-rpc-controls.tsx',
  'apps/web/components/infrastructure-demo-card.tsx',
  'apps/web/lib/pricing/pyth.ts',
  'apps/web/utils/util.ts',
  'apps/web/lib/errors.ts',
  'apps/web/utils/helpers.tsx',
  'apps/web/components/topbar.tsx',
  'apps/web/components/header-wallet-connect.tsx',
  'apps/web/components/credit-card.tsx',
  'apps/web/components/onramp-form.tsx',
  'apps/web/components/brand-illustration-icon.tsx',
  'apps/web/app/product/page.tsx',
  'apps/web/pages/product.tsx',
  'apps/web/app/about/page.tsx',
  'apps/web/pages/about.tsx',
  'apps/web/pages/legals/legal-page.tsx',
  'apps/web/app/legal/privacy/page.tsx',
  'apps/web/app/checkout/card/page.tsx',
  'apps/web/app/checkout/onramp/page.tsx',
  'apps/web/app/api/funding/stripe/session/route.ts',
  'apps/web/app/api/funding/onramp/route.ts',
  'apps/mobile/components/ScanTabIcon.tsx',
  'apps/mobile/components/BrandedActionIcon.tsx',
  'apps/mobile/app/wallet/onramp.tsx',
  'scripts/restart-ios-simulator.sh',
];

const missing = required.filter((file) => !existsSync(resolve(root, file)));
if (missing.length) {
  console.error('Missing required files:\n' + missing.map((x) => `- ${x}`).join('\n'));
  process.exit(1);
}

const scan = readFileSync(resolve(root, 'apps/mobile/app/(tabs)/scan.tsx'), 'utf8');
for (const expected of ['CameraView', 'useCameraPermissions', 'onBarcodeScanned', 'powerPayApi.resolveQr']) {
  if (!scan.includes(expected)) throw new Error(`Scanner missing ${expected}`);
}

const checkout = readFileSync(resolve(root, 'apps/mobile/app/checkout/[id].tsx'), 'utf8');
for (const expected of ['createAttempt', 'markSigned', 'submit', 'reconcile', 'mobileRecoveryStore', 'NetInfo']) {
  if (!checkout.includes(expected)) throw new Error(`Checkout missing canonical execution stage ${expected}`);
}

const handler = readFileSync(resolve(root, 'apps/backend/src/http/handler.ts'), 'utf8');
for (const expected of ['API_ROUTES.readiness', 'API_ROUTES.ready', 'API_ROUTES.systemOverview', 'API_ROUTES.openApi', '/cancel', '/ledger']) {
  if (!handler.includes(expected)) throw new Error(`Backend missing hardened route ${expected}`);
}

const actions = JSON.parse(readFileSync(resolve(root, 'actions.json'), 'utf8'));
if (!Array.isArray(actions.rules) || !actions.rules.some((rule) => rule.pathPattern === '/api/actions/**')) throw new Error('actions.json missing idempotent API mapping');

const theme = readFileSync(resolve(root, 'apps/mobile/styles/theme.ts'), 'utf8');
for (const bp of ['phoneSmall', 'phone', 'phoneLarge', 'tablet', 'tabletLarge', 'desktop']) {
  if (!theme.includes(bp)) throw new Error(`Missing breakpoint ${bp}`);
}

console.log(`PowerPay structure check passed (${required.length} required files).`);
