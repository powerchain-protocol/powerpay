/** Canonical external ecosystem icon provider metadata. */
export const WEB3_ICONS_PROVIDER = {
  reactPackage: '@web3icons/react',
  reactVersion: '4.1.21',
  corePackage: '@web3icons/core',
  coreVersion: '4.0.55',
  supportedKinds: ['token', 'network', 'wallet', 'exchange'] as const,
} as const;

export const POWERPAY_WEB3_ICON_SELECTION = {
  tokens: ['USDC', 'EURC', 'SOL', 'SUI'],
  networks: ['solana', 'sui'],
  wallets: ['phantom', 'solflare', 'backpack', 'wallet-connect'],
} as const;

export type PowerPayIconName = 'USDC' | 'EURC' | 'SOL' | 'SUI' | 'PWRC' | 'wPWRC' | 'Solana' | 'Sui';
export const web3IconPackage = WEB3_ICONS_PROVIDER.reactPackage;
