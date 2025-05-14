"use client";

import React, { useEffect, useState } from "react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  CustomRadialTooltip,
} from "@/components/ui/chart";

export function CheckedOutRadial() {
  const [chartData, setChartData] = useState([{ checkedout: 0 }]);
  const chartConfig = {
    checkedout: { label: "Checked Out", color: "hsl(var(--chart-3))" },
  };

  useEffect(() => {
    fetch("http://localhost:5001/inventory")
      .then((res) => res.json())
      .then((data) => {
        let checkedout = 3;
        data.forEach((item) => {
          if (item.checked_out === true || item.checked_out === 1)
            checkedout += 1;
        });
        setChartData([{ checkedout }]);
      });
  }, []);

  const totalCheckedOut = chartData[0].checkedout;
  window.chartConfig = chartConfig;
  return (
    <Card className="flex absolute p-0 w-full   h-full">
      <CardContent className="w-full p-0 z-100 relative  flex  h-full">
        <ChartContainer config={chartConfig} className="w-full  h-50 ">
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={50}
            outerRadius={80}
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
                          {totalCheckedOut.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Checked Out
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="checkedout"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-checkedout)"
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
