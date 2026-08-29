'use client';

import { useMemo, useState } from 'react';
import { AssetIcon } from '@powerpay/ui';

export function CreditCard({ initialAmount = '100', initialAsset = 'USDC' }: { initialAmount?: string; initialAsset?: 'USDC' | 'EURC' }) {
  const [amount, setAmount] = useState(initialAmount);
  const [asset, setAsset] = useState<'USDC' | 'EURC'>(initialAsset);
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const numeric = Number(amount || 0);
  const fee = useMemo(() => Number.isFinite(numeric) && numeric > 0 ? Math.ceil(numeric * 0.02 * 100) / 100 : 0, [numeric]);
  const total = Number.isFinite(numeric) && numeric > 0 ? numeric + fee : 0;

  async function continueToStripe() {
    if (!(numeric > 0)) return setError('Enter a valid amount.');
    setBusy(true); setError('');
    try {
      const response = await fetch('/api/funding/stripe/session', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ amount, asset, email }) });
      const body = await response.json() as { url?: string; error?: string };
      if (!response.ok || !body.url) throw new Error(body.error || 'Stripe Checkout is not configured.');
      window.location.assign(body.url);
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Unable to start card checkout.'); }
    finally { setBusy(false); }
  }

  return (
    <section className="funding-form-card">
      <div className="funding-head"><div className="funding-icon">••••</div><div><span className="section-kicker">Credit card</span><h1>Fund with card</h1><p>Card details are collected on Stripe-hosted Checkout. PowerPay never receives raw card numbers.</p></div></div>
      <div className="funding-fields">
        <label><span>Destination asset</span><div className="funding-asset-select"><AssetIcon asset={asset} size={26} /><select value={asset} onChange={(e) => setAsset(e.target.value as 'USDC' | 'EURC')}><option value="USDC">USDC</option><option value="EURC">EURC</option></select></div></label>
        <label><span>You pay</span><div className="funding-input"><b>{asset === 'EURC' ? '€' : '$'}</b><input inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))} /></div></label>
        <label><span>Receipt email <small>optional</small></span><input className="plain-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" /></label>
      </div>
      <div className="funding-summary"><div><span>Funding amount</span><strong>{numeric > 0 ? numeric.toFixed(2) : '0.00'}</strong></div><div><span>PowerPay service fee · 2%</span><strong>{fee.toFixed(2)}</strong></div><div className="funding-total"><span>Total before provider/network costs</span><strong>{total.toFixed(2)}</strong></div></div>
      {error ? <div className="notice">{error}</div> : null}
      <button type="button" className="primary-button full-button" disabled={busy || !(numeric > 0)} onClick={() => void continueToStripe()}>{busy ? 'Opening Stripe…' : 'Continue to secure card payment'} <span>→</span></button>
      <p className="funding-disclaimer">Stripe may apply additional card, FX, tax, or regional fees. Those provider charges are disclosed by Stripe before authorization.</p>
    </section>
  );
}
