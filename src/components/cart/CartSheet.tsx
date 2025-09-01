"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CartIcon } from "@/components/CartIcon";
import { CartItem } from "./CartItem";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag } from "lucide-react";

export function CartSheet() {
  const { items, getTotalPrice, clearCart } = useCart();
  const totalPrice = getTotalPrice();

  const handleConfirmPurchase = () => {
    // Aqui você pode implementar a lógica de confirmação da compra
    console.log("Confirmando compra:", items);
    // Por enquanto, apenas limpa o carrinho
    clearCart();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-card hover:bg-primary/90"
          size="icon"
        >
          <CartIcon />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-80 sm:w-96">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Carrinho de Compras
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* Lista de Produtos */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Seu carrinho está vazio</p>
                <p className="text-sm text-muted-foreground">
                  Adicione produtos para começar
                </p>
              </div>
            ) : (
              <div className="p-4 space-y-4">
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
            <div className="border-t pt-4 space-y-4 p-4">
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

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={clearCart}
                >
                  Limpar Carrinho
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
