import React from "react";

export default function ReturnedCapTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-lg bg-white p-3 shadow text-sm border border-gray-200">
      <div className="font-bold mb-1" style={{ color: d.color }}>
        {d.category}
      </div>
      <div className="font-bold text-lg">{d.count} returned</div>
    </div>
  );
}