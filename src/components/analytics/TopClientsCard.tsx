"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, TrendingUp, Calendar } from "lucide-react";
import { TopClient } from "@/types/analytics";

interface TopClientsCardProps {
  topClients: TopClient[];
}

const months = [
  { value: "1", label: "Janeiro" },
  { value: "2", label: "Fevereiro" },
  { value: "3", label: "Março" },
  { value: "4", label: "Abril" },
  { value: "5", label: "Maio" },
  { value: "6", label: "Junho" },
  { value: "7", label: "Julho" },
  { value: "8", label: "Agosto" },
  { value: "9", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
];

const years = Array.from({ length: 5 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return { value: year.toString(), label: year.toString() };
});

export function TopClientsCard({ topClients }: TopClientsCardProps) {
  const [selectedMonth, setSelectedMonth] = useState(
    (new Date().getMonth() + 1).toString()
  );
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 0:
        return "🥇";
      case 1:
        return "🥈";
      case 2:
        return "🥉";
      default:
        return `${rank + 1}º`;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <CardTitle className="text-lg font-semibold">
            TOP 5 Clientes
          </CardTitle>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year.value} value={year.value}>
                  {year.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {topClients.length === 0 ? (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Nenhum cliente encontrado para este período
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {topClients.map((client, index) => (
              <div
                key={client.userId}
                className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-bold">
                    {getRankIcon(index)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{client.userName}</p>
                    <p className="text-xs text-muted-foreground">
                      {client.userEmail}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <Badge variant="secondary" className="text-xs">
                        {client.orderCount} pedidos
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Média: {formatCurrency(client.averageOrderValue)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-green-600">
                      {formatCurrency(client.totalSpent)}
                    </p>
                    <p className="text-xs text-muted-foreground">Total gasto</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 pt-4 border-t">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Período selecionado: {months[parseInt(selectedMonth) - 1]?.label}{" "}
              {selectedYear}
            </span>
            <span>Total de clientes: {topClients.length}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
