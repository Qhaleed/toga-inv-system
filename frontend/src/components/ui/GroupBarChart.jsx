"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";

const chartConfig = {
  views: {
    label: "Daily Activity",
  },
  rentals: {
    label: "Rentals",
    color: "#0066cc", // Deeper blue
  },
  returns: {
    label: "Returns",
    color: "#66b3ff", // Light blue
  },
  total: {
    label: "Total Activity",
    color: "#3399ff", // Medium blue
  }
};

// Custom tooltip component
function CustomBarTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  const date = new Date(label);
  const dateStr = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Find the rentals and returns values from the original data
  const rentals = payload[0]?.payload?.rentals || 0;
  const returns = payload[0]?.payload?.returns || 0;
  const total = rentals + returns;

  return (
    <div className="bg-white px-3 py-2 text-xs min-w-[8rem] rounded-lg shadow-md">
      <div className="font-bold mb-2 text-gray-800 border-b pb-1">{dateStr}</div>
      <div className="flex items-center gap-2 py-1">
        <span
          className="inline-block w-3 h-3 rounded-full"
          style={{ background: chartConfig.total.color }}
        ></span>
        <span className="font-semibold text-base text-gray-900">
          Total: {total}
        </span>
      </div>
      <div className="flex items-center gap-2 py-1">
        <span
          className="inline-block w-3 h-3 rounded-full"
          style={{ background: chartConfig.rentals.color }}
        ></span>
        <span className="text-sm text-gray-700">
          Rentals: {rentals}
        </span>
      </div>
      <div className="flex items-center gap-2 py-1">
        <span
          className="inline-block w-3 h-3 rounded-full"
          style={{ background: chartConfig.returns.color }}
        ></span>
        <span className="text-sm text-gray-700">
          Returns: {returns}
        </span>
      </div>
    </div>
  );
}

export function GroupBarChart() {
  const [chartData, setChartData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchRentalData = async () => {
      try {
        const response = await fetch("http://localhost:5001/inventory");
        const data = await response.json();

        // Group rentals and returns by date
        const dateMap = data.reduce((acc, item) => {
          // Handle rental date
          if (item.rent_date) {
            const rentDate = new Date(item.rent_date)
              .toISOString()
              .split("T")[0];
            if (!acc[rentDate]) {
              acc[rentDate] = { rentals: 0, returns: 0 };
            }
            acc[rentDate].rentals += 1;
          }

          // Handle return date - check if item is returned
          if (item.return_status === "Returned" && item.updated_at) {
            const returnDate = new Date(item.updated_at)
              .toISOString()
              .split("T")[0];
            if (!acc[returnDate]) {
              acc[returnDate] = { rentals: 0, returns: 0 };
            }
            acc[returnDate].returns += 1;
          }
          return acc;
        }, {});

        // Get min and max dates
        const dates = Object.keys(dateMap);
        if (dates.length === 0) {
          setChartData([]);
          setLoading(false);
          return;
        }

        const minDate = new Date(
          Math.min(...dates.map((date) => new Date(date)))
        );
        const maxDate = new Date(
          Math.max(...dates.map((date) => new Date(date)))
        );

        // Fill in missing dates with 0 rentals and returns
        const allDates = [];
        const currentDate = new Date(minDate);

        while (currentDate <= maxDate) {
          const dateString = currentDate.toISOString().split("T")[0];
          const rentals = dateMap[dateString]?.rentals || 0;
          const returns = dateMap[dateString]?.returns || 0;

          allDates.push({
            date: dateString,
            rentals: rentals,
            returns: returns,
            total: rentals + returns
          });
          currentDate.setDate(currentDate.getDate() + 1);
        }

        // Sort by date
        allDates.sort((a, b) => new Date(a.date) - new Date(b.date));

        setChartData(allDates);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rental data:", error);
        setLoading(false);
      }
    };

    fetchRentalData();
  }, []);

  const totals = React.useMemo(
    () => ({
      rentals: chartData.reduce((acc, curr) => acc + curr.rentals, 0),
      returns: chartData.reduce((acc, curr) => acc + curr.returns, 0),
      total: chartData.reduce((acc, curr) => acc + curr.total, 0)
    }),
    [chartData]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        Loading rental data...
      </div>
    );
  }

  return (
    <div className="flex overflow-hidden flex-col w-full h-full">
      <CardHeader className="flex flex-col w-full p-10">
        <div className="flex w-full justify-around">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="inline-block w-4 h-4 rounded-full"
                style={{ backgroundColor: chartConfig.total.color }}
              />
              <span className="text-sm text-muted-foreground">Total Activity</span>
            </div>
            <span className="text-xl font-bold leading-none">
              {totals.total.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="inline-block w-4 h-4 rounded-full"
                style={{ backgroundColor: chartConfig.rentals.color }}
              />
              <span className="text-sm text-muted-foreground">Rentals</span>
            </div>
            <span className="text-xl font-bold leading-none">
              {totals.rentals.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="inline-block w-4 h-4 rounded-full"
                style={{ backgroundColor: chartConfig.returns.color }}
              />
              <span className="text-sm text-muted-foreground">Returns</span>
            </div>
            <span className="text-xl font-bold leading-none">
              {totals.returns.toLocaleString()}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex">
        <ChartContainer
          config={chartConfig}
          className="flex-1 w-full mt-2 overflow-x-hidden h-full"
        >
          <div className="w-full h-40 bg-white">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={3}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
                <Tooltip content={<CustomBarTooltip />} />
                <Bar
                  dataKey="total"
                  name="Total Activity"
                  fill={chartConfig.total.color}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
      </CardContent>
    </div>
  );
}
