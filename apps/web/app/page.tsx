import Link from 'next/link';
import { AssetIcon, NetworkIcon } from '@powerpay/ui';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { LandingCheckoutPreview } from '../components/landing-checkout-preview';

const rails = [
  { title: 'Checkout', copy: 'A focused payment surface for USDC, EURC, SOL and PWRC with exact fee disclosure.', tag: 'Pay' },
  { title: 'Scan to pay', copy: 'Resolve Solana Pay and PowerPay QR requests into the same canonical payment intent.', tag: 'Scan' },
  { title: 'Wallet approval', copy: 'Authentication and wallet authorization stay separate. PowerPay never needs a seed phrase.', tag: 'Approve' },
  { title: 'Settlement', copy: 'Chain confirmation is reconciled against the immutable intent before a receipt is issued.', tag: 'Verify' },
];

export default function HomePage() {
  return (
    <div className="site-shell">
      <SiteHeader active="home" />
      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="hero-badge"><span className="context-dot live" />USDC-first · Non-custodial</div>
            <h1>Payments that feel simple.<br /><span>Settlement that stays verifiable.</span></h1>
            <p className="hero-lead">PowerPay gives merchants and customers one clean checkout for digital payments—wallet approved, quote locked, and reconciled against the chain before completion.</p>
            <div className="hero-actions">
              <Link href="/checkout" className="primary-button">Open checkout <span>→</span></Link>
              <Link href="#developers" className="secondary-button">Explore infrastructure</Link>
            </div>
            <div className="hero-proof">
              <div><strong>USDC</strong><span>Default payment asset</span></div>
              <div><strong>1 intent</strong><span>Across scan, checkout & API</span></div>
              <div><strong>Non-custodial</strong><span>Your wallet approves</span></div>
            </div>
          </div>
          <LandingCheckoutPreview />
        </section>

        <section className="rail-strip" aria-label="Supported payment assets and networks">
          <span>Built for modern payment rails</span>
          <div><AssetIcon asset="USDC" size={24} />USDC</div>
          <div><AssetIcon asset="EURC" size={24} />EURC</div>
          <div><AssetIcon asset="SOL" size={24} />SOL</div>
          <div><AssetIcon asset="PWRC" size={25} />PWRC</div>
          <div><NetworkIcon network="solana" size={24} />Solana</div>
          <div className="muted-rail"><NetworkIcon network="sui" size={24} />Sui <small>gated</small></div>
        </section>

        <section className="section" id="product">
          <div className="section-heading">
            <div><span className="section-kicker">Payment experience</span><h2>One surface from intent to receipt.</h2></div>
            <p>PowerPay hides protocol complexity until it is useful. Customers see a merchant, amount, asset, network, fees, and one explicit approval action.</p>
          </div>
          <div className="feature-grid">
            {rails.map((item, index) => <article className="feature-card" key={item.title}><span className="feature-index">0{index + 1}</span><span className="feature-tag">{item.tag}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}
          </div>
        </section>

        <section className="split-section">
          <div className="split-copy">
            <span className="section-kicker">Local & online payments</span>
            <h2>Scan at the counter. Checkout on the web.</h2>
            <p>Whether a payment starts from a camera, a merchant checkout, an API action, or a wallet send, it converges on the same immutable PowerPay intent and attempt model.</p>
            <ul className="check-list">
              <li><span>✓</span> Solana Pay-compatible QR resolution</li>
              <li><span>✓</span> Merchant trust and anti-replay controls</li>
              <li><span>✓</span> Quote expiry before wallet signature</li>
              <li><span>✓</span> Recovery without blind rebroadcast</li>
            </ul>
            <Link href="/checkout" className="text-link">Try the web checkout →</Link>
          </div>
          <div className="flow-card">
            <div className="flow-row active"><span>01</span><div><strong>Create intent</strong><small>Merchant · amount · asset · reference</small></div><b>Locked</b></div>
            <div className="flow-line" />
            <div className="flow-row"><span>02</span><div><strong>Wallet approval</strong><small>Simulation + signed fee quote</small></div><b>Approve</b></div>
            <div className="flow-line" />
            <div className="flow-row"><span>03</span><div><strong>Chain settlement</strong><small>Submit · confirm · reconcile</small></div><b>Verify</b></div>
            <div className="flow-line" />
            <div className="flow-row success"><span>04</span><div><strong>Receipt</strong><small>Immutable settlement record</small></div><b>Settled</b></div>
          </div>
        </section>

        <section className="section architecture-section" id="developers">
          <div className="section-heading">
            <div><span className="section-kicker">Infrastructure</span><h2>Payment UX above a canonical engine.</h2></div>
            <p>The website does not invent payment state. It reads and advances the same backend state machine used by mobile, QR and Solana Actions.</p>
          </div>
          <div className="architecture-grid">
            <div className="architecture-layer"><span>Experience</span><strong>Web · Mobile · QR · Actions</strong></div>
            <div className="architecture-arrow">↓</div>
            <div className="architecture-layer green-layer"><span>PowerPay Core</span><strong>Intent · Quote · Attempt · Policy</strong></div>
            <div className="architecture-arrow">↓</div>
            <div className="architecture-layer"><span>Execution</span><strong>Solana adapter · RPC · Programs</strong></div>
            <div className="architecture-arrow">↓</div>
            <div className="architecture-layer"><span>Record</span><strong>Ledger · Reconciliation · Receipt</strong></div>
          </div>
        </section>

        <section className="security-section" id="security">
          <div className="security-copy"><span className="section-kicker">Security by design</span><h2>Your account is not your wallet.</h2><p>PowerPay keeps identity, wallet connection and payment authorization as separate security boundaries. The browser requests a signature; the wallet remains the signer.</p></div>
          <div className="security-grid">
            <article><strong>Immutable review</strong><span>Recipient, amount, asset and network lock before signing.</span></article>
            <article><strong>Idempotent attempts</strong><span>Retries cannot silently create a second independent payment.</span></article>
            <article><strong>Fail-closed capabilities</strong><span>Unavailable bridge, vault or Sui execution stays disabled.</span></article>
          </div>
        </section>

        <section className="final-cta">
          <div><span className="section-kicker">PowerPay</span><h2>A cleaner checkout for onchain payments.</h2><p>Start with USDC on Solana and keep the underlying execution auditable.</p></div>
          <Link href="/checkout" className="primary-button">Launch checkout <span>→</span></Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
