import { capabilitiesFor } from '@powerpay/capabilities';
import { parseQrPayload, validateQrPayload } from '@powerpay/qr';
import { assertNonceAvailable, InMemoryRateLimiter, type ReplayNonceStore } from '@powerpay/security';
import { createIdempotencyKey, type PaymentAsset, type PaymentNetwork, type PaymentSource } from '@powerpay/payment-core';
import { actionGetResponse, actionsManifest, SOLANA_ACTION_HEADERS, type CheckoutRecord, type MerchantDirectory, type PowerPayFeatures, type RequestAuthenticator, type RequestIdentity, type AccountDirectory, type NotificationDirectory } from '@powerpay/services';
import type { PaymentEngine } from '../payments/engine';
import { PaymentEngineError } from '../payments/engine';

export interface BackendHandlerDependencies {
  engine: PaymentEngine;
  merchants: MerchantDirectory;
  nonceStore: ReplayNonceStore;
  features: PowerPayFeatures;
  publicBaseUrl: string;
  iconUrl: string;
  allowedActionHosts?: string[];
  assetForSolanaMint?: (mint?: string) => PaymentAsset | null;
  getPrices?: (base: string, quote: 'USD' | 'EUR') => Promise<unknown>;
  heliusWebhookSecret?: string;
  authenticator?: RequestAuthenticator;
  authRequired?: boolean;
  accounts?: AccountDirectory;
  allowDevelopmentIdentity?: boolean;
  notifications?: NotificationDirectory;
  getSolanaPortfolio?: (address: string) => Promise<unknown>;
  readiness?: () => unknown;
}

const limiter = new InMemoryRateLimiter(60, 60_000);

export function createBackendHandler(deps: BackendHandlerDependencies) {
  return async function handle(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const requestId = request.headers.get('x-request-id') || crypto.randomUUID();
    const clientKey = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || 'unknown';
    if (!limiter.check(`${clientKey}:${url.pathname}`)) return json({ error: { code: 'RATE_LIMITED', message: 'Too many requests' }, requestId }, 429);

    try {
      const userApi = url.pathname.startsWith('/api/v1/payments/') || /^\/api\/v1\/checkouts\/[^/]+\/intents$/.test(url.pathname) || url.pathname === '/api/v1/account' || url.pathname === '/api/v1/wallets' || url.pathname === '/api/v1/activity' || url.pathname === '/api/v1/notifications' || url.pathname.startsWith('/api/v1/notifications/') || url.pathname === '/api/v1/portfolio/solana';
      const identity = userApi ? (await authenticateRequest(request, deps)) ?? developmentIdentity(request, deps) : null;
      if (userApi && deps.authRequired && !identity) return jsonError('UNAUTHORIZED', 'Authentication required', requestId, 401);
      const account = identity && deps.accounts ? await deps.accounts.ensureAccount(identity) : null;
      const accountId = account?.id ?? identity?.userId;

      if (request.method === 'OPTIONS' && (url.pathname === '/actions.json' || url.pathname.startsWith('/api/actions/'))) return new Response(null, { status: 204, headers: SOLANA_ACTION_HEADERS });
      if (request.method === 'GET' && url.pathname === '/actions.json') return actionJson(actionsManifest());
      if (request.method === 'GET' && url.pathname === '/api/v1/health') return json({ ok: true, service: 'powerpay-backend', requestId });
      if (request.method === 'GET' && url.pathname === '/api/v1/readiness') return json({ ok: true, readiness: deps.readiness ? deps.readiness() : { configured: false }, requestId });
      if (request.method === 'GET' && url.pathname === '/api/v1/capabilities') return json({ features: deps.features, networks: { SOLANA: capabilitiesFor('SOLANA', deps.features), SUI: capabilitiesFor('SUI', deps.features) }, requestId });
      if (request.method === 'GET' && url.pathname === '/api/v1/account') {
        if (!identity || !accountId) return jsonError('UNAUTHORIZED', 'Authentication required', requestId, 401);
        return json({ account: account ?? { id: accountId, externalId: identity.userId }, requestId });
      }
      if (request.method === 'GET' && url.pathname === '/api/v1/wallets') {
        if (!identity || !accountId) return jsonError('UNAUTHORIZED', 'Authentication required', requestId, 401);
        if (!deps.accounts) return json({ wallets: [], requestId });
        return json({ wallets: await deps.accounts.listWallets(accountId), requestId });
      }
      if (request.method === 'GET' && url.pathname === '/api/v1/portfolio/solana') {
        if (!identity || !accountId) return jsonError('UNAUTHORIZED', 'Authentication required', requestId, 401);
        if (!deps.getSolanaPortfolio) return jsonError('PORTFOLIO_UNAVAILABLE', 'Solana portfolio service is not configured', requestId, 503);
        const address = url.searchParams.get('address') || '';
        if (!address) return jsonError('VALIDATION_ERROR', 'address is required', requestId, 400);
        try { return json({ portfolio: await deps.getSolanaPortfolio(address), requestId }); }
        catch (cause) { return jsonError('PORTFOLIO_UNAVAILABLE', cause instanceof Error ? cause.message : 'Portfolio unavailable', requestId, 503); }
      }
      if (request.method === 'GET' && url.pathname === '/api/v1/activity') {
        if (!identity || !accountId) return jsonError('UNAUTHORIZED', 'Authentication required', requestId, 401);
        const limit = Math.max(1, Math.min(Number(url.searchParams.get('limit') || 50) || 50, 100));
        return json({ activity: await deps.engine.activity(accountId, limit), requestId });
      }
      if (request.method === 'GET' && url.pathname === '/api/v1/notifications') {
        if (!identity || !accountId) return jsonError('UNAUTHORIZED', 'Authentication required', requestId, 401);
        if (!deps.notifications) return json({ notifications: [], unread: 0, requestId });
        const limit = Math.max(1, Math.min(Number(url.searchParams.get('limit') || 50) || 50, 100));
        const notifications = await deps.notifications.list(accountId, limit);
        return json({ notifications, unread: notifications.filter((item) => !item.readAt).length, requestId });
      }
      const notificationReadMatch = url.pathname.match(/^\/api\/v1\/notifications\/([^/]+)\/read$/);
      if (request.method === 'POST' && notificationReadMatch) {
        if (!identity || !accountId) return jsonError('UNAUTHORIZED', 'Authentication required', requestId, 401);
        if (!deps.notifications) return jsonError('NOT_FOUND', 'Notification not found', requestId, 404);
        const notification = await deps.notifications.markRead(accountId, notificationReadMatch[1]);
        if (!notification) return jsonError('NOT_FOUND', 'Notification not found', requestId, 404);
        return json({ notification, requestId });
      }
      if (request.method === 'POST' && url.pathname === '/api/v1/notifications/read-all') {
        if (!identity || !accountId) return jsonError('UNAUTHORIZED', 'Authentication required', requestId, 401);
        const updated = deps.notifications ? await deps.notifications.markAllRead(accountId) : 0;
        return json({ updated, requestId });
      }

      if (request.method === 'POST' && url.pathname === '/api/v1/webhooks/helius') {
        if (!deps.heliusWebhookSecret) return jsonError('WEBHOOK_DISABLED', 'Helius webhook reconciliation is not configured', requestId, 503);
        const supplied = request.headers.get('x-powerpay-webhook-secret');
        if (!supplied || supplied !== deps.heliusWebhookSecret) return jsonError('WEBHOOK_UNAUTHORIZED', 'Invalid webhook secret', requestId, 401);
        const body = await bodyJson<unknown>(request);
        const events = Array.isArray(body) ? body : [body];
        const results: Array<Record<string, unknown>> = [];
        for (const event of events) {
          const attemptId = findPowerPayAttemptId(event);
          const transactionId = findTransactionSignature(event);
          if (!attemptId || !transactionId) { results.push({ processed: false, reason: 'NO_POWERPAY_ATTEMPT' }); continue; }
          const bound = await deps.engine.recordExternalSubmission(attemptId, transactionId);
          if (!bound.attempt.feeQuoteId) { results.push({ processed: true, reconciled: false, paymentIntentId: bound.intent.id, attemptId, transactionId, reason: 'QUOTE_ID_MISSING' }); continue; }
          const reconciled = await deps.engine.reconcile(bound.intent.id, attemptId, bound.attempt.feeQuoteId);
          results.push({ processed: true, reconciled: reconciled.intent.status === 'SETTLED', paymentIntentId: bound.intent.id, attemptId, transactionId, status: reconciled.intent.status });
        }
        return json({ ok: true, results, requestId });
      }

      if (request.method === 'GET' && url.pathname === '/api/v1/prices') {
        if (!deps.getPrices) return jsonError('PRICE_UNAVAILABLE', 'Price service is not configured', requestId, 503);
        const base = (url.searchParams.get('base') || '').toUpperCase();
        const quote = (url.searchParams.get('quote') || 'USD').toUpperCase();
        if (!base || (quote !== 'USD' && quote !== 'EUR')) return jsonError('VALIDATION_ERROR', 'base and USD/EUR quote are required', requestId, 400);
        return json({ prices: await deps.getPrices(base, quote), requestId });
      }

      if (request.method === 'POST' && url.pathname === '/api/v1/qr/resolve') {
        const body = await bodyJson<{ raw?: string }>(request);
        if (!body.raw) return jsonError('VALIDATION_ERROR', 'raw QR payload is required', requestId, 400);
        const payload = parseQrPayload(body.raw);
        validateQrPayload(payload, { allowedActionHosts: deps.allowedActionHosts });
        if (payload.kind === 'POWERPAY_CHECKOUT' || payload.kind === 'DONATION') {
          await assertNonceAvailable(deps.nonceStore, payload.nonce, payload.expiresAt);
          const checkout = await deps.merchants.getCheckout(payload.checkoutId);
          if (!checkout) return jsonError('CHECKOUT_NOT_FOUND', 'Checkout not found', requestId, 404);
          if (Date.parse(checkout.expiresAt) <= Date.now()) return jsonError('CHECKOUT_EXPIRED', 'Checkout expired', requestId, 410);
          return json({ payload, checkout: publicCheckout(checkout), requestId });
        }
        if (payload.kind === 'SOLANA_PAY') {
          const asset = deps.assetForSolanaMint ? deps.assetForSolanaMint(payload.splToken) : (payload.splToken ? null : 'SOL');
          if (!asset) return jsonError('TOKEN_UNSUPPORTED', 'The Solana Pay token is not enabled in PowerPay', requestId, 422);
          return json({ payload, normalized: { network: 'SOLANA', asset, recipient: payload.recipient, amount: payload.amount ?? null, reference: payload.reference ?? null, merchantName: payload.label ?? null }, requestId });
        }
        return json({ payload, requestId });
      }

      const checkoutIntentMatch = url.pathname.match(/^\/api\/v1\/checkouts\/([^/]+)\/intents$/);
      if (request.method === 'POST' && checkoutIntentMatch) {
        const checkout = await deps.merchants.getCheckout(checkoutIntentMatch[1]);
        if (!checkout) return jsonError('CHECKOUT_NOT_FOUND', 'Checkout not found', requestId, 404);
        if (Date.parse(checkout.expiresAt) <= Date.now()) return jsonError('CHECKOUT_EXPIRED', 'Checkout expired', requestId, 410);
        const body = await bodyJson<{ nonce?: string; idempotencyKey?: string; fiatCurrency?: 'USD' | 'EUR' }>(request);
        if (!checkout.multiUse && body.nonce !== checkout.nonce) return jsonError('INVALID_CHECKOUT_NONCE', 'Checkout nonce does not match', requestId, 403);
        if (!checkout.multiUse) await assertNonceAvailable(deps.nonceStore, checkout.nonce, checkout.expiresAt);
        const result = await deps.engine.createIntent({
          idempotencyKey: body.idempotencyKey || request.headers.get('x-idempotency-key') || `checkout:${checkout.id}:${checkout.nonce}:${identity?.userId || 'anonymous'}`,
          userId: accountId,
          source: 'SCAN', network: checkout.network, asset: checkout.asset, amount: checkout.amount,
          fiatCurrency: body.fiatCurrency || (checkout.asset === 'EURC' ? 'EUR' : 'USD'), recipient: checkout.merchant.recipient,
          merchantId: checkout.merchant.id, reference: checkout.reference, checkoutId: checkout.id,
          nonce: checkout.multiUse ? undefined : checkout.nonce, expiresAt: checkout.expiresAt,
        });
        return json({ ...result, checkout: publicCheckout(checkout), requestId }, result.idempotent ? 200 : 201);
      }

      if (request.method === 'POST' && url.pathname === '/api/v1/payments/intents') {
        const body = await bodyJson<{ idempotencyKey?: string; source?: PaymentSource; network?: PaymentNetwork; asset?: PaymentAsset; amount?: string; fiatCurrency?: 'USD' | 'EUR'; recipient?: string; merchantId?: string; reference?: string; checkoutId?: string; nonce?: string; expiresAt?: string }>(request);
        if (!body.source || !body.network || !body.asset || !body.amount || !body.recipient) return jsonError('VALIDATION_ERROR', 'source, network, asset, amount and recipient are required', requestId, 400);
        const result = await deps.engine.createIntent({
          idempotencyKey: body.idempotencyKey || request.headers.get('x-idempotency-key') || createIdempotencyKey('api'),
          userId: accountId,
          source: body.source, network: body.network, asset: body.asset, amount: body.amount,
          fiatCurrency: body.fiatCurrency || 'EUR', recipient: body.recipient, merchantId: body.merchantId,
          reference: body.reference, checkoutId: body.checkoutId, nonce: body.nonce, expiresAt: body.expiresAt,
        });
        return json({ ...result, requestId }, result.idempotent ? 200 : 201);
      }

      const intentMatch = url.pathname.match(/^\/api\/v1\/payments\/intents\/([^/]+)$/);
      if (request.method === 'GET' && intentMatch) { const intent = await deps.engine.getIntent(intentMatch[1]); assertIntentAccess(intent, accountId, deps.authRequired); return json({ intent, requestId }); }

      const lockMatch = url.pathname.match(/^\/api\/v1\/payments\/intents\/([^/]+)\/lock$/);
      if (request.method === 'POST' && lockMatch) {
        assertIntentAccess(await deps.engine.getIntent(lockMatch[1]), accountId, deps.authRequired);
        return json({ ...(await deps.engine.quoteAndLock(lockMatch[1], '0')), requestId });
      }

      const cancelMatch = url.pathname.match(/^\/api\/v1\/payments\/intents\/([^/]+)\/cancel$/);
      if (request.method === 'POST' && cancelMatch) {
        assertIntentAccess(await deps.engine.getIntent(cancelMatch[1]), accountId, deps.authRequired);
        return json({ intent: await deps.engine.cancelIntent(cancelMatch[1]), requestId });
      }

      const ledgerMatch = url.pathname.match(/^\/api\/v1\/payments\/intents\/([^/]+)\/ledger$/);
      if (request.method === 'GET' && ledgerMatch) {
        assertIntentAccess(await deps.engine.getIntent(ledgerMatch[1]), accountId, deps.authRequired);
        return json({ ledger: await deps.engine.ledger(ledgerMatch[1]), requestId });
      }

      const attemptMatch = url.pathname.match(/^\/api\/v1\/payments\/intents\/([^/]+)\/attempts$/);
      if (request.method === 'GET' && attemptMatch) { assertIntentAccess(await deps.engine.getIntent(attemptMatch[1]), accountId, deps.authRequired); return json({ attempts: await deps.engine.attempts(attemptMatch[1]), requestId }); }
      if (request.method === 'POST' && attemptMatch) {
        assertIntentAccess(await deps.engine.getIntent(attemptMatch[1]), accountId, deps.authRequired);
        const body = await bodyJson<{ walletAddress?: string; feeQuoteId?: string; idempotencyKey?: string }>(request);
        if (!body.walletAddress || !body.feeQuoteId) return jsonError('VALIDATION_ERROR', 'walletAddress and feeQuoteId are required', requestId, 400);
        const idempotencyKey = body.idempotencyKey || request.headers.get('x-idempotency-key') || createIdempotencyKey('attempt');
        const result = await deps.engine.createAttempt(attemptMatch[1], body.walletAddress, body.feeQuoteId, idempotencyKey);
        return json({ ...result, requestId }, result.idempotent ? 200 : 201);
      }

      const abortMatch = url.pathname.match(/^\/api\/v1\/payments\/intents\/([^/]+)\/attempts\/([^/]+)\/abort$/);
      if (request.method === 'POST' && abortMatch) { assertIntentAccess(await deps.engine.getIntent(abortMatch[1]), accountId, deps.authRequired); return json({ ...(await deps.engine.abortSigning(abortMatch[1], abortMatch[2])), requestId }); }

      const signedMatch = url.pathname.match(/^\/api\/v1\/payments\/intents\/([^/]+)\/attempts\/([^/]+)\/signed$/);
      if (request.method === 'POST' && signedMatch) { assertIntentAccess(await deps.engine.getIntent(signedMatch[1]), accountId, deps.authRequired); return json({ ...(await deps.engine.markSigned(signedMatch[1], signedMatch[2])), requestId }); }

      const submitMatch = url.pathname.match(/^\/api\/v1\/payments\/intents\/([^/]+)\/attempts\/([^/]+)\/submit$/);
      if (request.method === 'POST' && submitMatch) {
        assertIntentAccess(await deps.engine.getIntent(submitMatch[1]), accountId, deps.authRequired);
        const body = await bodyJson<{ signedTransaction?: string }>(request);
        if (!body.signedTransaction) return jsonError('VALIDATION_ERROR', 'signedTransaction is required', requestId, 400);
        return json({ ...(await deps.engine.submit(submitMatch[1], submitMatch[2], body.signedTransaction)), requestId });
      }

      const reconcileMatch = url.pathname.match(/^\/api\/v1\/payments\/intents\/([^/]+)\/attempts\/([^/]+)\/reconcile$/);
      if (request.method === 'POST' && reconcileMatch) {
        assertIntentAccess(await deps.engine.getIntent(reconcileMatch[1]), accountId, deps.authRequired);
        const body = await bodyJson<{ feeQuoteId?: string }>(request);
        const result = await deps.engine.reconcile(reconcileMatch[1], reconcileMatch[2], body.feeQuoteId);
        let walletLink: 'UNCHANGED' | 'VERIFIED_FROM_SETTLEMENT' | 'CONFLICT' = 'UNCHANGED';
        if (result.receipt?.payer && accountId && deps.accounts) {
          try {
            await deps.accounts.connectWallet({ userId: accountId, chain: result.intent.network, address: result.receipt.payer, walletType: result.intent.network === 'SOLANA' ? 'transaction-signer' : 'chain-signer' });
            walletLink = 'VERIFIED_FROM_SETTLEMENT';
          } catch { walletLink = 'CONFLICT'; }
        }
        if (result.receipt && accountId && deps.notifications) {
          await deps.notifications.create({ userId: accountId, category: 'PAYMENTS', severity: 'SUCCESS', title: 'Payment settled', body: `${result.intent.amount} ${result.intent.asset} · ${result.receipt.merchantName || result.intent.reference || result.intent.network}`, idempotencyKey: `settled:${result.receipt.receiptId}` }).catch(() => undefined);
        }
        return json({ ...result, walletLink, requestId });
      }

      const receiptMatch = url.pathname.match(/^\/api\/v1\/payments\/intents\/([^/]+)\/receipt$/);
      if (request.method === 'GET' && receiptMatch) { assertIntentAccess(await deps.engine.getIntent(receiptMatch[1]), accountId, deps.authRequired); return json({ receipt: await deps.engine.receipt(receiptMatch[1]), requestId }); }

      const actionMatch = url.pathname.match(/^\/api\/actions\/pay\/([^/]+)$/);
      if (actionMatch && deps.features.solanaActions) {
        const checkout = await deps.merchants.getCheckout(actionMatch[1]);
        if (!checkout) return actionError('Checkout not found', 404);
        if (request.method === 'GET') return actionJson(actionGetResponse({ icon: deps.iconUrl, merchant: checkout.merchant.name, amount: checkout.amount, asset: checkout.asset }));
        if (request.method === 'POST') {
          const body = await bodyJson<{ account?: string }>(request);
          if (!body.account) return actionError('Wallet account is required', 400);
          if (checkout.network !== 'SOLANA') return actionError('This Action is only available on Solana', 422);
          await assertNonceAvailable(deps.nonceStore, checkout.nonce, checkout.expiresAt);
          const created = await deps.engine.createIntent({
            idempotencyKey: `action:${checkout.id}:${body.account}:${checkout.reference}`,
            source: 'ACTION', network: checkout.network, asset: checkout.asset, amount: checkout.amount, fiatCurrency: 'USD',
            recipient: checkout.merchant.recipient, merchantId: checkout.merchant.id, reference: checkout.reference,
            checkoutId: checkout.id, nonce: checkout.multiUse ? undefined : checkout.nonce, expiresAt: checkout.expiresAt,
          });
          const locked = created.intent.status === 'CREATED' ? await deps.engine.quoteAndLock(created.intent.id, '0') : null;
          if (!locked) return actionError('Action intent is already in progress; reopen the checkout in PowerPay', 409);
          const execution = await deps.engine.createAttempt(created.intent.id, body.account, locked.feeQuote.id, `action-attempt:${created.intent.id}:${body.account}`);
          return actionJson({ type: 'transaction', transaction: execution.payload.transaction, message: `Review ${checkout.amount} ${checkout.asset} payment to ${checkout.merchant.name}.` });
        }
      }

      return jsonError('NOT_FOUND', 'Not found', requestId, 404);
    } catch (error) {
      if (error instanceof PaymentEngineError) return jsonError(error.code, error.message, requestId, error.status);
      return jsonError('INTERNAL_ERROR', error instanceof Error ? error.message : 'Internal error', requestId, 500);
    }
  };
}

function developmentIdentity(request: Request, deps: BackendHandlerDependencies): RequestIdentity | null {
  if (!deps.allowDevelopmentIdentity || deps.authRequired) return null;
  const userId = request.headers.get('x-powerpay-development-user');
  if (!userId || !/^[A-Za-z0-9._:-]{3,128}$/.test(userId)) return null;
  return { userId, claims: { sub: userId, development: true } };
}

async function authenticateRequest(request: Request, deps: BackendHandlerDependencies): Promise<RequestIdentity | null> {
  if (!deps.authenticator) return null;
  try { return await deps.authenticator.authenticate(request); }
  catch { return null; }
}

function assertIntentAccess(intent: { userId?: string }, accountId: string | undefined, required?: boolean): void {
  if (intent.userId) {
    if (!accountId || intent.userId !== accountId) throw new PaymentEngineError('NOT_FOUND', 'Payment intent not found', 404);
    return;
  }
  if (required) throw new PaymentEngineError('NOT_FOUND', 'Payment intent not found', 404);
}

function findPowerPayAttemptId(value: unknown): string | null {
  const text = JSON.stringify(value);
  const match = text.match(/powerpay-attempt:([0-9a-f-]{36})/i);
  return match?.[1] ?? null;
}

function findTransactionSignature(value: unknown): string | null {
  if (!value || typeof value !== 'object') return null;
  const record = value as Record<string, unknown>;
  for (const key of ['signature', 'transactionSignature', 'transaction_id', 'transactionId']) {
    const candidate = record[key];
    if (typeof candidate === 'string' && candidate.length >= 32) return candidate;
  }
  for (const candidate of Object.values(record)) {
    if (Array.isArray(candidate)) { for (const item of candidate) { const found = findTransactionSignature(item); if (found) return found; } }
    else if (candidate && typeof candidate === 'object') { const found = findTransactionSignature(candidate); if (found) return found; }
  }
  return null;
}

function publicCheckout(checkout: CheckoutRecord) {
  return { id: checkout.id, merchant: { id: checkout.merchant.id, name: checkout.merchant.name, trustStatus: checkout.merchant.trustStatus }, amount: checkout.amount, asset: checkout.asset, network: checkout.network, reference: checkout.reference, expiresAt: checkout.expiresAt, multiUse: checkout.multiUse };
}

async function bodyJson<T>(request: Request): Promise<T> {
  const length = Number(request.headers.get('content-length') || '0');
  if (length > 1_048_576) throw new PaymentEngineError('BODY_TOO_LARGE', 'Request body exceeds 1 MiB', 413);
  try { return await request.json() as T; } catch { throw new PaymentEngineError('INVALID_JSON', 'Request body must be valid JSON', 400); }
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body, (_, value) => typeof value === 'bigint' ? value.toString() : value), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' } });
}
function jsonError(code: string, message: string, requestId: string, status: number) { return json({ error: { code, message }, requestId }, status); }
function actionJson(body: unknown, status = 200) { return new Response(JSON.stringify(body), { status, headers: SOLANA_ACTION_HEADERS }); }
function actionError(message: string, status: number) { return actionJson({ message }, status); }
