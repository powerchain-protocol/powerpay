import { Redirect, Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/styles/theme';
import { usePowerPayAuth } from '@/providers/AuthProvider';

const icon = (name: keyof typeof Ionicons.glyphMap) => ({ color, size }: { color: string; size: number }) => (
  <Ionicons name={name} color={color} size={size} />
);

export default function TabsLayout() {
  const auth = usePowerPayAuth();
  if (!auth.isLoaded) return null;
  if (auth.configured && !auth.isSignedIn) return <Redirect href="/sign-in" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#7B847E',
        tabBarStyle: {
          height: 78,
          paddingTop: 7,
          paddingBottom: 10,
          borderTopColor: colors.border,
          backgroundColor: colors.surface,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: icon('home-outline') }} />
      <Tabs.Screen name="pay" options={{ title: 'Pay', tabBarIcon: icon('paper-plane-outline') }} />
      <Tabs.Screen name="scan" options={{ title: 'Scan', tabBarIcon: ({ color }) => <Ionicons name="scan" color={color} size={28} /> }} />
      <Tabs.Screen name="activity" options={{ title: 'Activity', tabBarIcon: icon('receipt-outline') }} />
      <Tabs.Screen name="wallet" options={{ title: 'Wallet', tabBarIcon: icon('wallet-outline') }} />
    </Tabs>
  );
}
