import React, { useState, useRef, useEffect } from 'react';
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
import { ArrowLeft, CheckCircle2 } from 'lucide-react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../src/constants/theme';

export default function OTP() {
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<TextInput[]>([]);
  const [timer, setTimer] = useState(30);
  const [dummyOtp, setDummyOtp] = useState('');

  const isSmall = windowWidth < 400;
  const responsivePadding = isSmall ? SPACING.md : SPACING.xl;

  useEffect(() => {
    // Generate a dummy 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setDummyOtp(code);

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    if (otp.every(digit => digit !== '')) {
      // For demo, we'll just go to signup
      router.push('/(auth)/signup');
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
            { paddingHorizontal: responsivePadding }
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft color={COLORS.textDark} size={24} />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={[styles.title, { fontSize: isSmall ? 24 : 28 }]}>Verify OTP</Text>
            <Text style={styles.subtitle}>
              Enter the 6-digit code sent to your mobile number
            </Text>
            <View style={styles.dummyContainer}>
              <Text style={styles.dummyText}>For testing, use: <Text style={styles.dummyCode}>{dummyOtp}</Text></Text>
            </View>
          </View>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref as TextInput)}
                style={[
                  styles.otpInput,
                  { 
                    width: isSmall ? 38 : 45,
                    height: isSmall ? 50 : 55,
                    fontSize: isSmall ? 18 : 22,
                  }
                ]}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                autoFocus={index === 0}
              />
            ))}
          </View>

          <View style={styles.timerContainer}>
            {timer > 0 ? (
              <Text style={styles.timerText}>Resend OTP in {timer}s</Text>
            ) : (
              <TouchableOpacity>
                <Text style={styles.resendText}>Resend OTP</Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity 
            style={[
              styles.button, 
              !otp.every(digit => digit !== '') && styles.buttonDisabled
            ]} 
            onPress={handleVerify}
            disabled={!otp.every(digit => digit !== '')}
          >
            <Text style={styles.buttonText}>Verify & Continue</Text>
            <CheckCircle2 color={COLORS.textLight} size={20} />
          </TouchableOpacity>
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
  scrollContent: {
    flexGrow: 1,
    paddingTop: SPACING.lg,
    width: '100%',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xxl,
    ...SHADOWS.light,
  },
  header: {
    marginBottom: SPACING.xxl,
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
  dummyContainer: {
    backgroundColor: COLORS.primary + '10',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginTop: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.primary + '20',
    alignItems: 'center',
  },
  dummyText: {
    fontFamily: FONTS.inter.medium,
    fontSize: 14,
    color: COLORS.textDark,
  },
  dummyCode: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 16,
    color: COLORS.primary,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
  },
  otpInput: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    textAlign: 'center',
    fontFamily: FONTS.inter.bold,
    color: COLORS.primary,
    ...SHADOWS.light,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      },
    }),
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  timerText: {
    fontFamily: FONTS.inter.medium,
    fontSize: 14,
    color: COLORS.textGray,
  },
  resendText: {
    fontFamily: FONTS.inter.semiBold,
    fontSize: 14,
    color: COLORS.primary,
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
