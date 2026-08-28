import type { PaymentNetwork } from '@powerpay/payment-core';

export interface ExplorerAdapter {
  transactionUrl(id: string): string;
  addressUrl(address: string): string;
}

export function solanaExplorer(cluster: 'mainnet-beta' | 'devnet'): ExplorerAdapter {
  const suffix = cluster === 'mainnet-beta' ? '' : `?cluster=${cluster}`;
  return {
    transactionUrl: (id) => `https://explorer.solana.com/tx/${encodeURIComponent(id)}${suffix}`,
    addressUrl: (address) => `https://explorer.solana.com/address/${encodeURIComponent(address)}${suffix}`,
  };
}

export function suiExplorer(network: 'mainnet' | 'testnet' | 'devnet'): ExplorerAdapter {
  return {
    transactionUrl: (id) => `https://suiscan.xyz/${network}/tx/${encodeURIComponent(id)}`,
    addressUrl: (address) => `https://suiscan.xyz/${network}/account/${encodeURIComponent(address)}`,
  };
}

export function getExplorer(network: PaymentNetwork, environment: string): ExplorerAdapter {
  return network === 'SOLANA' ? solanaExplorer(environment === 'mainnet' || environment === 'mainnet-beta' ? 'mainnet-beta' : 'devnet') : suiExplorer(environment === 'mainnet' ? 'mainnet' : 'devnet');
}
