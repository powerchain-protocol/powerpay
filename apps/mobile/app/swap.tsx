import { StyleSheet, Text, View } from 'react-native';
import { PageHeader } from '@/components/PageHeader';
import { Screen } from '@/components/Screen';
import { colors, radius } from '@/styles/theme';
import { usePowerPayCapabilities } from '@/hooks/useCapabilities';
import { usePowerPayWallet } from '@/providers/WalletProvider';

export default function SwapScreen() {
  const { features, loading, error } = usePowerPayCapabilities();
  const wallet = usePowerPayWallet();
  const enabled = features.swaps;
  return <Screen><PageHeader title="Swap" /><Text style={styles.title}>Swap assets</Text>
    <View style={styles.card}><Text style={styles.label}>Availability</Text><Text style={styles.value}>{loading ? 'Checking…' : enabled ? 'Enabled' : 'Not enabled'}</Text><Text style={styles.meta}>{error || (enabled ? 'PowerPay will only show a quote returned by a configured execution provider.' : 'No live quote is displayed until a production swap provider is configured and FEATURE_SWAPS=true.')}</Text></View>
    <View style={styles.card}><Text style={styles.label}>Wallet</Text><Text style={styles.value}>{wallet.address ? short(wallet.address) : 'Not connected'}</Text><Text style={styles.meta}>Jupiter may route through liquidity sources such as Raydium and Meteora. PowerPay does not fabricate a route or output amount before a signed provider quote exists.</Text></View>
    <View style={styles.notice}><Text style={styles.noticeTitle}>{enabled ? 'Execution policy' : 'Capability gated'}</Text><Text style={styles.noticeText}>{enabled ? 'Quote expiry, minimum output, price impact and transaction payload must come from the configured backend adapter before wallet approval.' : 'Enable only after the swap adapter, provider credentials, quote validation and wallet execution path have passed release checks.'}</Text></View>
  </Screen>;
}
function short(value: string) { return value.length <= 18 ? value : `${value.slice(0, 7)}…${value.slice(-6)}`; }
const styles = StyleSheet.create({ title: { color: colors.text, fontSize: 28, fontWeight: '700', marginTop: 10 }, card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card, padding: 18, marginTop: 16 }, label: { color: colors.muted, fontSize: 12 }, value: { color: colors.text, fontSize: 20, fontWeight: '700', marginTop: 5 }, meta: { color: colors.muted, fontSize: 11, lineHeight: 17, marginTop: 7 }, notice: { marginTop: 18, backgroundColor: '#F0F6F2', borderRadius: radius.md, padding: 14 }, noticeTitle: { color: colors.text, fontWeight: '700', fontSize: 14 }, noticeText: { color: colors.muted, fontSize: 11, lineHeight: 17, marginTop: 5 } });
