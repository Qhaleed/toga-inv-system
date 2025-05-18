import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import ReturnedHoodTooltip from "./ReturnedHoodTooltip";

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
    if (
      returnData &&
      returnData.returnByVariant &&
      returnData.returnByVariant.hood
    ) {
      const hoodVariantData = returnData.returnByVariant.hood;

      // Convert the hood variant data into chart-friendly format
      const formattedData = Object.entries(hoodVariantData).map(
        ([color, count], index) => {
          // Create a color gradient for the bars
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
      }
    } else {
      // Fallback to fetch data directly if no returnData prop
      fetch("http://localhost:5001/items")
        .then((res) => res.json())
        .then((data) => {
          const hoodColors = {};

          data.forEach((item) => {
            if (
              item.return_status === "Returned" &&
              item.item_type === "hood"
            ) {
              const quantity = item.quantity || 1;
              const color = item.variant || "Standard";

              hoodColors[color] = (hoodColors[color] || 0) + quantity;
            }
          });

          // Convert the collected data to chart format
          const formattedData = Object.entries(hoodColors).map(
            ([color, count], index) => {
              // Create a color gradient
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
            // Keep example data if no real data is available
            setChartData(exampleData);
          }
        })
        .catch((error) => {
          console.error("Error fetching hood return data:", error);
        });
    }
  }, [returnData]);

  return (
    <div className="w-full flex flex-col items-center">
      <BarChart
        // dol todo necita ase adjust si man resize tu
        width={700} // aki man adjust
        height={520} // and este
        data={chartData}
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
          fill={(data) => data.color || COLOR}
          radius={8}
          barSize={40}
          isAnimationActive
        />
        <Tooltip
          // el tooltip amo se ta lamma kunel hover data effect disuyu
          content={(props) => <ReturnedHoodTooltip {...props} />}
          cursor={{ fill: "#e0e7ef", opacity: 0.3 }} //style
        />
      </BarChart>

      {/* Display color breakdown if available */}
      {chartData.length > 0 && (
        <div className="mt-4 text-center">
          <h3 className="font-semibold text-gray-700 mb-2">
            Hood Color Breakdown
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {chartData.map((item) => (
              <div
                key={item.colors}
                className="px-3 py-1 rounded-full"
                style={{ backgroundColor: `${item.color}30` }}
              >
                <span className="font-medium" style={{ color: item.color }}>
                  {item.colors}: {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
