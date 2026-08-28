import type { PowerPayPaymentIntent } from '../types';

export function canonicalLockedIntent(intent: Pick<PowerPayPaymentIntent, 'recipient' | 'asset' | 'amount' | 'network' | 'reference' | 'merchantId' | 'checkoutId' | 'userId'>): string {
  return JSON.stringify({
    recipient: intent.recipient,
    asset: intent.asset,
    amount: intent.amount,
    network: intent.network,
    reference: intent.reference ?? null,
    merchantId: intent.merchantId ?? null,
    checkoutId: intent.checkoutId ?? null,
    userId: intent.userId ?? null,
  });
}
