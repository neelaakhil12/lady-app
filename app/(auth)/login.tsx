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
  useWindowDimensions,
  Modal,
  FlatList
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronRight, ChevronDown, Search, X } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, DARK_COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../src/constants/theme';
import { useAuthStore } from '../../src/store/useAuthStore';

const COUNTRY_CODES = [
  { code: '+91', country: 'India', flag: '🇮🇳', short: 'IN' },
  { code: '+1', country: 'USA', flag: '🇺🇸', short: 'US' },
  { code: '+44', country: 'UK', flag: '🇬🇧', short: 'GB' },
  { code: '+971', country: 'UAE', flag: '🇦🇪', short: 'AE' },
  { code: '+61', country: 'Australia', flag: '🇦🇺', short: 'AU' },
  { code: '+1', country: 'Canada', flag: '🇨🇦', short: 'CA' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬', short: 'SG' },
  { code: '+49', country: 'Germany', flag: '🇩🇪', short: 'DE' },
  { code: '+33', country: 'France', flag: '🇫🇷', short: 'FR' },
  { code: '+81', country: 'Japan', flag: '🇯🇵', short: 'JP' },
];

export default function Login() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const { isDarkMode } = useAuthStore();
  const activeColors = isDarkMode ? DARK_COLORS : COLORS;

  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isWeb = Platform.OS === 'web';
  const isSmall = windowWidth < 400;
  const isVerySmall = windowWidth < 360;
  // Use smaller padding on web so content fits inside the 400px mobile frame
  const responsiveSpacing = isWeb
    ? SPACING.md  // 16px on web
    : isVerySmall ? 12 : (isSmall ? SPACING.md : SPACING.xl);
  const brandFontSize = isVerySmall ? 26 : (isSmall ? 32 : 40);
  const inputFontSize = isVerySmall ? 15 : 18;


  const filteredCountries = COUNTRY_CODES.filter(c =>
    c.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.code.includes(searchQuery)
  );

  const handleLogin = () => {
    if (phoneNumber.length === 10) {
      router.push('/(auth)/otp');
    }
  };

  const renderCountryItem = ({ item }: { item: typeof COUNTRY_CODES[0] }) => (
    <TouchableOpacity
      style={[styles.countryItem, { borderBottomColor: activeColors.border }]}
      onPress={() => {
        setSelectedCountry(item);
        setIsPickerVisible(false);
        setSearchQuery('');
      }}
    >
      <Text style={styles.countryFlag}>{item.flag}</Text>
      <Text style={[styles.countryName, { color: activeColors.textDark }]}>{item.country}</Text>
      <Text style={[styles.countryCodeValue, { color: activeColors.primary }]}>{item.code}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: activeColors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, width: '100%' }}
        enabled={Platform.OS !== 'web'}
      >
        <ScrollView
          style={{ flex: 1, width: '100%' }}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingHorizontal: responsiveSpacing,
              paddingTop: Platform.OS === 'web' ? SPACING.xl : insets.top + SPACING.xl
            }
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={[
            styles.header,
            {
              marginBottom: isSmall ? SPACING.xl : SPACING.xxl * 1.5,
              width: '100%'
            }
          ]}>
            <Text style={[styles.welcomeText, { color: activeColors.textGray }]}>Welcome to</Text>
            <Text style={[
              styles.brandText,
              { fontSize: brandFontSize, color: activeColors.textDark }
            ]}>Lady Pilot</Text>
            <Text style={[styles.subtitle, { color: activeColors.primary }]}>Captain Application</Text>
          </View>

          <View style={[styles.formContainer, { width: '100%' }]}>
            <Text style={[styles.label, { color: activeColors.textDark }]}>Enter Mobile Number</Text>
            <View style={[
              styles.inputContainer,
              {
                height: isVerySmall ? 54 : 60,
                backgroundColor: activeColors.cardBackground,
                borderColor: activeColors.border
              }
            ]}>
              <TouchableOpacity
                style={[styles.countryCodeSelector, { borderRightColor: activeColors.border }]}
                onPress={() => setIsPickerVisible(true)}
              >
                <Text style={styles.flagText}>{selectedCountry.flag}</Text>
                <Text style={[styles.countryCodeText, { fontSize: isVerySmall ? 13 : 15, color: activeColors.textDark }]}>
                  {selectedCountry.code}
                </Text>
                <ChevronDown size={13} color={activeColors.textDark} />
              </TouchableOpacity>

              <TextInput
                style={[styles.input, { fontSize: inputFontSize, color: activeColors.textDark }]}
                placeholder="00000 00000"
                keyboardType="phone-pad"
                maxLength={10}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholderTextColor={activeColors.textGray}
                autoFocus
              />
            </View>

            <Text style={[styles.infoText, { color: activeColors.textGray }]}>
              We will send an OTP to verify your number.
            </Text>

            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: activeColors.primary },
                phoneNumber.length !== 10 && styles.buttonDisabled,
                { width: '100%' }
              ]}
              onPress={handleLogin}
              disabled={phoneNumber.length !== 10}
            >
              <Text style={styles.buttonText}>Send OTP</Text>
              <ChevronRight color={activeColors.textLight} size={20} />
            </TouchableOpacity>
          </View>

          <View style={[styles.footer, { width: '100%' }]}>
            <Text style={[styles.footerText, { color: activeColors.textGray }]}>
              By continuing, you agree to our{' '}
              <Text style={[styles.linkText, { color: activeColors.primary }]}>Terms of Service</Text> and{' '}
              <Text style={[styles.linkText, { color: activeColors.primary }]}>Privacy Policy</Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Country Picker: inline on web (stays inside mobile frame), Modal on native */}
      {isWeb ? (
        isPickerVisible && (
          <View style={styles.webPickerOverlay}>
            <View style={[styles.webPickerSheet, { backgroundColor: activeColors.cardBackground }]}>
              <View style={[styles.modalHeader, { borderBottomColor: activeColors.border }]}>
                <Text style={[styles.modalTitle, { color: activeColors.textDark }]}>Select Country</Text>
                <TouchableOpacity onPress={() => { setIsPickerVisible(false); setSearchQuery(''); }}>
                  <X size={24} color={activeColors.textDark} />
                </TouchableOpacity>
              </View>

              <View style={[styles.searchContainer, { backgroundColor: activeColors.background, borderColor: activeColors.border }]}>
                <Search size={18} color={activeColors.textGray} />
                <TextInput
                  style={[styles.searchInput, { color: activeColors.textDark }]}
                  placeholder="Search country or code"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholderTextColor={activeColors.textGray}
                />
              </View>

              <FlatList
                data={filteredCountries}
                renderItem={renderCountryItem}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                style={{ maxHeight: 280 }}
                contentContainerStyle={{ paddingBottom: SPACING.xl }}
              />
            </View>
          </View>
        )
      ) : (
        <Modal
          visible={isPickerVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsPickerVisible(false)}
        >
          <View style={[styles.modalOverlay, { backgroundColor: activeColors.overlay }]}>
            <View style={[styles.modalContent, { height: windowHeight * 0.7, backgroundColor: activeColors.cardBackground }]}>
              <View style={[styles.modalHeader, { borderBottomColor: activeColors.border }]}>
                <Text style={[styles.modalTitle, { color: activeColors.textDark }]}>Select Country</Text>
                <TouchableOpacity onPress={() => setIsPickerVisible(false)}>
                  <X size={24} color={activeColors.textDark} />
                </TouchableOpacity>
              </View>

              <View style={[styles.searchContainer, { backgroundColor: activeColors.background, borderColor: activeColors.border }]}>
                <Search size={20} color={activeColors.textGray} />
                <TextInput
                  style={[styles.searchInput, { color: activeColors.textDark }]}
                  placeholder="Search country or code"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholderTextColor={activeColors.textGray}
                />
              </View>

              <FlatList
                data={filteredCountries}
                renderItem={renderCountryItem}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: SPACING.xl }}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    width: '100%',
    maxWidth: '100%',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: SPACING.xl,
    width: '100%',
    maxWidth: '100%',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    alignItems: 'flex-start',
  },
  welcomeText: {
    fontFamily: FONTS.poppins.medium,
    fontSize: 18,
    color: COLORS.textGray,
  },
  brandText: {
    fontFamily: FONTS.poppins.bold,
    color: COLORS.textDark,
    marginTop: -5,
  },
  subtitle: {
    fontFamily: FONTS.poppins.semiBold,
    fontSize: 16,
    color: COLORS.primary,
    marginTop: -5,
  },
  formContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'flex-start',
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
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
    ...SHADOWS.light,
  },
  countryCodeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRightWidth: 1,
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 10,
    gap: 4,
    minWidth: 95,
  },
  flagText: {
    fontSize: 18,
  },
  countryCodeText: {
    fontFamily: FONTS.inter.semiBold,
    color: COLORS.textDark,
  },
  input: {
    flex: 1,
    fontFamily: FONTS.inter.semiBold,
    color: COLORS.textDark,
    paddingHorizontal: 12,
    height: '100%',
    ...Platform.select({
      web: {
        outlineStyle: 'none' as any,
      },
    }),
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
    width: '100%',
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
    width: '100%',
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

  // Web inline picker (stays inside mobile frame)
  webPickerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  webPickerSheet: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
    padding: SPACING.xl,
    paddingBottom: SPACING.xxl,
  },

  // Native modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
    padding: SPACING.xl,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
    borderBottomWidth: 1,
    paddingBottom: SPACING.md,
  },
  modalTitle: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 20,
    color: COLORS.textDark,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 50,
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: SPACING.sm,
    fontFamily: FONTS.inter.medium,
    fontSize: 16,
    color: COLORS.textDark,
    ...Platform.select({
      web: {
        outlineStyle: 'none' as any,
      },
    }),
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  countryFlag: {
    fontSize: 24,
    marginRight: SPACING.md,
  },
  countryName: {
    flex: 1,
    fontFamily: FONTS.inter.medium,
    fontSize: 16,
    color: COLORS.textDark,
  },
  countryCodeValue: {
    fontFamily: FONTS.inter.bold,
    fontSize: 16,
    color: COLORS.primary,
  },
});
