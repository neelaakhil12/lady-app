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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, DARK_COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../src/constants/theme';
import { useAuthStore } from '../../src/store/useAuthStore';

export default function OTP() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const width = Platform.OS === 'web' ? Math.min(windowWidth, 450) : windowWidth;
  const { isDarkMode } = useAuthStore();
  const activeColors = isDarkMode ? DARK_COLORS : COLORS;
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<TextInput[]>([]);
  const [timer, setTimer] = useState(30);
  const [dummyOtp, setDummyOtp] = useState('');

  const isSmall = width < 400;
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
    <View style={[styles.container, { backgroundColor: activeColors.background }]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        enabled={Platform.OS !== 'web'}
      >
        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={[
            styles.scrollContent, 
            { 
              paddingHorizontal: responsivePadding,
              paddingTop: Platform.OS === 'web' ? SPACING.lg : insets.top + SPACING.lg
            }
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft color={activeColors.textDark} size={24} />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={[styles.title, { fontSize: isSmall ? 24 : 28, color: activeColors.textDark }]}>Verify OTP</Text>
            <Text style={[styles.subtitle, { color: activeColors.textGray }]}>
              Enter the 6-digit code sent to your mobile number
            </Text>
            <View style={[styles.dummyContainer, { backgroundColor: activeColors.primary + '15' }]}>
              <Text style={[styles.dummyText, { color: activeColors.textGray }]}>For testing, use: <Text style={[styles.dummyCode, { color: activeColors.primary }]}>{dummyOtp}</Text></Text>
            </View>
          </View>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => { inputRefs.current[index] = ref as TextInput; }}
                style={[
                  styles.otpInput,
                  { 
                    width: isSmall ? 38 : 45,
                    height: isSmall ? 50 : 55,
                    fontSize: isSmall ? 18 : 22,
                    backgroundColor: activeColors.cardBackground,
                    borderColor: activeColors.border,
                    color: activeColors.textDark
                  }
                ]}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                placeholderTextColor={activeColors.textGray}
                autoFocus={index === 0}
              />
            ))}
          </View>

          <View style={styles.timerContainer}>
            {timer > 0 ? (
              <Text style={[styles.timerText, { color: activeColors.textGray }]}>Resend OTP in {timer}s</Text>
            ) : (
              <TouchableOpacity>
                <Text style={[styles.resendText, { color: activeColors.primary }]}>Resend OTP</Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity 
            style={[
              styles.button, 
              { backgroundColor: activeColors.primary },
              !otp.every(digit => digit !== '') && styles.buttonDisabled
            ]} 
            onPress={handleVerify}
            disabled={!otp.every(digit => digit !== '')}
          >
            <Text style={styles.buttonText}>Verify & Continue</Text>
            <CheckCircle2 color={activeColors.textLight} size={20} />
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    width: '100%',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  },
  subtitle: {
    fontFamily: FONTS.inter.regular,
    fontSize: 16,
    marginTop: SPACING.xs,
  },
  dummyContainer: {
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginTop: SPACING.lg,
    borderWidth: 1,
    alignItems: 'center',
  },
  dummyText: {
    fontFamily: FONTS.inter.medium,
    fontSize: 14,
  },
  dummyCode: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 16,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
  },
  otpInput: {
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    textAlign: 'center',
    fontFamily: FONTS.inter.bold,
    ...SHADOWS.light,
    ...Platform.select({
      web: {
        outlineStyle: 'none' as any,
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
  },
  resendText: {
    fontFamily: FONTS.inter.semiBold,
    fontSize: 14,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: BORDER_RADIUS.md,
    ...SHADOWS.medium,
  },
  buttonDisabled: {
    opacity: 0.5,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 18,
    marginRight: SPACING.sm,
  },
});
