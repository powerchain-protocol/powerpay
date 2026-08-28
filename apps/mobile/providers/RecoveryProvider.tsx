import { createContext, useCallback, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import NetInfo from '@react-native-community/netinfo';
import type { RecoveryRecord } from '@powerpay/transaction-recovery';
import { powerPayApi } from '@/services/api';
import { mobileRecoveryStore } from '@/services/recovery';

type RecoveryContextValue = {
  records: RecoveryRecord[];
  pendingCount: number;
  refreshing: boolean;
  refresh(): Promise<void>;
};

const RecoveryContext = createContext<RecoveryContextValue | null>(null);

export function TransactionRecoveryProvider({ children }: PropsWithChildren) {
  const [records, setRecords] = useState<RecoveryRecord[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const all = await mobileRecoveryStore.list();
      const network = await NetInfo.fetch();
      if (!network.isConnected) { setRecords(all); return; }
      for (const record of all) {
        if (record.phase !== 'CONFIRMING' || !record.transactionId || !record.feeQuoteId) continue;
        try {
          const result = await powerPayApi.reconcile(record.paymentIntentId, record.attemptId, record.feeQuoteId);
          if (result.receipt || ['SETTLED', 'FAILED', 'EXPIRED', 'CANCELLED'].includes(result.intent?.status)) await mobileRecoveryStore.remove(record.attemptId);
        } catch {
          // Recovery is deliberately non-destructive. The next foreground refresh can retry reconciliation.
        }
      }
      setRecords(await mobileRecoveryStore.list());
    } finally { setRefreshing(false); }
  }, []);

  useEffect(() => { void refresh(); const unsubscribe = NetInfo.addEventListener((state) => { if (state.isConnected) void refresh(); }); return unsubscribe; }, [refresh]);
  const value = useMemo(() => ({ records, pendingCount: records.length, refreshing, refresh }), [records, refreshing, refresh]);
  return <RecoveryContext.Provider value={value}>{children}</RecoveryContext.Provider>;
}

export function useTransactionRecovery() {
  const value = useContext(RecoveryContext);
  if (!value) throw new Error('useTransactionRecovery must be used inside TransactionRecoveryProvider');
  return value;
}
