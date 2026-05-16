import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Bell, Star, Navigation, Info } from 'lucide-react-native';
import { COLORS, DARK_COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../src/constants/theme';
import { useAuthStore } from '../src/store/useAuthStore';

const NotificationItem = ({ title, body, time, icon: Icon, color, activeColors }: any) => (
  <TouchableOpacity style={[styles.notificationItem, { backgroundColor: activeColors.cardBackground }]}>
    <View style={[styles.iconBg, { backgroundColor: color + '15' }]}>
      <Icon size={22} color={color} />
    </View>
    <View style={styles.content}>
      <Text style={[styles.notifTitle, { color: activeColors.textDark }]}>{title}</Text>
      <Text style={[styles.notifBody, { color: activeColors.textGray }]}>{body}</Text>
      <Text style={[styles.notifTime, { color: activeColors.textGray }]}>{time}</Text>
    </View>
  </TouchableOpacity>
);

export default function Notifications() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isDarkMode } = useAuthStore();
  const activeColors = isDarkMode ? DARK_COLORS : COLORS;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: activeColors.background }]} edges={[]}>
      <View style={[
        styles.header,
        { 
          paddingTop: Platform.OS === 'web' ? SPACING.md : insets.top + SPACING.xs,
          backgroundColor: activeColors.background,
          borderBottomColor: activeColors.border
        }
      ]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={24} color={activeColors.textDark} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: activeColors.textDark }]}>Notifications</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <NotificationItem 
          title="New Ride Request"
          body="A passenger is looking for a ride near your location."
          time="2 mins ago"
          icon={Navigation}
          color={activeColors.primary}
          activeColors={activeColors}
        />
        <NotificationItem 
          title="Bonus Earned!"
          body="Congratulations! You've earned a ₹50 bonus for completing 5 rides today."
          time="1 hour ago"
          icon={Star}
          color="#F59E0B"
          activeColors={activeColors}
        />
        <NotificationItem 
          title="System Update"
          body="We've updated our terms of service. Please review them in the settings."
          time="5 hours ago"
          icon={Info}
          color={activeColors.accent}
          activeColors={activeColors}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 20,
    color: COLORS.textDark,
    marginLeft: SPACING.md,
  },
  scrollContent: {
    padding: SPACING.md,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
    ...SHADOWS.light,
  },
  iconBg: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  content: {
    flex: 1,
  },
  notifTitle: {
    fontFamily: FONTS.poppins.semiBold,
    fontSize: 16,
    color: COLORS.textDark,
  },
  notifBody: {
    fontFamily: FONTS.inter.regular,
    fontSize: 14,
    color: COLORS.textGray,
    marginTop: 2,
    lineHeight: 20,
  },
  notifTime: {
    fontFamily: FONTS.inter.medium,
    fontSize: 12,
    color: COLORS.textGray + '80',
    marginTop: 4,
  },
});
