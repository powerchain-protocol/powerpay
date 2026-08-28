import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { MOBILE_ASSETS } from '@/assets';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PowerPayLogo } from '@/components/PowerPayLogo';
import { BrandMark } from '@/components/BrandMark';
import { PrimaryButton } from '@/components/PrimaryButton';
import { colors, radius } from '@/styles/theme';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.brand}><BrandMark size={34} /><PowerPayLogo size={32} /></View>
      <View style={styles.hero}>
        <View style={styles.visual}><Image source={MOBILE_ASSETS.illustrations.marketplace} resizeMode="cover" style={styles.image} /></View>
        <Text style={styles.title}>Payments without borders.</Text>
        <Text style={styles.subtitle}>Scan local shops, pay with USDC, receive EURC and move digital value across PowerPay's governed Solana and Sui rails.</Text>
      </View>
      <View style={styles.footer}>
        <PrimaryButton label="Get started" onPress={() => router.push('/get-started')} />
        <Pressable style={styles.signInButton} onPress={() => router.push('/sign-in')}><Text style={styles.signIn}>I already have an account</Text></Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.canvas, paddingHorizontal: 20 }, brand: { paddingTop: 10, flexDirection: 'row', alignItems: 'center', gap: 8 }, hero: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 2 }, visual: { width: '100%', maxWidth: 390, aspectRatio: 1.42, borderRadius: radius.card, overflow: 'hidden', borderWidth: 1, borderColor: colors.border, backgroundColor: '#E7F2EB', marginBottom: 26 }, image: { width: '100%', height: '100%' }, title: { color: colors.text, fontSize: 34, fontWeight: '700', letterSpacing: -1.1, textAlign: 'center', maxWidth: 350 }, subtitle: { color: colors.muted, fontSize: 14, lineHeight: 21, textAlign: 'center', maxWidth: 350, marginTop: 12 }, footer: { paddingBottom: 20 }, signInButton: { minHeight: 48, alignItems: 'center', justifyContent: 'center', marginTop: 5 }, signIn: { color: colors.primary, textAlign: 'center', fontSize: 13, fontWeight: '700' },
});
