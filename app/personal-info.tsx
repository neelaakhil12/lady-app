import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Platform 
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, User, Phone, Mail, MapPin } from 'lucide-react-native';
import { COLORS, DARK_COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../src/constants/theme';
import { useAuthStore } from '../src/store/useAuthStore';

export default function PersonalInfo() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, isDarkMode } = useAuthStore();
  const activeColors = isDarkMode ? DARK_COLORS : COLORS;

  const InfoRow = ({ label, value, icon: Icon }: any) => (
    <View style={[styles.infoRow, { borderBottomColor: activeColors.border }]}>
      <View style={[styles.iconContainer, { backgroundColor: activeColors.primary + '15' }]}>
        <Icon size={20} color={activeColors.primary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.label, { color: activeColors.textGray }]}>{label}</Text>
        <Text style={[styles.value, { color: activeColors.textDark }]}>{value}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: activeColors.background }]} edges={[]}>
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
        <Text style={[styles.headerTitle, { color: activeColors.textDark }]}>Personal Information</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.card, { backgroundColor: activeColors.cardBackground, borderColor: activeColors.border }]}>
          <InfoRow label="Full Name" value={user?.name || 'Neelam Harish'} icon={User} />
          <InfoRow label="Phone Number" value={user?.phoneNumber || '+91 8074194666'} icon={Phone} />
          <InfoRow label="Email Address" value={user?.email || 'neelam@ladypilot.com'} icon={Mail} />
          <InfoRow label="Primary Address" value="HSR Layout, Bangalore, India" icon={MapPin} />
        </View>

        <TouchableOpacity style={[styles.editBtn, { backgroundColor: activeColors.primary }]}>
          <Text style={styles.editBtnText}>Edit Information</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
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
    fontSize: 20,
    marginLeft: SPACING.md,
  },
  scrollContent: {
    padding: SPACING.md,
  },
  card: {
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    ...SHADOWS.medium,
    borderWidth: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary + '10',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontFamily: FONTS.inter.medium,
    fontSize: 12,
    color: COLORS.textGray,
  },
  value: {
    fontFamily: FONTS.poppins.semiBold,
    fontSize: 16,
    color: COLORS.textDark,
    marginTop: 2,
  },
  editBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.round,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: SPACING.xl,
    ...SHADOWS.medium,
  },
  editBtnText: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 16,
    color: COLORS.textLight,
  },
});
