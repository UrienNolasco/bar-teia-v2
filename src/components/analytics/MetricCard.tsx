import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: LucideIcon;
  iconColor?: string;
  valueColor?: string;
  changeLabel?: string;
}

export function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor = "text-muted-foreground",
  valueColor = "text-foreground",
  changeLabel = "em relação ao mês passado",
}: MetricCardProps) {
  const isPositive = change >= 0;
  const changeText = isPositive
    ? `+${change.toFixed(1)}%`
    : `${change.toFixed(1)}%`;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={cn("h-4 w-4", iconColor)} />
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-bold", valueColor)}>{value}</div>
        <p className="text-xs text-muted-foreground">
          {changeText} {changeLabel}
        </p>
      </CardContent>
    </Card>
  );
}
