'use client';

import { useCallback, useEffect, useState } from 'react';
import { StatusBadge } from '@powerpay/ui';
import { powerPayFetch } from '@/lib/powerpay-api';

type LoadState = { system?: any; solana?: any; sui?: any; error?: string; loading: boolean; refreshedAt?: string };

export function SystemStatusDashboard() {
  const [state, setState] = useState<LoadState>({ loading: true });
  const refresh = useCallback(async () => {
    setState((current) => ({ ...current, loading: true, error: undefined }));
    const results = await Promise.allSettled([
      powerPayFetch<any>('/api/v1/system/overview'),
      powerPayFetch<any>('/api/v1/solana/overview'),
      powerPayFetch<any>('/api/v1/sui/overview'),
    ]);
    const system = results[0].status === 'fulfilled' ? results[0].value.system : undefined;
    const solana = results[1].status === 'fulfilled' ? results[1].value.overview : undefined;
    const sui = results[2].status === 'fulfilled' ? results[2].value.overview : undefined;
    const errors = results.filter((result) => result.status === 'rejected').map((result) => result.status === 'rejected' ? result.reason?.message : '').filter(Boolean);
    setState({ system, solana, sui, error: errors.length ? errors.join(' · ') : undefined, loading: false, refreshedAt: new Date().toISOString() });
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  return (
    <main className="status-page">
      <section className="status-hero">
        <div><span className="section-kicker">Infrastructure</span><h1>PowerPay system status</h1><p>Live configuration and chain-provider health without exposing RPC URLs, API keys, or wallet secrets.</p></div>
        <button className="secondary-button" onClick={() => void refresh()} disabled={state.loading}>{state.loading ? 'Checking…' : 'Refresh status'}</button>
      </section>
      {state.error ? <div className="status-alert"><strong>Partial availability</strong><span>{state.error}</span></div> : null}
      <div className="status-stack">
        <StatusSection title="Runtime" rows={[
          ['API', state.system?.apiVersion || 'Unavailable', Boolean(state.system?.apiVersion)],
          ['Environment', state.system?.environment || 'Unavailable', Boolean(state.system?.environment)],
          ['Persistence', state.system?.providers?.supabase ? 'Supabase configured' : 'Development / unavailable', Boolean(state.system?.providers?.supabase)],
          ['Authentication', state.system?.providers?.clerk ? 'Clerk configured' : 'Development / unavailable', Boolean(state.system?.providers?.clerk)],
        ]} />
        <StatusSection title="Solana" rows={[
          ['RPC', state.solana?.rpc?.healthy ? 'Healthy' : 'Unavailable', Boolean(state.solana?.rpc?.healthy)],
          ['Cluster', state.solana?.cluster || state.system?.networks?.solana?.cluster || 'Unavailable', Boolean(state.solana?.cluster || state.system?.networks?.solana?.cluster)],
          ['Provider', state.system?.networks?.solana?.provider || 'Unavailable', state.system?.networks?.solana?.provider && state.system?.networks?.solana?.provider !== 'UNKNOWN'],
          ['Programs active', state.solana?.programs ? String(state.solana.programs.active ?? 0) : 'Unavailable', Boolean(state.solana?.programs)],
        ]} />
        <StatusSection title="Sui" rows={[
          ['RPC', state.sui?.rpc?.healthy ? 'Healthy' : 'Unavailable', Boolean(state.sui?.rpc?.healthy)],
          ['Network', state.sui?.suiNetwork || state.system?.networks?.sui?.network || 'Unavailable', Boolean(state.sui?.suiNetwork || state.system?.networks?.sui?.network)],
          ['Packages active', state.sui?.packages ? String(state.sui.packages.active ?? 0) : 'Unavailable', Boolean(state.sui?.packages)],
          ['Cetus', state.system?.providers?.cetus ? 'Configured' : 'Unavailable', Boolean(state.system?.providers?.cetus)],
        ]} />
        <StatusSection title="Market providers" rows={[
          ['Helius', state.system?.providers?.helius ? 'Configured' : 'Unavailable', Boolean(state.system?.providers?.helius)],
          ['Jupiter', state.system?.providers?.jupiter ? 'Configured' : 'Unavailable', Boolean(state.system?.providers?.jupiter)],
          ['Pyth', state.system?.providers?.pyth ? 'Configured' : 'Unavailable', Boolean(state.system?.providers?.pyth)],
          ['CoinMarketCap', state.system?.providers?.coinMarketCap ? 'Configured' : 'Unavailable', Boolean(state.system?.providers?.coinMarketCap)],
        ]} />
      </div>
      <p className="status-footnote">{state.refreshedAt ? `Observed ${new Date(state.refreshedAt).toLocaleString()}. ` : ''}“Unavailable” means the provider is not configured or could not be reached; PowerPay does not synthesize a healthy state.</p>
    </main>
  );
}

function StatusSection({ title, rows }: { title: string; rows: Array<[string, string, boolean]> }) {
  return <section className="status-surface"><div className="status-surface-title"><h2>{title}</h2></div><div className="status-rows">{rows.map(([label, value, ok]) => <div className="status-row" key={label}><span>{label}</span><div><strong>{value}</strong><StatusBadge tone={ok ? 'success' : 'neutral'} dot>{ok ? 'Available' : 'Not ready'}</StatusBadge></div></div>)}</div></section>;
}
