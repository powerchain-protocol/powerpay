import { useCallback, useEffect, useState } from 'react';
import { powerPayApi } from '@/services/api';

type ActivityEntry = {
  intent: {
    id: string;
    source: string;
    network: string;
    asset: string;
    amount: string;
    recipient: string;
    merchantId?: string;
    reference?: string;
    status: string;
    createdAt: string;
  };
  receipt?: {
    receiptId: string;
    merchantName?: string;
    transactionId: string;
    settlementStatus: string;
    timestamp: string;
  };
};

export function usePaymentActivity(limit = 50) {
  const [items, setItems] = useState<ActivityEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await powerPayApi.activity(limit);
      setItems(Array.isArray(result.activity) ? result.activity : []);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Activity is unavailable');
    } finally {
      setLoading(false);
    }
  }, [limit]);
  useEffect(() => { void refresh(); }, [refresh]);
  return { items, loading, error, refresh };
}
