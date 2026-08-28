import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { AuthView } from '@clerk/expo/native';
import { PowerPayLogo } from '@/components/PowerPayLogo';
import { usePowerPayAuth } from '@/providers/AuthProvider';
import { colors, radius } from '@/styles/theme';

export default function SignInScreen() {
  const auth = usePowerPayAuth();
  if (auth.configured) return <View style={styles.root}><View style={styles.brand}><PowerPayLogo size={28} /></View><View style={styles.auth}><AuthView mode="signIn" isDismissible={false} /></View></View>;
  return <View style={styles.root}><View style={styles.brand}><PowerPayLogo size={28} /></View><View style={styles.devCard}><Text style={styles.title}>Development authentication</Text><Text style={styles.text}>Clerk is not configured in this build. Production builds should set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY and require server JWT verification.</Text><Pressable style={styles.button} onPress={() => router.replace('/')}><Text style={styles.buttonText}>Continue locally</Text></Pressable></View></View>;
}

const styles = StyleSheet.create({ root: { flex: 1, backgroundColor: colors.canvas, paddingHorizontal: 20, paddingTop: 56 }, brand: { marginBottom: 24 }, auth: { flex: 1 }, devCard: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card, padding: 18 }, title: { color: colors.text, fontSize: 20, fontWeight: '800' }, text: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 8 }, button: { minHeight: 52, borderRadius: radius.md, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginTop: 20 }, buttonText: { color: colors.white, fontSize: 13, fontWeight: '800' } });
