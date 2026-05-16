import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LocationState {
  currentLocation: {
    latitude: number;
    longitude: number;
    address?: string;
  } | null;
  lastUpdated: number | null;
  isTracking: boolean;
  setLocation: (location: { latitude: number; longitude: number; address?: string }) => void;
  setTracking: (status: boolean) => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      currentLocation: null,
      lastUpdated: null,
      isTracking: false,
      setLocation: (location) => set({ 
        currentLocation: location, 
        lastUpdated: Date.now() 
      }),
      setTracking: (status) => set({ isTracking: status }),
    }),
    {
      name: 'location-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
