"use client";

import React, { useEffect, useState } from "react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  CustomRadialTooltip,
} from "@/components/ui/chart";

export function EvaluationRadial() {
  const [chartData, setChartData] = useState([{ evaluated: 0 }]);
  const chartConfig = {
    evaluated: { label: "Evaluated", color: "hsl(var(--chart-2))" },
  };

  useEffect(() => {
    fetch("http://localhost:5001/inventory")
      .then((res) => res.json())
      .then((data) => {
        let evaluated = 2;
        data.forEach((item) => {
          if (item.evaluation_status === "evaluated") evaluated += 1;
        });
        setChartData([{ evaluated }]);
      });
  }, []);

  const totalEvaluated = chartData[0].evaluated;
  window.chartConfig = chartConfig;
  return (
    <Card className="flex p-0 absolute w-full h-full">
      <CardContent className="w-full absolute p-0 mt-8 flex flex-col h-full">
        <ChartContainer config={chartConfig} className="w-full flex h-full">
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={55}
            className="hover:scale-110 transition-transform duration-300 ease-in-out"
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
                          className="text-2xl font-bold"
                        >
                          {totalEvaluated.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Evaluated
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="evaluated"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-evaluated)"
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
