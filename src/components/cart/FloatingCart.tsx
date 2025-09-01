"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CartIcon } from "@/components/CartIcon";
import { CartSheet } from "./CartSheet";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";

export function FloatingCart() {
  const { items } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (items.length > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [items.length]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-20 right-4 z-50">
      {/* Botão do Carrinho */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
        )}
      >
        <CartSheet />
      </div>
    </div>
  );
}
