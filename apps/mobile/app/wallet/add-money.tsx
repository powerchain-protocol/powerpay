import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PageHeader } from '@/components/PageHeader';
import { Screen } from '@/components/Screen';
import { colors, radius } from '@/styles/theme';

const methods = [
  ['card-outline', 'Card', 'Buy USDC or EURC with a supported card rail'],
  ['business-outline', 'Bank', 'Transfer funds using supported banking partners'],
  ['wallet-outline', 'Crypto', 'Deposit from another wallet'],
  ['git-compare-outline', 'Bridge', 'Move USDC from another supported network'],
] as const;

export default function AddMoneyScreen() {
  return <Screen><PageHeader title="Add money" /><Text style={styles.title}>Choose a funding method</Text><Text style={styles.subtitle}>USDC on Solana is the default destination asset.</Text><View style={styles.list}>{methods.map(([icon, title, subtitle]) => <View key={title} style={styles.row}><View style={styles.icon}><Ionicons name={icon} size={22} color={colors.primary} /></View><View style={{ flex: 1 }}><Text style={styles.rowTitle}>{title}</Text><Text style={styles.rowSub}>{subtitle}</Text></View><Ionicons name="chevron-forward" size={19} color="#929A94" /></View>)}</View></Screen>;
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 26, fontWeight: '700', marginTop: 14 },
  subtitle: { color: colors.muted, fontSize: 13, marginTop: 6 },
  list: { marginTop: 20, gap: 10 },
  row: { minHeight: 76, flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.surface, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 14 },
  icon: { width: 42, height: 42, borderRadius: 12, backgroundColor: '#F0F6F2', alignItems: 'center', justifyContent: 'center' },
  rowTitle: { color: colors.text, fontSize: 15, fontWeight: '700' },
  rowSub: { color: colors.muted, fontSize: 11, lineHeight: 16, marginTop: 3 },
});
