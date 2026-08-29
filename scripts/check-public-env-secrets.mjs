import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const env = readFileSync(resolve(root, 'env/.env.example'), 'utf8');
const publicKeys = env.split(/\r?\n/).map((line) => line.trim()).filter((line) => /^(EXPO_PUBLIC_|NEXT_PUBLIC_)[A-Z0-9_]+=/.test(line)).map((line) => line.split('=', 1)[0]);
const banned = /(SECRET|SERVICE_ROLE|PRIVATE_KEY|HELIUS_API_KEY|PYTH_API_KEY|COINGECKO_API_KEY|COINMARKETCAP_API_KEY|STRIPE_SECRET|DATABASE_URL|DIRECT_URL|SHADOW_DATABASE_URL)/;
const violations = publicKeys.filter((key) => banned.test(key));
if (violations.length) throw new Error(`Server secrets must not use public env prefixes:\n${violations.map((key) => `- ${key}`).join('\n')}`);

const mobile = readFileSync(resolve(root, 'apps/mobile/services/api.ts'), 'utf8');
if (/process\.env\.(?!EXPO_PUBLIC_)[A-Z0-9_]+/.test(mobile)) throw new Error('Mobile API client references a non-EXPO_PUBLIC environment variable.');

const browser = readFileSync(resolve(root, 'apps/web/lib/powerpay-api.ts'), 'utf8');
if (/process\.env\.(?!NEXT_PUBLIC_)[A-Z0-9_]+/.test(browser)) throw new Error('Browser PowerPay client references a server-only environment variable.');
console.log(`Public environment boundary check passed (${publicKeys.length} public keys inspected).`);
