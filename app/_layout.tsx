import { useEffect } from 'react';
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
import { COLORS, SHADOWS } from '../src/constants/theme';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function AppContent() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
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
    console.log('App Root Layout loaded:', { loaded, error });
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  const content = <AppContent />;

  // If on web, wrap in a container that handles centering and max-width
  if (Platform.OS === 'web') {
    const isDesktop = windowWidth > 450;
    return (
      <View style={styles.webContainer}>
        <View style={[
          styles.webFrame,
          { 
            width: isDesktop ? 420 : '100%',
            maxWidth: isDesktop ? 420 : '100%',
            height: isDesktop ? '90%' : '100%',
            borderRadius: isDesktop ? 40 : 0,
            borderWidth: isDesktop ? 12 : 0,
            borderColor: '#1a1a1a', // Dark mobile frame color
            marginTop: isDesktop ? 20 : 0,
            marginBottom: isDesktop ? 20 : 0,
            ...(isDesktop ? SHADOWS.heavy : {}),
            overflow: 'hidden',
          }
        ]}>
          {content}
        </View>
      </View>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  webFrame: {
    height: '100%',
    backgroundColor: COLORS.background,
    overflow: 'hidden',
  },
});
