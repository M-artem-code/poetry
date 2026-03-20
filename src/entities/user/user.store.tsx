'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/src/shared/types';
import React from 'react';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),
      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'user-storage',
    }
  )
);

// Provider для SSR совместимости
export const UserStoreProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
