import React from "react";

export function DashboardPieTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const { item, value } = payload[0].payload;
  return (
    <div className="rounded-lg bg-white/90 px-3 py-2 shadow-lg border border-gray-200 text-xs text-black">
      <div className="font-semibold">{item}</div>
      <div>
        Quantity: <span className="font-bold">{value}</span>
      </div>
    </div>
  );
}
