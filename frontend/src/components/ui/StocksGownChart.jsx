import React, { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import GownChartTooltip from "./StocksGownChartTooltip";

// Define the size order for proper sorting
const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
const COLOR = "#2563eb";

// hardcoded datas di ko muna kinuha sa fethch
const exampleData = [
  { size: "XS", count: 5, color: "#2563EB" },
  { size: "S", count: 12, color: "#1E4FCC" },
  { size: "M", count: 20, color: "#3A78F0" },
  { size: "L", count: 18, color: "#5B91F3" },
  { size: "XL", count: 10, color: "#7DAAF6" },
  { size: "2XL", count: 7, color: "#2563EB" },
  { size: "3XL", count: 2, color: "#1E4FCC" },
];

// Color mapping for consistent colors
const colorMapping = {
  XS: "#2563EB",
  S: "#1E4FCC",
  M: "#3A78F0",
  L: "#5B91F3",
  XL: "#7DAAF6",
  "2XL": "#2563EB",
  "3XL": "#1E4FCC",
};

// Function to ensure we have data for all sizes even if some are zero
const ensureAllSizes = (data) => {
  const result = [...data];

  // Make sure all sizes are represented
  SIZE_ORDER.forEach((size) => {
    if (!result.find((item) => item.size === size)) {
      // If this size doesn't exist in the data, add it with count 0
      result.push({
        size: size,
        count: 0,
        color: colorMapping[size],
      });
    }
  });

  // Sort by the predefined size order
  return result.sort((a, b) => {
    return SIZE_ORDER.indexOf(a.size) - SIZE_ORDER.indexOf(b.size);
  });
};

export default function SizesChart({ stocksData }) {
  // Transform the data from Stocks.jsx format to the format needed by this chart
  const data = useMemo(() => {
    if (!stocksData || !stocksData.gownSizes) {
      return exampleData;
    }

    // Convert the gownSizes object from Stocks.jsx to the array format needed by the chart
    const transformedData = Object.entries(stocksData.gownSizes).map(
      ([size, count]) => ({
        size: size,
        count: count,
        color: colorMapping[size] || "#2563EB", // Use the defined color or default to blue
      })
    );

    // Ensure all sizes are represented and properly sorted
    return ensureAllSizes(transformedData);
  }, [stocksData]);

  return (
    <div className="w-full flex flex-col items-center">
      <BarChart
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
          dataKey="size"
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
          content={<GownChartTooltip />}
          cursor={{ fill: "#e0e7ef", opacity: 0.3 }} //style
        />
      </BarChart>
    </div>
  );
}
