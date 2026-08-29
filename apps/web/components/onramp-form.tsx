'use client';

import { useState } from 'react';
import { AssetIcon, SelectDropdown } from '@powerpay/ui';

type Provider = 'moonpay' | 'coinbase';
export function OnrampForm({ initialAmount = '100', initialProvider = 'moonpay', initialAsset = 'USDC' }: { initialAmount?: string; initialProvider?: Provider; initialAsset?: 'USDC' | 'EURC' | 'SOL' }) {
  const [provider, setProvider] = useState<Provider>(initialProvider);
  const [asset, setAsset] = useState<'USDC' | 'EURC' | 'SOL'>(initialAsset);
  const [amount, setAmount] = useState(initialAmount);
  const [wallet, setWallet] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function openOnramp() {
    if (!(Number(amount) > 0)) return setError('Enter a valid fiat amount.');
    setBusy(true); setError('');
    try {
      const response = await fetch('/api/funding/onramp', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ provider, asset, amount, wallet }) });
      const body = await response.json() as { url?: string; error?: string };
      if (!response.ok || !body.url) throw new Error(body.error || `${provider} is not configured.`);
      window.location.assign(body.url);
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Unable to start onramp.'); }
    finally { setBusy(false); }
  }
  return (
    <section className="funding-form-card">
      <div className="funding-head"><BrandOnramp /><div><span className="section-kicker">Fiat onramp</span><h1>Buy crypto with fiat</h1><p>Choose a provider, destination asset and wallet. Provider capability stays deployment-gated.</p></div></div>
      <div className="funding-fields two-column-fields">
        <label><span>Provider</span><SelectDropdown value={provider} onChange={(e) => setProvider(e.target.value as Provider)} options={[{ value: 'moonpay', label: 'MoonPay' }, { value: 'coinbase', label: 'Coinbase Pay' }]} /></label>
        <label><span>Destination asset</span><SelectDropdown value={asset} leading={<AssetIcon asset={asset} size={23} />} onChange={(e) => setAsset(e.target.value as 'USDC' | 'EURC' | 'SOL')} options={[{ value: 'USDC', label: 'USDC · Solana' }, { value: 'EURC', label: 'EURC · Solana' }, { value: 'SOL', label: 'SOL · Solana' }]} /></label>
        <label><span>Fiat amount</span><div className="funding-input"><b>$</b><input inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))} /></div></label>
        <label><span>Destination wallet <small>optional</small></span><input className="plain-input" value={wallet} onChange={(e) => setWallet(e.target.value.trim())} placeholder="Solana wallet address" /></label>
      </div>
      <div className="provider-note"><strong>{provider === 'moonpay' ? 'MoonPay' : 'Coinbase Pay'}</strong><span>Rates, payment methods, KYC requirements and provider fees are shown by the provider before purchase.</span></div>
      {error ? <div className="notice">{error}</div> : null}
      <button type="button" className="primary-button full-button" disabled={busy || !(Number(amount) > 0)} onClick={() => void openOnramp()}>{busy ? 'Preparing…' : `Continue with ${provider === 'moonpay' ? 'MoonPay' : 'Coinbase Pay'}`} <span>→</span></button>
    </section>
  );
}
function BrandOnramp() { return <div className="funding-icon funding-icon-green">↗</div>; }
