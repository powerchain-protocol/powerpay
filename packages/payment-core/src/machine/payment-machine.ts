import type { PaymentStatus } from '../types';
import type { PaymentEvent } from './payment-events';

const transitions: Record<PaymentStatus, Partial<Record<PaymentEvent['type'], PaymentStatus>>> = {
  CREATED: { LOCKED: 'LOCKED', EXPIRED: 'EXPIRED', CANCELLED: 'CANCELLED', FAILED: 'FAILED' },
  LOCKED: { SIGNING_STARTED: 'SIGNING', EXPIRED: 'EXPIRED', CANCELLED: 'CANCELLED', FAILED: 'FAILED' },
  SIGNING: { WALLET_SIGNED: 'SIGNED', SIGNING_ABORTED: 'LOCKED', CANCELLED: 'CANCELLED', FAILED: 'FAILED', RECOVERY_REQUIRED: 'RECOVERY_REQUIRED' },
  SIGNED: { TRANSACTION_SUBMITTED: 'SUBMITTED', FAILED: 'FAILED', RECOVERY_REQUIRED: 'RECOVERY_REQUIRED' },
  SUBMITTED: { CONFIRMATION_STARTED: 'CONFIRMING', TRANSACTION_CONFIRMED: 'CONFIRMED', RECOVERY_REQUIRED: 'RECOVERY_REQUIRED', FAILED: 'FAILED' },
  CONFIRMING: { TRANSACTION_CONFIRMED: 'CONFIRMED', RECOVERY_REQUIRED: 'RECOVERY_REQUIRED', FAILED: 'FAILED' },
  CONFIRMED: { SETTLEMENT_STARTED: 'SETTLING', FAILED: 'FAILED' },
  SETTLING: { SETTLEMENT_COMPLETED: 'SETTLED', FAILED: 'FAILED' },
  RECOVERY_REQUIRED: { TRANSACTION_SUBMITTED: 'SUBMITTED', CONFIRMATION_STARTED: 'CONFIRMING', TRANSACTION_CONFIRMED: 'CONFIRMED', FAILED: 'FAILED' },
  SETTLED: {}, FAILED: {}, EXPIRED: {}, CANCELLED: {},
};

export function reducePaymentStatus(status: PaymentStatus, event: PaymentEvent): PaymentStatus {
  const next = transitions[status][event.type];
  if (!next) throw new Error(`Invalid payment event ${event.type} while ${status}`);
  return next;
}

export function canApplyPaymentEvent(status: PaymentStatus, event: PaymentEvent['type']): boolean {
  return Boolean(transitions[status][event]);
}
