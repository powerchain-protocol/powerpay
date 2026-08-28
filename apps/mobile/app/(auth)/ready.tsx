import { Image, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Screen } from '@/components/Screen';
import { PowerPayLogo } from '@/components/PowerPayLogo';
import { colors, radius } from '@/styles/theme';
import { completeOnboarding } from '@/services/onboarding';

export default function ReadyScreen() {
  return <Screen>
    <View style={styles.logo}><PowerPayLogo size={28} /></View>
    <View style={styles.visual}><Image source={require('../../assets/visuals/mobile-showcase.png')} style={styles.image} resizeMode="cover" /></View>
    <View style={styles.check}><Ionicons name="checkmark" size={28} color={colors.white} /></View>
    <Text style={styles.title}>PowerPay is ready.</Text>
    <Text style={styles.subtitle}>USDC is your default payment asset. Open Scan for local-shop QR payments or Pay to send directly.</Text>
    <View style={styles.summary}><Text style={styles.item}>✓ USDC-first checkout</Text><Text style={styles.item}>✓ Camera scan-to-pay</Text><Text style={styles.item}>✓ Recovery-safe execution</Text><Text style={styles.item}>✓ Wallet-controlled signatures</Text></View>
    <View style={styles.footer}><PrimaryButton label="Start using PowerPay" onPress={async () => { await completeOnboarding(); router.replace('/(tabs)'); }} /></View>
  </Screen>;
}
const styles = StyleSheet.create({ logo: { marginTop: 12 }, visual: { width: '100%', aspectRatio: 1.75, borderRadius: radius.card, overflow: 'hidden', borderWidth: 1, borderColor: colors.border, marginTop: 24 }, image: { width: '100%', height: '100%' }, check: { width: 54, height: 54, borderRadius: 27, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginTop: 24 }, title: { color: colors.text, fontSize: 32, fontWeight: '700', letterSpacing: -0.9, marginTop: 14 }, subtitle: { color: colors.muted, fontSize: 13, lineHeight: 20, marginTop: 8 }, summary: { backgroundColor: colors.surface, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border, padding: 14, marginTop: 20, gap: 9 }, item: { color: colors.text, fontSize: 12, fontWeight: '600' }, footer: { marginTop: 'auto', paddingVertical: 26 } });
