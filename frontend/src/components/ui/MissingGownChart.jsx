import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import MissingGownTooltip from "./MissingGownTooltip";

const COLOR = "#b6c2e0";

// hardcoded datas di ko muna kinuha sa fethch
const exampleData = [
  { size: "XS", count: 5, color: "#2563EB" },
  { size: "S", count: 12, color: "#1E4FCC" },
  { size: "M", count: 20, color: "#3A78F0" },
  { size: "L", count: 18, color: "#5B91F3" },
  { size: "XL", count: 10, color: "#7DAAF6" },
  { size: "2XL", count: 7, color: "#2563EB" },
  { size: "3XL", count: 2, color: "#1E4FCC" },
];

export default function SizesChart({ returnData }) {
  const [chartData, setChartData] = useState(exampleData);

  useEffect(() => {
    // If returnData is passed as a prop, use it to update the chart
    if (returnData && returnData.returnByType) {
      const missingGownCount = returnData.returnByType.gown.missing;

      // For missing items, we might not have detailed variant data
      // Create a simplified chart showing the missing count
      const newChartData = [{
        size: "Missing Gowns",
        count: missingGownCount,
        color: COLOR
      }];

      setChartData(newChartData);
    } else {
      // Fallback to fetch data directly if no returnData prop
      fetch("http://localhost:5001/items")
        .then((res) => res.json())
        .then((data) => {
          const gownSizes = {};

          data.forEach((item) => {
            if ((item.return_status === "Not Returned" || item.return_status === "Missing") &&
              (item.item_type === "gown")) {
              const quantity = item.quantity || 1;
              const size = item.variant || "Standard";

              gownSizes[size] = (gownSizes[size] || 0) + quantity;
            }
          });

          // Sort sizes in logical order
          const sizeOrder = {
            'XXS': 0, 'XS': 1, 'S': 2, 'M': 3, 'L': 4, 'XL': 5,
            '2XL': 6, '3XL': 7, '4XL': 8, '5XL': 9, '6XL': 10
          };

          // Convert the collected data to chart format
          let formattedData = Object.entries(gownSizes).map(([size, count], index) => {
            // Create a color gradient
            const colorShade = index % 5;
            let barColor;

            switch (colorShade) {
              case 0: barColor = "#a3b3da"; break;
              case 1: barColor = "#8fa3d3"; break;
              case 2: barColor = "#7b93cc"; break;
              case 3: barColor = "#6783c6"; break;
              case 4: barColor = "#5373bf"; break;
              default: barColor = COLOR;
            }

            return {
              size: size,
              count: count,
              color: barColor,
              order: sizeOrder[size] !== undefined ? sizeOrder[size] : 999
            };
          });

          // Sort the data by size order
          formattedData.sort((a, b) => a.order - b.order);

          // Remove the auxiliary order property
          formattedData = formattedData.map(({ order, ...rest }) => rest);

          if (formattedData.length > 0) {
            setChartData(formattedData);
          } else {
            // If no missing gowns, show a placeholder
            setChartData([{
              size: "Missing Gowns",
              count: 0,
              color: COLOR
            }]);
          }
        })
        .catch(error => {
          console.error("Error fetching gown missing data:", error);
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
          fill={(data) => data.color || COLOR}
          radius={8}
          barSize={40}
          isAnimationActive
        />
        <Tooltip
          content={(props) => <MissingGownTooltip {...props} />}
          cursor={{ fill: "#e0e7ef", opacity: 0.3 }}
        />
      </BarChart>

      {/* Display size breakdown if available */}
      {chartData.length > 0 && (
        <div className="mt-4 text-center">
          <h3 className="font-semibold text-gray-700 mb-2">Missing Gown Summary</h3>
          {chartData.length === 1 && chartData[0].size === "Missing Gowns" ? (
            <div className="text-gray-600">
              {chartData[0].count > 0 ? (
                <p>There are <span className="font-bold text-blue-600">{chartData[0].count}</span> missing gown items.</p>
              ) : (
                <p>No missing gown items recorded.</p>
              )}
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-3">
              {chartData.map((item) => (
                <div key={item.size}
                  className="bg-blue-100 px-3 py-1 rounded-full">
                  <span className="font-medium text-blue-800">
                    {item.size}: {item.count}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
