import Link from 'next/link';
import { PowerPayLogo } from './powerpay-logo';

export function SiteHeader({ active = 'home' }: { active?: 'home' | 'checkout' }) {
  return (
    <header className="site-header">
      <PowerPayLogo />
      <nav className="header-nav" aria-label="Primary navigation">
        <Link href="/#product" className={active === 'home' ? 'header-link active' : 'header-link'}>Product</Link>
        <Link href="/checkout" className={active === 'checkout' ? 'header-link active' : 'header-link'}>Checkout</Link>
        <Link href="/#developers" className="header-link">Developers</Link>
        <Link href="/#security" className="header-link">Security</Link>
      </nav>
      <div className="header-actions">
        <span className="network-badge"><span className="network-dot" />Solana</span>
        <Link href="/checkout" className="header-cta">Open PowerPay</Link>
      </div>
    </header>
  );
}
