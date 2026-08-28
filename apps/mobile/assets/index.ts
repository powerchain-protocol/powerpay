export const MOBILE_ASSETS = {
  brand: {
    mark: require('./brand/powerpay-mark-green.png'),
    markGreen: require('./brand/powerpay-mark-green.png'),
    markWhite: require('./brand/powerpay-mark-white.png'),
    markDark: require('./brand/powerpay-mark-dark.png'),
    appIcon: require('./brand/app-icon.png'),
  },
  tokens: {
    PWRC: {
      mark: require('./tokens/pwrc-mark.png'),
      coin: require('./tokens/pwrc-coin.png'),
    },
    wPWRC: {
      mark: require('./tokens/wpwrc-mark.png'),
      coin: require('./tokens/wpwrc-coin.png'),
    },
    USDC: require('./tokens/usdc.png'),
    EURC: require('./tokens/eurc.png'),
  },
  networks: {
    SOLANA: require('./networks/solana.png'),
    SUI: require('./networks/sui.png'),
  },
  wallets: {
    PHANTOM: require('./wallets/phantom.png'),
    SOLFLARE: require('./wallets/solflare.png'),
    BACKPACK: require('./wallets/backpack.png'),
    WALLET_CONNECT: require('./wallets/wallet-connect.png'),
  },
  illustrations: {
    checkout: require('./illustrations/checkout-and-storefront.png'),
    mobileShowcase: require('./illustrations/mobile-payments-showcase.png'),
    marketplace: require('./illustrations/marketplace.png'),
  },
} as const;
