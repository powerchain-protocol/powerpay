'use client';

import { useEffect, useMemo, useState } from 'react';
import { Transaction } from '@solana/web3.js';
import { Buffer } from 'buffer';
import { AssetIcon, NetworkIcon, WalletIcon } from '@powerpay/ui';
import { powerPayFetch, type CheckoutAsset, type FeeQuote, type PaymentAttempt, type PaymentIntent } from '../lib/powerpay-api';
import { WalletConnectModal, type BrowserSolanaProvider } from './wallet-connect-modal';

const RECIPIENT = process.env.NEXT_PUBLIC_POWERPAY_DEMO_RECIPIENT || '';
const MERCHANT_ID = process.env.NEXT_PUBLIC_POWERPAY_DEMO_MERCHANT_ID || undefined;
const MERCHANT_NAME = process.env.NEXT_PUBLIC_POWERPAY_DEMO_MERCHANT_NAME || 'PowerPay Demo Store';
const DEFAULT_AMOUNT = process.env.NEXT_PUBLIC_POWERPAY_DEMO_AMOUNT || '125.00';

type Stage = 'SELECT' | 'REVIEW' | 'SIGNING' | 'SUBMITTED' | 'SETTLED';
type WalletKind = 'phantom' | 'solflare' | 'backpack';

type AttemptResponse = { intent: PaymentIntent; attempt: PaymentAttempt; payload: { transaction: string }; simulation: { ok?: boolean }; idempotent: boolean };

export function CheckoutApp() {
  const [asset, setAsset] = useState<CheckoutAsset>('USDC');
  const [amount, setAmount] = useState(DEFAULT_AMOUNT);
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
  const configured = Boolean(RECIPIENT);

  useEffect(() => { setPaymentKey(crypto.randomUUID()); }, []);
  useEffect(() => { if (!quote) return; const timer = window.setInterval(() => setClock(Date.now()), 1000); return () => window.clearInterval(timer); }, [quote]);

  const numericAmount = Number(amount || 0);
  const validAmount = Number.isFinite(numericAmount) && numericAmount > 0;
  const total = quote?.total || (validAmount ? amount : '0');
  const step = stage === 'SETTLED' ? 3 : ['SIGNING', 'SUBMITTED'].includes(stage) ? 2 : stage === 'REVIEW' ? 2 : 1;
  const shortWallet = wallet ? `${wallet.address.slice(0, 5)}…${wallet.address.slice(-4)}` : '';
  const quoteSeconds = useMemo(() => quote ? Math.max(0, Math.floor((Date.parse(quote.expiresAt) - clock) / 1000)) : 0, [quote, clock]);

  async function createReview() {
    if (!validAmount) return setMessage('Enter a valid payment amount.');
    if (!paymentKey) return setMessage('Preparing checkout session…');
    if (!configured) return setMessage('Checkout is in preview mode. Configure NEXT_PUBLIC_POWERPAY_DEMO_RECIPIENT to enable live intent creation.');
    setBusy(true); setMessage('');
    try {
      const created = await powerPayFetch<{ intent: PaymentIntent }>(`/api/v1/payments/intents`, {
        method: 'POST',
        headers: { 'x-idempotency-key': `web-checkout:${paymentKey}:${asset}:${amount}:${RECIPIENT}` },
        body: JSON.stringify({ source: 'CHECKOUT', network: 'SOLANA', asset, amount, fiatCurrency: asset === 'EURC' ? 'EUR' : 'USD', recipient: RECIPIENT, merchantId: MERCHANT_ID, reference: `WEB-${paymentKey}` }),
      });
      const locked = await powerPayFetch<{ intent: PaymentIntent; feeQuote: FeeQuote }>(`/api/v1/payments/intents/${created.intent.id}/lock`, { method: 'POST', body: '{}' });
      setIntent(locked.intent); setQuote(locked.feeQuote); setStage('REVIEW');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Unable to prepare payment.'); }
    finally { setBusy(false); }
  }

  async function payWithWallet() {
    if (!wallet) return setWalletOpen(true);
    if (!intent || !quote) return createReview();
    if (quoteSeconds <= 0) { setMessage('The fee quote expired. Refresh the payment review before signing.'); setStage('SELECT'); setQuote(null); setIntent(null); setPaymentKey(crypto.randomUUID()); return; }
    setBusy(true); setMessage(''); setStage('SIGNING');
    let startedAttemptId = '';
    let signedMarked = false;
    try {
      const started = await powerPayFetch<AttemptResponse>(`/api/v1/payments/intents/${intent.id}/attempts`, {
        method: 'POST',
        headers: { 'x-idempotency-key': `web-attempt:${intent.id}:${wallet.address}` },
        body: JSON.stringify({ walletAddress: wallet.address, feeQuoteId: quote.id }),
      });
      startedAttemptId = started.attempt.id;
      setAttempt(started.attempt);
      const transaction = Transaction.from(Buffer.from(started.payload.transaction, 'base64'));
      const signed = await wallet.provider.signTransaction(transaction);
      const signedBase64 = Buffer.from(signed.serialize()).toString('base64');
      await powerPayFetch(`/api/v1/payments/intents/${intent.id}/attempts/${started.attempt.id}/signed`, { method: 'POST', body: '{}' });
      signedMarked = true;
      const submitted = await powerPayFetch<{ intent: PaymentIntent; attempt: PaymentAttempt }>(`/api/v1/payments/intents/${intent.id}/attempts/${started.attempt.id}/submit`, { method: 'POST', body: JSON.stringify({ signedTransaction: signedBase64 }) });
      setAttempt(submitted.attempt); setStage('SUBMITTED');
      await reconcileUntilSettled(intent.id, started.attempt.id, quote.id);
    } catch (error) {
      if (startedAttemptId && !signedMarked) {
        await powerPayFetch(`/api/v1/payments/intents/${intent.id}/attempts/${startedAttemptId}/abort`, { method: 'POST', body: '{}' }).catch(() => undefined);
      }
      setStage('REVIEW');
      setMessage(error instanceof Error ? error.message : 'Payment authorization failed.');
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

  function reset(rotateKey = false) { setIntent(null); setQuote(null); setAttempt(null); setStage('SELECT'); setMessage(''); if (rotateKey) setPaymentKey(crypto.randomUUID()); }

  return (
    <>
      <section className="checkout-context" aria-label="Checkout status">
        <div><span className={`context-dot ${configured ? 'live' : 'preview'}`} /><strong>{configured ? 'Checkout execution configured' : 'Checkout preview mode'}</strong><span>USDC-first · Solana</span></div>
        <div className="checkout-context-right"><span>Payment engine</span><strong>Intent → Attempt → Reconcile</strong><span className="status-pill">Canonical</span></div>
      </section>
      <div className={`network-mode-banner ${configured ? 'mainnet' : 'devnet'}`} role="status"><span className="network-dot" /><div><strong>{configured ? 'Solana payment rail configured' : 'Preview · Recipient not configured'}</strong><span>{configured ? 'The wallet signs the exact transaction returned by the PowerPay payment engine.' : 'Design and quote flow are available; execution stays fail-closed until a recipient is configured.'}</span></div></div>

      <div className="checkout-grid">
        <section className="panel main-panel">
          <div className="panel-heading-row"><div><span className="section-kicker">PowerPay checkout</span><h1>Complete <span className="green">payment</span></h1><p className="eyebrow">Review the asset, exact amount and fees before your wallet is asked to sign.</p></div><span className="token-standard-badge">✓ Non-custodial</span></div>
          <div className="stepper" aria-label="Checkout progress">{['Select','Approve','Complete'].map((name, index) => <div className={`step ${step >= index + 1 ? 'active' : ''}`} key={name}><div className="step-top"><span className="step-dot">{step > index + 1 ? '✓' : index + 1}</span>{index < 2 && <span className="step-line" />}</div><span>{name}</span></div>)}</div>

          {stage === 'SETTLED' ? (
            <div className="success-state"><div className="success-mark">✓</div><span className="section-kicker">Payment complete</span><h2>{amount} {asset}</h2><p>Settlement has been reconciled and PowerPay issued a receipt for this payment.</p><div className="success-meta"><span>Merchant<strong>{MERCHANT_NAME}</strong></span><span>Network<strong>Solana</strong></span><span>Transaction<strong>{attempt?.transactionId ? `${attempt.transactionId.slice(0,8)}…${attempt.transactionId.slice(-6)}` : 'Confirmed'}</strong></span></div><button type="button" className="primary-button full-button" onClick={() => reset(true)}>New payment</button></div>
          ) : (
            <>
              <div className="purchase-form web-checkout-form">
                <div className="amount-title-row"><span className="field-label">You pay</span><span className="limit-copy">Default asset · USDC</span></div>
                <div className="amount-box"><div className="asset-select-wrap"><AssetIcon asset={asset} size={34} detailed={asset === 'PWRC'} /><select aria-label="Payment asset" value={asset} onChange={(event) => { setAsset(event.target.value as CheckoutAsset); reset(true); }}><option>USDC</option><option>EURC</option><option>SOL</option><option>PWRC</option></select></div><div className="amount-control"><input className="amount-input" inputMode="decimal" value={amount} onChange={(event) => { setAmount(event.target.value.replace(/[^0-9.]/g,'')); reset(true); }} aria-label="Payment amount" /><span className="amount-reference">{asset === 'EURC' ? 'EUR settlement asset' : asset === 'USDC' ? 'USD stablecoin' : 'Digital asset'}</span></div></div>
                <div className="quick-amounts">{['25','50','125','250'].map(value => <button type="button" className={amount === value ? 'quick-amount active' : 'quick-amount'} key={value} onClick={() => { setAmount(value); reset(true); }}>{value}</button>)}</div>

                <div className="payment-methods"><span className="field-label">Payment method</span><button type="button" className="payment-method selected"><span className="method-icon"><WalletIcon wallet={wallet?.kind || 'phantom'} size={28} /></span><span><strong>{wallet ? `${wallet.kind[0].toUpperCase()}${wallet.kind.slice(1)}` : 'Solana wallet'}</strong><small>{wallet ? shortWallet : 'Phantom · Solflare · Backpack'}</small></span><b>Recommended</b></button><button type="button" className="payment-method disabled" disabled><span className="method-icon"><NetworkIcon network="solana" size={27} /></span><span><strong>Solana Pay</strong><small>QR / payment link</small></span><b>Next</b></button><button type="button" className="payment-method disabled" disabled><span className="method-card">••••</span><span><strong>Card / onramp</strong><small>Provider configuration required</small></span><b>Gated</b></button></div>

                {quote && <div className="quote-lock"><span className="quote-lock-icon">⌁</span><div><strong>Fee quote locked</strong><small>Quote ID {quote.id.slice(0,8)} · expires in approximately {quoteSeconds}s</small></div></div>}
                {message && <div className={stage === 'SUBMITTED' ? 'notice info' : 'notice'}>{message}</div>}
              </div>
              <div className="checkout-actions">
                {!wallet && <button type="button" className="secondary-button connect-wide" onClick={() => setWalletOpen(true)}>Connect wallet</button>}
                {stage === 'SELECT' ? <button type="button" className="primary-button checkout-primary" disabled={busy || !validAmount} onClick={() => void createReview()}>{busy ? 'Preparing…' : 'Review payment'} <span>→</span></button> : <button type="button" className="primary-button checkout-primary" disabled={busy} onClick={() => void payWithWallet()}>{busy ? stage === 'SIGNING' ? 'Waiting for wallet…' : 'Processing…' : wallet ? `Pay ${total} ${asset}` : 'Connect wallet to pay'} <span>→</span></button>}
              </div>
            </>
          )}
        </section>

        <aside className="panel side-panel">
          <span className="section-kicker">Order summary</span>
          <div className="merchant-card"><div className="merchant-avatar">P</div><div><strong>{MERCHANT_NAME}</strong><span>✓ Verified PowerPay checkout</span></div></div>
          <div className="summary-rows"><div><span>Payment amount</span><strong>{validAmount ? amount : '—'} {asset}</strong></div><div><span>PowerPay service fee</span><strong>{quote?.serviceFee ?? 'Calculated at review'}</strong></div><div><span>Protocol fee</span><strong>{quote?.protocolFee ?? 'Calculated at review'}</strong></div><div><span>Network fee</span><strong>{quote?.networkFee ?? 'Wallet estimated'}</strong></div></div>
          <div className="summary-total"><span>Total</span><strong>{quote ? `${quote.total} ${asset}` : `${validAmount ? amount : '0'} ${asset}`}</strong></div>
          <div className="network-summary"><NetworkIcon network="solana" size={28} /><div><strong>Solana</strong><span>Wallet-approved settlement</span></div><span className="status-pill">{configured ? 'Ready' : 'Preview'}</span></div>
          <div className="trust-note"><span>▣</span><p><strong>Review before signing</strong>Your wallet receives the final transaction only after the payment intent and fee quote are locked.</p></div>
          {intent && <div className="technical-details"><span>Intent</span><code>{intent.id}</code><span>Status</span><code>{intent.status}</code></div>}
        </aside>
      </div>
      <WalletConnectModal open={walletOpen} onClose={() => setWalletOpen(false)} onConnected={(provider, address, kind) => setWallet({ provider, address, kind })} />
    </>
  );
}
