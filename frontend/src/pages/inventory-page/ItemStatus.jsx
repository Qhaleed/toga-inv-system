import { useState, useEffect, useMemo } from "react";
import ItemStatusAllChart from "../../components/ui/ItemStatusAllChart";
import ItemStatusCapChart from "../../components/ui/ItemStatusCapChart";
import ItemStatusTasselChart from "../../components/ui/ItemStatusTasselChart";
import ItemStatusGownChart from "../../components/ui/ItemStatusGownChart";
import ItemStatusHoodChart from "../../components/ui/ItemStatusHoodChart";

const ItemStatus = () => {
  const [selectedChart, setSelectedChart] = useState("all");
  const [items, setItems] = useState([]);
  const [summary, setSummary] = useState({
    byStatus: {},
    byVariant: {},
    byType: {},
  });

  useEffect(() => {
    fetch("http://localhost:5001/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items || []);
        setSummary(data.summary || { byStatus: {}, byVariant: {}, byType: {} });
      })
      .catch(console.error);
  }, []);

  const totalItems = useMemo(() => {
    // Sum all quantities by type
    return Object.values(summary.byType).reduce((sum, count) => sum + count, 0);
  }, [summary]);

  // Calculate total caps for summary when cap chart is selected
  const totalCaps = useMemo(() => {
    return items
      .filter((item) => item.item_type === "cap")
      .reduce((sum, item) => sum + (item.quantity || 0), 0);
  }, [items]);

  // Calculate cap status breakdown for summary when cap chart is selected
  const capStatusSummary = useMemo(() => {
    const STATUS = ["In Good Condition", "For Repair", "Damaged"];
    const COLORS = [
      "text-[#2563eb] font-bold", // blue bold
      "text-[#f59e42] font-semibold", // orange semi-bold
      "text-[#e11d48] font-bold italic", // red bold italic
    ];
    const statusCounts = {
      [STATUS[0]]: 0,
      [STATUS[1]]: 0,
      [STATUS[2]]: 0,
    };
    items.forEach((item) => {
      if (item.item_type === "cap") {
        statusCounts[item.item_status] =
          (statusCounts[item.item_status] || 0) + (item.quantity || 0);
      }
    });
    return STATUS.map((status, idx) => ({
      status,
      count: statusCounts[status],
      className: COLORS[idx],
    }));
  }, [items]);

  const getButtonClass = (isActive) =>
    isActive
      ? "bg-[#02327B] text-white h-full w-32 rounded-lg font-figtree-medium shadow-md scale-105 transition-all duration-200 hover:bg-[#1e293b] hover:shadow-lg"
      : "border border-[#02327B] text-[#02327B] h-full w-32 rounded-lg font-figtree-medium transition-all duration-200 opacity-80 hover:opacity-100 hover:scale-105 hover:bg-[#e0e7ef] hover:text-[#02327B] hover:shadow-md";

  const statusColors = {
    "In Good Condition": "text-green-600",
    "For Repair": "text-yellow-600",
    Damaged: "text-red-600",
  };

  const chartComponents = {
    all: <ItemStatusAllChart items={items} />,
    cap: <ItemStatusCapChart items={items} />,
    tassel: <ItemStatusTasselChart items={items} />,
    gown: <ItemStatusGownChart items={items} />,
    hood: <ItemStatusHoodChart items={items} />,
  };

  const chartLabels = {
    all: "All Items",
    cap: "Caps",
    tassel: "Tassels",
    gown: "Gowns",
    hood: "Hoods",
  };

  return (
    <div className="w-full p-6 flex flex-col gap-6">
      {/* Page Title (Breadcrumb Style) */}
      <h2 className="text-2xl font-figtree tracking-tight text-[#1e293b] mb-2 drop-shadow-sm">
        <span className="text-black font-bold">Inventory</span>
        <span className="mx-2 text-gray-400 font-bold">&gt;</span>
        <span className="text-primary">Item Status</span>
        <span className="mx-2 text-gray-400 font-bold">&gt;</span>
        <span className="text-[#2563eb]">{chartLabels[selectedChart]}</span>
      </h2>
      {/* Chart Type Selector */}
      <div className="flex flex-wrap justify-center gap-4">
        {Object.keys(chartLabels).map((key) => (
          <button
            key={key}
            className={getButtonClass(selectedChart === key)}
            onClick={() => setSelectedChart(key)}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>

      {/* Chart and Stock Summary Side by Side */}
      <div className="w-full flex flex-col lg:flex-row justify-center items-start gap-4 mt-6">
        {/* Chart and Stock Summary Grouped */}
        <div className="w-full flex flex-col md:flex-row gap-4 items-stretch overflow-visible">
          {/* Chart */}
          <div
            className={`${
              selectedChart === "tassel" ||
              selectedChart === "hood" ||
              selectedChart === "gown"
                ? "w-full"
                : "md:w-2/3"
            } w-full flex justify-center`}
          >
            <div className="bg-white shadow-md rounded-xl p-4 flex flex-col justify-center h-full w-full">
              {chartComponents[selectedChart]}
            </div>
          </div>

          {/* Stock Summary or Cap Summary */}
          {/*Cap Summary*/}
          {selectedChart === "cap" ? (
            <div className="md:w-1/3 w-full grid grid-cols-1 gap-4">
              <div className="bg-white shadow-md rounded-xl p-4 text-center">
                <h3 className="text-lg font-semibold text-[#02327B]">
                  Total Caps
                </h3>
                <p className="text-2xl font-extrabold text-gray-700">
                  {totalCaps}
                </p>
              </div>
              {capStatusSummary.map((entry, idx) => (
                <div
                  key={entry.status}
                  className="bg-white shadow-md rounded-xl p-4 text-center flex flex-col justify-center"
                >
                  <h3 className="text-lg font-semibold text-[#02327B]">
                    {entry.status}
                  </h3>
                  <p
                    className={
                      idx === 0
                        ? "text-green-600 text-2xl font-extrabold mt-1"
                        : idx === 1
                        ? "text-yellow-600 text-2xl font-extrabold mt-1"
                        : "text-red-600 text-2xl font-extrabold mt-1"
                    }
                  >
                    {entry.count}
                  </p>
                </div>
              ))}
            </div>
          ) : selectedChart === "tassel" ||
            selectedChart === "hood" ||
            selectedChart === "gown" ? null : (
            // All Stock Summary
            <div className="md:w-1/3 w-full grid grid-cols-2 md:grid-cols-2 gap-4 mt-0">
              <div className="bg-white shadow-md rounded-xl p-4 text-center col-span-2">
                <h3 className="text-lg font-semibold text-[#02327B]">
                  Total Items
                </h3>
                <p className="text-2xl font-extrabold text-gray-700">
                  {totalItems}
                </p>
              </div>
              {Object.entries(summary.byType).map(([type, count]) => {
                // Filter statuses for this type only
                const typeStatuses = items
                  .filter((item) => item.item_type === type)
                  .reduce((acc, item) => {
                    acc[item.item_status] =
                      (acc[item.item_status] || 0) + (item.quantity || 0);
                    return acc;
                  }, {});
                return (
                  <div
                    key={type}
                    className="bg-white shadow-md rounded-xl p-4 text-center col-span-1 h-full"
                  >
                    <h3 className="text-lg font-semibold text-[#02327B] capitalize">
                      {type}s
                    </h3>
                    <p className="text-xl font-bold text-gray-700">{count}</p>
                    <div className="mt-2 text-xs space-y-1">
                      {Object.entries(typeStatuses).map(
                        ([status, statusCount]) => (
                          <div
                            key={status}
                            className={`flex justify-between ${
                              statusColors[status] || "text-gray-500"
                            }`}
                          >
                            <span>{status}</span>
                            <span className="font-bold">{statusCount}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Chart Label */}
      <h3 className="text-center text-xl font-bold text-[#02327B] mt-8">
        {chartLabels[selectedChart]}
      </h3>
    </div>
  );
};

export default ItemStatus;
