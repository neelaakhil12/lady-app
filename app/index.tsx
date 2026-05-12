import { Redirect, useRootNavigationState } from 'expo-router';
import { useAuthStore } from '../src/store/useAuthStore';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { COLORS } from '../src/constants/theme';

export default function Index() {
  const { isLoggedIn, isFirstTime } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    // Check if the store has hydrated
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });

    // FOR TESTING: Reset storage to see landing page
    // localStorage.clear();
    // window.location.href = '/';

    // Also check if it's already hydrated
    if (useAuthStore.persist.hasHydrated()) {
      setIsHydrated(true);
    }

    // Fallback timeout
    const timeout = setTimeout(() => {
      setIsHydrated(true);
    }, 2000);

    return () => {
      unsub();
      clearTimeout(timeout);
    };
  }, []);

  if (!isHydrated || !rootNavigationState?.key) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (isFirstTime || !isLoggedIn) {
    return <Redirect href="/landing" />;
  }

  return <Redirect href="/(tabs)" />;
}
