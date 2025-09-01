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

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      {/* Imagem do Produto */}
      <div className="aspect-square relative">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">🍺</span>
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Nome e Categoria */}
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-foreground text-sm leading-tight">
            {product.name}
          </h3>
          <Badge
            variant="secondary"
            className="text-xs bg-blue-100 text-blue-800"
          >
            {getCategoryLabel(product.category)}
          </Badge>
        </div>

        {/* Descrição */}
        {product.description && (
          <p className="text-xs text-muted-foreground leading-relaxed">
            {product.description}
          </p>
        )}

        {/* Preço e Quantidade */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-foreground">
            R$ {product.price.toFixed(2)}
          </span>
          <span className="text-xs text-green-600 font-medium">
            {product.stock} disponíveis
          </span>
        </div>

        {/* Botão Adicionar */}
        <Button
          className="w-full text-white"
          disabled={!product.isAvailable || product.stock === 0}
          onClick={handleAddToCart}
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar
        </Button>
      </CardContent>
    </Card>
  );
}
