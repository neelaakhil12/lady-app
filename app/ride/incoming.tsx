import React, { useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  Dimensions,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence,
  interpolate
} from 'react-native-reanimated';
import { MapPin, Star, X, Check } from 'lucide-react-native';
import { COLORS, DARK_COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS, SCREEN_WIDTH, SCREEN_HEIGHT, IS_SMALL_SCREEN } from '../../src/constants/theme';
import { useAuthStore } from '../../src/store/useAuthStore';

const width = SCREEN_WIDTH;
const height = SCREEN_HEIGHT;

export default function IncomingRide() {
  const router = useRouter();
  const { isDarkMode } = useAuthStore();
  const activeColors = isDarkMode ? DARK_COLORS : COLORS;
  const pulse = useSharedValue(1);

  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedCircle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulse.value }],
      opacity: interpolate(pulse.value, [1, 1.2], [0.6, 0]),
    };
  });

  const handleAccept = () => {
    router.replace('/ride/navigation');
  };

  const handleReject = () => {
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: activeColors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: activeColors.textDark }]}>New Ride Request</Text>
        <TouchableOpacity style={[styles.closeBtn, { backgroundColor: activeColors.cardBackground }]} onPress={handleReject}>
          <X size={24} color={activeColors.textDark} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <Animated.View style={[styles.pulseCircle, animatedCircle, { backgroundColor: activeColors.primary }]} />
          <View style={[styles.avatar, { borderColor: activeColors.cardBackground }]}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }} 
              style={styles.avatarImg}
            />
          </View>
        </View>

        <Text style={[styles.userName, { color: activeColors.textDark }]}>Anjali Sharma</Text>
        <View style={styles.ratingContainer}>
          <Star size={16} color="#F59E0B" fill="#F59E0B" />
          <Text style={[styles.ratingText, { color: activeColors.textGray }]}>4.8 (120+ rides)</Text>
        </View>

        <View style={[styles.fareCard, { backgroundColor: activeColors.primary + '15', borderColor: activeColors.primary + '30' }]}>
          <Text style={[styles.fareLabel, { color: activeColors.primary }]}>Estimated Fare</Text>
          <Text style={[styles.fareValue, { color: activeColors.primary }]}>₹145.50</Text>
        </View>

        <View style={[styles.locationCard, { backgroundColor: activeColors.cardBackground, borderColor: activeColors.border }]}>
          <View style={styles.locationRow}>
            <View style={[styles.dot, { backgroundColor: COLORS.success }]} />
            <View>
              <Text style={[styles.locationLabel, { color: activeColors.textGray }]}>Pickup</Text>
              <Text style={[styles.locationText, { color: activeColors.textDark }]}>HSR Layout, Sector 7, Bangalore</Text>
            </View>
          </View>
          <View style={[styles.line, { backgroundColor: activeColors.border }]} />
          <View style={styles.locationRow}>
            <View style={[styles.dot, { backgroundColor: activeColors.primary }]} />
            <View>
              <Text style={[styles.locationLabel, { color: activeColors.textGray }]}>Drop</Text>
              <Text style={[styles.locationText, { color: activeColors.textDark }]}>Indiranagar, 100ft Road, Bangalore</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoGrid}>
          <View style={[styles.infoItem, { backgroundColor: activeColors.cardBackground, borderColor: activeColors.border }]}>
            <Text style={[styles.infoLabel, { color: activeColors.textGray }]}>Distance</Text>
            <Text style={[styles.infoValue, { color: activeColors.textDark }]}>4.5 km</Text>
          </View>
          <View style={[styles.infoItem, { backgroundColor: activeColors.cardBackground, borderColor: activeColors.border }]}>
            <Text style={[styles.infoLabel, { color: activeColors.textGray }]}>Time</Text>
            <Text style={[styles.infoValue, { color: activeColors.textDark }]}>12 mins</Text>
          </View>
        </View>
      </View>

      <View style={[styles.footer, { backgroundColor: activeColors.cardBackground, borderTopColor: activeColors.border }]}>
        <TouchableOpacity style={[styles.rejectBtn, { borderColor: activeColors.border }]} onPress={handleReject}>
          <Text style={[styles.rejectBtnText, { color: activeColors.textGray }]}>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.acceptBtn, { backgroundColor: activeColors.primary }]} onPress={handleAccept}>
          <Check size={24} color={activeColors.textLight} />
          <Text style={styles.acceptBtnText}>Accept Ride</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: IS_SMALL_SCREEN ? SPACING.md : SPACING.xl,
    paddingVertical: IS_SMALL_SCREEN ? SPACING.md : SPACING.lg,
  },
  headerTitle: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 20,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.light,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: IS_SMALL_SCREEN ? SPACING.md : SPACING.xl,
  },
  avatarContainer: {
    marginTop: IS_SMALL_SCREEN ? SPACING.md : SPACING.xl,
    marginBottom: IS_SMALL_SCREEN ? SPACING.md : SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseCircle: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  userName: {
    fontFamily: FONTS.poppins.bold,
    fontSize: IS_SMALL_SCREEN ? 20 : 24,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontFamily: FONTS.inter.medium,
    fontSize: 14,
    marginLeft: 6,
  },
  fareCard: {
    paddingHorizontal: IS_SMALL_SCREEN ? SPACING.lg : SPACING.xl,
    paddingVertical: IS_SMALL_SCREEN ? SPACING.sm : SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginTop: IS_SMALL_SCREEN ? SPACING.lg : SPACING.xl,
    alignItems: 'center',
    borderWidth: 1,
  },
  fareLabel: {
    fontFamily: FONTS.inter.medium,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  fareValue: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 28,
  },
  locationCard: {
    width: '100%',
    borderRadius: BORDER_RADIUS.lg,
    padding: IS_SMALL_SCREEN ? SPACING.md : SPACING.lg,
    marginTop: IS_SMALL_SCREEN ? SPACING.lg : SPACING.xl,
    ...SHADOWS.light,
    borderWidth: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 6,
    marginRight: SPACING.md,
  },
  locationLabel: {
    fontFamily: FONTS.inter.medium,
    fontSize: 12,
  },
  locationText: {
    fontFamily: FONTS.inter.semiBold,
    fontSize: 15,
    marginTop: 2,
  },
  line: {
    width: 1,
    height: 25,
    marginLeft: 4.5,
    marginVertical: 4,
  },
  infoGrid: {
    flexDirection: 'row',
    width: '100%',
    marginTop: SPACING.lg,
  },
  infoItem: {
    flex: 1,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginHorizontal: 4,
    alignItems: 'center',
    ...SHADOWS.light,
    borderWidth: 1,
  },
  infoLabel: {
    fontFamily: FONTS.inter.medium,
    fontSize: 12,
  },
  infoValue: {
    fontFamily: FONTS.poppins.semiBold,
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    padding: IS_SMALL_SCREEN ? SPACING.lg : SPACING.xl,
    borderTopWidth: 1,
  },
  rejectBtn: {
    flex: 1,
    height: 60,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
    borderWidth: 1,
  },
  rejectBtnText: {
    fontFamily: FONTS.poppins.semiBold,
    fontSize: 16,
  },
  acceptBtn: {
    flex: 2,
    height: 60,
    borderRadius: BORDER_RADIUS.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.medium,
  },
  acceptBtnText: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 18,
    color: COLORS.textLight,
    marginLeft: SPACING.sm,
  },
});
