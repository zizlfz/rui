import { Box } from "#/components/ui/Box";
import { cn } from "#/utils/classname";

interface StatItem {
  label: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
}

interface StatsBlockProps {
  stats: StatItem[];
}

export function StatsBlock({ stats }: StatsBlockProps) {
  return (
    <div className="grid">
      {stats.map((stat) => (
        <Box key={stat.label} className="flex flex-col gap-2">
          <span className="text-sm text-muted-foreground">{stat.label}</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">{stat.value}</span>
            {stat.change && (
              <span
                className={cn(
                  "text-sm",
                  stat.isPositive ? "text-success" : "text-destructive",
                )}
              >
                {stat.change}
              </span>
            )}
          </div>
        </Box>
      ))}
    </div>
  );
}
