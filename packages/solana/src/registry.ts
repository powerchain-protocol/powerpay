export interface ProgramDeployment {
  name: 'checkout' | 'settlement' | 'merchant' | 'escrow' | 'receipt' | 'vault';
  programId: string;
  version: string;
  cluster: 'mainnet-beta' | 'devnet' | 'localnet';
}

const BASE58 = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

export function assertProgramDeployment(input: ProgramDeployment): ProgramDeployment {
  if (!BASE58.test(input.programId)) throw new Error(`Invalid ${input.name} program id`);
  if (!/^\d+\.\d+\.\d+/.test(input.version)) throw new Error(`Invalid ${input.name} version`);
  return input;
}
