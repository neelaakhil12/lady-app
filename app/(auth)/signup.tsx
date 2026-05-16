import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  useWindowDimensions
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../src/store/useAuthStore';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, DARK_COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../src/constants/theme';

export default function Signup() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const width = Platform.OS === 'web' ? Math.min(windowWidth, 450) : windowWidth;
  const { isDarkMode } = useAuthStore();
  const activeColors = isDarkMode ? DARK_COLORS : COLORS;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
  });

  const isSmall = width < 400;
  const responsivePadding = isSmall ? SPACING.md : SPACING.xl;

  const handleSignup = () => {
    const { firstName, lastName, phoneNumber, email } = formData;
    const { setUser } = useAuthStore.getState();
    
    // Save user details to store
    setUser({
      name: `${firstName} ${lastName}`.trim() || 'Captain',
      firstName: firstName || 'Captain',
      phoneNumber,
      email
    });

    router.push('/(auth)/location');
  };

  return (
    <View style={[styles.container, { backgroundColor: activeColors.background }]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        enabled={Platform.OS !== 'web'}
      >
        <View style={[
          styles.headerNav, 
          { 
            paddingHorizontal: responsivePadding,
            paddingTop: Platform.OS === 'web' ? SPACING.md : insets.top + SPACING.sm,
            backgroundColor: activeColors.background
          }
        ]}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft color={activeColors.textDark} size={24} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: activeColors.textDark }]}>Create Account</Text>
        </View>

        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={[
            styles.scrollContent, 
            { paddingHorizontal: responsivePadding }
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { fontSize: isSmall ? 28 : 32, color: activeColors.textDark }]}>User Sign Up</Text>
            <User size={24} color={activeColors.primary} style={styles.titleIcon} />
          </View>

          <View style={styles.form}>
            <View style={styles.row}>
              <View style={[styles.inputWrapper, { flex: 1, backgroundColor: activeColors.cardBackground, borderColor: activeColors.border, paddingHorizontal: SPACING.md }]}>
                <TextInput
                  style={[styles.input, { color: activeColors.textDark }]}
                  placeholder="First name"
                  value={formData.firstName}
                  onChangeText={(text) => setFormData({ ...formData, firstName: text })}
                  placeholderTextColor={activeColors.textGray}
                />
              </View>
              <View style={[styles.inputWrapper, { flex: 1, marginLeft: SPACING.xs, backgroundColor: activeColors.cardBackground, borderColor: activeColors.border, paddingHorizontal: SPACING.md }]}>
                <TextInput
                  style={[styles.input, { color: activeColors.textDark }]}
                  placeholder="Last name"
                  value={formData.lastName}
                  onChangeText={(text) => setFormData({ ...formData, lastName: text })}
                  placeholderTextColor={activeColors.textGray}
                />
              </View>
            </View>

            <View style={[styles.inputWrapper, { backgroundColor: activeColors.cardBackground, borderColor: activeColors.border }]}>
              <Phone size={20} color={activeColors.textGray} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: activeColors.textDark }]}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                value={formData.phoneNumber}
                onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
                placeholderTextColor={activeColors.textGray}
              />
            </View>

            <View style={[styles.inputWrapper, { backgroundColor: activeColors.cardBackground, borderColor: activeColors.border }]}>
              <Mail size={20} color={activeColors.textGray} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: activeColors.textDark }]}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                placeholderTextColor={activeColors.textGray}
              />
            </View>

            <View style={[styles.inputWrapper, { backgroundColor: activeColors.cardBackground, borderColor: activeColors.border }]}>
              <Lock size={20} color={activeColors.textGray} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: activeColors.textDark }]}
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
                placeholderTextColor={activeColors.textGray}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff size={20} color={activeColors.textGray} />
                ) : (
                  <Eye size={20} color={activeColors.textGray} />
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={[styles.signupButton, { backgroundColor: activeColors.primary }]}
              onPress={handleSignup}
            >
              <Text style={styles.signupButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.loginLinkContainer}>
              <Text style={[styles.loginLinkText, { color: activeColors.textGray }]}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                <Text style={[styles.loginLinkAction, { color: activeColors.primary }]}>Login</Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.termsText, { color: activeColors.textGray }]}>
              This site is protected by reCAPTCHA and the Google{' '}
              <Text style={[styles.linkText, { color: activeColors.primary }]}>Privacy Policy</Text> and{' '}
              <Text style={[styles.linkText, { color: activeColors.primary }]}>Terms of Service</Text> apply.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    width: '100%',
  },
  headerNav: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: SPACING.md,
    width: '100%',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: FONTS.poppins.semiBold,
    fontSize: 18,
    color: COLORS.textDark,
    marginLeft: SPACING.md,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: SPACING.xl,
    width: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  title: {
    fontFamily: FONTS.poppins.bold,
    color: COLORS.textDark,
  },
  titleIcon: {
    marginLeft: SPACING.sm,
    marginTop: 5,
  },
  form: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.round,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.lg,
    height: 60,
    marginBottom: SPACING.md,
    ...SHADOWS.light,
  },
  inputIcon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    fontFamily: FONTS.inter.medium,
    fontSize: 16,
    color: COLORS.textDark,
    ...Platform.select({
      web: {
        outlineStyle: 'none' as any,
      },
    }),
  },
  signupButton: {
    backgroundColor: COLORS.primary,
    height: 60,
    borderRadius: BORDER_RADIUS.round,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
    ...SHADOWS.medium,
  },
  signupButtonText: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 18,
    color: COLORS.textLight,
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  loginLinkText: {
    fontFamily: FONTS.inter.medium,
    fontSize: 14,
    color: COLORS.textGray,
  },
  loginLinkAction: {
    fontFamily: FONTS.inter.bold,
    fontSize: 14,
    color: COLORS.primary,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    fontFamily: FONTS.inter.medium,
    fontSize: 12,
    color: COLORS.textGray,
    paddingHorizontal: SPACING.md,
  },
  captainButton: {
    backgroundColor: 'transparent',
    height: 60,
    borderRadius: BORDER_RADIUS.round,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginBottom: SPACING.xl,
  },
  captainButtonText: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 18,
  },
  termsText: {
    fontFamily: FONTS.inter.regular,
    fontSize: 12,
    color: COLORS.textGray,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: SPACING.lg,
  },
  linkText: {
    fontFamily: FONTS.inter.medium,
  },
});
