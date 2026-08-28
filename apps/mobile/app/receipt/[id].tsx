import { useEffect, useState } from 'react';
import * as Clipboard from 'expo-clipboard';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system/legacy';
import { Linking, Pressable, Share, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { PageHeader } from '@/components/PageHeader';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Screen } from '@/components/Screen';
import { powerPayApi } from '@/services/api';
import { colors, radius } from '@/styles/theme';
import { getExplorer } from '@powerpay/explorers';

type Receipt = {
  receiptId: string; paymentIntentId: string; attemptId: string; network: string; transactionId: string;
  merchantId?: string; merchantName?: string; payer?: string; asset: string; amount: string;
  fees: { subtotal: string; serviceFee: string; protocolFee: string; networkFee: string; total: string };
  timestamp: string; settlementStatus: 'SETTLED' | 'REFUNDED';
};

export default function ReceiptScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const intentId = String(id || '');
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [error, setError] = useState('');

  useEffect(() => { powerPayApi.receipt(intentId).then((value) => setReceipt(value.receipt)).catch((cause) => setError(cause instanceof Error ? cause.message : 'Receipt unavailable')); }, [intentId]);

  const explorerUrl = receipt ? getExplorer(receipt.network as 'SOLANA' | 'SUI', receipt.network === 'SUI' ? (process.env.EXPO_PUBLIC_SUI_NETWORK || 'devnet') : (process.env.EXPO_PUBLIC_SOLANA_CLUSTER || 'devnet')).transactionUrl(receipt.transactionId) : '';
  async function shareReceipt() {
    if (!receipt) return;
    await Share.share({ message: `PowerPay receipt ${receipt.receiptId}\n${receipt.amount} ${receipt.asset}\n${receipt.settlementStatus}\n${receipt.transactionId}` });
  }
  async function downloadReceipt() {
    if (!receipt) return;
    const body = JSON.stringify(receipt, null, 2);
    const path = `${FileSystem.cacheDirectory}powerpay-receipt-${receipt.receiptId}.json`;
    await FileSystem.writeAsStringAsync(path, body);
    if (await Sharing.isAvailableAsync()) await Sharing.shareAsync(path, { mimeType: 'application/json', dialogTitle: 'Save PowerPay receipt' });
  }

  return (
    <Screen>
      <PageHeader title="Receipt" />
      <View style={styles.hero}>
        <View style={styles.successCircle}><Ionicons name={receipt?.settlementStatus === 'REFUNDED' ? 'return-up-back' : 'checkmark'} color={colors.white} size={34} /></View>
        <Text style={styles.complete}>{receipt?.settlementStatus === 'REFUNDED' ? 'Payment refunded' : 'Payment complete'}</Text>
        <Text style={styles.amount}>{receipt ? `${receipt.amount} ${receipt.asset}` : '—'}</Text>
        <Text style={styles.merchant}>{receipt?.merchantName || 'PowerPay payment'}</Text>
      </View>

      {error ? <View style={styles.error}><Text style={styles.errorText}>{error}</Text></View> : null}
      {receipt ? <View style={styles.card}>
        <Row label="Status" value={receipt.settlementStatus === 'SETTLED' ? 'Settled' : 'Refunded'} success />
        <Row label="Network" value={capitalize(receipt.network)} />
        <Row label="Transaction" value={short(receipt.transactionId)} onPress={() => Clipboard.setStringAsync(receipt.transactionId)} />
        <Row label="Receipt" value={short(receipt.receiptId)} onPress={() => Clipboard.setStringAsync(receipt.receiptId)} />
        <Row label="Payment" value={`${receipt.fees.subtotal} ${receipt.asset}`} />
        <Row label="PowerPay fee" value={`${receipt.fees.serviceFee} ${receipt.asset}`} />
        {Number(receipt.fees.protocolFee) > 0 ? <Row label="Protocol fee" value={`${receipt.fees.protocolFee} ${receipt.asset}`} /> : null}
        <Row label="Time" value={new Date(receipt.timestamp).toLocaleString()} />
      </View> : null}

      <View style={styles.actions}>
        <PrimaryButton label="Done" onPress={() => router.replace('/')} />
        {receipt ? <View style={styles.secondaryRow}>
          <Action icon="share-outline" label="Share" onPress={shareReceipt} />
          <Action icon="download-outline" label="Download" onPress={downloadReceipt} />
          <Action icon="open-outline" label="Explorer" onPress={() => Linking.openURL(explorerUrl)} />
        </View> : null}
      </View>
      <Text style={styles.note}>Receipts are generated from immutable settlement records and remain available without a connected wallet.</Text>
    </Screen>
  );
}

function Row({ label, value, success, onPress }: { label: string; value: string; success?: boolean; onPress?: () => void }) {
  const body = <><Text style={styles.label}>{label}</Text><Text numberOfLines={1} style={[styles.value, success && { color: colors.success }]}>{value}</Text></>;
  return onPress ? <Pressable style={styles.row} onPress={onPress}>{body}</Pressable> : <View style={styles.row}>{body}</View>;
}
function Action({ icon, label, onPress }: { icon: keyof typeof Ionicons.glyphMap; label: string; onPress: () => void }) { return <Pressable style={styles.action} onPress={onPress}><Ionicons name={icon} size={19} color={colors.primary} /><Text style={styles.actionText}>{label}</Text></Pressable>; }
function capitalize(value: string) { return value.slice(0, 1).toUpperCase() + value.slice(1).toLowerCase(); }
function short(value: string) { return value.length <= 16 ? value : `${value.slice(0, 7)}…${value.slice(-7)}`; }

const styles = StyleSheet.create({
  hero: { alignItems: 'center', paddingVertical: 26 }, successCircle: { width: 68, height: 68, borderRadius: 34, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }, complete: { color: colors.text, fontSize: 16, fontWeight: '700', marginTop: 14 }, amount: { color: colors.text, fontSize: 34, fontWeight: '700', letterSpacing: -0.9, marginTop: 6 }, merchant: { color: colors.muted, fontSize: 13, marginTop: 5 },
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card, paddingHorizontal: 14 }, row: { minHeight: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 16, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border }, label: { color: colors.muted, fontSize: 12 }, value: { color: colors.text, fontSize: 12, fontWeight: '700', maxWidth: '64%' },
  actions: { marginTop: 20, gap: 12 }, secondaryRow: { flexDirection: 'row', gap: 8 }, action: { flex: 1, minHeight: 54, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', gap: 4 }, actionText: { color: colors.primary, fontSize: 11, fontWeight: '700' }, note: { color: colors.muted, fontSize: 10, lineHeight: 15, textAlign: 'center', marginTop: 14, marginBottom: 28 },
  error: { backgroundColor: '#FEF3F2', borderRadius: radius.md, padding: 12 }, errorText: { color: colors.danger, fontSize: 12, lineHeight: 17 },
});
