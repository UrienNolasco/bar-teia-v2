import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface OverviewCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  valueClassName?: string;
}

export function OverviewCard({
  title,
  value,
  icon: Icon,
  valueClassName,
}: OverviewCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="bg-blue-100 p-2 rounded-full">
          <Icon className="h-4 w-4 text-blue-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-bold", valueClassName)}>{value}</div>
      </CardContent>
    </Card>
  );
}
