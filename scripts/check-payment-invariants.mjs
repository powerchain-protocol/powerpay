import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (file) => readFileSync(resolve(root, file), 'utf8');
const types = read('packages/payment-core/src/types.ts');
const expiry = read('packages/payment-core/src/intents/expire-intent.ts');
const engine = read('backend/src/payments/engine.ts');
const ledger = read('packages/ledger/src/index.ts');
const prisma = read('packages/database/prisma/schema.prisma');
const supabase = read('services/src/repositories/supabase-rest.ts');
const recovery = read('apps/mobile/services/recovery.ts');
const checkout = read('apps/mobile/app/checkout/[id].tsx');
const handler = read('backend/src/http/handler.ts');
const featureFlags = read('services/src/features/index.ts');
const swap = read('apps/mobile/app/swap.tsx');
const bridge = read('apps/mobile/app/bridge.tsx');
const vault = read('apps/mobile/app/vault.tsx');

const assertions = [
  [types.includes('idempotencyKey: string;') && types.includes('signedTransactionHash?: string;'), 'PaymentAttempt must bind idempotency and signed transaction fingerprint'],
  [ledger.includes('findAttemptByIdempotencyKey'), 'Repository contract must expose attempt idempotency lookup'],
  [engine.includes("PaymentEngineError('TRANSACTION_CONFLICT'") && engine.includes('hashSignedTransaction'), 'Engine must reject signed transaction substitution'],
  [engine.includes('cancelIntent(') && engine.includes("'RECOVERY_REQUIRED'"), 'Cancellation must refuse uncertain signed/submitted states'],
  [engine.includes('expirePaymentIntent') && engine.includes("type: 'EXPIRED'"), 'Intent expiry must be authoritative and ledgered'],
  [expiry.includes("['CREATED', 'LOCKED']") && !expiry.includes("'SIGNED', 'SUBMITTED'"), 'Automatic expiry must never guess about signed/submitted payments'],
  [prisma.includes('idempotencyKey  String               @unique') && prisma.includes('signedTransactionHash String?'), 'Prisma attempt must persist idempotency key + fingerprint'],
  [!prisma.includes('signedTransaction String'), 'Prisma must never persist raw signed transactions'],
  [supabase.includes('signedTransaction: undefined'), 'Supabase repository must strip raw signed transactions'],
  [recovery.includes("from 'expo-secure-store'") && recovery.includes('WHEN_UNLOCKED_THIS_DEVICE_ONLY'), 'Mobile signed transaction recovery must use SecureStore'],
  [checkout.includes('attemptRequestKey') && checkout.includes('createIdempotencyKey'), 'Checkout must reuse an attempt request idempotency key'],
  [handler.includes('/cancel') && handler.includes('/ledger'), 'HTTP API must expose authoritative cancel and timeline routes'],
  [featureFlags.includes("vault: enabled('FEATURE_VAULT', false)") && featureFlags.includes("swaps: enabled('FEATURE_SWAPS', false)"), 'Unfinished financial capabilities must default off'],
  [!swap.includes('0.8042') && !bridge.includes('499.92') && !vault.includes('$8,450.20'), 'Mobile protocol surfaces must not contain fabricated financial values'],
];
for (const [ok, message] of assertions) if (!ok) throw new Error(message);
console.log(`Payment invariant check passed (${assertions.length} invariants).`);
