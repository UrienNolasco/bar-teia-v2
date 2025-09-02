"use client";

import { useState, useEffect } from "react";
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
          "transition-all duration-700 ease-out transform",
          isVisible
            ? "opacity-100 scale-100 translate-y-0 animate-in slide-in-from-bottom-4 fade-in-0 zoom-in-95"
            : "opacity-0 scale-75 translate-y-4"
        )}
        style={{
          animationDelay: isVisible ? "100ms" : "0ms",
          animationDuration: "700ms",
          animationFillMode: "both",
          animationTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <CartSheet />
      </div>
    </div>
  );
}
