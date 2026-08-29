'use client';

import Link from 'next/link';
import { StatusBadge } from '@powerpay/ui';
import { MarketReference } from './market-reference';

const EXECUTION_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_POWERPAY_DEMO_RECIPIENT);

export function Topbar() {
  return (
    <div className="topbar" role="status" aria-label="PowerPay environment">
      <div className="topbar-left">
        <StatusBadge tone={EXECUTION_CONFIGURED ? 'success' : 'warning'} dot>
          {EXECUTION_CONFIGURED ? 'Payment execution configured' : 'Preview mode'}
        </StatusBadge>
        <span>PowerPay · Non-custodial checkout</span>
      </div>
      <div className="topbar-right">
        <MarketReference compact />
        <Link href="/product">Mobile + merchant products</Link>
      </div>
    </div>
  );
}
