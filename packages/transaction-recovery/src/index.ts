import type { PaymentNetwork } from '@powerpay/payment-core';
import type { TransactionConfirmation } from '@powerpay/chain-adapters';

export interface RecoveryRecord {
  paymentIntentId: string;
  attemptId: string;
  attemptIdempotencyKey?: string;
  network: PaymentNetwork;
  transactionId?: string;
  signedTransaction?: string;
  phase: 'SIGNING' | 'SUBMITTING' | 'CONFIRMING';
  feeQuoteId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RecoveryStore {
  put(record: RecoveryRecord): Promise<void>;
  remove(attemptId: string): Promise<void>;
  list(): Promise<RecoveryRecord[]>;
}

export interface RecoveryConfirmer {
  confirm(network: PaymentNetwork, transactionId: string): Promise<TransactionConfirmation>;
}

export async function resumeRecoveries(store: RecoveryStore, confirmer: RecoveryConfirmer): Promise<Array<{ record: RecoveryRecord; result: TransactionConfirmation | { status: 'NOT_SUBMITTED' } }>> {
  const records = await store.list();
  return Promise.all(records.map(async (record) => {
    if (!record.transactionId) return { record, result: { status: 'NOT_SUBMITTED' as const } };
    const result = await confirmer.confirm(record.network, record.transactionId);
    if (result.status === 'CONFIRMED' || result.status === 'FAILED') await store.remove(record.attemptId);
    return { record, result };
  }));
}
