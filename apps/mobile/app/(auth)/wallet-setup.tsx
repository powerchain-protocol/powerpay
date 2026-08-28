import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { PageHeader } from '@/components/PageHeader';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Screen } from '@/components/Screen';
import { usePowerPayWallet } from '@/providers/WalletProvider';
import { colors, radius } from '@/styles/theme';

export default function WalletSetupScreen() {
  const wallet = usePowerPayWallet();
  async function connect() { try { await wallet.connectSolana(); } catch { /* provider displays error below */ } }
  return <Screen>
    <PageHeader title="Wallet" />
    <View style={styles.icon}><Ionicons name="wallet-outline" size={34} color={colors.primary} /></View>
    <Text style={styles.title}>Connect your payment wallet</Text>
    <Text style={styles.subtitle}>Your PowerPay account and blockchain wallet are separate. Connecting a wallet grants address and signature permissions only; private keys stay with the wallet provider.</Text>
    <View style={styles.card}>
      <View style={styles.row}><View style={styles.chain}><Ionicons name="radio-outline" size={23} color={colors.primary} /></View><View style={{ flex: 1 }}><Text style={styles.chainTitle}>Solana</Text><Text style={styles.chainSub}>USDC · EURC · SOL · PWRC</Text></View><Text style={styles.state}>{wallet.address ? 'Connected' : 'Recommended'}</Text></View>
      {wallet.address ? <Text style={styles.address}>{wallet.address}</Text> : null}
      {wallet.error ? <Text style={styles.error}>{wallet.error}</Text> : null}
    </View>
    <View style={styles.permissions}><Text style={styles.permissionTitle}>Consent</Text><Text style={styles.permission}>✓ Read public wallet address</Text><Text style={styles.permission}>✓ Read supported balances</Text><Text style={styles.permission}>✓ Request transaction signatures</Text><Text style={styles.permission}>✕ PowerPay cannot read private keys</Text></View>
    <View style={styles.footer}>
      {!wallet.address ? <PrimaryButton label={wallet.status === 'CONNECTING' ? 'Connecting…' : 'Connect Solana wallet'} loading={wallet.status === 'CONNECTING'} onPress={connect} /> : <PrimaryButton label="Continue" onPress={() => router.push('/security-setup')} />}
      {!wallet.address ? <Text style={styles.skip} onPress={() => router.push('/security-setup')}>Set up security first</Text> : null}
    </View>
  </Screen>;
}

const styles = StyleSheet.create({
  icon: { width: 64, height: 64, borderRadius: 18, backgroundColor: '#E7F2EB', alignItems: 'center', justifyContent: 'center', marginTop: 24 }, title: { color: colors.text, fontSize: 30, fontWeight: '700', letterSpacing: -0.8, marginTop: 18 }, subtitle: { color: colors.muted, fontSize: 13, lineHeight: 20, marginTop: 8 }, card: { marginTop: 24, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card, padding: 14 }, row: { flexDirection: 'row', gap: 12, alignItems: 'center' }, chain: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#F0F6F2', alignItems: 'center', justifyContent: 'center' }, chainTitle: { color: colors.text, fontWeight: '700', fontSize: 15 }, chainSub: { color: colors.muted, fontSize: 11, marginTop: 3 }, state: { color: colors.success, fontSize: 10, fontWeight: '800' }, address: { color: colors.muted, fontSize: 10, marginTop: 12 }, error: { color: colors.danger, fontSize: 11, lineHeight: 16, marginTop: 10 }, permissions: { marginTop: 16, padding: 14, backgroundColor: '#F7F9F7', borderRadius: radius.md, gap: 7 }, permissionTitle: { color: colors.text, fontSize: 12, fontWeight: '800', marginBottom: 2 }, permission: { color: colors.muted, fontSize: 11 }, footer: { marginTop: 'auto', paddingVertical: 26 }, skip: { minHeight: 44, color: colors.primary, fontSize: 12, fontWeight: '700', textAlign: 'center', textAlignVertical: 'center', paddingTop: 15 },
});
