import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import ItemStatusAllTooltip from "./ItemStatusAllTooltip";

export default function ItemStatusHoodChart({ items = [] }) {
  // Memoize status and color arrays to avoid dependency issues
  const STATUS = useMemo(
    () => ["In Good Condition", "For Repair", "Damaged"],
    []
  );
  const COLORS = useMemo(
    () => [
      "#16a34a", // In Good Condition (green)
      "#eab308", // For Repair (yellow)
      "#dc2626", // Damaged (red)
    ],
    []
  );

  // Define Hood colors for x-axis
  const HOOD_COLORS = useMemo(
    () => ["Blue", "Maroon", "Orange", "White", "Yellow"],
    []
  );

  // Build chart data: one entry per Hood color, each with 3 status counts, sorted by STATUS order
  const chartData = useMemo(() => {
    return HOOD_COLORS.map((color) => {
      // Gather all items for this color (case-insensitive, trimmed, using variant field)
      const colorLower = color.toLowerCase().trim();
      const colorItems = items.filter((item) => {
        const type = (item.item_type || "").toLowerCase().trim();
        const variant = (item.variant || "").toLowerCase().trim();
        return type === "hood" && variant === colorLower;
      });
      // For each status, get the count (sorted by STATUS order)
      const entry = { color };
      STATUS.forEach((status) => {
        entry[status] = colorItems
          .filter(
            (item) =>
              (item.item_status || "").toLowerCase().trim() ===
              status.toLowerCase().trim()
          )
          .reduce((sum, item) => sum + (item.quantity || 0), 0);
      });
      return entry;
    });
  }, [items, STATUS, HOOD_COLORS]);

  // Check if items is empty or all chart data is zero
  const allZero = chartData.every((entry) =>
    STATUS.every((status) => entry[status] === 0)
  );

  if (!items.length) {
    return (
      <div className="text-red-600 font-bold p-4">
        No hood items data received. Check parent component or API.
      </div>
    );
  }
  if (allZero) {
    return (
      <div className="text-yellow-600 font-bold p-4">
        Hood chart: All values are zero. Check data values and normalization.
      </div>
    );
  }

  // Debug: log incoming items and unique field values
  console.log("Hood Items", items);
  console.log(
    "Unique item_status",
    Array.from(new Set(items.map((i) => i.item_status)))
  );
  console.log(
    "Unique variant",
    Array.from(new Set(items.map((i) => i.variant)))
  );
  console.log(
    "Unique item_type",
    Array.from(new Set(items.map((i) => i.item_type)))
  );

  // Debug: log chart data
  console.log("Hood Chart Data", chartData);

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
            dataKey="color"
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
          <Legend />
          {STATUS.map((status, idx) => (
            <Bar
              key={status}
              dataKey={status}
              name={status}
              fill={COLORS[idx]}
              radius={8}
              barSize={30}
              isAnimationActive
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
