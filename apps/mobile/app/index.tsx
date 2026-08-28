import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Redirect } from 'expo-router';
import { usePowerPayAuth } from '@/providers/AuthProvider';
import { hasCompletedOnboarding } from '@/services/onboarding';
import { colors } from '@/styles/theme';

export default function AppEntry() {
  const auth = usePowerPayAuth();
  const [onboarded, setOnboarded] = useState<boolean | null>(null);

  useEffect(() => { void hasCompletedOnboarding().then(setOnboarded); }, []);
  if (!auth.isLoaded || onboarded === null) return <View style={styles.root}><ActivityIndicator color={colors.primary} /></View>;
  if (auth.configured && !auth.isSignedIn) return <Redirect href="/sign-in" />;
  if (!onboarded) return <Redirect href="/welcome" />;
  return <Redirect href="/(tabs)" />;
}

const styles = StyleSheet.create({ root: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.canvas } });
