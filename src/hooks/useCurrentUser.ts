"use client";

import { useCallback, useEffect, useState } from "react";

import { getCurrentUser } from "@/services/auth.service";
import { User } from "@/types/user";

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getCurrentUser();

      if (data.success) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return {
    user,
    setUser,
    loading,
    refreshUser,
  };
}
