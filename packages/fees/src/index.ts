import type { PaymentAsset, PaymentNetwork } from '@powerpay/payment-core';

export interface FeeQuote {
  id: string;
  paymentIntentId: string;
  asset: PaymentAsset;
  network: PaymentNetwork;
  subtotal: string;
  serviceFee: string;
  protocolFee: string;
  networkFee: string;
  total: string;
  expiresAt: string;
  quoteHash?: string;
  signature?: string;
}

export interface FeePolicy {
  serviceFeeBps: number;
  pwrcProtocolFeeBps: number;
  quoteTtlSeconds: number;
}

export const DEFAULT_FEE_POLICY: FeePolicy = {
  serviceFeeBps: 200,
  pwrcProtocolFeeBps: 200,
  quoteTtlSeconds: 30,
};

function decimalToMicros(value: string): bigint {
  if (!/^\d+(\.\d+)?$/.test(value)) throw new Error('Invalid decimal fee amount');
  const [whole, fraction = ''] = value.split('.');
  return BigInt(whole) * 1_000_000n + BigInt((fraction + '000000').slice(0, 6));
}

function microsToDecimal(value: bigint): string {
  const whole = value / 1_000_000n;
  const fraction = (value % 1_000_000n).toString().padStart(6, '0').replace(/0+$/, '');
  return fraction ? `${whole}.${fraction}` : whole.toString();
}

function bps(amount: bigint, points: number): bigint {
  return (amount * BigInt(points) + 9_999n) / 10_000n;
}

export function calculateFeeQuote(input: {
  paymentIntentId: string;
  asset: PaymentAsset;
  network: PaymentNetwork;
  subtotal: string;
  estimatedNetworkFee?: string;
  policy?: FeePolicy;
  now?: Date;
}): FeeQuote {
  const policy = input.policy ?? DEFAULT_FEE_POLICY;
  const subtotal = decimalToMicros(input.subtotal);
  const serviceFee = bps(subtotal, policy.serviceFeeBps);
  const protocolFee = input.asset === 'PWRC' ? bps(subtotal, policy.pwrcProtocolFeeBps) : 0n;
  const networkFee = decimalToMicros(input.estimatedNetworkFee ?? '0');
  const now = input.now ?? new Date();
  return {
    id: crypto.randomUUID(),
    paymentIntentId: input.paymentIntentId,
    asset: input.asset,
    network: input.network,
    subtotal: microsToDecimal(subtotal),
    serviceFee: microsToDecimal(serviceFee),
    protocolFee: microsToDecimal(protocolFee),
    networkFee: microsToDecimal(networkFee),
    total: microsToDecimal(subtotal + serviceFee + protocolFee + networkFee),
    expiresAt: new Date(now.getTime() + policy.quoteTtlSeconds * 1000).toISOString(),
  };
}

export function isFeeQuoteExpired(quote: FeeQuote, now = Date.now()): boolean {
  return Date.parse(quote.expiresAt) <= now;
}

export async function hashFeeQuote(quote: FeeQuote): Promise<string> {
  const canonical = JSON.stringify({ id: quote.id, paymentIntentId: quote.paymentIntentId, asset: quote.asset, network: quote.network, subtotal: quote.subtotal, serviceFee: quote.serviceFee, protocolFee: quote.protocolFee, networkFee: quote.networkFee, total: quote.total, expiresAt: quote.expiresAt });
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(canonical));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
