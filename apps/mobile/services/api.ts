import { PowerPayApiClient, PowerPayApiError } from '@powerpay/api-client';
import { createIdempotencyKey, type PaymentAsset, type PaymentNetwork, type PaymentSource } from '@powerpay/payment-core';
import type { RpcProfile, SolanaCluster, SuiNetwork } from '@powerpay/api-contract';

let authTokenProvider: undefined | (() => Promise<string | undefined>);

export function configurePowerPayApiAuth(provider: typeof authTokenProvider) { authTokenProvider = provider; }
export { PowerPayApiError };

const baseUrl = (process.env.EXPO_PUBLIC_POWERPAY_API_URL || 'http://localhost:8787').replace(/\/$/, '');
const developmentUser = process.env.EXPO_PUBLIC_POWERPAY_DEVELOPMENT_USER || undefined;
const cluster = normalizeCluster(process.env.EXPO_PUBLIC_SOLANA_CLUSTER);
const suiNetwork = normalizeSuiNetwork(process.env.EXPO_PUBLIC_SUI_NETWORK);

const client = new PowerPayApiClient({
  baseUrl,
  timeoutMs: 15_000,
  getContext: () => ({ cluster, rpcProfile: 'managed', suiNetwork, suiRpcProfile: 'managed' }),
  getHeaders: async () => {
    const token = authTokenProvider ? await authTokenProvider() : undefined;
    if (token) return { authorization: `Bearer ${token}` };
    return developmentUser ? { 'x-powerpay-development-user': developmentUser } : {};
  },
});

export const powerPayApi = {
  resolveQr(raw: string) { return client.resolveQr(raw); },
  createCheckoutIntent(checkoutId: string, nonce?: string, idempotencyKey?: string) {
    const key = idempotencyKey || (nonce ? `checkout:${checkoutId}:${nonce}` : createIdempotencyKey('checkout'));
    return client.createCheckoutIntent(checkoutId, { nonce, idempotencyKey: key });
  },
  createIntent(input: { idempotencyKey: string; source: PaymentSource; network: PaymentNetwork; asset: PaymentAsset; amount: string; fiatCurrency?: 'USD' | 'EUR'; recipient: string; merchantId?: string; reference?: string; checkoutId?: string; nonce?: string; expiresAt?: string }) {
    return client.createIntent(input);
  },
  getIntent(id: string) { return client.getIntent(id); },
  lockIntent(id: string) { return client.lockIntent(id); },
  cancelIntent(id: string) { return client.cancelIntent(id); },
  ledger(id: string) { return client.ledger(id); },
  listAttempts(id: string) { return client.listAttempts(id); },
  createAttempt(id: string, walletAddress: string, feeQuoteId: string, idempotencyKey: string) { return client.createAttempt(id, { walletAddress, feeQuoteId, idempotencyKey }); },
  abortAttempt(id: string, attemptId: string) { return client.abortAttempt(id, attemptId); },
  markSigned(id: string, attemptId: string) { return client.markSigned(id, attemptId); },
  submit(id: string, attemptId: string, signedTransaction: string) { return client.submit(id, attemptId, signedTransaction); },
  reconcile(id: string, attemptId: string, feeQuoteId?: string) { return client.reconcile(id, attemptId, feeQuoteId); },
  receipt(id: string) { return client.receipt(id); },
  account() { return client.account(); },
  wallets() { return client.wallets(); },
  solanaPortfolio(address: string) { return client.solanaPortfolio(address); },
  activity(limit = 50) { return client.activity(limit); },
  notifications(limit = 50) { return client.notifications(limit); },
  markNotificationRead(id: string) { return client.markNotificationRead(id); },
  markAllNotificationsRead() { return client.markAllNotificationsRead(); },
  capabilities() { return client.capabilities(); },
  prices(base: string, quote: 'USD' | 'EUR' = 'USD') { return client.prices(base, quote); },
  systemOverview() { return client.systemOverview(); },
  rpcHealth() { return client.rpcHealth(); },
  solanaOverview() { return client.solanaOverview(); },
  solanaPrograms() { return client.solanaPrograms(); },
  solanaMarket(mint: string) { return client.solanaMarket(mint); },
  solanaAsset(mint: string) { return client.solanaAsset(mint); },
  suiOverview() { return client.suiOverview(); },
  suiPackages() { return client.suiPackages(); },
  suiMarket(coinType: string) { return client.suiMarket(coinType); },
  suiAsset(coinType: string) { return client.suiAsset(coinType); },
};

function normalizeCluster(value: string | undefined): SolanaCluster {
  return value === 'mainnet-beta' ? 'mainnet-beta' : 'devnet';
}
function normalizeSuiNetwork(value: string | undefined): SuiNetwork {
  return value === 'mainnet' || value === 'testnet' ? value : 'devnet';
}

export type MobileRpcProfile = RpcProfile;
