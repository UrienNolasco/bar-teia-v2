"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CartIcon } from "@/components/CartIcon";
import { CartSheetContent } from "./CartSheetContent";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingCart() {
  const { items } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (items.length > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
      setIsOpen(false);
    }
  }, [items.length]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

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
        <Button
          onClick={handleToggle}
          className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-primary hover:bg-primary/90"
          size="icon"
        >
          <CartIcon />
        </Button>
      </div>

      {/* Painel do Carrinho */}
      <div
        className={cn(
          "absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-lg shadow-2xl border transition-all duration-300 ease-in-out transform",
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-2 pointer-events-none"
        )}
      >
        <CartSheetContent onClose={handleClose} />
      </div>
    </div>
  );
}
