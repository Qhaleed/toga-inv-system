import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import StocksCapTooltip from "./StocksCapTooltip";

const CAP_CATEGORIES = ["Yes", "No"];
const COLOR = "#2563eb";

// Example data for cap category (boolean yes/no)
const exampleData = [
  { category: "Yes", count: 34, color: "#2563eb" },
  { category: "No", count: 12, color: "#1E4FCC" },
];

export default function CapCategoryChart({ data = exampleData }) {
  return (
    <div className="w-full flex flex-col items-center">
      <BarChart
        width={900}
        height={520}
        data={data}
        margin={{ top: 24, right: 24, left: 24, bottom: 24 }}
        className="w-full"
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#e5e7eb"
        />
        <XAxis
          dataKey="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          fontWeight="bold"
          fontSize={16}
        />
        <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
        <Bar
          dataKey="count"
          fill={COLOR}
          radius={8}
          barSize={60}
          isAnimationActive
        />
        <Tooltip
          content={<StocksCapTooltip />}
          cursor={{ fill: "#e0e7ef", opacity: 0.3 }}
        />
      </BarChart>
    </div>
  );
}
