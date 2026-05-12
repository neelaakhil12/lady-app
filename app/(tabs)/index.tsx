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
  Bell,   Navigation, 
  TrendingUp, 
  Clock, 
  Star,
  ChevronRight
} from 'lucide-react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../src/constants/theme';

const StatCard = ({ title, value, icon: Icon, color, cardWidth }: any) => (
  <View style={[styles.statCard, { width: cardWidth }]}>
    <View style={[styles.statIcon, { backgroundColor: color + '15' }]}>
      <Icon size={20} color={color} />
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
  </View>
);

export default function Dashboard() {
  const [isOnline, setIsOnline] = useState(false);
  const { user } = useAuthStore();
  const { width: windowWidth } = useWindowDimensions();
  const width = Platform.OS === 'web' ? Math.min(windowWidth, 450) : windowWidth;

  const isSmall = width < 400;
  const responsivePadding = isSmall ? SPACING.md : SPACING.xl;
  const cardWidth = (width - (responsivePadding * 2) - SPACING.md) / 2;

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingHorizontal: responsivePadding }]}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.firstName || 'Captain'}!</Text>
          <Text style={styles.statusText}>
            You are {isOnline ? 'Online' : 'Offline'}
          </Text>
        </View>
        <TouchableOpacity style={styles.notificationBtn}>
          <Bell size={24} color={COLORS.textDark} />
          <View style={styles.badge} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: responsivePadding }]} 
        showsVerticalScrollIndicator={false}
      >
        {/* Online/Offline Toggle Card */}
        <View style={[styles.toggleCard, { backgroundColor: isOnline ? COLORS.success : COLORS.cardBackground }]}>
          <View style={{ flex: 1, marginRight: SPACING.md }}>
            <Text style={[styles.toggleTitle, { color: isOnline ? COLORS.textLight : COLORS.textDark }]}>
              {isOnline ? 'Ready to accept rides' : 'Go online to start earning'}
            </Text>
            <Text style={[styles.toggleSubtitle, { color: isOnline ? COLORS.textLight + 'CC' : COLORS.textGray }]}>
              {isOnline ? 'Searching for nearby requests...' : 'You won\'t receive any requests'}
            </Text>
          </View>
          <Switch
            value={isOnline}
            onValueChange={setIsOnline}
            trackColor={{ false: COLORS.border, true: COLORS.textLight + '50' }}
            thumbColor={isOnline ? COLORS.textLight : COLORS.border}
          />
        </View>

        {/* Earnings Summary */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Summary</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>View Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsGrid}>
          <StatCard 
            title="Earnings" 
            value="₹1,250" 
            icon={TrendingUp} 
            color={COLORS.primary} 
            cardWidth={cardWidth}
          />
          <StatCard 
            title="Rides" 
            value="8" 
            icon={Navigation} 
            color={COLORS.accent} 
            cardWidth={cardWidth}
          />
          <StatCard 
            title="Hours" 
            value="5.5h" 
            icon={Clock} 
            color="#FF9800" 
            cardWidth={cardWidth}
          />
          <StatCard 
            title="Rating" 
            value="4.9" 
            icon={Star} 
            color="#4CAF50" 
            cardWidth={cardWidth}
          />
        </View>

        {/* Active/Pending Requests */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Requests</Text>
        </View>

        {!isOnline ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              Go online to see nearby ride requests
            </Text>
          </View>
        ) : (
          <View style={styles.requestCard}>
            <View style={styles.requestHeader}>
              <View style={styles.userInfo}>
                <View style={styles.userAvatar} />
                <View>
                  <Text style={styles.userName}>Anjali Sharma</Text>
                  <Text style={styles.userRating}>⭐ 4.8</Text>
                </View>
              </View>
              <Text style={styles.fareText}>₹145</Text>
            </View>

            <View style={styles.locationContainer}>
              <View style={styles.locationRow}>
                <View style={[styles.dot, { backgroundColor: COLORS.success }]} />
                <Text style={styles.locationText} numberOfLines={1}>
                  HSR Layout, Sector 7
                </Text>
              </View>
              <View style={styles.line} />
              <View style={styles.locationRow}>
                <View style={[styles.dot, { backgroundColor: COLORS.primary }]} />
                <Text style={styles.locationText} numberOfLines={1}>
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
          <TouchableOpacity key={item} style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Navigation size={20} color={COLORS.primary} />
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>Ride Completed</Text>
              <Text style={styles.activityTime}>Today, 2:30 PM</Text>
            </View>
            <Text style={styles.activityAmount}>+₹120</Text>
            <ChevronRight size={18} color={COLORS.textGray} />
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
    paddingVertical: SPACING.lg,
    width: '100%',
  },
  greeting: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 24,
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
  scrollContent: {
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
    color: COLORS.primary,
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
    color: COLORS.primary,
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
});
