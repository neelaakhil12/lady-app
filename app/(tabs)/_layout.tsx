import React from 'react';
import { Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { LayoutDashboard, Wallet, History, User } from 'lucide-react-native';
import { useAuthStore } from '../../src/store/useAuthStore';
import { COLORS, DARK_COLORS, FONTS, SHADOWS } from '../../src/constants/theme';

export default function TabLayout() {
  const { isDarkMode } = useAuthStore();
  const activeColors = isDarkMode ? DARK_COLORS : COLORS;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColors.primary,
        tabBarInactiveTintColor: activeColors.textGray,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: activeColors.border,
          height: Platform.OS === 'web' ? 90 : 70,
          paddingBottom: Platform.OS === 'web' ? 35 : 12,
          paddingTop: 10,
          backgroundColor: activeColors.cardBackground,
          ...SHADOWS.medium,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        },
        tabBarLabelStyle: {
          fontFamily: FONTS.inter.medium,
          fontSize: 12,
          marginTop: 2,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => <LayoutDashboard size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="earnings"
        options={{
          title: 'Earnings',
          tabBarIcon: ({ color, size }) => <Wallet size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => <History size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
