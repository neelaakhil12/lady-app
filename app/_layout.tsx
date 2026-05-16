import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import { 
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold 
} from '@expo-google-fonts/poppins';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold
} from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, DARK_COLORS, SHADOWS } from '../src/constants/theme';
import { useAuthStore } from '../src/store/useAuthStore';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function AppContent() {
  const { isDarkMode } = useAuthStore();
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <Stack screenOptions={{ 
        headerShown: false,
        contentStyle: { backgroundColor: isDarkMode ? DARK_COLORS.background : COLORS.background }
      }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="landing" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const { isDarkMode } = useAuthStore();
  const activeColors = isDarkMode ? DARK_COLORS : COLORS;
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [loaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Preload images
        const images = [
          require('../assets/logo.png'),
          require('../assets/onboarding_bike.png'),
          require('../assets/onboarding_car.png'),
          require('../assets/onboarding_auto.png'),
        ];
        
        const cacheImages = images.map(image => {
          return Asset.fromModule(image).downloadAsync();
        });
        
        // Use a race to avoid getting stuck
        await Promise.race([
          Promise.all(cacheImages),
          new Promise(resolve => setTimeout(resolve, 5000)) // 5s timeout fallback
        ]);
        
        setAssetsLoaded(true);
      } catch (e) {
        console.warn('Error preloading assets:', e);
        setAssetsLoaded(true); // Proceed anyway
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if ((loaded && assetsLoaded) || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, assetsLoaded, error]);

  if ((!loaded || !assetsLoaded) && !error) {
    return <View style={{ flex: 1, backgroundColor: activeColors.background }} />;
  }

  const content = <AppContent />;

  const isLaptop = windowWidth > 450;

  const layout = Platform.OS === 'web' ? (
    <View style={[styles.webContainer, { backgroundColor: '#331a5e' }]}>
      {/* Outer phone shell */}
      <View style={[
        styles.phoneShell,
        isLaptop ? {
          width: 390,
          height: Math.min(windowHeight * 0.92, 844),
          borderRadius: 52,
          backgroundColor: '#000000',

          shadowColor: '#000',
          shadowOffset: { width: 0, height: 24 },
          shadowOpacity: 0.55,
          shadowRadius: 40,
          elevation: 30,
        } : { width: '100%', height: '100%', borderRadius: 0, backgroundColor: activeColors.background }
      ]}>
        {/* Inner app content area */}
        <View style={[
          styles.webFrame,
          isLaptop ? {
            margin: 12,
            borderRadius: 42,
            overflow: 'hidden',
            backgroundColor: activeColors.background,
            flex: 1,
          } : {
            flex: 1,
            backgroundColor: activeColors.background,
          }
        ]}>
          {content}
        </View>
      </View>
    </View>
  ) : content;




  return (
    <SafeAreaProvider style={{ backgroundColor: activeColors.background }}>
      {layout}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  phoneShell: {
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  webFrame: {
    height: '100%',
    overflow: 'hidden',
  },
});

