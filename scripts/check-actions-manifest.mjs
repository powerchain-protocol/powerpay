import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const manifest = JSON.parse(readFileSync(resolve(root, 'actions.json'), 'utf8'));
const source = readFileSync(resolve(root, 'services/src/solana/actions.ts'), 'utf8');
const handler = readFileSync(resolve(root, 'backend/src/http/handler.ts'), 'utf8');

if (!Array.isArray(manifest.rules) || manifest.rules.length === 0) throw new Error('actions.json must contain rules');
const required = [
  ['/pay/*', '/api/actions/pay/*'],
  ['/checkout/*', '/api/actions/pay/*'],
  ['/api/actions/**', '/api/actions/**'],
];
for (const [pathPattern, apiPath] of required) {
  const rule = manifest.rules.find((item) => item.pathPattern === pathPattern && item.apiPath === apiPath);
  if (!rule) throw new Error(`Missing Actions rule ${pathPattern} -> ${apiPath}`);
  if (!source.includes(`pathPattern: '${pathPattern}'`) || !source.includes(`apiPath: '${apiPath}'`)) throw new Error(`Runtime Actions manifest drift for ${pathPattern}`);
}
for (const requiredSource of ['access-control-allow-origin', 'OPTIONS', '/api/actions/']) {
  if (!(source + handler).includes(requiredSource)) throw new Error(`Solana Actions runtime missing ${requiredSource}`);
}
console.log('Solana Actions manifest/runtime check passed.');
