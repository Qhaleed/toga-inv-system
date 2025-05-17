import React from "react";

export default function ItemStatusTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-lg bg-white p-3 shadow text-sm border border-gray-200">
      <div className="font-bold mb-1" style={{ color: d.color }}>
        {d.status}
      </div>
      <div className="font-bold text-lg">Total of {d.count}</div>
    </div>
  );
}