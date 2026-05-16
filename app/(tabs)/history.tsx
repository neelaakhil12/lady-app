import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Search, 
  Filter, 
  MapPin, 
  ChevronRight,
  Star
} from 'lucide-react-native';
import { useAuthStore } from '../../src/store/useAuthStore';
import { COLORS, DARK_COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS, IS_SMALL_SCREEN } from '../../src/constants/theme';

const RideHistoryItem = ({ date, from, to, amount, status, rating, activeColors, isDarkMode }: any) => (
  <TouchableOpacity style={[styles.historyItem, { backgroundColor: activeColors.cardBackground, borderColor: activeColors.border }]}>
    <View style={styles.historyHeader}>
      <Text style={[styles.historyDate, { color: activeColors.textGray }]}>{date}</Text>
      <View style={[styles.statusBadge, { backgroundColor: status === 'Completed' ? COLORS.success + '15' : COLORS.error + '15' }]}>
        <Text style={[styles.statusText, { color: status === 'Completed' ? COLORS.success : COLORS.error }]}>
          {status}
        </Text>
      </View>
    </View>

    <View style={styles.locationContainer}>
      <View style={styles.locationRow}>
        <View style={[styles.dot, { backgroundColor: COLORS.success }]} />
        <Text style={[styles.locationText, { color: activeColors.textDark }]} numberOfLines={1}>{from}</Text>
      </View>
      <View style={[styles.line, { backgroundColor: activeColors.border }]} />
      <View style={styles.locationRow}>
        <View style={[styles.dot, { backgroundColor: isDarkMode ? '#F8FAFC' : activeColors.primary }]} />
        <Text style={[styles.locationText, { color: activeColors.textDark }]} numberOfLines={1}>{to}</Text>
      </View>
    </View>

    <View style={[styles.historyFooter, { borderTopColor: activeColors.border }]}>
      <View style={styles.ratingContainer}>
        <Star size={14} color="#F59E0B" fill="#F59E0B" />
        <Text style={[styles.ratingText, { color: activeColors.textDark }]}>{rating}</Text>
      </View>
      <Text style={[styles.amountText, { color: activeColors.textDark }]}>₹{amount}</Text>
    </View>
  </TouchableOpacity>
);

export default function History() {
  const { isDarkMode } = useAuthStore();
  const activeColors = isDarkMode ? DARK_COLORS : COLORS;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: activeColors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: activeColors.textDark }]}>Ride History</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: activeColors.cardBackground, borderColor: activeColors.border }]}>
          <Search size={20} color={activeColors.textGray} />
          <TextInput 
            placeholder="Search rides..." 
            style={[styles.searchInput, { color: activeColors.textDark }]}
            placeholderTextColor={activeColors.textGray}
          />
        </View>
        <TouchableOpacity style={[styles.filterBtn, { backgroundColor: activeColors.cardBackground, borderColor: activeColors.border }]}>
          <Filter size={20} color={activeColors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={[styles.sectionTitle, { color: activeColors.textGray }]}>Recent Rides</Text>
        
        <RideHistoryItem 
          date="Today, 2:30 PM"
          from="HSR Layout, Sector 7"
          to="Indiranagar, 100ft Road"
          amount="145"
          status="Completed"
          rating="5.0"
          activeColors={activeColors}
        />

        <RideHistoryItem 
          date="Yesterday, 11:15 AM"
          from="Koramangala 5th Block"
          to="MG Road, Metro Station"
          amount="210"
          status="Completed"
          rating="4.8"
          activeColors={activeColors}
        />

        <RideHistoryItem 
          date="May 10, 2026, 6:45 PM"
          from="Electronic City Phase 1"
          to="Sarjapur Road"
          amount="320"
          status="Completed"
          rating="5.0"
          activeColors={activeColors}
        />

        <RideHistoryItem 
          date="May 09, 2026, 9:20 AM"
          from="Whitefield, ITPL"
          to="Marathahalli Bridge"
          amount="180"
          status="Cancelled"
          rating="N/A"
          activeColors={activeColors}
        />

        <RideHistoryItem 
          date="May 08, 2026, 4:10 PM"
          from="BTM Layout 2nd Stage"
          to="Jayanagar 4th Block"
          amount="120"
          status="Completed"
          rating="4.9"
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
    paddingHorizontal: IS_SMALL_SCREEN ? SPACING.md : SPACING.xl,
    paddingVertical: SPACING.lg,
  },
  title: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 24,
    color: COLORS.textDark,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: IS_SMALL_SCREEN ? SPACING.md : SPACING.xl,
    marginBottom: SPACING.lg,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 50,
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: SPACING.sm,
    fontFamily: FONTS.inter.medium,
    fontSize: 14,
    color: COLORS.textDark,
  },
  filterBtn: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SPACING.md,
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  scrollContent: {
    paddingHorizontal: IS_SMALL_SCREEN ? SPACING.md : SPACING.xl,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontFamily: FONTS.poppins.semiBold,
    fontSize: 16,
    color: COLORS.textGray,
    marginBottom: SPACING.md,
  },
  historyItem: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  historyDate: {
    fontFamily: FONTS.inter.medium,
    fontSize: 14,
    color: COLORS.textGray,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
  },
  statusText: {
    fontFamily: FONTS.inter.bold,
    fontSize: 10,
    textTransform: 'uppercase',
  },
  locationContainer: {
    marginBottom: SPACING.md,
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
    height: 15,
    backgroundColor: COLORS.border,
    marginLeft: 3.5,
    marginVertical: 2,
  },
  historyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.md,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: FONTS.inter.semiBold,
    fontSize: 14,
    color: COLORS.textDark,
    marginLeft: 4,
  },
  amountText: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 18,
    color: COLORS.textDark,
  },
});
