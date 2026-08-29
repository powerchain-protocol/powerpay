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
  'packages/ui/src/components/StatusBadge.tsx',
  'packages/ui/src/components/SelectDropdown.tsx',
  'apps/web/lib/errors.ts',
  'apps/web/utils/util.ts',
  'apps/web/lib/pricing/pyth.ts',
  'apps/web/components/infrastructure-demo-card.tsx',
  'apps/web/components/network-rpc-controls.tsx',
  'apps/web/components/logo.tsx',
  'apps/web/components/topbar.tsx',
  'apps/web/components/header-wallet-connect.tsx',
  'apps/web/components/credit-card.tsx',
  'apps/web/components/onramp-form.tsx',
  'apps/web/components/brand-illustration-icon.tsx',
  'apps/web/app/product/page.tsx',
  'apps/web/pages/product.tsx',
  'apps/web/app/about/page.tsx',
  'apps/web/pages/legals/legal-page.tsx',
  'apps/web/app/legal/privacy/page.tsx',
  'apps/web/app/api/funding/stripe/session/route.ts',
  'apps/web/app/api/funding/onramp/route.ts',
  'apps/web/app/status/page.tsx',
  'apps/web/components/system-status-dashboard.tsx',
  'packages/api-client/src/index.ts',
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

if (!(source.includes('x-powerpay-cluster') || source.includes('POWERPAY_HEADERS.cluster')) || !(source.includes('x-powerpay-rpc-profile') || source.includes('POWERPAY_HEADERS.rpcProfile'))) throw new Error('Web checkout must carry explicit network/RPC preferences through the same-origin API boundary.');
if (!source.includes('Mainnet Beta') || !source.includes('Devnet')) throw new Error('Web experience must expose explicit Solana environment badges.');
if (!source.includes('2.00%') || !source.includes('Solana network fee')) throw new Error('Web experience must disclose the PowerPay service fee and separate Solana network fee.');
if (!source.includes('FAQ')) throw new Error('PowerPay website must include the FAQ surface.');


if (!source.includes("type PaymentMethod = 'wallet' | 'solana-pay' | 'stripe' | 'moonpay' | 'coinbase'")) throw new Error('Checkout must expose wallet, Solana Pay, Stripe, MoonPay, and Coinbase Pay methods.');
if (!source.includes('Enter a valid Solana recipient') || !source.includes('Recipient locks at review')) throw new Error('Web checkout must validate and lock the recipient before signature.');
if (!source.includes('STRIPE_SECRET_KEY') || !source.includes('https://api.stripe.com/v1/checkout/sessions')) throw new Error('Stripe card flow must create a server-side Checkout Session.');
if (!source.includes('MOONPAY_ONRAMP_URL') || !source.includes('COINBASE_PAY_ONRAMP_URL')) throw new Error('Onramp routes must remain provider-configured and fail closed.');
if (!source.includes('Privacy') || !source.includes('Terms') || !source.includes('Cookies')) throw new Error('Website must expose legal navigation.');
if (!source.includes('ProductPageContent') || !source.includes('phone-mockup') || !source.includes('dashboard-mockup')) throw new Error('Product page must include mobile and dashboard mockups.');
if (!source.includes('Preview mode') || !source.includes('Topbar')) throw new Error('Preview/deployment mode must live in the topbar.');

if (/PowerChain Mobile|Power the Future|Own the Change/.test(source)) throw new Error('Legacy reference-product branding leaked into PowerPay website source.');
console.log(`PowerPay web experience check passed (${required.length} required files).`);
