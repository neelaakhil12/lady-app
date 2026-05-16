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
import { COLORS, DARK_COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../src/constants/theme';

const DocItem = ({ title, icon: Icon, status, onPress, activeColors }: any) => (
  <TouchableOpacity style={[styles.docItem, { backgroundColor: activeColors.cardBackground, borderColor: activeColors.border }]} onPress={onPress}>
    <View style={[styles.iconContainer, { backgroundColor: status === 'uploaded' ? COLORS.success + '15' : activeColors.primary + '10' }]}>
      <Icon size={24} color={status === 'uploaded' ? COLORS.success : activeColors.primary} />
    </View>
    <View style={styles.docInfo}>
      <Text style={[styles.docTitle, { color: activeColors.textDark }]}>{title}</Text>
      <Text style={[styles.docStatus, { color: status === 'uploaded' ? COLORS.success : activeColors.textGray }]}>
        {status === 'uploaded' ? 'Document Uploaded' : 'Tap to upload'}
      </Text>
    </View>
    {status === 'uploaded' ? (
      <CheckCircle2 size={20} color={COLORS.success} />
    ) : (
      <Upload size={20} color={activeColors.textGray} />
    )}
  </TouchableOpacity>
);

export default function Register() {
  const router = useRouter();
  const { setLoggedIn, isDarkMode } = useAuthStore();
  const activeColors = isDarkMode ? DARK_COLORS : COLORS;
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
    <View style={[styles.container, { backgroundColor: activeColors.background }]}>
      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: responsivePadding, backgroundColor: activeColors.background }
        ]}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft color={activeColors.textDark} size={24} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={[styles.title, { fontSize: isSmall ? 24 : 28, color: activeColors.textDark }]}>Registration</Text>
          <Text style={[styles.subtitle, { color: activeColors.textGray }]}>
            Upload your documents for verification to start earning
          </Text>
        </View>

        <View style={styles.docsList}>
          <DocItem 
            title="Aadhar Card" 
            icon={CreditCard} 
            status={docs.aadhar} 
            onPress={() => handleUpload('aadhar')}
            activeColors={activeColors}
          />
          <DocItem 
            title="Driving License" 
            icon={FileText} 
            status={docs.license} 
            onPress={() => handleUpload('license')}
            activeColors={activeColors}
          />
          <DocItem 
            title="Vehicle Details" 
            icon={Car} 
            status={docs.vehicle} 
            onPress={() => handleUpload('vehicle')}
            activeColors={activeColors}
          />
          <DocItem 
            title="Profile Photo" 
            icon={User} 
            status={docs.profile} 
            onPress={() => handleUpload('profile')}
            activeColors={activeColors}
          />
        </View>

        <View style={[styles.infoBox, { backgroundColor: activeColors.accent + '10', borderColor: activeColors.accent + '30' }]}>
          <Text style={[styles.infoTitle, { color: activeColors.accent }]}>Why verification?</Text>
          <Text style={[styles.infoText, { color: activeColors.textDark }]}>
            We verify all our captains to ensure the safety and trust of our female-only community. Verification usually takes 24-48 hours.
          </Text>
        </View>

        <TouchableOpacity 
          style={[
            styles.button, 
            { backgroundColor: activeColors.primary },
            !isAllUploaded && styles.buttonDisabled
          ]} 
          onPress={handleComplete}
          disabled={!isAllUploaded}
        >
          <Text style={styles.buttonText}>Submit for Verification</Text>
          <CheckCircle2 color={activeColors.textLight} size={20} />
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
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
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
