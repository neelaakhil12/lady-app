import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { COLORS, DARK_COLORS, FONTS, SPACING } from '../src/constants/theme';
import { useAuthStore } from '../src/store/useAuthStore';

export default function PrivacyPolicy() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isDarkMode } = useAuthStore();
  const activeColors = isDarkMode ? DARK_COLORS : COLORS;

  const Section = ({ title, content }: any) => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: activeColors.textDark }]}>{title}</Text>
      <Text style={[styles.sectionContent, { color: activeColors.textGray }]}>{content}</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: activeColors.background }]} edges={[]}>
      <View style={[
        styles.header,
        { 
          paddingTop: Platform.OS === 'web' ? SPACING.md : insets.top + SPACING.sm,
          backgroundColor: activeColors.background,
          borderBottomColor: activeColors.border
        }
      ]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={24} color={activeColors.textDark} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: activeColors.textDark }]}>Privacy Policy</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.lastUpdated, { color: activeColors.textGray }]}>Last Updated: May 15, 2026</Text>
        
        <Section 
          title="1. Information We Collect" 
          content="We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us." 
        />
        <Section 
          title="2. How We Use Information" 
          content="We use the information we collect to provide, maintain, and improve our services, such as to facilitate payments, send receipts, provide products and services you request, and develop new features." 
        />
        <Section 
          title="3. Location Data" 
          content="When you use our services for ride-sharing, we collect precise location data about the trip from the Lady Pilot app used by the Captain. If you permit the Lady Pilot app to access location services through the permission system used by your mobile operating system, we may also collect the precise location of your device when the app is running in the foreground or background." 
        />
        <Section 
          title="4. Sharing Information" 
          content="We may share the information we collect about you as described in this policy or at the time of collection or sharing, including sharing with other users to enable them to provide or receive the services you request." 
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 18,
    color: COLORS.textDark,
    marginLeft: SPACING.md,
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  lastUpdated: {
    fontFamily: FONTS.inter.medium,
    fontSize: 14,
    color: COLORS.textGray,
    marginBottom: SPACING.xl,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 18,
    color: COLORS.textDark,
    marginBottom: SPACING.sm,
  },
  sectionContent: {
    fontFamily: FONTS.inter.regular,
    fontSize: 14,
    color: COLORS.textGray,
    lineHeight: 22,
  },
});
