import { useCallback, useEffect, useState } from 'react';
import { powerPayApi } from '@/services/api';

export type MobileNotification = {
  id: string;
  category: 'PAYMENTS' | 'SECURITY' | 'WALLET' | 'SYSTEM';
  severity: 'INFO' | 'SUCCESS' | 'WARNING' | 'DANGER';
  title: string;
  body: string;
  readAt?: string;
  createdAt: string;
};

export function usePowerPayNotifications(limit = 50) {
  const [items, setItems] = useState<MobileNotification[]>([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const refresh = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const result = await powerPayApi.notifications(limit);
      setItems(Array.isArray(result.notifications) ? result.notifications : []);
      setUnread(Number(result.unread || 0));
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Notifications are unavailable'); }
    finally { setLoading(false); }
  }, [limit]);
  const markRead = useCallback(async (id: string) => {
    const current = items.find((item) => item.id === id);
    if (!current || current.readAt) return;
    const now = new Date().toISOString();
    setItems((value) => value.map((item) => item.id === id ? { ...item, readAt: now } : item));
    setUnread((value) => Math.max(0, value - 1));
    try { await powerPayApi.markNotificationRead(id); } catch { await refresh(); }
  }, [items, refresh]);
  const markAllRead = useCallback(async () => {
    if (!unread) return;
    const now = new Date().toISOString();
    setItems((value) => value.map((item) => item.readAt ? item : { ...item, readAt: now })); setUnread(0);
    try { await powerPayApi.markAllNotificationsRead(); } catch { await refresh(); }
  }, [unread, refresh]);
  useEffect(() => { void refresh(); }, [refresh]);
  return { items, unread, loading, error, refresh, markRead, markAllRead };
}
