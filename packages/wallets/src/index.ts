export type WalletChain = 'solana' | 'sui';

export interface WalletConnection {
  chain: WalletChain;
  address: string;
  walletName: string;
  connectedAt: string;
}

export interface WalletConnector {
  readonly chain: WalletChain;
  readonly name: string;
  connect(): Promise<WalletConnection>;
  disconnect(): Promise<void>;
  signMessage(message: Uint8Array): Promise<Uint8Array>;
  signTransaction(serializedTransaction: Uint8Array): Promise<Uint8Array>;
}

export interface WalletConsentPolicy {
  readAddress: true;
  readBalances: boolean;
  requestSignature: boolean;
  requestTransaction: boolean;
}
