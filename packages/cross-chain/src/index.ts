export type CrossChainStatus =
  | 'quoted'
  | 'awaiting_approval'
  | 'submitted'
  | 'source_confirming'
  | 'source_confirmed'
  | 'attesting'
  | 'destination_pending'
  | 'completed'
  | 'failed';

export interface CrossChainIntent {
  id: string;
  provider: 'cctp';
  sourceChain: 'solana' | 'sui';
  destinationChain: 'solana' | 'sui';
  asset: 'USDC';
  amountAtomic: bigint;
  recipient: string;
  status: CrossChainStatus;
  sourceTransaction?: string;
  attestationId?: string;
  destinationTransaction?: string;
}

const transitions: Record<CrossChainStatus, CrossChainStatus[]> = {
  quoted: ['awaiting_approval', 'failed'],
  awaiting_approval: ['submitted', 'failed'],
  submitted: ['source_confirming', 'failed'],
  source_confirming: ['source_confirmed', 'failed'],
  source_confirmed: ['attesting', 'failed'],
  attesting: ['destination_pending', 'failed'],
  destination_pending: ['completed', 'failed'],
  completed: [],
  failed: [],
};

export function transitionCrossChain(current: CrossChainStatus, next: CrossChainStatus): CrossChainStatus {
  if (!transitions[current].includes(next)) throw new Error(`Invalid CCTP transition: ${current} -> ${next}`);
  return next;
}
