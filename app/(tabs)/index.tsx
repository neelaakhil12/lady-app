import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  Platform,
  useWindowDimensions
} from 'react-native';
import { useAuthStore } from '../../src/store/useAuthStore';
import {
  Bell, Navigation,
  TrendingUp,
  Clock,
  Star,
  ChevronRight,
  Menu,
  X,
  Moon,
  Sun,
  Zap,
  MapPin
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, DARK_COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../src/constants/theme';

const StatCard = ({ title, value, icon: Icon, color, cardWidth, activeColors }: any) => (
  <View style={[styles.statCard, { width: cardWidth, backgroundColor: activeColors.cardBackground, borderColor: activeColors.border }]}>
    <View style={[styles.statIcon, { backgroundColor: color + '15' }]}>
      <Icon size={20} color={color} />
    </View>
    <Text style={[styles.statValue, { color: activeColors.textDark }]}>{value}</Text>
    <Text style={[styles.statTitle, { color: activeColors.textGray }]}>{title}</Text>
  </View>
);

export default function Dashboard() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, isDarkMode, toggleDarkMode } = useAuthStore();
  const [isOnline, setIsOnline] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const activeColors = isDarkMode ? DARK_COLORS : COLORS;

  const { width: windowWidth } = useWindowDimensions();
  const width = Platform.OS === 'web' ? Math.min(windowWidth, 450) : windowWidth;

  const isSmall = width < 400;
  const responsivePadding = isSmall ? SPACING.md : SPACING.xl;
  const cardWidth = (width - (responsivePadding * 2) - SPACING.md) / 2;

  return (
    <View style={[styles.container, { backgroundColor: activeColors.background }]}>
      <View style={[
        styles.header,
        {
          paddingHorizontal: responsivePadding,
          paddingTop: Platform.OS === 'web' ? SPACING.lg : insets.top + SPACING.sm,
          backgroundColor: activeColors.background
        }
      ]}>
        <View>
          <Text style={[styles.greeting, { color: activeColors.textDark }]}>Hello, {user?.firstName || 'Captain'}!</Text>
          <Text style={styles.statusText}>
            You are {isOnline ? 'Online' : 'Offline'}
          </Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={[styles.notificationBtn, { backgroundColor: activeColors.cardBackground }]}
            onPress={() => router.push('/notifications')}
          >
            <Bell size={24} color={activeColors.textDark} />
            <View style={styles.badge} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.notificationBtn, { marginLeft: SPACING.sm, backgroundColor: activeColors.cardBackground }]}
            onPress={() => setShowMenu(true)}
          >
            <Menu size={24} color={activeColors.textDark} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Hamburger Menu Overlay */}
      {showMenu && (
        <TouchableOpacity
          style={styles.menuOverlay}
          activeOpacity={1}
          onPress={() => setShowMenu(false)}
        >
          <View style={[styles.menuContent, {
            paddingTop: insets.top + SPACING.md,
            backgroundColor: activeColors.cardBackground
          }]}>
            <View style={styles.menuHeader}>
              <Text style={[styles.menuTitle, { color: activeColors.textDark }]}>Quick Menu</Text>
              <TouchableOpacity onPress={() => setShowMenu(false)}>
                <X size={24} color={activeColors.textDark} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.menuItem, { borderBottomColor: activeColors.border }]}
              onPress={() => {
                setShowMenu(false);
                router.push('/go-to-area');
              }}
            >
              <View style={[styles.menuIcon, { backgroundColor: isDarkMode ? '#FFFFFF15' : activeColors.primary + '15' }]}>
                <MapPin size={20} color={isDarkMode ? '#F8FAFC' : activeColors.primary} />
              </View>
              <View style={styles.menuItemContent}>
                <Text style={[styles.menuItemText, { color: isDarkMode ? '#FFFFFF' : '#111827' }]}>Go to Area</Text>
              </View>
              <ChevronRight size={18} color={activeColors.textGray} />
            </TouchableOpacity>

            <View style={[styles.menuItem, { borderBottomColor: activeColors.border }]}>
              <View style={[styles.menuIcon, { backgroundColor: isDarkMode ? '#10B98120' : COLORS.success + '15' }]}>
                <Zap size={20} color={isDarkMode ? '#10B981' : COLORS.success} />
              </View>
              <View style={styles.menuItemContent}>
                <Text style={[styles.menuItemText, { color: isDarkMode ? '#FFFFFF' : '#111827' }]}>Go Live</Text>
              </View>
              <Switch
                value={isOnline}
                onValueChange={(val) => setIsOnline(val)}
                trackColor={{ false: '#DDD', true: activeColors.primary + '80' }}
                thumbColor={isOnline ? activeColors.primary : '#FFF'}
              />
            </View>

            <View style={[styles.menuItem, { borderBottomColor: activeColors.border }]}>
              <View style={[styles.menuIcon, { backgroundColor: isDarkMode ? '#F59E0B20' : '#1E3A8A20' }]}>
                {isDarkMode ? <Sun size={20} color="#F59E0B" /> : <Moon size={20} color="#1E3A8A" />}
              </View>
              <View style={styles.menuItemContent}>
                <Text style={[styles.menuItemText, { color: isDarkMode ? '#FFFFFF' : '#111827' }]}>Dark Mode</Text>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={toggleDarkMode}
                trackColor={{ false: '#DDD', true: activeColors.primary + '80' }}
                thumbColor={isDarkMode ? activeColors.primary : '#FFF'}
              />
            </View>
          </View>
        </TouchableOpacity>
      )}

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: responsivePadding }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Earnings Summary */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: activeColors.textDark }]}>Today's Summary</Text>
          <TouchableOpacity>
            <Text style={[styles.seeAll, { color: activeColors.primary }]}>View Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsGrid}>
          <StatCard
            title="Total Rides"
            value="48"
            icon={Navigation}
            color="#10B981"
            cardWidth={cardWidth}
            activeColors={activeColors}
          />
          <StatCard
            title="Total Earnings"
            value="₹4,250"
            icon={TrendingUp}
            color="#F59E0B"
            cardWidth={cardWidth}
            activeColors={activeColors}
          />
        </View>

        <View style={[styles.statsGrid, { marginTop: -SPACING.sm }]}>
          <StatCard
            title="Online Hours"
            value="32h"
            icon={Clock}
            color="#10B981"
            cardWidth={cardWidth}
            activeColors={activeColors}
          />
          <StatCard
            title="Rating"
            value="4.8"
            icon={Star}
            color="#F59E0B"
            cardWidth={cardWidth}
            activeColors={activeColors}
          />
        </View>

        {/* Active/Pending Requests */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: activeColors.textDark }]}>Nearby Requests</Text>
        </View>

        {!isOnline ? (
          <View style={[styles.emptyState, { backgroundColor: activeColors.cardBackground, borderColor: activeColors.border }]}>
            <Text style={[styles.emptyStateText, { color: activeColors.textGray }]}>
              Go online to see nearby ride requests
            </Text>
          </View>
        ) : (
          <View style={[styles.requestCard, { backgroundColor: activeColors.cardBackground, borderColor: activeColors.border }]}>
            <View style={styles.requestHeader}>
              <View style={styles.userInfo}>
                <View style={styles.userAvatar} />
                <View>
                  <Text style={[styles.userName, { color: activeColors.textDark }]}>Anjali Sharma</Text>
                  <Text style={[styles.userRating, { color: activeColors.textGray }]}>⭐ 4.8</Text>
                </View>
              </View>
              <Text style={[styles.fareText, { color: activeColors.primary }]}>₹145</Text>
            </View>

            <View style={styles.locationContainer}>
              <View style={styles.locationRow}>
                <View style={[styles.dot, { backgroundColor: COLORS.success }]} />
                <Text style={[styles.locationText, { color: activeColors.textDark }]} numberOfLines={1}>
                  HSR Layout, Sector 7
                </Text>
              </View>
              <View style={[styles.line, { backgroundColor: activeColors.border }]} />
              <View style={styles.locationRow}>
                <View style={[styles.dot, { backgroundColor: activeColors.primary }]} />
                <Text style={[styles.locationText, { color: activeColors.textDark }]} numberOfLines={1}>
                  Indiranagar, 100ft Road
                </Text>
              </View>
            </View>

            <View style={styles.requestFooter}>
              <TouchableOpacity style={styles.rejectBtn}>
                <Text style={styles.rejectBtnText}>Reject</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.acceptBtn}>
                <Text style={styles.acceptBtnText}>Accept Ride</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Recent Activity */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
        </View>

        {[1, 2].map((item) => (
          <TouchableOpacity key={item} style={[styles.activityItem, { backgroundColor: activeColors.cardBackground, borderColor: activeColors.border }]}>
            <View style={[styles.activityIcon, { backgroundColor: activeColors.primary + '15' }]}>
              <Navigation size={20} color={activeColors.primary} />
            </View>
            <View style={styles.activityInfo}>
              <Text style={[styles.activityTitle, { color: activeColors.textDark }]}>Ride Completed</Text>
              <Text style={[styles.activityTime, { color: activeColors.textGray }]}>Today, 2:30 PM</Text>
            </View>
            <Text style={styles.activityAmount}>+₹120</Text>
            <ChevronRight size={18} color={activeColors.textGray} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greeting: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 20,
    color: COLORS.textDark,
  },
  statusText: {
    fontFamily: FONTS.inter.medium,
    fontSize: 14,
    color: COLORS.textGray,
    marginTop: -4,
  },
  notificationBtn: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: COLORS.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.light,
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.cardBackground,
  },
  areaShortcut: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
    borderWidth: 1,
    borderColor: COLORS.primary + '10',
  },
  areaShortcutIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary + '10',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  areaShortcutTitle: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 16,
    color: COLORS.textDark,
  },
  areaShortcutSub: {
    fontFamily: FONTS.inter.medium,
    fontSize: 12,
    color: COLORS.textGray,
  },
  scrollContent: {
    paddingTop: SPACING.xl,
    paddingBottom: 100,
    width: '100%',
  },
  toggleCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.xl,
    ...SHADOWS.medium,
  },
  toggleTitle: {
    fontFamily: FONTS.poppins.semiBold,
    fontSize: 16,
  },
  toggleSubtitle: {
    fontFamily: FONTS.inter.regular,
    fontSize: 13,
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
    marginTop: SPACING.sm,
  },
  sectionTitle: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 18,
    color: COLORS.textDark,
  },
  seeAll: {
    fontFamily: FONTS.inter.medium,
    fontSize: 14,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
  },
  statCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  statValue: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 20,
    color: COLORS.textDark,
  },
  statTitle: {
    fontFamily: FONTS.inter.regular,
    fontSize: 12,
    color: COLORS.textGray,
  },
  emptyState: {
    height: 150,
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.xl,
  },
  emptyStateText: {
    fontFamily: FONTS.inter.medium,
    fontSize: 14,
    color: COLORS.textGray,
  },
  requestCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    ...SHADOWS.medium,
    borderWidth: 1,
    borderColor: COLORS.primary + '20',
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.secondary + '30',
    marginRight: SPACING.sm,
  },
  userName: {
    fontFamily: FONTS.poppins.semiBold,
    fontSize: 16,
    color: COLORS.textDark,
  },
  userRating: {
    fontFamily: FONTS.inter.medium,
    fontSize: 12,
    color: COLORS.textGray,
  },
  fareText: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 20,
  },
  locationContainer: {
    marginBottom: SPACING.lg,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: SPACING.md,
  },
  locationText: {
    fontFamily: FONTS.inter.medium,
    fontSize: 14,
    color: COLORS.textDark,
    flex: 1,
  },
  line: {
    width: 1,
    height: 20,
    backgroundColor: COLORS.border,
    marginLeft: 3.5,
    marginVertical: 2,
  },
  requestFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rejectBtn: {
    flex: 1,
    height: 45,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  rejectBtnText: {
    fontFamily: FONTS.poppins.semiBold,
    fontSize: 14,
    color: COLORS.textGray,
  },
  acceptBtn: {
    flex: 2,
    height: 45,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.light,
  },
  acceptBtnText: {
    fontFamily: FONTS.poppins.semiBold,
    fontSize: 14,
    color: COLORS.textLight,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.light,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary + '10',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontFamily: FONTS.poppins.semiBold,
    fontSize: 14,
    color: COLORS.textDark,
  },
  activityTime: {
    fontFamily: FONTS.inter.regular,
    fontSize: 12,
    color: COLORS.textGray,
  },
  activityAmount: {
    fontFamily: FONTS.inter.bold,
    fontSize: 14,
    color: COLORS.success,
    marginRight: SPACING.sm,
  },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
  },
  menuContent: {
    width: '75%',
    height: '100%',
    alignSelf: 'flex-end',
    padding: SPACING.lg,
    ...SHADOWS.heavy,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  menuTitle: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 18,
    color: COLORS.textDark,
  },
  menuItem: {
    flexDirection: 'row',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  menuItemContent: {
    flex: 1,
    justifyContent: 'center',
  },
  menuItemText: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
  },
  menuContent: {
    width: '85%',
    height: '100%',
    alignSelf: 'flex-end',
    padding: SPACING.lg,
    ...SHADOWS.heavy,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xxl,
    paddingTop: SPACING.sm,
  },
  menuTitle: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 22,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  menuItemText: {
    fontFamily: FONTS.poppins.semiBold,
    fontSize: 17,
    flex: 1,
  },
  menuItemSub: {
    fontFamily: FONTS.inter.medium,
    fontSize: 13,
    color: COLORS.textGray,
    marginTop: 2,
  },
});
