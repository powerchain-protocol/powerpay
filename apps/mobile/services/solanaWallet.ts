import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Buffer } from 'buffer';
import { Transaction } from '@solana/web3.js';

const AUTH_TOKEN_KEY = 'powerpay.solana.mwa.auth-token';
const APP_IDENTITY = {
  name: 'PowerPay',
  uri: process.env.EXPO_PUBLIC_POWERPAY_WEB_URL || 'https://powerchain.ventures',
  icon: '/icons/payment.png',
};

function chain() {
  return process.env.EXPO_PUBLIC_SOLANA_CLUSTER === 'mainnet-beta' ? 'solana:mainnet' : 'solana:devnet';
}

export interface ConnectedSolanaWallet {
  address: string;
  provider: 'mobile-wallet-adapter';
}

export async function connectSolanaWallet(): Promise<ConnectedSolanaWallet> {
  if (Platform.OS !== 'android') throw new Error('Mobile Wallet Adapter is available in the Android build. Configure Phantom Connect for the iOS build.');
  const existingToken = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
  const { transact } = await import('@solana-mobile/mobile-wallet-adapter-protocol-web3js');
  const result = await transact(async (wallet) => wallet.authorize({ chain: chain(), identity: APP_IDENTITY, auth_token: existingToken || undefined }));
  const account = result.accounts?.[0];
  if (!account?.address) throw new Error('Wallet authorization returned no account');
  if (result.auth_token) await SecureStore.setItemAsync(AUTH_TOKEN_KEY, result.auth_token);
  return { address: account.address, provider: 'mobile-wallet-adapter' };
}

export async function disconnectSolanaWallet(): Promise<void> {
  const authToken = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
  if (authToken && Platform.OS === 'android') {
    try { const { transact } = await import('@solana-mobile/mobile-wallet-adapter-protocol-web3js'); await transact(async (wallet) => wallet.deauthorize({ auth_token: authToken })); } catch { /* local credential cleanup still proceeds */ }
  }
  await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
}

export async function signSolanaTransaction(unsignedBase64: string): Promise<string> {
  if (Platform.OS !== 'android') throw new Error('Solana transaction signing requires the configured iOS wallet provider or Android Mobile Wallet Adapter.');
  const authToken = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
  const unsigned = Transaction.from(Buffer.from(unsignedBase64, 'base64'));
  const { transact } = await import('@solana-mobile/mobile-wallet-adapter-protocol-web3js');
  const signed = await transact(async (wallet) => {
    const auth = await wallet.authorize({ chain: chain(), identity: APP_IDENTITY, auth_token: authToken || undefined });
    if (auth.auth_token) await SecureStore.setItemAsync(AUTH_TOKEN_KEY, auth.auth_token);
    const signedTransactions = await wallet.signTransactions({ transactions: [unsigned] });
    return signedTransactions[0];
  });
  return Buffer.from(signed.serialize({ requireAllSignatures: true, verifySignatures: true })).toString('base64');
}
