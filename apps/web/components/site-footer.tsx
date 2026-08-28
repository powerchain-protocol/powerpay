import Link from 'next/link';
import { PowerPayLogo } from './powerpay-logo';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <PowerPayLogo />
        <p>USDC-first payments with wallet approval, deterministic fees, and verifiable settlement.</p>
      </div>
      <div className="footer-links">
        <div><strong>Product</strong><Link href="/checkout">Checkout</Link><Link href="/#product">Payments</Link><Link href="/#security">Security</Link></div>
        <div><strong>Resources</strong><Link href="/#developers">Developers</Link><Link href="/asset-preview">Assets</Link><a href="https://github.com/powerchain-protocol" target="_blank" rel="noreferrer">GitHub</a></div>
      </div>
      <div className="footer-bottom"><span>© 2026 PowerPay</span><span>Non-custodial · Wallet authorized</span></div>
    </footer>
  );
}
