"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";

export function CartIcon() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <div className="relative">
      <ShoppingCart className="w-6 h-6 text-foreground " />
      {totalItems > 0 && (
        <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs bg-green-500 rounded-full">
          {totalItems}
        </Badge>
      )}
    </div>
  );
}
