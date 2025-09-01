import { ProductCategory } from "@/generated/prisma";

export interface Product {
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

export interface ProductCreateInput {
  name: string;
  description?: string | null;
  price: number;
  imageUrl?: string | null;
  category: ProductCategory;
  stock?: number;
  isAvailable?: boolean;
}

export interface ProductUpdateInput {
  name?: string;
  description?: string | null;
  price?: number;
  imageUrl?: string | null;
  category?: ProductCategory;
  stock?: number;
  isAvailable?: boolean;
}
