import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const required = [
  'assets/source/user-brand/manifest.json',
  'assets/source/user-brand/README.md',
  'scripts/import-user-brand-assets.mjs',
  'scripts/sync-web3icons.mjs',
  'apps/web/public/assets/manifest.json',
  'apps/web/public/assets/WEB3ICONS.md',
  'apps/web/public/assets/brand/powerpay-mark.png',
  'apps/web/public/assets/brand/powerpay-mark-green.png',
  'apps/web/public/assets/brand/powerpay-mark-white.png',
  'apps/web/public/assets/brand/powerpay-mark-dark.png',
  'apps/web/public/assets/brand/powerpay-mark-green.svg',
  'apps/web/public/assets/brand/powerpay-logo.svg',
  'apps/web/public/assets/brand/powerpay-logo.png',
  'apps/web/public/assets/brand/powerpay-logo-light.png',
  'apps/web/public/assets/brand/powerpay-logo-dark.png',
  'apps/web/public/assets/brand/powerchain-logo.png',
  'apps/web/public/assets/brand/powerchain-mark-green.png',
  'apps/web/public/assets/brand/powerchain-mark-white.png',
  'apps/web/public/assets/brand/powerchain-mark-dark.png',
  'apps/web/public/assets/tokens/pwrc-coin.png',
  'apps/web/public/assets/tokens/pwrc-coin@2x.png',
  'apps/web/public/assets/tokens/pwrc-mark.png',
  'apps/web/public/assets/tokens/pwrc-mark.svg',
  'apps/web/public/assets/tokens/wpwrc-coin.png',
  'apps/web/public/assets/tokens/wpwrc-coin@2x.png',
  'apps/web/public/assets/tokens/wpwrc-mark.png',
  'apps/web/public/assets/tokens/usdc.svg',
  'apps/web/public/assets/tokens/eurc.svg',
  'apps/web/public/assets/tokens/sol.svg',
  'apps/web/public/assets/tokens/sui.svg',
  'apps/web/public/assets/networks/solana.svg',
  'apps/web/public/assets/networks/sui.svg',
  'apps/web/public/icons/wallets/phantom.svg',
  'apps/web/public/icons/wallets/solflare.svg',
  'apps/web/public/icons/wallets/backpack.svg',
  'apps/web/public/icons/wallets/wallet-connect.svg',
  'apps/web/public/icons/navigation/home.svg',
  'apps/web/public/icons/navigation/pay.svg',
  'apps/web/public/icons/navigation/scan.svg',
  'apps/web/public/icons/navigation/activity.svg',
  'apps/web/public/icons/navigation/wallet.svg',
  'apps/web/public/icons/actions/send.svg',
  'apps/web/public/icons/actions/receive.svg',
  'apps/web/public/icons/actions/swap.svg',
  'apps/web/public/icons/actions/bridge.svg',
  'apps/web/public/icons/actions/copy.svg',
  'apps/web/public/icons/security/shield.svg',
  'apps/web/public/icons/security/lock.svg',
  'apps/web/public/icons/security/verified.svg',
  'apps/web/public/images/illustrations/payment-success.svg',
  'apps/web/public/images/illustrations/payment-failed.svg',
  'apps/web/public/images/illustrations/scan-qr.svg',
  'apps/web/public/images/illustrations/wallet-connect.svg',
  'apps/mobile/assets/brand/powerpay-mark-green.png',
  'apps/mobile/assets/brand/powerpay-mark-white.png',
  'apps/mobile/assets/brand/powerpay-mark-dark.png',
  'apps/mobile/assets/brand/app-icon.png',
  'apps/mobile/assets/brand/adaptive-icon.png',
  'apps/mobile/assets/tokens/pwrc-mark.png',
  'apps/mobile/assets/tokens/pwrc-coin.png',
  'apps/mobile/assets/tokens/wpwrc-mark.png',
  'apps/mobile/assets/tokens/wpwrc-coin.png',
  'apps/mobile/assets/tokens/usdc.png',
  'apps/mobile/assets/tokens/eurc.png',
  'apps/mobile/assets/networks/solana.png',
  'apps/mobile/assets/networks/sui.png',
  'apps/mobile/assets/wallets/phantom.png',
  'apps/mobile/assets/wallets/solflare.png',
  'apps/mobile/assets/wallets/backpack.png',
  'apps/mobile/assets/wallets/wallet-connect.png',
  'apps/mobile/assets/index.ts',
  'apps/mobile/components/WalletBrandIcon.tsx',
  'packages/shared/src/assets.ts',
  'packages/ui/src/components/AssetIcon.tsx',
  'packages/ui/src/components/NetworkIcon.tsx',
  'packages/ui/src/components/WalletIcon.tsx',
  'assets/source/powerchain/assets.json',
];

const missing = required.filter((path) => !existsSync(resolve(root, path)));
if (missing.length) throw new Error(`Missing canonical assets:\n${missing.map((path) => `- ${path}`).join('\n')}`);

if (existsSync(resolve(root, 'public'))) throw new Error('Root /public is deprecated; browser-facing assets must live in apps/web/public.');
if (existsSync(resolve(root, 'apps/mobile/assets/visuals')) || existsSync(resolve(root, 'apps/mobile/assets/icons'))) throw new Error('Legacy mobile assets/icons or assets/visuals directory still exists.');

function pngDimensions(file) {
  const data = readFileSync(resolve(root, file));
  const signature = data.subarray(1, 4).toString('ascii');
  if (signature !== 'PNG') throw new Error(`${file} is not PNG`);
  return { width: data.readUInt32BE(16), height: data.readUInt32BE(20) };
}
for (const file of ['apps/mobile/assets/brand/app-icon.png', 'apps/mobile/assets/brand/adaptive-icon.png']) {
  const { width, height } = pngDimensions(file);
  if (width !== 1024 || height !== 1024) throw new Error(`${file} must be 1024x1024; got ${width}x${height}`);
}

const sourceManifest = JSON.parse(readFileSync(resolve(root, 'assets/source/user-brand/manifest.json'), 'utf8'));
const expectedAttachments = {
  pwrc: 'file_000000000f4c81f49c50f9fc21e7e5ba',
  wpwrc: 'file_00000000ac8881f4a4d2d90f6186e25a',
  logoGreen: 'file_00000000f22881f6ba1084a912471e86',
  logoWhite: 'file_00000000b6a081f6b6ef031a0f05edd5',
  logoDark: 'file_00000000daec820c8bdde912c3884b4e',
};
for (const [key, id] of Object.entries(expectedAttachments)) {
  if (sourceManifest.sources?.[key]?.fileId !== id) throw new Error(`Authoritative source registration mismatch for ${key}.`);
}

const manifest = JSON.parse(readFileSync(resolve(root, 'apps/web/public/assets/manifest.json'), 'utf8'));
if (manifest.external?.provider !== '@web3icons/react' || manifest.external?.version !== '4.1.21') throw new Error('Web3Icons React provider/version must remain pinned to 4.1.21.');
if (manifest.external?.staticSourceProvider !== '@web3icons/core' || manifest.external?.staticSourceVersion !== '4.0.55') throw new Error('Static Web3Icons source must remain pinned to @web3icons/core 4.0.55.');
if (!manifest.authoritativeAttachmentsRegistered) throw new Error('Authoritative current-conversation brand attachments must remain registered.');

for (const key of ['brandMark', 'pwrcCoin', 'wpwrcCoin']) {
  const provenance = String(manifest.owned?.[key]?.provenance ?? '');
  if (!['user-upload-authoritative', 'uploaded-derived-fallback'].includes(provenance)) throw new Error(`${key} has invalid provenance state: ${provenance}`);
}
const exactInstalled = ['brandMark', 'pwrcCoin', 'wpwrcCoin'].every((key) => manifest.owned?.[key]?.provenance === 'user-upload-authoritative');
if (exactInstalled && !existsSync(resolve(root, 'assets/source/user-brand/installed.json'))) throw new Error('Authoritative visual provenance requires assets/source/user-brand/installed.json with hashes.');
if (!exactInstalled && manifest.installationState !== 'registered-awaiting-binary-materialization') throw new Error('Fallback brand state must explicitly indicate pending binary materialization.');

for (const file of [
  'apps/web/public/assets/tokens/usdc.svg', 'apps/web/public/assets/tokens/eurc.svg', 'apps/web/public/assets/tokens/sol.svg', 'apps/web/public/assets/tokens/sui.svg',
  'apps/web/public/assets/networks/solana.svg', 'apps/web/public/assets/networks/sui.svg',
  'apps/web/public/icons/wallets/phantom.svg', 'apps/web/public/icons/wallets/solflare.svg', 'apps/web/public/icons/wallets/backpack.svg', 'apps/web/public/icons/wallets/wallet-connect.svg',
]) {
  const svg = readFileSync(resolve(root, file), 'utf8');
  if (!svg.includes('class="web3icons"')) throw new Error(`${file} is not a pinned Web3Icons SVG source.`);
}

const registry = readFileSync(resolve(root, 'packages/shared/src/assets.ts'), 'utf8');
for (const expected of ["'PWRC' | 'wPWRC'", "PWRC: {", "wPWRC: {", "wrappedAsset: 'PWRC'", "source: 'powerpay-owned'", "SOL: {", "source: 'web3icons'", "USDC: {", "EURC: {", "SUI: {"]) {
  if (!registry.includes(expected)) throw new Error(`Shared asset registry missing ${expected}`);
}
if (registry.includes('mint:') || registry.includes('programId:') || registry.includes('objectId:')) throw new Error('Visual asset registry must not contain chain execution identifiers.');

const mobileIcons = readFileSync(resolve(root, 'apps/mobile/components/AssetIcon.tsx'), 'utf8');
for (const expected of ['MOBILE_ASSETS.tokens.USDC', 'MOBILE_ASSETS.tokens.EURC', 'MOBILE_ASSETS.tokens.wPWRC', 'MOBILE_ASSETS.networks.SOLANA', 'MOBILE_ASSETS.networks.SUI']) {
  if (!mobileIcons.includes(expected)) throw new Error(`Native AssetIcon missing canonical visual ${expected}`);
}

const webIcons = readFileSync(resolve(root, 'packages/ui/src/components/AssetIcon.tsx'), 'utf8');
for (const expected of ['TokenUSDC', 'TokenEURC', 'TokenSOL', 'TokenSUI']) if (!webIcons.includes(expected)) throw new Error(`Web AssetIcon missing static Web3Icons import ${expected}`);
if (webIcons.includes('@web3icons/react/dynamic')) throw new Error('Web asset component must use tree-shakable individual imports, not dynamic icon imports.');

const modal = readFileSync(resolve(root, 'apps/mobile/components/WalletConnectModal.tsx'), 'utf8');
for (const expected of ['BrandMark', 'WalletBrandIcon', 'Phantom', 'Solflare', 'Backpack', 'WalletConnect', 'Wallet consent', 'EXPO_PUBLIC_REOWN_PROJECT_ID', 'Gated']) {
  if (!modal.includes(expected)) throw new Error(`Wallet modal missing ${expected}`);
}


const solanaWallet = readFileSync(resolve(root, 'apps/mobile/services/solanaWallet.ts'), 'utf8');
if (!solanaWallet.includes('POWERPAY_PUBLIC_ASSETS.brand.markGreen')) throw new Error('Mobile wallet identity must resolve its web mark through the shared asset registry.');
if (solanaWallet.includes("icon: '/assets/brand/")) throw new Error('Mobile wallet identity contains a scattered raw brand path.');

const scan = readFileSync(resolve(root, 'apps/mobile/app/(tabs)/scan.tsx'), 'utf8');
if (!scan.includes('<BrandMark')) throw new Error('Scanner must show the canonical PowerPay mark in the QR frame.');

const receive = readFileSync(resolve(root, 'apps/mobile/app/wallet/receive.tsx'), 'utf8');
for (const expected of ['react-native-qrcode-svg', 'MOBILE_ASSETS.brand.mark', 'wallet.address', 'Clipboard.setStringAsync']) {
  if (!receive.includes(expected)) throw new Error(`Receive QR missing ${expected}`);
}
for (const forbidden of ['7V4d…x82Q', '>QR<']) if (receive.includes(forbidden)) throw new Error(`Receive QR contains demo value ${forbidden}`);

const appJson = JSON.parse(readFileSync(resolve(root, 'apps/mobile/app.json'), 'utf8'));
if (appJson.expo?.icon !== './assets/brand/app-icon.png') throw new Error('Expo icon must use canonical brand asset.');
if (appJson.expo?.android?.adaptiveIcon?.foregroundImage !== './assets/brand/adaptive-icon.png') throw new Error('Android adaptive icon must use canonical brand asset.');

console.log(`PowerPay asset check passed (${required.length} required assets; authoritative binary state: ${exactInstalled ? 'installed' : 'registered/pending'}).`);
