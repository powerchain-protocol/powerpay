export type AuthProviderName = 'clerk' | 'better-auth' | 'firebase' | 'supabase';

export interface UserIdentity {
  id: string;
  primaryEmail?: string;
  displayName?: string;
}

export interface SessionIdentity {
  id: string;
  userId: string;
  expiresAt: string;
}

export interface IdentityAdapter {
  readonly provider: AuthProviderName;
  getSession(token?: string): Promise<SessionIdentity | null>;
  requireUser(token?: string): Promise<UserIdentity>;
  revokeSession(sessionId: string): Promise<void>;
}

export interface WalletConsent {
  id: string;
  userId: string;
  chain: 'solana' | 'sui';
  walletAddress: string;
  permissions: {
    readAddress: boolean;
    readBalances: boolean;
    requestSignature: boolean;
    requestTransaction: boolean;
  };
  acceptedAt: string;
  revokedAt?: string;
}
