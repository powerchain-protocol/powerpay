import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AssetIcon } from './AssetIcon';
import { colors } from '@/styles/theme';

export function AssetRow({ symbol, amount, fiat, subtitle, onPress }: { symbol: string; amount: string; fiat: string; subtitle?: string; onPress?: () => void }) {
  return (
    <Pressable style={styles.row} onPress={onPress} accessibilityRole={onPress ? 'button' : undefined}>
      <AssetIcon symbol={symbol} />
      <View style={styles.middle}>
        <Text style={styles.symbol}>{symbol}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <View style={styles.right}>
        <Text style={styles.amount}>{amount}</Text>
        <Text style={styles.subtitle}>{fiat}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { minHeight: 64, flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8 },
  middle: { flex: 1 },
  right: { alignItems: 'flex-end' },
  symbol: { color: colors.text, fontSize: 16, fontWeight: '700' },
  amount: { color: colors.text, fontSize: 15, fontWeight: '600' },
  subtitle: { color: colors.muted, fontSize: 12, marginTop: 2 },
});
