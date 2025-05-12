"use client";

import React, { useEffect, useState } from "react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  CustomRadialTooltip,
} from "@/components/ui/chart";

export function RadialChart() {
  const [chartData, setChartData] = useState([
    { cap: 0, tassel: 0, gown: 0, hood: 0 },
  ]);
  const chartConfig = {
    cap: { label: "Cap", color: "hsl(var(--chart-1))" },
    tassel: { label: "Tassel", color: "hsl(var(--chart-2))" },
    gown: { label: "Gown", color: "hsl(var(--chart-3))" },
    hood: { label: "Hood", color: "hsl(var(--chart-4 ))" },
  };

  useEffect(() => {
    fetch("http://localhost:5001/inventory")
      .then((res) => res.json())
      .then((data) => {
        let cap = 0,
          tassel = 0,
          gown = 0,
          hood = 0;
        data.forEach((item) => {
          if (item.has_cap === 1) cap += 1;
          if (item.tassel_color) tassel += 1;
          if (item.toga_size) gown += 1;
          if (item.hood_color) hood += 1;
        });
        setChartData([{ cap, tassel, gown, hood }]);
      });
  }, []);

  const totalVisitors =
    chartData[0].cap +
    chartData[0].tassel +
    chartData[0].gown +
    chartData[0].hood;
  window.chartConfig = chartConfig;
  return (
    <Card className="flex p-0 absolute w-full h-full  ">
      <CardContent className="w-full p-0 mt-11 flex  flex-col h-35 ">
        <ChartContainer config={chartConfig} className="w-full flex  h-full">
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={55}
            outerRadius={90}
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
                          className=" text-2xl  font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Stocks Left
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="cap"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-cap)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="tassel"
              fill="var(--color-tassel)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="gown"
              fill="var(--color-gown)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="hood"
              fill="var(--color-hood)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
