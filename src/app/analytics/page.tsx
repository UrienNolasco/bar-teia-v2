import { getTopClientsByMonth } from "@/actions/analytics/get-top-clients";
import { getAnalyticsSummary } from "@/actions/analytics/get-analytics-summary";
import { TopClientsCard } from "@/components/analytics/TopClientsCard";
import { MetricCard } from "@/components/analytics/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, DollarSign } from "lucide-react";

export default async function AnalyticsPage() {
  const [topClients, analyticsSummary] = await Promise.all([
    getTopClientsByMonth(),
    getAnalyticsSummary(),
  ]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-foreground mb-2">Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Visualize métricas e insights sobre o desempenho do seu negócio
        </p>
      </div>

      {/* Cards de Resumo */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-2 gap-3">
          <MetricCard
            title="Total de Clientes"
            value={analyticsSummary.totalClients}
            change={analyticsSummary.periodChange.clients}
            icon={Users}
            iconColor="text-blue-500"
            valueColor="text-blue-600"
          />

          <MetricCard
            title="Receita Total"
            value={`R$ ${analyticsSummary.totalRevenue.toFixed(2)}`}
            change={analyticsSummary.periodChange.revenue}
            icon={DollarSign}
            iconColor="text-green-500"
            valueColor="text-green-600"
          />

          <MetricCard
            title="Pedidos"
            value={analyticsSummary.totalOrders}
            change={analyticsSummary.periodChange.orders}
            icon={BarChart3}
            iconColor="text-purple-500"
            valueColor="text-purple-600"
          />

          <MetricCard
            title="Taxa de Conversão"
            value={`${analyticsSummary.conversionRate.toFixed(1)}%`}
            change={analyticsSummary.periodChange.conversion}
            icon={TrendingUp}
            iconColor="text-orange-500"
            valueColor="text-orange-600"
            changeLabel="desde o último mês"
          />
        </div>
      </div>

      {/* Seção Principal */}
      <div className="px-4 pb-6 space-y-3">
        {/* TOP 5 Clientes */}
        <TopClientsCard topClients={topClients} />

        {/* Gráficos e outras métricas podem ser adicionados aqui */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-base">
              <BarChart3 className="h-4 w-4" />
              <span>Outras Métricas</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground">
              Mais gráficos e métricas serão adicionados em breve...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
