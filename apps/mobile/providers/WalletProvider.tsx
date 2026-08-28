import { createContext, useCallback, useContext, useMemo, useState, type PropsWithChildren } from 'react';
import { connectSolanaWallet, disconnectSolanaWallet, signSolanaTransaction } from '@/services/solanaWallet';

type WalletState = {
  address?: string;
  network?: 'SOLANA' | 'SUI';
  status: 'DISCONNECTED' | 'CONNECTING' | 'CONNECTED' | 'ERROR';
  error?: string;
  connectSolana(): Promise<string>;
  disconnect(): Promise<void>;
  signTransaction(unsignedBase64: string): Promise<string>;
};

const WalletContext = createContext<WalletState | null>(null);

export function PowerPayWalletProvider({ children }: PropsWithChildren) {
  const [address, setAddress] = useState<string>();
  const [status, setStatus] = useState<WalletState['status']>('DISCONNECTED');
  const [error, setError] = useState<string>();

  const connectSolana = useCallback(async () => {
    setStatus('CONNECTING'); setError(undefined);
    try { const wallet = await connectSolanaWallet(); setAddress(wallet.address); setStatus('CONNECTED'); return wallet.address; }
    catch (cause) { setStatus('ERROR'); setError(cause instanceof Error ? cause.message : 'Wallet connection failed'); throw cause; }
  }, []);

  const disconnect = useCallback(async () => { await disconnectSolanaWallet(); setAddress(undefined); setStatus('DISCONNECTED'); setError(undefined); }, []);
  const signTransaction = useCallback(async (unsignedBase64: string) => signSolanaTransaction(unsignedBase64), []);

  const value = useMemo<WalletState>(() => ({ address, network: address ? 'SOLANA' : undefined, status, error, connectSolana, disconnect, signTransaction }), [address, status, error, connectSolana, disconnect, signTransaction]);
  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function usePowerPayWallet() {
  const value = useContext(WalletContext);
  if (!value) throw new Error('usePowerPayWallet must be used inside PowerPayWalletProvider');
  return value;
}
