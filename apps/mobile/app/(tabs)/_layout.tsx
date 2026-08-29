import { Redirect, Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/styles/theme';
import { usePowerPayAuth } from '@/providers/AuthProvider';
import { ScanTabIcon } from '@/components/ScanTabIcon';

const icon = (name: keyof typeof Ionicons.glyphMap) => ({ color, size }: { color: string; size: number }) => <Ionicons name={name} color={color} size={Math.min(size,22)} />;
export default function TabsLayout() {
  const auth = usePowerPayAuth();
  if (!auth.isLoaded) return null;
  if (auth.configured && !auth.isSignedIn) return <Redirect href="/sign-in" />;
  return <Tabs screenOptions={{headerShown:false,tabBarActiveTintColor:colors.primary,tabBarInactiveTintColor:'#7B847E',tabBarHideOnKeyboard:true,tabBarStyle:{position:'absolute',left:16,right:16,bottom:14,height:72,paddingTop:8,paddingBottom:8,borderTopWidth:0,borderRadius:24,backgroundColor:'#FFFFFF',shadowColor:'#0A120D',shadowOpacity:.11,shadowRadius:22,shadowOffset:{width:0,height:10},elevation:12},tabBarLabelStyle:{fontSize:10,fontWeight:'650'},tabBarItemStyle:{borderRadius:18}}}>
    <Tabs.Screen name="index" options={{title:'Home',tabBarIcon:icon('home-outline')}}/>
    <Tabs.Screen name="pay" options={{title:'Pay',tabBarIcon:icon('paper-plane-outline')}}/>
    <Tabs.Screen name="scan" options={{title:'Scan',tabBarIcon:({focused})=><ScanTabIcon focused={focused}/>}}/>
    <Tabs.Screen name="activity" options={{title:'Activity',tabBarIcon:icon('receipt-outline')}}/>
    <Tabs.Screen name="wallet" options={{title:'Wallet',tabBarIcon:icon('wallet-outline')}}/>
  </Tabs>;
}
