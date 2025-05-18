import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import StocksCapTooltip from "./StocksCapTooltip";

const COLOR = "#2563eb";
const CONDITION_COLORS = {
  goodCondition: "#4ade80", // green
  forRepair: "#facc15", // yellow
  damaged: "#ef4444", // red
};

// Create formatted data for the chart based on the itemsData from Stocks.jsx
export default function StocksCapChart({ data }) {
  // If no data provided, use some example data for preview
  const chartData = React.useMemo(() => {
    if (!data) {
      // Example data for preview
      return [
        { category: "Total", count: 34, color: COLOR },
        { category: "Good", count: 30, color: CONDITION_COLORS.goodCondition },
        { category: "For Repair", count: 4, color: CONDITION_COLORS.forRepair },
        { category: "Damaged", count: 2, color: CONDITION_COLORS.damaged },
      ];
    }

    // Format the real data if provided
    return [
      { category: "Total", count: data.capQuantity || 0, color: COLOR },
      { category: "Good", count: data.statusBreakdown?.goodCondition || 0, color: CONDITION_COLORS.goodCondition },
      { category: "For Repair", count: data.statusBreakdown?.forRepair || 0, color: CONDITION_COLORS.forRepair },
      { category: "Damaged", count: data.statusBreakdown?.damaged || 0, color: CONDITION_COLORS.damaged },
    ];
  }, [data]);

  return (
    <div className="w-full flex flex-col items-center">
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={chartData}
          margin={{ top: 24, right: 24, left: 24, bottom: 24 }}
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
          <Legend />
          <Bar
            dataKey="count"
            radius={8}
            barSize={60}
            isAnimationActive
            name="Cap Count"
            fill={(entry) => entry.color}
          />
          <Tooltip
            content={<StocksCapTooltip />}
            cursor={{ fill: "#e0e7ef", opacity: 0.3 }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
