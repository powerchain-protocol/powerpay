import {
  API_ROUTES,
  POWERPAY_HEADERS,
  type ApiErrorPayload,
  type PowerPayRequestContext,
} from '@powerpay/api-contract';
import type { PaymentAsset, PaymentNetwork, PaymentSource } from '@powerpay/payment-core';

export interface PowerPayApiClientOptions {
  baseUrl?: string;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
  getHeaders?: () => Promise<Record<string, string> | undefined> | Record<string, string> | undefined;
  getContext?: () => PowerPayRequestContext | undefined;
}

export class PowerPayApiError extends Error {
  constructor(
    readonly code: string,
    message: string,
    readonly status: number,
    readonly requestId?: string,
    readonly details?: unknown,
  ) {
    super(message);
    this.name = 'PowerPayApiError';
  }
}

export class PowerPayApiClient {
  private readonly baseUrl: string;
  private readonly timeoutMs: number;
  private readonly fetchImpl: typeof fetch;

  constructor(private readonly options: PowerPayApiClientOptions = {}) {
    this.baseUrl = (options.baseUrl || '').replace(/\/$/, '');
    this.timeoutMs = options.timeoutMs ?? 15_000;
    this.fetchImpl = options.fetchImpl ?? fetch;
  }

  async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);
    const context = this.options.getContext?.();
    const extraHeaders = await this.options.getHeaders?.();
    const requestId = context?.requestId || randomRequestId();
    const headers = new Headers(init.headers);
    if (!headers.has('accept')) headers.set('accept', 'application/json');
    if (init.body !== undefined && !headers.has('content-type')) headers.set('content-type', 'application/json');
    headers.set(POWERPAY_HEADERS.requestId, requestId);
    if (context?.cluster) headers.set(POWERPAY_HEADERS.cluster, context.cluster);
    if (context?.rpcProfile) headers.set(POWERPAY_HEADERS.rpcProfile, context.rpcProfile);
    if (context?.suiNetwork) headers.set(POWERPAY_HEADERS.suiNetwork, context.suiNetwork);
    if (context?.suiRpcProfile) headers.set(POWERPAY_HEADERS.suiRpcProfile, context.suiRpcProfile);
    for (const [key, value] of Object.entries(extraHeaders || {})) if (value) headers.set(key, value);

    try {
      const response = await this.fetchImpl(`${this.baseUrl}${path}`, { ...init, headers, signal: init.signal || controller.signal });
      const responseRequestId = response.headers.get(POWERPAY_HEADERS.requestId) || requestId;
      const contentType = response.headers.get('content-type') || '';
      const body = contentType.includes('application/json')
        ? await response.json().catch(() => null)
        : await response.text().catch(() => '');
      if (!response.ok) {
        const payload = body && typeof body === 'object' ? body as ApiErrorPayload : null;
        throw new PowerPayApiError(
          payload?.error?.code || 'API_ERROR',
          payload?.error?.message || `PowerPay API returned ${response.status}`,
          response.status,
          responseRequestId,
          payload?.error?.details,
        );
      }
      return body as T;
    } catch (error) {
      if (error instanceof PowerPayApiError) throw error;
      if (error instanceof Error && error.name === 'AbortError') throw new PowerPayApiError('REQUEST_TIMEOUT', 'PowerPay API request timed out', 408, requestId);
      throw new PowerPayApiError('NETWORK_ERROR', error instanceof Error ? error.message : 'PowerPay API request failed', 0, requestId);
    } finally {
      clearTimeout(timer);
    }
  }

  health() { return this.request<any>(API_ROUTES.health); }
  readiness() { return this.request<any>(API_ROUTES.ready); }
  capabilities() { return this.request<any>(API_ROUTES.capabilities); }
  systemOverview() { return this.request<any>(API_ROUTES.systemOverview); }
  rpcHealth() { return this.request<any>(API_ROUTES.rpcHealth); }
  programsVerify() { return this.request<any>(API_ROUTES.programsVerify); }
  solanaOverview() { return this.request<any>(API_ROUTES.solanaOverview); }
  solanaPrograms() { return this.request<any>(API_ROUTES.solanaPrograms); }
  solanaMarket(mint: string) { return this.request<any>(`${API_ROUTES.solanaMarket}?mint=${encodeURIComponent(mint)}`); }
  solanaAsset(mint: string) { return this.request<any>(API_ROUTES.solanaAsset(mint)); }
  suiOverview() { return this.request<any>(API_ROUTES.suiOverview); }
  suiPackages() { return this.request<any>(API_ROUTES.suiPackages); }
  suiMarket(coinType: string) { return this.request<any>(`${API_ROUTES.suiMarket}?coinType=${encodeURIComponent(coinType)}`); }
  suiAsset(coinType: string) { return this.request<any>(API_ROUTES.suiAsset(coinType)); }
  prices(base: string, quote: 'USD' | 'EUR' = 'USD') { return this.request<any>(`${API_ROUTES.prices}?base=${encodeURIComponent(base)}&quote=${quote}`); }
  account() { return this.request<any>(API_ROUTES.account); }
  wallets() { return this.request<any>(API_ROUTES.wallets); }
  solanaPortfolio(address: string) { return this.request<any>(`${API_ROUTES.solanaPortfolio}?address=${encodeURIComponent(address)}`); }
  activity(limit = 50) { return this.request<any>(`${API_ROUTES.activity}?limit=${clampLimit(limit)}`); }
  notifications(limit = 50) { return this.request<any>(`${API_ROUTES.notifications}?limit=${clampLimit(limit)}`); }
  markNotificationRead(id: string) { return this.request<any>(`${API_ROUTES.notifications}/${encodeURIComponent(id)}/read`, jsonPost({})); }
  markAllNotificationsRead() { return this.request<any>(`${API_ROUTES.notifications}/read-all`, jsonPost({})); }

  resolveQr(raw: string) { return this.request<any>('/api/v1/qr/resolve', jsonPost({ raw })); }
  createCheckoutIntent(checkoutId: string, body: { nonce?: string; idempotencyKey: string }) {
    return this.request<any>(`/api/v1/checkouts/${encodeURIComponent(checkoutId)}/intents`, jsonPost(body, body.idempotencyKey));
  }
  createIntent(input: { idempotencyKey: string; source: PaymentSource; network: PaymentNetwork; asset: PaymentAsset; amount: string; fiatCurrency?: 'USD' | 'EUR'; recipient: string; merchantId?: string; reference?: string; checkoutId?: string; nonce?: string; expiresAt?: string }) {
    return this.request<any>(API_ROUTES.paymentIntents, jsonPost(input, input.idempotencyKey));
  }
  getIntent(id: string) { return this.request<any>(`${API_ROUTES.paymentIntents}/${encodeURIComponent(id)}`); }
  lockIntent(id: string) { return this.request<any>(`${API_ROUTES.paymentIntents}/${encodeURIComponent(id)}/lock`, jsonPost({})); }
  cancelIntent(id: string) { return this.request<any>(`${API_ROUTES.paymentIntents}/${encodeURIComponent(id)}/cancel`, jsonPost({})); }
  ledger(id: string) { return this.request<any>(`${API_ROUTES.paymentIntents}/${encodeURIComponent(id)}/ledger`); }
  listAttempts(id: string) { return this.request<any>(`${API_ROUTES.paymentIntents}/${encodeURIComponent(id)}/attempts`); }
  createAttempt(id: string, body: { walletAddress: string; feeQuoteId: string; idempotencyKey: string }) {
    return this.request<any>(`${API_ROUTES.paymentIntents}/${encodeURIComponent(id)}/attempts`, jsonPost(body, body.idempotencyKey));
  }
  abortAttempt(id: string, attemptId: string) { return this.request<any>(`${API_ROUTES.paymentIntents}/${encodeURIComponent(id)}/attempts/${encodeURIComponent(attemptId)}/abort`, jsonPost({})); }
  markSigned(id: string, attemptId: string) { return this.request<any>(`${API_ROUTES.paymentIntents}/${encodeURIComponent(id)}/attempts/${encodeURIComponent(attemptId)}/signed`, jsonPost({})); }
  submit(id: string, attemptId: string, signedTransaction: string) { return this.request<any>(`${API_ROUTES.paymentIntents}/${encodeURIComponent(id)}/attempts/${encodeURIComponent(attemptId)}/submit`, jsonPost({ signedTransaction })); }
  reconcile(id: string, attemptId: string, feeQuoteId?: string) { return this.request<any>(`${API_ROUTES.paymentIntents}/${encodeURIComponent(id)}/attempts/${encodeURIComponent(attemptId)}/reconcile`, jsonPost(feeQuoteId ? { feeQuoteId } : {})); }
  receipt(id: string) { return this.request<any>(`${API_ROUTES.paymentIntents}/${encodeURIComponent(id)}/receipt`); }
}

function jsonPost(body: unknown, idempotencyKey?: string): RequestInit {
  return {
    method: 'POST',
    headers: idempotencyKey ? { [POWERPAY_HEADERS.idempotencyKey]: idempotencyKey } : undefined,
    body: JSON.stringify(body),
  };
}

function clampLimit(value: number): number { return Math.max(1, Math.min(Math.trunc(value || 50), 100)); }
function randomRequestId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  return `pp-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
