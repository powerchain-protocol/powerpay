import Image from 'next/image';
import { POWERPAY_PUBLIC_ASSETS } from '@powerpay/shared/assets';

type Kind = 'checkout' | 'scan' | 'wallet' | 'settlement' | 'mobile' | 'merchant';
const SYMBOL: Record<Kind, string> = { checkout: '→', scan: '⌗', wallet: '◇', settlement: '✓', mobile: '▯', merchant: '▦' };

export function BrandIllustrationIcon({ kind, size = 64 }: { kind: Kind; size?: number }) {
  return (
    <span className={`brand-illustration brand-illustration-${kind}`} style={{ width: size, height: size }} aria-hidden="true">
      <Image src={POWERPAY_PUBLIC_ASSETS.brand.markGreen} alt="" width={Math.round(size * .48)} height={Math.round(size * .48)} />
      <b>{SYMBOL[kind]}</b>
    </span>
  );
}
