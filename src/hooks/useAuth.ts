"use client";

import { useSession } from "next-auth/react";
import { toast } from "sonner";

export function useAuth() {
  const { data: session, status } = useSession();

  const isAuthenticated = !!session?.user;
  const isLoading = status === "loading";

  const requireAuth = (
    action: () => void,
    message = "Faça login para utilizar o bar da teia"
  ) => {
    if (!isAuthenticated) {
      toast.error(message);
      return;
    }
    action();
  };

  const checkAuth = (
    message = "Somente usuários logados podem acessar esta página"
  ) => {
    if (!isAuthenticated) {
      toast.warning(message);
      return false;
    }
    return true;
  };

  return {
    session,
    isAuthenticated,
    isLoading,
    requireAuth,
    checkAuth,
  };
}
