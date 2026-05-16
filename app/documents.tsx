import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Shield, FileText, CheckCircle } from 'lucide-react-native';
import { COLORS, DARK_COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../src/constants/theme';
import { useAuthStore } from '../src/store/useAuthStore';

export default function Documents() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isDarkMode } = useAuthStore();
  const activeColors = isDarkMode ? DARK_COLORS : COLORS;

  const DocItem = ({ title, status }: any) => (
    <TouchableOpacity style={[styles.docItem, { backgroundColor: activeColors.cardBackground, borderColor: activeColors.border }]}>
      <View style={styles.docInfo}>
        <FileText size={24} color={activeColors.primary} />
        <View style={styles.textContainer}>
          <Text style={[styles.docTitle, { color: activeColors.textDark }]}>{title}</Text>
          <View style={styles.statusContainer}>
            <CheckCircle size={14} color={COLORS.success} />
            <Text style={styles.statusText}>{status}</Text>
          </View>
        </View>
      </View>
      <Text style={[styles.viewText, { color: activeColors.primary }]}>View</Text>
    </TouchableOpacity>
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
        <Text style={[styles.headerTitle, { color: activeColors.textDark }]}>Documents & Verification</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <DocItem title="Driver's License" status="Verified" />
        <DocItem title="Aadhar Card" status="Verified" />
        <DocItem title="Vehicle RC" status="Verified" />
        <DocItem title="Insurance Policy" status="Verified" />
        <DocItem title="PAN Card" status="Verified" />
        
        <View style={[styles.infoBox, { backgroundColor: activeColors.primary + '15' }]}>
          <Shield size={20} color={activeColors.primary} />
          <Text style={[styles.infoText, { color: activeColors.primary }]}>Your documents are securely stored and verified for safety.</Text>
        </View>
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
    padding: SPACING.md,
    borderBottomWidth: 1,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 18,
    marginLeft: SPACING.md,
  },
  scrollContent: {
    padding: SPACING.md,
  },
  docItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    ...SHADOWS.light,
  },
  docInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    marginLeft: SPACING.md,
  },
  docTitle: {
    fontFamily: FONTS.poppins.semiBold,
    fontSize: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusText: {
    fontFamily: FONTS.inter.medium,
    fontSize: 12,
    color: COLORS.success,
    marginLeft: 4,
  },
  viewText: {
    fontFamily: FONTS.inter.bold,
    fontSize: 14,
  },
  infoBox: {
    flexDirection: 'row',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginTop: SPACING.md,
    alignItems: 'center',
  },
  infoText: {
    fontFamily: FONTS.inter.medium,
    fontSize: 13,
    flex: 1,
    marginLeft: SPACING.sm,
  },
});
