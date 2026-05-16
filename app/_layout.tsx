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
  const { width: windowWidth } = useWindowDimensions();
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

  const layout = Platform.OS === 'web' ? (
    <View style={[styles.webContainer, { backgroundColor: '#331a5e' }]}>
      <View style={[
        styles.webFrame,
        { 
          width: windowWidth > 450 ? 400 : '100%',
          maxWidth: windowWidth > 450 ? 400 : '100%',
          height: windowWidth > 450 ? '98%' : '100%',
          maxHeight: windowWidth > 450 ? 950 : '100%',
          borderWidth: windowWidth > 450 ? 10 : 0,
          borderColor: '#111827',
          borderRadius: windowWidth > 450 ? 40 : 0,
          backgroundColor: activeColors.background,
          ...(windowWidth > 450 ? SHADOWS.heavy : {}),
        }
      ]}>
        {content}
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
  },
  webFrame: {
    height: '100%',
    overflow: 'hidden',
  },
});
