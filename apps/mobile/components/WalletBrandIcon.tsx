import { Image } from 'react-native';
import { MOBILE_ASSETS } from '@/assets';

export type MobileWalletBrand = 'Phantom' | 'Solflare' | 'Backpack' | 'WalletConnect';

export function WalletBrandIcon({ wallet, size = 28 }: { wallet: MobileWalletBrand; size?: number }) {
  const source = wallet === 'Phantom' ? MOBILE_ASSETS.wallets.PHANTOM
    : wallet === 'Solflare' ? MOBILE_ASSETS.wallets.SOLFLARE
    : wallet === 'Backpack' ? MOBILE_ASSETS.wallets.BACKPACK
    : MOBILE_ASSETS.wallets.WALLET_CONNECT;
  return <Image source={source} resizeMode="contain" style={{ width: size, height: size }} accessibilityLabel={`${wallet} wallet icon`} />;
}
