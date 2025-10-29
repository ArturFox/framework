import { create } from 'zustand';

type AuthStore = {
  flagDialog: boolean;
  setFlagDialog: (value: boolean) => void;

  currentForm: 'login' | 'register' | 'forgotPassword';
  setCurrentForm: (value: 'login' | 'register' | 'forgotPassword') => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  flagDialog: false,
  setFlagDialog: (value) => set({ flagDialog: value }),

  currentForm: 'login',
  setCurrentForm: (value) => set({ currentForm: value }),
}));
