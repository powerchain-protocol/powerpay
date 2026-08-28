import type { ChainAdapter, TransactionPayload } from '@powerpay/chain-adapters';
import { calculateFeeQuote, hashFeeQuote, isFeeQuoteExpired, type FeePolicy, type FeeQuote } from '@powerpay/fees';
import { createLedgerEntry, type PaymentReceiptRecord, type PaymentRepository } from '@powerpay/ledger';
import {
  createPaymentAttempt,
  createPaymentIntent,
  expirePaymentIntent,
  lockPaymentIntent,
  reducePaymentStatus,
  type CreatePaymentIntentInput,
  type PaymentAttempt,
  type PowerPayPaymentIntent,
} from '@powerpay/payment-core';
import { consumeNonce, evaluatePaymentPolicy, type MerchantTrustStatus, type ReplayNonceStore } from '@powerpay/security';
import type { SettlementService } from '../settlement';

export interface PaymentEngineDependencies {
  repository: PaymentRepository;
  nonceStore: ReplayNonceStore;
  adapters: Partial<Record<'SOLANA' | 'SUI', ChainAdapter>>;
  settlement: SettlementService;
  feePolicy?: FeePolicy;
  feeTreasury?: string;
  merchantTrust?: (merchantId: string) => Promise<MerchantTrustStatus>;
  merchantName?: (merchantId: string) => Promise<string | undefined>;
  quoteSigner?: (quote: FeeQuote) => Promise<string>;
}

export class PaymentEngine {
  constructor(private readonly deps: PaymentEngineDependencies) {}

  async createIntent(input: CreatePaymentIntentInput): Promise<{ intent: PowerPayPaymentIntent; idempotent: boolean }> {
    const existing = await this.deps.repository.findIntentByIdempotencyKey(input.idempotencyKey);
    if (existing) {
      if ((existing.userId ?? null) !== (input.userId ?? null)) throw new PaymentEngineError('IDEMPOTENCY_CONFLICT', 'Idempotency key is already bound to another account', 409);
      return { intent: existing, idempotent: true };
    }
    const intent = createPaymentIntent(input);
    const saved = await this.deps.repository.createIntent(intent);
    await this.deps.repository.appendLedger(createLedgerEntry({ paymentIntentId: saved.id, type: 'INTENT_CREATED', status: saved.status }));
    return { intent: saved, idempotent: false };
  }

  async getIntent(id: string): Promise<PowerPayPaymentIntent> {
    const intent = await this.deps.repository.findIntentById(id);
    if (!intent) throw new PaymentEngineError('NOT_FOUND', 'Payment intent not found', 404);
    const expired = expirePaymentIntent(intent);
    if (expired.status !== intent.status) {
      await this.deps.repository.updateIntent(expired);
      await this.deps.repository.appendLedger(createLedgerEntry({ paymentIntentId: expired.id, type: 'EXPIRED', status: expired.status }));
      return expired;
    }
    return intent;
  }

  async quoteAndLock(id: string, estimatedNetworkFee = '0'): Promise<{ intent: PowerPayPaymentIntent; feeQuote: FeeQuote; securityLevel: string; warning?: string }> {
    const intent = await this.getIntent(id);
    if (intent.status !== 'CREATED' && intent.status !== 'LOCKED') throw new PaymentEngineError('INVALID_STATE', `Cannot quote payment while ${intent.status}`, 409);

    const trust = intent.merchantId && this.deps.merchantTrust ? await this.deps.merchantTrust(intent.merchantId) : undefined;
    const policy = evaluatePaymentPolicy({ intent, merchantTrust: trust });
    if (!policy.allowed) throw new PaymentEngineError('POLICY_BLOCKED', policy.reason || 'Payment blocked by policy', 403);

    const feeQuote = calculateFeeQuote({ paymentIntentId: intent.id, asset: intent.asset, network: intent.network, subtotal: intent.amount, estimatedNetworkFee, policy: this.deps.feePolicy });
    feeQuote.quoteHash = await hashFeeQuote(feeQuote);
    if (this.deps.quoteSigner) feeQuote.signature = await this.deps.quoteSigner(feeQuote);
    await this.deps.repository.saveFeeQuote(intent.id, feeQuote);

    const locked = intent.status === 'CREATED' ? await lockPaymentIntent(intent) : intent;
    if (intent.status === 'CREATED') await this.deps.repository.updateIntent(locked);
    await this.deps.repository.appendLedger(createLedgerEntry({ paymentIntentId: locked.id, type: 'INTENT_LOCKED', status: locked.status, metadata: { feeQuoteId: feeQuote.id, quoteHash: feeQuote.quoteHash, refreshed: intent.status === 'LOCKED' } }));
    return { intent: locked, feeQuote, securityLevel: policy.securityLevel, warning: policy.warning };
  }

  async createAttempt(intentId: string, walletAddress: string, feeQuoteId: string, idempotencyKey: string): Promise<{ intent: PowerPayPaymentIntent; attempt: PaymentAttempt; payload: TransactionPayload; simulation: unknown; idempotent: boolean }> {
    let intent = await this.getIntent(intentId);
    const existingAttempt = await this.deps.repository.findAttemptByIdempotencyKey(idempotencyKey);
    if (existingAttempt) {
      if (existingAttempt.paymentIntentId !== intentId || existingAttempt.walletAddress !== walletAddress || existingAttempt.feeQuoteId !== feeQuoteId) throw new PaymentEngineError('IDEMPOTENCY_CONFLICT', 'Attempt idempotency key is bound to different payment parameters', 409);
      if (!['SIGNING', 'SIGNED'].includes(existingAttempt.status)) throw new PaymentEngineError('ATTEMPT_ALREADY_PROGRESSING', `Existing attempt is ${existingAttempt.status}`, 409);
      const existingQuote = await this.deps.repository.getFeeQuote(feeQuoteId);
      if (!existingQuote || isFeeQuoteExpired(existingQuote)) throw new PaymentEngineError('QUOTE_EXPIRED', 'Payment quote expired', 409);
      const adapter = this.requireAdapter(intent.network);
      const execution = { intent, attempt: existingAttempt, walletAddress, feeQuoteId, fees: { serviceFee: existingQuote.serviceFee, protocolFee: existingQuote.protocolFee, networkFee: existingQuote.networkFee }, feeTreasury: this.deps.feeTreasury };
      const payload = await adapter.build(execution);
      const simulation = await adapter.simulate(execution, payload);
      if (!simulation.ok) throw new PaymentEngineError('SIMULATION_FAILED', simulation.error || 'Transaction simulation failed', 422);
      return { intent, attempt: existingAttempt, payload, simulation, idempotent: true };
    }
    if (intent.status !== 'LOCKED' && intent.status !== 'RECOVERY_REQUIRED') throw new PaymentEngineError('INVALID_STATE', `Cannot start signing while ${intent.status}`, 409);
    const feeQuote = await this.deps.repository.getFeeQuote(feeQuoteId);
    if (!feeQuote) throw new PaymentEngineError('QUOTE_NOT_FOUND', 'Fee quote not found', 404);
    if (isFeeQuoteExpired(feeQuote)) throw new PaymentEngineError('QUOTE_EXPIRED', 'Payment quote expired', 409);
    if (feeQuote.paymentIntentId !== intent.id || feeQuote.asset !== intent.asset || feeQuote.network !== intent.network) throw new PaymentEngineError('QUOTE_MISMATCH', 'Fee quote does not match payment intent', 409);
    if ((isPositiveDecimal(feeQuote.serviceFee) || isPositiveDecimal(feeQuote.protocolFee)) && !this.deps.feeTreasury) throw new PaymentEngineError('FEE_TREASURY_REQUIRED', 'PowerPay fee treasury is not configured for this deployment', 503);

    if (intent.nonce && intent.expiresAt) await consumeNonce(this.deps.nonceStore, intent.nonce, intent.expiresAt, intent.id);
    const attempts = await this.deps.repository.listAttempts(intent.id);
    const attempt = createPaymentAttempt(intent, attempts.length + 1, walletAddress, idempotencyKey);
    attempt.feeQuoteId = feeQuoteId;
    attempt.status = 'SIGNING';
    await this.deps.repository.createAttempt(attempt);
    intent = { ...intent, status: reducePaymentStatus(intent.status, { type: 'SIGNING_STARTED' }) };
    await this.deps.repository.updateIntent(intent);
    await this.deps.repository.appendLedger(createLedgerEntry({ paymentIntentId: intent.id, attemptId: attempt.id, type: 'ATTEMPT_CREATED', status: intent.status, metadata: { sequence: attempt.sequence } }));

    const adapter = this.requireAdapter(intent.network);
    const execution = { intent, attempt, walletAddress, feeQuoteId, fees: { serviceFee: feeQuote.serviceFee, protocolFee: feeQuote.protocolFee, networkFee: feeQuote.networkFee }, feeTreasury: this.deps.feeTreasury };
    const payload = await adapter.build(execution);
    const simulation = await adapter.simulate(execution, payload);
    if (!simulation.ok) {
      attempt.status = 'FAILED';
      attempt.errorCode = 'SIMULATION_FAILED';
      attempt.errorMessage = simulation.error;
      await this.deps.repository.updateAttempt(attempt);
      intent = { ...intent, status: reducePaymentStatus(intent.status, { type: 'FAILED' }) };
      await this.deps.repository.updateIntent(intent);
      await this.deps.repository.appendLedger(createLedgerEntry({ paymentIntentId: intent.id, attemptId: attempt.id, type: 'FAILED', status: intent.status, metadata: { reason: simulation.error } }));
      throw new PaymentEngineError('SIMULATION_FAILED', simulation.error || 'Transaction simulation failed', 422);
    }
    return { intent, attempt, payload, simulation, idempotent: false };
  }

  async abortSigning(intentId: string, attemptId: string): Promise<{ intent: PowerPayPaymentIntent; attempt: PaymentAttempt }> {
    let intent = await this.getIntent(intentId);
    const attempt = await this.requireAttempt(intentId, attemptId);
    if (intent.status !== 'SIGNING' || attempt.status !== 'SIGNING' || attempt.transactionId) throw new PaymentEngineError('INVALID_STATE', 'Only an unsigned signing attempt can be aborted', 409);
    attempt.status = 'CANCELLED';
    attempt.updatedAt = new Date().toISOString();
    await this.deps.repository.updateAttempt(attempt);
    intent = { ...intent, status: reducePaymentStatus(intent.status, { type: 'SIGNING_ABORTED' }) };
    await this.deps.repository.updateIntent(intent);
    return { intent, attempt };
  }

  async markSigned(intentId: string, attemptId: string): Promise<{ intent: PowerPayPaymentIntent; attempt: PaymentAttempt }> {
    let intent = await this.getIntent(intentId);
    const attempt = await this.requireAttempt(intentId, attemptId);
    if (intent.status !== 'SIGNING' || attempt.status !== 'SIGNING') throw new PaymentEngineError('INVALID_STATE', 'Payment is not awaiting a wallet signature', 409);
    attempt.status = 'SIGNED';
    attempt.updatedAt = new Date().toISOString();
    await this.deps.repository.updateAttempt(attempt);
    intent = { ...intent, status: reducePaymentStatus(intent.status, { type: 'WALLET_SIGNED' }) };
    await this.deps.repository.updateIntent(intent);
    return { intent, attempt };
  }

  async submit(intentId: string, attemptId: string, signedTransaction: string): Promise<{ intent: PowerPayPaymentIntent; attempt: PaymentAttempt }> {
    let intent = await this.getIntent(intentId);
    const attempt = await this.requireAttempt(intentId, attemptId);

    // A retry after the server already persisted the signature is a read, not a second broadcast.
    if (attempt.transactionId && ['SUBMITTED', 'CONFIRMING', 'CONFIRMED'].includes(attempt.status)) {
      return { intent, attempt };
    }

    const resumable = intent.status === 'RECOVERY_REQUIRED' && attempt.status === 'SUBMITTING';
    if (!(intent.status === 'SIGNED' && attempt.status === 'SIGNED') && !resumable) {
      throw new PaymentEngineError('INVALID_STATE', 'Payment is not ready for submission', 409);
    }
    if (!signedTransaction || signedTransaction.length < 32) throw new PaymentEngineError('INVALID_TRANSACTION', 'Signed transaction is required', 400);
    const signedTransactionHash = await hashSignedTransaction(signedTransaction);
    if (attempt.signedTransactionHash && attempt.signedTransactionHash !== signedTransactionHash) throw new PaymentEngineError('TRANSACTION_CONFLICT', 'This attempt is already bound to a different signed transaction', 409);
    attempt.signedTransactionHash = signedTransactionHash;

    // Persist SUBMITTING before RPC. If the RPC response is lost, the same signed transaction can be
    // explicitly resubmitted; on Solana it carries the same transaction signature and cannot create a
    // second independent payment intent.
    attempt.status = 'SUBMITTING';
    attempt.errorCode = undefined;
    attempt.errorMessage = undefined;
    attempt.updatedAt = new Date().toISOString();
    await this.deps.repository.updateAttempt(attempt);

    const adapter = this.requireAdapter(intent.network);
    try {
      const submission = await adapter.submit({ network: intent.network, encoding: 'base64', transaction: signedTransaction });
      attempt.status = 'SUBMITTED';
      attempt.transactionId = submission.transactionId;
      attempt.signedTransaction = undefined;
      attempt.updatedAt = submission.submittedAt;
      await this.deps.repository.updateAttempt(attempt);
      intent = { ...intent, status: reducePaymentStatus(intent.status, { type: 'TRANSACTION_SUBMITTED', transactionId: submission.transactionId }) };
      await this.deps.repository.updateIntent(intent);
      await this.deps.repository.appendLedger(createLedgerEntry({ paymentIntentId: intent.id, attemptId: attempt.id, type: 'TRANSACTION_SUBMITTED', status: intent.status, transactionId: submission.transactionId }));
      return { intent, attempt };
    } catch (cause) {
      attempt.status = 'SUBMITTING';
      attempt.errorCode = 'SUBMISSION_UNKNOWN';
      attempt.errorMessage = cause instanceof Error ? cause.message : 'Transaction submission status is unknown';
      attempt.updatedAt = new Date().toISOString();
      await this.deps.repository.updateAttempt(attempt);
      if (intent.status === 'SIGNED') {
        intent = { ...intent, status: reducePaymentStatus(intent.status, { type: 'RECOVERY_REQUIRED' }) };
        await this.deps.repository.updateIntent(intent);
      }
      throw new PaymentEngineError('SUBMISSION_UNKNOWN', 'Transaction submission could not be confirmed. Resume this exact signed transaction; do not create a new payment.', 503);
    }
  }

  async recordExternalSubmission(attemptId: string, transactionId: string): Promise<{ intent: PowerPayPaymentIntent; attempt: PaymentAttempt }> {
    const attempt = await this.deps.repository.getAttempt(attemptId);
    if (!attempt) throw new PaymentEngineError('ATTEMPT_NOT_FOUND', 'Payment attempt not found', 404);
    let intent = await this.getIntent(attempt.paymentIntentId);
    if (intent.source !== 'ACTION') throw new PaymentEngineError('INVALID_SOURCE', 'External submission reconciliation is only allowed for Action attempts', 409);
    if (attempt.transactionId) {
      if (attempt.transactionId !== transactionId) throw new PaymentEngineError('TRANSACTION_CONFLICT', 'Attempt is already bound to another transaction', 409);
      return { intent, attempt };
    }
    if (!['SIGNING', 'SIGNED'].includes(attempt.status) || !['SIGNING', 'SIGNED'].includes(intent.status)) throw new PaymentEngineError('INVALID_STATE', `Cannot attach external submission while ${intent.status}`, 409);
    attempt.status = 'SUBMITTED';
    attempt.transactionId = transactionId;
    attempt.updatedAt = new Date().toISOString();
    await this.deps.repository.updateAttempt(attempt);
    intent = { ...intent, status: 'SUBMITTED' };
    await this.deps.repository.updateIntent(intent);
    await this.deps.repository.appendLedger(createLedgerEntry({ paymentIntentId: intent.id, attemptId: attempt.id, type: 'TRANSACTION_SUBMITTED', status: intent.status, transactionId, metadata: { source: 'SOLANA_ACTION_WEBHOOK' } }));
    return { intent, attempt };
  }

  async reconcile(intentId: string, attemptId: string, expectedFeeQuoteId?: string): Promise<{ intent: PowerPayPaymentIntent; attempt: PaymentAttempt; receipt?: PaymentReceiptRecord; confirmationStatus: string }> {
    let intent = await this.getIntent(intentId);
    const attempt = await this.requireAttempt(intentId, attemptId);
    if (!attempt.transactionId) throw new PaymentEngineError('NOT_SUBMITTED', 'Payment attempt has no transaction ID', 409);
    if (!['SUBMITTED', 'CONFIRMING', 'RECOVERY_REQUIRED'].includes(intent.status)) throw new PaymentEngineError('INVALID_STATE', `Cannot reconcile while ${intent.status}`, 409);
    if (intent.status === 'SUBMITTED' || intent.status === 'RECOVERY_REQUIRED') {
      intent = { ...intent, status: reducePaymentStatus(intent.status, { type: 'CONFIRMATION_STARTED' }) };
      attempt.status = 'CONFIRMING';
      attempt.updatedAt = new Date().toISOString();
      await this.deps.repository.updateIntent(intent);
      await this.deps.repository.updateAttempt(attempt);
    }

    const confirmation = await this.requireAdapter(intent.network).confirm(attempt.transactionId);
    if (confirmation.status === 'PENDING' || confirmation.status === 'NOT_FOUND') return { intent, attempt, confirmationStatus: confirmation.status };
    if (confirmation.status === 'FAILED') {
      attempt.status = 'FAILED';
      attempt.errorCode = 'CHAIN_FAILED';
      attempt.errorMessage = confirmation.error;
      attempt.updatedAt = new Date().toISOString();
      await this.deps.repository.updateAttempt(attempt);
      intent = { ...intent, status: reducePaymentStatus(intent.status, { type: 'FAILED' }) };
      await this.deps.repository.updateIntent(intent);
      await this.deps.repository.appendLedger(createLedgerEntry({ paymentIntentId: intent.id, attemptId: attempt.id, type: 'FAILED', status: intent.status, transactionId: attempt.transactionId, metadata: { reason: confirmation.error } }));
      return { intent, attempt, confirmationStatus: 'FAILED' };
    }

    intent = { ...intent, status: reducePaymentStatus(intent.status, { type: 'TRANSACTION_CONFIRMED' }) };
    attempt.status = 'CONFIRMED';
    attempt.updatedAt = new Date().toISOString();
    await this.deps.repository.updateAttempt(attempt);
    await this.deps.repository.updateIntent(intent);
    await this.deps.repository.appendLedger(createLedgerEntry({ paymentIntentId: intent.id, attemptId: attempt.id, type: 'CHAIN_CONFIRMED', status: intent.status, transactionId: attempt.transactionId, metadata: { slot: confirmation.slot } }));

    const feeQuoteId = attempt.feeQuoteId;
    if (!feeQuoteId) throw new PaymentEngineError('QUOTE_NOT_FOUND', 'Attempt is not bound to a settlement fee quote', 409);
    if (expectedFeeQuoteId && expectedFeeQuoteId !== feeQuoteId) throw new PaymentEngineError('QUOTE_MISMATCH', 'Requested settlement quote does not match the attempt', 409);
    const fees = await this.deps.repository.getFeeQuote(feeQuoteId);
    if (!fees) throw new PaymentEngineError('QUOTE_NOT_FOUND', 'Settlement fee quote not found', 404);
    if (fees.paymentIntentId !== intent.id) throw new PaymentEngineError('QUOTE_MISMATCH', 'Settlement fee quote does not belong to this payment intent', 409);
    intent = { ...intent, status: reducePaymentStatus(intent.status, { type: 'SETTLEMENT_STARTED' }) };
    await this.deps.repository.updateIntent(intent);
    const settlement = await this.deps.settlement.settle({ intent, attempt, confirmation, fees });
    intent = { ...intent, status: reducePaymentStatus(intent.status, { type: 'SETTLEMENT_COMPLETED' }) };
    await this.deps.repository.updateIntent(intent);
    const merchantName = intent.merchantId && this.deps.merchantName ? await this.deps.merchantName(intent.merchantId) : undefined;
    const receipt: PaymentReceiptRecord = {
      receiptId: crypto.randomUUID(), paymentIntentId: intent.id, attemptId: attempt.id, network: intent.network,
      transactionId: settlement.transactionId, merchantId: intent.merchantId, merchantName, payer: attempt.walletAddress,
      asset: intent.asset, amount: intent.amount, fees, timestamp: settlement.settledAt, settlementStatus: 'SETTLED',
    };
    await this.deps.repository.saveReceipt(receipt);
    await this.deps.repository.appendLedger(createLedgerEntry({ paymentIntentId: intent.id, attemptId: attempt.id, type: 'SETTLED', status: intent.status, transactionId: settlement.transactionId, metadata: { receiptId: receipt.receiptId, settlementId: settlement.settlementId } }));
    return { intent, attempt, receipt, confirmationStatus: 'CONFIRMED' };
  }


  async cancelIntent(intentId: string): Promise<PowerPayPaymentIntent> {
    let intent = await this.getIntent(intentId);
    if (['CANCELLED', 'EXPIRED', 'FAILED'].includes(intent.status)) return intent;
    if (intent.status === 'SETTLED') throw new PaymentEngineError('INVALID_STATE', 'Settled payments cannot be cancelled', 409);
    if (['SIGNED', 'SUBMITTED', 'CONFIRMING', 'CONFIRMED', 'SETTLING', 'RECOVERY_REQUIRED'].includes(intent.status)) {
      throw new PaymentEngineError('RECOVERY_REQUIRED', 'This payment may already be signed or submitted. Check transaction status instead of cancelling it.', 409);
    }
    if (intent.status === 'SIGNING') {
      const attempts = await this.deps.repository.listAttempts(intent.id);
      const attempt = attempts.at(-1);
      if (!attempt || attempt.status !== 'SIGNING' || attempt.transactionId) throw new PaymentEngineError('RECOVERY_REQUIRED', 'Payment signing state cannot be safely cancelled', 409);
      attempt.status = 'CANCELLED';
      attempt.updatedAt = new Date().toISOString();
      await this.deps.repository.updateAttempt(attempt);
    }
    intent = { ...intent, status: reducePaymentStatus(intent.status, { type: 'CANCELLED' }) };
    await this.deps.repository.updateIntent(intent);
    await this.deps.repository.appendLedger(createLedgerEntry({ paymentIntentId: intent.id, type: 'CANCELLED', status: intent.status }));
    return intent;
  }

  async ledger(intentId: string) {
    await this.getIntent(intentId);
    return this.deps.repository.listLedger(intentId);
  }

  async attempts(intentId: string): Promise<PaymentAttempt[]> {
    await this.getIntent(intentId);
    return this.deps.repository.listAttempts(intentId);
  }

  async activity(userId: string, limit = 50): Promise<Array<{ intent: PowerPayPaymentIntent; receipt?: PaymentReceiptRecord }>> {
    const intents = await this.deps.repository.listIntentsByUser(userId, limit);
    return Promise.all(intents.map(async (intent) => ({ intent, receipt: (await this.deps.repository.getReceiptByIntent(intent.id)) ?? undefined })));
  }

  async receipt(intentId: string): Promise<PaymentReceiptRecord> {
    const receipt = await this.deps.repository.getReceiptByIntent(intentId);
    if (!receipt) throw new PaymentEngineError('RECEIPT_NOT_FOUND', 'Receipt not found', 404);
    return receipt;
  }

  private requireAdapter(network: 'SOLANA' | 'SUI'): ChainAdapter {
    const adapter = this.deps.adapters[network];
    if (!adapter) throw new PaymentEngineError('NETWORK_UNAVAILABLE', `${network} payments are not enabled`, 503);
    return adapter;
  }

  private async requireAttempt(intentId: string, attemptId: string): Promise<PaymentAttempt> {
    const attempt = await this.deps.repository.getAttempt(attemptId);
    if (!attempt || attempt.paymentIntentId !== intentId) throw new PaymentEngineError('ATTEMPT_NOT_FOUND', 'Payment attempt not found', 404);
    return attempt;
  }
}

function isPositiveDecimal(value: string): boolean { return /^\d+(\.\d+)?$/.test(value) && BigInt(value.replace('.', '').replace(/^0+/, '') || '0') > 0n; }

async function hashSignedTransaction(value: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

export class PaymentEngineError extends Error {
  constructor(readonly code: string, message: string, readonly status: number) { super(message); }
}
