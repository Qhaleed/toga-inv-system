import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import ItemStatusAllTooltip from "./ItemStatusAllTooltip";

const STATUS = ["In Good Condition", "For Repair", "Damaged"];
const COLOR = ["#2563eb", "#1E4FCC", "#3A78F0"];

// Example data for cap category (boolean yes/no)
const exampleData = [
  { status: "In Good Condition", count: 34, color: "#2563eb" },
  { status: "For Repair", count: 12, color: "#1E4FCC" },
  { status: "Damaged", count: 20, color: "#3A78F0" },
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
          dataKey="status"
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
          content={<ItemStatusAllTooltip />}
          cursor={{ fill: "#e0e7ef", opacity: 0.3 }}
        />
      </BarChart>
    </div>
  );
}
