export type PowerPaySolanaCluster = 'devnet' | 'mainnet-beta';
export type PowerPayRpcProfile = 'managed' | 'custom' | 'public';

export const NETWORK_STORAGE_KEY = 'powerpay:web:solana-cluster';
export const RPC_STORAGE_KEY = 'powerpay:web:rpc-profile';
export const NETWORK_PREFERENCES_EVENT = 'powerpay:network-preferences';

export function defaultCluster(): PowerPaySolanaCluster {
  return process.env.NEXT_PUBLIC_POWERPAY_SOLANA_CLUSTER === 'mainnet-beta' ? 'mainnet-beta' : 'devnet';
}

export function defaultRpcProfile(): PowerPayRpcProfile {
  const configured = process.env.NEXT_PUBLIC_POWERPAY_RPC_PROFILE;
  return configured === 'custom' || configured === 'public' ? configured : 'managed';
}

export function readNetworkPreferences(): { cluster: PowerPaySolanaCluster; rpcProfile: PowerPayRpcProfile } {
  if (typeof window === 'undefined') return { cluster: defaultCluster(), rpcProfile: defaultRpcProfile() };
  const cluster = window.localStorage.getItem(NETWORK_STORAGE_KEY);
  const rpc = window.localStorage.getItem(RPC_STORAGE_KEY);
  return {
    cluster: cluster === 'mainnet-beta' ? 'mainnet-beta' : cluster === 'devnet' ? 'devnet' : defaultCluster(),
    rpcProfile: rpc === 'custom' || rpc === 'public' || rpc === 'managed' ? rpc : defaultRpcProfile(),
  };
}

export function writeNetworkPreferences(cluster: PowerPaySolanaCluster, rpcProfile: PowerPayRpcProfile): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(NETWORK_STORAGE_KEY, cluster);
  window.localStorage.setItem(RPC_STORAGE_KEY, rpcProfile);
  window.dispatchEvent(new CustomEvent(NETWORK_PREFERENCES_EVENT, { detail: { cluster, rpcProfile } }));
}
