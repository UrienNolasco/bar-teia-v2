'use server';

import { PrismaClient } from '@prisma/client';
import { ProductCreateInput } from '@/types/product';

const prisma = new PrismaClient();

export async function createProduct(data: ProductCreateInput) {
  try {
    const product = await prisma.product.create({
      data,
    });
    return product;
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Failed to create product.');
  }
}
