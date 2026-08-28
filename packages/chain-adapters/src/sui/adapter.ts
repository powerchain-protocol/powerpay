import type { ChainAdapter, SimulationResult, TransactionConfirmation, TransactionPayload, TransactionSubmission } from '../types';
import type { PaymentExecutionInput } from '@powerpay/payment-core';

export interface SuiTransactionBuilder {
  buildPayment(input: PaymentExecutionInput): Promise<TransactionPayload>;
}

export interface SuiTransport {
  dryRun(transaction: string): Promise<SimulationResult>;
  execute(transaction: string): Promise<TransactionSubmission>;
  getTransaction(transactionId: string): Promise<TransactionConfirmation>;
}

export class SuiChainAdapter implements ChainAdapter {
  readonly network = 'SUI' as const;
  constructor(private readonly builder: SuiTransactionBuilder, private readonly transport: SuiTransport) {}
  build(input: PaymentExecutionInput): Promise<TransactionPayload> { return this.builder.buildPayment(input); }
  simulate(_input: PaymentExecutionInput, payload: TransactionPayload): Promise<SimulationResult> { return this.transport.dryRun(payload.transaction); }
  submit(payload: TransactionPayload): Promise<TransactionSubmission> { return this.transport.execute(payload.transaction); }
  confirm(transactionId: string): Promise<TransactionConfirmation> { return this.transport.getTransaction(transactionId); }
}
