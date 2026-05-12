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
import { Phone, ChevronRight } from 'lucide-react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../src/constants/theme';

export default function Login() {
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const [phoneNumber, setPhoneNumber] = useState('');

  const isSmall = windowWidth < 400;
  const responsiveSpacing = isSmall ? SPACING.md : SPACING.xl;

  const handleLogin = () => {
    if (phoneNumber.length === 10) {
      router.push('/(auth)/otp');
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        enabled={Platform.OS !== 'web'}
      >
        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingHorizontal: responsiveSpacing }
          ]} 
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={[
            styles.header,
            { marginBottom: isSmall ? SPACING.xl : SPACING.xxl * 1.5 }
          ]}>
            <Text style={styles.welcomeText}>Welcome to</Text>
            <Text style={[
              styles.brandText,
              { fontSize: isSmall ? 32 : 40 }
            ]}>Lady Pilot</Text>
            <Text style={styles.subtitle}>Captain Application</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.label}>Enter Mobile Number</Text>
            <View style={styles.inputContainer}>
              <View style={styles.countryCode}>
                <Text style={styles.countryCodeText}>+91</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="00000 00000"
                keyboardType="phone-pad"
                maxLength={10}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                autoFocus
              />
              <Phone size={20} color={COLORS.textGray} style={styles.inputIcon} />
            </View>

            <Text style={styles.infoText}>
              We will send an OTP to verify your number.
            </Text>

            <TouchableOpacity 
              style={[
                styles.button, 
                phoneNumber.length !== 10 && styles.buttonDisabled
              ]} 
              onPress={handleLogin}
              disabled={phoneNumber.length !== 10}
            >
              <Text style={styles.buttonText}>Send OTP</Text>
              <ChevronRight color={COLORS.textLight} size={20} />
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              By continuing, you agree to our{' '}
              <Text style={styles.linkText}>Terms of Service</Text> and{' '}
              <Text style={styles.linkText}>Privacy Policy</Text>
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
  scrollContent: {
    flexGrow: 1,
    paddingTop: Platform.OS === 'web' ? SPACING.xl : SPACING.xxl * 2,
    paddingBottom: SPACING.xl,
  },
  header: {
    // marginBottom set dynamically
  },
  welcomeText: {
    fontFamily: FONTS.poppins.medium,
    fontSize: 18,
    color: COLORS.textGray,
  },
  brandText: {
    fontFamily: FONTS.poppins.bold,
    // fontSize set dynamically
    color: COLORS.primary,
    marginTop: -5,
  },
  subtitle: {
    fontFamily: FONTS.poppins.semiBold,
    fontSize: 16,
    color: COLORS.accent,
    marginTop: -5,
  },
  formContainer: {
    flex: 1,
  },
  label: {
    fontFamily: FONTS.poppins.medium,
    fontSize: 14,
    color: COLORS.textDark,
    marginBottom: SPACING.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    height: 60,
    ...SHADOWS.light,
  },
  countryCode: {
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
    paddingRight: SPACING.md,
    marginRight: SPACING.md,
  },
  countryCodeText: {
    fontFamily: FONTS.inter.semiBold,
    fontSize: 16,
    color: COLORS.textDark,
  },
  input: {
    flex: 1,
    fontFamily: FONTS.inter.semiBold,
    fontSize: 18,
    color: COLORS.textDark,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      },
    }),
  },
  inputIcon: {
    marginLeft: SPACING.sm,
  },
  infoText: {
    fontFamily: FONTS.inter.regular,
    fontSize: 13,
    color: COLORS.textGray,
    marginTop: SPACING.md,
    marginBottom: SPACING.xxl,
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
  footer: {
    marginTop: 'auto',
    paddingTop: SPACING.xl,
  },
  footerText: {
    fontFamily: FONTS.inter.regular,
    fontSize: 12,
    color: COLORS.textGray,
    textAlign: 'center',
    lineHeight: 18,
  },
  linkText: {
    color: COLORS.primary,
    fontFamily: FONTS.inter.medium,
  },
});
