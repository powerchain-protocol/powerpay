export type CheckoutAsset = 'USDC' | 'EURC' | 'SOL' | 'PWRC';
export type PaymentStatus = 'CREATED' | 'LOCKED' | 'SIGNING' | 'SIGNED' | 'SUBMITTED' | 'CONFIRMING' | 'CONFIRMED' | 'SETTLING' | 'SETTLED' | 'FAILED' | 'CANCELLED' | 'EXPIRED' | 'RECOVERY_REQUIRED';

export interface PaymentIntent {
  id: string;
  status: PaymentStatus;
  network: 'SOLANA' | 'SUI';
  asset: CheckoutAsset;
  amount: string;
  recipient: string;
  reference?: string;
  merchantId?: string;
  expiresAt?: string;
}

export interface FeeQuote {
  id: string;
  paymentIntentId: string;
  subtotal: string;
  serviceFee: string;
  protocolFee: string;
  networkFee: string;
  total: string;
  expiresAt: string;
  quoteHash?: string;
  signature?: string;
}

export interface PaymentAttempt {
  id: string;
  paymentIntentId: string;
  walletAddress?: string;
  status: string;
  transactionId?: string;
}

declare global {
  interface Window {
    Clerk?: { session?: { getToken(options?: { template?: string }): Promise<string | null> } };
  }
}

const configuredApiBase = process.env.NEXT_PUBLIC_POWERPAY_API_URL?.replace(/\/$/, '') || '/api/powerpay';

export function apiUrl(path: string) { return `${configuredApiBase}${path}`; }

async function browserAuthHeader(): Promise<Record<string, string>> {
  if (typeof window === 'undefined' || !window.Clerk?.session) return {};
  try {
    const token = await window.Clerk.session.getToken();
    return token ? { authorization: `Bearer ${token}` } : {};
  } catch { return {}; }
}

export async function powerPayFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const auth = await browserAuthHeader();
  const callerHeaders = (init?.headers || {}) as Record<string, string>;
  const response = await fetch(apiUrl(path), {
    ...init,
    headers: { 'content-type': 'application/json', ...auth, ...callerHeaders },
    cache: 'no-store',
  });
  const payload = await response.json().catch(() => ({})) as T & { error?: { code?: string; message?: string } };
  if (!response.ok) throw new Error(payload.error?.message || `PowerPay API returned ${response.status}`);
  return payload;
}
