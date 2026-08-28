export type PaymentSource = 'SCAN' | 'CHECKOUT' | 'SEND' | 'BUY' | 'ACTION';
export type PaymentNetwork = 'SOLANA' | 'SUI';
export type PaymentAsset = 'SOL' | 'USDC' | 'EURC' | 'SUI' | 'PWRC';
export type FiatCurrency = 'USD' | 'EUR';

export type PaymentStatus =
  | 'CREATED'
  | 'LOCKED'
  | 'SIGNING'
  | 'SIGNED'
  | 'SUBMITTED'
  | 'CONFIRMING'
  | 'CONFIRMED'
  | 'SETTLING'
  | 'SETTLED'
  | 'RECOVERY_REQUIRED'
  | 'FAILED'
  | 'EXPIRED'
  | 'CANCELLED';

export type PaymentAttemptStatus =
  | 'CREATED'
  | 'SIGNING'
  | 'SIGNED'
  | 'SUBMITTING'
  | 'SUBMITTED'
  | 'CONFIRMING'
  | 'CONFIRMED'
  | 'FAILED'
  | 'EXPIRED'
  | 'CANCELLED';

export interface PowerPayPaymentIntent {
  id: string;
  idempotencyKey: string;
  userId?: string;
  source: PaymentSource;
  network: PaymentNetwork;
  asset: PaymentAsset;
  amount: string;
  fiatCurrency: FiatCurrency;
  recipient: string;
  merchantId?: string;
  reference?: string;
  checkoutId?: string;
  nonce?: string;
  expiresAt?: string;
  status: PaymentStatus;
  createdAt: string;
  lockedAt?: string;
  lockHash?: string;
}

export interface PaymentAttempt {
  id: string;
  idempotencyKey: string;
  paymentIntentId: string;
  sequence: number;
  network: PaymentNetwork;
  walletAddress?: string;
  feeQuoteId?: string;
  status: PaymentAttemptStatus;
  transactionId?: string;
  signedTransaction?: string;
  signedTransactionHash?: string;
  errorCode?: string;
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentExecutionInput {
  intent: PowerPayPaymentIntent;
  attempt: PaymentAttempt;
  walletAddress: string;
  feeQuoteId?: string;
  fees?: { serviceFee: string; protocolFee: string; networkFee: string };
  feeTreasury?: string;
}
