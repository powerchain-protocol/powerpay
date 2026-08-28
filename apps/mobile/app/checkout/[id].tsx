import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as Haptics from 'expo-haptics';
import * as LocalAuthentication from 'expo-local-authentication';
import NetInfo from '@react-native-community/netinfo';
import { router, useLocalSearchParams } from 'expo-router';
import { createIdempotencyKey } from '@powerpay/payment-core';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AssetIcon } from '@/components/AssetIcon';
import { PageHeader } from '@/components/PageHeader';
import { PaymentPinModal } from '@/components/PaymentPinModal';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Screen } from '@/components/Screen';
import { usePowerPayWallet } from '@/providers/WalletProvider';
import { powerPayApi, PowerPayApiError } from '@/services/api';
import { mobileRecoveryStore } from '@/services/recovery';
import { colors, radius } from '@/styles/theme';

type Intent = {
  id: string;
  source: string;
  network: 'SOLANA' | 'SUI';
  asset: string;
  amount: string;
  recipient: string;
  merchantId?: string;
  reference?: string;
  status: string;
};

type FeeQuote = {
  id: string;
  subtotal: string;
  serviceFee: string;
  protocolFee: string;
  networkFee: string;
  total: string;
  expiresAt: string;
  quoteHash?: string;
};

type CheckoutState =
  | 'LOADING'
  | 'READY'
  | 'AUTHORIZING'
  | 'SIGNING'
  | 'SUBMITTING'
  | 'CONFIRMING'
  | 'PENDING'
  | 'OFFLINE_NOT_SUBMITTED'
  | 'OFFLINE_SUBMITTED'
  | 'ERROR';

const TERMINAL = new Set(['SETTLED', 'FAILED', 'EXPIRED', 'CANCELLED']);

export default function CheckoutScreen() {
  const params = useLocalSearchParams<{ id: string; merchant?: string }>();
  const intentId = String(params.id || '');
  const wallet = usePowerPayWallet();
  const [intent, setIntent] = useState<Intent | null>(null);
  const [quote, setQuote] = useState<FeeQuote | null>(null);
  const [securityLevel, setSecurityLevel] = useState('STANDARD');
  const [warning, setWarning] = useState<string>();
  const [state, setState] = useState<CheckoutState>('LOADING');
  const [error, setError] = useState('');
  const [pinVisible, setPinVisible] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [resumeAvailable, setResumeAvailable] = useState(false);
  const [restartAvailable, setRestartAvailable] = useState(false);
  const activeAttempt = useRef<{ id: string; feeQuoteId: string; transactionId?: string } | null>(null);
  const attemptRequestKey = useRef(createIdempotencyKey('attempt'));

  const merchant = params.merchant || (intent?.merchantId ? 'Merchant payment' : 'Wallet payment');
  const busy = ['AUTHORIZING', 'SIGNING', 'SUBMITTING', 'CONFIRMING'].includes(state);
  const quoteExpired = Boolean(quote && Date.parse(quote.expiresAt) <= Date.now());
  const canExecute = Boolean(intent && quote && !quoteExpired && state === 'READY');

  const load = useCallback(async () => {
    if (!intentId) return;
    setState('LOADING'); setError(''); setResumeAvailable(false); setRestartAvailable(false);
    try {
      const current = await powerPayApi.getIntent(intentId);
      const nextIntent = current.intent as Intent;
      setIntent(nextIntent);
      const localRecovery = (await mobileRecoveryStore.list()).find((record) => record.paymentIntentId === intentId);
      if (localRecovery) activeAttempt.current = { id: localRecovery.attemptId, feeQuoteId: localRecovery.feeQuoteId || '', transactionId: localRecovery.transactionId };
      if (nextIntent.status === 'SETTLED') { router.replace({ pathname: '/receipt/[id]', params: { id: intentId } }); return; }
      if (TERMINAL.has(nextIntent.status)) { setState('ERROR'); setError(`This payment is ${nextIntent.status.toLowerCase()}.`); return; }
      if (['SUBMITTED', 'CONFIRMING'].includes(nextIntent.status)) {
        setState('PENDING');
        setError('This payment was already submitted. Check its final status without creating another payment.');
        return;
      }
      if (nextIntent.status === 'RECOVERY_REQUIRED') {
        if (localRecovery?.signedTransaction && localRecovery.feeQuoteId) {
          setResumeAvailable(true);
          setState('PENDING');
          setError('Submission status is uncertain. Resume this exact signed transaction; PowerPay will not create a new attempt.');
        } else {
          setState('PENDING');
          setError('This payment needs reconciliation. PowerPay will not create a duplicate attempt.');
        }
        return;
      }
      if (nextIntent.status === 'SIGNED') {
        if (localRecovery?.signedTransaction && localRecovery.feeQuoteId) {
          setResumeAvailable(true);
          setState('PENDING');
          setError('This payment is signed but not confirmed submitted. Resume the exact signed transaction when connected.');
        } else {
          setState('PENDING');
          setError('A signed payment attempt exists, but this device no longer has its recovery payload. Do not create another payment.');
        }
        return;
      }
      if (nextIntent.status === 'SIGNING') {
        setRestartAvailable(Boolean(localRecovery?.attemptId));
        setState('PENDING');
        setError('Wallet signing was interrupted before submission. You can safely restart this unsigned attempt.');
        return;
      }
      const locked = await powerPayApi.lockIntent(intentId);
      setIntent(locked.intent);
      setQuote(locked.feeQuote);
      setSecurityLevel(locked.securityLevel || 'STANDARD');
      setWarning(locked.warning);
      setState('READY');
    } catch (cause) {
      setState('ERROR');
      setError(messageFor(cause));
    }
  }, [intentId]);

  useEffect(() => { void load(); }, [load]);
  useEffect(() => {
    if (!quote) { setSecondsLeft(0); return; }
    const tick = () => setSecondsLeft(Math.max(0, Math.ceil((Date.parse(quote.expiresAt) - Date.now()) / 1000)));
    tick(); const timer = setInterval(tick, 500); return () => clearInterval(timer);
  }, [quote]);

  async function startPayment() {
    if (!intent || !quote) return;
    const network = await NetInfo.fetch();
    if (!network.isConnected) { setState('OFFLINE_NOT_SUBMITTED'); return; }
    if (quoteExpired) { await refreshQuote(); return; }
    if (intent.network !== 'SOLANA') { setState('ERROR'); setError('Sui payment execution is capability-gated until a Sui wallet adapter is configured.'); return; }
    try {
      if (!wallet.address) await wallet.connectSolana();
      const needsAdditionalAuth = securityLevel === 'HIGH_VALUE' || securityLevel === 'SENSITIVE_ACTION';
      if (needsAdditionalAuth) {
        setState('AUTHORIZING');
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const enrolled = hasHardware && await LocalAuthentication.isEnrolledAsync();
        if (enrolled) {
          const result = await LocalAuthentication.authenticateAsync({ promptMessage: `Approve ${intent.amount} ${intent.asset}`, fallbackLabel: 'Use PowerPay PIN', cancelLabel: 'Cancel' });
          if (result.success) return executePayment();
        }
        setState('READY'); setPinVisible(true); return;
      }
      await executePayment();
    } catch (cause) {
      setState('ERROR'); setError(messageFor(cause));
    }
  }

  async function executePayment() {
    if (!intent || !quote) return;
    const walletAddress = wallet.address || await wallet.connectSolana();
    let attemptId: string | undefined;
    try {
      setState('SIGNING'); setError('');
      const network = await NetInfo.fetch();
      if (!network.isConnected) { setState('OFFLINE_NOT_SUBMITTED'); return; }

      const execution = await powerPayApi.createAttempt(intent.id, walletAddress, quote.id, attemptRequestKey.current);
      attemptId = execution.attempt.id;
      activeAttempt.current = { id: attemptId, feeQuoteId: quote.id };
      await mobileRecoveryStore.put({ paymentIntentId: intent.id, attemptId, attemptIdempotencyKey: attemptRequestKey.current, network: intent.network, phase: 'SIGNING', feeQuoteId: quote.id, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });

      let signed: string;
      try {
        signed = await wallet.signTransaction(execution.payload.transaction);
      } catch (cause) {
        await powerPayApi.abortAttempt(intent.id, attemptId).catch(() => undefined);
        await mobileRecoveryStore.remove(attemptId);
        activeAttempt.current = null;
        attemptRequestKey.current = createIdempotencyKey('attempt');
        setState('READY');
        setError(isWalletRejection(cause) ? 'Payment was not signed. Nothing was submitted.' : messageFor(cause));
        return;
      }

      await powerPayApi.markSigned(intent.id, attemptId);
      await mobileRecoveryStore.put({ paymentIntentId: intent.id, attemptId, network: intent.network, signedTransaction: signed, phase: 'SUBMITTING', feeQuoteId: quote.id, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });

      const beforeSubmit = await NetInfo.fetch();
      if (!beforeSubmit.isConnected) {
        setState('OFFLINE_NOT_SUBMITTED');
        setResumeAvailable(true);
        setError('Your transaction was signed locally but has not been submitted. Reconnect and resume this exact signed transaction.');
        return;
      }

      setState('SUBMITTING');
      const submitted = await powerPayApi.submit(intent.id, attemptId, signed);
      const transactionId = submitted.attempt.transactionId as string;
      activeAttempt.current = { id: attemptId, feeQuoteId: quote.id, transactionId };
      await mobileRecoveryStore.put({ paymentIntentId: intent.id, attemptId, network: intent.network, transactionId, phase: 'CONFIRMING', feeQuoteId: quote.id, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
      setState('CONFIRMING');
      await reconcileUntilResolved(intent.id, attemptId, quote.id, transactionId);
    } catch (cause) {
      const connected = (await NetInfo.fetch()).isConnected;
      if (activeAttempt.current?.transactionId && !connected) {
        setState('OFFLINE_SUBMITTED');
        setError('Payment submitted. Reconnecting is required only to confirm settlement; PowerPay will not submit it again.');
      } else if (cause instanceof PowerPayApiError && cause.code === 'SUBMISSION_UNKNOWN') {
        setResumeAvailable(true);
        setState('PENDING'); setError(cause.message);
      } else {
        setState('ERROR'); setError(messageFor(cause));
      }
    }
  }

  async function reconcileUntilResolved(paymentIntentId: string, attemptId: string, feeQuoteId: string, transactionId: string) {
    for (let index = 0; index < 12; index += 1) {
      const network = await NetInfo.fetch();
      if (!network.isConnected) { setState('OFFLINE_SUBMITTED'); setError('Payment submitted. Reconnecting to confirm…'); return; }
      const result = await powerPayApi.reconcile(paymentIntentId, attemptId, feeQuoteId);
      if (result.receipt || result.intent?.status === 'SETTLED') {
        await mobileRecoveryStore.remove(attemptId);
        activeAttempt.current = null;
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        router.replace({ pathname: '/receipt/[id]', params: { id: paymentIntentId } });
        return;
      }
      if (['FAILED', 'EXPIRED', 'CANCELLED'].includes(result.intent?.status)) {
        await mobileRecoveryStore.remove(attemptId);
        setState('ERROR'); setError(`Payment ${String(result.intent.status).toLowerCase()}.`); return;
      }
      await delay(1200);
    }
    setState('PENDING');
    setError(`Payment submitted as ${short(transactionId)}. It is still pending confirmation. Use “Check status” to reconcile without resubmitting.`);
  }

  async function resumeSignedSubmission() {
    const recovery = (await mobileRecoveryStore.list()).find((record) => record.paymentIntentId === intentId && record.signedTransaction && record.feeQuoteId);
    if (!recovery?.signedTransaction || !recovery.feeQuoteId) { setResumeAvailable(false); await load(); return; }
    const network = await NetInfo.fetch();
    if (!network.isConnected) { setState('OFFLINE_NOT_SUBMITTED'); setError('Reconnect before resuming this signed payment.'); return; }
    setState('SUBMITTING'); setError('');
    try {
      const submitted = await powerPayApi.submit(intentId, recovery.attemptId, recovery.signedTransaction);
      const transactionId = submitted.attempt.transactionId as string;
      await mobileRecoveryStore.put({ ...recovery, signedTransaction: undefined, transactionId, phase: 'CONFIRMING', updatedAt: new Date().toISOString() });
      activeAttempt.current = { id: recovery.attemptId, feeQuoteId: recovery.feeQuoteId, transactionId };
      setResumeAvailable(false);
      setState('CONFIRMING');
      await reconcileUntilResolved(intentId, recovery.attemptId, recovery.feeQuoteId, transactionId);
    } catch (cause) {
      if (cause instanceof PowerPayApiError && cause.code === 'SUBMISSION_UNKNOWN') { setState('PENDING'); setResumeAvailable(true); setError(cause.message); return; }
      setState('ERROR'); setError(messageFor(cause));
    }
  }

  async function restartInterruptedSigning() {
    const recovery = (await mobileRecoveryStore.list()).find((record) => record.paymentIntentId === intentId && record.phase === 'SIGNING');
    if (!recovery) { setRestartAvailable(false); await load(); return; }
    setState('LOADING'); setError('');
    try {
      await powerPayApi.abortAttempt(intentId, recovery.attemptId);
      await mobileRecoveryStore.remove(recovery.attemptId);
      activeAttempt.current = null;
      setRestartAvailable(false);
      await load();
    } catch (cause) { setState('ERROR'); setError(messageFor(cause)); }
  }

  async function checkStatus() {
    const recovery = activeAttempt.current || (await mobileRecoveryStore.list()).find((record) => record.paymentIntentId === intentId && record.transactionId);
    if (!recovery?.attemptId || !recovery.feeQuoteId || !recovery.transactionId) { await load(); return; }
    const network = await NetInfo.fetch();
    if (!network.isConnected) { setState('OFFLINE_SUBMITTED'); return; }
    setState('CONFIRMING'); setError('');
    try { await reconcileUntilResolved(intentId, recovery.attemptId, recovery.feeQuoteId, recovery.transactionId); }
    catch (cause) { setState('PENDING'); setError(messageFor(cause)); }
  }

  async function refreshQuote() {
    setState('LOADING'); setError('');
    try {
      const locked = await powerPayApi.lockIntent(intentId);
      setIntent(locked.intent); setQuote(locked.feeQuote); setSecurityLevel(locked.securityLevel || 'STANDARD'); setWarning(locked.warning); setState('READY');
    } catch (cause) { setState('ERROR'); setError(messageFor(cause)); }
  }


  async function cancelPayment() {
    if (busy) return;
    if (activeAttempt.current?.transactionId || ['SIGNED', 'SUBMITTED', 'CONFIRMING', 'RECOVERY_REQUIRED'].includes(intent?.status || '')) {
      router.back();
      return;
    }
    try {
      if (intent?.id) await powerPayApi.cancelIntent(intent.id);
      const local = await mobileRecoveryStore.list();
      for (const record of local.filter((item) => item.paymentIntentId === intentId && item.phase === 'SIGNING')) await mobileRecoveryStore.remove(record.attemptId);
      router.back();
    } catch (cause) {
      if (cause instanceof PowerPayApiError && cause.code === 'RECOVERY_REQUIRED') {
        setState('PENDING'); setError(cause.message); return;
      }
      setError(messageFor(cause));
    }
  }


  const stageLabel = useMemo(() => ({ AUTHORIZING: 'Authorizing', SIGNING: 'Waiting for wallet', SUBMITTING: 'Submitting', CONFIRMING: 'Confirming' } as Record<string, string>)[state], [state]);

  if (state === 'LOADING' && !intent) return <Screen><PageHeader title="Checkout" /><View style={styles.center}><ActivityIndicator color={colors.primary} /><Text style={styles.muted}>Loading secure payment…</Text></View></Screen>;

  return (
    <Screen>
      <PageHeader title="Checkout" />
      <View style={styles.merchantCard}>
        <View style={styles.logo}><Text style={styles.logoText}>{merchant.slice(0, 2).toUpperCase()}</Text></View>
        <Text style={styles.merchant}>{merchant}</Text>
        <Text style={styles.verified}>{intent?.merchantId ? '✓ Merchant policy checked' : 'Wallet payment'}</Text>
      </View>

      <View style={styles.amountCard}>
        <Text style={styles.amount}>{intent?.amount || '—'} {intent?.asset || ''}</Text>
        <Text style={styles.description}>{intent?.source === 'SCAN' ? 'Scan-to-pay checkout' : 'PowerPay payment'}</Text>
        {intent?.reference ? <Text style={styles.order}>Reference {short(intent.reference, 22)}</Text> : null}
      </View>

      <Text style={styles.label}>Pay with</Text>
      <View style={styles.methodRow}>
        <AssetIcon symbol={intent?.asset || 'USDC'} size={40} />
        <View style={{ flex: 1 }}><Text style={styles.methodTitle}>{intent?.asset || 'USDC'}</Text><Text style={styles.methodSub}>{intent?.network === 'SUI' ? 'Sui' : 'Solana'} · {wallet.address ? short(wallet.address) : 'wallet not connected'}</Text></View>
        <Ionicons name={wallet.address ? 'checkmark-circle' : 'wallet-outline'} size={21} color={wallet.address ? colors.success : colors.muted} />
      </View>

      {quote ? <View style={styles.summary}>
        <Summary label="Payment" value={`${quote.subtotal} ${intent?.asset}`} />
        <Summary label="PowerPay service fee" value={`${quote.serviceFee} ${intent?.asset}`} />
        {Number(quote.protocolFee) > 0 ? <Summary label="PowerPay protocol fee" value={`${quote.protocolFee} ${intent?.asset}`} /> : null}
        <Summary label="Network fee" value={Number(quote.networkFee) > 0 ? `${quote.networkFee} ${intent?.asset}` : 'Charged separately by network'} />
        <Summary label="Payment total" value={`${quote.total} ${intent?.asset}`} strong />
        <Summary label="Quote" value={secondsLeft > 0 ? `Locked · ${secondsLeft}s` : 'Expired'} warning={secondsLeft <= 5} />
      </View> : null}

      {warning ? <Notice icon="warning-outline" text={warning} tone="warning" /> : null}
      {securityLevel !== 'STANDARD' ? <Notice icon="shield-checkmark-outline" text="Additional confirmation required for this payment." tone="info" /> : null}
      {error ? <Notice icon={state === 'OFFLINE_NOT_SUBMITTED' || state === 'OFFLINE_SUBMITTED' ? 'cloud-offline-outline' : 'information-circle-outline'} text={error} tone={state === 'ERROR' ? 'danger' : 'info'} /> : null}

      {busy ? <View style={styles.progress}><ActivityIndicator size="small" color={colors.primary} /><View><Text style={styles.progressTitle}>{stageLabel}</Text><Text style={styles.progressText}>{state === 'SIGNING' ? 'Review the exact transaction in your wallet.' : state === 'CONFIRMING' ? 'Checking chain confirmation and settlement.' : 'PowerPay is processing this state once.'}</Text></View></View> : null}

      <View style={styles.actions}>
        {quoteExpired && ['READY', 'ERROR'].includes(state) ? <PrimaryButton label="Refresh quote" onPress={refreshQuote} /> : null}
        {canExecute ? <PrimaryButton label={wallet.address ? `Pay ${quote?.total} ${intent?.asset}` : 'Connect wallet & pay'} onPress={startPayment} /> : null}
        {resumeAvailable ? <PrimaryButton label="Resume signed payment" onPress={resumeSignedSubmission} /> : null}
        {restartAvailable ? <PrimaryButton label="Restart unsigned attempt" onPress={restartInterruptedSigning} /> : null}
        {!resumeAvailable && ['PENDING', 'OFFLINE_SUBMITTED'].includes(state) ? <PrimaryButton label="Check status" onPress={checkStatus} /> : null}
        {state === 'OFFLINE_NOT_SUBMITTED' && !resumeAvailable ? <PrimaryButton label="Retry connection" onPress={() => { setState('READY'); setError(''); }} /> : null}
        {state === 'ERROR' && !quoteExpired ? <PrimaryButton label="Reload payment" onPress={load} /> : null}
        <Pressable style={styles.cancel} onPress={() => void cancelPayment()} disabled={busy}><Text style={styles.cancelText}>{activeAttempt.current?.transactionId ? 'Close' : 'Cancel'}</Text></Pressable>
      </View>

      <PaymentPinModal visible={pinVisible} onCancel={() => setPinVisible(false)} onApproved={() => { setPinVisible(false); void executePayment(); }} />
    </Screen>
  );
}

function Summary({ label, value, strong, warning }: { label: string; value: string; strong?: boolean; warning?: boolean }) {
  return <View style={styles.summaryRow}><Text style={styles.summaryLabel}>{label}</Text><Text style={[styles.summaryValue, strong && styles.summaryStrong, warning && { color: colors.warning }]}>{value}</Text></View>;
}

function Notice({ icon, text, tone }: { icon: keyof typeof Ionicons.glyphMap; text: string; tone: 'info' | 'warning' | 'danger' }) {
  const palette = tone === 'danger' ? { bg: '#FEF3F2', fg: colors.danger } : tone === 'warning' ? { bg: '#FFF7E8', fg: '#7A4C00' } : { bg: '#EFF8FF', fg: colors.info };
  return <View style={[styles.notice, { backgroundColor: palette.bg }]}><Ionicons name={icon} size={18} color={palette.fg} /><Text style={[styles.noticeText, { color: palette.fg }]}>{text}</Text></View>;
}

function messageFor(cause: unknown) {
  if (cause instanceof PowerPayApiError) {
    if (cause.code === 'QUOTE_EXPIRED') return 'The payment quote expired before signing. Refresh the quote; no payment was submitted.';
    if (cause.code === 'POLICY_BLOCKED') return cause.message;
    return cause.message;
  }
  return cause instanceof Error ? cause.message : 'Payment could not be completed.';
}
function isWalletRejection(cause: unknown) { return /reject|declin|cancel|user/i.test(cause instanceof Error ? cause.message : String(cause)); }
function short(value: string, max = 14) { if (value.length <= max) return value; const side = Math.max(4, Math.floor((max - 1) / 2)); return `${value.slice(0, side)}…${value.slice(-side)}`; }
function delay(ms: number) { return new Promise((resolve) => setTimeout(resolve, ms)); }

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, minHeight: 360 }, muted: { color: colors.muted, fontSize: 13 },
  merchantCard: { alignItems: 'center', paddingTop: 12 }, logo: { width: 62, height: 62, borderRadius: 18, backgroundColor: '#E7F2EB', alignItems: 'center', justifyContent: 'center' }, logoText: { color: colors.primary, fontSize: 20, fontWeight: '800' }, merchant: { color: colors.text, fontSize: 20, fontWeight: '700', marginTop: 10 }, verified: { color: colors.success, fontSize: 12, fontWeight: '700', marginTop: 4 },
  amountCard: { alignItems: 'center', marginTop: 24 }, amount: { color: colors.text, fontSize: 36, fontWeight: '700', letterSpacing: -1 }, description: { color: colors.muted, fontSize: 13, marginTop: 6 }, order: { color: colors.muted, fontSize: 11, marginTop: 3 },
  label: { color: colors.text, fontSize: 13, fontWeight: '700', marginTop: 28, marginBottom: 8 }, methodRow: { minHeight: 70, flexDirection: 'row', gap: 12, alignItems: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: radius.card, backgroundColor: colors.surface, paddingHorizontal: 14 }, methodTitle: { color: colors.text, fontSize: 15, fontWeight: '700' }, methodSub: { color: colors.muted, fontSize: 11, marginTop: 3 },
  summary: { borderTopWidth: StyleSheet.hairlineWidth, borderColor: colors.border, marginTop: 22, paddingTop: 12, gap: 12 }, summaryRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 16 }, summaryLabel: { color: colors.muted, fontSize: 12 }, summaryValue: { color: colors.text, fontSize: 12, fontWeight: '600', textAlign: 'right', flexShrink: 1 }, summaryStrong: { fontSize: 14, fontWeight: '800' },
  notice: { flexDirection: 'row', gap: 9, alignItems: 'flex-start', borderRadius: radius.md, padding: 12, marginTop: 14 }, noticeText: { flex: 1, fontSize: 11, lineHeight: 16, fontWeight: '600' },
  progress: { flexDirection: 'row', gap: 12, alignItems: 'center', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card, padding: 14, marginTop: 16 }, progressTitle: { color: colors.text, fontSize: 13, fontWeight: '700' }, progressText: { color: colors.muted, fontSize: 11, lineHeight: 16, marginTop: 2, maxWidth: 290 },
  actions: { marginTop: 22, paddingBottom: 30, gap: 8 }, cancel: { minHeight: 48, alignItems: 'center', justifyContent: 'center' }, cancelText: { color: colors.muted, fontSize: 13, fontWeight: '700' },
});
