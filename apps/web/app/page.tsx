import Link from 'next/link';
import { AssetIcon, NetworkIcon } from '@powerpay/ui';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { LandingCheckoutPreview } from '../components/landing-checkout-preview';
import { InfrastructureDemoCard } from '../components/infrastructure-demo-card';
import { Topbar } from '../components/topbar';
import { BrandIllustrationIcon } from '../components/brand-illustration-icon';

const rails = [
  { title: 'Checkout', copy: 'A focused payment surface for USDC, EURC, SOL and PWRC with exact fee disclosure.', tag: 'Pay' },
  { title: 'Scan to pay', copy: 'Resolve Solana Pay and PowerPay QR requests into the same canonical payment intent.', tag: 'Scan' },
  { title: 'Wallet approval', copy: 'Authentication and wallet authorization stay separate. PowerPay never needs a seed phrase.', tag: 'Approve' },
  { title: 'Settlement', copy: 'Chain confirmation is reconciled against the immutable intent before a receipt is issued.', tag: 'Verify' },
];

const faq = [
  ['Does PowerPay hold customer funds?', 'No. PowerPay is designed as a non-custodial payment layer. The wallet remains the signer and transaction authorization is explicit.'],
  ['What fees are shown before payment?', 'The payment review separates the purchase amount, the 2% PowerPay service fee, any asset-specific protocol fee, and the Solana network fee. The final fee quote is locked before signature.'],
  ['Can I switch between Devnet and Mainnet Beta?', 'Yes when both deployments are configured. Mainnet Beta is gated by deployment configuration so a frontend toggle cannot invent a production backend.'],
  ['Which RPC providers can PowerPay use?', 'A managed PowerPay/Helius route is the default. A deployment may also allow a reviewed custom RPC. Solana public RPC is limited to development/devnet use in this interface.'],
  ['How does PowerPay use Pyth?', 'Pyth is the transactional price source for configured conversion pairs. Quotes are checked for freshness and confidence. If the price cannot be trusted, conversion-dependent flows fail closed.'],
  ['What is PWRC in PowerPay?', 'PWRC is the PowerChain Token on Solana Token-2022. PowerPay uses the official PowerChain mark for dense UI and the premium PWRC coin artwork for larger token surfaces.'],
];

export default function HomePage() {
  return (
    <div className="site-shell">
      <Topbar />
      <SiteHeader active="home" />
      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="hero-badge"><span className="context-dot live" />USDC-first · Non-custodial</div>
            <h1>Payments that feel simple.<br /><span>Settlement that stays verifiable.</span></h1>
            <p className="hero-lead">PowerPay gives merchants and customers one clean checkout for digital payments—wallet approved, quote locked, and reconciled against the chain before completion.</p>
            <div className="hero-actions">
              <Link href="/checkout" className="primary-button">Open checkout <span>→</span></Link>
              <Link href="/product" className="secondary-button">Explore products</Link>
            </div>
            <div className="hero-proof">
              <div><strong>USDC</strong><span>Default payment asset</span></div>
              <div><strong>2.00%</strong><span>PowerPay service fee</span></div>
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

        <section className="product-strip" aria-label="PowerPay product experiences">
          <article><BrandIllustrationIcon kind="mobile" size={58} /><div><span className="section-kicker">Mobile app</span><strong>Scan, pay, receive.</strong><p>Floating navigation, camera-first checkout and wallet-authorized payments.</p></div><Link href="/product#mobile">View mobile →</Link></article>
          <article><BrandIllustrationIcon kind="checkout" size={58} /><div><span className="section-kicker">Web checkout</span><strong>Merchant-ready payment card.</strong><p>Recipient locking, fee quotes, wallet, Stripe and onramp handoffs.</p></div><Link href="/checkout">Open checkout →</Link></article>
          <article><BrandIllustrationIcon kind="merchant" size={58} /><div><span className="section-kicker">Dashboard</span><strong>Operate settlement.</strong><p>Payments, reconciliation and receipts above the same canonical engine.</p></div><Link href="/product">View products →</Link></article>
        </section>

        <section className="token-brand-section" aria-label="PowerChain token identity">
          <div className="token-brand-copy">
            <span className="section-kicker">PowerChain assets</span>
            <h2>Premium token artwork where detail matters.</h2>
            <p>Dense payment UI uses the simplified PowerChain mark. Portfolio, purchase and token-detail surfaces use the full metallic PWRC artwork. wPWRC stays visually distinct as the wrapped Sui representation.</p>
            <div className="token-brand-pills"><span>PWRC · Solana · Token-2022</span><span>wPWRC · Sui · 1:1 representation</span></div>
          </div>
          <div className="token-showcase">
            <article><AssetIcon asset="PWRC" size={150} detailed /><div><strong>PWRC</strong><span>PowerChain Token</span></div></article>
            <article><AssetIcon asset="wPWRC" size={150} detailed /><div><strong>wPWRC</strong><span>Wrapped PowerChain Token</span></div></article>
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
          <div className="architecture-two-column">
            <div className="architecture-grid">
              <div className="architecture-layer"><span>Experience</span><strong>Web · Mobile · QR · Actions</strong></div>
              <div className="architecture-arrow">↓</div>
              <div className="architecture-layer green-layer"><span>PowerPay Core</span><strong>Intent · Quote · Attempt · Policy</strong></div>
              <div className="architecture-arrow">↓</div>
              <div className="architecture-layer"><span>Execution</span><strong>Solana adapter · RPC · Programs</strong></div>
              <div className="architecture-arrow">↓</div>
              <div className="architecture-layer"><span>Record</span><strong>Ledger · Reconciliation · Receipt</strong></div>
            </div>
            <InfrastructureDemoCard />
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

        <section className="section faq-section" id="faq">
          <div className="section-heading">
            <div><span className="section-kicker">FAQ</span><h2>PowerPay payment questions.</h2></div>
            <p>Operational details stay explicit: custody, fees, network selection, RPC routing, oracle data and PWRC are separated so the UI does not imply guarantees the backend cannot make.</p>
          </div>
          <div className="faq-list">
            {faq.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}
          </div>
        </section>

        <section className="final-cta">
          <div><span className="section-kicker">PowerPay</span><h2>A cleaner checkout for onchain payments.</h2><p>Start with USDC on Solana and keep fees, pricing, RPC routing and settlement auditable.</p></div>
          <Link href="/checkout" className="primary-button">Launch checkout <span>→</span></Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
