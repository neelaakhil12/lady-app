import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  Platform,
  useWindowDimensions
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
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../src/constants/theme';

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
  const { width: windowWidth } = useWindowDimensions();
  const width = Platform.OS === 'web' ? Math.min(windowWidth, 450) : windowWidth;
  const [docs, setDocs] = useState({
    aadhar: 'pending',
    license: 'pending',
    vehicle: 'pending',
    profile: 'pending',
  });

  const isSmall = width < 400;
  const responsivePadding = isSmall ? SPACING.md : SPACING.xl;

  const handleUpload = (type: string) => {
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
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: responsivePadding }
        ]}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft color={COLORS.textDark} size={24} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={[styles.title, { fontSize: isSmall ? 24 : 28 }]}>Registration</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    width: '100%',
    maxWidth: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
    width: '100%',
    maxWidth: '100%',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
    ...SHADOWS.light,
  },
  header: {
    marginBottom: SPACING.xl,
  },
  title: {
    fontFamily: FONTS.poppins.bold,
    color: COLORS.textDark,
  },
  subtitle: {
    fontFamily: FONTS.inter.regular,
    fontSize: 16,
    color: COLORS.textGray,
    marginTop: SPACING.xs,
  },
  docsList: {
    marginBottom: SPACING.xl,
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
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.xl,
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
