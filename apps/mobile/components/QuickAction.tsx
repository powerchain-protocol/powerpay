import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '@/styles/theme';

type IconName = keyof typeof Ionicons.glyphMap;

export function QuickAction({ icon, label, onPress, disabled = false }: { icon: IconName; label: string; onPress: () => void; disabled?: boolean }) {
  return (
    <Pressable style={({ pressed }) => [styles.wrap, (pressed || disabled) && styles.dimmed]} onPress={onPress} disabled={disabled} accessibilityRole="button" accessibilityLabel={label} accessibilityState={{ disabled }}>
      <View style={[styles.icon, disabled && styles.iconDisabled]}><Ionicons name={icon} size={21} color={disabled ? colors.muted : colors.primary} /></View>
      <Text numberOfLines={1} style={[styles.label, disabled && styles.labelDisabled]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, minWidth: 68, alignItems: 'center', gap: 7 },
  dimmed: { opacity: 0.65 },
  icon: { width: 50, height: 50, borderRadius: radius.md, backgroundColor: '#E7F2EB', alignItems: 'center', justifyContent: 'center' },
  iconDisabled: { backgroundColor: '#F1F3F2' },
  label: { color: colors.text, fontSize: 12, fontWeight: '600' },
  labelDisabled: { color: colors.muted },
});
