import type { QrPayload } from '../types';

export interface QrValidationPolicy {
  now?: number;
  allowedActionHosts?: string[];
}

export function validateQrPayload(payload: QrPayload, policy: QrValidationPolicy = {}): void {
  if (payload.kind === 'UNSUPPORTED') throw new Error(payload.reason);
  const now = policy.now ?? Date.now();
  if (payload.kind === 'POWERPAY_CHECKOUT' || payload.kind === 'DONATION') {
    if (Date.parse(payload.expiresAt) <= now) throw new Error('QR code has expired');
    if (!/^[A-Za-z0-9:_-]{12,160}$/.test(payload.nonce)) throw new Error('Invalid QR nonce');
  }
  if (payload.kind === 'SOLANA_PAY' && payload.amount && (!/^\d+(\.\d+)?$/.test(payload.amount) || Number(payload.amount) <= 0)) throw new Error('Invalid Solana Pay amount');
  if (payload.kind === 'SOLANA_ACTION' && policy.allowedActionHosts?.length) {
    const host = new URL(payload.url).host;
    if (!policy.allowedActionHosts.includes(host)) throw new Error('Solana Action host is not trusted');
  }
}
