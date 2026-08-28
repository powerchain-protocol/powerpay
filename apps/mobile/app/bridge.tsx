import { StyleSheet, Text, View } from 'react-native';
import { PageHeader } from '@/components/PageHeader';
import { Screen } from '@/components/Screen';
import { colors, radius } from '@/styles/theme';
import { usePowerPayCapabilities } from '@/hooks/useCapabilities';

export default function BridgeScreen() {
  const { features, loading, error } = usePowerPayCapabilities();
  return <Screen><PageHeader title="Bridge" /><Text style={styles.title}>Move USDC cross-chain</Text>
    <View style={styles.card}><Text style={styles.label}>Availability</Text><Text style={styles.value}>{loading ? 'Checking…' : features.bridge ? 'Enabled by deployment policy' : 'Not enabled'}</Text><Text style={styles.meta}>{error || 'PowerPay never displays an estimated destination amount until a supported bridge adapter returns a bound quote.'}</Text></View>
    <View style={styles.details}><Text style={styles.route}>CCTP compatibility is version-gated</Text><Text style={styles.info}>Solana can use current CCTP capabilities. Sui support must use the explicitly configured compatible CCTP deployment; cross-chain execution remains disabled by default until that adapter and reconciliation path are deployed.</Text></View>
  </Screen>;
}
const styles = StyleSheet.create({ title: { color: colors.text, fontSize: 28, fontWeight: '700', marginTop: 10 }, card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card, padding: 18, marginTop: 16 }, label: { color: colors.muted, fontSize: 12 }, value: { color: colors.text, fontSize: 20, fontWeight: '700', marginTop: 5 }, meta: { color: colors.muted, fontSize: 11, lineHeight: 16, marginTop: 6 }, details: { marginTop: 18, backgroundColor: '#F0F6F2', borderRadius: radius.md, padding: 14 }, route: { color: colors.text, fontWeight: '700', fontSize: 15 }, info: { color: colors.muted, fontSize: 11, lineHeight: 17, marginTop: 6 } });
