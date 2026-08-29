import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { PowerPayLogo } from './PowerPayLogo';
import { colors } from '@/styles/theme';
import { usePowerPayAuth } from '@/providers/AuthProvider';
import { usePowerPayNotifications } from '@/hooks/useNotifications';

export function AppHeader({ unread: unreadOverride }: { unread?: number }) {
  const auth=usePowerPayAuth(); const notifications=usePowerPayNotifications(20); const unread=unreadOverride??notifications.unread;
  return <View style={styles.header}><PowerPayLogo size={24}/><View style={styles.actions}>
    <Pressable accessibilityRole="button" accessibilityLabel={`Notifications${unread?`, ${unread} unread`:''}`} style={styles.iconButton} onPress={()=>router.push('/notifications')}><Ionicons name="notifications-outline" size={20} color={colors.text}/>{unread>0?<View style={styles.badge}><Text style={styles.badgeText}>{Math.min(unread,9)}</Text></View>:null}</Pressable>
    <Pressable accessibilityRole="button" accessibilityLabel="Profile and settings" style={styles.avatar} onPress={()=>router.push('/profile')}><Text style={styles.avatarText}>{auth.initials}</Text></Pressable>
  </View></View>;
}
const styles=StyleSheet.create({header:{height:58,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},actions:{flexDirection:'row',alignItems:'center',gap:7},iconButton:{width:42,height:42,borderRadius:13,alignItems:'center',justifyContent:'center',position:'relative',backgroundColor:'#F0F3F1'},avatar:{width:36,height:36,borderRadius:14,backgroundColor:'#E7F2EB',alignItems:'center',justifyContent:'center'},avatarText:{color:colors.primary,fontWeight:'800',fontSize:11},badge:{position:'absolute',top:5,right:4,minWidth:15,height:15,borderRadius:8,backgroundColor:colors.danger,alignItems:'center',justifyContent:'center',paddingHorizontal:3},badgeText:{color:'#fff',fontSize:8,fontWeight:'700'}});
