export type Chain = 'solana' | 'sui';
export type AssetSymbol = 'USDC' | 'EURC' | 'SOL' | 'SUI' | 'PWRC';

export interface AssetDefinition {
  symbol: AssetSymbol;
  chain: Chain;
  decimals: number;
  defaultForPayments?: boolean;
  stablecoin?: boolean;
  tokenProgram?: 'spl-token' | 'token-2022' | 'sui-coin';
}

export const POWERPAY_ASSETS: readonly AssetDefinition[] = [
  { symbol: 'USDC', chain: 'solana', decimals: 6, defaultForPayments: true, stablecoin: true, tokenProgram: 'spl-token' },
  { symbol: 'EURC', chain: 'solana', decimals: 6, stablecoin: true, tokenProgram: 'spl-token' },
  { symbol: 'SOL', chain: 'solana', decimals: 9 },
  { symbol: 'SUI', chain: 'sui', decimals: 9, tokenProgram: 'sui-coin' },
  { symbol: 'PWRC', chain: 'solana', decimals: 9, tokenProgram: 'token-2022' },
] as const;

export const DEFAULT_PAYMENT_ASSET: AssetSymbol = 'USDC';
