import { AssetIcon, NetworkIcon } from '@powerpay/ui';

export function LandingCheckoutPreview() {
  return (
    <div className="hero-product" aria-label="PowerPay checkout preview">
      <div className="preview-topbar">
        <span><span className="preview-dot" />Checkout preview</span>
        <span className="preview-network"><NetworkIcon network="solana" size={16} /> Solana</span>
      </div>
      <div className="preview-body">
        <div className="preview-main">
          <span className="section-kicker">PowerPay checkout</span>
          <h3>Complete payment</h3>
          <p>Fast, transparent checkout with a signed quote before wallet approval.</p>
          <div className="preview-field">
            <div className="asset-id"><AssetIcon asset="USDC" size={30} />USDC</div>
            <div className="preview-amount"><strong>125.00</strong><span>$125.00</span></div>
          </div>
          <div className="preview-method active-method"><span className="radio-dot" />Wallet payment <span>Recommended</span></div>
          <div className="preview-method"><span className="radio-dot empty" />Solana Pay <span>QR / link</span></div>
          <button type="button" className="preview-pay">Review payment</button>
        </div>
        <aside className="preview-summary">
          <span className="section-kicker">Order summary</span>
          <div className="merchant-avatar">P</div>
          <strong>PowerPay Demo</strong>
          <span className="verified-line">✓ Verified merchant</span>
          <dl>
            <div><dt>Payment</dt><dd>125.00 USDC</dd></div>
            <div><dt>Network</dt><dd>Solana</dd></div>
            <div><dt>Quote</dt><dd>Locked</dd></div>
          </dl>
          <div className="preview-total"><span>Total</span><strong>125.00 USDC</strong></div>
        </aside>
      </div>
    </div>
  );
}
