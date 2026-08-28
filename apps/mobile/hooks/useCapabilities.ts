import { useCallback, useEffect, useState } from 'react';
import { powerPayApi } from '@/services/api';

export type PowerPayFeatureFlags = {
  escrow: boolean;
  suiPayments: boolean;
  bridge: boolean;
  vault: boolean;
  swaps: boolean;
  solanaActions: boolean;
  token2022: boolean;
};

const SAFE_DEFAULTS: PowerPayFeatureFlags = { escrow: false, suiPayments: false, bridge: false, vault: false, swaps: false, solanaActions: false, token2022: false };

export function usePowerPayCapabilities() {
  const [features, setFeatures] = useState<PowerPayFeatureFlags>(SAFE_DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const refresh = useCallback(async () => {
    setLoading(true); setError(undefined);
    try {
      const result = await powerPayApi.capabilities();
      setFeatures({ ...SAFE_DEFAULTS, ...(result?.features || {}) });
    } catch (cause) {
      setFeatures(SAFE_DEFAULTS);
      setError(cause instanceof Error ? cause.message : 'Capabilities unavailable');
    } finally { setLoading(false); }
  }, []);
  useEffect(() => { void refresh(); }, [refresh]);
  return { features, loading, error, refresh };
}
