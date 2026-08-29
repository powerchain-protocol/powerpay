'use client';

import { useEffect, useState } from 'react';
import { NetworkIcon, StatusBadge } from '@powerpay/ui';
import { NETWORK_PREFERENCES_EVENT, readNetworkPreferences, type PowerPayRpcProfile, type PowerPaySolanaCluster } from '../lib/network-preferences';
import { MarketReference } from './market-reference';

const RPC_LABELS: Record<PowerPayRpcProfile, string> = { managed: 'PowerPay RPC · Managed', custom: 'Custom deployment RPC', public: 'Solana public RPC' };

export function InfrastructureDemoCard() {
  const [network, setNetwork] = useState<{ cluster: PowerPaySolanaCluster; rpcProfile: PowerPayRpcProfile }>({ cluster: 'devnet', rpcProfile: 'managed' });
  useEffect(() => {
    setNetwork(readNetworkPreferences());
    const handler = () => setNetwork(readNetworkPreferences());
    window.addEventListener(NETWORK_PREFERENCES_EVENT, handler);
    return () => window.removeEventListener(NETWORK_PREFERENCES_EVENT, handler);
  }, []);

  return (
    <div className="infrastructure-demo-card">
      <div className="infra-card-heading"><div><span className="section-kicker">Live infrastructure context</span><h3>What PowerPay discloses before signing</h3></div><StatusBadge tone={network.cluster === 'mainnet-beta' ? 'success' : 'warning'} dot>{network.cluster === 'mainnet-beta' ? 'Mainnet Beta' : 'Devnet'}</StatusBadge></div>
      <div className="infra-fee-grid">
        <div><span>PowerPay service fee</span><strong>2.00%</strong><small>Calculated in the canonical fee quote</small></div>
        <div><span>Solana network fee</span><strong>Wallet estimated</strong><small>Charged separately by the runtime fee payer</small></div>
        <div><span>RPC route</span><strong>{RPC_LABELS[network.rpcProfile]}</strong><small>Execution remains server allowlisted</small></div>
        <div><span>Settlement network</span><strong className="with-icon"><NetworkIcon network="solana" size={18} />Solana</strong><small>{network.cluster === 'mainnet-beta' ? 'Production funds' : 'Test funds only'}</small></div>
      </div>
      <MarketReference />
      <div className="infra-safety-line"><span>✓</span><p><strong>No silent conversion.</strong> If Pyth freshness/confidence validation fails, conversion-dependent payment paths fail closed rather than estimating a critical rate.</p></div>
    </div>
  );
}
