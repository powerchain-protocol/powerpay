export type PowerPayAssetSymbol = 'PWRC' | 'wPWRC' | 'SOL' | 'USDC' | 'EURC' | 'SUI';
export type PowerPayNetwork = 'solana' | 'sui';
export type AssetVisualSource = 'powerpay-owned' | 'web3icons';

export const POWERPAY_PUBLIC_ASSETS = {
  brand: {
    mark: '/assets/brand/powerpay-mark-green.png',
    markGreen: '/assets/brand/powerpay-mark-green.png',
    markWhite: '/assets/brand/powerpay-mark-white.png',
    markDark: '/assets/brand/powerpay-mark-dark.png',
    markSvg: '/assets/brand/powerpay-mark-green.svg',
    logo: '/assets/brand/powerpay-logo.svg',
    logoPng: '/assets/brand/powerpay-logo.png',
    logoLight: '/assets/brand/powerpay-logo-light.svg',
    logoLightPng: '/assets/brand/powerpay-logo-light.png',
    logoDark: '/assets/brand/powerpay-logo-dark.svg',
    logoDarkPng: '/assets/brand/powerpay-logo-dark.png',
    powerChainLogo: '/assets/brand/powerchain-logo.svg',
    powerChainLogoPng: '/assets/brand/powerchain-logo.png',
    powerChainMarkGreen: '/assets/brand/powerchain-mark-green.png',
    powerChainMarkWhite: '/assets/brand/powerchain-mark-white.png',
    powerChainMarkDark: '/assets/brand/powerchain-mark-dark.png',
    appIcon: '/assets/brand/powerpay-app-icon.png',
  },
  tokens: {
    PWRC: {
      mark: '/assets/tokens/pwrc-mark.png',
      markSvg: '/assets/tokens/pwrc-mark.svg',
      coin: '/assets/tokens/pwrc-coin.png',
      coin2x: '/assets/tokens/pwrc-coin@2x.png',
      light: '/assets/tokens/pwrc-light.png',
      dark: '/assets/tokens/pwrc-dark.png',
    },
    wPWRC: {
      mark: '/assets/tokens/wpwrc-mark.png',
      coin: '/assets/tokens/wpwrc-coin.png',
      coin2x: '/assets/tokens/wpwrc-coin@2x.png',
      light: '/assets/tokens/wpwrc-light.png',
      dark: '/assets/tokens/wpwrc-dark.png',
    },
    USDC: '/assets/tokens/usdc.svg',
    EURC: '/assets/tokens/eurc.svg',
    SOL: '/assets/tokens/sol.svg',
    SUI: '/assets/tokens/sui.svg',
  },
  networks: {
    solana: '/assets/networks/solana.svg',
    sui: '/assets/networks/sui.svg',
    solanaFallback: '/assets/networks/solana.png',
    suiFallback: '/assets/networks/sui.png',
  },
  wallets: {
    phantom: '/icons/wallets/phantom.svg',
    solflare: '/icons/wallets/solflare.svg',
    backpack: '/icons/wallets/backpack.svg',
    walletConnect: '/icons/wallets/wallet-connect.svg',
  },
  illustrations: {
    emptyWallet: '/images/illustrations/empty-wallet.svg',
    paymentSuccess: '/images/illustrations/payment-success.svg',
    paymentFailed: '/images/illustrations/payment-failed.svg',
    scanQr: '/images/illustrations/scan-qr.svg',
    securePayment: '/images/illustrations/secure-payment.svg',
    walletConnect: '/images/illustrations/wallet-connect.svg',
    noTransactions: '/images/illustrations/no-transactions.svg',
    onramp: '/images/illustrations/onramp.svg',
    checkoutAndStorefront: '/images/illustrations/checkout-and-storefront.png',
    mobilePaymentsShowcase: '/images/illustrations/mobile-payments-showcase.png',
  },
} as const;

export interface PowerPayAssetVisualDefinition {
  symbol: PowerPayAssetSymbol;
  name: string;
  network?: PowerPayNetwork;
  decimals: number;
  source: AssetVisualSource;
  web3Symbol?: string;
  icon?: string;
  image?: string;
  minDetailedImagePx?: number;
  wrappedAsset?: PowerPayAssetSymbol;
}

/**
 * Visual metadata only. Mint addresses, Sui type/object identifiers, bridge backing,
 * settlement authority and decimals used for execution remain chain-registry data.
 */
export const POWERPAY_ASSET_VISUALS: Record<PowerPayAssetSymbol, PowerPayAssetVisualDefinition> = {
  PWRC: {
    symbol: 'PWRC', name: 'PowerChain Token', network: 'solana', decimals: 9,
    source: 'powerpay-owned', icon: POWERPAY_PUBLIC_ASSETS.tokens.PWRC.mark,
    image: POWERPAY_PUBLIC_ASSETS.tokens.PWRC.coin, minDetailedImagePx: 40,
  },
  wPWRC: {
    symbol: 'wPWRC', name: 'Wrapped PowerChain Token', network: 'sui', decimals: 9,
    source: 'powerpay-owned', icon: POWERPAY_PUBLIC_ASSETS.tokens.wPWRC.mark,
    image: POWERPAY_PUBLIC_ASSETS.tokens.wPWRC.coin, minDetailedImagePx: 40, wrappedAsset: 'PWRC',
  },
  SOL: { symbol: 'SOL', name: 'Solana', network: 'solana', decimals: 9, source: 'web3icons', web3Symbol: 'SOL' },
  USDC: { symbol: 'USDC', name: 'USD Coin', network: 'solana', decimals: 6, source: 'web3icons', web3Symbol: 'USDC' },
  EURC: { symbol: 'EURC', name: 'EURC', network: 'solana', decimals: 6, source: 'web3icons', web3Symbol: 'EURC' },
  SUI: { symbol: 'SUI', name: 'Sui', network: 'sui', decimals: 9, source: 'web3icons', web3Symbol: 'SUI' },
};

export const POWERPAY_WALLET_VISUALS = {
  phantom: { name: 'Phantom', source: 'web3icons', web3Name: 'phantom', asset: POWERPAY_PUBLIC_ASSETS.wallets.phantom },
  solflare: { name: 'Solflare', source: 'web3icons', web3Name: 'solflare', asset: POWERPAY_PUBLIC_ASSETS.wallets.solflare },
  backpack: { name: 'Backpack', source: 'web3icons', web3Name: 'backpack', asset: POWERPAY_PUBLIC_ASSETS.wallets.backpack },
  walletConnect: { name: 'WalletConnect', source: 'web3icons', web3Name: 'wallet-connect', asset: POWERPAY_PUBLIC_ASSETS.wallets.walletConnect },
} as const;

export const POWERPAY_NETWORK_VISUALS = {
  solana: { name: 'Solana', source: 'web3icons', web3Name: 'solana', asset: POWERPAY_PUBLIC_ASSETS.networks.solana, fallback: POWERPAY_PUBLIC_ASSETS.networks.solanaFallback },
  sui: { name: 'Sui', source: 'web3icons', web3Name: 'sui', asset: POWERPAY_PUBLIC_ASSETS.networks.sui, fallback: POWERPAY_PUBLIC_ASSETS.networks.suiFallback },
} as const;
