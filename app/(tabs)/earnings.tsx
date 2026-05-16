import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  TrendingUp, 
  ArrowUpRight, 
  Calendar,
  ChevronRight,
  Download
} from 'lucide-react-native';
import { useAuthStore } from '../../src/store/useAuthStore';
import { COLORS, DARK_COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS, SCREEN_WIDTH, SCREEN_HEIGHT, IS_SMALL_SCREEN } from '../../src/constants/theme';

export default function Earnings() {
  const { isDarkMode } = useAuthStore();
  const activeColors = isDarkMode ? DARK_COLORS : COLORS;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: activeColors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: activeColors.textDark }]}>Earnings</Text>
        <TouchableOpacity style={[styles.downloadBtn, { backgroundColor: activeColors.cardBackground }]}>
          <Download size={20} color={isDarkMode ? '#F8FAFC' : activeColors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Total Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceValue}>₹4,850.00</Text>
          <View style={styles.balanceFooter}>
            <View style={styles.balanceStat}>
              <ArrowUpRight size={16} color={COLORS.success} />
              <Text style={styles.balanceStatText}>+12% from last week</Text>
            </View>
            <TouchableOpacity style={styles.withdrawBtn}>
              <Text style={styles.withdrawBtnText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Weekly Stats Chart Placeholder */}
        <View style={[styles.chartContainer, { backgroundColor: activeColors.cardBackground, borderColor: activeColors.border }]}>
          <View style={styles.chartHeader}>
            <Text style={[styles.chartTitle, { color: activeColors.textDark }]}>Weekly Performance</Text>
            <TouchableOpacity style={[styles.periodSelector, { backgroundColor: activeColors.background }]}>
              <Calendar size={16} color={activeColors.textGray} />
              <Text style={[styles.periodText, { color: activeColors.textGray }]}>This Week</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.chartPlaceholder}>
            {/* Simple bar chart representation */}
            {[40, 70, 50, 90, 60, 80, 45].map((height, index) => (
              <View key={index} style={styles.chartBarContainer}>
                <View style={[styles.chartBar, { height: height * 1.5, backgroundColor: index === 3 ? activeColors.primary : activeColors.primary + '40' }]} />
                <Text style={[styles.chartBarLabel, { color: activeColors.textGray }]}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Earnings Breakdown */}
        <Text style={[styles.sectionTitle, { color: activeColors.textDark }]}>Breakdown</Text>
        <View style={[styles.breakdownCard, { backgroundColor: activeColors.cardBackground, borderColor: activeColors.border }]}>
          <View style={styles.breakdownRow}>
            <Text style={[styles.breakdownLabel, { color: activeColors.textGray }]}>Ride Earnings</Text>
            <Text style={[styles.breakdownValue, { color: activeColors.textDark }]}>₹4,200</Text>
          </View>
          <View style={[styles.divider, { backgroundColor: activeColors.border }]} />
          <View style={styles.breakdownRow}>
            <Text style={[styles.breakdownLabel, { color: activeColors.textGray }]}>Incentives</Text>
            <Text style={[styles.breakdownValue, { color: activeColors.textDark }]}>₹500</Text>
          </View>
          <View style={[styles.divider, { backgroundColor: activeColors.border }]} />
          <View style={styles.breakdownRow}>
            <Text style={[styles.breakdownLabel, { color: activeColors.textGray }]}>Tips</Text>
            <Text style={[styles.breakdownValue, { color: activeColors.textDark }]}>₹150</Text>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: activeColors.textDark }]}>Recent Transactions</Text>
          <TouchableOpacity>
            <Text style={[styles.seeAll, { color: activeColors.primary }]}>See All</Text>
          </TouchableOpacity>
        </View>

        {[1, 2, 3].map((item) => (
          <TouchableOpacity key={item} style={[styles.transactionItem, { backgroundColor: activeColors.cardBackground, borderColor: activeColors.border }]}>
            <View style={[styles.transactionIcon, { backgroundColor: activeColors.success + '15' }]}>
              <TrendingUp size={20} color={activeColors.success} />
            </View>
            <View style={styles.transactionInfo}>
              <Text style={[styles.transactionTitle, { color: activeColors.textDark }]}>Ride Payment</Text>
              <Text style={[styles.transactionDate, { color: activeColors.textGray }]}>May 12, 2026 • 2:30 PM</Text>
            </View>
            <View style={styles.transactionAmountContainer}>
              <Text style={[styles.transactionAmount, { color: activeColors.textDark }]}>+₹145.00</Text>
              <Text style={styles.transactionStatus}>Completed</Text>
            </View>
          </TouchableOpacity>
        ))}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: IS_SMALL_SCREEN ? SPACING.md : SPACING.xl,
    paddingVertical: SPACING.lg,
  },
  title: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 24,
    color: COLORS.textDark,
  },
  downloadBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.light,
  },
  scrollContent: {
    paddingHorizontal: IS_SMALL_SCREEN ? SPACING.md : SPACING.xl,
    paddingBottom: 100,
  },
  balanceCard: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.lg,
    padding: IS_SMALL_SCREEN ? SPACING.lg : SPACING.xl,
    marginBottom: SPACING.xl,
    ...SHADOWS.medium,
  },
  balanceLabel: {
    fontFamily: FONTS.inter.medium,
    fontSize: 14,
    color: COLORS.textLight + 'CC',
  },
  balanceValue: {
    fontFamily: FONTS.poppins.bold,
    fontSize: IS_SMALL_SCREEN ? 28 : 36,
    color: COLORS.textLight,
    marginVertical: SPACING.xs,
  },
  balanceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  balanceStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceStatText: {
    fontFamily: FONTS.inter.medium,
    fontSize: 12,
    color: COLORS.textLight,
    marginLeft: 4,
  },
  withdrawBtn: {
    backgroundColor: COLORS.textLight,
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.round,
  },
  withdrawBtnText: {
    fontFamily: FONTS.poppins.semiBold,
    fontSize: 12,
    color: COLORS.primary,
  },
  chartContainer: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  chartTitle: {
    fontFamily: FONTS.poppins.semiBold,
    fontSize: 16,
    color: COLORS.textDark,
  },
  periodSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  periodText: {
    fontFamily: FONTS.inter.medium,
    fontSize: 12,
    color: COLORS.textGray,
    marginLeft: 4,
  },
  chartPlaceholder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
    paddingHorizontal: SPACING.sm,
  },
  chartBarContainer: {
    alignItems: 'center',
  },
  chartBar: {
    width: 12,
    borderRadius: 6,
  },
  chartBarLabel: {
    fontFamily: FONTS.inter.medium,
    fontSize: 10,
    color: COLORS.textGray,
    marginTop: SPACING.sm,
  },
  sectionTitle: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 18,
    color: COLORS.textDark,
    marginBottom: SPACING.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
    marginTop: SPACING.sm,
  },
  seeAll: {
    fontFamily: FONTS.inter.medium,
    fontSize: 14,
    color: COLORS.primary,
  },
  breakdownCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakdownLabel: {
    fontFamily: FONTS.inter.medium,
    fontSize: 14,
    color: COLORS.textGray,
  },
  breakdownValue: {
    fontFamily: FONTS.poppins.semiBold,
    fontSize: 16,
    color: COLORS.textDark,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.light,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.success + '10',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontFamily: FONTS.poppins.semiBold,
    fontSize: 14,
    color: COLORS.textDark,
  },
  transactionDate: {
    fontFamily: FONTS.inter.regular,
    fontSize: 12,
    color: COLORS.textGray,
  },
  transactionAmountContainer: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontFamily: FONTS.inter.bold,
    fontSize: 14,
    color: COLORS.textDark,
  },
  transactionStatus: {
    fontFamily: FONTS.inter.medium,
    fontSize: 10,
    color: COLORS.success,
  },
});
