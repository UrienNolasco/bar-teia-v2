"use server";

import { prisma } from "@/lib/prisma";

export interface OverviewCardData {
  totalProducts: number;
  activeProducts: number;
  lowStockProducts: number;
  outOfStockProducts: number;
  totalStockValue: number;
}

export async function getOverviewCardData(): Promise<OverviewCardData> {
  const products = await prisma.product.findMany({
    select: {
      price: true,
      stock: true,
      isAvailable: true,
    },
  });

  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.isAvailable).length;
  const lowStockProducts = products.filter(
    (p) => p.stock > 0 && p.stock <= 2
  ).length;
  const outOfStockProducts = products.filter((p) => p.stock === 0).length;
  const totalStockValue = products
    .filter((p) => p.isAvailable)
    .reduce((acc, p) => acc + p.price.toNumber() * p.stock, 0);

  return {
    totalProducts,
    activeProducts,
    lowStockProducts,
    outOfStockProducts,
    totalStockValue,
  };
}
