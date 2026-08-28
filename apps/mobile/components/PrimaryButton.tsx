import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius } from '@/styles/theme';

export function PrimaryButton({ label, onPress, disabled = false, loading = false }: { label: string; onPress: () => void; disabled?: boolean; loading?: boolean }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled, busy: loading }}
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [styles.button, (pressed || disabled) && styles.pressed]}
    >
      {loading ? <ActivityIndicator color={colors.white} /> : <Text style={styles.text}>{label}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { minHeight: 54, borderRadius: radius.md, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18 },
  pressed: { opacity: 0.72 },
  text: { color: colors.white, fontSize: 16, fontWeight: '700' },
});
