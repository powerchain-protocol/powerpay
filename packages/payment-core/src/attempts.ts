import type { PaymentAttempt, PowerPayPaymentIntent } from './types';

export function createPaymentAttempt(intent: PowerPayPaymentIntent, sequence: number, walletAddress: string | undefined, idempotencyKey: string): PaymentAttempt {
  if (!['LOCKED', 'SIGNING', 'SIGNED', 'RECOVERY_REQUIRED'].includes(intent.status)) throw new Error(`Cannot create payment attempt while intent is ${intent.status}`);
  if (!/^[A-Za-z0-9:_-]{16,160}$/.test(idempotencyKey)) throw new Error('Invalid payment attempt idempotency key');
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    idempotencyKey,
    paymentIntentId: intent.id,
    sequence,
    network: intent.network,
    walletAddress,
    status: 'CREATED',
    createdAt: now,
    updatedAt: now,
  };
}
