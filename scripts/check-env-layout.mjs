import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
for (const file of ['env/.env.example', 'env/.env.local', 'env/README.md', '.nvmrc', '.node-version', '.npmrc', 'CHANGELOG.md']) {
  if (!existsSync(resolve(root, file))) throw new Error(`Missing local runtime file: ${file}`);
}
const nvm = readFileSync(resolve(root, '.nvmrc'), 'utf8').trim();
if (nvm !== '24.20.0') throw new Error(`Unexpected .nvmrc version ${nvm}`);
const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
if (pkg.engines?.node !== '24.20.0' || pkg.packageManager !== 'pnpm@11.24.0') throw new Error('Runtime pin mismatch');
console.log('PowerPay environment/runtime layout check passed.');
