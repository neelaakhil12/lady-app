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
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../src/constants/theme';

export default function Signup() {
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
  });

  const isSmall = windowWidth < 400;
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
    <View style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        enabled={Platform.OS !== 'web'}
      >
        <View style={[styles.headerNav, { paddingHorizontal: responsivePadding }]}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft color={COLORS.textDark} size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Account</Text>
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
            <Text style={[styles.title, { fontSize: isSmall ? 28 : 32 }]}>User Sign Up</Text>
            <User size={24} color={COLORS.primary} style={styles.titleIcon} />
          </View>

          <View style={styles.form}>
            <View style={styles.row}>
              <View style={[styles.inputWrapper, { flex: 1, marginRight: SPACING.xs, paddingHorizontal: SPACING.md }]}>
                <TextInput
                  style={styles.input}
                  placeholder="First name"
                  value={formData.firstName}
                  onChangeText={(text) => setFormData({ ...formData, firstName: text })}
                  placeholderTextColor={COLORS.textGray}
                />
              </View>
              <View style={[styles.inputWrapper, { flex: 1, marginLeft: SPACING.xs, paddingHorizontal: SPACING.md }]}>
                <TextInput
                  style={styles.input}
                  placeholder="Last name"
                  value={formData.lastName}
                  onChangeText={(text) => setFormData({ ...formData, lastName: text })}
                  placeholderTextColor={COLORS.textGray}
                />
              </View>
            </View>

            <View style={styles.inputWrapper}>
              <Phone size={20} color={COLORS.textGray} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                value={formData.phoneNumber}
                onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
                placeholderTextColor={COLORS.textGray}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Mail size={20} color={COLORS.textGray} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                placeholderTextColor={COLORS.textGray}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Lock size={20} color={COLORS.textGray} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
                placeholderTextColor={COLORS.textGray}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff size={20} color={COLORS.textGray} />
                ) : (
                  <Eye size={20} color={COLORS.textGray} />
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.signupButton}
              onPress={handleSignup}
            >
              <Text style={styles.signupButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.loginLinkContainer}>
              <Text style={styles.loginLinkText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                <Text style={styles.loginLinkAction}>Login</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.divider} />
            </View>

            <TouchableOpacity 
              style={styles.captainButton}
              onPress={() => {}}
            >
              <Text style={styles.captainButtonText}>Sign Up as Customer</Text>
            </TouchableOpacity>

            <Text style={styles.termsText}>
              This site is protected by reCAPTCHA and the Google{' '}
              <Text style={styles.linkText}>Privacy Policy</Text> and{' '}
              <Text style={styles.linkText}>Terms of Service</Text> apply.
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
  },
  headerNav: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.light,
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
        outlineStyle: 'none',
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
    color: COLORS.primary,
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
    color: COLORS.primary,
    fontFamily: FONTS.inter.medium,
  },
});
