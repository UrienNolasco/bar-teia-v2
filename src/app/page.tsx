import { getProducts } from "@/actions/products/read-products";
import { ProductCategory } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import { CategoryFilter } from "@/components/home/CategoryFilter";
import { ProductCard } from "@/components/home/ProductCard";

export default async function Home() {
  const products = await getProducts();

  const categories = [
    { value: ProductCategory.BEBIDA, label: "Bebidas", icon: "🍺" },
    { value: ProductCategory.SUCO, label: "Sucos", icon: "🧃" },
    { value: ProductCategory.REFRIGERANTE, label: "Refrigerantes", icon: "🥤" },
    { value: ProductCategory.AGUA, label: "Água", icon: "💧" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header com gradiente roxo */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 shadow-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            O Bar da Teia está de volta
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Agora com pagamento via pix integrado, acesse a aba de créditos para
            começar a usar
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Seção de Categorias */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            Categorias
          </h2>
          <CategoryFilter categories={categories} />
        </section>

        {/* Seção de Produtos */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            Produtos
          </h2>
          {products.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  Nenhum produto disponível no momento.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    ...product,
                    price: parseFloat(product.price.toString()),
                  }}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
