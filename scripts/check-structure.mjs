import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const required = [
  'actions.json',
  'backend/src/payments/engine.ts',
  'backend/src/http/handler.ts',
  'services/src/solana/transaction-builder.ts',
  'services/src/repositories/supabase-rest.ts',
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
  'public/images/illustrations/agent-commerce.png',
  'public/icons/payment.png',
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

const handler = readFileSync(resolve(root, 'backend/src/http/handler.ts'), 'utf8');
for (const expected of ['/api/v1/readiness', '/cancel', '/ledger']) {
  if (!handler.includes(expected)) throw new Error(`Backend missing hardened route ${expected}`);
}

const actions = JSON.parse(readFileSync(resolve(root, 'actions.json'), 'utf8'));
if (!Array.isArray(actions.rules) || !actions.rules.some((rule) => rule.pathPattern === '/api/actions/**')) throw new Error('actions.json missing idempotent API mapping');

const theme = readFileSync(resolve(root, 'apps/mobile/styles/theme.ts'), 'utf8');
for (const bp of ['phoneSmall', 'phone', 'phoneLarge', 'tablet', 'tabletLarge', 'desktop']) {
  if (!theme.includes(bp)) throw new Error(`Missing breakpoint ${bp}`);
}

console.log(`PowerPay structure check passed (${required.length} required files).`);
