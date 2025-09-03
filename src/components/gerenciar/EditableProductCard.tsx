"use client";

import { useState, useEffect } from "react";
import { Product, ProductUpdateInput } from "@/types/product";
import { ProductCategory } from "@prisma/client";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Save, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface EditableProductCardProps {
  product: Product;
  categories: ProductCategory[];
  onUpdate: (id: string, data: ProductUpdateInput) => Promise<Product>;
  onDelete: (id: string) => Promise<void>;
}

export function EditableProductCard({
  product: initialProduct,
  categories,
  onUpdate,
  onDelete,
}: EditableProductCardProps) {
  const [product, setProduct] = useState(initialProduct);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState<ProductUpdateInput>({
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    stock: product.stock,
    isAvailable: product.isAvailable,
    imageUrl: product.imageUrl,
  });

  useEffect(() => {
    setProduct(initialProduct);
  }, [initialProduct]);

  useEffect(() => {
    if (!isEditing) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        stock: product.stock,
        isAvailable: product.isAvailable,
        imageUrl: product.imageUrl,
      });
    }
  }, [product, isEditing]);


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isAvailable: checked }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value as ProductCategory }));
  };

  const handleCancel = () => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      isAvailable: product.isAvailable,
      imageUrl: product.imageUrl,
    });
    setIsEditing(false);
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      const updatedData: ProductUpdateInput = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      };
      const updatedProduct = await onUpdate(product.id, updatedData);
      if (updatedProduct) {
        setProduct(updatedProduct);
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update product:", error);
      // Here you could show a toast notification
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(product.id);
      // The component might unmount, so no need to set isEditing to false
    } catch (error) {
      console.error("Failed to delete product:", error);
      // Here you could show a toast notification
    } finally {
      setIsDeleting(false);
    }
  };

  const cardVariants = {
    initial: { scale: 1, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" },
    editing: {
      scale: 1.02,
      boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
    },
  };

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out",
        isEditing && "ring-2 ring-primary shadow-xl"
      )}
    >
      <AnimatePresence initial={false} mode="wait">
        {isEditing ? (
          <motion.div
            key="edit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CardHeader>
              <CardTitle>Editando: {product.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  name="description"
                  value={formData.description || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select
                    name="category"
                    value={formData.category}
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Estoque</Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="isAvailable"
                  checked={formData.isAvailable}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="isAvailable">Disponível para venda</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                <X className="mr-2 h-4 w-4" /> Cancelar
              </Button>
              <Button onClick={handleSave} disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Salvar
              </Button>
            </CardFooter>
          </motion.div>
        ) : (
          <motion.div
            key="view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-full"
          >
            <CardHeader>
              <div className="aspect-square relative w-full max-h-48 bg-gradient-to-br from-muted/20 to-muted/10">
                <Image
                  src={product.imageUrl ?? '/placeholder.png'}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-lg font-semibold text-primary">
                R$ {product.price.toFixed(2)}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="secondary">{product.category}</Badge>
                <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                  Estoque: {product.stock}
                </Badge>
                <Badge variant={product.isAvailable ? "default" : "outline"}>
                  {product.isAvailable ? "Disponível" : "Indisponível"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                {product.description}
              </p>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2 mt-auto pt-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            </CardFooter>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}