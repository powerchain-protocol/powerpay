import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const solanaDeployments = new Map();
for (const network of ['devnet', 'mainnet']) {
  const file = resolve(root, `programs/solana/deployments/${network}.json`);
  const data = JSON.parse(readFileSync(file, 'utf8'));
  const canonicalNetwork = network === 'mainnet' ? 'mainnet-beta' : network;
  if (data.network !== canonicalNetwork) throw new Error(`${network} deployment file declares ${data.network}`);
  for (const [name, config] of Object.entries(data.programs)) {
    if (config.programId === '11111111111111111111111111111111') throw new Error(`${network}.${name} uses the System Program placeholder`);
    if (config.programId !== null && !/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(config.programId)) throw new Error(`${network}.${name} has an invalid program id`);
    solanaDeployments.set(`${canonicalNetwork}:${name}`, config);
  }
}

const manifest = JSON.parse(readFileSync(resolve(root, 'programs/manifest/programs.json'), 'utf8'));
if (manifest.schemaVersion !== 1 || !Array.isArray(manifest.programs)) throw new Error('Unsupported program manifest schema');
const seen = new Set();
const allowedStatus = new Set(['PENDING', 'ACTIVE', 'RETIRED']);
for (const program of manifest.programs) {
  const key = `${program.network}:${program.name}`;
  if (seen.has(key)) throw new Error(`Duplicate program manifest entry ${key}`);
  seen.add(key);
  if (!allowedStatus.has(program.status)) throw new Error(`${key} has invalid status ${program.status}`);
  if (!/^\d+\.\d+\.\d+$/.test(program.version)) throw new Error(`${key} has invalid version`);
  if (program.status === 'ACTIVE') {
    if (!program.programId || !program.idlHash || !program.deploymentHash) throw new Error(`${key} cannot be ACTIVE without programId, idlHash and deploymentHash`);
    if (program.programId === '11111111111111111111111111111111') throw new Error(`${key} uses a fabricated placeholder`);
  }
  if (program.name === 'powerpay-checkout' || program.name === 'powerpay-settlement') {
    const shortName = program.name.replace('powerpay-', '');
    const deployed = solanaDeployments.get(`${program.network}:${shortName}`);
    if (!deployed) throw new Error(`${key} missing Solana deployment registry entry`);
    if (deployed.version !== program.version) throw new Error(`${key} version drift between manifest and deployment registry`);
    if ((deployed.programId ?? null) !== (program.programId ?? null)) throw new Error(`${key} programId drift between manifest and deployment registry`);
  }
}
console.log(`Program registry/manifest check passed (${manifest.programs.length} manifest entries).`);
