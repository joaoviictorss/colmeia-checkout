"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getUser, removeUser, saveUser } from "@/utils/functions/localStorage";
import type { User, UserSession } from "@/utils/types/user";

const UserContext = createContext<UserSession | null>(null);

interface UserProviderProps {
  children: React.ReactNode;
  initialUser?: User | null;
}

export function UserProvider({
  children,
  initialUser = null,
}: UserProviderProps) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [loading, setLoading] = useState(false);

  const fetchUser = useCallback(() => {
    setLoading(true);
    const userData = getUser();
    setUser(userData);
    setLoading(false);
  }, []);

  const login = useCallback((userData: User) => {
    saveUser(userData);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    removeUser();
    setUser(null);
  }, []);

  useEffect(() => {
    if (!initialUser) {
      fetchUser();
    }
  }, [initialUser, fetchUser]);

  const contextValue: UserSession = {
    user,
    loading,
    refetch: fetchUser,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export function useUser(): UserSession {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}
