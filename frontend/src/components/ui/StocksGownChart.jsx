import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import GownChartTooltip from "./StocksGownChartTooltip";

const SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
const COLOR = "#2563eb";

// hardcoded datas di ko muna kinuha sa fethch
const exampleData = [
  { size: "XS", count: 5, color: COLOR },
  { size: "S", count: 12, color: COLOR },
  { size: "M", count: 20, color: COLOR },
  { size: "L", count: 18, color: COLOR },
  { size: "XL", count: 10, color: COLOR },
  { size: "2XL", count: 7, color: COLOR },
  { size: "3XL", count: 2, color: COLOR },
];

export default function SizesChart({ data = exampleData }) {
  return (
    <div className="w-full flex flex-col items-center">
      <BarChart // dol todo necita ase adjust si man resize tu
        width={900} // aki man adjust
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
          content={<GownChartTooltip />}
          cursor={{ fill: "#e0e7ef", opacity: 0.3 }} //style
        />
      </BarChart>
    </div>
  );
}
