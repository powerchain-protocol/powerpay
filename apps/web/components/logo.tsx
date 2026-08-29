import Image from 'next/image';
import Link from 'next/link';
import { POWERPAY_PUBLIC_ASSETS } from '@powerpay/shared/assets';

export type PowerPayLogoTone = 'light' | 'dark' | 'green';

const MARKS: Record<PowerPayLogoTone, string> = {
  light: POWERPAY_PUBLIC_ASSETS.brand.markDark,
  dark: POWERPAY_PUBLIC_ASSETS.brand.markWhite,
  green: POWERPAY_PUBLIC_ASSETS.brand.markGreen,
};

export function Logo({ compact = false, tone = 'light', href = '/', priority = true, showTagline = true }: { compact?: boolean; tone?: PowerPayLogoTone; href?: string; priority?: boolean; showTagline?: boolean }) {
  const darkSurface = tone === 'dark';
  return (
    <Link href={href} className={`brand brand-${tone}`} aria-label="PowerPay home">
      <Image className="brand-mark" src={MARKS[tone]} alt="" width={48} height={48} sizes="48px" priority={priority} />
      {!compact ? (
        <div className="brand-copy">
          <div className="brand-word" aria-label="PowerPay"><span>Power</span><strong>Pay</strong></div>
          {showTagline ? <div className={`brand-sub ${darkSurface ? 'on-dark' : ''}`}>Payments · Powered by PowerChain</div> : null}
        </div>
      ) : null}
    </Link>
  );
}
