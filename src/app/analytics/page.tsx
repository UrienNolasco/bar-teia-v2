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
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
        <p className="text-muted-foreground">
          Visualize métricas e insights sobre o desempenho do seu negócio
        </p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

      {/* Seção Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* TOP 5 Clientes */}
        <div className="lg:col-span-2">
          <TopClientsCard topClients={topClients} />
        </div>

        {/* Gráficos e outras métricas podem ser adicionados aqui */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Outras Métricas</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Mais gráficos e métricas serão adicionados em breve...
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
