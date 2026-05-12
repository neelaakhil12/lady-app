import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../src/store/useAuthStore';
import { 
  ArrowLeft, 
  Upload, 
  CheckCircle2, 
  CreditCard, 
  FileText, 
  User, 
  Car 
} from 'lucide-react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS, IS_SMALL_SCREEN } from '../../src/constants/theme';

const DocItem = ({ title, icon: Icon, status, onPress }: any) => (
  <TouchableOpacity style={styles.docItem} onPress={onPress}>
    <View style={[styles.iconContainer, { backgroundColor: status === 'uploaded' ? COLORS.success + '15' : COLORS.primary + '10' }]}>
      <Icon size={24} color={status === 'uploaded' ? COLORS.success : COLORS.primary} />
    </View>
    <View style={styles.docInfo}>
      <Text style={styles.docTitle}>{title}</Text>
      <Text style={[styles.docStatus, { color: status === 'uploaded' ? COLORS.success : COLORS.textGray }]}>
        {status === 'uploaded' ? 'Document Uploaded' : 'Tap to upload'}
      </Text>
    </View>
    {status === 'uploaded' ? (
      <CheckCircle2 size={20} color={COLORS.success} />
    ) : (
      <Upload size={20} color={COLORS.textGray} />
    )}
  </TouchableOpacity>
);

export default function Register() {
  const router = useRouter();
  const { setLoggedIn } = useAuthStore();
  const [docs, setDocs] = useState({
    aadhar: 'pending',
    license: 'pending',
    vehicle: 'pending',
    profile: 'pending',
  });

  const handleUpload = (type: string) => {
    // Simulate upload
    setDocs(prev => ({ ...prev, [type]: 'uploaded' }));
  };

  const isAllUploaded = Object.values(docs).every(status => status === 'uploaded');

  const handleComplete = () => {
    if (isAllUploaded) {
      setLoggedIn(true);
      router.replace('/(tabs)');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft color={COLORS.textDark} size={24} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Registration</Text>
          <Text style={styles.subtitle}>
            Upload your documents for verification to start earning
          </Text>
        </View>

        <View style={styles.docsList}>
          <DocItem 
            title="Aadhar Card" 
            icon={CreditCard} 
            status={docs.aadhar} 
            onPress={() => handleUpload('aadhar')}
          />
          <DocItem 
            title="Driving License" 
            icon={FileText} 
            status={docs.license} 
            onPress={() => handleUpload('license')}
          />
          <DocItem 
            title="Vehicle Details" 
            icon={Car} 
            status={docs.vehicle} 
            onPress={() => handleUpload('vehicle')}
          />
          <DocItem 
            title="Profile Photo" 
            icon={User} 
            status={docs.profile} 
            onPress={() => handleUpload('profile')}
          />
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Why verification?</Text>
          <Text style={styles.infoText}>
            We verify all our captains to ensure the safety and trust of our female-only community. Verification usually takes 24-48 hours.
          </Text>
        </View>

        <TouchableOpacity 
          style={[
            styles.button, 
            !isAllUploaded && styles.buttonDisabled
          ]} 
          onPress={handleComplete}
          disabled={!isAllUploaded}
        >
          <Text style={styles.buttonText}>Submit for Verification</Text>
          <CheckCircle2 color={COLORS.textLight} size={20} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: IS_SMALL_SCREEN ? SPACING.md : SPACING.xl,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: IS_SMALL_SCREEN ? SPACING.lg : SPACING.xxl,
    ...SHADOWS.light,
  },
  header: {
    marginBottom: IS_SMALL_SCREEN ? SPACING.lg : SPACING.xxl,
  },
  title: {
    fontFamily: FONTS.poppins.bold,
    fontSize: IS_SMALL_SCREEN ? 24 : 28,
    color: COLORS.textDark,
  },
  subtitle: {
    fontFamily: FONTS.inter.regular,
    fontSize: 16,
    color: COLORS.textGray,
    marginTop: SPACING.xs,
  },
  docsList: {
    marginBottom: IS_SMALL_SCREEN ? SPACING.lg : SPACING.xxl,
  },
  docItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  docInfo: {
    flex: 1,
  },
  docTitle: {
    fontFamily: FONTS.poppins.semiBold,
    fontSize: 16,
    color: COLORS.textDark,
  },
  docStatus: {
    fontFamily: FONTS.inter.regular,
    fontSize: 13,
    marginTop: 2,
  },
  infoBox: {
    backgroundColor: COLORS.accent + '10',
    padding: IS_SMALL_SCREEN ? SPACING.md : SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: IS_SMALL_SCREEN ? SPACING.lg : SPACING.xxl,
    borderWidth: 1,
    borderColor: COLORS.accent + '30',
  },
  infoTitle: {
    fontFamily: FONTS.poppins.semiBold,
    fontSize: 16,
    color: COLORS.accent,
    marginBottom: SPACING.xs,
  },
  infoText: {
    fontFamily: FONTS.inter.regular,
    fontSize: 14,
    color: COLORS.textDark,
    lineHeight: 20,
  },
  button: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: BORDER_RADIUS.md,
    ...SHADOWS.medium,
  },
  buttonDisabled: {
    backgroundColor: COLORS.textGray + '50',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    fontFamily: FONTS.poppins.bold,
    color: COLORS.textLight,
    fontSize: 18,
    marginRight: SPACING.sm,
  },
});
