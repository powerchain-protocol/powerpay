import { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { PageHeader } from '@/components/PageHeader';
import { colors } from '@/styles/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PinScreen() {
  const { onboarding } = useLocalSearchParams<{ onboarding?: string }>();
  const [pin, setPin] = useState('');
  const [first, setFirst] = useState<string | null>(null);
  const [error, setError] = useState('');

  async function press(value: string) {
    if (pin.length >= 6) return;
    const next = pin + value;
    setPin(next);
    setError('');
    if (next.length !== 6) return;

    if (!first) {
      setTimeout(() => { setFirst(next); setPin(''); }, 150);
      return;
    }

    if (first !== next) {
      setTimeout(() => { setPin(''); setFirst(null); setError('PINs did not match. Try again.'); }, 150);
      return;
    }

    const digest = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, `powerpay:${next}`);
    await SecureStore.setItemAsync('powerpay_pin_hash', digest, { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY });
    if (onboarding === '1') router.replace('/ready'); else router.back();
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.headerWrap}><PageHeader title="Payment PIN" /></View>
      <View style={styles.content}>
        <Text style={styles.title}>{first ? 'Confirm your PIN' : 'Create your PowerPay PIN'}</Text>
        <Text style={styles.subtitle}>Use 6 digits to protect payments and sensitive account actions.</Text>
        <View style={styles.dots}>{Array.from({ length: 6 }).map((_, i) => <View key={i} style={[styles.dot, i < pin.length && styles.dotFilled]} />)}</View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <View style={styles.keypad}>
          {[1,2,3,4,5,6,7,8,9].map(n => <Key key={n} label={String(n)} onPress={() => press(String(n))} />)}
          <View style={styles.key} />
          <Key label="0" onPress={() => press('0')} />
          <Key label="⌫" onPress={() => setPin((p) => p.slice(0, -1))} />
        </View>
      </View>
    </SafeAreaView>
  );
}

function Key({ label, onPress }: { label: string; onPress: () => void | Promise<void> }) {
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.key, pressed && { backgroundColor: '#E8EDE9' }]}><Text style={styles.keyText}>{label}</Text></Pressable>;
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.canvas },
  headerWrap: { paddingHorizontal: 20 },
  content: { flex: 1, alignItems: 'center', paddingHorizontal: 24, paddingTop: 26 },
  title: { color: colors.text, fontSize: 25, fontWeight: '700', textAlign: 'center', letterSpacing: -0.5 },
  subtitle: { color: colors.muted, fontSize: 13, lineHeight: 19, textAlign: 'center', marginTop: 8, maxWidth: 300 },
  dots: { flexDirection: 'row', gap: 14, marginTop: 34 },
  dot: { width: 13, height: 13, borderRadius: 7, borderWidth: 1.5, borderColor: '#9BA49D' },
  dotFilled: { backgroundColor: colors.primary, borderColor: colors.primary },
  error: { color: colors.danger, fontSize: 12, fontWeight: '600', marginTop: 15 },
  keypad: { width: '100%', maxWidth: 330, flexDirection: 'row', flexWrap: 'wrap', marginTop: 38 },
  key: { width: '33.333%', height: 72, alignItems: 'center', justifyContent: 'center', borderRadius: 14 },
  keyText: { color: colors.text, fontSize: 28, fontWeight: '500' },
});
