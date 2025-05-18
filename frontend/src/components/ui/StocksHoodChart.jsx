import React, { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import StocksHoodChartTooltip from "./StocksHoodChartTooltip";

const COLORS = ["Blue", "Maroon", "Orange", "White", "Yellow"];
const COLOR = "#2563eb";

// hardcoded datas di ko muna kinuha sa fethch
const exampleData = [
  { colors: "Blue", count: 5, color: "#2563EB" },
  { colors: "Maroon", count: 12, color: "#1E4FCC" },
  { colors: "Orange", count: 20, color: "#3A78F0" },
  { colors: "White", count: 18, color: "#5B91F3" },
  { colors: "Yellow", count: 10, color: "#7DAAF6" },
];

// Color mapping for consistent colors
const colorMapping = {
  Blue: "#2563EB",
  Maroon: "#1E4FCC",
  Orange: "#3A78F0",
  White: "#5B91F3",
  Yellow: "#7DAAF6",
};

export default function SizesChart({ stocksData }) {
  // Transform the data from Stocks.jsx format to the format needed by this chart
  const data = useMemo(() => {
    if (!stocksData || !stocksData.hoodColors) {
      return exampleData;
    }

    // Convert the hoodColors object from Stocks.jsx to the array format needed by the chart
    return Object.entries(stocksData.hoodColors).map(([color, count]) => ({
      colors: color,
      count: count,
      color: colorMapping[color] || "#2563EB", // Use the defined color or default to blue
    }));
  }, [stocksData]);

  return (
    <div className="w-full flex flex-col items-center">
      <BarChart
        // dol todo necita ase adjust si man resize tu
        width={700} // aki man adjust
        height={520} // and este
        data={data}
        margin={{ top: 24, right: 24, left: 24, bottom: 24 }} // este tamen
        className="w-full"
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#e5e7eb"
        />
        <XAxis
          dataKey="colors"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          fontWeight="bold"
          fontSize={16}
        />
        <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
        <Bar
          dataKey="count"
          fill={({ color }) => color} // Use the color from the data point
          radius={8}
          barSize={40}
          isAnimationActive
        />
        <Tooltip
          // el tooltip amo se ta lamma kunel hover data effect disuyu
          content={<StocksHoodChartTooltip />}
          cursor={{ fill: "#e0e7ef", opacity: 0.3 }} //style
        />
      </BarChart>
    </div>
  );
}
