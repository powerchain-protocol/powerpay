import type { PaymentExecutionInput, PaymentNetwork } from '@powerpay/payment-core';

export interface SimulationResult {
  ok: boolean;
  unitsConsumed?: number;
  feeAtomic?: string;
  error?: string;
  raw?: unknown;
}

export interface TransactionPayload {
  network: PaymentNetwork;
  encoding: 'base64';
  transaction: string;
  blockhash?: string;
  lastValidBlockHeight?: number;
}

export interface TransactionSubmission {
  transactionId: string;
  submittedAt: string;
}

export interface TransactionConfirmation {
  transactionId: string;
  status: 'PENDING' | 'CONFIRMED' | 'FAILED' | 'NOT_FOUND';
  slot?: string;
  error?: string;
}

export interface ChainAdapter {
  readonly network: PaymentNetwork;
  simulate(input: PaymentExecutionInput, payload: TransactionPayload): Promise<SimulationResult>;
  build(input: PaymentExecutionInput): Promise<TransactionPayload>;
  submit(payload: TransactionPayload): Promise<TransactionSubmission>;
  confirm(transactionId: string): Promise<TransactionConfirmation>;
}
