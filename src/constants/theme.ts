import { Dimensions, Platform } from 'react-native';

export const COLORS = {
  primary: '#001F3F', // Premium Navy Blue
  secondary: '#002B5B', // Deep Navy
  accent: '#004080', // Mid Navy
  background: '#F8FAFC',
  backgroundEnd: '#FFFFFF',
  cardBackground: '#FFFFFF',
  textDark: '#0F172A',
  textLight: '#FFFFFF',
  textGray: '#64748B',
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  border: '#E2E8F0',
  overlay: 'rgba(15, 23, 42, 0.5)',
};

export const DARK_COLORS = {
  primary: '#005BB7', // Luminous Navy Blue for better Dark Mode visibility
  secondary: '#004080', 
  accent: '#007AFF',
  background: '#000000',
  backgroundEnd: '#000000',
  cardBackground: '#121212',
  textDark: '#F8FAFC',
  textLight: '#F8FAFC',
  textGray: '#94A3B8',
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  border: '#262626',
  overlay: 'rgba(0, 0, 0, 0.8)',
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
