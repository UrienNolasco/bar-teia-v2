"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductCategory } from "@prisma/client";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";

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

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const getCategoryLabel = (category: ProductCategory) => {
    switch (category) {
      case ProductCategory.BEBIDA:
        return "Bebidas";
      case ProductCategory.SUCO:
        return "Sucos";
      case ProductCategory.REFRIGERANTE:
        return "Refrigerantes";
      case ProductCategory.AGUA:
        return "Água";
      default:
        return category;
    }
  };

  const getBadgeColor = (category: ProductCategory) => {
    if (category === ProductCategory.BEBIDA) return "bg-orange-500/50";
    if (category === ProductCategory.AGUA) return "bg-blue-500/50";
    if (category === ProductCategory.REFRIGERANTE) return "bg-red-500/50";
    return "bg-gray-500";
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-200 hover:scale-[1.02] border-2 shadow-md">
      {/* Imagem do Produto */}
      <div className="aspect-square relative w-full max-h-48 bg-gradient-to-br from-muted/20 to-muted/10">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">🍺</span>
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-3 space-y-3">
        {/* Nome e Categoria */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-bold text-foreground leading-tight flex-1 text-lg">
              {product.name}
            </h3>
            <Badge
              variant="secondary"
              className={`text-xs flex-shrink-0 text-white ${getBadgeColor(
                product.category
              )}`}
            >
              {getCategoryLabel(product.category)}
            </Badge>
          </div>

          {/* Descrição */}
          {product.description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        {/* Preço e Quantidade */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-foreground">
            R$ {product.price.toFixed(2)}
          </span>
          <span className="text-sm font-medium text-green-500">
            {product.stock} disponíveis
          </span>
        </div>

        {/* Botão Adicionar */}
        <Button
          className="w-full font-semibold"
          disabled={!product.isAvailable || product.stock === 0}
          onClick={handleAddToCart}
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar ao Carrinho
        </Button>
      </CardContent>
    </Card>
  );
}
