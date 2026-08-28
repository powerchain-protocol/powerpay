import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { AppHeader } from '@/components/AppHeader';
import { Screen } from '@/components/Screen';
import { colors, radius } from '@/styles/theme';
import { usePaymentActivity } from '@/hooks/useActivity';

export default function ActivityScreen() {
  const activity = usePaymentActivity();
  return (
    <Screen>
      <AppHeader />
      <Text style={styles.title}>Activity</Text>
      <Text style={styles.subtitle}>Canonical PowerPay intents, chain confirmations and immutable receipts.</Text>
      <View style={styles.filters}>
        {['All', 'Payments', 'Received', 'Swap', 'Bridge'].map((filter, i) => <View key={filter} style={[styles.filter, i === 0 && styles.filterActive]}><Text style={[styles.filterText, i === 0 && styles.filterTextActive]}>{filter}</Text></View>)}
      </View>

      {activity.loading ? <StateCard title="Loading activity…" detail="Reading your authoritative payment history." /> : null}
      {!activity.loading && activity.error ? <StateCard title="Activity unavailable" detail={activity.error} action="Retry" onPress={() => void activity.refresh()} /> : null}
      {!activity.loading && !activity.error && activity.items.length === 0 ? <StateCard title="No payments yet" detail="Completed and pending PowerPay payments will appear here." /> : null}
      {!activity.loading && !activity.error && activity.items.length > 0 ? (
        <View style={styles.card}>
          {activity.items.map((entry, index) => {
            const settled = entry.intent.status === 'SETTLED';
            const title = entry.receipt?.merchantName || entry.intent.reference || shortRecipient(entry.intent.recipient);
            return (
              <Pressable key={entry.intent.id} onPress={() => settled ? router.push({ pathname: '/receipt/[id]', params: { id: entry.intent.id } }) : router.push({ pathname: '/checkout/[id]', params: { id: entry.intent.id } })}>
                <View style={styles.row}>
                  <View style={styles.icon}><Text style={styles.iconText}>{settled ? '✓' : '→'}</Text></View>
                  <View style={{ flex: 1 }}><Text style={styles.rowTitle}>{title}</Text><Text style={styles.rowDetail}>{entry.intent.source} · {formatDate(entry.receipt?.timestamp || entry.intent.createdAt)}</Text></View>
                  <View style={{ alignItems: 'flex-end' }}><Text style={styles.rowValue}>-{entry.intent.amount} {entry.intent.asset}</Text><Text style={[styles.status, !settled && styles.pending]}>{friendlyStatus(entry.intent.status)}</Text></View>
                </View>
                {index < activity.items.length - 1 ? <View style={styles.divider} /> : null}
              </Pressable>
            );
          })}
        </View>
      ) : null}
    </Screen>
  );
}

function StateCard({ title, detail, action, onPress }: { title: string; detail: string; action?: string; onPress?: () => void }) {
  return <View style={styles.state}><Text style={styles.stateTitle}>{title}</Text><Text style={styles.stateDetail}>{detail}</Text>{action && onPress ? <Pressable onPress={onPress} style={styles.stateAction}><Text style={styles.stateActionText}>{action}</Text></Pressable> : null}</View>;
}
function shortRecipient(value: string) { return value.length > 14 ? `${value.slice(0, 6)}…${value.slice(-5)}` : value; }
function friendlyStatus(value: string) { return value.toLowerCase().replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase()); }
function formatDate(value: string) { const date = new Date(value); return Number.isNaN(date.getTime()) ? value : date.toLocaleString(); }

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 30, fontWeight: '700', letterSpacing: -0.8 },
  subtitle: { color: colors.muted, fontSize: 13, lineHeight: 19, marginTop: 6 },
  filters: { flexDirection: 'row', gap: 7, marginVertical: 18, flexWrap: 'wrap' },
  filter: { minHeight: 38, borderRadius: 10, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center' },
  filterActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterText: { color: colors.text, fontSize: 12, fontWeight: '600' },
  filterTextActive: { color: colors.white },
  card: { backgroundColor: colors.surface, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 14, marginBottom: 28 },
  row: { minHeight: 76, flexDirection: 'row', alignItems: 'center', gap: 11 },
  icon: { width: 38, height: 38, borderRadius: 12, backgroundColor: '#F0F6F2', alignItems: 'center', justifyContent: 'center' },
  iconText: { color: colors.primary, fontSize: 18, fontWeight: '700' },
  rowTitle: { color: colors.text, fontSize: 14, fontWeight: '700' },
  rowDetail: { color: colors.muted, fontSize: 11, marginTop: 3 },
  rowValue: { color: colors.text, fontSize: 13, fontWeight: '700' },
  status: { color: colors.success, fontSize: 10, fontWeight: '700', marginTop: 3 },
  pending: { color: colors.warning },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border },
  state: { backgroundColor: colors.surface, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border, padding: 18, marginBottom: 18 },
  stateTitle: { color: colors.text, fontSize: 15, fontWeight: '700' },
  stateDetail: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 5 },
  stateAction: { minHeight: 44, justifyContent: 'center', alignSelf: 'flex-start' },
  stateActionText: { color: colors.primary, fontSize: 12, fontWeight: '700' },
});
