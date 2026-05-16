import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, useWindowDimensions, Platform, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../src/store/useAuthStore';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { ChevronRight } from 'lucide-react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../src/constants/theme';

const ONBOARDING_DATA = [
  {
    id: '1',
    title: 'Empowering Women Captains',
    description: 'Join our community of professional female riders and earn with safety and respect.',
    color: COLORS.primary,
    image: require('../assets/onboarding_bike.png'),
  },
  {
    id: '2',
    title: 'Flexible Earnings',
    description: 'Work on your own schedule. Track your daily earnings and withdraw anytime.',
    color: COLORS.secondary,
    image: require('../assets/onboarding_car.png'),
  },
  {
    id: '3',
    title: 'Safe & Secure Platform',
    description: 'Verified passengers and real-time ride monitoring for your complete peace of mind.',
    color: COLORS.accent,
    image: require('../assets/onboarding_auto.png'),
  },
];

const OnboardingItem = ({ item, scrollX, index, width }: any) => {
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0.8, 1, 0.8],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0.4, 1, 0.4],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <View style={[styles.itemContainer, { width }]}>
      <Animated.View style={[styles.imagePlaceholder, { backgroundColor: item.color + '10', width: width * 0.8, height: width * 0.8 }, animatedStyle]}>
        <Image 
          source={item.image} 
          style={styles.onboardingImage}
          resizeMode="cover"
        />
      </Animated.View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { fontSize: width < 400 ? 22 : 28 }]}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

export default function Onboarding() {
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const width = Platform.OS === 'web' ? Math.min(windowWidth, 450) : windowWidth;
  const { setFirstTime } = useAuthStore();
  const scrollX = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const isSmall = width < 400;

  const handleScroll = (event: any) => {
    scrollX.value = event.nativeEvent.contentOffset.x;
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleFinish = () => {
    setFirstTime(false);
    router.replace('/(auth)/login');
  };

  const handleNext = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      handleFinish();
    }
  };

  const handleSkip = () => {
    handleFinish();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.skipButton, { top: isSmall ? 30 : 50 }]} 
        onPress={handleSkip}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={ONBOARDING_DATA}
        renderItem={({ item, index }) => <OnboardingItem item={item} scrollX={scrollX} index={index} width={width} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />

      <View style={[styles.footer, { paddingHorizontal: isSmall ? SPACING.md : SPACING.xl, paddingBottom: isSmall ? SPACING.xl : SPACING.xxl }]}>
        <View style={styles.pagination}>
          {ONBOARDING_DATA.map((_, index) => {
            const dotStyle = useAnimatedStyle(() => {
              const dotWidth = interpolate(
                scrollX.value,
                [(index - 1) * width, index * width, (index + 1) * width],
                [8, 24, 8],
                Extrapolate.CLAMP
              );
              const opacity = interpolate(
                scrollX.value,
                [(index - 1) * width, index * width, (index + 1) * width],
                [0.4, 1, 0.4],
                Extrapolate.CLAMP
              );
              return {
                width: dotWidth,
                opacity,
              };
            });
            return <Animated.View key={index} style={[styles.dot, dotStyle]} />;
          })}
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentIndex === ONBOARDING_DATA.length - 1 ? 'Get Started' : 'Next'}
          </Text>
          <ChevronRight color={COLORS.textLight} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    width: '100%',
  },
  skipButton: {
    position: 'absolute',
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  skipText: {
    fontFamily: FONTS.poppins.medium,
    color: COLORS.textGray,
    fontSize: 16,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  imagePlaceholder: {
    borderRadius: BORDER_RADIUS.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xxl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.textLight + '20',
  },
  onboardingImage: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.poppins.bold,
    color: COLORS.textDark,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  description: {
    fontFamily: FONTS.inter.regular,
    fontSize: 16,
    color: COLORS.textGray,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  pagination: {
    flexDirection: 'row',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginHorizontal: 4,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.round,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  nextButtonText: {
    fontFamily: FONTS.poppins.semiBold,
    color: COLORS.textLight,
    fontSize: 16,
    marginRight: SPACING.sm,
  },
});
