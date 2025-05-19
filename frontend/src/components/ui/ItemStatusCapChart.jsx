import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import ItemStatusAllTooltip from "./ItemStatusAllTooltip";

export default function ItemStatusCapChart({ items = [] }) {
  // Compute cap status breakdown
  const chartData = useMemo(() => {
    const STATUS = ["In Good Condition", "For Repair", "Damaged"];
    const COLORS = [
      "#16a34a", // In Good Condition (green, match AllChart)
      "#f59e42", // For Repair (orange)
      "#e11d48", // Damaged (red)
    ];
    const statusCounts = {
      [STATUS[0]]: 0,
      [STATUS[1]]: 0,
      [STATUS[2]]: 0,
    };
    items.forEach((item) => {
      if (item.item_type === "cap") {
        const status = item.item_status;
        statusCounts[status] =
          (statusCounts[status] || 0) + (item.quantity || 0);
      }
    });
    return STATUS.map((status, idx) => ({
      status,
      count: statusCounts[status],
      color: COLORS[idx],
    }));
  }, [items]);

  return (
    <div className="w-full p-4 sm:p-6 md:p-8">
      <ResponsiveContainer width="100%" height={400}>
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
            dataKey="status"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            style={{ fontWeight: 600, fontSize: "14px" }}
          />
          <YAxis
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
            style={{ fontSize: "13px" }}
          />
          <Tooltip
            content={<ItemStatusAllTooltip />}
            cursor={{ fill: "#e0e7ef", opacity: 0.3 }}
          />
          <Bar dataKey="count" radius={8} barSize={60} isAnimationActive>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
