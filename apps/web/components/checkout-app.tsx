'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { PublicKey, Transaction } from '@solana/web3.js';
import { Buffer } from 'buffer';
import { AssetIcon, NetworkIcon, SelectDropdown, StatusBadge, WalletIcon } from '@powerpay/ui';
import { powerPayFetch, type CheckoutAsset, type FeeQuote, type PaymentAttempt, type PaymentIntent } from '../lib/powerpay-api';
import { NETWORK_PREFERENCES_EVENT, readNetworkPreferences, type PowerPayRpcProfile, type PowerPaySolanaCluster } from '../lib/network-preferences';
import { compactAddress, formatNumber, secondsUntil } from '../utils/util';
import { errorMessage } from '../lib/errors';
import { MarketReference } from './market-reference';
import { NetworkRpcControls } from './network-rpc-controls';
import { connectedBrowserWallet, WALLET_CONNECTED_EVENT, WalletConnectModal, type BrowserSolanaProvider, type WalletKind } from './wallet-connect-modal';

const DEFAULT_RECIPIENT = process.env.NEXT_PUBLIC_POWERPAY_DEMO_RECIPIENT || '';
const MERCHANT_ID = process.env.NEXT_PUBLIC_POWERPAY_DEMO_MERCHANT_ID || undefined;
const MERCHANT_NAME = process.env.NEXT_PUBLIC_POWERPAY_DEMO_MERCHANT_NAME || 'PowerPay Demo Store';
const DEFAULT_AMOUNT = process.env.NEXT_PUBLIC_POWERPAY_DEMO_AMOUNT || '125.00';
const SERVICE_FEE_BPS = 200;

type Stage = 'SELECT' | 'REVIEW' | 'SIGNING' | 'SUBMITTED' | 'SETTLED';
type PaymentMethod = 'wallet' | 'solana-pay' | 'stripe' | 'moonpay' | 'coinbase';
type NetworkPreference = { cluster: PowerPaySolanaCluster; rpcProfile: PowerPayRpcProfile };
type AttemptResponse = { intent: PaymentIntent; attempt: PaymentAttempt; payload: { transaction: string }; simulation: { ok?: boolean }; idempotent: boolean };
const RPC_LABEL: Record<PowerPayRpcProfile, string> = { managed: 'PowerPay RPC · Helius', custom: 'Custom RPC', public: 'Solana Public RPC' };

function isSolanaAddress(value: string) { try { return new PublicKey(value.trim()).toBase58() === value.trim(); } catch { return false; } }

export function CheckoutApp() {
  const [asset, setAsset] = useState<CheckoutAsset>('USDC');
  const [amount, setAmount] = useState(DEFAULT_AMOUNT);
  const [recipient, setRecipient] = useState(DEFAULT_RECIPIENT);
  const [method, setMethod] = useState<PaymentMethod>('wallet');
  const [walletOpen, setWalletOpen] = useState(false);
  const [wallet, setWallet] = useState<{ provider: BrowserSolanaProvider; address: string; kind: WalletKind } | null>(null);
  const [intent, setIntent] = useState<PaymentIntent | null>(null);
  const [quote, setQuote] = useState<FeeQuote | null>(null);
  const [attempt, setAttempt] = useState<PaymentAttempt | null>(null);
  const [stage, setStage] = useState<Stage>('SELECT');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [paymentKey, setPaymentKey] = useState('');
  const [clock, setClock] = useState(() => Date.now());
  const [network, setNetwork] = useState<NetworkPreference>({ cluster: 'devnet', rpcProfile: 'managed' });
  const recipientManaged = Boolean(DEFAULT_RECIPIENT);
  const configured = isSolanaAddress(recipient);

  useEffect(() => { setPaymentKey(crypto.randomUUID()); setNetwork(readNetworkPreferences()); const detected = connectedBrowserWallet(); if (detected) setWallet(detected); const syncWallet = () => { const next = connectedBrowserWallet(); if (next) setWallet(next); }; window.addEventListener(WALLET_CONNECTED_EVENT, syncWallet); return () => window.removeEventListener(WALLET_CONNECTED_EVENT, syncWallet); }, []);
  useEffect(() => {
    const handler = () => { setNetwork(readNetworkPreferences()); reset(true, 'Network or RPC changed. Review the payment again before signing.'); };
    window.addEventListener(NETWORK_PREFERENCES_EVENT, handler);
    return () => window.removeEventListener(NETWORK_PREFERENCES_EVENT, handler);
  }, []);
  useEffect(() => { if (!quote) return; const timer = window.setInterval(() => setClock(Date.now()), 1000); return () => window.clearInterval(timer); }, [quote]);

  const numericAmount = Number(amount || 0);
  const validAmount = Number.isFinite(numericAmount) && numericAmount > 0;
  const total = quote?.total || (validAmount ? amount : '0');
  const quoteSeconds = useMemo(() => secondsUntil(quote?.expiresAt, clock), [quote, clock]);
  const previewServiceFee = validAmount ? numericAmount * SERVICE_FEE_BPS / 10_000 : 0;
  const processStep = stage === 'SETTLED' ? 3 : stage === 'SELECT' ? 1 : 2;

  async function createReview() {
    if (!validAmount) return setMessage('Enter a valid payment amount.');
    if (!configured) return setMessage('Enter a valid Solana recipient before creating the payment intent.');
    if (!paymentKey) return setMessage('Preparing checkout session…');
    setBusy(true); setMessage('');
    try {
      const created = await powerPayFetch<{ intent: PaymentIntent }>('/api/v1/payments/intents', {
        method: 'POST',
        headers: { 'x-idempotency-key': `web-checkout:${paymentKey}:${asset}:${amount}:${recipient}:${network.cluster}:${network.rpcProfile}` },
        body: JSON.stringify({ source: 'CHECKOUT', network: 'SOLANA', asset, amount, fiatCurrency: asset === 'EURC' ? 'EUR' : 'USD', recipient: recipient.trim(), merchantId: MERCHANT_ID, reference: `WEB-${paymentKey}` }),
      });
      const locked = await powerPayFetch<{ intent: PaymentIntent; feeQuote: FeeQuote }>(`/api/v1/payments/intents/${created.intent.id}/lock`, { method: 'POST', body: '{}' });
      setIntent(locked.intent); setQuote(locked.feeQuote); setStage('REVIEW');
    } catch (error) { setMessage(errorMessage(error, 'Unable to prepare payment.')); }
    finally { setBusy(false); }
  }

  async function payWithWallet() {
    if (!wallet) return setWalletOpen(true);
    if (!intent || !quote) return createReview();
    if (quoteSeconds <= 0) { reset(true, 'The fee quote expired. Refresh the payment review before signing.'); return; }
    setBusy(true); setMessage(''); setStage('SIGNING');
    let startedAttemptId = ''; let signedMarked = false;
    try {
      const started = await powerPayFetch<AttemptResponse>(`/api/v1/payments/intents/${intent.id}/attempts`, {
        method: 'POST', headers: { 'x-idempotency-key': `web-attempt:${intent.id}:${wallet.address}` }, body: JSON.stringify({ walletAddress: wallet.address, feeQuoteId: quote.id }),
      });
      if (started.simulation?.ok === false) throw new Error('PowerPay simulation rejected this payment before wallet authorization.');
      startedAttemptId = started.attempt.id; setAttempt(started.attempt);
      const transaction = Transaction.from(Buffer.from(started.payload.transaction, 'base64'));
      const signed = await wallet.provider.signTransaction(transaction);
      const signedBase64 = Buffer.from(signed.serialize()).toString('base64');
      await powerPayFetch(`/api/v1/payments/intents/${intent.id}/attempts/${started.attempt.id}/signed`, { method: 'POST', body: '{}' });
      signedMarked = true;
      const submitted = await powerPayFetch<{ intent: PaymentIntent; attempt: PaymentAttempt }>(`/api/v1/payments/intents/${intent.id}/attempts/${started.attempt.id}/submit`, { method: 'POST', body: JSON.stringify({ signedTransaction: signedBase64 }) });
      setAttempt(submitted.attempt); setStage('SUBMITTED');
      await reconcileUntilSettled(intent.id, started.attempt.id, quote.id);
    } catch (error) {
      if (startedAttemptId && !signedMarked) await powerPayFetch(`/api/v1/payments/intents/${intent.id}/attempts/${startedAttemptId}/abort`, { method: 'POST', body: '{}' }).catch(() => undefined);
      setStage('REVIEW'); setMessage(errorMessage(error, 'Payment authorization failed.'));
    } finally { setBusy(false); }
  }

  async function reconcileUntilSettled(intentId: string, attemptId: string, feeQuoteId: string) {
    for (let index = 0; index < 12; index += 1) {
      const result = await powerPayFetch<{ intent: PaymentIntent; attempt: PaymentAttempt; confirmationStatus: string; receipt?: { receiptId: string } }>(`/api/v1/payments/intents/${intentId}/attempts/${attemptId}/reconcile`, { method: 'POST', body: JSON.stringify({ feeQuoteId }) });
      setIntent(result.intent); setAttempt(result.attempt);
      if (result.intent.status === 'SETTLED' && result.receipt) { setStage('SETTLED'); setMessage('Payment settled and receipt issued.'); return; }
      if (result.confirmationStatus === 'FAILED') throw new Error('The transaction failed on chain.');
      await new Promise((resolve) => setTimeout(resolve, 1800));
    }
    setMessage('Payment submitted. Confirmation is still pending; PowerPay can resume reconciliation safely.');
  }

  function reset(rotateKey = false, nextMessage = '') { setIntent(null); setQuote(null); setAttempt(null); setStage('SELECT'); setMessage(nextMessage); if (rotateKey) setPaymentKey(crypto.randomUUID()); }
  function switchMethod(next: PaymentMethod) { if (stage !== 'SELECT') reset(true, 'Payment method changed. Review again before signing.'); setMethod(next); }
  function externalMethodHref() {
    const qs = new URLSearchParams({ amount: validAmount ? amount : '100', asset });
    if (method === 'stripe') return `/checkout/card?${qs}`;
    if (method === 'coinbase') { qs.set('provider', 'coinbase'); return `/checkout/onramp?${qs}`; }
    if (method === 'moonpay') { qs.set('provider', 'moonpay'); return `/checkout/onramp?${qs}`; }
    return '/product#mobile';
  }

  return (
    <>
      <div className="checkout-network-controls"><NetworkRpcControls /></div>
      <div className="checkout-grid checkout-grid-refined">
        <section className="panel main-panel checkout-main-card">
          <div className="checkout-title-row"><div><span className="section-kicker">PowerPay checkout</span><h1>Complete payment</h1><p className="eyebrow">Exact recipient, asset, fees and execution context lock before wallet authorization.</p></div><StatusBadge tone={network.cluster === 'mainnet-beta' ? 'success' : 'warning'} dot>{network.cluster === 'mainnet-beta' ? 'Mainnet Beta' : 'Devnet'}</StatusBadge></div>
          <div className="process-compact" aria-label="Payment process">{['Details','Approve','Receipt'].map((name, i) => <div className={processStep >= i + 1 ? 'active' : ''} key={name}><span>{processStep > i + 1 ? '✓' : i + 1}</span><b>{name}</b>{i < 2 ? <i /> : null}</div>)}</div>

          {stage === 'SETTLED' ? <div className="success-state compact-success"><div className="success-mark">✓</div><span className="section-kicker">Payment complete</span><h2>{amount} {asset}</h2><p>Settlement was reconciled and the receipt no longer depends on this wallet connection.</p><div className="success-meta"><span>Recipient<strong>{compactAddress(recipient, 7, 5)}</strong></span><span>Network<strong>Solana · {network.cluster === 'mainnet-beta' ? 'Mainnet Beta' : 'Devnet'}</strong></span><span>Transaction<strong>{attempt?.transactionId ? compactAddress(attempt.transactionId, 8, 6) : 'Confirmed'}</strong></span></div><button className="primary-button full-button" type="button" onClick={() => reset(true)}>New payment</button></div> : <>
            <div className="checkout-form-stack">
              <div className="amount-box borderless-payment-box"><SelectDropdown className="asset-select-dropdown" aria-label="Payment asset" value={asset} leading={<AssetIcon asset={asset} size={29} />} disabled={stage !== 'SELECT'} onChange={(event) => { setAsset(event.target.value as CheckoutAsset); reset(true); }} options={[{ value: 'USDC', label: 'USDC' }, { value: 'EURC', label: 'EURC' }, { value: 'SOL', label: 'SOL' }, { value: 'PWRC', label: 'PWRC' }]} /><div className="amount-control"><input className="amount-input" inputMode="decimal" value={amount} disabled={stage !== 'SELECT'} onChange={(event) => { setAmount(event.target.value.replace(/[^0-9.]/g,'')); reset(true); }} aria-label="Payment amount" /><span className="amount-reference">{asset === 'USDC' ? 'USD stablecoin' : asset === 'EURC' ? 'Euro stablecoin' : asset === 'PWRC' ? 'PowerChain · Token-2022' : 'SOL · Pyth rate below'}</span></div></div>
              <div className="quick-amounts compact-amounts">{['25','50','125','250'].map(value => <button type="button" disabled={stage !== 'SELECT'} className={amount === value ? 'quick-amount active' : 'quick-amount'} key={value} onClick={() => { setAmount(value); reset(true); }}>{value}</button>)}</div>

              <label className="recipient-field"><span><b>Recipient</b><small>{recipientManaged ? 'Merchant configured' : 'Required'}</small></span><div><input value={recipient} disabled={stage !== 'SELECT' || recipientManaged} onChange={(e) => { setRecipient(e.target.value.trim()); reset(true); }} placeholder="Solana recipient address" autoComplete="off" spellCheck={false} /><StatusBadge tone={configured ? 'success' : 'warning'}>{configured ? 'Valid' : 'Check address'}</StatusBadge></div></label>

              <div className="payment-method-grid"><span className="field-label">Payment method</span><div className="method-grid">
                <button type="button" onClick={() => switchMethod('wallet')} className={method === 'wallet' ? 'method-tile selected' : 'method-tile'}><WalletIcon wallet={wallet?.kind || 'phantom'} size={27}/><span><strong>Wallet</strong><small>{wallet ? compactAddress(wallet.address) : 'Phantom · Solflare · Backpack'}</small></span></button>
                <button type="button" onClick={() => switchMethod('solana-pay')} className={method === 'solana-pay' ? 'method-tile selected' : 'method-tile'}><NetworkIcon network="solana" size={27}/><span><strong>Solana Pay</strong><small>QR / mobile handoff</small></span></button>
                <button type="button" onClick={() => switchMethod('stripe')} className={method === 'stripe' ? 'method-tile selected' : 'method-tile'}><span className="method-glyph">••••</span><span><strong>Credit card</strong><small>Stripe Checkout</small></span></button>
                <button type="button" onClick={() => switchMethod('moonpay')} className={method === 'moonpay' ? 'method-tile selected' : 'method-tile'}><span className="method-glyph">M</span><span><strong>MoonPay</strong><small>Fiat onramp</small></span></button>
                <button type="button" onClick={() => switchMethod('coinbase')} className={method === 'coinbase' ? 'method-tile selected' : 'method-tile'}><span className="method-glyph">C</span><span><strong>Coinbase Pay</strong><small>Onramp provider</small></span></button>
              </div></div>

              {asset === 'SOL' ? <div className="mini-rate-row"><MarketReference compact/><span>Transactional conversion uses the backend Pyth provider and quote freshness policy.</span></div> : null}
              {quote ? <div className="quote-lock"><span className="quote-lock-icon">⌁</span><div><strong>Rate + fee quote locked</strong><small>Expires in {quoteSeconds}s · network/RPC changes require a new review</small></div></div> : null}
              {message ? <div className={stage === 'SUBMITTED' ? 'notice info' : 'notice'}>{message}</div> : null}
            </div>
            <div className="checkout-actions refined-actions">
              {method === 'wallet' ? <><button type="button" className="secondary-button connect-wide" onClick={() => setWalletOpen(true)}>{wallet ? `Wallet · ${compactAddress(wallet.address)}` : 'Connect wallet'}</button>{stage === 'SELECT' ? <button type="button" className="primary-button checkout-primary" disabled={busy || !validAmount || !configured} onClick={() => void createReview()}>{busy ? 'Preparing…' : 'Review payment'} <span>→</span></button> : <button type="button" className="primary-button checkout-primary" disabled={busy} onClick={() => void payWithWallet()}>{busy ? stage === 'SIGNING' ? 'Waiting for wallet…' : 'Processing…' : wallet ? `Pay ${total} ${asset}` : 'Connect wallet to pay'} <span>→</span></button>}</> : <Link href={externalMethodHref()} className="primary-button checkout-primary method-continue">{method === 'stripe' ? 'Continue to card' : method === 'solana-pay' ? 'Open mobile payment' : `Continue with ${method === 'moonpay' ? 'MoonPay' : 'Coinbase Pay'}`} <span>→</span></Link>}
            </div>
          </>}
        </section>

        <aside className="panel side-panel order-summary-refined">
          <div className="summary-header"><div><span className="section-kicker">Order summary</span><h2>{MERCHANT_NAME}</h2></div><StatusBadge tone={configured ? 'success' : 'warning'} dot>{configured ? 'Ready' : 'Preview'}</StatusBadge></div>
          <div className="merchant-card refined-merchant"><div className="merchant-avatar">P</div><div><strong>Verified PowerPay checkout</strong><span>{recipient ? compactAddress(recipient, 7, 5) : 'Recipient required'}</span></div></div>
          <div className="summary-rows refined-summary-rows">
            <div><span>Payment</span><strong>{validAmount ? formatNumber(amount, 6) : '—'} {asset}</strong></div>
            <div><span>PowerPay service fee</span><strong>{quote?.serviceFee ? `${quote.serviceFee} ${asset}` : validAmount ? `≈ ${formatNumber(previewServiceFee, 6)} ${asset}` : '2.00%'}</strong></div>
            <div><span>{asset === 'PWRC' ? 'PWRC Token-2022 fee' : 'Protocol fee'}</span><strong>{quote?.protocolFee ?? (asset === 'PWRC' ? '2% token extension' : 'None / quoted')}</strong></div>
            <div><span>Solana fee</span><strong>{quote?.networkFee ?? 'Estimated at review'}</strong></div>
          </div>
          <div className="summary-total"><span>Total</span><strong>{quote ? `${quote.total} ${asset}` : `${validAmount ? formatNumber(numericAmount + previewServiceFee, 6) : '0'} ${asset}`}</strong></div>
          <div className="summary-rate"><div><span>SOL market</span><MarketReference compact/></div><small>Market price is informational unless a conversion quote explicitly binds it.</small></div>
          <div className="network-summary"><NetworkIcon network="solana" size={27}/><div><strong>{network.cluster === 'mainnet-beta' ? 'Mainnet Beta' : 'Devnet'}</strong><span>{RPC_LABEL[network.rpcProfile]}</span></div><StatusBadge tone={network.cluster === 'mainnet-beta' ? 'success' : 'warning'}>{network.rpcProfile}</StatusBadge></div>
          <div className="trust-note"><span>▣</span><p><strong>Recipient locks at review</strong>Amount, asset, recipient, network and reference cannot change after the intent is locked. Solana runtime fees stay separate from PowerPay service fees.</p></div>
          {intent ? <details className="technical-details refined-technical"><summary>Technical details</summary><span>Intent</span><code>{intent.id}</code><span>Status</span><code>{intent.status}</code><span>RPC profile</span><code>{network.rpcProfile}</code></details> : null}
        </aside>
      </div>
      <WalletConnectModal open={walletOpen} onClose={() => setWalletOpen(false)} onConnected={(provider, address, kind) => setWallet({ provider, address, kind })}/>
    </>
  );
}
