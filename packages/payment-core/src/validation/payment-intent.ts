import type { PaymentAsset, PaymentNetwork, PaymentSource } from '../types';

const assets = new Set<PaymentAsset>(['SOL', 'USDC', 'EURC', 'SUI', 'PWRC']);
const networks = new Set<PaymentNetwork>(['SOLANA', 'SUI']);
const sources = new Set<PaymentSource>(['SCAN', 'CHECKOUT', 'SEND', 'BUY', 'ACTION']);
const decimal = /^\d+(\.\d+)?$/;

export function validatePaymentIntentFields(input: {
  amount: string;
  asset: PaymentAsset;
  network: PaymentNetwork;
  source: PaymentSource;
  recipient: string;
  expiresAt?: string;
}): void {
  if (!decimal.test(input.amount) || Number(input.amount) <= 0) throw new Error('Payment amount must be greater than zero');
  if (!assets.has(input.asset)) throw new Error(`Unsupported asset ${input.asset}`);
  if (!networks.has(input.network)) throw new Error(`Unsupported network ${input.network}`);
  if (!sources.has(input.source)) throw new Error(`Unsupported payment source ${input.source}`);
  if (input.recipient.trim().length < 20 || input.recipient.length > 128) throw new Error('Invalid payment recipient');
  if (input.asset === 'SUI' && input.network !== 'SUI') throw new Error('SUI asset requires SUI network');
  if (input.asset === 'SOL' && input.network !== 'SOLANA') throw new Error('SOL asset requires Solana network');
  if (input.expiresAt && !Number.isFinite(Date.parse(input.expiresAt))) throw new Error('Invalid intent expiry');
}
