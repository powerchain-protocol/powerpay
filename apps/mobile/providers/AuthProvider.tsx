import { createContext, useContext, useEffect, useMemo, type PropsWithChildren } from 'react';
import { useAuth, useClerk, useUser } from '@clerk/expo';
import { configurePowerPayApiAuth } from '@/services/api';

type AuthState = {
  configured: boolean;
  isLoaded: boolean;
  isSignedIn: boolean;
  userId?: string;
  displayName?: string;
  email?: string;
  initials: string;
  signOut(): Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function DevelopmentAuthProvider({ children }: PropsWithChildren) {
  useEffect(() => configurePowerPayApiAuth(undefined), []);
  const value = useMemo<AuthState>(() => ({
    configured: false,
    isLoaded: true,
    isSignedIn: true,
    userId: 'development-user',
    displayName: 'PowerPay Developer',
    email: 'development@local',
    initials: 'PP',
    async signOut() {},
  }), []);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function ClerkAuthProvider({ children }: PropsWithChildren) {
  const auth = useAuth();
  const { user } = useUser();
  const clerk = useClerk();

  useEffect(() => {
    configurePowerPayApiAuth(auth.isSignedIn ? async () => (await auth.getToken()) ?? undefined : undefined);
    return () => configurePowerPayApiAuth(undefined);
  }, [auth.isSignedIn, auth.getToken]);

  const displayName = user?.fullName || user?.firstName || user?.username || undefined;
  const email = user?.primaryEmailAddress?.emailAddress;
  const initials = initialsFor(displayName || email || 'PowerPay');
  const value = useMemo<AuthState>(() => ({
    configured: true,
    isLoaded: auth.isLoaded,
    isSignedIn: Boolean(auth.isSignedIn),
    userId: auth.userId || undefined,
    displayName,
    email,
    initials,
    signOut: () => clerk.signOut(),
  }), [auth.isLoaded, auth.isSignedIn, auth.userId, displayName, email, initials, clerk]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function usePowerPayAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('usePowerPayAuth must be used inside a PowerPay auth provider');
  return value;
}

function initialsFor(value: string): string {
  const parts = value.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return 'PP';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}
