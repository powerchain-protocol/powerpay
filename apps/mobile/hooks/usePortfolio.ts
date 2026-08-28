import { useCallback, useEffect, useMemo, useState } from 'react';
import { powerPayApi } from '@/services/api';

type PortfolioAsset = { asset: string; amount: string; decimals: number; mint?: string; tokenProgram: 'NATIVE' | 'SPL' | 'TOKEN_2022' };
type MarketQuote = { price: string; source: string; observedAt: string; transactional?: boolean };

export function useSolanaPortfolio(address?: string) {
  const [assets, setAssets] = useState<PortfolioAsset[]>([]);
  const [solPrice, setSolPrice] = useState<MarketQuote>();
  const [loading, setLoading] = useState(Boolean(address));
  const [error, setError] = useState<string>();
  const refresh = useCallback(async () => {
    if (!address) { setAssets([]); setSolPrice(undefined); setLoading(false); setError(undefined); return; }
    setLoading(true); setError(undefined);
    try {
      const [portfolio, price] = await Promise.all([
        powerPayApi.solanaPortfolio(address),
        powerPayApi.prices('SOL', 'USD').catch(() => null),
      ]);
      setAssets(Array.isArray(portfolio?.portfolio?.assets) ? portfolio.portfolio.assets : []);
      setSolPrice(price?.transactional || price?.reference || undefined);
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Portfolio unavailable'); }
    finally { setLoading(false); }
  }, [address]);
  useEffect(() => { void refresh(); }, [refresh]);
  const byAsset = useMemo(() => Object.fromEntries(assets.map((item) => [item.asset, item])) as Record<string, PortfolioAsset>, [assets]);
  return { assets, byAsset, solPrice, loading, error, refresh };
}

export function formatAssetAmount(value?: string, maxFraction = 6) {
  if (!value) return '0'; const numeric = Number(value); if (!Number.isFinite(numeric)) return value;
  return numeric.toLocaleString(undefined, { maximumFractionDigits: maxFraction });
}
