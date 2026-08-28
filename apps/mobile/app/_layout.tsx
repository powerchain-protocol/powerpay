import '@/lib/polyfills';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProviders } from '@/providers/AppProviders';

export default function RootLayout() {
  return (
    <AppProviders>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="checkout/[id]" />
          <Stack.Screen name="receipt/[id]" />
          <Stack.Screen name="notifications" />
          <Stack.Screen name="profile/index" />
          <Stack.Screen name="profile/security/pin" />
        </Stack>
      </SafeAreaProvider>
    </AppProviders>
  );
}
