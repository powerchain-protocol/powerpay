import type { QrPayload } from '../types';

const solanaAddress = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
const suiAddress = /^0x[a-fA-F0-9]{64}$/;

export function parseQrPayload(rawInput: string): QrPayload {
  const raw = rawInput.trim();
  if (!raw) return { kind: 'UNSUPPORTED', raw, reason: 'Empty QR payload' };

  if (raw.startsWith('solana-action:')) {
    const encoded = raw.slice('solana-action:'.length);
    const url = decodeURIComponent(encoded);
    if (!url.startsWith('https://')) return { kind: 'UNSUPPORTED', raw, reason: 'Solana Action URL must use HTTPS' };
    return { kind: 'SOLANA_ACTION', raw, url };
  }

  if (raw.startsWith('solana:')) {
    const content = raw.slice('solana:'.length);
    const [recipientEncoded, query = ''] = content.split('?');
    const recipient = decodeURIComponent(recipientEncoded);
    if (recipient.startsWith('https://')) return { kind: 'PAYMENT_LINK', raw, url: recipient + (query ? `?${query}` : '') };
    if (!solanaAddress.test(recipient)) return { kind: 'UNSUPPORTED', raw, reason: 'Invalid Solana recipient' };
    const params = new URLSearchParams(query);
    return {
      kind: 'SOLANA_PAY', raw, recipient,
      amount: params.get('amount') ?? undefined,
      splToken: params.get('spl-token') ?? undefined,
      reference: params.get('reference') ?? undefined,
      label: params.get('label') ?? undefined,
      message: params.get('message') ?? undefined,
      memo: params.get('memo') ?? undefined,
    };
  }

  if (raw.startsWith('powerpay://checkout/')) {
    const url = new URL(raw);
    const checkoutId = url.pathname.replace(/^\/\//, '').replace(/^checkout\//, '') || url.host === 'checkout' ? url.pathname.replace(/^\//, '') : '';
    const resolvedId = url.host === 'checkout' ? url.pathname.replace(/^\//, '') : checkoutId;
    const nonce = url.searchParams.get('nonce');
    const expiresAt = url.searchParams.get('expiresAt');
    if (!resolvedId || !nonce || !expiresAt) return { kind: 'UNSUPPORTED', raw, reason: 'PowerPay QR missing checkoutId, nonce or expiresAt' };
    return { kind: 'POWERPAY_CHECKOUT', raw, checkoutId: resolvedId, reference: url.searchParams.get('reference') ?? undefined, nonce, expiresAt };
  }

  if (raw.startsWith('powerpay://donate/')) {
    const url = new URL(raw);
    const checkoutId = url.pathname.replace(/^\//, '');
    const nonce = url.searchParams.get('nonce');
    const expiresAt = url.searchParams.get('expiresAt');
    if (!checkoutId || !nonce || !expiresAt) return { kind: 'UNSUPPORTED', raw, reason: 'Donation QR missing replay-protection fields' };
    return { kind: 'DONATION', raw, checkoutId, nonce, expiresAt };
  }

  if (solanaAddress.test(raw)) return { kind: 'WALLET_ADDRESS', raw, address: raw, network: 'SOLANA' };
  if (suiAddress.test(raw)) return { kind: 'WALLET_ADDRESS', raw, address: raw, network: 'SUI' };
  if (raw.startsWith('https://')) return { kind: 'PAYMENT_LINK', raw, url: raw };
  return { kind: 'UNSUPPORTED', raw, reason: 'Unsupported payment QR' };
}
