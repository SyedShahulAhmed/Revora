"use client";

import { createContext, useContext, ReactNode } from "react";

import { logout } from "@/services/auth.service";
import { User } from "@/types/user";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface AuthContextType {
  user: User | null;

  loading: boolean;

  isAuthenticated: boolean;

  refreshUser: () => Promise<void>;

  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, setUser, loading, refreshUser } = useCurrentUser();

  async function handleLogout() {
    await logout();

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        refreshUser,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }

  return context;
}
