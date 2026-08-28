import type { PropsWithChildren } from 'react';
import { ClerkProvider } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';
import { PowerPayWalletProvider } from './WalletProvider';
import { TransactionRecoveryProvider } from './RecoveryProvider';
import { ClerkAuthProvider, DevelopmentAuthProvider } from './AuthProvider';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

function RuntimeProviders({ children }: PropsWithChildren) {
  return <PowerPayWalletProvider><TransactionRecoveryProvider>{children}</TransactionRecoveryProvider></PowerPayWalletProvider>;
}

export function AppProviders({ children }: PropsWithChildren) {
  if (!publishableKey) return <DevelopmentAuthProvider><RuntimeProviders>{children}</RuntimeProviders></DevelopmentAuthProvider>;
  return <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}><ClerkAuthProvider><RuntimeProviders>{children}</RuntimeProviders></ClerkAuthProvider></ClerkProvider>;
}
