import { Image, StyleSheet, Text, View } from 'react-native';
import { MOBILE_ASSETS } from '@/assets';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { PageHeader } from '@/components/PageHeader';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Screen } from '@/components/Screen';
import { colors, radius } from '@/styles/theme';

const items = [
  ['scan-outline', 'Scan local shops', 'Camera-first Solana Pay and PowerPay QR checkout.'],
  ['cash-outline', 'USDC first', 'USDC is default, with EURC, SOL, SUI and PWRC available by capability.'],
  ['shield-checkmark-outline', 'Approve every payment', 'Account authentication, local approval and wallet signatures stay separate.'],
] as const;

export default function GetStartedScreen() {
  return (
    <Screen>
      <PageHeader title="Get started" />
      <View style={styles.visual}><Image source={MOBILE_ASSETS.illustrations.checkout} style={styles.image} resizeMode="cover" /></View>
      <Text style={styles.title}>One wallet. Every way to pay.</Text>
      <Text style={styles.subtitle}>PowerPay keeps payment intent, signing, settlement and receipts deterministic while routing the protocol infrastructure underneath.</Text>
      <View style={styles.list}>{items.map(([icon, title, text]) => <View key={title} style={styles.item}><View style={styles.icon}><Ionicons name={icon} size={22} color={colors.primary} /></View><View style={{ flex: 1 }}><Text style={styles.itemTitle}>{title}</Text><Text style={styles.itemText}>{text}</Text></View></View>)}</View>
      <View style={styles.footer}><PrimaryButton label="Set up wallet" onPress={() => router.push('/wallet-setup')} /></View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  visual: { width: '100%', aspectRatio: 1.8, overflow: 'hidden', borderRadius: radius.card, backgroundColor: '#E7F2EB', borderWidth: 1, borderColor: colors.border, marginTop: 12 }, image: { width: '100%', height: '100%' }, title: { color: colors.text, fontSize: 30, fontWeight: '700', letterSpacing: -0.9, marginTop: 20 }, subtitle: { color: colors.muted, fontSize: 13, lineHeight: 20, marginTop: 8 }, list: { marginTop: 20, gap: 9 }, item: { flexDirection: 'row', gap: 12, backgroundColor: colors.surface, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border, padding: 13, alignItems: 'center' }, icon: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#F0F6F2', alignItems: 'center', justifyContent: 'center' }, itemTitle: { color: colors.text, fontSize: 14, fontWeight: '700' }, itemText: { color: colors.muted, fontSize: 11, lineHeight: 16, marginTop: 3 }, footer: { marginTop: 22, paddingBottom: 26 },
});
