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
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS, SCREEN_WIDTH, SCREEN_HEIGHT, IS_SMALL_SCREEN } from '../../src/constants/theme';

const width = SCREEN_WIDTH;
const height = SCREEN_HEIGHT;

export default function IncomingRide() {
  const router = useRouter();
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>New Ride Request</Text>
        <TouchableOpacity style={styles.closeBtn} onPress={handleReject}>
          <X size={24} color={COLORS.textDark} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <Animated.View style={[styles.pulseCircle, animatedCircle]} />
          <View style={styles.avatar}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }} 
              style={styles.avatarImg}
            />
          </View>
        </View>

        <Text style={styles.userName}>Anjali Sharma</Text>
        <View style={styles.ratingContainer}>
          <Star size={16} color="#FFD700" fill="#FFD700" />
          <Text style={styles.ratingText}>4.8 (120+ rides)</Text>
        </View>

        <View style={styles.fareCard}>
          <Text style={styles.fareLabel}>Estimated Fare</Text>
          <Text style={styles.fareValue}>₹145.50</Text>
        </View>

        <View style={styles.locationCard}>
          <View style={styles.locationRow}>
            <View style={[styles.dot, { backgroundColor: COLORS.success }]} />
            <View>
              <Text style={styles.locationLabel}>Pickup</Text>
              <Text style={styles.locationText}>HSR Layout, Sector 7, Bangalore</Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.locationRow}>
            <View style={[styles.dot, { backgroundColor: COLORS.primary }]} />
            <View>
              <Text style={styles.locationLabel}>Drop</Text>
              <Text style={styles.locationText}>Indiranagar, 100ft Road, Bangalore</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Distance</Text>
            <Text style={styles.infoValue}>4.5 km</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Time</Text>
            <Text style={styles.infoValue}>12 mins</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.rejectBtn} onPress={handleReject}>
          <Text style={styles.rejectBtnText}>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.acceptBtn} onPress={handleAccept}>
          <Check size={24} color={COLORS.textLight} />
          <Text style={styles.acceptBtnText}>Accept Ride</Text>
        </TouchableOpacity>
      </View>
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
    paddingVertical: IS_SMALL_SCREEN ? SPACING.md : SPACING.lg,
  },
  headerTitle: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 20,
    color: COLORS.textDark,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.cardBackground,
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
    backgroundColor: COLORS.primary,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: COLORS.cardBackground,
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
    color: COLORS.textDark,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontFamily: FONTS.inter.medium,
    fontSize: 14,
    color: COLORS.textGray,
    marginLeft: 6,
  },
  fareCard: {
    backgroundColor: COLORS.primary + '10',
    paddingHorizontal: IS_SMALL_SCREEN ? SPACING.lg : SPACING.xl,
    paddingVertical: IS_SMALL_SCREEN ? SPACING.sm : SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginTop: IS_SMALL_SCREEN ? SPACING.lg : SPACING.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary + '20',
  },
  fareLabel: {
    fontFamily: FONTS.inter.medium,
    fontSize: 12,
    color: COLORS.primary,
    textTransform: 'uppercase',
  },
  fareValue: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 28,
    color: COLORS.primary,
  },
  locationCard: {
    width: '100%',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: IS_SMALL_SCREEN ? SPACING.md : SPACING.lg,
    marginTop: IS_SMALL_SCREEN ? SPACING.lg : SPACING.xl,
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: COLORS.border,
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
    color: COLORS.textGray,
  },
  locationText: {
    fontFamily: FONTS.inter.semiBold,
    fontSize: 15,
    color: COLORS.textDark,
    marginTop: 2,
  },
  line: {
    width: 1,
    height: 25,
    backgroundColor: COLORS.border,
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
    backgroundColor: COLORS.cardBackground,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginHorizontal: 4,
    alignItems: 'center',
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoLabel: {
    fontFamily: FONTS.inter.medium,
    fontSize: 12,
    color: COLORS.textGray,
  },
  infoValue: {
    fontFamily: FONTS.poppins.semiBold,
    fontSize: 16,
    color: COLORS.textDark,
  },
  footer: {
    flexDirection: 'row',
    padding: IS_SMALL_SCREEN ? SPACING.lg : SPACING.xl,
    backgroundColor: COLORS.cardBackground,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  rejectBtn: {
    flex: 1,
    height: 60,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  rejectBtnText: {
    fontFamily: FONTS.poppins.semiBold,
    fontSize: 16,
    color: COLORS.textGray,
  },
  acceptBtn: {
    flex: 2,
    height: 60,
    backgroundColor: COLORS.primary,
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
