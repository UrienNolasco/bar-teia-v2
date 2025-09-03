import { prisma } from "@/lib/prisma";
import { TopClient } from "@/types/analytics";

export async function getTopClientsByMonth(
  year: number = new Date().getFullYear(),
  month: number = new Date().getMonth() + 1
): Promise<TopClient[]> {
  try {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    // Usar Prisma ORM em vez de raw SQL para melhor compatibilidade
    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        status: "CONFIRMED",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Agrupar por usuário e calcular métricas
    const userStats = new Map<
      string,
      {
        userId: string;
        userName: string;
        userEmail: string;
        totalSpent: number;
        orderCount: number;
        amounts: number[];
      }
    >();

    orders.forEach((order) => {
      const userId = order.user.id;
      const existing = userStats.get(userId);

      if (existing) {
        existing.totalSpent += parseFloat(order.totalAmount.toString());
        existing.orderCount += 1;
        existing.amounts.push(parseFloat(order.totalAmount.toString()));
      } else {
        userStats.set(userId, {
          userId: order.user.id,
          userName:
            order.user.name || `Cliente ${order.user.id.substring(0, 8)}`,
          userEmail: order.user.email,
          totalSpent: parseFloat(order.totalAmount.toString()),
          orderCount: 1,
          amounts: [parseFloat(order.totalAmount.toString())],
        });
      }
    });

    // Converter para array e calcular média
    const topClients: TopClient[] = Array.from(userStats.values())
      .map((user) => ({
        userId: user.userId,
        userName: user.userName,
        userEmail: user.userEmail,
        totalSpent: user.totalSpent,
        orderCount: user.orderCount,
        averageOrderValue: user.totalSpent / user.orderCount,
      }))
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 5);

    return topClients;
  } catch (error) {
    console.error("Erro ao buscar top clientes:", error);
    throw new Error("Falha ao buscar dados dos top clientes");
  }
}
