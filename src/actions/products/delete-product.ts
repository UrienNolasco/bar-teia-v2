"use server";

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/gerenciar");
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw new Error('Failed to delete product.');
  }
}