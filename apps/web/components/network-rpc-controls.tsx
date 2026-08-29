'use client';

import { useEffect, useState } from 'react';
import { NetworkIcon, SelectDropdown, StatusBadge } from '@powerpay/ui';
import {
  NETWORK_PREFERENCES_EVENT,
  defaultCluster,
  defaultRpcProfile,
  readNetworkPreferences,
  writeNetworkPreferences,
  type PowerPayRpcProfile,
  type PowerPaySolanaCluster,
} from '../lib/network-preferences';

const mainnetEnabled = process.env.NEXT_PUBLIC_ENABLE_MAINNET_BETA === 'true';
const customRpcEnabled = process.env.NEXT_PUBLIC_HAS_CUSTOM_RPC === 'true';

export function NetworkRpcControls({ compact = false }: { compact?: boolean }) {
  const [cluster, setCluster] = useState<PowerPaySolanaCluster>(defaultCluster());
  const [rpcProfile, setRpcProfile] = useState<PowerPayRpcProfile>(defaultRpcProfile());

  useEffect(() => {
    const current = readNetworkPreferences();
    setCluster(current.cluster);
    setRpcProfile(current.rpcProfile);
  }, []);

  function update(nextCluster: PowerPaySolanaCluster, nextRpc: PowerPayRpcProfile) {
    if (nextCluster === 'mainnet-beta' && !mainnetEnabled) return;
    if (nextRpc === 'custom' && !customRpcEnabled) return;
    if (nextCluster === 'mainnet-beta' && nextRpc === 'public') nextRpc = 'managed';
    setCluster(nextCluster);
    setRpcProfile(nextRpc);
    writeNetworkPreferences(nextCluster, nextRpc);
  }

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ cluster: PowerPaySolanaCluster; rpcProfile: PowerPayRpcProfile }>).detail;
      if (detail) { setCluster(detail.cluster); setRpcProfile(detail.rpcProfile); }
    };
    window.addEventListener(NETWORK_PREFERENCES_EVENT, handler);
    return () => window.removeEventListener(NETWORK_PREFERENCES_EVENT, handler);
  }, []);

  return (
    <div className={`network-rpc-controls ${compact ? 'compact' : ''}`}>
      <StatusBadge tone={cluster === 'mainnet-beta' ? 'success' : 'warning'} dot title={cluster === 'mainnet-beta' ? 'Production Solana cluster' : 'Solana test cluster'}>
        {cluster === 'mainnet-beta' ? 'Mainnet Beta' : 'Devnet'}
      </StatusBadge>
      <SelectDropdown
        compact
        aria-label="Solana network"
        value={cluster}
        leading={<NetworkIcon network="solana" size={17} />}
        onChange={(event) => update(event.target.value as PowerPaySolanaCluster, rpcProfile)}
        options={[
          { value: 'devnet', label: 'Solana · Devnet' },
          { value: 'mainnet-beta', label: mainnetEnabled ? 'Solana · Mainnet Beta' : 'Mainnet Beta · gated', disabled: !mainnetEnabled },
        ]}
      />
      <SelectDropdown
        compact
        aria-label="Solana RPC profile"
        value={rpcProfile}
        onChange={(event) => update(cluster, event.target.value as PowerPayRpcProfile)}
        options={[
          { value: 'managed', label: 'PowerPay RPC · Managed' },
          { value: 'custom', label: customRpcEnabled ? 'Custom RPC' : 'Custom RPC · not configured', disabled: !customRpcEnabled },
          { value: 'public', label: 'Solana Public RPC', disabled: cluster === 'mainnet-beta' },
        ]}
      />
    </div>
  );
}
