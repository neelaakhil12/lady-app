import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  User, 
  Settings, 
  Shield, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Camera,
  Star,
  Award
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../src/store/useAuthStore';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS, IS_SMALL_SCREEN } from '../../src/constants/theme';

const ProfileOption = ({ icon: Icon, title, subtitle, onPress, color = COLORS.textDark }: any) => (
  <TouchableOpacity style={styles.optionItem} onPress={onPress}>
    <View style={[styles.optionIcon, { backgroundColor: color + '10' }]}>
      <Icon size={22} color={color} />
    </View>
    <View style={styles.optionInfo}>
      <Text style={[styles.optionTitle, { color }]}>{title}</Text>
      {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
    </View>
    <ChevronRight size={20} color={COLORS.textGray} />
  </TouchableOpacity>
);

export default function Profile() {
  const router = useRouter();
  const { logout, user } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.replace('/landing');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity style={styles.settingsBtn}>
            <Settings size={24} color={COLORS.textDark} />
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <User size={50} color={COLORS.primary} />
            </View>
            <TouchableOpacity style={styles.cameraBtn}>
              <Camera size={16} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{user?.name || 'Lady Pilot Captain'}</Text>
          <Text style={styles.userPhone}>{user?.phoneNumber || '+91 00000 00000'}</Text>
          
          <View style={styles.badgeContainer}>
            <View style={styles.badge}>
              <Star size={14} color="#FFD700" fill="#FFD700" />
              <Text style={styles.badgeText}>4.9 Rating</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: COLORS.accent + '15' }]}>
              <Award size={14} color={COLORS.accent} />
              <Text style={[styles.badgeText, { color: COLORS.accent }]}>Gold Captain</Text>
            </View>
          </View>
        </View>

        {/* Profile Options */}
        <View style={styles.optionsContainer}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <ProfileOption 
            icon={User} 
            title="Personal Information" 
            subtitle="Name, Phone, Email, Address"
          />
          <ProfileOption 
            icon={Shield} 
            title="Documents & Verification" 
            subtitle="License, Aadhar, Vehicle RC"
          />
          <ProfileOption 
            icon={Award} 
            title="Performance & Rewards" 
            subtitle="Your achievements and bonuses"
          />

          <Text style={[styles.sectionTitle, { marginTop: SPACING.xl }]}>Support & Legal</Text>
          <ProfileOption 
            icon={HelpCircle} 
            title="Help & Support" 
            subtitle="FAQs, Contact us, Emergency"
          />
          <ProfileOption 
            icon={Shield} 
            title="Privacy Policy" 
          />
          
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <View style={[styles.optionIcon, { backgroundColor: COLORS.error + '10' }]}>
              <LogOut size={22} color={COLORS.error} />
            </View>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: IS_SMALL_SCREEN ? SPACING.md : SPACING.xl,
    paddingVertical: SPACING.lg,
  },
  title: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 24,
    color: COLORS.textDark,
  },
  settingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  profileCard: {
    alignItems: 'center',
    paddingVertical: IS_SMALL_SCREEN ? SPACING.lg : SPACING.xl,
    backgroundColor: COLORS.cardBackground,
    marginHorizontal: IS_SMALL_SCREEN ? SPACING.md : SPACING.xl,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.medium,
    marginBottom: SPACING.xl,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: SPACING.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary + '10',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.cardBackground,
  },
  userName: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 22,
    color: COLORS.textDark,
  },
  userPhone: {
    fontFamily: FONTS.inter.medium,
    fontSize: 14,
    color: COLORS.textGray,
    marginTop: 2,
  },
  badgeContainer: {
    flexDirection: 'row',
    marginTop: SPACING.md,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD70015',
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.round,
    marginHorizontal: 4,
  },
  badgeText: {
    fontFamily: FONTS.inter.bold,
    fontSize: 12,
    color: '#B8860B',
    marginLeft: 6,
  },
  optionsContainer: {
    paddingHorizontal: IS_SMALL_SCREEN ? SPACING.md : SPACING.xl,
  },
  sectionTitle: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 18,
    color: COLORS.textDark,
    marginBottom: SPACING.md,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.light,
  },
  optionIcon: {
    width: 45,
    height: 45,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  optionInfo: {
    flex: 1,
  },
  optionTitle: {
    fontFamily: FONTS.poppins.semiBold,
    fontSize: 16,
  },
  optionSubtitle: {
    fontFamily: FONTS.inter.regular,
    fontSize: 12,
    color: COLORS.textGray,
    marginTop: 2,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginTop: SPACING.xl,
    ...SHADOWS.light,
  },
  logoutText: {
    fontFamily: FONTS.poppins.semiBold,
    fontSize: 16,
    color: COLORS.error,
    flex: 1,
  },
  versionText: {
    fontFamily: FONTS.inter.medium,
    fontSize: 12,
    color: COLORS.textGray,
    textAlign: 'center',
    marginTop: SPACING.xxl,
  },
});
