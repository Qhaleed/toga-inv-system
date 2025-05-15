"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Cell } from "recharts";

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

// PIE CHART DATA FOR ITEMS (Cap, Tassel, Gown, Hood)
// You can replace this with a prop or fetch if needed
const itemData = [
  { label: "Cap", key: "has_cap" },
  { label: "Tassel", key: "tassel_color" },
  { label: "Gown", key: "gown_condition" },
  { label: "Hood", key: "hood_color" },
];

// Example: Replace this with your real data source
const rawData = [
  {
    has_cap: 0,
    tassel_color: "Blue",
    gown_condition: "Yes",
    hood_color: "Maroon",
  },
  {
    has_cap: 0,
    tassel_color: "Red",
    gown_condition: "Yes",
    hood_color: "White",
  },
  {
    has_cap: 1,
    tassel_color: "Green",
    gown_condition: "Yes",
    hood_color: "Black",
  },
  {
    has_cap: 1,
    tassel_color: "Purple",
    gown_condition: null,
    hood_color: "Yellow",
  },
  {
    has_cap: 0,
    tassel_color: "Blue",
    gown_condition: null,
    hood_color: "White",
  },
  {
    has_cap: 0,
    tassel_color: "Blue",
    gown_condition: "Yes",
    hood_color: "White",
  },
];

// Calculate overall quantity for each item
const chartData = itemData.map((item) => {
  let value = 0;
  if (item.key === "has_cap") {
    value = rawData.reduce((acc, row) => acc + (row.has_cap ? 1 : 0), 0);
  } else {
    value = rawData.reduce((acc, row) => acc + (row[item.key] ? 1 : 0), 0);
  }
  return {
    item: item.label,
    value,
  };
});

const chartConfig = {
  Cap: { label: "Cap", color: "hsl(var(--chart-1))" },
  Tassel: { label: "Tassel", color: "hsl(var(--chart-2))" },
  Gown: { label: "Gown", color: "hsl(var(--chart-3))" },
  Hood: { label: "Hood", color: "hsl(var(--chart-4))" },
};

// Map chartData to include fill color from chartConfig
const coloredChartData = chartData.map((d) => ({
  ...d,
  fill: chartConfig[d.item]?.color || "#2563eb",
}));

// Calculate total for percentage
const total = coloredChartData.reduce((acc, d) => acc + d.value, 0);

export function DashboardPie() {
  return (
    <>
      <div className="flex flex-row items-center gap-4">
        <ChartContainer
          config={chartConfig}
          className="aspect-square  h-60 max-h-[230px]"
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<DashboardPieTooltip />} />
            <Pie
              data={coloredChartData}
              dataKey="value"
              nameKey="item"
              innerRadius={45}
              isAnimationActive={true}
            >
              {coloredChartData.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-5 my-8 mr-4 justify-center h-fill w-full ">
        {coloredChartData.map((entry) => {
          const percent =
            total > 0 ? ((entry.value / total) * 100).toFixed(1) : 0;
          return (
            <div
              key={entry.item}
              className="flex items-center text-xs justify-between  h-full w-full"
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
