import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Platform,
  Linking
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  MessageCircle, 
  AlertCircle, 
  ChevronRight,
  HelpCircle
} from 'lucide-react-native';
import { COLORS, DARK_COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../src/constants/theme';
import { useAuthStore } from '../src/store/useAuthStore';

export default function Support() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isDarkMode } = useAuthStore();
  const activeColors = isDarkMode ? DARK_COLORS : COLORS;

  const SupportItem = ({ title, icon: Icon, onPress, color }: any) => (
    <TouchableOpacity 
      style={[styles.supportItem, { backgroundColor: activeColors.cardBackground, borderColor: activeColors.border }]} 
      onPress={onPress}
    >
      <View style={[styles.iconBg, { backgroundColor: (color || activeColors.primary) + '15' }]}>
        <Icon size={22} color={color || activeColors.primary} />
      </View>
      <Text style={[styles.supportTitle, { color: activeColors.textDark }]}>{title}</Text>
      <ChevronRight size={18} color={activeColors.textGray} />
    </TouchableOpacity>
  );

  const handleCall = () => Linking.openURL('tel:+918074194666');
  const handleEmail = () => Linking.openURL('mailto:support@ladypilot.com');
  const handleWhatsApp = () => Linking.openURL('whatsapp://send?phone=+918074194666');

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
        <Text style={[styles.headerTitle, { color: activeColors.textDark }]}>Help & Support</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.emergencyCard}>
          <View style={styles.emergencyHeader}>
            <AlertCircle size={24} color={COLORS.error} />
            <Text style={styles.emergencyTitle}>Emergency SOS</Text>
          </View>
          <Text style={styles.emergencyText}>In case of any safety concerns or emergencies during a ride, use our 24/7 SOS support.</Text>
          <TouchableOpacity style={styles.emergencyBtn} onPress={handleCall}>
            <Text style={styles.emergencyBtnText}>Call Emergency Support</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.sectionTitle, { color: activeColors.textDark }]}>Contact Us</Text>
        <SupportItem title="Call Us" icon={Phone} onPress={handleCall} />
        <SupportItem title="Email Support" icon={Mail} onPress={handleEmail} />
        <SupportItem title="WhatsApp Chat" icon={MessageCircle} onPress={handleWhatsApp} />

        <Text style={[styles.sectionTitle, { color: activeColors.textDark, marginTop: SPACING.xl }]}>FAQs</Text>
        <SupportItem title="Ride & Earnings" icon={HelpCircle} onPress={() => {}} />
        <SupportItem title="Account & Profile" icon={HelpCircle} onPress={() => {}} />
        <SupportItem title="Safety & Community" icon={HelpCircle} onPress={() => {}} />
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
    fontSize: 20,
    marginLeft: SPACING.md,
  },
  scrollContent: {
    padding: SPACING.md,
  },
  emergencyCard: {
    backgroundColor: '#EF444410',
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: '#EF444430',
    marginBottom: SPACING.xl,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  emergencyTitle: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 18,
    color: '#EF4444',
    marginLeft: SPACING.sm,
  },
  emergencyText: {
    fontFamily: FONTS.inter.medium,
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
    marginBottom: SPACING.lg,
  },
  emergencyBtn: {
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
  },
  emergencyBtnText: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 14,
    color: '#FFF',
  },
  sectionTitle: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 16,
    marginBottom: SPACING.md,
    marginLeft: 4,
  },
  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
  },
  iconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  supportTitle: {
    flex: 1,
    fontFamily: FONTS.inter.semiBold,
    fontSize: 15,
  },
});
