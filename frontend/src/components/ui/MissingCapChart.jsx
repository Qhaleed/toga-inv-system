import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import MissingCapTooltip from "./MissingCapTooltip";

const COLOR = "#2563eb";

// Example data for cap category (boolean yes/no)
const exampleData = [
  { category: "Cap", count: 34, color: "#2563eb" },
];

export default function CapCategoryChart({ returnData }) {
  const [chartData, setChartData] = useState(exampleData);

  useEffect(() => {
    // If returnData is passed as a prop, use it to update the chart
    if (returnData && returnData.returnByType) {
      const missingCapCount = returnData.returnByType.cap.missing;

      // Create data object for rendering
      const newChartData = [{
        category: "Missing Cap",
        count: missingCapCount,
        color: COLOR
      }];

      setChartData(newChartData);
    } else {
      // Fallback to fetch data directly if no returnData prop
      fetch("http://localhost:5001/items")
        .then((res) => res.json())
        .then((data) => {
          let capMissing = 0;
          let capSizes = {};

          data.forEach((item) => {
            if ((item.return_status === "Not Returned" || item.return_status === "Missing") &&
              (item.item_type === "cap" || item.item_type === "Cap")) {
              const quantity = item.quantity || 1;
              const variant = item.variant || "Standard";

              capMissing += quantity;
              capSizes[variant] = (capSizes[variant] || 0) + quantity;
            }
          });

          setChartData([{
            category: "Missing Cap",
            count: capMissing,
            color: COLOR,
            variants: capSizes
          }]);
        })
        .catch(error => {
          console.error("Error fetching cap missing data:", error);
        });
    }
  }, [returnData]);

  return (
    <div className="w-full flex flex-col items-center">
      <BarChart
        width={700}
        height={520}
        data={chartData}
        margin={{ top: 24, right: 24, left: 24, bottom: 24 }}
        className="w-full"
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#e5e7eb"
        />
        <XAxis
          dataKey="category"
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
          barSize={60}
          isAnimationActive
        />
        <Tooltip
          content={(props) => <MissingCapTooltip {...props} />}
          cursor={{ fill: "#e0e7ef", opacity: 0.3 }}
        />
      </BarChart>

      {/* Display a message about missing caps */}
      <div className="mt-4 text-center">
        <h3 className="font-semibold text-gray-700 mb-2">Missing Cap Items</h3>
        <div className="text-gray-600">
          {chartData[0]?.count > 0 ? (
            <p>There are currently <span className="font-bold text-blue-700">{chartData[0].count}</span> missing cap items.</p>
          ) : (
            <p>No missing cap items recorded.</p>
          )}
        </div>
      </div>
    </div>
  );
}
