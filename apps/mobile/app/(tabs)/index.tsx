import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '@/components/AppHeader';
import { AssetRow } from '@/components/AssetRow';
import { QuickAction } from '@/components/QuickAction';
import { Screen } from '@/components/Screen';
import { colors, radius } from '@/styles/theme';
import { useTransactionRecovery } from '@/providers/RecoveryProvider';
import { usePaymentActivity } from '@/hooks/useActivity';
import { usePowerPayWallet } from '@/providers/WalletProvider';
import { formatAssetAmount, useSolanaPortfolio } from '@/hooks/usePortfolio';
import { usePowerPayCapabilities } from '@/hooks/useCapabilities';

export default function HomeScreen() {
  const recovery = useTransactionRecovery();
  const activity = usePaymentActivity(2);
  const wallet = usePowerPayWallet();
  const portfolio = useSolanaPortfolio(wallet.address);
  const solPrice = Number(portfolio.solPrice?.price || 0);
  const capabilities = usePowerPayCapabilities();
  const resumable = recovery.records.find((record) => record.phase === 'SUBMITTING' && record.signedTransaction);
  return (
    <Screen>
      <AppHeader />
      {recovery.pendingCount > 0 ? <Pressable style={styles.recovery} onPress={() => resumable ? router.push({ pathname: '/checkout/[id]', params: { id: resumable.paymentIntentId } }) : recovery.refresh()}><View style={{ flex: 1 }}><Text style={styles.recoveryTitle}>{resumable ? 'Resume signed payment' : 'Checking transaction status'}</Text><Text style={styles.recoveryText}>{resumable ? 'A signed transaction is waiting for an explicit resume. PowerPay will never re-broadcast it automatically.' : `${recovery.pendingCount} payment ${recovery.pendingCount === 1 ? 'attempt needs' : 'attempts need'} reconciliation. PowerPay will not submit them again.`}</Text></View><Text style={styles.recoveryAction}>{resumable ? 'Resume' : recovery.refreshing ? 'Checking…' : 'Check'}</Text></Pressable> : null}
      <View style={styles.balanceCard}>
        <Text style={styles.eyebrow}>USDC balance</Text>
        <Text style={styles.balance}>{wallet.address ? formatAssetAmount(portfolio.byAsset.USDC?.amount, 2) : '—'} <Text style={styles.balanceAsset}>USDC</Text></Text>
        <Text style={styles.secondary}>{wallet.address ? portfolio.loading ? 'Loading from PowerPay RPC…' : portfolio.error || `Solana · ${short(wallet.address)}` : 'Connect a wallet to load live balances'}</Text>
        <View style={styles.primaryActions}>
          <QuickAction icon="paper-plane-outline" label="Pay" onPress={() => router.push('/pay')} />
          <QuickAction icon="download-outline" label="Receive" onPress={() => router.push('/wallet/receive')} />
          <QuickAction icon="scan" label="Scan" onPress={() => router.push('/scan')} />
        </View>
      </View>

      <View style={styles.marketCard}>
        <View>
          <Text style={styles.marketLabel}>SOL / USD</Text>
          <Text style={styles.marketValue}>{portfolio.solPrice ? `$${formatAssetAmount(portfolio.solPrice.price, 2)}` : 'Price unavailable'}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.marketSource}>{portfolio.solPrice?.source ? portfolio.solPrice.source.toUpperCase() : 'ORACLE'}</Text>
          <Text style={styles.source}>Transactional Pyth · CoinGecko reference</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}><Text style={styles.title}>Assets</Text><Pressable onPress={() => router.push('/wallet')}><Text style={styles.link}>View all</Text></Pressable></View>
      <View style={styles.card}>
        <AssetRow symbol="USDC" amount={liveAmount(portfolio.byAsset.USDC?.amount, 2)} fiat={portfolio.byAsset.USDC ? `$${formatAssetAmount(portfolio.byAsset.USDC.amount, 2)}` : 'Mint not configured'} subtitle="Solana · Default" />
        <View style={styles.divider} />
        <AssetRow symbol="EURC" amount={liveAmount(portfolio.byAsset.EURC?.amount, 2)} fiat={portfolio.byAsset.EURC ? `€${formatAssetAmount(portfolio.byAsset.EURC.amount, 2)}` : 'Mint not configured'} subtitle="Euro stablecoin" />
        <View style={styles.divider} />
        <AssetRow symbol="SOL" amount={liveAmount(portfolio.byAsset.SOL?.amount)} fiat={portfolio.byAsset.SOL && solPrice > 0 ? `$${formatAssetAmount(String(Number(portfolio.byAsset.SOL.amount) * solPrice), 2)}` : 'Live balance'} subtitle={portfolio.solPrice ? `$${formatAssetAmount(portfolio.solPrice.price, 2)} / SOL` : 'RPC balance'} />
        <View style={styles.divider} />
        <AssetRow symbol="PWRC" amount={liveAmount(portfolio.byAsset.PWRC?.amount)} fiat={portfolio.byAsset.PWRC ? 'Utility' : 'Mint not configured'} subtitle="Token-2022" />
      </View>

      <Text style={[styles.title, { marginTop: 24 }]}>Quick actions</Text>
      <View style={styles.quickGrid}>
        <QuickAction icon="add-circle-outline" label="Add money" onPress={() => router.push('/wallet/add-money')} />
        <QuickAction icon="swap-horizontal-outline" label="Swap" onPress={() => router.push('/swap')} disabled={!capabilities.features.swaps} />
        <QuickAction icon="git-compare-outline" label="Bridge" onPress={() => router.push('/bridge')} disabled={!capabilities.features.bridge} />
        <QuickAction icon="lock-closed-outline" label="Vault" onPress={() => router.push('/vault')} disabled={!capabilities.features.vault} />
      </View>

      <View style={styles.sectionHeader}><Text style={styles.title}>Recent</Text><Pressable onPress={() => router.push('/activity')}><Text style={styles.link}>View all</Text></Pressable></View>
      <View style={[styles.card, { marginBottom: 30 }]}>
        {activity.loading ? <View style={styles.emptyRecent}><Text style={styles.secondarySmall}>Loading payment activity…</Text></View> : null}
        {!activity.loading && activity.items.length === 0 ? <View style={styles.emptyRecent}><Text style={styles.secondarySmall}>{activity.error || 'No PowerPay payments yet.'}</Text></View> : null}
        {activity.items.map((entry, index) => <View key={entry.intent.id}><Pressable onPress={() => entry.intent.status === 'SETTLED' ? router.push({ pathname: '/receipt/[id]', params: { id: entry.intent.id } }) : router.push({ pathname: '/checkout/[id]', params: { id: entry.intent.id } })}><ActivityRow merchant={entry.receipt?.merchantName || entry.intent.reference || 'Payment'} detail={`${entry.intent.source} · ${entry.intent.status.toLowerCase().replace(/_/g, ' ')}`} value={`-${entry.intent.amount} ${entry.intent.asset}`} status={entry.intent.status === 'SETTLED' ? 'Settled' : 'Pending'} /></Pressable>{index < activity.items.length - 1 ? <View style={styles.divider} /> : null}</View>)}
      </View>
    </Screen>
  );
}

function liveAmount(value?: string, decimals = 6) { return value === undefined ? '—' : formatAssetAmount(value, decimals); }
function short(value: string) { return value.length <= 16 ? value : `${value.slice(0, 6)}…${value.slice(-5)}`; }

function ActivityRow({ merchant, detail, value, status }: { merchant: string; detail: string; value: string; status: string }) {
  return <View style={styles.activityRow}><View style={{ flex: 1 }}><Text style={styles.merchant}>{merchant}</Text><Text style={styles.secondarySmall}>{detail}</Text></View><View style={{ alignItems: 'flex-end' }}><Text style={styles.merchant}>{value}</Text><Text style={styles.success}>{status}</Text></View></View>;
}

const styles = StyleSheet.create({
  recovery: { minHeight: 64, backgroundColor: '#EFF8FF', borderRadius: radius.md, padding: 12, marginBottom: 12, flexDirection: 'row', alignItems: 'center', gap: 12 }, recoveryTitle: { color: colors.info, fontSize: 12, fontWeight: '800' }, recoveryText: { color: colors.info, fontSize: 10, lineHeight: 15, marginTop: 2 }, recoveryAction: { color: colors.info, fontSize: 11, fontWeight: '800' },
  balanceCard: { backgroundColor: colors.surface, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border, padding: 20 },
  eyebrow: { color: colors.muted, fontSize: 13, fontWeight: '600' },
  balance: { color: colors.text, fontSize: 36, fontWeight: '700', letterSpacing: -1.3, marginTop: 6 },
  secondary: { color: colors.muted, fontSize: 12, lineHeight: 17, marginTop: 4 },
  balanceAsset: { fontSize: 16, fontWeight: '700' },
  primaryActions: { flexDirection: 'row', marginTop: 22, justifyContent: 'space-between', gap: 10 },
  marketCard: { backgroundColor: '#F0F6F2', borderRadius: radius.md, padding: 14, marginTop: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  marketLabel: { color: colors.muted, fontSize: 11, fontWeight: '700' },
  marketValue: { color: colors.text, fontSize: 18, fontWeight: '700', marginTop: 2 },
  marketSource: { color: colors.success, fontSize: 11, fontWeight: '800' },
  source: { color: colors.muted, fontSize: 10, marginTop: 3 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, marginBottom: 8 },
  title: { color: colors.text, fontSize: 18, fontWeight: '700', letterSpacing: -0.2 },
  link: { color: colors.primary, fontSize: 13, fontWeight: '700' },
  card: { backgroundColor: colors.surface, borderRadius: radius.card, borderColor: colors.border, borderWidth: 1, paddingHorizontal: 14 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border },
  quickGrid: { flexDirection: 'row', gap: 8, marginTop: 12 },
  activityRow: { minHeight: 68, flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  merchant: { color: colors.text, fontSize: 14, fontWeight: '600' },
  secondarySmall: { color: colors.muted, fontSize: 11, marginTop: 3 },
  success: { color: colors.success, fontSize: 11, fontWeight: '700', marginTop: 3 },
  emptyRecent: { minHeight: 64, justifyContent: 'center' },
});
