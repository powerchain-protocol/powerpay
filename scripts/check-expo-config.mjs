import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const mobilePkg = JSON.parse(readFileSync(resolve(root, 'apps/mobile/package.json'), 'utf8'));
const app = JSON.parse(readFileSync(resolve(root, 'apps/mobile/app.json'), 'utf8')).expo;

const requiredWeb = {
  'react-native-web': '^0.21.2',
  'react-dom': '19.2.3',
  '@expo/metro-runtime': '^57.0.14',
};
for (const [name, wanted] of Object.entries(requiredWeb)) {
  const actual = mobilePkg.dependencies?.[name];
  if (!actual) throw new Error(`Expo web dependency missing: ${name}`);
  if (actual !== wanted) throw new Error(`Expo web dependency ${name} must be ${wanted}; found ${actual}`);
}
if (!Array.isArray(app.platforms) || !['ios','android','web'].every((x) => app.platforms.includes(x))) {
  throw new Error('Expo platforms must explicitly include ios, android, and web.');
}
if (app.web?.bundler !== 'metro') throw new Error('Expo web bundler must be metro.');
if (mobilePkg.scripts?.ios !== 'expo start --ios') throw new Error('Mobile ios script should use Expo Go/dev server; native build belongs in ios:native.');
if (mobilePkg.scripts?.['ios:native'] !== 'expo run:ios') throw new Error('Mobile ios:native script must invoke expo run:ios.');
console.log('Expo universal config check passed.');
