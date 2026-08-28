export type PaymentEvent =
  | { type: 'LOCKED' }
  | { type: 'SIGNING_STARTED' }
  | { type: 'WALLET_SIGNED' }
  | { type: 'SIGNING_ABORTED' }
  | { type: 'TRANSACTION_SUBMITTED'; transactionId: string }
  | { type: 'CONFIRMATION_STARTED' }
  | { type: 'TRANSACTION_CONFIRMED' }
  | { type: 'SETTLEMENT_STARTED' }
  | { type: 'SETTLEMENT_COMPLETED' }
  | { type: 'RECOVERY_REQUIRED' }
  | { type: 'FAILED' }
  | { type: 'EXPIRED' }
  | { type: 'CANCELLED' };
