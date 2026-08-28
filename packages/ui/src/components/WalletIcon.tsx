'use client';

import { POWERPAY_PUBLIC_ASSETS, POWERPAY_WALLET_VISUALS } from '@powerpay/shared/assets';

export type PowerPayWalletVisual = keyof typeof POWERPAY_WALLET_VISUALS;

export function WalletIcon({ wallet, size = 32 }: { wallet: PowerPayWalletVisual; size?: number }) {
  const definition = POWERPAY_WALLET_VISUALS[wallet];
  const src = wallet === 'phantom' ? POWERPAY_PUBLIC_ASSETS.wallets.phantom
    : wallet === 'solflare' ? POWERPAY_PUBLIC_ASSETS.wallets.solflare
    : wallet === 'backpack' ? POWERPAY_PUBLIC_ASSETS.wallets.backpack
    : POWERPAY_PUBLIC_ASSETS.wallets.walletConnect;
  return <img src={src} alt={`${definition.name} wallet`} width={size} height={size} />;
}
