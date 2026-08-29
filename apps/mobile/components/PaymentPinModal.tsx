import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { colors, radius } from '@/styles/theme';

export function PaymentPinModal({ visible, onApproved, onCancel }: { visible: boolean; onApproved: () => void; onCancel: () => void }) {
  const [pin, setPin] = useState('');
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [error, setError] = useState('');

  useEffect(() => { if (visible) { setPin(''); setError(''); SecureStore.getItemAsync('powerpay_pin_hash').then((value) => setConfigured(Boolean(value))); } }, [visible]);

  async function press(value: string) {
    if (pin.length >= 6) return;
    const next = pin + value; setPin(next); setError('');
    if (next.length !== 6) return;
    const expected = await SecureStore.getItemAsync('powerpay_pin_hash');
    const digest = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, `powerpay:${next}`);
    if (!expected || expected !== digest) { setTimeout(() => { setPin(''); setError('Incorrect PIN'); }, 120); return; }
    setPin(''); onApproved();
  }

  return <Modal visible={visible} transparent animationType="slide" onRequestClose={onCancel}>
    <Pressable style={styles.scrim} onPress={onCancel} />
    <View style={styles.sheet}>
      <View style={styles.handle} />
      {configured === false ? <><Text style={styles.title}>Set a payment PIN</Text><Text style={styles.subtitle}>Create a 6-digit PowerPay PIN before using PIN approval.</Text><Pressable style={styles.setup} onPress={() => { onCancel(); router.push('/profile/security/pin'); }}><Text style={styles.setupText}>Set payment PIN</Text></Pressable></> : <>
        <Text style={styles.title}>Enter PowerPay PIN</Text><Text style={styles.subtitle}>Confirm this payment with your 6-digit PIN.</Text>
        <View style={styles.dots}>{Array.from({ length: 6 }).map((_, i) => <View key={i} style={[styles.dot, i < pin.length && styles.dotFilled]} />)}</View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <View style={styles.keypad}>{[1,2,3,4,5,6,7,8,9].map((n) => <Key key={n} label={String(n)} onPress={() => press(String(n))} />)}<View style={styles.key} /><Key label="0" onPress={() => press('0')} /><Key label="⌫" onPress={() => setPin((value) => value.slice(0, -1))} /></View>
      </>}
    </View>
  </Modal>;
}

function Key({ label, onPress }: { label: string; onPress: () => void | Promise<void> }) { return <Pressable onPress={onPress} style={({ pressed }) => [styles.key, pressed && styles.keyPressed]}><Text style={styles.keyText}>{label}</Text></Pressable>; }

const styles = StyleSheet.create({
  scrim: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(10,18,13,0.35)' }, sheet: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: colors.surface, borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingHorizontal: 20, paddingTop: 10, paddingBottom: 28 }, handle: { width: 38, height: 4, borderRadius: 2, backgroundColor: '#D3D9D5', alignSelf: 'center', marginBottom: 18 }, title: { color: colors.text, fontSize: 22, fontWeight: '700', textAlign: 'center' }, subtitle: { color: colors.muted, fontSize: 12, lineHeight: 17, textAlign: 'center', marginTop: 6 }, dots: { flexDirection: 'row', justifyContent: 'center', gap: 13, marginTop: 24 }, dot: { width: 12, height: 12, borderRadius: 6, borderWidth: 1.5, borderColor: '#9BA49D' }, dotFilled: { backgroundColor: colors.primary, borderColor: colors.primary }, error: { color: colors.danger, fontSize: 12, textAlign: 'center', marginTop: 10 }, keypad: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 18 }, key: { width: '33.333%', height: 60, alignItems: 'center', justifyContent: 'center', borderRadius: radius.md }, keyPressed: { backgroundColor: '#EDF2EE' }, keyText: { color: colors.text, fontSize: 24, fontWeight: '500' }, setup: { minHeight: 52, backgroundColor: colors.primary, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', marginTop: 22 }, setupText: { color: '#fff', fontSize: 14, fontWeight: '700' },
});
