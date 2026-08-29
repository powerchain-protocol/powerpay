import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/styles/theme';
import { BrandMark, type BrandMarkTone } from './BrandMark';

export function PowerPayLogo({ size = 28, showMark = true, tone = 'dark' }: { size?: number; showMark?: boolean; tone?: BrandMarkTone }) {
  const textColor = tone === 'white' ? colors.white : colors.text;
  return (
    <View style={styles.root} accessibilityLabel="PowerPay">
      {showMark ? <BrandMark size={Math.round(size * 1.1)} tone={tone} /> : null}
      <View style={styles.word}><Text style={[styles.power,{fontSize:size,color:textColor}]}>Power</Text><Text style={[styles.pay,{fontSize:size,color:textColor}]}>Pay</Text></View>
    </View>
  );
}
const styles=StyleSheet.create({root:{flexDirection:'row',alignItems:'center',gap:7},word:{flexDirection:'row',alignItems:'baseline'},power:{fontWeight:'300',letterSpacing:-1.1},pay:{fontWeight:'600',letterSpacing:-1.1}});
