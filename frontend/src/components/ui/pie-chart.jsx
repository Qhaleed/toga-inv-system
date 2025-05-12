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
    <Card className="flex flex-col justify-center bg-white/90 relative shadow-lg rounded-3xl max-h-[400px] border border-gray-200 w-full max-w-md mx-auto">
      <CardHeader className="items-center pb-2">
        <CardTitle>Available Stocks Left</CardTitle>
        <CardDescription>
          Breakdown of all remaining inventory items
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pt-0 pb-0">
        <ChartContainer config={chartConfig} className=" max-h-[220px]">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={50}
              strokeWidth={3}
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
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalStocks.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
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
        <div className="leading-none text-muted-foreground">
          Showing the total available stocks left in inventory
        </div>
      </CardFooter>
    </Card>
  );
}

export default PieChartDash;
