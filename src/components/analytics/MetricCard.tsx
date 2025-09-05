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
    <Card className="p-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 pb-2">
        <CardTitle className="text-xs font-medium">{title}</CardTitle>
        <Icon className={cn("h-3 w-3", iconColor)} />
      </CardHeader>
      <CardContent className="p-0">
        <div className={cn("text-lg font-bold", valueColor)}>{value}</div>
        <p className="text-xs text-muted-foreground mt-1">
          {changeText} {changeLabel}
        </p>
      </CardContent>
    </Card>
  );
}
