import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const REQUIRED_NODE = '24.20.0';
const REQUIRED_PNPM = '11.24.0';

let cwd;
try {
  cwd = process.cwd();
} catch (error) {
  console.error('PowerPay runtime check failed: the current working directory no longer exists.');
  console.error('Run: cd ~ && cd /path/to/powerpay');
  process.exit(1);
}

if (!existsSync(cwd)) {
  console.error(`PowerPay runtime check failed: cwd does not exist: ${cwd}`);
  process.exit(1);
}

const actual = process.versions.node;
if (actual !== REQUIRED_NODE) {
  console.error(`PowerPay requires Node ${REQUIRED_NODE}; current Node is ${actual}.`);
  console.error(`Run: nvm install ${REQUIRED_NODE} && nvm use ${REQUIRED_NODE}`);
  console.error(`Then: corepack enable && corepack install --global pnpm@${REQUIRED_PNPM}`);
  process.exit(1);
}

console.log(`PowerPay runtime check passed: Node ${actual}.`);
