import type { PaymentAsset, PowerPayPaymentIntent } from '@powerpay/payment-core';

export type MerchantTrustStatus = 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'RESTRICTED' | 'SUSPENDED';
export type SecurityLevel = 'STANDARD' | 'HIGH_VALUE' | 'SENSITIVE_ACTION';

export interface PaymentPolicyDecision {
  allowed: boolean;
  securityLevel: SecurityLevel;
  warning?: string;
  reason?: string;
}

export function evaluatePaymentPolicy(input: {
  intent: PowerPayPaymentIntent;
  merchantTrust?: MerchantTrustStatus;
  highValueThreshold?: Partial<Record<PaymentAsset, number>>;
}): PaymentPolicyDecision {
  const trust = input.merchantTrust ?? 'UNVERIFIED';
  if (trust === 'SUSPENDED') return { allowed: false, securityLevel: 'SENSITIVE_ACTION', reason: 'Merchant payments are suspended' };
  const numericAmount = Number(input.intent.amount);
  if (!Number.isFinite(numericAmount) || numericAmount <= 0) return { allowed: false, securityLevel: 'SENSITIVE_ACTION', reason: 'Invalid payment amount' };
  const threshold = input.highValueThreshold?.[input.intent.asset] ?? (input.intent.asset === 'USDC' || input.intent.asset === 'EURC' ? 500 : Number.POSITIVE_INFINITY);
  if (trust === 'RESTRICTED' && numericAmount > Math.min(threshold, 250)) return { allowed: false, securityLevel: 'HIGH_VALUE', reason: 'Merchant amount exceeds restricted limit' };
  if (numericAmount >= threshold) return { allowed: true, securityLevel: 'HIGH_VALUE', warning: 'Additional confirmation required' };
  if (trust === 'UNVERIFIED' || trust === 'PENDING') return { allowed: true, securityLevel: 'STANDARD', warning: 'Merchant is not fully verified' };
  return { allowed: true, securityLevel: 'STANDARD' };
}
