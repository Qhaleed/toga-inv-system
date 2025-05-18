import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import ReturnedCapTooltip from "./ReturnedCapTooltip";

const COLOR = "#2563eb";

// Fallback example data
const exampleData = [
  { category: "Cap", count: 34, color: "#2563eb" },
];

export default function CapCategoryChart({ returnData }) {
  const [chartData, setChartData] = useState(exampleData);

  useEffect(() => {
    // If returnData is passed as a prop, use it to update the chart
    if (returnData && returnData.returnByType && returnData.returnByVariant) {
      const { returnByType, returnByVariant } = returnData;

      // Process cap data for chart display
      const capReturnCount = returnByType.cap.returned;

      // Create data object for rendering with variants if available
      const newChartData = [{
        category: "Cap",
        count: capReturnCount,
        color: COLOR,
        variants: returnByVariant.cap || {}
      }];

      setChartData(newChartData);
    } else {
      // Fallback to fetch data directly if no returnData prop
      fetch("http://localhost:5001/items")
        .then((res) => res.json())
        .then((data) => {
          let capReturned = 0;
          let capVariants = {};

          data.forEach((item) => {
            if (item.return_status === "Returned" &&
              (item.item_type === "cap" || item.item_type === "Cap")) {
              const quantity = item.quantity || 1;
              const variant = item.variant || "Standard";

              capReturned += quantity;
              capVariants[variant] = (capVariants[variant] || 0) + quantity;
            }
          });

          setChartData([{
            category: "Cap",
            count: capReturned,
            color: COLOR,
            variants: capVariants
          }]);
        })
        .catch(error => {
          console.error("Error fetching cap return data:", error);
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
          content={(props) => <ReturnedCapTooltip {...props} />}
          cursor={{ fill: "#e0e7ef", opacity: 0.3 }}
        />
      </BarChart>

      {/* Display variant breakdown if available */}
      {chartData[0]?.variants && Object.keys(chartData[0].variants).length > 0 && (
        <div className="mt-4 text-center">
          <h3 className="font-semibold text-gray-700 mb-2">Cap Size Breakdown</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {Object.entries(chartData[0].variants).map(([variant, count]) => (
              <div key={variant} className="bg-blue-100 px-3 py-1 rounded-full">
                <span className="font-medium text-blue-800">{variant}:</span> {count}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
