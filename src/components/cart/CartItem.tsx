import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { ProductCategory } from "@prisma/client";

interface Product {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  imageUrl?: string | null;
  category: ProductCategory;
  stock: number;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface CartItemProps {
  product: Product;
  quantity: number;
}

export function CartItem({ product, quantity }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(product.id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  const price = product.price;

  return (
    <Card className="p-3 ">
      <div className="flex items-center gap-3">
        {/* Ícone do Produto */}
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
          <span className="text-primary-foreground text-lg">🍺</span>
        </div>

        {/* Informações do Produto */}
        <div className="flex-1">
          <h4 className="font-semibold text-sm">{product.name}</h4>
          <p className="text-xs text-muted-foreground">
            R$ {price.toFixed(2)} cada
          </p>

          {/* Seletor de Quantidade */}
          <div className="flex items-center gap-2 mt-2">
            <Button
              size="sm"
              variant="outline"
              className="w-8 h-8 p-0"
              onClick={() => handleQuantityChange(quantity - 1)}
            >
              <Minus className="w-3 h-3" />
            </Button>

            <Badge
              variant="secondary"
              className="w-6 h-6 p-0 flex items-center justify-center"
            >
              {quantity}
            </Badge>

            <Button
              size="sm"
              variant="outline"
              className="w-8 h-8 p-0"
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Preço Total e Botão Remover */}
        <div className="flex flex-col items-end gap-2">
          <span className="font-bold text-sm">
            R$ {(price * quantity).toFixed(2)}
          </span>

          <Button
            size="sm"
            variant="ghost"
            className="w-8 h-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleRemove}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
