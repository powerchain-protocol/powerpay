import type { PowerPayPaymentIntent } from '../types';

/**
 * Only pre-execution intents expire automatically. Once wallet authorization has started,
 * PowerPay must reconcile or explicitly cancel the attempt instead of guessing that no
 * signed/submitted transaction exists.
 */
export function expirePaymentIntent(intent: PowerPayPaymentIntent, now = Date.now()): PowerPayPaymentIntent {
  if (!intent.expiresAt || Date.parse(intent.expiresAt) > now) return intent;
  if (!['CREATED', 'LOCKED'].includes(intent.status)) return intent;
  return { ...intent, status: 'EXPIRED' };
}
