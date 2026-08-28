import { Text, View } from 'react-native';
import { colors } from '@/styles/theme';

export function PowerPayLogo({ size = 28 }: { size?: number }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'baseline' }} accessibilityLabel="PowerPay">
      <Text style={{ fontSize: size, fontWeight: '300', letterSpacing: -1.1, color: colors.text }}>Power</Text>
      <Text style={{ fontSize: size, fontWeight: '600', letterSpacing: -1.1, color: colors.text }}>Pay</Text>
    </View>
  );
}
