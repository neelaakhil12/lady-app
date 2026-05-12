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
        {isDesktop ? (
          <View style={styles.desktopWrapper}>
            <View style={styles.phoneFrame}>
              <View style={styles.phoneNotch} />
              <View style={styles.phoneContent}>
                {content}
              </View>
              <View style={styles.phoneHomeIndicator} />
            </View>
          </View>
        ) : (
          <View style={styles.mobileWrapper}>
            {content}
          </View>
        )}
      </View>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White background as requested
    width: '100%',
  },
  desktopWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  mobileWrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  phoneFrame: {
    width: 400,
    height: '95%',
    maxHeight: 850,
    backgroundColor: '#000000',
    borderRadius: 50,
    borderWidth: 8,
    borderColor: '#1a1a1a',
    overflow: 'hidden',
    ...SHADOWS.heavy,
    position: 'relative',
  },
  phoneNotch: {
    position: 'absolute',
    top: 0,
    left: '50%',
    marginLeft: -60,
    width: 120,
    height: 30,
    backgroundColor: '#1a1a1a',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: 100,
  },
  phoneContent: {
    flex: 1,
    backgroundColor: COLORS.background,
    marginTop: 0,
  },
  phoneHomeIndicator: {
    position: 'absolute',
    bottom: 8,
    left: '50%',
    marginLeft: -50,
    width: 100,
    height: 5,
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    zIndex: 100,
  },
  webFrame: {
    height: '100%',
    backgroundColor: COLORS.background,
    overflow: 'hidden',
  },
});
