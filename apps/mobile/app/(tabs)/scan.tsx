import { useCallback, useRef, useState } from 'react';
import { CameraView, useCameraPermissions, type BarcodeScanningResult } from 'expo-camera';
import * as Crypto from 'expo-crypto';
import { router } from 'expo-router';
import { ActivityIndicator, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius } from '@/styles/theme';
import { PrimaryButton } from '@/components/PrimaryButton';
import { powerPayApi } from '@/services/api';

type ScannerState = 'ready' | 'resolving' | 'invalid' | 'paused';

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [state, setState] = useState<ScannerState>('ready');
  const [error, setError] = useState('');
  const [torch, setTorch] = useState(false);
  const scanLocked = useRef(false);
  const insets = useSafeAreaInsets();

  const onBarcodeScanned = useCallback(async (result: BarcodeScanningResult) => {
    if (scanLocked.current || state !== 'ready') return;
    scanLocked.current = true;
    setState('resolving');
    setError('');
    try {
      const resolved = await powerPayApi.resolveQr(result.data);
      const payload = resolved.payload;

      if (payload.kind === 'POWERPAY_CHECKOUT' || payload.kind === 'DONATION') {
        const checkout = resolved.checkout;
        const created = await powerPayApi.createCheckoutIntent(checkout.id, checkout.multiUse ? undefined : payload.nonce, `scan:${checkout.id}:${payload.nonce}`);
        router.push({ pathname: '/checkout/[id]', params: { id: created.intent.id, merchant: checkout.merchant.name, trust: checkout.merchant.trustStatus } });
        setState('paused');
        return;
      }

      if (payload.kind === 'SOLANA_PAY') {
        const normalized = resolved.normalized;
        if (!normalized.amount) {
          router.push({ pathname: '/pay', params: { recipient: normalized.recipient, asset: normalized.asset, merchant: normalized.merchantName || 'Solana Pay' } });
          setState('paused');
          return;
        }
        const created = await powerPayApi.createIntent({
          idempotencyKey: `scan:${normalized.reference || Crypto.randomUUID()}:${normalized.recipient}:${normalized.amount}`,
          source: 'SCAN', network: 'SOLANA', asset: normalized.asset, amount: normalized.amount,
          fiatCurrency: normalized.asset === 'EURC' ? 'EUR' : 'USD', recipient: normalized.recipient,
          reference: normalized.reference || undefined,
        });
        router.push({ pathname: '/checkout/[id]', params: { id: created.intent.id, merchant: normalized.merchantName || 'Solana Pay' } });
        setState('paused');
        return;
      }

      if (payload.kind === 'WALLET_ADDRESS') {
        router.push({ pathname: '/pay', params: { recipient: payload.address, asset: payload.network === 'SOLANA' ? 'USDC' : 'SUI' } });
        setState('paused');
        return;
      }

      if (payload.kind === 'PAYMENT_LINK' || payload.kind === 'SOLANA_ACTION') {
        await Linking.openURL(payload.url);
        setState('paused');
        return;
      }

      throw new Error('This QR code is not a supported payment request.');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to resolve this QR code.');
      setState('invalid');
      scanLocked.current = false;
    }
  }, [state]);

  if (!permission) return <PermissionShell><ActivityIndicator color={colors.primary} /><Text style={styles.permissionTitle}>Checking camera access…</Text></PermissionShell>;
  if (!permission.granted) {
    return <PermissionShell><View style={styles.permissionIcon}><Ionicons name="camera-outline" size={34} color={colors.primary} /></View><Text style={styles.permissionTitle}>Camera access</Text><Text style={styles.permissionText}>PowerPay uses your camera only to scan payment QR codes.</Text><View style={{ width: '100%', marginTop: 18 }}><PrimaryButton label="Allow camera" onPress={requestPermission} /></View>{!permission.canAskAgain ? <Pressable onPress={() => Linking.openSettings()} style={styles.secondaryButton}><Text style={styles.secondaryButtonText}>Open settings</Text></Pressable> : null}<Pressable onPress={() => router.push('/pay')} style={styles.secondaryButton}><Text style={styles.secondaryButtonText}>Enter payment manually</Text></Pressable></PermissionShell>;
  }

  return (
    <View style={styles.cameraRoot}>
      <CameraView style={StyleSheet.absoluteFill} facing="back" enableTorch={torch} barcodeScannerSettings={{ barcodeTypes: ['qr'] }} onBarcodeScanned={state === 'ready' ? onBarcodeScanned : undefined} />
      <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}><Pressable style={styles.darkButton} onPress={() => router.back()} accessibilityLabel="Close scanner"><Ionicons name="close" size={24} color="white" /></Pressable><Pressable style={styles.darkButton} onPress={() => setTorch((v) => !v)} accessibilityLabel="Toggle flash"><Ionicons name={torch ? 'flash' : 'flash-outline'} size={22} color="white" /></Pressable></View>
      <View style={styles.centerOverlay} pointerEvents="none"><View style={styles.scanFrame} /><Text style={styles.scanTitle}>Scan to pay</Text><Text style={styles.scanSubtitle}>Solana Pay · PowerPay QR</Text></View>
      <View style={[styles.bottomSheet, { paddingBottom: Math.max(insets.bottom, 18) }]}>
        {state === 'resolving' ? <View style={styles.resolving}><ActivityIndicator color={colors.primary} /><Text style={styles.resolvingText}>Validating payment…</Text></View> : null}
        {state === 'invalid' ? <View><Text style={styles.invalidTitle}>Unable to use this QR</Text><Text style={styles.invalidText}>{error}</Text><PrimaryButton label="Scan again" onPress={() => { setError(''); setState('ready'); }} /></View> : null}
        {state === 'ready' ? <View style={styles.bottomActions}><Pressable style={styles.secondaryAction} onPress={() => router.push('/pay')}><Ionicons name="keypad-outline" size={20} color={colors.text} /><Text style={styles.actionText}>Enter manually</Text></Pressable><View style={styles.supported}><Ionicons name="shield-checkmark-outline" size={18} color={colors.primary} /><Text style={styles.supportedText}>Review before signing</Text></View></View> : null}
      </View>
    </View>
  );
}

function PermissionShell({ children }: { children: React.ReactNode }) { return <SafeAreaView style={styles.permissionRoot}><View style={styles.permissionCard}>{children}</View></SafeAreaView>; }

const styles = StyleSheet.create({
  cameraRoot: { flex: 1, backgroundColor: '#000' }, topBar: { position: 'absolute', left: 16, right: 16, flexDirection: 'row', justifyContent: 'space-between' }, darkButton: { width: 46, height: 46, borderRadius: 14, backgroundColor: 'rgba(0,0,0,0.44)', alignItems: 'center', justifyContent: 'center' },
  centerOverlay: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center', paddingBottom: 90 }, scanFrame: { width: '72%', maxWidth: 310, aspectRatio: 1, borderRadius: 18, borderWidth: 3, borderColor: '#FFFFFF' }, scanTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: '700', marginTop: 20 }, scanSubtitle: { color: 'rgba(255,255,255,0.78)', fontSize: 13, marginTop: 5 },
  bottomSheet: { position: 'absolute', left: 12, right: 12, bottom: 10, minHeight: 86, backgroundColor: colors.surface, borderRadius: 18, padding: 14 }, bottomActions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 }, secondaryAction: { minHeight: 48, flexDirection: 'row', gap: 8, alignItems: 'center', paddingHorizontal: 8 }, actionText: { color: colors.text, fontSize: 13, fontWeight: '600' }, supported: { flexDirection: 'row', gap: 5, alignItems: 'center' }, supportedText: { color: colors.muted, fontSize: 11 },
  resolving: { minHeight: 58, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 }, resolvingText: { color: colors.text, fontSize: 14, fontWeight: '600' }, invalidTitle: { color: colors.text, fontSize: 16, fontWeight: '700', textAlign: 'center' }, invalidText: { color: colors.muted, fontSize: 12, lineHeight: 17, textAlign: 'center', marginVertical: 8 },
  permissionRoot: { flex: 1, backgroundColor: colors.canvas, justifyContent: 'center', padding: 20 }, permissionCard: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card, padding: 24, alignItems: 'center' }, permissionIcon: { width: 64, height: 64, borderRadius: 18, backgroundColor: '#E7F2EB', alignItems: 'center', justifyContent: 'center' }, permissionTitle: { color: colors.text, fontSize: 22, fontWeight: '700', marginTop: 14, textAlign: 'center' }, permissionText: { color: colors.muted, fontSize: 13, lineHeight: 19, textAlign: 'center', marginTop: 8 }, secondaryButton: { minHeight: 46, alignItems: 'center', justifyContent: 'center', marginTop: 4 }, secondaryButtonText: { color: colors.primary, fontWeight: '700' },
});
