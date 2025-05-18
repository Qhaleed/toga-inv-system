import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import MissingHoodTooltip from "./MissingHoodTooltip";

const COLOR = "#fbbf24";

// hardcoded datas di ko muna kinuha sa fethch
const exampleData = [
  { colors: "Blue", count: 5, color: "#2563EB" },
  { colors: "Maroon", count: 12, color: "#1E4FCC" },
  { colors: "Orange", count: 20, color: "#3A78F0" },
  { colors: "White", count: 18, color: "#5B91F3" },
  { colors: "Yellow", count: 10, color: "#7DAAF6" },
];

export default function SizesChart({ returnData }) {
  const [chartData, setChartData] = useState(exampleData);

  useEffect(() => {
    // If returnData is passed as a prop, use it to update the chart
    if (returnData && returnData.returnByType) {
      const missingHoodCount = returnData.returnByType.hood.missing;

      // For missing items, we might not have detailed variant data
      // Create a simplified chart showing the missing count
      const newChartData = [
        {
          colors: "Missing Hoods",
          count: missingHoodCount,
          color: COLOR,
        },
      ];

      setChartData(newChartData);
    } else {
      // Fallback to fetch data directly if no returnData prop
      fetch("http://localhost:5001/items")
        .then((res) => res.json())
        .then((data) => {
          const hoodColors = {};

          data.forEach((item) => {
            if (
              (item.return_status === "Not Returned" ||
                item.return_status === "Missing") &&
              item.item_type === "hood"
            ) {
              const quantity = item.quantity || 1;
              const color = item.variant || "Unknown";

              hoodColors[color] = (hoodColors[color] || 0) + quantity;
            }
          });

          // Convert the collected data to chart format
          const formattedData = Object.entries(hoodColors).map(
            ([color, count], index) => {
              // Create a color gradient based on amber colors
              const colorShade = index % 5;
              let barColor;

              switch (colorShade) {
                case 0:
                  barColor = "#f59e0b";
                  break; // Amber 500
                case 1:
                  barColor = "#d97706";
                  break; // Amber 600
                case 2:
                  barColor = "#fbbf24";
                  break; // Amber 400
                case 3:
                  barColor = "#f59e0b";
                  break; // Amber 500
                case 4:
                  barColor = "#d97706";
                  break; // Amber 600
                default:
                  barColor = COLOR;
              }

              return {
                colors: color,
                count: count,
                color: barColor,
              };
            }
          );

          if (formattedData.length > 0) {
            setChartData(formattedData);
          } else {
            // If no missing hoods, show a placeholder
            setChartData([
              {
                colors: "Missing Hoods",
                count: 0,
                color: COLOR,
              },
            ]);
          }
        })
        .catch((error) => {
          console.error("Error fetching hood missing data:", error);
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
          fill={(data) => data.color || COLOR}
          radius={8}
          barSize={40}
          isAnimationActive
        />
        <Tooltip
          content={(props) => <MissingHoodTooltip {...props} />}
          cursor={{ fill: "#e0e7ef", opacity: 0.3 }}
        />
      </BarChart>

      {/* Display color breakdown if available */}
      {chartData.length > 0 && (
        <div className="mt-4 text-center">
          <h3 className="font-semibold text-gray-700 mb-2">
            Missing Hood Summary
          </h3>
          {chartData.length === 1 && chartData[0].colors === "Missing Hoods" ? (
            <div className="text-gray-600">
              {chartData[0].count > 0 ? (
                <p>
                  There are{" "}
                  <span className="font-bold text-amber-600">
                    {chartData[0].count}
                  </span>{" "}
                  missing hood items.
                </p>
              ) : (
                <p>No missing hood items recorded.</p>
              )}
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-3">
              {chartData.map((item) => (
                <div
                  key={item.colors}
                  className="px-3 py-1 rounded-full"
                  style={{ backgroundColor: `${item.color}30` }}
                >
                  <span
                    className="font-medium"
                    style={{ color: item.color }}
                  >
                    {item.colors}: {item.count}
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
