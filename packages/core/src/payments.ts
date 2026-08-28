import type { AssetSymbol, Chain } from './assets';

export type PaymentStatus =
  | 'created'
  | 'quoted'
  | 'awaiting_approval'
  | 'authorizing'
  | 'submitting'
  | 'confirming'
  | 'settling'
  | 'settled'
  | 'failed'
  | 'expired'
  | 'cancelled';

export interface PaymentIntent {
  id: string;
  idempotencyKey: string;
  merchantId?: string;
  recipient: string;
  chain: Chain;
  asset: AssetSymbol;
  amountAtomic: bigint;
  reference?: string;
  source: 'manual' | 'solana-pay' | 'powerpay-qr' | 'wallet-address';
  status: PaymentStatus;
  createdAt: string;
  expiresAt?: string;
}

export interface FeeLine {
  code: 'powerpay-service' | 'token-transfer' | 'network' | 'bridge';
  label: string;
  asset: string;
  amountAtomic?: bigint;
  estimated?: boolean;
}

export interface PaymentQuote {
  id: string;
  paymentIntentId: string;
  asset: AssetSymbol;
  amountAtomic: bigint;
  fees: FeeLine[];
  quoteHash: string;
  expiresAt: string;
  priceSource?: 'pyth' | 'fixed-stablecoin' | 'merchant';
}

const validTransitions: Record<PaymentStatus, readonly PaymentStatus[]> = {
  created: ['quoted', 'cancelled', 'expired'],
  quoted: ['awaiting_approval', 'cancelled', 'expired'],
  awaiting_approval: ['authorizing', 'cancelled', 'expired'],
  authorizing: ['submitting', 'failed', 'cancelled'],
  submitting: ['confirming', 'failed'],
  confirming: ['settling', 'failed'],
  settling: ['settled', 'failed'],
  settled: [],
  failed: [],
  expired: [],
  cancelled: [],
};

export function transitionPayment(current: PaymentStatus, next: PaymentStatus): PaymentStatus {
  if (!validTransitions[current].includes(next)) {
    throw new Error(`Invalid payment transition: ${current} -> ${next}`);
  }
  return next;
}

export function atomicAmount(amount: string, decimals: number): bigint {
  if (!/^\d+(\.\d+)?$/.test(amount)) throw new Error('Invalid decimal amount');
  const [whole, fraction = ''] = amount.split('.');
  if (fraction.length > decimals) throw new Error(`Too many decimal places: maximum ${decimals}`);
  return BigInt(whole) * 10n ** BigInt(decimals) + BigInt((fraction + '0'.repeat(decimals)).slice(0, decimals));
}
