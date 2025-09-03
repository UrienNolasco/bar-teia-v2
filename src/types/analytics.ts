export interface TopClient {
  userId: string;
  userName: string;
  userEmail: string;
  totalSpent: number;
  orderCount: number;
  averageOrderValue: number;
}

export interface AnalyticsSummary {
  totalClients: number;
  totalRevenue: number;
  totalOrders: number;
  conversionRate: number;
  periodChange: {
    clients: number;
    revenue: number;
    orders: number;
    conversion: number;
  };
}
