import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { PageHeader } from '@/components/PageHeader';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Screen } from '@/components/Screen';
import { colors, radius } from '@/styles/theme';

export default function SecuritySetupScreen() {
  return <Screen>
    <PageHeader title="Security" />
    <View style={styles.icon}><Ionicons name="shield-checkmark-outline" size={34} color={colors.primary} /></View>
    <Text style={styles.title}>Protect payment approvals</Text>
    <Text style={styles.subtitle}>PowerPay uses local device authentication for configured risk levels and a six-digit PIN as a fallback. Wallet approval is still required to authorize blockchain transactions.</Text>
    <View style={styles.card}><SecurityRow icon="finger-print" title="Biometric approval" text="Face ID or device biometrics when available." /><SecurityRow icon="keypad-outline" title="6-digit payment PIN" text="Fallback for local PowerPay approval." /><SecurityRow icon="wallet-outline" title="Wallet signature" text="Final blockchain authorization remains in your wallet." /></View>
    <View style={styles.footer}><PrimaryButton label="Create payment PIN" onPress={() => router.push({ pathname: '/profile/security/pin', params: { onboarding: '1' } })} /><Text style={styles.skip} onPress={() => router.push('/ready')}>Skip for now</Text></View>
  </Screen>;
}
function SecurityRow({ icon, title, text }: { icon: keyof typeof Ionicons.glyphMap; title: string; text: string }) { return <View style={styles.row}><View style={styles.rowIcon}><Ionicons name={icon} size={21} color={colors.primary} /></View><View style={{ flex: 1 }}><Text style={styles.rowTitle}>{title}</Text><Text style={styles.rowText}>{text}</Text></View></View>; }
const styles = StyleSheet.create({
  icon: { width: 64, height: 64, borderRadius: 18, backgroundColor: '#E7F2EB', alignItems: 'center', justifyContent: 'center', marginTop: 24 }, title: { color: colors.text, fontSize: 30, fontWeight: '700', letterSpacing: -0.8, marginTop: 18 }, subtitle: { color: colors.muted, fontSize: 13, lineHeight: 20, marginTop: 8 }, card: { marginTop: 24, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card, padding: 14, gap: 18 }, row: { flexDirection: 'row', gap: 12, alignItems: 'center' }, rowIcon: { width: 42, height: 42, borderRadius: 12, backgroundColor: '#F0F6F2', alignItems: 'center', justifyContent: 'center' }, rowTitle: { color: colors.text, fontSize: 14, fontWeight: '700' }, rowText: { color: colors.muted, fontSize: 11, lineHeight: 16, marginTop: 2 }, footer: { marginTop: 'auto', paddingVertical: 26 }, skip: { color: colors.primary, minHeight: 44, textAlign: 'center', paddingTop: 15, fontSize: 12, fontWeight: '700' },
});
