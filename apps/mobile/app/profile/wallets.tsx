import { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PageHeader } from '@/components/PageHeader';
import { Screen } from '@/components/Screen';
import { WalletConnectModal } from '@/components/WalletConnectModal';
import { usePowerPayWallet } from '@/providers/WalletProvider';
import { powerPayApi } from '@/services/api';
import { colors, radius } from '@/styles/theme';

type ServerWallet = {
  id: string;
  chain: 'SOLANA' | 'SUI';
  address: string;
  label?: string;
  walletType?: string;
  status: 'CONNECTED' | 'DISCONNECTED' | 'REVOKED' | 'UNSUPPORTED';
  permissions?: string[];
  connectedAt: string;
  lastUsedAt?: string;
};

export default function ConnectedWalletsScreen() {
  const local = usePowerPayWallet();
  const [items, setItems] = useState<ServerWallet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [modal, setModal] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true); setError(undefined);
    try { const result = await powerPayApi.wallets(); setItems(Array.isArray(result.wallets) ? result.wallets : []); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Wallet records are unavailable'); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void refresh(); }, [refresh]);

  const localVerified = useMemo(() => local.address ? items.some((item) => item.chain === 'SOLANA' && item.address === local.address && item.status === 'CONNECTED') : false, [items, local.address]);

  return <Screen>
    <PageHeader title="Connected wallets" />
    <Text style={styles.intro}>Your account login and wallet authorization are separate. A wallet becomes account-verified after a confirmed PowerPay settlement or a future signed-link challenge.</Text>

    {local.address ? <View style={styles.localCard}>
      <View style={styles.rowTop}><View style={styles.icon}><Ionicons name="radio-outline" size={21} color={colors.primary} /></View><View style={{ flex: 1 }}><Text style={styles.title}>Current Solana wallet</Text><Text style={styles.address}>{short(local.address)}</Text></View><Badge label={localVerified ? 'Verified' : 'Local only'} tone={localVerified ? 'good' : 'warn'} /></View>
      <Text style={styles.detail}>{localVerified ? 'This signing address is mapped to your PowerPay account.' : 'Connected on this device, but not yet mapped to your account. PowerPay will not claim ownership without cryptographic evidence.'}</Text>
      <Pressable style={styles.textButton} onPress={() => void local.disconnect()}><Text style={styles.dangerText}>Disconnect from device</Text></Pressable>
    </View> : <Pressable style={styles.connectCard} onPress={() => setModal(true)}><View style={styles.icon}><Ionicons name="wallet-outline" size={21} color={colors.primary} /></View><View style={{ flex: 1 }}><Text style={styles.title}>Connect a wallet</Text><Text style={styles.detail}>Connect Solana to sign payments. Sui is capability-gated.</Text></View><Ionicons name="chevron-forward" size={18} color={colors.muted} /></Pressable>}

    <View style={styles.headingRow}><Text style={styles.heading}>Account wallet records</Text><Pressable onPress={() => void refresh()} style={styles.refresh}><Ionicons name="refresh" size={18} color={colors.primary} /></Pressable></View>
    {loading ? <State text="Loading wallet records…" /> : null}
    {!loading && error ? <State text={error} /> : null}
    {!loading && !error && items.length === 0 ? <State text="No cryptographically verified wallet records yet." /> : null}
    {!loading && !error ? items.map((item) => <View key={item.id} style={styles.record}>
      <View style={styles.rowTop}><View style={styles.icon}><Ionicons name={item.chain === 'SOLANA' ? 'radio-outline' : 'git-network-outline'} size={21} color={colors.primary} /></View><View style={{ flex: 1 }}><Text style={styles.title}>{item.label || item.walletType || `${item.chain === 'SOLANA' ? 'Solana' : 'Sui'} wallet`}</Text><Text style={styles.address}>{short(item.address)}</Text></View><Badge label={item.status === 'CONNECTED' ? 'Verified' : item.status} tone={item.status === 'CONNECTED' ? 'good' : 'warn'} /></View>
      <Text style={styles.detail}>{item.chain} · {item.permissions?.length || 0} recorded permissions</Text>
    </View>) : null}
    <WalletConnectModal visible={modal} onClose={() => setModal(false)} />
  </Screen>;
}

function Badge({ label, tone }: { label: string; tone: 'good' | 'warn' }) { return <View style={[styles.badge, tone === 'good' ? styles.good : styles.warn]}><Text style={[styles.badgeText, tone === 'good' ? styles.goodText : styles.warnText]}>{label}</Text></View>; }
function State({ text }: { text: string }) { return <View style={styles.state}><Text style={styles.detail}>{text}</Text></View>; }
function short(value: string) { return value.length <= 18 ? value : `${value.slice(0, 8)}…${value.slice(-8)}`; }

const styles = StyleSheet.create({
  intro: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 8, marginBottom: 14 },
  localCard: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card, padding: 14 },
  connectCard: { minHeight: 78, flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card, padding: 14 },
  rowTop: { flexDirection: 'row', alignItems: 'center', gap: 11 }, icon: { width: 40, height: 40, borderRadius: 11, backgroundColor: '#F0F6F2', alignItems: 'center', justifyContent: 'center' },
  title: { color: colors.text, fontSize: 14, fontWeight: '700' }, address: { color: colors.muted, fontSize: 11, marginTop: 2 }, detail: { color: colors.muted, fontSize: 11, lineHeight: 16, marginTop: 8 },
  textButton: { minHeight: 44, justifyContent: 'center', alignSelf: 'flex-start' }, dangerText: { color: colors.danger, fontSize: 12, fontWeight: '700' },
  headingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, marginBottom: 8 }, heading: { color: colors.text, fontSize: 17, fontWeight: '700' }, refresh: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  record: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card, padding: 14, marginBottom: 9 }, state: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card, padding: 14 },
  badge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 5 }, good: { backgroundColor: '#EAF6EE' }, warn: { backgroundColor: '#FFF7E5' }, badgeText: { fontSize: 9, fontWeight: '800', textTransform: 'uppercase' }, goodText: { color: colors.success }, warnText: { color: '#8A5A00' },
});
