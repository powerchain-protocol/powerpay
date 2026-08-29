'use client';

import { useEffect, useState } from 'react';
import { StatusBadge } from '@powerpay/ui';
import { errorMessage } from '../lib/errors';
import { getPowerPayPrice, preferredPrice, type WebPriceQuote } from '../lib/pricing/pyth';
import { formatNumber } from '../utils/util';

export function MarketReference({ compact = false }: { compact?: boolean }) {
  const [quote, setQuote] = useState<WebPriceQuote | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const result = await getPowerPayPrice('SOL', 'USD');
        if (!cancelled) { setQuote(preferredPrice(result) ?? null); setError(''); }
      } catch (cause) {
        if (!cancelled) { setQuote(null); setError(errorMessage(cause, 'Price unavailable')); }
      }
    };
    void load();
    const timer = window.setInterval(() => void load(), 30_000);
    return () => { cancelled = true; window.clearInterval(timer); };
  }, []);

  if (compact) {
    return <div className="market-reference compact"><span>SOL / USD</span><strong>{quote ? `$${formatNumber(quote.price, 2)}` : '—'}</strong><StatusBadge tone={quote?.source === 'pyth' ? 'success' : quote ? 'info' : 'warning'}>{quote ? (quote.source === 'pyth' ? 'Pyth' : 'Reference') : 'Unavailable'}</StatusBadge></div>;
  }

  return (
    <div className="market-reference">
      <div><span className="metric-label">SOL market reference</span><strong>{quote ? `$${formatNumber(quote.price, 2)}` : 'Unavailable'}</strong></div>
      <div className="market-reference-meta">
        <StatusBadge tone={quote?.source === 'pyth' ? 'success' : quote ? 'info' : 'warning'} dot>{quote ? (quote.source === 'pyth' ? 'Pyth transactional feed' : 'CoinGecko reference') : 'Price unavailable'}</StatusBadge>
        <small>{quote ? `Observed ${new Date(quote.observedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : error || 'Conversion-dependent payments remain disabled.'}</small>
      </div>
    </div>
  );
}
