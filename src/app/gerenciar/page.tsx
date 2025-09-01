"use client";

import { OverviewCard } from "@/components/ui/OverviewCard";
import { NovoProdutoDialog } from "@/components/gerenciar/NovoProdutoDialog";
import { Input } from "@/components/ui/input";
import { Box, CheckCircle, AlertTriangle, XCircle, Coins } from "lucide-react";

export default function GerenciarPage() {
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
        <OverviewCard title="Total de Produtos" value="8" icon={Box} />
        <OverviewCard title="Produtos Ativos" value="6" icon={CheckCircle} />
        <OverviewCard title="Estoque Baixo" value="2" icon={AlertTriangle} />
        <OverviewCard title="Sem Estoque" value="1" icon={XCircle} />
        <OverviewCard title="Valor Total do Estoque" value="R$ 120,00" icon={Coins} />
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