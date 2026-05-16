import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  isLoggedIn: boolean;
  isFirstTime: boolean;
  user: any | null;
  isDarkMode: boolean;
  avatar: string | null;
  setLoggedIn: (status: boolean) => void;
  setFirstTime: (status: boolean) => void;
  setUser: (user: any) => void;
  setAvatar: (uri: string) => void;
  toggleDarkMode: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      isFirstTime: true,
      user: null,
      isDarkMode: false,
      avatar: null,
      setLoggedIn: (status) => set({ isLoggedIn: status }),
      setFirstTime: (status) => set({ isFirstTime: status }),
      setUser: (user) => set({ user }),
      setAvatar: (uri) => set({ avatar: uri }),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      logout: () => set({ isLoggedIn: false, isFirstTime: true, user: null, avatar: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
