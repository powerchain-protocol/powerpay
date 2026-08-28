import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { PageHeader } from '@/components/PageHeader';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Screen } from '@/components/Screen';
import { clearCustomRpc, loadCustomRpc, saveCustomRpc, validateCustomRpc } from '@/services/customRpc';
import { colors, radius } from '@/styles/theme';

export default function SolanaNetworkScreen() {
  const [rpcUrl, setRpcUrl] = useState(''); const [wsUrl, setWsUrl] = useState('');
  const [status, setStatus] = useState<{ kind: 'idle' | 'loading' | 'ok' | 'error'; message?: string }>({ kind: 'idle' });
  useEffect(() => { void loadCustomRpc().then((value) => { if (value) { setRpcUrl(value.httpUrl); setWsUrl(value.wsUrl || ''); setStatus({ kind: 'ok', message: `Saved ${value.cluster} read RPC` }); } }); }, []);

  async function testRpc() {
    setStatus({ kind: 'loading' });
    try {
      const result = await validateCustomRpc(rpcUrl, wsUrl || undefined);
      await saveCustomRpc({ httpUrl: rpcUrl.trim(), wsUrl: wsUrl.trim() || undefined, cluster: result.cluster });
      setStatus({ kind: 'ok', message: `${result.cluster} verified · ${result.latencyMs} ms · ${result.health}` });
    } catch (error) { setStatus({ kind: 'error', message: error instanceof Error ? error.message : String(error) }); }
  }
  async function reset() { await clearCustomRpc(); setRpcUrl(''); setWsUrl(''); setStatus({ kind: 'idle' }); }

  return <Screen>
    <PageHeader title="Solana RPC" />
    <View style={styles.defaultCard}><View style={styles.dot} /><View style={{ flex: 1 }}><Text style={styles.defaultTitle}>PowerPay settlement RPC</Text><Text style={styles.defaultSub}>Helius/custom server provider · canonical payments</Text></View><Text style={styles.operational}>Managed</Text></View>
    <Text style={styles.section}>Custom read RPC</Text>
    <Text style={styles.help}>Optional device-local endpoint for network diagnostics and future non-authoritative reads. Canonical payment build, submit, reconciliation, program IDs and merchant policy remain on the server-managed PowerPay RPC.</Text>
    <Text style={styles.label}>RPC URL</Text><TextInput value={rpcUrl} onChangeText={setRpcUrl} autoCapitalize="none" autoCorrect={false} placeholder="https://rpc.example.com" placeholderTextColor="#929A94" style={styles.input} />
    <Text style={styles.label}>WebSocket URL</Text><TextInput value={wsUrl} onChangeText={setWsUrl} autoCapitalize="none" autoCorrect={false} placeholder="wss://rpc.example.com" placeholderTextColor="#929A94" style={styles.input} />
    <View style={{ marginTop: 18 }}><PrimaryButton label={status.kind === 'loading' ? 'Testing…' : 'Test & save'} loading={status.kind === 'loading'} disabled={!rpcUrl} onPress={testRpc} /></View>
    {status.kind === 'ok' ? <View style={styles.ok}><Text style={styles.okText}>✓ {status.message}</Text></View> : null}
    {status.kind === 'error' ? <View style={styles.error}><Text style={styles.errorText}>{status.message}</Text></View> : null}
    {rpcUrl ? <Pressable style={styles.reset} onPress={() => void reset()}><Text style={styles.resetText}>Use PowerPay defaults</Text></Pressable> : null}
  </Screen>;
}

const styles = StyleSheet.create({
  defaultCard: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card, padding: 14, marginTop: 8 }, dot: { width: 9, height: 9, borderRadius: 5, backgroundColor: colors.success }, defaultTitle: { color: colors.text, fontSize: 14, fontWeight: '700' }, defaultSub: { color: colors.muted, fontSize: 11, marginTop: 2 }, operational: { color: colors.success, fontSize: 10, fontWeight: '700' },
  section: { color: colors.text, fontSize: 18, fontWeight: '700', marginTop: 24 }, help: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 6 }, label: { color: colors.text, fontSize: 12, fontWeight: '700', marginTop: 18, marginBottom: 7 }, input: { minHeight: 54, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, color: colors.text, fontSize: 16, paddingHorizontal: 14 },
  ok: { backgroundColor: '#EAF7EF', borderRadius: radius.md, padding: 12, marginTop: 12 }, okText: { color: colors.success, fontSize: 12, fontWeight: '700' }, error: { backgroundColor: '#FFF0EE', borderRadius: radius.md, padding: 12, marginTop: 12 }, errorText: { color: colors.danger, fontSize: 12, fontWeight: '600' }, reset: { minHeight: 48, alignItems: 'center', justifyContent: 'center', marginTop: 8 }, resetText: { color: colors.primary, fontSize: 12, fontWeight: '700' },
});
