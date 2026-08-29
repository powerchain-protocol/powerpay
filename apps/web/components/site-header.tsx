import Link from 'next/link';
import { Logo } from './logo';
import { NetworkRpcControls } from './network-rpc-controls';
import { HeaderWalletConnect } from './header-wallet-connect';

export function SiteHeader({ active = 'home' }: { active?: 'home' | 'checkout' | 'product' | 'about' | 'status' }) {
  return (
    <header className="site-header">
      <Logo />
      <nav className="header-nav" aria-label="Primary navigation">
        <Link href="/product" className={active === 'product' ? 'header-link active' : 'header-link'}>Product</Link>
        <Link href="/checkout" className={active === 'checkout' ? 'header-link active' : 'header-link'}>Checkout</Link>
        <Link href="/#developers" className="header-link">Infrastructure</Link>
        <Link href="/about" className={active === 'about' ? 'header-link active' : 'header-link'}>About</Link>
        <Link href="/status" className={active === 'status' ? 'header-link active' : 'header-link'}>Status</Link>
      </nav>
      <div className="header-actions">
        <NetworkRpcControls compact />
        <HeaderWalletConnect />
      </div>
    </header>
  );
}
