import { PrismaClient, ProductCategory } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  // 1. Deleta todos os produtos existentes para evitar erros de nome único
  await prisma.product.deleteMany({});
  console.log("Deleted existing products.");

  // 2. Cria os novos produtos com as categorias e campos corretos
  const productData = [
    // --- BEBIDAS ---
    {
      name: "Corona Extra",
      description: "Lata 473ml",
      price: new Decimal("12.00"),
      category: ProductCategory.BEBIDA,
      stock: 50, // Estoque alto
      isAvailable: true,
      imageUrl: "https://i.imgur.com/Scs8RM9.png",
    },
    {
      name: "Brahma Duplo Malte",
      description: "Lata 473ml",
      price: new Decimal("18.50"),
      category: ProductCategory.BEBIDA,
      stock: 3, // Estoque baixo
      isAvailable: true,
      imageUrl: "https://i.imgur.com/FDCINLC.png",
    },
    // --- SUCOS ---
    {
      name: "Suco de Laranja Natural (Copo 300ml)",
      description: "Feito com laranjas frescas, espremido na hora.",
      price: new Decimal("8.00"),
      category: ProductCategory.SUCO,
      stock: 12,
      isAvailable: true,
      imageUrl: "https://i.imgur.com/K5LXCbB.png",
    },
    // --- REFRIGERANTES ---
    {
      name: "Coca-Cola (Lata)",
      description: "Lata 350ml, Zero Caloria",
      price: new Decimal("6.50"),
      category: ProductCategory.REFRIGERANTE,
      stock: 150, // Estoque alto
      isAvailable: true,
      imageUrl:
        "https://i.imgur.com/VXgKtP8_d.webp?maxwidth=760&fidelity=grand",
    },
    {
      name: "Guaraná Antarctica (Lata)",
      description: "Refrigerante de guaraná, lata 350ml.",
      price: new Decimal("6.00"),
      category: ProductCategory.REFRIGERANTE,
      stock: 8, // Estoque baixo
      isAvailable: true,
      imageUrl: "https://i.imgur.com/KkNE7It.png",
    },
    // --- ÁGUAS ---
    {
      name: "Água Mineral com Gás",
      description: "Garrafa de 500ml.",
      price: new Decimal("4.00"),
      category: ProductCategory.AGUA,
      stock: 200,
      isAvailable: true,
      imageUrl: "https://i.imgur.com/EbiL7i6.png",
    },
    {
      name: "Água Mineral sem Gás",
      description: "Garrafa de 500ml.",
      price: new Decimal("3.50"),
      category: ProductCategory.AGUA,
      stock: 0, // Sem estoque
      isAvailable: false, // Indisponível (não deve aparecer no cardápio)
      imageUrl: "https://i.imgur.com/BNIhtj0.png",
    },
  ];

  for (const p of productData) {
    const product = await prisma.product.create({
      data: p,
    });
    console.log(
      `Created product with id: ${product.id} and name: ${product.name}`
    );
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
