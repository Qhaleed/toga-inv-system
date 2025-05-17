import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import ReturnedHoodTooltip from "./ReturnedHoodTooltip";

const COLORS = ["Blue", "Maroon", "Orange", "White", "Yellow"];
const COLOR = "#2563eb";

// hardcoded datas di ko muna kinuha sa fethch
const exampleData = [
  { colors: "Blue", count: 5, color: "#2563EB" },
  { colors: "Maroon", count: 12, color: "#1E4FCC" },
  { colors: "Orange", count: 20, color: "#3A78F0" },
  { colors: "White", count: 18, color: "#5B91F3" },
  { colors: "Yellow", count: 10, color: "#7DAAF6" },
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
          dataKey="colors"
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
          content={<ReturnedHoodTooltip />}
          cursor={{ fill: "#e0e7ef", opacity: 0.3 }} //style
        />
      </BarChart>
    </div>
  );
}
