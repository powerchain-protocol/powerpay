import Image from 'next/image';
import Link from 'next/link';
import { POWERPAY_PUBLIC_ASSETS } from '@powerpay/shared/assets';

export function PowerPayLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="brand" aria-label="PowerPay home">
      <Image src={POWERPAY_PUBLIC_ASSETS.brand.markGreen} alt="" width={46} height={46} priority />
      {!compact && (
        <div className="brand-copy">
          <div className="brand-word"><span>Power</span><strong>Pay</strong></div>
          <div className="brand-sub">Digital payment rails</div>
        </div>
      )}
    </Link>
  );
}
