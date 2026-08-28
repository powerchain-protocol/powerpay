import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const required = [
  'apps/web/app/page.tsx',
  'apps/web/app/checkout/page.tsx',
  'apps/web/app/api/powerpay/[...path]/route.ts',
  'apps/web/components/checkout-app.tsx',
  'apps/web/components/wallet-connect-modal.tsx',
  'apps/web/components/site-header.tsx',
  'apps/web/components/site-footer.tsx',
  'apps/web/lib/powerpay-api.ts',
  'apps/web/.env.example',
];
for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) throw new Error(`Missing PowerPay web file: ${file}`);
}
const files = required.filter((f) => /\.(ts|tsx)$/.test(f));
const source = files.map((f) => fs.readFileSync(path.join(root, f), 'utf8')).join('\n');
if (!source.includes("useState<CheckoutAsset>('USDC')")) throw new Error('PowerPay checkout must remain USDC-first.');
if (!source.includes('NEXT_PUBLIC_POWERPAY_DEMO_RECIPIENT')) throw new Error('Checkout must fail closed behind configured merchant recipient.');
if (!source.includes('/api/v1/payments/intents')) throw new Error('Web checkout must use the canonical payment-intent API.');
if (!source.includes('/reconcile')) throw new Error('Web checkout must reconcile submitted transactions before completion.');
if (!source.includes('WalletConnect') || !source.includes('Requires Reown project configuration')) throw new Error('WalletConnect must remain visibly capability-gated until configured.');
if (/PowerChain Mobile|Power the Future|Own the Change/.test(source)) throw new Error('Legacy reference-product branding leaked into PowerPay website source.');
console.log(`PowerPay web experience check passed (${required.length} required files).`);
