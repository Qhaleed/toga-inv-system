"use client";

import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

import { ChartContainer } from "./chart";

export default function MyChart({ data }) {
  const [chartData, setChartData] = useState([
    { name: "Cap", count: 0, color: "#2563eb", inventorySizes: {} },
    { name: "Tassel", count: 0, color: "#60a5fa", inventoryColors: {} },
    { name: "Gown", count: 0, color: "#b6c2e0", inventorySizes: {} },
    { name: "Hood", count: 0, color: "#fbbf24", inventoryColors: {} },
  ]);

  // Color mapping for each category para ez
  const colorMap = {
    Cap: "#2563eb",
    Tassel: "#60a5fa",
    Gown: "#b6c2e0",
    Hood: "#fbbf24", // yellow for hood to sya
  };

  useEffect(() => {
    // If data is passed as props, use it instead of fetching
    if (data) {
      setChartData([
        {
          name: "Cap",
          count: data.totalCap || 0,
          color: colorMap.Cap,
          inventorySizes: {}, // Cap sizes data not available in new schema
        },
        {
          name: "Tassel",
          count: data.totalTassel || 0,
          color: colorMap.Tassel,
          inventoryColors: data.tasselColors || {},
        },
        {
          name: "Gown",
          count: data.totalGown || 0,
          color: colorMap.Gown,
          inventorySizes: data.gownSizes || {},
        },
        {
          name: "Hood",
          count: data.totalHood || 0,
          color: colorMap.Hood,
          inventoryColors: data.hoodColors || {},
        },
      ]);
      return;
    }

    // Fallback to fetch data directly if no props provided
    fetch("http://localhost:5001/inventory")
      .then((res) => res.json())
      .then((data) => {
        let cap = 0,
          tassel = 0,
          gown = 0,
          hood = 0;
        let capSizes = {},
          tasselColors = {},
          gownSizes = {},
          hoodColors = {};
        data.forEach((item) => {
          // Cap: count by size if has_cap is 1
          if (item.has_cap === 1 && item.toga_size) {
            cap += 1;
            capSizes[item.toga_size] = (capSizes[item.toga_size] || 0) + 1;
          }
          // Tassel: count by color
          if (item.tassel_color) {
            tassel += 1;
            tasselColors[item.tassel_color] =
              (tasselColors[item.tassel_color] || 0) + 1;
          }
          // Gown: count by size
          if (item.toga_size) {
            gown += 1;
            gownSizes[item.toga_size] = (gownSizes[item.toga_size] || 0) + 1;
          }
          // Hood: count by color
          if (item.hood_color) {
            hood += 1;
            hoodColors[item.hood_color] =
              (hoodColors[item.hood_color] || 0) + 1;
          }
        });
        setChartData([
          {
            name: "Cap",
            count: cap,
            color: colorMap.Cap,
            inventorySizes: capSizes,
          },
          {
            name: "Tassel",
            count: tassel,
            color: colorMap.Tassel,
            inventoryColors: tasselColors,
          },
          {
            name: "Gown",
            count: gown,
            color: colorMap.Gown,
            inventorySizes: gownSizes,
          },
          {
            name: "Hood",
            count: hood,
            color: colorMap.Hood,
            inventoryColors: hoodColors,
          },
        ]);
      });
  }, [data, colorMap.Cap, colorMap.Tassel, colorMap.Gown, colorMap.Hood]);

  return (
    <ChartContainer
      config={{
        Cap: { label: "Cap", color: colorMap.Cap },
        Tassel: { label: "Tassel", color: colorMap.Tassel },
        Gown: { label: "Gown", color: colorMap.Gown },
        Hood: { label: "Hood", color: colorMap.Hood },
      }}
      className="min-h-[100px] w-full"
    >
      <BarChart
        width={undefined}
        height={420}
        data={chartData}
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
              y={y + 10}
              textAnchor="middle"
              fontSize="16"
              fill={colorMap[payload.value]}
              fontWeight="bold"
            >
              {payload.value}
            </text>
          )}
        />
        {/* <YAxis domain={[10, "auto"]} /> */}
        {/* Set minimum value of y-axis to 10 para estetik */}
        <ChartTooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const d = payload[0].payload;
              let details = null;
              if (d.name === "Cap" && d.inventorySizes) {
                details = Object.entries(d.inventorySizes)
                  .map(([size, count]) => `${size}: ${count} pcs`)
                  .join(", ");
              } else if (d.name === "Tassel" && d.inventoryColors) {
                details = Object.entries(d.inventoryColors)
                  .map(([color, count]) => `${color}: ${count} pcs`)
                  .join(", ");
              } else if (d.name === "Gown" && d.inventorySizes) {
                details = Object.entries(d.inventorySizes)
                  .map(([size, count]) => `${size}: ${count} pcs`)
                  .join(", ");
              } else if (d.name === "Hood" && d.inventoryColors) {
                details = Object.entries(d.inventoryColors)
                  .map(([color, count]) => `${color}: ${count} pcs`)
                  .join(", ");
              }
              return (
                <div className="rounded-lg bg-white p-3 shadow text-sm border border-gray-200">
                  <div className="font-bold mb-1" style={{ color: d.color }}>
                    {d.name}
                  </div>
                  {details && (
                    <div className="text-gray-700 mb-1">{details}</div>
                  )}
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
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-4 h-4 rounded"
                  style={{ background: colorMap.Hood }}
                ></span>
                Hood
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
