import { readdir, rm } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mode = process.argv[2] === 'all' ? 'all' : 'cache';
const cacheNames = new Set(['.expo', '.next', '.turbo', '.wrangler', 'dist', 'coverage']);
const skipNames = new Set(['.git']);

const removed = [];
async function walk(dir) {
  let entries = [];
  try { entries = await readdir(dir, { withFileTypes: true }); } catch { return; }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (!entry.isDirectory()) continue;
    if (skipNames.has(entry.name)) continue;
    if (cacheNames.has(entry.name) || (mode === 'all' && entry.name === 'node_modules')) {
      await rm(full, { recursive: true, force: true });
      removed.push(full.slice(root.length + 1));
      continue;
    }
    await walk(full);
  }
}

await walk(root);
for (const extra of ['apps/mobile/.expo-shared', 'apps/web/.next/cache', 'programs/solana/target', 'programs/solana/.anchor', 'programs/sui/build']) {
  await rm(join(root, extra), { recursive: true, force: true });
}
console.log(`PowerPay clean (${mode}) removed ${removed.length} director${removed.length === 1 ? 'y' : 'ies'}.`);
if (removed.length) console.log(removed.map((x) => `- ${x}`).join('\n'));
