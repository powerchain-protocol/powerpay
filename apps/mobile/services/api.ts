import { createIdempotencyKey, type PaymentAsset, type PaymentNetwork, type PaymentSource } from '@powerpay/payment-core';

let authTokenProvider: undefined | (() => Promise<string | undefined>);

export function configurePowerPayApiAuth(provider: typeof authTokenProvider) { authTokenProvider = provider; }

const baseUrl = (process.env.EXPO_PUBLIC_POWERPAY_API_URL || 'http://localhost:8787').replace(/\/$/, '');
const developmentUser = process.env.EXPO_PUBLIC_POWERPAY_DEVELOPMENT_USER || undefined;

export class PowerPayApiError extends Error {
  constructor(readonly code: string, message: string, readonly status: number) { super(message); }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = authTokenProvider ? await authTokenProvider() : undefined;
  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: { 'content-type': 'application/json', accept: 'application/json', ...(token ? { authorization: `Bearer ${token}` } : {}), ...(!token && developmentUser ? { 'x-powerpay-development-user': developmentUser } : {}), ...(init.headers || {}) },
  });
  const body = await response.json().catch(() => null) as any;
  if (!response.ok) throw new PowerPayApiError(body?.error?.code || 'API_ERROR', body?.error?.message || body?.message || `PowerPay API returned ${response.status}`, response.status);
  return body as T;
}

export const powerPayApi = {
  resolveQr(raw: string) {
    return request<any>('/api/v1/qr/resolve', { method: 'POST', body: JSON.stringify({ raw }) });
  },
  createCheckoutIntent(checkoutId: string, nonce?: string, idempotencyKey?: string) {
    const key = idempotencyKey || (nonce ? `checkout:${checkoutId}:${nonce}` : createIdempotencyKey('checkout'));
    return request<any>(`/api/v1/checkouts/${encodeURIComponent(checkoutId)}/intents`, { method: 'POST', headers: { 'x-idempotency-key': key }, body: JSON.stringify({ nonce, idempotencyKey: key }) });
  },
  createIntent(input: { idempotencyKey: string; source: PaymentSource; network: PaymentNetwork; asset: PaymentAsset; amount: string; fiatCurrency?: 'USD' | 'EUR'; recipient: string; merchantId?: string; reference?: string; checkoutId?: string; nonce?: string; expiresAt?: string }) {
    return request<any>('/api/v1/payments/intents', { method: 'POST', headers: { 'x-idempotency-key': input.idempotencyKey }, body: JSON.stringify(input) });
  },
  getIntent(id: string) { return request<any>(`/api/v1/payments/intents/${encodeURIComponent(id)}`); },
  lockIntent(id: string) { return request<any>(`/api/v1/payments/intents/${encodeURIComponent(id)}/lock`, { method: 'POST', body: '{}' }); },
  cancelIntent(id: string) { return request<any>(`/api/v1/payments/intents/${encodeURIComponent(id)}/cancel`, { method: 'POST', body: '{}' }); },
  ledger(id: string) { return request<any>(`/api/v1/payments/intents/${encodeURIComponent(id)}/ledger`); },
  listAttempts(id: string) { return request<any>(`/api/v1/payments/intents/${encodeURIComponent(id)}/attempts`); },
  createAttempt(id: string, walletAddress: string, feeQuoteId: string, idempotencyKey: string) { return request<any>(`/api/v1/payments/intents/${encodeURIComponent(id)}/attempts`, { method: 'POST', headers: { 'x-idempotency-key': idempotencyKey }, body: JSON.stringify({ walletAddress, feeQuoteId, idempotencyKey }) }); },
  abortAttempt(id: string, attemptId: string) { return request<any>(`/api/v1/payments/intents/${encodeURIComponent(id)}/attempts/${encodeURIComponent(attemptId)}/abort`, { method: 'POST', body: '{}' }); },
  markSigned(id: string, attemptId: string) { return request<any>(`/api/v1/payments/intents/${encodeURIComponent(id)}/attempts/${encodeURIComponent(attemptId)}/signed`, { method: 'POST', body: '{}' }); },
  submit(id: string, attemptId: string, signedTransaction: string) { return request<any>(`/api/v1/payments/intents/${encodeURIComponent(id)}/attempts/${encodeURIComponent(attemptId)}/submit`, { method: 'POST', body: JSON.stringify({ signedTransaction }) }); },
  reconcile(id: string, attemptId: string, feeQuoteId?: string) { return request<any>(`/api/v1/payments/intents/${encodeURIComponent(id)}/attempts/${encodeURIComponent(attemptId)}/reconcile`, { method: 'POST', body: JSON.stringify(feeQuoteId ? { feeQuoteId } : {}) }); },
  receipt(id: string) { return request<any>(`/api/v1/payments/intents/${encodeURIComponent(id)}/receipt`); },
  account() { return request<any>('/api/v1/account'); },
  wallets() { return request<any>('/api/v1/wallets'); },
  solanaPortfolio(address: string) { return request<any>(`/api/v1/portfolio/solana?address=${encodeURIComponent(address)}`); },
  activity(limit = 50) { return request<any>(`/api/v1/activity?limit=${Math.max(1, Math.min(limit, 100))}`); },
  notifications(limit = 50) { return request<any>(`/api/v1/notifications?limit=${Math.max(1, Math.min(limit, 100))}`); },
  markNotificationRead(id: string) { return request<any>(`/api/v1/notifications/${encodeURIComponent(id)}/read`, { method: 'POST', body: '{}' }); },
  markAllNotificationsRead() { return request<any>('/api/v1/notifications/read-all', { method: 'POST', body: '{}' }); },
  capabilities() { return request<any>('/api/v1/capabilities'); },
  prices(base: string, quote: 'USD' | 'EUR' = 'USD') { return request<any>(`/api/v1/prices?base=${encodeURIComponent(base)}&quote=${quote}`); },
};
