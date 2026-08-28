import { StyleSheet, Text, View } from 'react-native';
import { PageHeader } from '@/components/PageHeader';
import { Screen } from '@/components/Screen';
import { colors, radius } from '@/styles/theme';

export default function ReceiveScreen() {
  return <Screen><PageHeader title="Receive" /><View style={styles.asset}><Text style={styles.assetText}>USDC ▾</Text></View><View style={styles.qr}><View style={styles.qrInner}><Text style={styles.qrText}>QR</Text></View></View><Text style={styles.title}>PowerPay wallet</Text><Text style={styles.address}>7V4d…x82Q</Text><Text style={styles.network}>Solana</Text><View style={styles.actions}><Text style={styles.action}>Share</Text><Text style={styles.action}>Copy</Text></View></Screen>;
}

const styles = StyleSheet.create({
  asset: { alignSelf: 'center', marginTop: 18, minHeight: 44, justifyContent: 'center', paddingHorizontal: 14, backgroundColor: colors.surface, borderRadius: 12, borderWidth: 1, borderColor: colors.border },
  assetText: { color: colors.text, fontWeight: '700', fontSize: 13 },
  qr: { width: 250, height: 250, alignSelf: 'center', borderRadius: radius.card, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, marginTop: 22, padding: 18 },
  qrInner: { flex: 1, backgroundColor: '#0A120D', alignItems: 'center', justifyContent: 'center' },
  qrText: { color: '#FFFFFF', fontSize: 36, fontWeight: '700', letterSpacing: 4 },
  title: { color: colors.text, fontSize: 17, fontWeight: '700', textAlign: 'center', marginTop: 20 },
  address: { color: colors.text, fontSize: 14, textAlign: 'center', marginTop: 7 },
  network: { color: colors.muted, fontSize: 12, textAlign: 'center', marginTop: 4 },
  actions: { flexDirection: 'row', justifyContent: 'center', gap: 40, marginTop: 22 },
  action: { color: colors.primary, fontSize: 13, fontWeight: '700', minHeight: 44 },
});
