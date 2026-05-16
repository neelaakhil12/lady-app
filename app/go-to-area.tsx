import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  Switch,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Heart, Trash2, Plus, Home, Briefcase, Info } from 'lucide-react-native';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, DARK_COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../src/constants/theme';
import { useAuthStore } from '../src/store/useAuthStore';

interface SavedArea {
  id: string;
  name: string;
  active: boolean;
}

export default function GoToArea() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isDarkMode } = useAuthStore();
  const activeColors = isDarkMode ? DARK_COLORS : COLORS;
  
  const [areas, setAreas] = useState<SavedArea[]>([
    { id: '1', name: 'B.N Reddy Nagar, Hyderabad', active: false },
    { id: '2', name: 'L. B. Nagar, Hyderabad', active: false },
  ]);

  const toggleArea = (id: string) => {
    setAreas(prev => prev.map(area => {
      if (area.id === id) return { ...area, active: !area.active };
      return { ...area, active: false }; // Only 1 area active at a time
    }));
  };

  const deleteArea = (id: string) => {
    setAreas(prev => prev.filter(area => area.id !== id));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: activeColors.background }]} edges={[]}>
      <View style={[
        styles.header,
        { 
          paddingTop: Platform.OS === 'web' ? SPACING.md : insets.top + SPACING.sm,
          backgroundColor: activeColors.background,
          borderBottomColor: activeColors.border
        }
      ]}>
        <TouchableOpacity 
          onPress={() => router.canGoBack() ? router.back() : router.replace('/(tabs)')} 
          style={styles.backBtn}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <ArrowLeft size={24} color={activeColors.textDark} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: activeColors.textDark }]}>Go to Area</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Banner Section */}
        <View style={[styles.banner, { backgroundColor: activeColors.primary + '10', borderColor: activeColors.primary + '30' }]}>
          <View style={styles.bannerTextContainer}>
            <Text style={[styles.bannerTitle, { color: activeColors.primary }]}>Get orders to your home or anywhere you want to go</Text>
            <TouchableOpacity style={styles.knowMoreBtn}>
              <Info size={16} color={activeColors.primary} />
              <Text style={[styles.knowMoreText, { color: activeColors.primary }]}>Know more</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bannerIconContainer}>
            <View style={styles.pinBg}>
              <MapPin size={40} color="#FF5A5F" fill="#FF5A5F" />
              <View style={styles.heartOverlay}>
                <Heart size={12} color="#FFF" fill="#FFF" />
              </View>
            </View>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: activeColors.textDark }]}>Saved drop areas (Switch ON up to 1 areas)</Text>

        {areas.map(area => (
          <View key={area.id} style={[styles.areaCard, { backgroundColor: activeColors.cardBackground, borderColor: activeColors.border }]}>
            <View style={styles.areaInfo}>
              <Text style={[styles.areaName, { color: activeColors.textDark }]}>{area.name}</Text>
              <Switch 
                value={area.active} 
                onValueChange={() => toggleArea(area.id)}
                trackColor={{ false: '#DDD', true: activeColors.primary + '80' }}
                thumbColor={area.active ? activeColors.primary : '#FFF'}
              />
            </View>
            <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteArea(area.id)}>
              <Trash2 size={16} color={activeColors.textGray} />
              <Text style={[styles.deleteText, { color: activeColors.textGray }]}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.quickAddContainer}>
          <TouchableOpacity style={[styles.quickAddBtn, { backgroundColor: activeColors.cardBackground, borderColor: activeColors.border }]}>
            <Home size={20} color={activeColors.textDark} />
            <Text style={[styles.quickAddText, { color: activeColors.textDark }]}>Add Home Area</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickAddBtn, { backgroundColor: activeColors.cardBackground, borderColor: activeColors.border }]}>
            <Briefcase size={20} color={activeColors.textDark} />
            <Text style={[styles.quickAddText, { color: activeColors.textDark }]}>Add Office Area</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.addNewBtn, { backgroundColor: activeColors.cardBackground, borderColor: activeColors.border }]}>
          <Text style={[styles.addNewText, { color: activeColors.textDark }]}>Add new area</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
  },
  backBtn: {
    padding: 10,
    marginLeft: -10,
    zIndex: 10,
  },
  headerTitle: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 20,
    color: COLORS.textDark,
    marginLeft: SPACING.md,
  },
  scrollContent: {
    padding: SPACING.md,
  },
  banner: {
    backgroundColor: '#FFE4E6',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  bannerTextContainer: {
    flex: 2,
  },
  bannerTitle: {
    fontFamily: FONTS.poppins.bold,
    fontSize: 18,
    color: COLORS.textDark,
    lineHeight: 24,
  },
  knowMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  knowMoreText: {
    fontFamily: FONTS.inter.bold,
    fontSize: 14,
    color: COLORS.primary,
    marginLeft: 6,
  },
  bannerIconContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  pinBg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 90, 95, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartOverlay: {
    position: 'absolute',
    top: 25,
    backgroundColor: '#FF5A5F',
    padding: 4,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFE4E6',
  },
  sectionTitle: {
    fontFamily: FONTS.inter.bold,
    fontSize: 14,
    color: COLORS.textDark,
    marginBottom: SPACING.lg,
  },
  areaCard: {
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    ...SHADOWS.light,
  },
  areaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  areaName: {
    fontFamily: FONTS.poppins.semiBold,
    fontSize: 16,
    color: '#64748B',
    flex: 1,
    marginRight: SPACING.md,
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteText: {
    fontFamily: FONTS.inter.medium,
    fontSize: 14,
    color: COLORS.textGray,
    marginLeft: 6,
  },
  quickAddContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.xl,
    marginBottom: SPACING.md,
  },
  quickAddBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.round,
    paddingVertical: 12,
    gap: 8,
  },
  quickAddText: {
    fontFamily: FONTS.inter.bold,
    fontSize: 14,
  },
  addNewBtn: {
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.round,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  addNewText: {
    fontFamily: FONTS.inter.bold,
    fontSize: 16,
  },
});
