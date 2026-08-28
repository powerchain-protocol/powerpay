export type ScanPayload =
  | { kind: 'solana-pay'; raw: string; recipient: string; amount?: string; splToken?: string; label?: string; message?: string; reference?: string }
  | { kind: 'powerpay'; raw: string; checkoutId: string }
  | { kind: 'wallet-address'; raw: string; address: string }
  | { kind: 'unsupported'; raw: string };

const BASE58 = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

export function parseScanPayload(raw: string): ScanPayload {
  const value = raw.trim();
  if (value.startsWith('powerpay://checkout/')) {
    return { kind: 'powerpay', raw: value, checkoutId: value.slice('powerpay://checkout/'.length).split(/[?#]/)[0] };
  }

  if (value.startsWith('solana:')) {
    const withoutScheme = value.slice('solana:'.length);
    const [recipient, query = ''] = withoutScheme.split('?');
    if (!BASE58.test(recipient)) return { kind: 'unsupported', raw: value };
    const params = new URLSearchParams(query);
    return {
      kind: 'solana-pay',
      raw: value,
      recipient,
      amount: params.get('amount') ?? undefined,
      splToken: params.get('spl-token') ?? undefined,
      label: params.get('label') ?? undefined,
      message: params.get('message') ?? undefined,
      reference: params.get('reference') ?? undefined,
    };
  }

  if (BASE58.test(value)) return { kind: 'wallet-address', raw: value, address: value };
  return { kind: 'unsupported', raw: value };
}
