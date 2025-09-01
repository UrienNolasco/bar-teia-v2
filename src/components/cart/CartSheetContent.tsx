"use client";

import { Button } from "@/components/ui/button";
import { CartItem } from "./CartItem";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag, X } from "lucide-react";

interface CartSheetContentProps {
  onClose?: () => void;
}

export function CartSheetContent({ onClose }: CartSheetContentProps) {
  const { items, getTotalPrice, clearCart } = useCart();
  const totalPrice = getTotalPrice();

  const handleConfirmPurchase = () => {
    // Aqui você pode implementar a lógica de confirmação da compra
    console.log("Confirmando compra:", items);
    // Por enquanto, apenas limpa o carrinho
    clearCart();
    if (onClose) onClose();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Carrinho de Compras</h2>
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            className="w-8 h-8 p-0"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Lista de Produtos */}
      <div className="flex-1 overflow-y-auto p-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Seu carrinho está vazio</p>
            <p className="text-sm text-muted-foreground">
              Adicione produtos para começar
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <CartItem
                key={item.product.id}
                product={item.product}
                quantity={item.quantity}
              />
            ))}
          </div>
        )}
      </div>

      {/* Resumo e Botões */}
      {items.length > 0 && (
        <div className="border-t p-4 space-y-4">
          {/* Total */}
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total:</span>
            <span>R$ {totalPrice.toFixed(2)}</span>
          </div>

          {/* Botões */}
          <div className="space-y-2">
            <Button className="w-full" onClick={handleConfirmPurchase}>
              Confirmar Compra
            </Button>

            <Button variant="outline" className="w-full" onClick={clearCart}>
              Limpar Carrinho
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
