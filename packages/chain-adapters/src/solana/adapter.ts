import type { ChainAdapter, SimulationResult, TransactionConfirmation, TransactionPayload, TransactionSubmission } from '../types';
import type { PaymentExecutionInput } from '@powerpay/payment-core';
import { SolanaJsonRpcClient } from './rpc';

export interface SolanaTransactionBuilder {
  buildPayment(input: PaymentExecutionInput): Promise<TransactionPayload>;
}

export class SolanaChainAdapter implements ChainAdapter {
  readonly network = 'SOLANA' as const;
  private readonly rpc: SolanaJsonRpcClient;

  constructor(rpcUrl: string, private readonly builder: SolanaTransactionBuilder) {
    this.rpc = new SolanaJsonRpcClient({ url: rpcUrl });
  }

  build(input: PaymentExecutionInput): Promise<TransactionPayload> {
    return this.builder.buildPayment(input);
  }

  async simulate(_input: PaymentExecutionInput, payload: TransactionPayload): Promise<SimulationResult> {
    try {
      const result = await this.rpc.call<{ value: { err: unknown; unitsConsumed?: number; logs?: string[] } }>('simulateTransaction', [payload.transaction, { encoding: 'base64', sigVerify: false, replaceRecentBlockhash: true }]);
      return { ok: result.value.err == null, unitsConsumed: result.value.unitsConsumed, error: result.value.err ? JSON.stringify(result.value.err) : undefined, raw: result.value };
    } catch (error) {
      return { ok: false, error: error instanceof Error ? error.message : 'Simulation failed' };
    }
  }

  async submit(payload: TransactionPayload): Promise<TransactionSubmission> {
    const transactionId = await this.rpc.call<string>('sendTransaction', [payload.transaction, { encoding: 'base64', skipPreflight: false, preflightCommitment: 'confirmed', maxRetries: 3 }]);
    return { transactionId, submittedAt: new Date().toISOString() };
  }

  async confirm(transactionId: string): Promise<TransactionConfirmation> {
    const result = await this.rpc.call<{ value: Array<null | { slot: number; err: unknown; confirmationStatus?: string }> }>('getSignatureStatuses', [[transactionId], { searchTransactionHistory: true }]);
    const status = result.value[0];
    if (!status) return { transactionId, status: 'NOT_FOUND' };
    if (status.err) return { transactionId, status: 'FAILED', slot: String(status.slot), error: JSON.stringify(status.err) };
    if (status.confirmationStatus === 'confirmed' || status.confirmationStatus === 'finalized') return { transactionId, status: 'CONFIRMED', slot: String(status.slot) };
    return { transactionId, status: 'PENDING', slot: String(status.slot) };
  }
}
