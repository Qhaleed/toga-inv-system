import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import MissingGownTooltip from "./MissingGownTooltip";

const SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
const COLOR = "#2563eb";

// hardcoded datas di ko muna kinuha sa fethch
const exampleData = [
  { size: "XS", count: 5, color: "#2563EB"},
  { size: "S", count: 12, color: "#1E4FCC"},
  { size: "M", count: 20, color: "#3A78F0" },
  { size: "L", count: 18, color: "#5B91F3" },
  { size: "XL", count: 10, color: "#7DAAF6" },
  { size: "2XL", count: 7, color: "#2563EB" },
  { size: "3XL", count: 2, color: "#1E4FCC" },
];

export default function SizesChart({ data = exampleData }) {
  return (
    <div className="w-full flex flex-col items-center">
      <BarChart // dol todo necita ase adjust si man resize tu
        width={700} // aki man adjust
        height={520} // and este
        data={data}
        margin={{ top: 24, right: 24, left: 24, bottom: 24 }} // este tamen
        className="w-full"
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#e5e7eb"
        />
        <XAxis
          dataKey="size"
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
          barSize={40}
          isAnimationActive
        />
        <Tooltip // el tooltip amo se ta lamma kunel hover data effect disuyu
          content={<MissingGownTooltip />}
          cursor={{ fill: "#e0e7ef", opacity: 0.3 }} //style
        />
      </BarChart>
    </div>
  );
}
