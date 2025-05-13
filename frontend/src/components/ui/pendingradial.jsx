"use client";

import React, { useEffect, useState } from "react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  CustomRadialTooltip,
} from "@/components/ui/chart";

export function PendingRadial() {
  const [chartData, setChartData] = useState([{ pending: 0 }]);
  const chartConfig = {
    pending: { label: "Pending", color: "hsl(var(--chart-1))" },
  };

  useEffect(() => {
    fetch("http://localhost:5001/inventory")
      .then((res) => res.json())
      .then((data) => {
        let pending = 2; //hardcoded for testing muna
        data.forEach((item) => {
          if (item.return_status === "pending") pending += 1;
        });
        setChartData([{ pending }]);
      });
  }, []);

  const totalPending = chartData[0].pending;
  window.chartConfig = chartConfig;
  return (
    <Card className="flex absolute p-0  w-full h-full">
      <CardContent className="w-full p-0 mt-11 flex flex-col h-35">
        <ChartContainer config={chartConfig} className="w-full flex h-full">
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={55}
            outerRadius={90}
            className="hover:scale-110 transition-transform duration-300 ease-in-out"
          >
            <ChartTooltip cursor={false} content={<CustomRadialTooltip />} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="text-2xl font-bold"
                        >
                          {totalPending.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Pending
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="pending"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-pending)"
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
