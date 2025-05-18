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

export default function MyChart({ returnData }) {
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
    // If returnData is passed as a prop, use it to update the chart
    if (returnData) {
      const { returnByType, returnByVariant } = returnData;

      setChartData([
        {
          name: "Cap",
          count: returnByType.cap.returned,
          color: colorMap.Cap,
          inventorySizes: returnByVariant.cap || {},
        },
        {
          name: "Tassel",
          count: returnByType.tassel.returned,
          color: colorMap.Tassel,
          inventoryColors: returnByVariant.tassel || {},
        },
        {
          name: "Gown",
          count: returnByType.gown.returned,
          color: colorMap.Gown,
          inventorySizes: returnByVariant.gown || {},
        },
        {
          name: "Hood",
          count: returnByType.hood.returned,
          color: colorMap.Hood,
          inventoryColors: returnByVariant.hood || {},
        },
      ]);
    } else {
      // Fallback to the original fetch if no returnData is provided
      fetch("http://localhost:5001/items")
        .then((res) => res.json())
        .then((data) => {
          let capReturned = 0,
            tasselReturned = 0,
            gownReturned = 0,
            hoodReturned = 0;
          let capSizes = {},
            tasselColors = {},
            gownSizes = {},
            hoodColors = {};

          data.forEach((item) => {
            if (item.return_status === "Returned") {
              const itemType = item.item_type;
              const variant = item.variant;
              const quantity = item.quantity || 0;

              if (itemType === "cap") {
                capReturned += quantity;
                if (variant) {
                  capSizes[variant] = (capSizes[variant] || 0) + quantity;
                }
              } else if (itemType === "tassel" || itemType === "tassle") {
                tasselReturned += quantity;
                if (variant) {
                  tasselColors[variant] = (tasselColors[variant] || 0) + quantity;
                }
              } else if (itemType === "gown") {
                gownReturned += quantity;
                if (variant) {
                  gownSizes[variant] = (gownSizes[variant] || 0) + quantity;
                }
              } else if (itemType === "hood") {
                hoodReturned += quantity;
                if (variant) {
                  hoodColors[variant] = (hoodColors[variant] || 0) + quantity;
                }
              }
            }
          });

          setChartData([
            {
              name: "Cap",
              count: capReturned,
              color: colorMap.Cap,
              inventorySizes: capSizes,
            },
            {
              name: "Tassel",
              count: tasselReturned,
              color: colorMap.Tassel,
              inventoryColors: tasselColors,
            },
            {
              name: "Gown",
              count: gownReturned,
              color: colorMap.Gown,
              inventorySizes: gownSizes,
            },
            {
              name: "Hood",
              count: hoodReturned,
              color: colorMap.Hood,
              inventoryColors: hoodColors,
            },
          ]);
        });
    }
  }, [returnData, colorMap.Cap, colorMap.Tassel, colorMap.Gown, colorMap.Hood]);

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
