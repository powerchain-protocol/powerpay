import type { TransactionConfirmation } from '@powerpay/chain-adapters';
import type { FeeQuote } from '@powerpay/fees';
import type { PaymentAttempt, PowerPayPaymentIntent } from '@powerpay/payment-core';

export interface SettlementResult {
  settlementId: string;
  status: 'SETTLED';
  transactionId: string;
  settledAt: string;
}

export interface SettlementService {
  settle(input: { intent: PowerPayPaymentIntent; attempt: PaymentAttempt; confirmation: TransactionConfirmation; fees: FeeQuote }): Promise<SettlementResult>;
}

export class NonCustodialSettlementService implements SettlementService {
  async settle(input: { intent: PowerPayPaymentIntent; attempt: PaymentAttempt; confirmation: TransactionConfirmation; fees: FeeQuote }): Promise<SettlementResult> {
    if (input.confirmation.status !== 'CONFIRMED') throw new Error('Cannot settle an unconfirmed transaction');
    if (!input.attempt.transactionId || input.attempt.transactionId !== input.confirmation.transactionId) throw new Error('Settlement transaction does not match payment attempt');
    return {
      settlementId: crypto.randomUUID(),
      status: 'SETTLED',
      transactionId: input.confirmation.transactionId,
      settledAt: new Date().toISOString(),
    };
  }
}
