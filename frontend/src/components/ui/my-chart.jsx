"use client";

import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

import { ChartContainer } from "./chart";

export default function MyChart() {
  const [chartData, setChartData] = useState([
    { name: "Cap", count: 0 },
    { name: "Tassel", count: 0 },
    { name: "Gown", count: 0 },
  ]);

  useEffect(() => {
    fetch("http://localhost:5001/inventory")
      .then((res) => res.json())
      .then((data) => {
        // Count Cap, Tassel, Gown by size
        const capSizes = {};
        const tasselColors = {};
        const gownSizes = {};
        data.forEach((item) => {
          // Cap: count by toga_size if has_cap is 1
          if (item.has_cap === 1 && item.toga_size) {
            capSizes[item.toga_size] = (capSizes[item.toga_size] || 0) + 1;
          }
          // Tassel: count by tassel_color
          if (item.tassel_color) {
            tasselColors[item.tassel_color] =
              (tasselColors[item.tassel_color] || 0) + 1;
          }
          // Gown: count by toga_size
          if (item.toga_size) {
            gownSizes[item.toga_size] = (gownSizes[item.toga_size] || 0) + 1;
          }
        });
        // Prepare chart data for each category and size/color
        const chartData = [];
        Object.entries(capSizes).forEach(([size, count]) => {
          chartData.push({ category: "Cap", name: size, count });
        });
        Object.entries(tasselColors).forEach(([color, count]) => {
          chartData.push({ category: "Tassel", name: color, count });
        });
        Object.entries(gownSizes).forEach(([size, count]) => {
          chartData.push({ category: "Gown", name: size, count });
        });
        setChartData(chartData);
      });
  }, []);

  // Count total for each category
  const capTotal = chartData
    .filter((d) => d.category === "Cap")
    .reduce((sum, d) => sum + d.count, 0);
  const tasselTotal = chartData
    .filter((d) => d.category === "Tassel")
    .reduce((sum, d) => sum + d.count, 0);
  const gownTotal = chartData
    .filter((d) => d.category === "Gown")
    .reduce((sum, d) => sum + d.count, 0);

  // Color mapping for each category
  const colorMap = {
    Cap: "#2563eb",
    Tassel: "#60a5fa",
    Gown: "#b6c2e0",
  };

  const summaryData = [
    { name: "Cap", count: capTotal, color: colorMap.Cap },
    { name: "Tassel", count: tasselTotal, color: colorMap.Tassel },
    { name: "Gown", count: gownTotal, color: colorMap.Gown },
  ];

  return (
    <ChartContainer
      config={{
        Cap: { label: "Cap", color: colorMap.Cap },
        Tassel: { label: "Tassel", color: colorMap.Tassel },
        Gown: { label: "Gown", color: colorMap.Gown },
      }}
      className="min-h-[100px] w-full"
    >
      <BarChart
        width={undefined}
        height={420}
        data={summaryData}
        barCategoryGap={60}
        barGap={20}
        margin={{ left: 24, right: 24, top: 24, bottom: 24 }}
        className="w-full"
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#e5e7eb"
        />
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tick={({ x, y, payload }) => (
            <text
              x={x}
              y={y + 24}
              textAnchor="middle"
              fontSize="16"
              fill={colorMap[payload.value]}
              fontWeight="bold"
            >
              {payload.value}
            </text>
          )}
        />
        <ChartTooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const d = payload[0].payload;
              return (
                <div className="rounded-lg bg-white p-3 shadow text-sm border border-gray-200">
                  <div className="font-bold mb-1" style={{ color: d.color }}>
                    {d.name}
                  </div>
                  <div className="font-bold text-lg">{d.count} pcs</div>
                </div>
              );
            }
            return null;
          }}
        />
        <ChartLegend
          content={() => (
            <div className="flex gap-6 mt-4 ml-6">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-4 h-4 rounded"
                  style={{ background: colorMap.Cap }}
                ></span>
                Cap
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-4 h-4 rounded"
                  style={{ background: colorMap.Tassel }}
                ></span>
                Tassel
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-4 h-4 rounded"
                  style={{ background: colorMap.Gown }}
                ></span>
                Gown
              </div>
            </div>
          )}
        />
        <Bar
          dataKey="count"
          radius={8}
          isAnimationActive
          fill={({ name }) => colorMap[name]}
          barSize={100}
          maxBarSize={120}
        />
      </BarChart>
    </ChartContainer>
  );
}
