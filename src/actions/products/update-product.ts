import { PrismaClient } from "@prisma/client";
import { ProductUpdateInput } from "@/types/product";

const prisma = new PrismaClient();

export async function updateProduct(id: string, data: ProductUpdateInput) {
  try {
    const product = await prisma.product.update({
      where: { id },
      data,
    });
    return product;
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    throw new Error("Failed to update product.");
  }
}
