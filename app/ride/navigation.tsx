import React, { useState } from 'react';
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
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { 
  Phone, 
  MessageSquare, 
  Shield, 
  Navigation, 
  ChevronUp,
  MapPin,
  MoreVertical
} from 'lucide-react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS, SCREEN_WIDTH, SCREEN_HEIGHT, IS_SMALL_SCREEN } from '../../src/constants/theme';

const width = SCREEN_WIDTH;
const height = SCREEN_HEIGHT;

export default function RideNavigation() {
  const router = useRouter();
  const [rideStatus, setRideStatus] = useState('pickup'); // 'pickup', 'started', 'completed'

  const handleStatusUpdate = () => {
    if (rideStatus === 'pickup') {
      setRideStatus('started');
    } else if (rideStatus === 'started') {
      setRideStatus('completed');
      router.replace('/(tabs)/history');
    }
  };

  return (
    <View style={styles.container}>
      {/* Map Background */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 12.9716,
          longitude: 77.5946,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker 
          coordinate={{ latitude: 12.9716, longitude: 77.5946 }}
          title="Pickup"
        >
          <View style={[styles.markerCircle, { backgroundColor: COLORS.success }]}>
            <MapPin size={16} color={COLORS.textLight} />
          </View>
        </Marker>
      </MapView>

      {/* Top Navigation Info */}
      <SafeAreaView style={styles.topInfo}>
        <View style={styles.navCard}>
          <View style={styles.navIconContainer}>
            <Navigation size={24} color={COLORS.textLight} />
          </View>
          <View style={styles.navDetails}>
            <Text style={styles.navDistance}>400m</Text>
            <Text style={styles.navInstruction}>Turn right onto 7th Main Road</Text>
          </View>
        </View>
      </SafeAreaView>

      {/* Floating Buttons */}
      <View style={styles.floatingButtons}>
        <TouchableOpacity style={styles.floatingBtn}>
          <Shield size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.floatingBtn}>
          <Navigation size={24} color={COLORS.accent} />
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet for Ride Details */}
      <BottomSheet
        snapPoints={['35%', '60%']}
        index={0}
        handleIndicatorStyle={{ backgroundColor: COLORS.border, width: 40 }}
        backgroundStyle={{ borderRadius: BORDER_RADIUS.xl }}
      >
        <View style={styles.sheetContent}>
          <View style={styles.passengerHeader}>
            <View style={styles.passengerInfo}>
              <View style={styles.avatar}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }} 
                  style={styles.avatarImg}
                />
              </View>
              <View>
                <Text style={styles.passengerName}>Anjali Sharma</Text>
                <Text style={styles.passengerStatus}>
                  {rideStatus === 'pickup' ? 'Heading to pickup' : 'Ride in progress'}
                </Text>
              </View>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionBtn}>
                <MessageSquare size={20} color={COLORS.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, { marginLeft: SPACING.sm }]}>
                <Phone size={20} color={COLORS.success} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.divider} />

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

          <View style={styles.footer}>
            <TouchableOpacity style={styles.moreBtn}>
              <MoreVertical size={24} color={COLORS.textGray} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.statusBtn, 
                { backgroundColor: rideStatus === 'pickup' ? COLORS.success : COLORS.primary }
              ]} 
              onPress={handleStatusUpdate}
            >
              <Text style={styles.statusBtnText}>
                {rideStatus === 'pickup' ? 'Arrived at Pickup' : 'Complete Ride'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height,
  },
  markerCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.textLight,
    ...SHADOWS.medium,
  },
  topInfo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: IS_SMALL_SCREEN ? SPACING.md : SPACING.xl,
    paddingTop: IS_SMALL_SCREEN ? SPACING.md : SPACING.xl,
  },
  navCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    ...SHADOWS.medium,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  navIconContainer: {
    width: 50,
    height: 50,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navDetails: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  navDistance: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 20,
    color: COLORS.textDark,
  },
  navInstruction: {
    fontFamily: FONTS.inter.medium,
    fontSize: 14,
    color: COLORS.textGray,
  },
  floatingButtons: {
    position: 'absolute',
    right: IS_SMALL_SCREEN ? SPACING.md : SPACING.xl,
    top: height * 0.2,
  },
  floatingBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
  },
  sheetContent: {
    flex: 1,
    paddingHorizontal: IS_SMALL_SCREEN ? SPACING.md : SPACING.xl,
    paddingTop: SPACING.sm,
  },
  passengerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  passengerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginRight: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.primary + '20',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  passengerName: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 18,
    color: COLORS.textDark,
  },
  passengerStatus: {
    fontFamily: FONTS.inter.medium,
    fontSize: 12,
    color: COLORS.primary,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
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
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
    paddingBottom: IS_SMALL_SCREEN ? SPACING.lg : SPACING.xl,
  },
  moreBtn: {
    width: 50,
    height: 50,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statusBtn: {
    flex: 1,
    height: 55,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.medium,
  },
  statusBtnText: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 16,
    color: COLORS.textLight,
  },
});
