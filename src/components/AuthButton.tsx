"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { ReactNode } from "react";

interface AuthButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  disabled?: boolean;
  authMessage?: string;
}

export function AuthButton({
  children,
  onClick,
  variant = "default",
  size = "default",
  className,
  disabled = false,
  authMessage = "Faça login para utilizar o bar da teia",
}: AuthButtonProps) {
  const { requireAuth } = useAuth();

  const handleClick = () => {
    requireAuth(onClick, authMessage);
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}
