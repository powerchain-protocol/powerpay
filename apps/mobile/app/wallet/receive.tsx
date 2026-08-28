import { useState } from 'react';
import { Pressable, Share, StyleSheet, Text, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import QRCode from 'react-native-qrcode-svg';
import { Ionicons } from '@expo/vector-icons';
import { MOBILE_ASSETS } from '@/assets';
import { AssetIcon } from '@/components/AssetIcon';
import { PageHeader } from '@/components/PageHeader';
import { Screen } from '@/components/Screen';
import { WalletConnectModal } from '@/components/WalletConnectModal';
import { usePowerPayWallet } from '@/providers/WalletProvider';
import { colors, radius } from '@/styles/theme';

const assets = ['USDC', 'EURC', 'SOL', 'PWRC'] as const;

export default function ReceiveScreen() {
  const wallet = usePowerPayWallet();
  const [asset, setAsset] = useState<(typeof assets)[number]>('USDC');
  const [connectOpen, setConnectOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const address = wallet.address;

  async function copyAddress() {
    if (!address) return;
    await Clipboard.setStringAsync(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  async function shareAddress() {
    if (!address) return;
    await Share.share({ message: `Receive ${asset} on Solana with PowerPay\n${address}` });
  }

  return <Screen>
    <PageHeader title="Receive" />
    <View style={styles.assetRow}>{assets.map((symbol) => <Pressable key={symbol} onPress={() => setAsset(symbol)} style={[styles.assetPill, asset === symbol && styles.assetPillActive]}><AssetIcon symbol={symbol} size={24}/><Text style={[styles.assetText, asset === symbol && styles.assetTextActive]}>{symbol}</Text></Pressable>)}</View>

    {address ? <>
      <View style={styles.qr}>
        <QRCode value={address} size={220} color="#0A120D" backgroundColor="#FFFFFF" logo={MOBILE_ASSETS.brand.mark} logoSize={38} logoBackgroundColor="#FFFFFF" logoBorderRadius={10} quietZone={8} />
      </View>
      <Text style={styles.title}>PowerPay wallet</Text>
      <Text style={styles.address}>{short(address)}</Text>
      <View style={styles.network}><Ionicons name="radio-outline" size={15} color={colors.primary}/><Text style={styles.networkText}>Solana · Receive {asset}</Text></View>
      <Text style={styles.note}>This QR contains your connected Solana address. The sender still reviews the asset and amount before signing.</Text>
      <View style={styles.actions}>
        <Pressable style={styles.action} onPress={shareAddress}><Ionicons name="share-outline" size={19} color={colors.primary}/><Text style={styles.actionText}>Share</Text></Pressable>
        <Pressable style={styles.action} onPress={copyAddress}><Ionicons name={copied ? 'checkmark' : 'copy-outline'} size={19} color={colors.primary}/><Text style={styles.actionText}>{copied ? 'Copied' : 'Copy'}</Text></Pressable>
      </View>
    </> : <View style={styles.empty}>
      <View style={styles.emptyMark}><Ionicons name="qr-code-outline" size={32} color={colors.primary}/></View>
      <Text style={styles.emptyTitle}>Connect a Solana wallet</Text>
      <Text style={styles.emptyText}>PowerPay does not show a sample receiving address. Connect your wallet to generate the QR.</Text>
      <Pressable style={styles.connect} onPress={() => setConnectOpen(true)}><Text style={styles.connectText}>Connect wallet</Text></Pressable>
    </View>}
    <WalletConnectModal visible={connectOpen} onClose={() => setConnectOpen(false)} />
  </Screen>;
}

function short(value: string) { return value.length <= 24 ? value : `${value.slice(0, 10)}…${value.slice(-10)}`; }

const styles = StyleSheet.create({
  assetRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 7, marginTop: 18 },
  assetPill: { minHeight: 44, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, borderRadius: radius.md, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  assetPillActive: { borderColor: colors.primary, backgroundColor: '#F0F8F3' }, assetText: { color: colors.text, fontWeight: '600', fontSize: 12 }, assetTextActive: { color: colors.primary },
  qr: { width: 258, height: 258, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: radius.card, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: colors.border, marginTop: 22, padding: 10 },
  title: { color: colors.text, fontSize: 17, fontWeight: '700', textAlign: 'center', marginTop: 20 }, address: { color: colors.text, fontSize: 13, fontWeight: '600', textAlign: 'center', marginTop: 7 },
  network: { flexDirection: 'row', gap: 5, alignItems: 'center', justifyContent: 'center', marginTop: 7 }, networkText: { color: colors.muted, fontSize: 12 },
  note: { color: colors.muted, fontSize: 11, lineHeight: 17, textAlign: 'center', maxWidth: 330, alignSelf: 'center', marginTop: 10 },
  actions: { flexDirection: 'row', justifyContent: 'center', gap: 12, marginTop: 18 }, action: { minWidth: 108, minHeight: 48, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, flexDirection: 'row', gap: 7, alignItems: 'center', justifyContent: 'center' }, actionText: { color: colors.primary, fontSize: 13, fontWeight: '700' },
  empty: { marginTop: 26, backgroundColor: colors.surface, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border, padding: 24, alignItems: 'center' }, emptyMark: { width: 64, height: 64, borderRadius: 18, backgroundColor: '#F0F6F2', alignItems: 'center', justifyContent: 'center' }, emptyTitle: { color: colors.text, fontSize: 18, fontWeight: '700', marginTop: 14 }, emptyText: { color: colors.muted, fontSize: 12, lineHeight: 18, textAlign: 'center', marginTop: 6 }, connect: { minHeight: 48, borderRadius: radius.md, backgroundColor: colors.primary, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', marginTop: 16 }, connectText: { color: colors.white, fontWeight: '700', fontSize: 13 },
});
