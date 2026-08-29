import { useCallback, useEffect, useState } from 'react';
import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PageHeader } from '@/components/PageHeader';
import { colors, radius } from '@/styles/theme';
import { powerPayApi } from '@/services/api';

type State = { loading: boolean; system?: any; solana?: any; sui?: any; error?: string };

export default function SystemStatusScreen() {
  const [state, setState] = useState<State>({ loading: true });
  const refresh = useCallback(async () => {
    setState((current) => ({ ...current, loading: true, error: undefined }));
    const [system, solana, sui] = await Promise.allSettled([powerPayApi.systemOverview(), powerPayApi.solanaOverview(), powerPayApi.suiOverview()]);
    const errors = [system, solana, sui].filter((result) => result.status === 'rejected').map((result) => result.status === 'rejected' ? result.reason?.message : '').filter(Boolean);
    setState({
      loading: false,
      system: system.status === 'fulfilled' ? system.value.system : undefined,
      solana: solana.status === 'fulfilled' ? solana.value.overview : undefined,
      sui: sui.status === 'fulfilled' ? sui.value.overview : undefined,
      error: errors.length ? errors.join(' · ') : undefined,
    });
  }, []);
  useEffect(() => { void refresh(); }, [refresh]);

  return (
    <View style={styles.root}>
      <PageHeader title="System status" />
      <ScrollView contentContainerStyle={styles.content} refreshControl={<RefreshControl refreshing={state.loading} onRefresh={() => void refresh()} />}>
        <View style={styles.hero}><View style={styles.heroIcon}><Ionicons name="pulse" size={24} color={colors.primary} /></View><View style={{ flex: 1 }}><Text style={styles.heroTitle}>PowerPay infrastructure</Text><Text style={styles.heroCopy}>Chain and provider state is read live. Unavailable providers are never shown as healthy.</Text></View></View>
        {state.error ? <View style={styles.warning}><Ionicons name="warning-outline" size={18} color="#8A611A" /><Text style={styles.warningText}>{state.error}</Text></View> : null}
        <Section title="Runtime" rows={[
          ['API', state.system?.apiVersion || 'Unavailable', Boolean(state.system?.apiVersion)],
          ['Environment', state.system?.environment || 'Unavailable', Boolean(state.system?.environment)],
          ['Persistence', state.system?.providers?.supabase ? 'Supabase' : 'Not configured', Boolean(state.system?.providers?.supabase)],
        ]} />
        <Section title="Solana" rows={[
          ['RPC', state.solana?.rpc?.healthy ? 'Healthy' : 'Unavailable', Boolean(state.solana?.rpc?.healthy)],
          ['Cluster', state.solana?.cluster || state.system?.networks?.solana?.cluster || 'Unavailable', Boolean(state.solana?.cluster || state.system?.networks?.solana?.cluster)],
          ['Provider', state.system?.networks?.solana?.provider || 'Unavailable', Boolean(state.system?.networks?.solana?.configured)],
        ]} />
        <Section title="Sui" rows={[
          ['RPC', state.sui?.rpc?.healthy ? 'Healthy' : 'Unavailable', Boolean(state.sui?.rpc?.healthy)],
          ['Network', state.sui?.suiNetwork || state.system?.networks?.sui?.network || 'Unavailable', Boolean(state.sui?.suiNetwork || state.system?.networks?.sui?.network)],
          ['Cetus', state.system?.providers?.cetus ? 'Configured' : 'Not configured', Boolean(state.system?.providers?.cetus)],
        ]} />
        <Pressable style={styles.refresh} onPress={() => void refresh()} disabled={state.loading}><Ionicons name="refresh" size={17} color={colors.primary} /><Text style={styles.refreshText}>{state.loading ? 'Checking…' : 'Refresh'}</Text></Pressable>
      </ScrollView>
    </View>
  );
}

function Section({ title, rows }: { title: string; rows: Array<[string, string, boolean]> }) {
  return <View style={styles.section}><Text style={styles.sectionTitle}>{title}</Text>{rows.map(([label, value, ok], index) => <View style={[styles.row, index > 0 && styles.rowBorder]} key={label}><Text style={styles.label}>{label}</Text><View style={styles.valueWrap}><View style={[styles.dot, ok && styles.dotGood]} /><Text style={styles.value}>{value}</Text></View></View>)}</View>;
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.canvas },
  content: { padding: 18, paddingBottom: 40, gap: 14 },
  hero: { flexDirection: 'row', gap: 12, alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border, padding: 16 },
  heroIcon: { width: 46, height: 46, borderRadius: 14, backgroundColor: '#EAF4EE', alignItems: 'center', justifyContent: 'center' },
  heroTitle: { color: colors.text, fontSize: 17, fontWeight: '800' },
  heroCopy: { color: colors.muted, fontSize: 11, lineHeight: 17, marginTop: 4 },
  warning: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, borderRadius: 13, backgroundColor: '#FFF8EB', padding: 13 },
  warningText: { flex: 1, color: '#76551B', fontSize: 11, lineHeight: 16 },
  section: { backgroundColor: colors.surface, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 15 },
  sectionTitle: { color: colors.text, fontSize: 14, fontWeight: '800', paddingTop: 15, paddingBottom: 8 },
  row: { minHeight: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  rowBorder: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border },
  label: { color: colors.muted, fontSize: 12, fontWeight: '600' },
  valueWrap: { flexDirection: 'row', alignItems: 'center', gap: 7, maxWidth: '62%' },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#AAB0AC' },
  dotGood: { backgroundColor: colors.success },
  value: { color: colors.text, fontSize: 12, fontWeight: '700', textAlign: 'right' },
  refresh: { minHeight: 48, borderRadius: 13, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 7 },
  refreshText: { color: colors.primary, fontWeight: '800', fontSize: 13 },
});
