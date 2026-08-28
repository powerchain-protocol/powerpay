import { router } from 'expo-router';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PageHeader } from '@/components/PageHeader';
import { Screen } from '@/components/Screen';
import { colors, radius } from '@/styles/theme';
import { usePowerPayAuth } from '@/providers/AuthProvider';

export default function ProfileScreen() {
  const auth = usePowerPayAuth();
  return (
    <Screen>
      <PageHeader title="Profile & Settings" />
      <View style={styles.profileCard}>
        <View style={styles.avatar}><Text style={styles.avatarText}>{auth.initials}</Text></View>
        <View style={{ flex: 1 }}><Text style={styles.name}>{auth.displayName || 'PowerPay account'}</Text><Text style={styles.email}>{auth.email || (auth.configured ? 'Signed in' : 'Development identity')}</Text><Text style={styles.verified}>{auth.configured ? 'Authenticated ✓' : 'Development mode'}</Text></View>
      </View>

      <Text style={styles.sectionTitle}>Security</Text>
      <View style={styles.card}>
        <Row icon="keypad-outline" title="Payment PIN" subtitle="6-digit approval PIN" onPress={() => router.push('/profile/security/pin')} />
        <Divider />
        <Row icon="scan-outline" title="Face ID / Biometrics" subtitle="Approve payments and sensitive actions" trailing={<Switch value trackColor={{ true: '#A9D5BA' }} thumbColor={colors.primary} />} />
        <Divider />
        <Row icon="finger-print-outline" title="Passkeys" subtitle="Passwordless sign-in" />
        <Divider />
        <Row icon="shield-checkmark-outline" title="ZK verification" subtitle="Privacy-preserving eligibility proofs" />
      </View>

      <Text style={styles.sectionTitle}>Payments</Text>
      <View style={styles.card}>
        <Row icon="cash-outline" title="Default asset" subtitle="USDC" />
        <Divider />
        <Row icon="logo-euro" title="Secondary asset" subtitle="EURC" />
        <Divider />
        <Row icon="globe-outline" title="Display currency" subtitle="EUR" />
      </View>

      <Text style={styles.sectionTitle}>Networks</Text>
      <View style={styles.card}>
        <Row icon="radio-outline" title="Solana" subtitle="Mainnet · PowerPay RPC (Helius)" />
        <Divider />
        <Row icon="options-outline" title="Custom RPC" subtitle="Configure and health-check your endpoint" onPress={() => router.push('/profile/network/solana')} />
        <Divider />
        <Row icon="git-network-outline" title="Sui" subtitle="Enabled" />
      </View>

      <Text style={styles.sectionTitle}>Account</Text>
      <View style={[styles.card, { marginBottom: 30 }]}>
        <Row icon="wallet-outline" title="Connected wallets" subtitle="Verified account mappings and local sessions" onPress={() => router.push('/profile/wallets')} />
        <Divider />
        <Row icon="notifications-outline" title="Notifications" subtitle="Payments, security, wallet" onPress={() => router.push('/notifications')} />
        <Divider />
        <Row icon="moon-outline" title="Appearance" subtitle="Light · default" />
        {auth.configured ? <><Divider /><Row icon="log-out-outline" title="Sign out" subtitle="End this PowerPay account session" onPress={async () => { await auth.signOut(); router.replace('/sign-in'); }} /></> : null}
      </View>
    </Screen>
  );
}

function Row({ icon, title, subtitle, onPress, trailing }: { icon: keyof typeof Ionicons.glyphMap; title: string; subtitle: string; onPress?: () => void; trailing?: React.ReactNode }) {
  return <Pressable style={styles.row} onPress={onPress} disabled={!onPress}><View style={styles.rowIcon}><Ionicons name={icon} size={20} color={colors.primary} /></View><View style={{ flex: 1 }}><Text style={styles.rowTitle}>{title}</Text><Text style={styles.rowSub}>{subtitle}</Text></View>{trailing ?? <Ionicons name="chevron-forward" size={18} color="#9AA29C" />}</Pressable>;
}
function Divider() { return <View style={styles.divider} />; }

const styles = StyleSheet.create({
  profileCard: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: colors.surface, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border, padding: 16, marginTop: 8 },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#E7F2EB', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.primary, fontSize: 17, fontWeight: '800' },
  name: { color: colors.text, fontSize: 17, fontWeight: '700' },
  email: { color: colors.muted, fontSize: 12, marginTop: 2 },
  verified: { color: colors.success, fontSize: 11, fontWeight: '700', marginTop: 4 },
  sectionTitle: { color: colors.text, fontSize: 14, fontWeight: '700', marginTop: 22, marginBottom: 8 },
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card, paddingHorizontal: 14 },
  row: { minHeight: 66, flexDirection: 'row', alignItems: 'center', gap: 11 },
  rowIcon: { width: 38, height: 38, borderRadius: 11, backgroundColor: '#F0F6F2', alignItems: 'center', justifyContent: 'center' },
  rowTitle: { color: colors.text, fontSize: 14, fontWeight: '700' },
  rowSub: { color: colors.muted, fontSize: 11, marginTop: 3 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border, marginLeft: 49 },
});
