import Link from 'next/link';
import { BrandIllustrationIcon } from '../components/brand-illustration-icon';

export function ProductPageContent() {
  return (
    <main className="product-page">
      <section className="product-hero">
        <div><span className="section-kicker">PowerPay products</span><h1>One payment rail.<br /><span>Three focused experiences.</span></h1><p>PowerPay connects consumer mobile payments, merchant checkout and operational dashboards to the same immutable intent, attempt and reconciliation engine.</p><div className="hero-actions"><Link href="/checkout" className="primary-button">Try checkout <span>→</span></Link><Link href="/#developers" className="secondary-button">View architecture</Link></div></div>
        <div className="product-device-stack" aria-label="PowerPay product mockups">
          <div className="phone-mockup"><div className="phone-top"><span>9:41</span><b>PowerPay</b><span>•••</span></div><div className="phone-balance"><small>USDC balance</small><strong>2,480.00</strong><span>USDC · Solana</span></div><div className="phone-actions"><i>Pay</i><i>Receive</i><i>Scan</i></div><div className="phone-activity"><small>Recent</small><div><span>Corner Market</span><b>-24.50 USDC</b></div><div><span>Invoice received</span><b>+125.00 USDC</b></div></div><div className="phone-nav"><span>⌂</span><span>→</span><strong>⌗</strong><span>≡</span><span>◇</span></div></div>
          <div className="dashboard-mockup"><div className="dash-side"><b>P</b><span>Overview</span><span>Payments</span><span>Orders</span><span>Customers</span><span>Reports</span></div><div className="dash-main"><div className="dash-head"><strong>Merchant overview</strong><button>New checkout</button></div><div className="dash-metrics"><article><small>Volume</small><b>$48.2K</b></article><article><small>Settled</small><b>1,284</b></article><article><small>Success</small><b>99.7%</b></article></div><div className="dash-chart"><span /><span /><span /><span /><span /><span /><span /></div><div className="dash-table"><div><b>Checkout</b><b>Asset</b><b>Status</b></div><div><span>Order #1842</span><span>USDC</span><em>Settled</em></div><div><span>Order #1841</span><span>SOL</span><em>Settled</em></div></div></div></div>
        </div>
      </section>
      <section className="product-cards">
        <article id="mobile"><BrandIllustrationIcon kind="mobile" /><span className="section-kicker">PowerPay Mobile</span><h2>Scan, pay and move money.</h2><p>USDC-first wallet experience with camera checkout, receive requests, wallet approvals, recovery, onramp, swap and bridge capabilities.</p><ul><li>Camera-first scan to pay</li><li>Phantom · Solflare · Backpack</li><li>PIN + biometric authorization</li><li>Wallet and portfolio operations</li></ul></article>
        <article><BrandIllustrationIcon kind="checkout" /><span className="section-kicker">Web Checkout</span><h2>Merchant-ready checkout.</h2><p>Responsive checkout with recipient locking, quote expiry, exact fee disclosure and wallet or funding-provider handoff.</p><ul><li>USDC / EURC / SOL / PWRC</li><li>Stripe card funding</li><li>MoonPay / Coinbase Pay onramp</li><li>Immutable settlement receipt</li></ul></article>
        <article><BrandIllustrationIcon kind="merchant" /><span className="section-kicker">Merchant Dashboard</span><h2>Operate payment flows.</h2><p>Operational surfaces for checkout creation, payment status, reconciliation, refunds and financial export without moving custody into the dashboard.</p><ul><li>Payment and settlement visibility</li><li>Role-based merchant operations</li><li>Reconciliation exceptions</li><li>Program and RPC health</li></ul></article>
      </section>
    </main>
  );
}
