export default function ItemStatusAllTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  // When there's only one status
  if (payload.length === 1) {
    const d = payload[0].payload;
    return (
      <div className="rounded-lg bg-white p-3 shadow text-sm border border-gray-200 text-center">
        <div
          className="font-bold px-3 py-1 rounded-full inline-block mb-2"
          style={{ backgroundColor: d.color, color: "white" }}
        >
          {d.status}
        </div>
        <div className="font-bold text-lg">Total of {d.count}</div>
      </div>
    );
  }

  // Multiple statuses
  return (
    <div className="rounded-lg bg-white px-4 py-3 shadow border border-gray-200 text-sm">
      <div className="font-bold mb-2">{label}</div>
      {payload.map(({ name, value, color }) => (
        <div key={name} className="flex justify-between items-center mb-1">
          <span className="font-medium" style={{ color }}>
            {name}
          </span>
          <span className="ml-4 font-semibold">{value}</span>
        </div>
      ))}
    </div>
  );
}
