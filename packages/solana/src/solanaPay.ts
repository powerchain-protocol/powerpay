export interface SolanaPayTransferRequest {
  recipient: string;
  amount?: string;
  splToken?: string;
  reference?: string[];
  label?: string;
  message?: string;
  memo?: string;
}

export function encodeSolanaPayUrl(request: SolanaPayTransferRequest): string {
  const params = new URLSearchParams();
  if (request.amount) params.set('amount', request.amount);
  if (request.splToken) params.set('spl-token', request.splToken);
  for (const ref of request.reference ?? []) params.append('reference', ref);
  if (request.label) params.set('label', request.label);
  if (request.message) params.set('message', request.message);
  if (request.memo) params.set('memo', request.memo);
  const query = params.toString();
  return `solana:${request.recipient}${query ? `?${query}` : ''}`;
}

export function parseSolanaPayUrl(raw: string): SolanaPayTransferRequest {
  if (!raw.startsWith('solana:')) throw new Error('Not a Solana Pay URL');
  const [recipient, query = ''] = raw.slice(7).split('?');
  if (!recipient) throw new Error('Missing recipient');
  const params = new URLSearchParams(query);
  return {
    recipient,
    amount: params.get('amount') ?? undefined,
    splToken: params.get('spl-token') ?? undefined,
    reference: params.getAll('reference'),
    label: params.get('label') ?? undefined,
    message: params.get('message') ?? undefined,
    memo: params.get('memo') ?? undefined,
  };
}
