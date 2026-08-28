import { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePowerPayWallet } from '@/providers/WalletProvider';
import { powerPayApi } from '@/services/api';
import { colors, radius } from '@/styles/theme';

export function WalletConnectModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const wallet = usePowerPayWallet();
  const [suiEnabled, setSuiEnabled] = useState(false);
  useEffect(() => { if (visible) powerPayApi.capabilities().then((value) => setSuiEnabled(Boolean(value?.networks?.SUI?.canSend))).catch(() => setSuiEnabled(false)); }, [visible]);

  async function connectSolana() {
    try { await wallet.connectSolana(); onClose(); } catch { /* inline error from provider */ }
  }

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.scrim} onPress={onClose} accessibilityLabel="Close wallet modal" />
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <View style={styles.header}><View><Text style={styles.title}>Connect wallet</Text><Text style={styles.subtitle}>Choose a network first</Text></View><Pressable style={styles.close} onPress={onClose}><Ionicons name="close" size={22} color={colors.text} /></Pressable></View>
        <WalletNetwork title="Solana" subtitle={wallet.address ? `Connected · ${short(wallet.address)}` : 'USDC · EURC · SOL · PWRC'} icon="radio-outline" onPress={connectSolana} status={wallet.status === 'CONNECTING' ? 'Connecting…' : wallet.address ? 'Connected' : undefined} />
        <WalletNetwork title="Sui" subtitle={suiEnabled ? 'USDC · SUI · cross-chain' : 'Not enabled by deployment capabilities'} icon="git-network-outline" disabled={!suiEnabled} />
        {wallet.error ? <View style={styles.error}><Text style={styles.errorText}>{wallet.error}</Text></View> : null}
        <View style={styles.consent}><Text style={styles.consentTitle}>Wallet consent</Text><Text style={styles.consentText}>PowerPay may read your public address and balances and request signatures. Authentication and wallet authorization are separate. PowerPay cannot access private keys.</Text></View>
        {wallet.address ? <Pressable style={styles.disconnect} onPress={() => wallet.disconnect()}><Text style={styles.disconnectText}>Disconnect wallet</Text></Pressable> : null}
      </View>
    </Modal>
  );
}

function WalletNetwork({ title, subtitle, icon, onPress, disabled, status }: { title: string; subtitle: string; icon: keyof typeof Ionicons.glyphMap; onPress?: () => void; disabled?: boolean; status?: string }) {
  return <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress} style={({ pressed }) => [styles.network, disabled && styles.networkDisabled, pressed && !disabled && { opacity: 0.72 }]}><View style={styles.networkIcon}><Ionicons name={icon} size={22} color={disabled ? colors.muted : colors.primary} /></View><View style={{ flex: 1 }}><Text style={styles.networkTitle}>{title}</Text><Text style={styles.networkSub}>{subtitle}</Text>{status ? <Text style={styles.status}>{status}</Text> : null}</View><Ionicons name="chevron-forward" size={19} color="#929A94" /></Pressable>;
}
function short(value: string) { return value.length < 15 ? value : `${value.slice(0, 6)}…${value.slice(-6)}`; }

const styles = StyleSheet.create({
  scrim: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(10,18,13,0.32)' }, sheet: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: colors.surface, borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingHorizontal: 20, paddingTop: 10, paddingBottom: 34 }, handle: { width: 38, height: 4, borderRadius: 2, backgroundColor: '#D3D9D5', alignSelf: 'center', marginBottom: 10 }, header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }, title: { color: colors.text, fontSize: 21, fontWeight: '700' }, subtitle: { color: colors.muted, fontSize: 12, marginTop: 2 }, close: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  network: { minHeight: 72, flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card, paddingHorizontal: 14, marginTop: 9 }, networkDisabled: { opacity: 0.5 }, networkIcon: { width: 42, height: 42, borderRadius: 12, backgroundColor: '#F0F6F2', alignItems: 'center', justifyContent: 'center' }, networkTitle: { color: colors.text, fontSize: 15, fontWeight: '700' }, networkSub: { color: colors.muted, fontSize: 11, marginTop: 3 }, status: { color: colors.success, fontSize: 10, fontWeight: '700', marginTop: 3 },
  consent: { backgroundColor: '#F7F9F7', borderRadius: radius.md, padding: 12, marginTop: 16 }, consentTitle: { color: colors.text, fontSize: 12, fontWeight: '700' }, consentText: { color: colors.muted, fontSize: 11, lineHeight: 16, marginTop: 4 }, error: { backgroundColor: '#FEF3F2', borderRadius: radius.md, padding: 10, marginTop: 12 }, errorText: { color: colors.danger, fontSize: 11, lineHeight: 16 }, disconnect: { minHeight: 44, alignItems: 'center', justifyContent: 'center', marginTop: 10 }, disconnectText: { color: colors.danger, fontSize: 12, fontWeight: '700' },
});
