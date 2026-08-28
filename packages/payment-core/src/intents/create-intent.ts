import type { PowerPayPaymentIntent } from '../types';
import { assertIdempotencyKey } from '../idempotency/idempotency-key';
import { validatePaymentIntentFields } from '../validation/payment-intent';

export type CreatePaymentIntentInput = Omit<PowerPayPaymentIntent, 'id' | 'status' | 'createdAt' | 'lockedAt' | 'lockHash'> & { id?: string; createdAt?: string };

export function createPaymentIntent(input: CreatePaymentIntentInput): PowerPayPaymentIntent {
  assertIdempotencyKey(input.idempotencyKey);
  validatePaymentIntentFields(input);
  return {
    ...input,
    id: input.id ?? crypto.randomUUID(),
    createdAt: input.createdAt ?? new Date().toISOString(),
    status: 'CREATED',
  };
}
