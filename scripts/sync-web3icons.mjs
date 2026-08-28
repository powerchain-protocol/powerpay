import { copyFile, mkdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import sharp from 'sharp';

const root = resolve(import.meta.dirname, '..');
const require = createRequire(import.meta.url);
let packageRoot;
try {
  const entry = require.resolve('@web3icons/core');
  // package entry resolves inside dist; walk upward until dist/svgs exists.
  let cursor = dirname(entry);
  for (let i = 0; i < 6; i += 1) {
    if (existsSync(resolve(cursor, 'dist/svgs'))) { packageRoot = cursor; break; }
    if (existsSync(resolve(cursor, 'svgs'))) { packageRoot = dirname(cursor); break; }
    cursor = dirname(cursor);
  }
} catch {
  // pnpm may keep a direct root dependency under node_modules exactly.
  const candidate = resolve(root, 'node_modules/@web3icons/core');
  if (existsSync(candidate)) packageRoot = candidate;
}
if (!packageRoot) throw new Error('@web3icons/core is not installed. Run pnpm install before syncing ecosystem icons.');
const svgRoot = existsSync(resolve(packageRoot, 'dist/svgs')) ? resolve(packageRoot, 'dist/svgs') : resolve(packageRoot, 'svgs');

const selections = [
  ['tokens', 'USDC.svg', 'apps/web/public/assets/tokens/usdc.svg', 'apps/mobile/assets/tokens/usdc.png'],
  ['tokens', 'EURC.svg', 'apps/web/public/assets/tokens/eurc.svg', 'apps/mobile/assets/tokens/eurc.png'],
  ['tokens', 'SOL.svg', 'apps/web/public/assets/tokens/sol.svg', null],
  ['tokens', 'SUI.svg', 'apps/web/public/assets/tokens/sui.svg', null],
  ['networks', 'solana.svg', 'apps/web/public/assets/networks/solana.svg', 'apps/mobile/assets/networks/solana.png'],
  ['networks', 'sui.svg', 'apps/web/public/assets/networks/sui.svg', 'apps/mobile/assets/networks/sui.png'],
  ['wallets', 'phantom.svg', 'apps/web/public/icons/wallets/phantom.svg', 'apps/mobile/assets/wallets/phantom.png'],
  ['wallets', 'solflare.svg', 'apps/web/public/icons/wallets/solflare.svg', 'apps/mobile/assets/wallets/solflare.png'],
  ['wallets', 'backpack.svg', 'apps/web/public/icons/wallets/backpack.svg', 'apps/mobile/assets/wallets/backpack.png'],
  ['wallets', 'wallet-connect.svg', 'apps/web/public/icons/wallets/wallet-connect.svg', 'apps/mobile/assets/wallets/wallet-connect.png'],
];

for (const [kind, file, webTarget, mobileTarget] of selections) {
  const source = resolve(svgRoot, kind, 'branded', file);
  if (!existsSync(source)) throw new Error(`Web3Icons asset not found: ${source}`);
  const webPath = resolve(root, webTarget);
  await mkdir(dirname(webPath), { recursive: true });
  await copyFile(source, webPath);
  if (mobileTarget) {
    const mobilePath = resolve(root, mobileTarget);
    await mkdir(dirname(mobilePath), { recursive: true });
    const svg = await readFile(source);
    await sharp(svg).resize(128, 128, { fit: 'contain' }).png().toFile(mobilePath);
  }
}
console.log(`Synced ${selections.length} external ecosystem icons from @web3icons/core.`);
