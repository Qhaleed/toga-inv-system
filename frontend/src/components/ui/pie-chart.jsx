"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
} from "@/components/ui/chart";

export function PieChartDash() {
  const [chartData, setChartData] = React.useState([]);
  const [totalStocks, setTotalStocks] = React.useState(0);

  React.useEffect(() => {
    fetch("http://localhost:5001/inventory")
      .then((res) => res.json())
      .then((data) => {
        // Example: group by item type and count remaining stocks
        // Adjust grouping logic as needed based on your backend data structure
        const stockMap = {};
        let total = 0;
        data.forEach((item) => {
          const type = item.type || item.category || "Other";
          const count = item.stock || item.quantity || 1;
          stockMap[type] = (stockMap[type] || 0) + count;
          total += count;
        });
        const pieData = Object.entries(stockMap).map(([type, value], idx) => ({
          browser: type,
          visitors: value,
          fill: `hsl(var(--chart-${(idx % 5) + 1}))`,
        }));
        setChartData(pieData);
        setTotalStocks(total);
      });
  }, []);

  const chartConfig = {
    visitors: {
      label: "Stocks",
    },
  };

  return (
    <Card className="flex flex-col justify-center bg-white/90 scale- relative shadow-lg rounded-3xl border border-gray-200 h-fit w-fit">
      <CardHeader className="items-center pb-2"></CardHeader>
      <CardContent className="flex-1 flex items-center justify-center p-0">
        <ChartContainer config={chartConfig} className="w-full h-[220px]">
          <PieChart className="w-20 h-[1 0px]">
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={30}
              outerRadius={45}
              strokeWidth={3}
              cx="50%"
              cy="50%"
              className="w-8 h10"
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalStocks.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="text-[2px] fill-muted-foreground"
                        >
                          Stocks Left{" "}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-1 text-sm pt-2 pb-3">
        <div className="flex items-center gap-2 font-medium leading-none">
          {/* You can update this to show a real trend if you have the data */}
          Inventory status updated <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}

export default PieChartDash;
