import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { MOBILE_ASSETS } from '@/assets';
import { PageHeader } from '@/components/PageHeader';
import { Screen } from '@/components/Screen';
import { PrimaryButton } from '@/components/PrimaryButton';
import { usePowerPayWallet } from '@/providers/WalletProvider';
import { formatAssetAmount, useSolanaPortfolio } from '@/hooks/usePortfolio';
import { colors, radius } from '@/styles/theme';

export default function PwrcAssetScreen() {
  const wallet = usePowerPayWallet();
  const portfolio = useSolanaPortfolio(wallet.address);
  const amount = portfolio.byAsset.PWRC?.amount;
  return <Screen>
    <PageHeader title="PWRC" />
    <View style={styles.hero}>
      <Image source={MOBILE_ASSETS.tokens.PWRC.coin} resizeMode="contain" style={styles.coin} accessibilityLabel="PWRC visual" />
      <Text style={styles.title}>PowerChain Token</Text>
      <Text style={styles.amount}>{amount === undefined ? '—' : formatAssetAmount(amount)} <Text style={styles.symbol}>PWRC</Text></Text>
      <Text style={styles.meta}>{wallet.address ? portfolio.loading ? 'Loading exact Token-2022 balance…' : 'Solana · Token-2022' : 'Connect a Solana wallet to load the exact PWRC balance.'}</Text>
    </View>
    <View style={styles.actions}>
      <PrimaryButton label="Send PWRC" disabled={!wallet.address} onPress={() => router.push({ pathname: '/pay', params: { asset: 'PWRC' } })} />
      <Pressable style={styles.secondary} onPress={() => router.push('/wallet/receive')}><Text style={styles.secondaryText}>Receive PWRC</Text></Pressable>
    </View>
    <View style={styles.info}><Text style={styles.infoTitle}>Token handling</Text><Text style={styles.infoText}>PowerPay treats PWRC as a Token-2022 asset. Transfer-extension fees and PowerPay service fees are separate and must be shown in the signed fee quote before approval.</Text></View>
  </Screen>;
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border, padding: 24, marginTop: 12 },
  coin: { width: 150, height: 150 }, title: { color: colors.text, fontSize: 18, fontWeight: '700', marginTop: 10 },
  amount: { color: colors.text, fontSize: 30, fontWeight: '700', letterSpacing: -0.8, marginTop: 8, textAlign: 'center' }, symbol: { fontSize: 15 },
  meta: { color: colors.muted, fontSize: 12, lineHeight: 18, textAlign: 'center', marginTop: 6 }, actions: { marginTop: 14 },
  secondary: { minHeight: 48, alignItems: 'center', justifyContent: 'center', marginTop: 4 }, secondaryText: { color: colors.primary, fontSize: 13, fontWeight: '700' },
  info: { marginTop: 12, backgroundColor: '#F0F6F2', borderRadius: radius.md, padding: 14 }, infoTitle: { color: colors.text, fontSize: 12, fontWeight: '700' }, infoText: { color: colors.muted, fontSize: 11, lineHeight: 17, marginTop: 5, paddingBottom: 20 },
});
