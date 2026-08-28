import { StyleSheet, Text, View } from 'react-native';
import { PageHeader } from '@/components/PageHeader';
import { Screen } from '@/components/Screen';
import { colors, radius } from '@/styles/theme';
import { usePowerPayCapabilities } from '@/hooks/useCapabilities';

export default function VaultScreen() {
  const { features, loading, error } = usePowerPayCapabilities();
  return <Screen><PageHeader title="Vault" /><View style={styles.hero}><Text style={styles.label}>Vault status</Text><Text style={styles.balance}>{loading ? 'Checking…' : features.vault ? 'Enabled' : 'Not active'}</Text><Text style={styles.copy}>{error || (features.vault ? 'Vault capability is enabled by the backend deployment policy.' : 'No protected balance is shown until a compatible vault program is deployed and enabled.')}</Text></View><Text style={styles.section}>Required controls</Text><View style={styles.card}><Row label="Biometric / PIN approval" /><Row label="Withdrawal policy" /><Row label="Trusted-address policy" /><Row label="Program compatibility check" /></View></Screen>;
}
function Row({ label }: { label: string }) { return <View style={styles.row}><Text style={styles.policy}>{label}</Text><Text style={styles.state}>Required</Text></View>; }
const styles = StyleSheet.create({ hero: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card, padding: 20, marginTop: 10 }, label: { color: colors.muted, fontSize: 12 }, balance: { color: colors.text, fontSize: 28, fontWeight: '700', marginTop: 5 }, copy: { color: colors.muted, fontSize: 11, lineHeight: 17, marginTop: 6 }, section: { color: colors.text, fontSize: 17, fontWeight: '700', marginTop: 22, marginBottom: 8 }, card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card, paddingHorizontal: 14 }, row: { minHeight: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border }, policy: { color: colors.text, fontSize: 13, fontWeight: '600', flex: 1 }, state: { color: colors.muted, fontSize: 11, fontWeight: '700' } });
