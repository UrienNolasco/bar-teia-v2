import { NovoProdutoDialog } from "@/components/gerenciar/NovoProdutoDialog";
import { OverviewCard } from "@/components/gerenciar/OverviewCard";
import { Input } from "@/components/ui/input";
import { getOverviewCardData } from "@/actions/products/read-overview-cards-data";
import { Box, CheckCircle, AlertTriangle, XCircle, Coins } from "lucide-react";

export default async function GerenciarPage() {
  const overviewData = await getOverviewCardData();

  return (
    <div className="p-4 space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Gerenciar Produtos</h1>
        <p className="text-muted-foreground">
          Adicione, edite e controle o estoque dos produtos do frigobar
        </p>
      </div>

      <NovoProdutoDialog />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <OverviewCard title="Total de Produtos" value={overviewData.totalProducts.toString()} icon={Box} />
        <OverviewCard title="Produtos Ativos" value={overviewData.activeProducts.toString()} icon={CheckCircle} />
        <OverviewCard title="Estoque Baixo" value={overviewData.lowStockProducts.toString()} icon={AlertTriangle} valueClassName="text-orange-500" />
        <OverviewCard title="Sem Estoque" value={overviewData.outOfStockProducts.toString()} icon={XCircle} valueClassName="text-red-500" />
        <OverviewCard
          title="Valor Total do Estoque"
          value={`R$ ${overviewData.totalStockValue.toFixed(2)}`}
          icon={Coins}
        />
      </div>

      <div className="bg-card p-4 rounded-lg shadow-md">
        <Input placeholder="Buscar produtos" />
      </div>

      {/* Placeholder for product list */}
      <div className="bg-card p-4 rounded-lg shadow-md">
        <p>Lista de produtos...</p>
      </div>
    </div>
  );
}
