import { NovoProdutoDialog } from "@/components/gerenciar/NovoProdutoDialog";
import { OverviewCard } from "@/components/gerenciar/OverviewCard";
import { getOverviewCardData } from "@/actions/products/read-overview-cards-data";
import { updateProduct } from "@/actions/products/update-product";
import { deleteProduct } from "@/actions/products/delete-product";
import { EditableProductCard } from "@/components/gerenciar/EditableProductCard";
import { Box, CheckCircle, AlertTriangle, XCircle, Coins } from "lucide-react";
import { ProductCategory } from "@prisma/client";
import { getProducts } from "@/actions/products/read-products";

export default async function GerenciarPage() {
  const overviewData = await getOverviewCardData();
  const products = await getProducts();
  const categories = Object.values(ProductCategory);

  return (
    <div className="p-4 space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Gerenciar Produtos</h1>
        <p className="text-muted-foreground">
          Adicione, edite e controle o estoque dos produtos do frigobar
        </p>
      </div>

      <NovoProdutoDialog categories={categories} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <OverviewCard
          title="Total de Produtos"
          value={overviewData.totalProducts.toString()}
          icon={Box}
        />
        <OverviewCard
          title="Produtos Ativos"
          value={overviewData.activeProducts.toString()}
          icon={CheckCircle}
        />
        <OverviewCard
          title="Estoque Baixo"
          value={overviewData.lowStockProducts.toString()}
          icon={AlertTriangle}
          valueClassName="text-orange-500"
        />
        <OverviewCard
          title="Sem Estoque"
          value={overviewData.outOfStockProducts.toString()}
          icon={XCircle}
          valueClassName="text-red-500"
        />
        <OverviewCard
          title="Valor Total do Estoque"
          value={`R$ ${overviewData.totalStockValue.toFixed(2)}`}
          icon={Coins}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <EditableProductCard
            key={product.id}
            product={{
              ...product,
              price: parseFloat(product.price.toString()),
            }}
            categories={categories}
            onUpdate={updateProduct}
            onDelete={deleteProduct}
          />
        ))}
      </div>
    </div>
  );
}
