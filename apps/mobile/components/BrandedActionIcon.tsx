import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { BrandMark } from './BrandMark';
import { colors } from '@/styles/theme';

type IconName = keyof typeof Ionicons.glyphMap;
export function BrandedActionIcon({ icon, size = 52 }: { icon: IconName; size?: number }) {
  return <View style={[styles.root,{width:size,height:size,borderRadius:Math.round(size*.3)}]}><BrandMark size={Math.round(size*.5)} tone="green" style={styles.mark}/><View style={styles.badge}><Ionicons name={icon} size={Math.round(size*.25)} color={colors.primary}/></View></View>;
}
const styles=StyleSheet.create({root:{position:'relative',backgroundColor:'#EEF5F0',alignItems:'center',justifyContent:'center',shadowColor:'#0A120D',shadowOpacity:.05,shadowRadius:10,shadowOffset:{width:0,height:5}},mark:{opacity:.96},badge:{position:'absolute',right:-2,bottom:-2,width:22,height:22,borderRadius:8,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'#E2E7E3'}});
