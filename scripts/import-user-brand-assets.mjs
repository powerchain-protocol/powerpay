import { createHash } from 'node:crypto';
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { basename, extname, resolve } from 'node:path';
import sharp from 'sharp';

const root = resolve(import.meta.dirname, '..');
const args = parseArgs(process.argv.slice(2));
const required = ['pwrc', 'wpwrc', 'logo-green', 'logo-white', 'logo-dark'];
for (const key of required) {
  if (!args[key]) fail(`Missing --${key} <path>`);
  if (!existsSync(resolve(args[key]))) fail(`Source does not exist: ${args[key]}`);
}

const webBrand = resolve(root, 'apps/web/public/assets/brand');
const webTokens = resolve(root, 'apps/web/public/assets/tokens');
const mobileBrand = resolve(root, 'apps/mobile/assets/brand');
const mobileTokens = resolve(root, 'apps/mobile/assets/tokens');
const sourceDir = resolve(root, 'assets/source/user-brand/originals');
await Promise.all([webBrand, webTokens, mobileBrand, mobileTokens, sourceDir].map((path) => mkdir(path, { recursive: true })));

const sources = {
  pwrc: resolve(args.pwrc),
  wpwrc: resolve(args.wpwrc),
  logoGreen: resolve(args['logo-green']),
  logoWhite: resolve(args['logo-white']),
  logoDark: resolve(args['logo-dark']),
};

const registration = JSON.parse(await readFile(resolve(root, 'assets/source/user-brand/manifest.json'), 'utf8'));
const sourceRecords = {};
for (const [key, path] of Object.entries(sources)) {
  const data = await readFile(path);
  const extension = extname(path).toLowerCase() || '.bin';
  const target = resolve(sourceDir, `${key}${extension}`);
  await copyFile(path, target);
  const metadata = await sharp(data).metadata();
  if (!metadata.width || !metadata.height) fail(`${key} is not a decodable image.`);
  if (metadata.width < 128 || metadata.height < 128) fail(`${key} must be at least 128x128; received ${metadata.width}x${metadata.height}.`);
  sourceRecords[key] = {
    originalName: basename(path),
    storedPath: `assets/source/user-brand/originals/${basename(target)}`,
    sha256: createHash('sha256').update(data).digest('hex'),
    width: metadata.width,
    height: metadata.height,
    format: metadata.format,
    attachmentFileId: registration.sources?.[key]?.fileId ?? registration.sources?.[key === 'logoGreen' ? 'logoGreen' : key === 'logoWhite' ? 'logoWhite' : key === 'logoDark' ? 'logoDark' : key]?.fileId,
  };
}

async function normalizedSquare(input, output, size) {
  await sharp(input)
    .rotate()
    .resize(size, size, { fit: 'contain', withoutEnlargement: false, background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(output);
}

async function normalizedMark(input, output, size = 512) {
  await sharp(input)
    .rotate()
    .resize(size, size, { fit: 'contain', withoutEnlargement: false, background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(output);
}

// Authoritative PowerPay/PowerChain mark variants.
await normalizedMark(sources.logoGreen, resolve(webBrand, 'powerpay-mark-green.png'));
await normalizedMark(sources.logoGreen, resolve(webBrand, 'powerpay-mark.png'));
await normalizedMark(sources.logoWhite, resolve(webBrand, 'powerpay-mark-white.png'));
await normalizedMark(sources.logoDark, resolve(webBrand, 'powerpay-mark-dark.png'));
await normalizedMark(sources.logoGreen, resolve(webBrand, 'powerchain-mark-green.png'));
await normalizedMark(sources.logoWhite, resolve(webBrand, 'powerchain-mark-white.png'));
await normalizedMark(sources.logoDark, resolve(webBrand, 'powerchain-mark-dark.png'));
await normalizedMark(sources.logoGreen, resolve(mobileBrand, 'powerpay-mark-green.png'));
await normalizedMark(sources.logoWhite, resolve(mobileBrand, 'powerpay-mark-white.png'));
await normalizedMark(sources.logoDark, resolve(mobileBrand, 'powerpay-mark-dark.png'));

// Premium coin imagery. Detailed coin art is reserved for >=40 px UI surfaces.
await normalizedSquare(sources.pwrc, resolve(webTokens, 'pwrc-coin.png'), 512);
await normalizedSquare(sources.pwrc, resolve(webTokens, 'pwrc-coin@2x.png'), 1024);
await normalizedSquare(sources.pwrc, resolve(webTokens, 'pwrc-light.png'), 512);
await normalizedSquare(sources.pwrc, resolve(webTokens, 'pwrc-dark.png'), 512);
await normalizedSquare(sources.pwrc, resolve(mobileTokens, 'pwrc-coin.png'), 512);
await normalizedSquare(sources.wpwrc, resolve(webTokens, 'wpwrc-coin.png'), 512);
await normalizedSquare(sources.wpwrc, resolve(webTokens, 'wpwrc-coin@2x.png'), 1024);
await normalizedSquare(sources.wpwrc, resolve(webTokens, 'wpwrc-light.png'), 512);
await normalizedSquare(sources.wpwrc, resolve(webTokens, 'wpwrc-dark.png'), 512);
await normalizedSquare(sources.wpwrc, resolve(mobileTokens, 'wpwrc-coin.png'), 512);
// For now, small wPWRC mark is a small normalized version of the supplied wPWRC source.
// It remains distinct from PWRC and can be replaced with a dedicated simplified vector without registry changes.
await normalizedSquare(sources.wpwrc, resolve(webTokens, 'wpwrc-mark.png'), 128);
await normalizedSquare(sources.wpwrc, resolve(mobileTokens, 'wpwrc-mark.png'), 128);

// Native app icons use the supplied green mark; the adaptive foreground stays transparent.
await sharp(sources.logoGreen).rotate().resize(1024, 1024, { fit: 'contain', background: '#F7F9F7' }).png().toFile(resolve(mobileBrand, 'app-icon.png'));
await sharp(sources.logoGreen).rotate().resize(620, 620, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } }).extend({ top: 202, bottom: 202, left: 202, right: 202, background: { r: 255, g: 255, b: 255, alpha: 0 } }).png().toFile(resolve(mobileBrand, 'adaptive-icon.png'));
await normalizedMark(sources.logoGreen, resolve(webBrand, 'powerpay-app-icon.png'), 1024);

const manifestPath = resolve(root, 'apps/web/public/assets/manifest.json');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
manifest.version = '1.2.0';
manifest.authoritativeAttachmentsRegistered = true;
manifest.authoritativeSourceManifest = 'assets/source/user-brand/manifest.json';
manifest.installationState = 'installed';
manifest.owned = {
  brandMark: {
    path: '/assets/brand/powerpay-mark-green.png',
    variants: {
      green: '/assets/brand/powerpay-mark-green.png',
      white: '/assets/brand/powerpay-mark-white.png',
      dark: '/assets/brand/powerpay-mark-dark.png',
    },
    provenance: 'user-upload-authoritative',
    source: sourceRecords.logoGreen,
    variantSources: { white: sourceRecords.logoWhite, dark: sourceRecords.logoDark },
  },
  pwrcMark: manifest.owned?.pwrcMark,
  pwrcCoin: {
    path: '/assets/tokens/pwrc-coin.png',
    retina: '/assets/tokens/pwrc-coin@2x.png',
    provenance: 'user-upload-authoritative',
    source: sourceRecords.pwrc,
  },
  wpwrcCoin: {
    path: '/assets/tokens/wpwrc-coin.png',
    retina: '/assets/tokens/wpwrc-coin@2x.png',
    provenance: 'user-upload-authoritative',
    source: sourceRecords.wpwrc,
  },
};
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
await writeFile(resolve(root, 'assets/source/user-brand/installed.json'), JSON.stringify({ installedAt: new Date().toISOString(), sourceManifestVersion: registration.version, sources: sourceRecords }, null, 2) + '\n');

console.log('Installed authoritative user-supplied PWRC/wPWRC and PowerPay mark assets.');

function parseArgs(input) {
  const result = {};
  for (let i = 0; i < input.length; i += 1) {
    if (!input[i].startsWith('--')) continue;
    const key = input[i].slice(2);
    const value = input[i + 1];
    if (!value || value.startsWith('--')) fail(`Missing value for --${key}`);
    result[key] = value;
    i += 1;
  }
  return result;
}
function fail(message) { console.error(message); process.exit(1); }
