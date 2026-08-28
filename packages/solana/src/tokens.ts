export type SolanaTokenProgram = 'spl-token' | 'token-2022';

export interface SolanaTokenDescriptor {
  mint: string;
  symbol: string;
  decimals: number;
  program: SolanaTokenProgram;
  verified: boolean;
  transferFeeBps?: number;
  metadataSource?: 'powerpay-registry' | 'token-2022' | 'metaplex' | 'external';
}

export function calculateTransferFee(amountAtomic: bigint, feeBps = 0, maximumFeeAtomic?: bigint): bigint {
  if (feeBps <= 0) return 0n;
  const fee = (amountAtomic * BigInt(feeBps) + 9999n) / 10000n;
  return maximumFeeAtomic !== undefined && fee > maximumFeeAtomic ? maximumFeeAtomic : fee;
}
