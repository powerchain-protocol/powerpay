import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/styles/theme';

export function PageHeader({ title, right }: { title: string; right?: React.ReactNode }) {
  return <View style={styles.row}><Pressable style={styles.button} onPress={() => router.back()} accessibilityLabel="Back"><Ionicons name="chevron-back" size={22} color={colors.text} /></Pressable><Text style={styles.title}>{title}</Text><View style={styles.right}>{right}</View></View>;
}

const styles = StyleSheet.create({
  row: { minHeight: 58, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  button: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', marginLeft: -10 },
  title: { color: colors.text, fontSize: 17, fontWeight: '700' },
  right: { width: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
});
