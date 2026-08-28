import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/styles/theme';

const glyph: Record<string, string> = { USDC: '$', EURC: '€', SOL: '◎', SUI: 'S', PWRC: 'P' };

export function AssetIcon({ symbol, size = 36 }: { symbol: string; size?: number }) {
  return (
    <View style={[styles.icon, { width: size, height: size, borderRadius: size / 2 }]} accessibilityLabel={`${symbol} icon`}>
      <Text style={{ fontWeight: '800', color: colors.primary, fontSize: size * 0.4 }}>{glyph[symbol] ?? symbol.slice(0, 1)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({ icon: { backgroundColor: '#E7F2EB', alignItems: 'center', justifyContent: 'center' } });
