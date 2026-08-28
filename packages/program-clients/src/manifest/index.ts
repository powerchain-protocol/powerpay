export type ProgramStatus = 'ACTIVE' | 'DISABLED' | 'RETIRED' | 'PENDING';

export interface ProgramManifestEntry {
  name: string;
  version: string;
  network: string;
  programId: string | null;
  idlHash: string | null;
  deploymentHash: string | null;
  status: ProgramStatus;
  features: string[];
}

export interface ProtocolManifest {
  schemaVersion: 1;
  generatedAt: string;
  programs: ProgramManifestEntry[];
}

export function requireCompatibleProgram(manifest: ProtocolManifest, input: { name: string; network: string; minimumVersion: string; feature?: string }): ProgramManifestEntry {
  const entry = manifest.programs.find((p) => p.name === input.name && p.network === input.network && p.status === 'ACTIVE');
  if (!entry) throw new Error(`Program ${input.name} is not active on ${input.network}`);
  if (!entry.programId) throw new Error(`Program ${input.name} has no deployed program ID`);
  if (compareSemver(entry.version, input.minimumVersion) < 0) throw new Error(`Program ${input.name} ${entry.version} is older than required ${input.minimumVersion}`);
  if (input.feature && !entry.features.includes(input.feature)) throw new Error(`Program ${input.name} does not support ${input.feature}`);
  return entry;
}

function compareSemver(a: string, b: string): number {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < 3; i++) {
    const delta = (pa[i] || 0) - (pb[i] || 0);
    if (delta) return delta > 0 ? 1 : -1;
  }
  return 0;
}
