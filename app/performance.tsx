import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Star, TrendingUp, Award, Zap, ArrowLeft } from 'lucide-react-native';
import { COLORS, DARK_COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../src/constants/theme';
import { useAuthStore } from '../src/store/useAuthStore';

export default function Performance() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isDarkMode } = useAuthStore();
  const activeColors = isDarkMode ? DARK_COLORS : COLORS;

  const StatBox = ({ title, value, icon: Icon, color }: any) => (
    <View style={[styles.statBox, { backgroundColor: activeColors.cardBackground, borderColor: activeColors.border }]}>
      <View style={[styles.statIcon, { backgroundColor: color + '15' }]}>
        <Icon size={24} color={color} />
      </View>
      <Text style={[styles.statValue, { color: activeColors.textDark }]}>{value}</Text>
      <Text style={[styles.statTitle, { color: activeColors.textGray }]}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: activeColors.background }]} edges={[]}>
      <View style={[
        styles.header,
        { 
          paddingTop: Platform.OS === 'web' ? SPACING.md : insets.top + SPACING.sm,
          backgroundColor: activeColors.background,
          borderBottomColor: activeColors.border
        }
      ]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={24} color={activeColors.textDark} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: activeColors.textDark }]}>Performance & Rewards</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.statsGrid}>
          <StatBox title="Rating" value="4.9" icon={Star} color="#F59E0B" />
          <StatBox title="Acceptance" value="98%" icon={TrendingUp} color={activeColors.success} />
          <StatBox title="Cancellation" value="2%" icon={Zap} color={activeColors.error} />
          <StatBox title="Points" value="1,250" icon={Award} color={activeColors.primary} />
        </View>

        <View style={[styles.rewardsCard, { backgroundColor: activeColors.cardBackground, borderColor: activeColors.border }]}>
          <Text style={[styles.rewardsTitle, { color: activeColors.textDark }]}>Monthly Rewards</Text>
          <Text style={[styles.rewardsSub, { color: activeColors.textGray }]}>Complete 50 more rides to reach Gold status!</Text>
          <View style={[styles.progressBar, { backgroundColor: activeColors.border }]}>
            <View style={[styles.progressFill, { backgroundColor: activeColors.primary, width: '75%' }]} />
          </View>
          <View style={styles.progressTextRow}>
            <Text style={[styles.progressText, { color: activeColors.textGray }]}>150/200 Rides</Text>
            <Text style={[styles.progressText, { color: activeColors.textGray }]}>Gold Status</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 18,
    marginLeft: SPACING.md,
  },
  scrollContent: {
    padding: SPACING.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    marginBottom: SPACING.xl,
    justifyContent: 'space-between',
  },
  statBox: {
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    width: '47.5%',
    alignItems: 'center',
    borderWidth: 1,
    ...SHADOWS.light,
  },
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  statValue: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 20,
  },
  statTitle: {
    fontFamily: FONTS.inter.medium,
    fontSize: 12,
  },
  rewardsCard: {
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
    borderWidth: 1,
    ...SHADOWS.medium,
  },
  rewardsTitle: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 18,
  },
  rewardsSub: {
    fontFamily: FONTS.inter.medium,
    fontSize: 14,
    marginTop: 4,
    marginBottom: SPACING.lg,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    fontFamily: FONTS.inter.bold,
    fontSize: 12,
  },
});
