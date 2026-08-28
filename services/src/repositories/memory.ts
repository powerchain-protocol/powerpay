import type { FeeQuote } from '@powerpay/fees';
import type { LedgerEntry, PaymentReceiptRecord, PaymentRepository } from '@powerpay/ledger';
import { assertLockedFieldsUnchanged, type PaymentAttempt, type PowerPayPaymentIntent } from '@powerpay/payment-core';
import type { ReplayNonceStore } from '@powerpay/security';

export class InMemoryPaymentRepository implements PaymentRepository, ReplayNonceStore {
  private intents = new Map<string, PowerPayPaymentIntent>();
  private idempotency = new Map<string, string>();
  private attempts = new Map<string, PaymentAttempt>();
  private quotes = new Map<string, FeeQuote>();
  private ledger: LedgerEntry[] = [];
  private receipts = new Map<string, PaymentReceiptRecord>();
  private nonces = new Map<string, { expiresAt: string; resourceId?: string }>();

  async findIntentById(id: string) { return this.intents.get(id) ?? null; }
  async findIntentByIdempotencyKey(key: string) { const id = this.idempotency.get(key); return id ? this.intents.get(id) ?? null : null; }
  async listIntentsByUser(userId: string, limit = 50) { return [...this.intents.values()].filter((item) => item.userId === userId).sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)).slice(0, limit).map((item) => structuredClone(item)); }
  async createIntent(intent: PowerPayPaymentIntent) { const existing = this.idempotency.get(intent.idempotencyKey); if (existing) return structuredClone(this.intents.get(existing)!); this.intents.set(intent.id, structuredClone(intent)); this.idempotency.set(intent.idempotencyKey, intent.id); return structuredClone(intent); }
  async updateIntent(intent: PowerPayPaymentIntent) { const existing = this.intents.get(intent.id); if (!existing) throw new Error('Payment intent not found'); assertLockedFieldsUnchanged(existing, intent); this.intents.set(intent.id, structuredClone(intent)); return structuredClone(intent); }
  async findAttemptByIdempotencyKey(key: string) { const row = [...this.attempts.values()].find((item) => item.idempotencyKey === key); return row ? structuredClone(row) : null; }
  async createAttempt(attempt: PaymentAttempt) { const byKey = await this.findAttemptByIdempotencyKey(attempt.idempotencyKey); if (byKey) return byKey; const duplicate = [...this.attempts.values()].find((item) => item.paymentIntentId === attempt.paymentIntentId && item.sequence === attempt.sequence); if (duplicate) return structuredClone(duplicate); this.attempts.set(attempt.id, structuredClone(attempt)); return structuredClone(attempt); }
  async updateAttempt(attempt: PaymentAttempt) { if (!this.attempts.has(attempt.id)) throw new Error('Payment attempt not found'); this.attempts.set(attempt.id, structuredClone(attempt)); return structuredClone(attempt); }
  async getAttempt(id: string) { return this.attempts.get(id) ?? null; }
  async listAttempts(intentId: string) { return [...this.attempts.values()].filter((item) => item.paymentIntentId === intentId).sort((a, b) => a.sequence - b.sequence); }
  async saveFeeQuote(intentId: string, quote: FeeQuote) { if (quote.paymentIntentId !== intentId) throw new Error('Fee quote payment intent mismatch'); this.quotes.set(quote.id, structuredClone(quote)); }
  async getFeeQuote(id: string) { const q = this.quotes.get(id); return q ? structuredClone(q) : null; }
  async appendLedger(entry: LedgerEntry) { this.ledger.push(structuredClone(entry)); }
  async listLedger(intentId: string) { return this.ledger.filter((entry) => entry.paymentIntentId === intentId).map((entry) => structuredClone(entry)); }
  async saveReceipt(receipt: PaymentReceiptRecord) { this.receipts.set(receipt.paymentIntentId, structuredClone(receipt)); }
  async getReceiptByIntent(intentId: string) { return this.receipts.get(intentId) ?? null; }
  async isConsumed(nonce: string, resourceId?: string) { const row = this.nonces.get(nonce); return Boolean(row && Date.parse(row.expiresAt) > Date.now() && row.resourceId !== resourceId); }
  async consume(nonce: string, expiresAt: string, resourceId?: string) { const row = this.nonces.get(nonce); if (row && Date.parse(row.expiresAt) > Date.now()) return row.resourceId === resourceId; this.nonces.set(nonce, { expiresAt, resourceId }); return true; }
}
