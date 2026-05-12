import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  isLoggedIn: boolean;
  isFirstTime: boolean;
  user: any | null;
  setLoggedIn: (status: boolean) => void;
  setFirstTime: (status: boolean) => void;
  setUser: (user: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      isFirstTime: true,
      user: null,
      setLoggedIn: (status) => set({ isLoggedIn: status }),
      setFirstTime: (status) => set({ isFirstTime: status }),
      setUser: (user) => set({ user }),
      logout: () => set({ isLoggedIn: false, isFirstTime: true, user: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
