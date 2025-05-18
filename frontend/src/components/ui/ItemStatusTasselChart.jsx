import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import ItemStatusAllTooltip from "./ItemStatusAllTooltip";

const COLOR = ["#60a5fa", "#4287d6", "#2b5893"];

export default function ItemStatusTasselChart() {
    const [chartData, setChartData] = useState([
        { status: "In Good Condition", count: 0, color: "#60a5fa" },
        { status: "For Repair", count: 0, color: "#4287d6" },
        { status: "Damaged", count: 0, color: "#2b5893" },
    ]);

    useEffect(() => {
        fetch("http://localhost:5001/items")
            .then((res) => res.json())
            .then((data) => {
                // Initialize counters for each status
                let inGoodCondition = 0;
                let forRepair = 0;
                let damaged = 0;

                // Process only tassel items
                data.forEach((item) => {
                    if (item.item_type === "tassle" || item.item_type === "tassel") { // Handle possible typo in DB
                        const itemQuantity = item.quantity || 0;

                        if (item.item_status === "In Good Condition") {
                            inGoodCondition += itemQuantity;
                        } else if (item.item_status === "For Repair") {
                            forRepair += itemQuantity;
                        } else if (item.item_status === "Damaged") {
                            damaged += itemQuantity;
                        }
                    }
                });

                // Update chart data with real values
                setChartData([
                    { status: "In Good Condition", count: inGoodCondition, color: "#60a5fa" },
                    { status: "For Repair", count: forRepair, color: "#4287d6" },
                    { status: "Damaged", count: damaged, color: "#2b5893" },
                ]);
            })
            .catch((error) => {
                console.error("Error fetching tassel data for chart:", error);
            });
    }, []);

    return (
        <div className="w-full flex flex-col items-center">
            <BarChart
                width={900}
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
                    dataKey="status"
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
                    content={<ItemStatusAllTooltip />}
                    cursor={{ fill: "#e0e7ef", opacity: 0.3 }}
                />
            </BarChart>
        </div>
    );
}