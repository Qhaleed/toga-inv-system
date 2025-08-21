"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Cell } from "recharts";
import { useMemo } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { DashboardPieTooltip } from "./DashboardPieTooltip";

const chartConfig = {
  cap: { label: "Cap", color: "hsl(var(--chart-1))" },
  tassle: { label: "Tassel", color: "hsl(var(--chart-2))" },
  gown: { label: "Gown", color: "hsl(var(--chart-3))" },
  hood: { label: "Hood", color: "hsl(var(--chart-4))" },
};

export function DashboardPie({ items = [] }) {
  // Compute chart data from items prop
  const { chartData, total } = useMemo(() => {
    // Group items by type and sum quantities
    const groupedData = items.reduce((acc, item) => {
      if (!acc[item.item_type]) {
        acc[item.item_type] = 0;
      }
      acc[item.item_type] += item.quantity;
      return acc;
    }, {});

    // Convert grouped data to chart format with colors
    const formattedData = Object.entries(groupedData).map(([type, value]) => ({
      item: type.charAt(0).toUpperCase() + type.slice(1),
      value,
      fill: chartConfig[type]?.color || "#2563eb",
    }));

    // Calculate total for percentages
    const itemTotal = formattedData.reduce((sum, item) => sum + item.value, 0);
    return { chartData: formattedData, total: itemTotal };
  }, [items]);

  if (!items.length) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-gray-400">No data available</span>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-row items-center gap-4">
        <ChartContainer
          config={chartConfig}
          className="aspect-square transition-all duration-700 ease-in-out hover:scale-110 focus:scale-102 h-50 max-h-[230px]"
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<DashboardPieTooltip />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="item"
              innerRadius={35}
              isAnimationActive={true}
            >
              {chartData.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-5 my-8 mr-4 justify-center h-fill w-full">
        {chartData.map((entry) => {
          const percent =
            total > 0 ? ((entry.value / total) * 100).toFixed(1) : 0;
          return (
            <div
              key={entry.item}
              className="flex items-center text-xs justify-between h-full w-full"
            >
              <span
                className="inline-block w-3 h-3 rounded-full mr-2"
                style={{ background: entry.fill }}
              ></span>
              <span className="text-gray-500 font-semibold mr-auto">
                {entry.item}
              </span>
              <span className="font-semibold">{percent}%</span>
            </div>
          );
        })}
      </div>
    </>
  );
}
