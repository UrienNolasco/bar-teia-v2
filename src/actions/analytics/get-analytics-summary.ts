import { prisma } from "@/lib/prisma";
import { AnalyticsSummary } from "@/types/analytics";

export async function getAnalyticsSummary(
  year: number = new Date().getFullYear(),
  month: number = new Date().getMonth() + 1
): Promise<AnalyticsSummary> {
  try {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    // Período anterior para comparação
    const prevStartDate = new Date(year, month - 2, 1);
    const prevEndDate = new Date(year, month - 1, 0, 23, 59, 59, 999);

    // Dados do período atual
    const [currentOrders, currentUsers] = await Promise.all([
      prisma.order.findMany({
        where: {
          createdAt: { gte: startDate, lte: endDate },
          status: "CONFIRMED",
        },
        select: {
          totalAmount: true,
          userId: true,
        },
      }),
      prisma.user.findMany({
        where: {
          createdAt: { gte: startDate, lte: endDate },
        },
        select: { id: true },
      }),
    ]);

    // Dados do período anterior
    const [prevOrders, prevUsers] = await Promise.all([
      prisma.order.findMany({
        where: {
          createdAt: { gte: prevStartDate, lte: prevEndDate },
          status: "CONFIRMED",
        },
        select: {
          totalAmount: true,
          userId: true,
        },
      }),
      prisma.user.findMany({
        where: {
          createdAt: { gte: prevStartDate, lte: prevEndDate },
        },
        select: { id: true },
      }),
    ]);

    // Calcular métricas atuais
    const totalRevenue = currentOrders.reduce(
      (sum, order) => sum + parseFloat(order.totalAmount.toString()),
      0
    );
    const totalOrders = currentOrders.length;
    const totalClients = currentUsers.length;

    // Calcular métricas do período anterior
    const prevRevenue = prevOrders.reduce(
      (sum, order) => sum + parseFloat(order.totalAmount.toString()),
      0
    );
    const prevOrdersCount = prevOrders.length;
    const prevClients = prevUsers.length;

    // Calcular variações percentuais
    const calculateChange = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return ((current - previous) / previous) * 100;
    };

    const summary: AnalyticsSummary = {
      totalClients,
      totalRevenue,
      totalOrders,
      conversionRate: totalClients > 0 ? (totalOrders / totalClients) * 100 : 0,
      periodChange: {
        clients: calculateChange(totalClients, prevClients),
        revenue: calculateChange(totalRevenue, prevRevenue),
        orders: calculateChange(totalOrders, prevOrdersCount),
        conversion: calculateChange(
          totalClients > 0 ? (totalOrders / totalClients) * 100 : 0,
          prevClients > 0 ? (prevOrdersCount / prevClients) * 100 : 0
        ),
      },
    };

    return summary;
  } catch (error) {
    console.error("Erro ao buscar resumo de analytics:", error);
    throw new Error("Falha ao buscar dados de analytics");
  }
}
