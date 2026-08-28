import { useEffect, useMemo, useState } from 'react';
import { Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BrandMark } from './BrandMark';
import { WalletBrandIcon, type MobileWalletBrand } from './WalletBrandIcon';
import { usePowerPayWallet } from '@/providers/WalletProvider';
import { powerPayApi } from '@/services/api';
import { colors, radius } from '@/styles/theme';

const SOLANA_WALLETS: readonly MobileWalletBrand[] = ['Phantom', 'Solflare', 'Backpack'];

export function WalletConnectModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const wallet = usePowerPayWallet();
  const [suiEnabled, setSuiEnabled] = useState(false);
  const reownProjectConfigured = Boolean(process.env.EXPO_PUBLIC_REOWN_PROJECT_ID);

  useEffect(() => {
    if (!visible) return;
    powerPayApi.capabilities()
      .then((value) => setSuiEnabled(Boolean(value?.networks?.SUI?.canSend)))
      .catch(() => setSuiEnabled(false));
  }, [visible]);

  const discoveryCopy = useMemo(() => {
    if (wallet.address) return short(wallet.address);
    if (Platform.OS === 'android') return 'Mobile Wallet Adapter securely discovers compatible Solana wallets';
    return 'Requires the configured iOS Solana wallet provider';
  }, [wallet.address]);

  async function connectSolana() {
    try {
      await wallet.connectSolana();
      onClose();
    } catch {
      // WalletProvider exposes the actionable provider error in the sheet.
    }
  }

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.scrim} onPress={onClose} accessibilityLabel="Close wallet modal" />
      <View style={styles.sheet} accessibilityViewIsModal>
        <View style={styles.handle} />
        <Pressable style={styles.close} onPress={onClose} accessibilityLabel="Close wallet modal">
          <Ionicons name="close" size={22} color={colors.text} />
        </Pressable>

        <View style={styles.brand}><BrandMark size={54} /></View>
        <Text style={styles.title}>Connect wallet</Text>
        <Text style={styles.subtitle}>Connect a wallet to approve payments securely with PowerPay.</Text>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Connect a Solana wallet"
          disabled={wallet.status === 'CONNECTING'}
          onPress={connectSolana}
          style={({ pressed }) => [styles.walletCard, pressed && { opacity: 0.72 }, wallet.status === 'CONNECTING' && styles.disabled]}
        >
          <View style={styles.networkIcon}><Ionicons name="wallet-outline" size={23} color={colors.primary} /></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.networkTitle}>{wallet.address ? 'Solana wallet connected' : wallet.status === 'CONNECTING' ? 'Opening wallet…' : 'Connect Solana wallet'}</Text>
            <Text style={styles.networkSub}>{discoveryCopy}</Text>
          </View>
          <Ionicons name="chevron-forward" size={19} color="#929A94" />
        </Pressable>

        <Text style={styles.compatibilityTitle}>Compatible Solana wallets</Text>
        <View style={styles.walletPills}>
          {SOLANA_WALLETS.map((name) => (
            <View key={name} style={styles.walletPill} accessibilityLabel={`${name} compatible wallet`}>
              <WalletBrandIcon wallet={name} size={21} />
              <Text style={styles.walletPillText}>{name}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.walletCard, styles.integrationCard, styles.disabled]} accessibilityLabel="WalletConnect integration status">
          <View style={styles.walletLogoFrame}><WalletBrandIcon wallet="WalletConnect" size={24} /></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.networkTitle}>WalletConnect-compatible wallets</Text>
            <Text style={styles.networkSub}>{reownProjectConfigured ? 'Project ID configured; connector adapter is deployment-gated in this build' : 'Requires EXPO_PUBLIC_REOWN_PROJECT_ID and the Reown connector adapter'}</Text>
          </View>
          <View style={styles.gatedBadge}><Text style={styles.gatedBadgeText}>Gated</Text></View>
        </View>

        <View style={[styles.walletCard, !suiEnabled && styles.disabled]} accessibilityLabel="Sui wallet capability">
          <View style={styles.networkIcon}><Ionicons name="git-network-outline" size={23} color={suiEnabled ? colors.primary : colors.muted} /></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.networkTitle}>Sui wallet</Text>
            <Text style={styles.networkSub}>{suiEnabled ? 'Deployment capability is enabled; wallet connector is required before signing' : 'Not enabled by deployment capabilities'}</Text>
          </View>
          <View style={styles.gatedBadge}><Text style={styles.gatedBadgeText}>{suiEnabled ? 'Connector' : 'Gated'}</Text></View>
        </View>

        {wallet.error ? <View style={styles.error}><Text style={styles.errorText}>{wallet.error}</Text></View> : null}

        <View style={styles.consent}>
          <View style={styles.consentHeading}>
            <Ionicons name="shield-checkmark-outline" size={18} color={colors.primary}/>
            <Text style={styles.consentTitle}>Wallet consent</Text>
          </View>
          <Text style={styles.consentText}>PowerPay can read the public address and balances and request signatures. Account authentication, wallet connection, and payment authorization remain separate. Private keys never leave the wallet.</Text>
        </View>

        {wallet.address
          ? <Pressable style={styles.disconnect} onPress={() => wallet.disconnect()}><Text style={styles.disconnectText}>Disconnect wallet</Text></Pressable>
          : <Pressable style={styles.continue} onPress={onClose}><Text style={styles.continueText}>Continue without wallet</Text></Pressable>}
        <View style={styles.secured}><Ionicons name="lock-closed-outline" size={14} color={colors.muted}/><Text style={styles.securedText}>Secured by PowerPay</Text></View>
      </View>
    </Modal>
  );
}

function short(value: string) { return value.length < 15 ? value : `${value.slice(0, 6)}…${value.slice(-6)}`; }

const styles = StyleSheet.create({
  scrim: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(10,18,13,0.34)' },
  sheet: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: colors.surface, borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingHorizontal: 20, paddingTop: 10, paddingBottom: 30 },
  handle: { width: 38, height: 4, borderRadius: 2, backgroundColor: '#D3D9D5', alignSelf: 'center' },
  close: { position: 'absolute', right: 12, top: 12, width: 44, height: 44, alignItems: 'center', justifyContent: 'center', zIndex: 2 },
  brand: { alignSelf: 'center', width: 70, height: 70, borderRadius: 18, backgroundColor: '#F0F6F2', alignItems: 'center', justifyContent: 'center', marginTop: 20 },
  title: { color: colors.text, fontSize: 23, fontWeight: '700', letterSpacing: -0.4, textAlign: 'center', marginTop: 12 },
  subtitle: { color: colors.muted, fontSize: 12, lineHeight: 18, textAlign: 'center', alignSelf: 'center', maxWidth: 330, marginTop: 5, marginBottom: 14 },
  walletCard: { minHeight: 72, flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card, paddingHorizontal: 14, marginTop: 9 },
  integrationCard: { minHeight: 68 },
  disabled: { opacity: 0.58 },
  networkIcon: { width: 42, height: 42, borderRadius: 12, backgroundColor: '#F0F6F2', alignItems: 'center', justifyContent: 'center' },
  walletLogoFrame: { width: 42, height: 42, borderRadius: 12, backgroundColor: '#F7F9F7', borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  networkTitle: { color: colors.text, fontSize: 15, fontWeight: '700' },
  networkSub: { color: colors.muted, fontSize: 11, lineHeight: 15, marginTop: 3 },
  compatibilityTitle: { color: colors.muted, fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.6, marginTop: 13 },
  walletPills: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginTop: 8 },
  walletPill: { minHeight: 38, paddingHorizontal: 10, borderRadius: 10, backgroundColor: '#F7F9F7', borderWidth: 1, borderColor: colors.border, flexDirection: 'row', alignItems: 'center', gap: 7 },
  walletPillText: { color: colors.text, fontSize: 11, fontWeight: '600' },
  gatedBadge: { minHeight: 26, paddingHorizontal: 8, borderRadius: 8, backgroundColor: '#F2F4F2', borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  gatedBadgeText: { color: colors.muted, fontSize: 9, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.4 },
  consent: { backgroundColor: '#F7F9F7', borderRadius: radius.md, padding: 12, marginTop: 15 },
  consentHeading: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  consentTitle: { color: colors.text, fontSize: 12, fontWeight: '700' },
  consentText: { color: colors.muted, fontSize: 11, lineHeight: 16, marginTop: 5 },
  error: { backgroundColor: '#FEF3F2', borderRadius: radius.md, padding: 10, marginTop: 12 },
  errorText: { color: colors.danger, fontSize: 11, lineHeight: 16 },
  disconnect: { minHeight: 44, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  disconnectText: { color: colors.danger, fontSize: 12, fontWeight: '700' },
  continue: { minHeight: 44, alignItems: 'center', justifyContent: 'center', marginTop: 7 },
  continueText: { color: colors.primary, fontSize: 12, fontWeight: '700' },
  secured: { flexDirection: 'row', gap: 5, alignItems: 'center', justifyContent: 'center', marginTop: 3 },
  securedText: { color: colors.muted, fontSize: 10 },
});
