import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PageHeader } from '@/components/PageHeader';
import { Screen } from '@/components/Screen';
import { usePowerPayNotifications, type MobileNotification } from '@/hooks/useNotifications';
import { colors, radius } from '@/styles/theme';

const FILTERS = ['All', 'Payments', 'Security', 'Wallet'] as const;
type Filter = typeof FILTERS[number];

export default function NotificationsScreen() {
  const feed = usePowerPayNotifications();
  const [filter, setFilter] = useState<Filter>('All');
  const items = useMemo(() => feed.items.filter((item) => filter === 'All' || item.category === filter.toUpperCase()), [feed.items, filter]);
  return (
    <Screen>
      <PageHeader title="Notifications" />
      <View style={styles.toolbar}><View style={styles.filters}>{FILTERS.map((x) => <Pressable key={x} onPress={() => setFilter(x)} style={[styles.filter, filter === x && styles.active]}><Text style={[styles.filterText, filter === x && styles.activeText]}>{x}</Text></Pressable>)}</View>{feed.unread > 0 ? <Pressable style={styles.markAll} onPress={() => void feed.markAllRead()}><Text style={styles.markAllText}>Mark all read</Text></Pressable> : null}</View>
      {feed.loading ? <State title="Loading notifications…" detail="Reading your account alarm feed." /> : null}
      {!feed.loading && feed.error ? <State title="Notifications unavailable" detail={feed.error} action="Retry" onPress={() => void feed.refresh()} /> : null}
      {!feed.loading && !feed.error && items.length === 0 ? <State title="No alerts" detail={filter === 'All' ? 'Payment, wallet and security events will appear here.' : `No ${filter.toLowerCase()} notifications.`} /> : null}
      {!feed.loading && !feed.error && items.length ? <View style={styles.card}>
        {items.map((item, i) => <Pressable accessibilityRole="button" accessibilityLabel={`${item.readAt ? '' : 'Unread. '}${item.title}`} onPress={() => void feed.markRead(item.id)} key={item.id} style={[styles.notice, i !== items.length - 1 && styles.border, !item.readAt && styles.unread]}><View style={[styles.icon, { backgroundColor: `${tone(item)}12` }]}><Ionicons name={icon(item)} size={22} color={tone(item)} /></View><View style={{ flex: 1 }}><View style={styles.titleLine}><Text style={styles.title}>{item.title}</Text>{!item.readAt ? <View style={styles.dot} /> : null}</View><Text style={styles.detail}>{item.body}</Text><Text style={styles.time}>{formatTime(item.createdAt)}</Text></View></Pressable>)}
      </View> : null}
    </Screen>
  );
}

function State({ title, detail, action, onPress }: { title: string; detail: string; action?: string; onPress?: () => void }) { return <View style={styles.state}><Text style={styles.title}>{title}</Text><Text style={styles.detail}>{detail}</Text>{action && onPress ? <Pressable onPress={onPress} style={styles.retry}><Text style={styles.retryText}>{action}</Text></Pressable> : null}</View>; }
function tone(item: MobileNotification) { return item.severity === 'DANGER' ? colors.danger : item.severity === 'WARNING' ? colors.warning : item.severity === 'SUCCESS' ? colors.success : colors.info; }
function icon(item: MobileNotification): keyof typeof Ionicons.glyphMap { return item.category === 'SECURITY' ? 'shield-checkmark-outline' : item.category === 'WALLET' ? 'wallet-outline' : item.category === 'PAYMENTS' ? 'checkmark-circle-outline' : 'information-circle-outline'; }
function formatTime(value: string) { const date = new Date(value); return Number.isNaN(date.getTime()) ? value : date.toLocaleString(); }

const styles = StyleSheet.create({
  toolbar: { marginVertical: 14 }, filters: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  filter: { minHeight: 38, paddingHorizontal: 12, borderRadius: 10, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, justifyContent: 'center' }, active: { backgroundColor: colors.primary, borderColor: colors.primary }, filterText: { color: colors.text, fontSize: 12, fontWeight: '600' }, activeText: { color: colors.white },
  markAll: { minHeight: 44, alignSelf: 'flex-end', justifyContent: 'center' }, markAllText: { color: colors.primary, fontSize: 11, fontWeight: '700' },
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card, overflow: 'hidden' },
  notice: { minHeight: 88, flexDirection: 'row', gap: 12, alignItems: 'center', paddingVertical: 13, paddingHorizontal: 14 }, unread: { backgroundColor: '#FAFCFA' }, border: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border }, icon: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  titleLine: { flexDirection: 'row', alignItems: 'center', gap: 7 }, title: { color: colors.text, fontSize: 14, fontWeight: '700' }, dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.primary }, detail: { color: colors.muted, fontSize: 11, lineHeight: 16, marginTop: 3 }, time: { color: '#929A94', fontSize: 10, marginTop: 4 },
  state: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card, padding: 16 }, retry: { minHeight: 44, justifyContent: 'center', alignSelf: 'flex-start' }, retryText: { color: colors.primary, fontSize: 12, fontWeight: '700' },
});
