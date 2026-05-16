import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Platform,
  useWindowDimensions
} from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, Home } from 'lucide-react-native';
import * as Location from 'expo-location';
import { useLocationStore } from '../../src/store/useLocationStore';
import { COLORS, DARK_COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../src/constants/theme';
import { useAuthStore } from '../../src/store/useAuthStore';
import { Alert, ActivityIndicator } from 'react-native';

export default function LocationAccess() {
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const width = Platform.OS === 'web' ? Math.min(windowWidth, 450) : windowWidth;
  const isSmall = width < 400;
  const responsivePadding = isSmall ? SPACING.md : SPACING.xl;
  const { isDarkMode } = useAuthStore();
  const activeColors = isDarkMode ? DARK_COLORS : COLORS;
  
  const { setLocation, setTracking } = useLocationStore();
  const [loading, setLoading] = React.useState(false);

  const handleAllow = async () => {
    try {
      setLoading(true);
      
      // Request permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Location access is required to find rides. Please enable it in your settings.',
          [{ text: 'OK' }]
        );
        setLoading(false);
        return;
      }

      // Get initial location
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      // Start watching location
      setTracking(true);
      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          distanceInterval: 10, // Update every 10 meters
        },
        (newLocation) => {
          setLocation({
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
          });
          console.log('Location updated:', newLocation.coords);
        }
      );

      router.push('/(auth)/register');
    } catch (error) {
      console.error('Location error:', error);
      Alert.alert('Error', 'Could not get your location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLater = () => {
    router.push('/(auth)/register');
  };

  return (
    <View style={[styles.container, { backgroundColor: activeColors.background }]}>
      <View style={[styles.content, { paddingHorizontal: responsivePadding }]}>
        {/* Graphic Area */}
        <View style={styles.graphicContainer}>
          <View style={[styles.circleBg, { backgroundColor: activeColors.cardBackground, borderColor: activeColors.border }]}>
            {/* Grid lines */}
            <View style={[styles.gridLineH, { backgroundColor: activeColors.border }]} />
            <View style={[styles.gridLineV, { backgroundColor: activeColors.border }]} />
            
            {/* Small house icons */}
            <View style={[styles.houseIcon, { top: '25%', left: '20%' }]}>
              <Home size={16} color={activeColors.textGray + '50'} />
            </View>
            <View style={[styles.houseIcon, { bottom: '25%', right: '20%' }]}>
              <Home size={16} color={activeColors.textGray + '50'} />
            </View>

            {/* Main Location Pin */}
            <View style={styles.pinContainer}>
              <MapPin size={40} color={activeColors.primary} fill={activeColors.primary + '20'} />
            </View>
          </View>
        </View>

        {/* Text Area */}
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: activeColors.textDark }]}>Allow Location Access</Text>
          <Text style={[styles.subtitle, { color: activeColors.textGray }]}>
            We need your location to find rides near you and show accurate pickup points
          </Text>
        </View>

        {/* Buttons Area */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.primaryButton, { backgroundColor: activeColors.primary }, loading && styles.buttonDisabled]}
            onPress={handleAllow}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={activeColors.textLight} />
            ) : (
              <Text style={styles.primaryButtonText}>Allow Location</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={handleLater}
          >
            <Text style={[styles.secondaryButtonText, { color: activeColors.primary }]}>Maybe Later</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    width: '100%',
    maxWidth: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  graphicContainer: {
    marginBottom: SPACING.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleBg: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  gridLineH: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: '#E0E0E0',
    top: '50%',
  },
  gridLineV: {
    position: 'absolute',
    width: 1,
    height: '100%',
    backgroundColor: '#E0E0E0',
    left: '50%',
  },
  houseIcon: {
    position: 'absolute',
    padding: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    ...SHADOWS.light,
  },
  pinContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.medium,
    zIndex: 10,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  title: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 24,
    color: COLORS.textDark,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  subtitle: {
    fontFamily: FONTS.inter.regular,
    fontSize: 16,
    color: COLORS.textGray,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: SPACING.md,
  },
  buttonContainer: {
    width: '100%',
    gap: SPACING.md,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    height: 60,
    borderRadius: BORDER_RADIUS.round,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.medium,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 18,
    color: COLORS.textLight,
  },
  secondaryButton: {
    backgroundColor: '#F0F0F8',
    height: 60,
    borderRadius: BORDER_RADIUS.round,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 18,
    color: COLORS.primary,
  },
});
