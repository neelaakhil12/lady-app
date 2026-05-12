import { Dimensions, Platform } from 'react-native';

export const COLORS = {
  primary: '#001F3F', // Navy Blue
  secondary: '#003366', // Deep Blue
  accent: '#0074D9', // Bright Blue
  background: '#F0F4F8', // Soft blue-gray background
  backgroundEnd: '#FFFFFF',
  cardBackground: '#FFFFFF',
  textDark: '#1E1E1E',
  textLight: '#FFFFFF',
  textGray: '#757575',
  success: '#2ECC40',
  error: '#FF4136',
  warning: '#FFDC00',
  info: '#0074D9',
  border: '#D1DCE5',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 100,
};

export const SHADOWS = {
  light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  heavy: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const FONTS = {
  poppins: {
    regular: 'Poppins_400Regular',
    medium: 'Poppins_500Medium',
    semiBold: 'Poppins_600SemiBold',
    bold: 'Poppins_700Bold',
  },
  inter: {
    regular: 'Inter_400Regular',
    medium: 'Inter_500Medium',
    semiBold: 'Inter_600SemiBold',
    bold: 'Inter_700Bold',
  },
};

// Helper for responsive sizing
const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
export const SCREEN_WIDTH = windowWidth;
export const SCREEN_HEIGHT = windowHeight;
export const IS_SMALL_SCREEN = windowWidth < 380;

export const getResponsiveValue = (currentWidth: number, smallValue: any, largeValue: any) => {
  return currentWidth < 400 ? smallValue : largeValue;
};
