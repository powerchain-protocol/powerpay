import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { PowerPayLogo } from './PowerPayLogo';
import { BrandMark } from './BrandMark';
import { colors } from '@/styles/theme';
import { usePowerPayAuth } from '@/providers/AuthProvider';
import { usePowerPayNotifications } from '@/hooks/useNotifications';

export function AppHeader({ unread: unreadOverride }: { unread?: number }) {
  const auth = usePowerPayAuth();
  const notifications = usePowerPayNotifications(20);
  const unread = unreadOverride ?? notifications.unread;
  return (
    <View style={styles.header}>
      <View style={styles.brand}><BrandMark size={24} /><PowerPayLogo size={26} /></View>
      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Notifications${unread ? `, ${unread} unread` : ''}`}
          style={styles.iconButton}
          onPress={() => router.push('/notifications')}
        >
          <Ionicons name="notifications-outline" size={22} color={colors.text} />
          {unread > 0 ? <View style={styles.badge}><Text style={styles.badgeText}>{Math.min(unread, 9)}</Text></View> : null}
        </Pressable>
        <Pressable accessibilityRole="button" accessibilityLabel="Profile" style={styles.avatar} onPress={() => router.push('/profile')}>
          <Text style={styles.avatarText}>{auth.initials}</Text>
        </Pressable>
        <Pressable accessibilityRole="button" accessibilityLabel="Settings" style={styles.iconButton} onPress={() => router.push('/profile')}>
          <Ionicons name="settings-outline" size={22} color={colors.text} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconButton: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  avatar: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#E7F2EB', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.primary, fontWeight: '700', fontSize: 12 },
  badge: { position: 'absolute', top: 5, right: 4, minWidth: 16, height: 16, borderRadius: 8, backgroundColor: colors.danger, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 3 },
  badgeText: { color: colors.white, fontSize: 9, fontWeight: '700' },
});
