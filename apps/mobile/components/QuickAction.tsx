import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/styles/theme';
type IconName=keyof typeof Ionicons.glyphMap;
export function QuickAction({icon,label,onPress,disabled=false,emphasis=false}:{icon:IconName;label:string;onPress:()=>void;disabled?:boolean;emphasis?:boolean}){
 return <Pressable style={({pressed})=>[styles.wrap,(pressed||disabled)&&styles.dimmed]} onPress={onPress} disabled={disabled} accessibilityRole="button" accessibilityLabel={label} accessibilityState={{disabled}}><View style={[styles.icon,emphasis&&styles.iconEmphasis,disabled&&styles.iconDisabled]}><Ionicons name={icon} size={21} color={disabled?colors.muted:emphasis?'#fff':colors.primary}/></View><Text numberOfLines={1} style={[styles.label,disabled&&styles.labelDisabled]}>{label}</Text></Pressable>;
}
const styles=StyleSheet.create({wrap:{flex:1,minWidth:66,alignItems:'center',gap:7},dimmed:{opacity:.58},icon:{width:50,height:50,borderRadius:16,backgroundColor:'#EDF5F0',alignItems:'center',justifyContent:'center',shadowColor:'#0A120D',shadowOpacity:.035,shadowRadius:10,shadowOffset:{width:0,height:5}},iconEmphasis:{backgroundColor:colors.primary,shadowOpacity:.15},iconDisabled:{backgroundColor:'#F1F3F2'},label:{color:colors.text,fontSize:11,fontWeight:'650'},labelDisabled:{color:colors.muted}});
