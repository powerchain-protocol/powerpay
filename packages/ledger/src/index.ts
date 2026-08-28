import type { PaymentAttempt, PaymentStatus, PowerPayPaymentIntent } from '@powerpay/payment-core';
import type { FeeQuote } from '@powerpay/fees';

export type LedgerEntryType = 'INTENT_CREATED' | 'INTENT_LOCKED' | 'ATTEMPT_CREATED' | 'TRANSACTION_SUBMITTED' | 'CHAIN_CONFIRMED' | 'SETTLED' | 'REFUNDED' | 'FAILED' | 'CANCELLED' | 'EXPIRED';

export interface PaymentReceiptRecord {
  receiptId: string;
  paymentIntentId: string;
  attemptId: string;
  network: string;
  transactionId: string;
  merchantId?: string;
  merchantName?: string;
  payer?: string;
  asset: string;
  amount: string;
  fees: FeeQuote;
  timestamp: string;
  settlementStatus: 'SETTLED' | 'REFUNDED';
}

export interface LedgerEntry {
  id: string;
  paymentIntentId: string;
  attemptId?: string;
  type: LedgerEntryType;
  status: PaymentStatus;
  transactionId?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface PaymentRepository {
  findIntentById(id: string): Promise<PowerPayPaymentIntent | null>;
  findIntentByIdempotencyKey(key: string): Promise<PowerPayPaymentIntent | null>;
  listIntentsByUser(userId: string, limit?: number): Promise<PowerPayPaymentIntent[]>;
  createIntent(intent: PowerPayPaymentIntent): Promise<PowerPayPaymentIntent>;
  updateIntent(intent: PowerPayPaymentIntent): Promise<PowerPayPaymentIntent>;
  findAttemptByIdempotencyKey(key: string): Promise<PaymentAttempt | null>;
  createAttempt(attempt: PaymentAttempt): Promise<PaymentAttempt>;
  updateAttempt(attempt: PaymentAttempt): Promise<PaymentAttempt>;
  getAttempt(id: string): Promise<PaymentAttempt | null>;
  listAttempts(intentId: string): Promise<PaymentAttempt[]>;
  saveFeeQuote(intentId: string, quote: FeeQuote): Promise<void>;
  getFeeQuote(id: string): Promise<FeeQuote | null>;
  appendLedger(entry: LedgerEntry): Promise<void>;
  listLedger(intentId: string): Promise<LedgerEntry[]>;
  saveReceipt(receipt: PaymentReceiptRecord): Promise<void>;
  getReceiptByIntent(intentId: string): Promise<PaymentReceiptRecord | null>;
}

export function createLedgerEntry(input: Omit<LedgerEntry, 'id' | 'createdAt'>): LedgerEntry {
  return { ...input, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
}
