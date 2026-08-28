export function createPowerPayCheckoutUrl(input: { checkoutId: string; reference?: string; nonce: string; expiresAt: string }): string {
  const query = new URLSearchParams({ nonce: input.nonce, expiresAt: input.expiresAt });
  if (input.reference) query.set('reference', input.reference);
  return `powerpay://checkout/${encodeURIComponent(input.checkoutId)}?${query.toString()}`;
}

export function createSolanaPayUrl(input: { recipient: string; amount?: string; splToken?: string; reference?: string; label?: string; message?: string; memo?: string }): string {
  const query = new URLSearchParams();
  if (input.amount) query.set('amount', input.amount);
  if (input.splToken) query.set('spl-token', input.splToken);
  if (input.reference) query.set('reference', input.reference);
  if (input.label) query.set('label', input.label);
  if (input.message) query.set('message', input.message);
  if (input.memo) query.set('memo', input.memo);
  return `solana:${input.recipient}${query.size ? `?${query.toString()}` : ''}`;
}
