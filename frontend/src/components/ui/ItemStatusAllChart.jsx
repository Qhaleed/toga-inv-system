import React, { useEffect, useState } from "react";
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

export default function ItemStatusAllChart({ items = [] }) {
  const STATUS = ["In Good Condition", "For Repair", "Damaged"];
  const COLORS = [
    "#16a34a", // In Good Condition (green)
    "#eab308", // For Repair (yellow)
    "#dc2626", // Damaged (red)
  ];
  const [chartData, setChartData] = useState([
    { status: STATUS[0], count: 0, color: COLORS[0] },
    { status: STATUS[1], count: 0, color: COLORS[1] },
    { status: STATUS[2], count: 0, color: COLORS[2] },
  ]);

  useEffect(() => {
    if (!items || items.length === 0) {
      setChartData([
        { status: STATUS[0], count: 0, color: COLORS[0] },
        { status: STATUS[1], count: 0, color: COLORS[1] },
        { status: STATUS[2], count: 0, color: COLORS[2] },
      ]);
      return;
    }
    const statusCount = {
      [STATUS[0]]: 0,
      [STATUS[1]]: 0,
      [STATUS[2]]: 0,
    };
    items.forEach((item) => {
      const quantity = item.quantity || 0;
      const status = item.item_status;
      if (statusCount.hasOwnProperty(status)) {
        statusCount[status] += quantity;
      }
    });
    setChartData(
      STATUS.map((status, idx) => ({
        status,
        count: statusCount[status],
        color: COLORS[idx],
      }))
    );
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
