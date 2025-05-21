import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import MissingTasselTooltip from "./MissingTasselTooltip";

const COLOR = "#60a5fa";

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
      const missingTasselCount = returnData.returnByType.tassel.missing;

      // For missing items, we might not have variant data in returnData
      // So we'll create a simple chart showing just the total missing count
      const newChartData = [
        {
          colors: "Missing Tassels",
          count: missingTasselCount,
          color: COLOR,
        },
      ];

      setChartData(newChartData);
    } else {
      // Fallback to fetch data directly if no returnData prop
      fetch("http://localhost:5001/items")
        .then((res) => res.json())
        .then((data) => {
          const tasselColors = {};

          data.forEach((item) => {
            if (
              (item.return_status === "Not Returned" ||
                item.return_status === "Missing") &&
              (item.item_type === "tassel" || item.item_type === "tassle")
            ) {
              const quantity = item.quantity || 1;
              const color = item.variant || "Unknown";

              tasselColors[color] = (tasselColors[color] || 0) + quantity;
            }
          });

          // Convert the collected data to chart format
          const formattedData = Object.entries(tasselColors).map(
            ([color, count], index) => {
              // Create a color gradient based on the base tassel color
              const colorShade = index % 5;
              let barColor;

              switch (colorShade) {
                case 0:
                  barColor = "#2563EB";
                  break;
                case 1:
                  barColor = "#1E4FCC";
                  break;
                case 2:
                  barColor = "#3A78F0";
                  break;
                case 3:
                  barColor = "#5B91F3";
                  break;
                case 4:
                  barColor = "#7DAAF6";
                  break;
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
            // If no missing tassels, show a placeholder
            setChartData([
              {
                colors: "Missing Tassels",
                count: 0,
                color: COLOR,
              },
            ]);
          }
        })
        .catch((error) => {
          console.error("Error fetching tassel missing data:", error);
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
          content={(props) => <MissingTasselTooltip {...props} />}
          cursor={{ fill: "#e0e7ef", opacity: 0.3 }}
        />
      </BarChart>

      {/* Display summary information about missing tassels */}
      <div className="mt-4 text-center">
        <h3 className="font-semibold text-gray-700 mb-2">
          Missing Tassel Summary
        </h3>
        {chartData.length === 1 ? (
          <div className="text-gray-600">
            {chartData[0].count > 0 ? (
              <p>
                There are{" "}
                <span className="font-bold text-blue-600">
                  {chartData[0].count}
                </span>{" "}
                missing tassel items.
              </p>
            ) : (
              <p>No missing tassel items recorded.</p>
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
                >{`${item.colors}: ${item.count}`}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
