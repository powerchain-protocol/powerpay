import { useEffect, useState } from 'react';
import * as Crypto from 'expo-crypto';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { AppHeader } from '@/components/AppHeader';
import { AssetIcon } from '@/components/AssetIcon';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Screen } from '@/components/Screen';
import { colors, radius } from '@/styles/theme';
import { powerPayApi } from '@/services/api';

const assets = ['USDC', 'EURC', 'SOL', 'SUI', 'PWRC'] as const;

export default function PayScreen() {
  const params = useLocalSearchParams<{ recipient?: string; asset?: string; merchant?: string }>();
  const [amount, setAmount] = useState('');
  const [asset, setAsset] = useState<(typeof assets)[number]>((assets.includes(params.asset as any) ? params.asset : 'USDC') as any);
  const [recipient, setRecipient] = useState(params.recipient || '');
  const [marketRate, setMarketRate] = useState<string>();
  const [priceMeta, setPriceMeta] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { if (params.recipient) setRecipient(params.recipient); }, [params.recipient]);
  useEffect(() => {
    let alive = true;
    if (asset !== 'SOL' && asset !== 'SUI') { setMarketRate(undefined); setPriceMeta(undefined); return; }
    powerPayApi.prices(asset, 'USD').then((body) => {
      if (!alive) return;
      const price = body.prices?.transactional || body.prices?.reference;
      if (price?.price) {
        setMarketRate(price.price);
        setPriceMeta(`${price.source === 'pyth' ? 'Pyth transactional quote' : 'CoinGecko reference'} · ${new Date(price.observedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
      }
    }).catch(() => { if (alive) { setMarketRate(undefined); setPriceMeta('Live conversion unavailable'); } });
    return () => { alive = false; };
  }, [asset]);

  const numeric = Number(amount);
  const canContinue = Number.isFinite(numeric) && numeric > 0 && recipient.trim().length >= 20 && !loading;

  async function continuePayment() {
    if (!canContinue) return;
    setLoading(true); setError('');
    try {
      const network = asset === 'SUI' ? 'SUI' : 'SOLANA';
      const created = await powerPayApi.createIntent({
        idempotencyKey: `send:${Crypto.randomUUID()}`,
        source: 'SEND', network, asset, amount, fiatCurrency: asset === 'EURC' ? 'EUR' : 'USD', recipient: recipient.trim(),
      });
      router.push({ pathname: '/checkout/[id]', params: { id: created.intent.id, merchant: params.merchant || 'Wallet payment' } });
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Unable to create payment'); }
    finally { setLoading(false); }
  }

  const fiatApprox = marketRate && numeric > 0 ? `$${(numeric * Number(marketRate)).toFixed(2)}` : undefined;

  return (
    <Screen>
      <AppHeader />
      <Text style={styles.title}>Pay</Text>
      <Text style={styles.subtitle}>USDC is the default payment asset. Amount and recipient become immutable when the review quote is locked.</Text>

      <View style={styles.amountCard}>
        <TextInput value={amount} onChangeText={setAmount} keyboardType="decimal-pad" placeholder="0.00" placeholderTextColor="#A6ADA8" style={styles.amountInput} accessibilityLabel="Payment amount" />
        <Text style={styles.fiat}>{fiatApprox || `${asset} amount`}</Text>
      </View>

      <Text style={styles.label}>Pay with</Text>
      <View style={styles.assetPills}>{assets.map((item) => <Pressable key={item} onPress={() => setAsset(item)} style={[styles.assetPill, asset === item && styles.assetPillActive]}><AssetIcon symbol={item} size={28} /><Text style={[styles.assetText, asset === item && styles.assetTextActive]}>{item}</Text></Pressable>)}</View>

      <Text style={styles.label}>To</Text>
      <TextInput value={recipient} onChangeText={setRecipient} placeholder="Wallet address" placeholderTextColor="#929A94" autoCapitalize="none" autoCorrect={false} style={styles.input} />

      {(asset === 'SOL' || asset === 'SUI') ? <View style={styles.quoteCard}><Text style={styles.quoteTitle}>{asset} conversion</Text><Text style={styles.quoteValue}>{marketRate ? `1 ${asset} = $${Number(marketRate).toFixed(2)}` : 'Rate unavailable'}</Text><Text style={styles.quoteMeta}>{priceMeta || 'Fetching live price…'}</Text></View> : null}
      {error ? <View style={styles.errorCard}><Text style={styles.errorText}>{error}</Text></View> : null}

      <View style={{ marginTop: 22, paddingBottom: 26 }}><PrimaryButton label="Continue" loading={loading} disabled={!canContinue} onPress={continuePayment} /></View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 30, fontWeight: '700', letterSpacing: -0.8, marginTop: 4 }, subtitle: { color: colors.muted, fontSize: 13, lineHeight: 19, marginTop: 6 },
  amountCard: { marginTop: 22, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card, padding: 18, alignItems: 'center' }, amountInput: { color: colors.text, fontSize: 44, fontWeight: '700', textAlign: 'center', width: '100%', minHeight: 62 }, fiat: { color: colors.muted, fontSize: 13 },
  label: { color: colors.text, fontSize: 13, fontWeight: '700', marginTop: 20, marginBottom: 8 }, assetPills: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 }, assetPill: { minHeight: 48, flexDirection: 'row', alignItems: 'center', gap: 7, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, borderRadius: radius.md, paddingHorizontal: 11 }, assetPillActive: { borderColor: colors.primary, backgroundColor: '#F0F8F3' }, assetText: { color: colors.text, fontSize: 13, fontWeight: '600' }, assetTextActive: { color: colors.primary },
  input: { minHeight: 54, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, paddingHorizontal: 14, fontSize: 16, color: colors.text }, quoteCard: { marginTop: 16, padding: 14, borderRadius: radius.md, backgroundColor: '#F0F6F2' }, quoteTitle: { color: colors.muted, fontSize: 11, fontWeight: '700' }, quoteValue: { color: colors.text, fontSize: 20, fontWeight: '700', marginTop: 4 }, quoteMeta: { color: colors.muted, fontSize: 10, marginTop: 5 }, errorCard: { marginTop: 14, backgroundColor: '#FFF0EF', borderRadius: radius.md, padding: 12 }, errorText: { color: '#A33A30', fontSize: 12, lineHeight: 17 },
});
