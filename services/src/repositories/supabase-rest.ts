import type { FeeQuote } from '@powerpay/fees';
import type { LedgerEntry, PaymentReceiptRecord, PaymentRepository } from '@powerpay/ledger';
import { assertLockedFieldsUnchanged, type PaymentAttempt, type PowerPayPaymentIntent } from '@powerpay/payment-core';
import type { ReplayNonceStore } from '@powerpay/security';

export interface SupabaseRestConfig {
  url: string;
  serviceRoleKey: string;
}

export class SupabaseRestPaymentRepository implements PaymentRepository, ReplayNonceStore {
  constructor(private readonly config: SupabaseRestConfig) {
    if (!config.url || !config.serviceRoleKey) throw new Error('Supabase URL and service role key are required');
  }

  async findIntentById(id: string) { return this.one<PowerPayPaymentIntent>('PaymentIntent', `id=eq.${encodeURIComponent(id)}&select=*`); }
  async findIntentByIdempotencyKey(key: string) { const row = await this.one<PowerPayPaymentIntent>('PaymentIntent', `idempotencyKey=eq.${encodeURIComponent(key)}&select=*`); return row ? normalizeIntent(row) : null; }
  async listIntentsByUser(userId: string, limit = 50) { const rows = await this.many<PowerPayPaymentIntent>('PaymentIntent', `userId=eq.${encodeURIComponent(userId)}&select=*&order=createdAt.desc&limit=${Math.max(1, Math.min(limit, 100))}`); return rows.map(normalizeIntent); }

  async createIntent(intent: PowerPayPaymentIntent) {
    const response = await this.request('PaymentIntent', { method: 'POST', body: dbIntent(intent), headers: { Prefer: 'return=representation' }, allowConflict: true });
    if (response.status === 409) {
      const existing = await this.findIntentByIdempotencyKey(intent.idempotencyKey);
      if (existing) return normalizeIntent(existing);
      throw new Error('Payment intent idempotency conflict');
    }
    const rows = await response.json() as PowerPayPaymentIntent[];
    return normalizeIntent(rows[0]);
  }

  async updateIntent(intent: PowerPayPaymentIntent) {
    const existing = await this.findIntentById(intent.id);
    if (!existing) throw new Error('Payment intent not found');
    assertLockedFieldsUnchanged(existing, intent);
    const response = await this.request(`PaymentIntent?id=eq.${encodeURIComponent(intent.id)}`, { method: 'PATCH', body: dbIntent(intent), headers: { Prefer: 'return=representation' } });
    const rows = await response.json() as PowerPayPaymentIntent[];
    if (!rows[0]) throw new Error('Payment intent not found');
    return normalizeIntent(rows[0]);
  }

  async findAttemptByIdempotencyKey(key: string) { const row = await this.one<PaymentAttempt>('PaymentAttempt', `idempotencyKey=eq.${encodeURIComponent(key)}&select=*`); return row ? normalizeAttempt(row) : null; }

  async createAttempt(attempt: PaymentAttempt) {
    const response = await this.request('PaymentAttempt', { method: 'POST', body: dbAttempt(attempt), headers: { Prefer: 'return=representation' }, allowConflict: true });
    if (response.status === 409) {
      const existing = await this.findAttemptByIdempotencyKey(attempt.idempotencyKey);
      if (existing) return existing;
      throw new Error('Payment attempt idempotency conflict');
    }
    const rows = await response.json() as PaymentAttempt[];
    return normalizeAttempt(rows[0]);
  }

  async updateAttempt(attempt: PaymentAttempt) {
    const response = await this.request(`PaymentAttempt?id=eq.${encodeURIComponent(attempt.id)}`, { method: 'PATCH', body: dbAttempt(attempt), headers: { Prefer: 'return=representation' } });
    const rows = await response.json() as PaymentAttempt[];
    if (!rows[0]) throw new Error('Payment attempt not found');
    return normalizeAttempt(rows[0]);
  }

  async getAttempt(id: string) { const row = await this.one<PaymentAttempt>('PaymentAttempt', `id=eq.${encodeURIComponent(id)}&select=*`); return row ? normalizeAttempt(row) : null; }
  async listAttempts(intentId: string) { const rows = await this.many<PaymentAttempt>('PaymentAttempt', `paymentIntentId=eq.${encodeURIComponent(intentId)}&select=*&order=sequence.asc`); return rows.map(normalizeAttempt); }

  async saveFeeQuote(intentId: string, quote: FeeQuote) {
    if (quote.paymentIntentId !== intentId) throw new Error('Fee quote payment intent mismatch');
    await this.request('PaymentQuote', { method: 'POST', body: {
      id: quote.id, paymentIntentId: intentId, asset: quote.asset, network: quote.network,
      subtotal: quote.subtotal, serviceFee: quote.serviceFee, protocolFee: quote.protocolFee,
      networkFee: quote.networkFee, total: quote.total, quoteHash: quote.quoteHash,
      signature: quote.signature, expiresAt: quote.expiresAt,
    }, headers: { Prefer: 'return=minimal' } });
  }

  async getFeeQuote(id: string) {
    const row = await this.one<Record<string, unknown>>('PaymentQuote', `id=eq.${encodeURIComponent(id)}&select=*`);
    if (!row) return null;
    return {
      id: String(row.id), paymentIntentId: String(row.paymentIntentId), asset: String(row.asset) as FeeQuote['asset'], network: String(row.network) as FeeQuote['network'],
      subtotal: String(row.subtotal), serviceFee: String(row.serviceFee), protocolFee: String(row.protocolFee), networkFee: String(row.networkFee), total: String(row.total),
      expiresAt: String(row.expiresAt), quoteHash: row.quoteHash ? String(row.quoteHash) : undefined, signature: row.signature ? String(row.signature) : undefined,
    };
  }

  async appendLedger(entry: LedgerEntry) {
    await this.request('LedgerEntry', { method: 'POST', body: entry, headers: { Prefer: 'return=minimal' } });
  }

  async listLedger(intentId: string) { return this.many<LedgerEntry>('LedgerEntry', `paymentIntentId=eq.${encodeURIComponent(intentId)}&select=*&order=createdAt.asc`); }

  async saveReceipt(receipt: PaymentReceiptRecord) {
    await this.request('PaymentReceipt', { method: 'POST', body: receipt, headers: { Prefer: 'resolution=merge-duplicates,return=minimal' } });
  }

  async getReceiptByIntent(intentId: string) { return this.one<PaymentReceiptRecord>('PaymentReceipt', `paymentIntentId=eq.${encodeURIComponent(intentId)}&select=*`); }

  async isConsumed(nonce: string, resourceId?: string): Promise<boolean> {
    const row = await this.one<{ consumedAt: string | null; expiresAt: string; paymentIntentId: string | null }>('QrNonce', `nonce=eq.${encodeURIComponent(nonce)}&select=consumedAt,expiresAt,paymentIntentId`);
    return Boolean(row?.consumedAt && Date.parse(row.expiresAt) > Date.now() && row.paymentIntentId !== resourceId);
  }

  async consume(nonce: string, expiresAt: string, resourceId?: string): Promise<boolean> {
    const response = await this.rpc('consume_qr_nonce', { p_nonce: nonce, p_expires_at: expiresAt, p_payment_intent_id: resourceId || null });
    const body = await response.json() as boolean | boolean[];
    return Array.isArray(body) ? Boolean(body[0]) : Boolean(body);
  }

  private async one<T>(table: string, query: string): Promise<T | null> { const rows = await this.many<T>(table, `${query}&limit=1`); return rows[0] ?? null; }
  private async many<T>(table: string, query: string): Promise<T[]> { const response = await this.request(`${table}?${query}`, { method: 'GET' }); return response.json() as Promise<T[]>; }

  private async rpc(name: string, body: unknown) { return this.request(`rpc/${name}`, { method: 'POST', body }); }

  private async request(path: string, input: { method: string; body?: unknown; headers?: Record<string, string>; allowConflict?: boolean }) {
    const response = await fetch(`${this.config.url.replace(/\/$/, '')}/rest/v1/${path}`, {
      method: input.method,
      headers: { apikey: this.config.serviceRoleKey, authorization: `Bearer ${this.config.serviceRoleKey}`, 'content-type': 'application/json', ...input.headers },
      body: input.body === undefined ? undefined : JSON.stringify(input.body),
    });
    if (!response.ok && !(input.allowConflict && response.status === 409)) {
      const text = await response.text();
      throw new Error(`Supabase REST ${input.method} ${path} failed (${response.status}): ${text.slice(0, 300)}`);
    }
    return response;
  }
}

function dbIntent(intent: PowerPayPaymentIntent) { return { ...intent }; }
function normalizeIntent(intent: PowerPayPaymentIntent) { return { ...intent }; }
function dbAttempt(attempt: PaymentAttempt) { return { ...attempt, signedTransaction: undefined }; }
function normalizeAttempt(attempt: PaymentAttempt) { return { ...attempt }; }
