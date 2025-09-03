import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      }
    });
    return products.map(product => ({
      ...product,
      price: product.price.toNumber(),
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products.');
  }
}

export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (product) {
      return {
        ...product,
        price: product.price.toNumber(),
      };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw new Error('Failed to fetch product.');
  }
}
