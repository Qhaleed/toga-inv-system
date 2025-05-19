"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive bar chart";

// Type hint for reference only (not used in code):
// ChartDataPoint = { date: string, niggas: number, licous: number }

const chartData = [
  { date: "2025-04-01", niggas: 222, licous: 150 },
  { date: "2025-04-02", niggas: 97, licous: 180 },
  { date: "2025-04-03", niggas: 167, licous: 120 },
  { date: "2025-04-04", niggas: 242, licous: 260 },
  { date: "2025-04-05", niggas: 373, licous: 290 },
  { date: "2025-04-06", niggas: 301, licous: 340 },
  { date: "2025-04-07", niggas: 245, licous: 180 },
  { date: "2025-04-08", niggas: 409, licous: 320 },
  { date: "2025-04-09", niggas: 59, licous: 110 },
  { date: "2025-04-10", niggas: 261, licous: 190 },
  { date: "2025-04-11", niggas: 327, licous: 350 },
  { date: "2025-04-12", niggas: 292, licous: 210 },
  { date: "2025-04-13", niggas: 342, licous: 380 },
  { date: "2025-04-14", niggas: 137, licous: 220 },
  { date: "2025-04-15", niggas: 120, licous: 170 },
  { date: "2025-04-16", niggas: 138, licous: 190 },
  { date: "2025-04-17", niggas: 446, licous: 360 },
  { date: "2025-04-18", niggas: 364, licous: 410 },
  { date: "2025-04-19", niggas: 243, licous: 180 },
  { date: "2025-04-20", niggas: 89, licous: 150 },
  { date: "2025-04-21", niggas: 137, licous: 200 },
  { date: "2025-04-22", niggas: 224, licous: 170 },
  { date: "2025-04-23", niggas: 138, licous: 230 },
  { date: "2025-04-24", niggas: 387, licous: 290 },
  { date: "2025-04-25", niggas: 215, licous: 250 },
  { date: "2025-04-26", niggas: 75, licous: 130 },
  { date: "2025-04-27", niggas: 383, licous: 420 },
  { date: "2025-04-28", niggas: 122, licous: 180 },
  { date: "2025-04-29", niggas: 315, licous: 240 },
  { date: "2025-04-30", niggas: 454, licous: 380 },
  { date: "2025-05-01", niggas: 165, licous: 220 },
  { date: "2025-05-02", niggas: 293, licous: 310 },
  { date: "2025-05-03", niggas: 247, licous: 190 },
  { date: "2025-05-04", niggas: 385, licous: 420 },
  { date: "2025-05-05", niggas: 481, licous: 390 },
  { date: "2025-05-06", niggas: 498, licous: 520 },
  { date: "2025-05-07", niggas: 388, licous: 300 },
  { date: "2025-05-08", niggas: 149, licous: 210 },
  { date: "2025-05-09", niggas: 227, licous: 180 },
  { date: "2025-05-10", niggas: 293, licous: 330 },
  { date: "2025-05-11", niggas: 335, licous: 270 },
  { date: "2025-05-12", niggas: 197, licous: 240 },
  { date: "2025-05-13", niggas: 197, licous: 160 },
  { date: "2025-05-14", niggas: 448, licous: 490 },
  { date: "2025-05-15", niggas: 473, licous: 380 },
  { date: "2025-05-16", niggas: 338, licous: 400 },
  { date: "2025-05-17", niggas: 499, licous: 420 },
  { date: "2025-05-18", niggas: 315, licous: 350 },
  { date: "2025-05-19", niggas: 235, licous: 180 },
  { date: "2025-05-20", niggas: 177, licous: 230 },
  { date: "2025-05-21", niggas: 82, licous: 140 },
  { date: "2025-05-22", niggas: 81, licous: 120 },
  { date: "2025-05-23", niggas: 252, licous: 290 },
  { date: "2025-05-24", niggas: 294, licous: 220 },
  { date: "2025-05-25", niggas: 201, licous: 250 },
  { date: "2025-05-26", niggas: 213, licous: 170 },
  { date: "2025-05-27", niggas: 420, licous: 460 },
  { date: "2025-05-28", niggas: 233, licous: 190 },
  { date: "2025-05-29", niggas: 78, licous: 130 },
  { date: "2025-05-30", niggas: 340, licous: 280 },
  { date: "2025-05-31", niggas: 178, licous: 230 },
  { date: "2025-06-01", niggas: 178, licous: 200 },
  { date: "2025-06-02", niggas: 470, licous: 410 },
  { date: "2025-06-03", niggas: 103, licous: 160 },
  { date: "2025-06-04", niggas: 439, licous: 380 },
  { date: "2025-06-05", niggas: 88, licous: 140 },
  { date: "2025-06-06", niggas: 294, licous: 250 },
  { date: "2025-06-07", niggas: 323, licous: 370 },
  { date: "2025-06-08", niggas: 385, licous: 320 },
  { date: "2025-06-09", niggas: 438, licous: 480 },
  { date: "2025-06-10", niggas: 155, licous: 200 },
  { date: "2025-06-11", niggas: 92, licous: 150 },
  { date: "2025-06-12", niggas: 492, licous: 420 },
  { date: "2025-06-13", niggas: 81, licous: 130 },
  { date: "2025-06-14", niggas: 426, licous: 380 },
  { date: "2025-06-15", niggas: 307, licous: 350 },
  { date: "2025-06-16", niggas: 371, licous: 310 },
  { date: "2025-06-17", niggas: 475, licous: 520 },
  { date: "2025-06-18", niggas: 107, licous: 170 },
  { date: "2025-06-19", niggas: 341, licous: 290 },
  { date: "2025-06-20", niggas: 408, licous: 450 },
  { date: "2025-06-21", niggas: 169, licous: 210 },
  { date: "2025-06-22", niggas: 317, licous: 270 },
  { date: "2025-06-23", niggas: 480, licous: 530 },
  { date: "2025-06-24", niggas: 132, licous: 180 },
  { date: "2025-06-25", niggas: 141, licous: 190 },
  { date: "2025-06-26", niggas: 434, licous: 380 },
  { date: "2025-06-27", niggas: 448, licous: 490 },
  { date: "2025-06-28", niggas: 149, licous: 200 },
  { date: "2025-06-29", niggas: 103, licous: 160 },
  { date: "2025-06-30", niggas: 446, licous: 400 },
];

const chartConfig = {
  views: {
    label: "Page Views",
  },
  niggas: {
    label: "niggas",
    color: "hsl(var(--chart-1))",
  },
  licous: {
    label: "licous",
    color: "hsl(var(--chart-2))",
  },
};

function CustomBarTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  // Find the bar for the current active chart (niggas or licous)
  const bar = payload[0];
  const value = bar.value;
  const key = bar.dataKey;
  // Format the date label
  const date = new Date(label);
  const dateStr = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  // Use CSS variable for color
  const colorVar =
    key === "niggas"
      ? "var(--chart-1)"
      : key === "licous"
      ? "var(--chart-2)"
      : "#888";
  return (
    <div className="bg-white px-3 py-2 text-xs min-w-[8rem]">
      <div className="font-bold mb-1 text-gray-800">{dateStr}</div>
      <div className="flex items-center gap-2">
        <span
          className="inline-block w-2 h-2 rounded-full"
          style={{ background: colorVar }}
        ></span>
        <span className="font-semibold text-base text-gray-900">
          {chartConfig[key]?.label || key}: {value?.toLocaleString()}
          <span className="text-xs font-normal"> views</span>
        </span>
      </div>
    </div>
  );
}

export function GroupBarChart() {
  const [activeChart, setActiveChart] = React.useState("niggas");

  const total = React.useMemo(
    () => ({
      niggas: chartData.reduce((acc, curr) => acc + curr.niggas, 0),
      licous: chartData.reduce((acc, curr) => acc + curr.licous, 0),
    }),
    []
  );

  return (
    <div className="flex overflow-hidden   flex-col w-full h-full">
      <CardHeader className="flex flex-col w-full p-10 ">
        <div className="flex w-full">
          {["niggas", "licous"].map((key) => {
            const chart = key;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t text-left even:border-l sm:border-l sm:border-t-0 sm:px-4 sm:py-2"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="flex  ">
        <ChartContainer
          config={chartConfig}
          className="flex-1 w-full mt-2 overflow-x-hidden h-full"
        >
          <div className="w-full h-40   bg-white  ">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={3}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
                <ChartTooltip content={<CustomBarTooltip />} />
                <Bar
                  dataKey={activeChart}
                  fill={
                    activeChart === "niggas"
                      ? "!var(--chart-1)"
                      : "var(--chart-2)!"
                  }
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
      </CardContent>
    </div>
  );
}
