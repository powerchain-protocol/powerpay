import type { PowerPayPaymentIntent } from '../types';
import { canonicalLockedIntent } from './locked-fields';

export async function lockPaymentIntent(intent: PowerPayPaymentIntent): Promise<PowerPayPaymentIntent> {
  if (intent.status !== 'CREATED') throw new Error(`Only CREATED intents can be locked; received ${intent.status}`);
  if (intent.expiresAt && Date.parse(intent.expiresAt) <= Date.now()) throw new Error('Payment intent is expired');
  const canonical = canonicalLockedIntent(intent);
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(canonical));
  const lockHash = [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
  return { ...intent, status: 'LOCKED', lockedAt: new Date().toISOString(), lockHash };
}

export function assertLockedFieldsUnchanged(before: PowerPayPaymentIntent, after: PowerPayPaymentIntent): void {
  if (!before.lockedAt) return;
  if (canonicalLockedIntent(before) !== canonicalLockedIntent(after)) {
    throw new Error('Immutable payment fields changed after LOCKED');
  }
}
