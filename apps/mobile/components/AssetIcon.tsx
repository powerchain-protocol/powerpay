import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/styles/theme';
import { MOBILE_ASSETS } from '@/assets';

const fallbackGlyph: Record<string, string> = { USDC: '$', EURC: '€' };

export function AssetIcon({ symbol, size = 36, detailed = false }: { symbol: string; size?: number; detailed?: boolean }) {
  if (symbol === 'PWRC') {
    return <Image source={detailed && size >= 40 ? MOBILE_ASSETS.tokens.PWRC.coin : MOBILE_ASSETS.tokens.PWRC.mark} resizeMode="contain" style={{ width: size, height: size }} accessibilityLabel="PWRC icon" />;
  }
  if (symbol === 'wPWRC' || symbol === 'WPWRC') {
    return <Image source={detailed && size >= 40 ? MOBILE_ASSETS.tokens.wPWRC.coin : MOBILE_ASSETS.tokens.wPWRC.mark} resizeMode="contain" style={{ width: size, height: size }} accessibilityLabel="wPWRC icon" />;
  }
  if (symbol === 'USDC') return <Image source={MOBILE_ASSETS.tokens.USDC} resizeMode="contain" style={{ width: size, height: size }} accessibilityLabel="USDC icon" />;
  if (symbol === 'EURC') return <Image source={MOBILE_ASSETS.tokens.EURC} resizeMode="contain" style={{ width: size, height: size }} accessibilityLabel="EURC icon" />;
  if (symbol === 'SOL') return <Image source={MOBILE_ASSETS.networks.SOLANA} resizeMode="contain" style={{ width: size, height: size }} accessibilityLabel="SOL icon" />;
  if (symbol === 'SUI') return <Image source={MOBILE_ASSETS.networks.SUI} resizeMode="contain" style={{ width: size, height: size }} accessibilityLabel="SUI icon" />;
  return (
    <View style={[styles.icon, { width: size, height: size, borderRadius: size / 2 }]} accessibilityLabel={`${symbol} icon`}>
      <Text style={{ fontWeight: '800', color: colors.primary, fontSize: size * 0.4 }}>{fallbackGlyph[symbol] ?? symbol.slice(0, 1)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({ icon: { backgroundColor: '#E7F2EB', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#D5E7DC' } });
