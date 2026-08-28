import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '@/components/AppHeader';
import { AssetRow } from '@/components/AssetRow';
import { QuickAction } from '@/components/QuickAction';
import { Screen } from '@/components/Screen';
import { colors, radius } from '@/styles/theme';
import { WalletConnectModal } from '@/components/WalletConnectModal';
import { usePowerPayWallet } from '@/providers/WalletProvider';
import { formatAssetAmount, useSolanaPortfolio } from '@/hooks/usePortfolio';
import { usePowerPayCapabilities } from '@/hooks/useCapabilities';

export default function WalletScreen() {
  const [connectOpen, setConnectOpen] = useState(false);
  const wallet = usePowerPayWallet();
  const portfolio = useSolanaPortfolio(wallet.address);
  const solPrice = Number(portfolio.solPrice?.price || 0);
  const capabilities = usePowerPayCapabilities();

  return (
    <Screen>
      <AppHeader />
      <View style={styles.titleRow}><Text style={styles.title}>Wallet</Text><Pressable style={styles.connect} onPress={() => setConnectOpen(true)}><Text style={styles.connectText}>{wallet.address ? short(wallet.address) : 'Connect wallet'}</Text></Pressable></View>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>PowerPay wallet</Text>
        <Text style={styles.balance}>{wallet.address ? formatAssetAmount(portfolio.byAsset.USDC?.amount, 2) : '—'} <Text style={styles.balanceAsset}>USDC</Text></Text>
        <Text style={styles.muted}>{wallet.address ? portfolio.loading ? 'Loading balances from PowerPay RPC…' : portfolio.error ? portfolio.error : `Solana · ${short(wallet.address)}` : 'Connect a Solana wallet to load live balances. USDC is the default payment asset.'}</Text>
        <View style={styles.actions}>
          <QuickAction icon="add-circle-outline" label="Add money" onPress={() => router.push('/wallet/add-money')} />
          <QuickAction icon="paper-plane-outline" label="Send" onPress={() => router.push('/pay')} />
          <QuickAction icon="download-outline" label="Receive" onPress={() => router.push('/wallet/receive')} />
        </View>
      </View>

      <View style={styles.sectionHeader}><Text style={styles.sectionHeaderTitle}>Solana assets</Text>{wallet.address ? <Pressable style={styles.refresh} onPress={() => void portfolio.refresh()}><Text style={styles.refreshText}>Refresh</Text></Pressable> : null}</View>
      <View style={styles.card}>
        <LiveAsset symbol="USDC" amount={portfolio.byAsset.USDC?.amount} subtitle="Solana · Default payment asset" fiat={portfolio.byAsset.USDC ? `$${formatAssetAmount(portfolio.byAsset.USDC.amount, 2)}` : 'Mint not configured'} />
        <View style={styles.divider} /><LiveAsset symbol="EURC" amount={portfolio.byAsset.EURC?.amount} subtitle="Euro stablecoin" fiat={portfolio.byAsset.EURC ? `€${formatAssetAmount(portfolio.byAsset.EURC.amount, 2)}` : 'Mint not configured'} />
        <View style={styles.divider} /><LiveAsset symbol="SOL" amount={portfolio.byAsset.SOL?.amount} subtitle={portfolio.solPrice ? `${portfolio.solPrice.source.toUpperCase()} · $${formatAssetAmount(portfolio.solPrice.price, 2)} / SOL` : 'Live RPC balance'} fiat={portfolio.byAsset.SOL && solPrice > 0 ? `$${formatAssetAmount(String(Number(portfolio.byAsset.SOL.amount) * solPrice), 2)}` : 'Price unavailable'} />
        <View style={styles.divider} /><LiveAsset symbol="PWRC" amount={portfolio.byAsset.PWRC?.amount} subtitle="Token-2022 · PowerPay-owned visual" fiat={portfolio.byAsset.PWRC ? 'Utility asset' : 'Mint not configured'} onPress={() => router.push('/wallet/pwrc')} />
      </View>
      {!wallet.address ? <View style={styles.info}><Text style={styles.infoText}>No balance is fabricated while disconnected. PowerPay reads exact native/SPL/Token-2022 balances through the configured server RPC after wallet connection.</Text></View> : null}

      <Text style={styles.sectionTitle}>Web3</Text>
      <View style={styles.web3Grid}>
        <Feature title="Swap" subtitle={capabilities.features.swaps ? "Live routing enabled" : "Requires swap provider"} onPress={capabilities.features.swaps ? () => router.push('/swap') : undefined} />
        <Feature title="Bridge" subtitle={capabilities.features.bridge ? "Cross-chain enabled" : "Deployment gated"} onPress={capabilities.features.bridge ? () => router.push('/bridge') : undefined} />
        <Feature title="Vault" subtitle={capabilities.features.vault ? "Policy vault enabled" : "Program not active"} onPress={capabilities.features.vault ? () => router.push('/vault') : undefined} />
        <Feature title="DeFAI" subtitle="Intent-based transaction planning" />
      </View>
      <WalletConnectModal visible={connectOpen} onClose={() => setConnectOpen(false)} />
    </Screen>
  );
}

function LiveAsset({ symbol, amount, fiat, subtitle, onPress }: { symbol: string; amount?: string; fiat: string; subtitle: string; onPress?: () => void }) { return <AssetRow symbol={symbol} amount={amount === undefined ? '—' : formatAssetAmount(amount)} fiat={fiat} subtitle={subtitle} onPress={onPress} />; }
function Feature({ title, subtitle, onPress }: { title: string; subtitle: string; onPress?: () => void }) { return <Pressable onPress={onPress} disabled={!onPress} style={styles.feature}><Text style={styles.featureTitle}>{title}</Text><Text style={styles.featureSub}>{subtitle}</Text></Pressable>; }
function short(value: string) { return value.length <= 16 ? value : `${value.slice(0, 6)}…${value.slice(-5)}`; }

const styles = StyleSheet.create({
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, title: { color: colors.text, fontSize: 30, fontWeight: '700', letterSpacing: -0.8 }, connect: { minHeight: 44, justifyContent: 'center', paddingHorizontal: 8 }, connectText: { color: colors.primary, fontSize: 12, fontWeight: '700' },
  hero: { marginTop: 14, backgroundColor: colors.surface, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border, padding: 20 }, eyebrow: { color: colors.muted, fontSize: 12, fontWeight: '600' }, balance: { color: colors.text, fontSize: 34, fontWeight: '700', letterSpacing: -1, marginTop: 6 }, balanceAsset: { fontSize: 16, fontWeight: '700' }, muted: { color: colors.muted, fontSize: 12, lineHeight: 17, marginTop: 4 }, actions: { flexDirection: 'row', gap: 8, marginTop: 20 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 24, marginBottom: 8 }, sectionTitle: { color: colors.text, fontSize: 18, fontWeight: '700', marginTop: 24, marginBottom: 8 }, sectionHeaderTitle: { color: colors.text, fontSize: 18, fontWeight: '700' }, refresh: { minHeight: 44, justifyContent: 'center' }, refreshText: { color: colors.primary, fontSize: 11, fontWeight: '700' },
  card: { backgroundColor: colors.surface, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 14 }, divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border }, info: { marginTop: 10, backgroundColor: '#F4F8F5', borderRadius: radius.md, padding: 12 }, infoText: { color: colors.muted, fontSize: 11, lineHeight: 16 },
  web3Grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, paddingBottom: 30 }, feature: { width: '48%', minHeight: 96, backgroundColor: colors.surface, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border, padding: 14, justifyContent: 'space-between' }, featureTitle: { color: colors.text, fontSize: 16, fontWeight: '700' }, featureSub: { color: colors.muted, fontSize: 11, lineHeight: 16, marginTop: 10 },
});
