import Link from 'next/link';
import { Logo } from './logo';
import { SocialIcon, type SocialKind } from './social-icon';

const socialCandidates: Array<{ kind: SocialKind; label: string; href?: string }> = [
  { kind: 'x', label: 'X', href: process.env.NEXT_PUBLIC_POWERPAY_X_URL || 'https://x.com/powerchain_ai' },
  { kind: 'github', label: 'GitHub', href: process.env.NEXT_PUBLIC_POWERPAY_GITHUB_URL || 'https://github.com/powerchain-protocol' },
  { kind: 'telegram', label: 'Telegram', href: process.env.NEXT_PUBLIC_POWERPAY_TELEGRAM_URL },
  { kind: 'medium', label: 'Medium', href: process.env.NEXT_PUBLIC_POWERPAY_MEDIUM_URL },
];

const socials = socialCandidates.filter((item): item is { kind: SocialKind; label: string; href: string } => Boolean(item.href));

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Logo showTagline={false} />
        <p>USDC-first payments with explicit wallet approval, signed fee quotes, separate Solana runtime fees and verifiable settlement.</p>
        <div className="footer-brand-actions"><Link href="/checkout" className="footer-cta">Open checkout <span>→</span></Link><Link href="/product" className="footer-text-link">View products</Link></div>
        <div className="social-links" aria-label="PowerChain social links">{socials.map((item) => <a key={item.kind} href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}><SocialIcon kind={item.kind} /></a>)}</div>
      </div>
      <div className="footer-links">
        <div><strong>Product</strong><Link href="/product">Overview</Link><Link href="/checkout">Checkout</Link><Link href="/checkout/card">Card</Link><Link href="/checkout/onramp">Onramp</Link></div>
        <div><strong>Company</strong><Link href="/about">About</Link><Link href="/#security">Security</Link><Link href="/#faq">FAQ</Link><Link href="/status">System status</Link><a href="https://github.com/powerchain-protocol" target="_blank" rel="noreferrer">Developers</a></div>
        <div><strong>Legal</strong><Link href="/legal/privacy">Privacy</Link><Link href="/legal/terms">Terms</Link><Link href="/legal/cookies">Cookies</Link><Link href="/legal/disclaimer">Disclaimer</Link></div>
      </div>
      <div className="footer-bottom"><span>© 2026 PowerPay · Powered by PowerChain</span><span>Non-custodial · Wallet authorized · Solana settlement</span></div>
    </footer>
  );
}
