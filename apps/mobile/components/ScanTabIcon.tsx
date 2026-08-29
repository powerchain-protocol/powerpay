import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { colors } from '@/styles/theme';

export function ScanTabIcon({ focused }: { focused: boolean }) {
  return (
    <View style={[styles.outer, focused && styles.outerFocused]}>
      <View style={styles.middle}>
        <View style={styles.inner}><Ionicons name="scan" size={25} color="#fff" /></View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  outer: { width: 58, height: 58, borderRadius: 20, backgroundColor: '#E0EAE4', padding: 3, marginTop: -19, shadowColor: '#0A120D', shadowOpacity: 0.14, shadowRadius: 12, shadowOffset: { width: 0, height: 7 }, elevation: 8 },
  outerFocused: { backgroundColor: '#CDE2D4' },
  middle: { flex: 1, borderRadius: 17, backgroundColor: '#FFFFFF', padding: 2 },
  inner: { flex: 1, borderRadius: 15, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#2F7C51' },
});
