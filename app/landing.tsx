import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  StatusBar,
  useWindowDimensions,
  Platform,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { Car, ChevronRight } from 'lucide-react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../src/constants/theme';

export default function Landing() {
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const width = Platform.OS === 'web' ? Math.min(windowWidth, 450) : windowWidth;

  const isSmall = width < 400;

  const handleCaptainPress = () => {
    router.push('/onboarding');
  };



  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={[
        styles.overlay,
        { 
          paddingHorizontal: isSmall ? SPACING.md : SPACING.xl,
          paddingVertical: isSmall ? SPACING.xl : SPACING.xxl,
        }
      ]}>
        {/* Center Section */}
        <View style={[styles.header, { flex: 1, justifyContent: 'center' }]}>
          <Image 
            source={require('../assets/logo.png')} 
            style={[
              styles.logo,
              { width: isSmall ? 380 : 500, height: isSmall ? 190 : 250 }
            ]}
            resizeMode="contain"
          />
          <Text style={[styles.choiceTitle, { marginTop: SPACING.lg, marginBottom: 0 }]}>
            Become a Captain
          </Text>
        </View>

        {/* Bottom Section */}
        <View style={styles.content}>
          <TouchableOpacity 
            style={[styles.choiceCard, styles.activeCard]} 
            onPress={handleCaptainPress}
            activeOpacity={0.8}
          >
            <View style={[
              styles.iconContainer, 
              { 
                backgroundColor: COLORS.textLight + '20',
                width: isSmall ? 50 : 60,
                height: isSmall ? 50 : 60,
                borderRadius: isSmall ? 25 : 30,
              }
            ]}>
              <Car size={32} color={COLORS.textLight} />
            </View>
            <View style={styles.choiceDetails}>
              <Text style={[
                styles.choiceName, 
                { 
                  color: COLORS.textLight,
                  fontSize: isSmall ? 18 : 22 
                }
              ]}>Captain</Text>
              <Text style={[styles.choiceDesc, { color: COLORS.textLight + 'CC' }]}>I want to drive and earn</Text>
            </View>
            <ChevronRight size={24} color={COLORS.textLight} />
          </TouchableOpacity>
          
          <Text style={[styles.tagline, { textAlign: 'center', marginTop: SPACING.md, marginBottom: SPACING.xl }]}>
            Your ride, on demand
          </Text>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Made with ❤️ for women's safety</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    width: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
  },
  header: {
    alignItems: 'center',
  },
  logo: {
    marginBottom: SPACING.xs,
  },
  tagline: {
    fontFamily: FONTS.inter.medium,
    fontSize: 20,
    color: COLORS.textLight + 'CC',
    marginTop: 0,
  },
  content: {
    width: '100%',
  },
  choiceTitle: {
    fontFamily: FONTS.poppins.semiBold,
    fontSize: 24,
    color: COLORS.textLight,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  choiceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
  },
  activeCard: {
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: COLORS.textLight + '30',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  choiceDetails: {
    flex: 1,
  },
  choiceName: {
    fontFamily: FONTS.poppins.bold,
    color: COLORS.textDark,
  },
  choiceDesc: {
    fontFamily: FONTS.inter.regular,
    fontSize: 14,
    color: COLORS.textGray,
    marginTop: 2,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontFamily: FONTS.inter.medium,
    fontSize: 14,
    color: COLORS.textLight + '80',
  },
});
