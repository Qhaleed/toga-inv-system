import React, { useEffect, useState } from "react";
import Profile from "../../assets/images/dump.jpg";
import StocksAllChart from "../../components/ui/StocksAllChart";
import StocksGownChart from "../../components/ui/StocksGownChart";
import StocksTasselChart from "../../components/ui/StocksTasselChart";
import { CarouselPlugin } from "../../components/ui/my-carousel";
import StocksCapChart from "@/components/ui/StocksCapChart";
import StocksHoodChart from "@/components/ui/StocksHoodChart";

const Stocks = () => {
  const [setTotals] = useState({
    cap: 0,
    tassel: 0,
    gown: 0,
    hood: 0,
    capSizes: {},
    tasselColors: {},
    gownSizes: {},
    hoodColors: {},
  });

  // New state for items data from our API
  const [itemsData, setItemsData] = useState({
    totalItems: 0,
    totalCap: 0,
    totalTassel: 0,
    totalGown: 0,
    totalHood: 0,
    tasselColors: {},
    gownSizes: {},
    hoodColors: {},
    capQuantity: 0,
  });

  // Fetch data from the items endpoint
  useEffect(() => {
    console.log("Fetching items data from API...");
    fetch("http://localhost:5001/items")
      .then((res) => res.json())
      .then((data) => {
        console.log("Raw items data from API:", data);

        // Initialize counters and storage objects
        let totalCap = 0;
        let totalTassel = 0;
        let totalGown = 0;
        let totalHood = 0;

        let tasselColors = {};
        let gownSizes = {};
        let hoodColors = {};
        let capQuantity = 0;
        let totalItems = 0;

        // Process the items according to our actual schema
        data.forEach((item) => {
          // Add to total items count based on quantity
          totalItems += item.quantity || 0;

          // Process based on item_type
          if (item.item_type === "cap") {
            capQuantity += item.quantity || 0;
            totalCap += item.quantity || 0;
          } else if (item.item_type === "tassle" || item.item_type === "tassel") {
            // Handle possible typo in DB
            totalTassel += item.quantity || 0;
            // Group by variant (color)
            if (item.variant) {
              // Convert first letter to uppercase for display consistency
              const color = item.variant.charAt(0).toUpperCase() + item.variant.slice(1);
              tasselColors[color] = (tasselColors[color] || 0) + (item.quantity || 0);
            }
          } else if (item.item_type === "gown") {
            totalGown += item.quantity || 0;
            // Group by variant (size)
            if (item.variant) {
              gownSizes[item.variant] = (gownSizes[item.variant] || 0) + (item.quantity || 0);
            }
          } else if (item.item_type === "hood") {
            totalHood += item.quantity || 0;
            // Group by variant (color)
            if (item.variant) {
              // Convert first letter to uppercase for display consistency
              const color = item.variant.charAt(0).toUpperCase() + item.variant.slice(1);
              hoodColors[color] = (hoodColors[color] || 0) + (item.quantity || 0);
            }
          }
        });

        const processedData = {
          totalItems,
          totalCap,
          totalTassel,
          totalGown,
          totalHood,
          tasselColors,
          gownSizes,
          hoodColors,
          capQuantity,
        };

        console.log("Processed items data:", processedData);
        console.log("Tassel colors breakdown:", tasselColors);
        console.log("Gown sizes breakdown:", gownSizes);
        console.log("Hood colors breakdown:", hoodColors);
        console.log("Cap quantity:", capQuantity);

        setItemsData(processedData);
      })
      .catch((error) => {
        console.error("Error fetching items data:", error);
      });
  }, []);

  // Original inventory fetch for backward compatibility
  useEffect(() => {
    console.log("Fetching inventory data for backward compatibility...");
    fetch("http://localhost:5001/inventory")
      .then((res) => res.json())
      .then((data) => {
        console.log("Inventory data from API:", data);
        let cap = 0,
          tassel = 0,
          gown = 0,
          hood = 0;
        let capSizes = {},
          tasselColors = {},
          gownSizes = {},
          hoodColors = {};
        data.forEach((item) => {
          // Cap: count by size if has_cap is 1 kumbaga true
          if (item.has_cap === 1 && item.toga_size) {
            cap += 1;
            capSizes[item.toga_size] = (capSizes[item.toga_size] || 0) + 1;
          }
          // Tassel: count ng color
          if (item.tassel_color) {
            tassel += 1;
            tasselColors[item.tassel_color] =
              (tasselColors[item.tassel_color] || 0) + 1;
          }
          // Gown: count ng  size
          if (item.toga_size) {
            gown += 1;
            gownSizes[item.toga_size] = (gownSizes[item.toga_size] || 0) + 1;
          }
          // Hood:counter color
          if (item.hood_color) {
            hood += 1;
            hoodColors[item.hood_color] =
              (hoodColors[item.hood_color] || 0) + 1;
          }
        });
        setTotals({
          cap,
          tassel,
          gown,
          hood,
          capSizes,
          tasselColors,
          gownSizes,
          hoodColors,
        });
      })
      .catch((error) => {
        console.error("Error fetching inventory data:", error);
      });
  }, []);

  // Use the itemsData for total count instead of hardcoded value
  // const totalItems = itemsData.totalItems;

  // Log whenever itemsData changes
  useEffect(() => {
    console.log("Current itemsData state:", itemsData);
  }, [itemsData]);

  const [all, setAll] = useState(true);
  const [cap, setCap] = useState(false);
  const [tassel, setTassel] = useState(false);
  const [gown, setGown] = useState(false);
  const [hood, setHood] = useState(false);

  const allToggle = () => {
    setAll(true);
    setCap(false);
    setTassel(false);
    setGown(false);
    setHood(false);
  };

  const capToggle = () => {
    setAll(false);
    setCap(true);
    setTassel(false);
    setGown(false);
    setHood(false);
  };
  const tasselToggle = () => {
    setAll(false);
    setCap(false);
    setTassel(true);
    setGown(false);
    setHood(false);
  };
  const gownToggle = () => {
    setAll(false);
    setCap(false);
    setTassel(false);
    setGown(true);
    setHood(false);
  };
  const hoodToggle = () => {
    setAll(false);
    setCap(false);
    setTassel(false);
    setGown(false);
    setHood(true);
  };

  let allBtn = all
    ? "bg-[#02327B] text-white h-full w-24 mr-2 rounded-lg font-figtree-medium"
    : "border border-[#02327B] text-[#02327B] h-full w-24 mr-2 rounded-lg font-figtree-medium transition-all duration-500 opacity-70 scale-90";

  let capBtn = cap
    ? "bg-[#02327B] text-white h-full w-24 mr-2 rounded-lg font-figtree-medium"
    : "border border-[#02327B] text-[#02327B] h-full w-24 mr-2 rounded-lg font-figtree-medium transition-all duration-500 opacity-70 scale-90";

  let tasselBtn = tassel
    ? "bg-[#02327B] text-white h-full w-24 mr-2 rounded-lg font-figtree-medium"
    : "border border-[#02327B] text-[#02327B] h-full w-24 mr-2 rounded-lg font-figtree-medium transition-all duration-500 opacity-70 scale-90";

  let gownBtn = gown
    ? "bg-[#02327B] text-white h-full w-24 rounded-lg mr-2 font-figtree-medium"
    : "border border-[#02327B] text-[#02327B] h-full w-24 mr-2 rounded-lg font-figtree-medium transition-all duration-500 opacity-70 scale-90";

  let hoodBtn = hood
    ? "bg-[#02327B] text-white h-full w-24 mr-2 rounded-lg font-figtree-medium"
    : "border border-[#02327B] text-[#02327B] h-full w-24 mr-2 rounded-lg font-figtree-medium transition-all duration-500 opacity-70 scale-90";

  return (
    <>
      {" "}
      <div className="  left-15 2xl:top-0 lg:top-0 absolute text-xl sm:text-xl font-bold text-[#0C7E48] mb-2 mt-5 text-center">
        <span className="z-1000 hover:opacity-40 cursor-pointer text-[#001C47] font-semibold">
          {" "}
          Inventory {">"}
        </span>
        <span className="text-[#02327B] hover:opacity-70 cursor-pointer">
          {" "}
          Stocks
        </span>
      </div>
      <div className="w-full relative h-screen p-8 flex flex-col items-center">
        <div className="w-full flex flex-col 2xl:flex-row items-center gap-8 justify-center mt-10 transition-all ease-out duration-300">
          <div className="flex-1 flex flex-col items-center">
            <div className="border border-gray-500 rounded-2xl shadow-lg hidden lg:flex items-center justify-center h-[520px] w-full mb-4 transition-all ease-out duration-300">
              {all && <StocksAllChart />}
              {cap && <StocksCapChart />}
              {tassel && <StocksTasselChart />}
              {gown && <StocksGownChart />}
              {hood && <StocksHoodChart />}
            </div>
            <div className="w-full h-10 flex justify-between items-center mt-5">
              <div className="w-[280px] md:w-[350px] lg:w-[500px] xl:w-[600px] h-10 flex justify-start items-center ml-3 transition-all ease-out duration-300">
                <button className={allBtn} onClick={allToggle}>
                  All
                </button>
                <button className={capBtn} onClick={capToggle}>
                  Cap
                </button>
                <button className={tasselBtn} onClick={tasselToggle}>
                  Tassel
                </button>
                <button className={gownBtn} onClick={gownToggle}>
                  Gown
                </button>
                <button className={hoodBtn} onClick={hoodToggle}>
                  Hood
                </button>
              </div>
              <div className="text-[#02327B] text-xl h-8 flex justify-end items-center border-l-2 border-[#F3B51A] mr-3 w-32">
                <h3 className="pl-3">
                  {all && "All Stocks"}
                  {cap && "Cap Stocks"}
                  {tassel && "Tassel Stocks"}
                  {gown && "Gown Stocks"}
                  {hood && "Hood Stocks"}
                </h3>
              </div>
            </div>
          </div>
          {/* Stock Summary Section */}
          <div className="bg-[#02327B] flex-1 shadow-lg p-15 rounded-3xl w-full min-w-[400px] grid grid-cols-1 sm:grid-cols-2 gap-4 border border-red-500">
            {all && (
              <>
                {" "}
                {/*IF CLICKED ALL*/}
                <div className="bg-[#E0E7FF] rounded-lg p-6 flex flex-col items-center shadow">
                  <span className="text-3xl font-bold text-[#1E40AF]">
                    {itemsData.totalItems} {/*CHANGE VALUE LANG HERE*/}
                  </span>
                  <span className="text-sm text-gray-700 mt-1">
                    Total Items Available
                  </span>
                </div>
                <div className="bg-[#2563eb] rounded-lg p-7 flex flex-col items-center shadow">
                  <span className="text-3xl font-bold text-[#dadada]">
                    {itemsData.totalCap} {/*CHANGE VALUE LANG HERE*/}
                  </span>
                  <span className="text-sm text-[#dadada] mt-1">
                    Total Cap Available
                  </span>
                </div>
                <div className="bg-[#60a5fa] rounded-lg p-6 flex flex-col items-center shadow">
                  <span className="text-3xl font-bold text-[#001d5a]">
                    {itemsData.totalTassel} {/*CHANGE VALUE LANG HERE*/}
                  </span>
                  <span className="text-sm text-[#001d5a] mt-1">
                    Total Tassel Available
                  </span>
                  <span className="text-xs text-[#001d5a] mt-1">
                    {" "}
                    {/*PACHANGE NALANG RIN ETO FOR THE DATA, ITS A SAMPLE LANG KAY CLYDE*/}
                    {Object.entries(itemsData.tasselColors || {})
                      .map(([color, count]) => `${color}: ${count}`)
                      .join(", ")}
                  </span>
                </div>
                <div className="bg-[#b6c2e0] rounded-lg p-6 flex flex-col items-center shadow">
                  <span className="text-3xl font-bold text-gray-800">
                    {itemsData.totalGown} {/*CHANGE VALUE LANG HERE*/}
                  </span>
                  <span className="text-sm text-gray-800 mt-1">
                    Total Gown Available
                  </span>
                  <span className="text-xs text-gray-800 mt-1">
                    {" "}
                    {/*PACHANGE NALANG RIN ETO FOR THE DATA, ITS A SAMPLE LANG KAY CLYDE*/}
                    {Object.entries(itemsData.gownSizes || {})
                      .map(([size, count]) => `${size}: ${count}`)
                      .join(", ")}
                  </span>
                </div>
                <div className="bg-[#fbbf24] rounded-lg p-6 flex flex-col items-center shadow">
                  <span className="text-3xl font-bold text-black">
                    {itemsData.totalHood} {/*CHANGE VALUE LANG HERE*/}
                  </span>
                  <span className="text-sm text-black mt-1">
                    Total Hood Available
                  </span>
                  <span className="text-xs text-black mt-1">
                    {" "}
                    {/*PACHANGE NALANG RIN ETO FOR THE DATA, ITS A SAMPLE LANG KAY CLYDE*/}
                    {Object.entries(itemsData.hoodColors || {})
                      .map(([color, count]) => `${color}: ${count}`)
                      .join(", ")}
                  </span>
                </div>
              </>
            )}
            {cap && (
              <>
                <div className="bg-[#E0E7FF] rounded-lg p-6 flex flex-col items-center shadow">
                  <span className="text-3xl font-bold text-[#1E40AF]">
                    {itemsData.totalCap} {/*CHANGE VALUE LANG HERE*/}
                  </span>
                  <span className="text-sm text-gray-700 mt-1">
                    Total Cap Available
                  </span>
                </div>
              </>
            )}
            {tassel && (
              <>
                {" "}
                {/*IF CLICKED ALL*/}
                <div className="bg-[#E0E7FF] rounded-lg p-6 flex flex-col items-center shadow">
                  <span className="text-3xl font-bold text-[#1E40AF]">
                    {itemsData.totalTassel} {/*CHANGE VALUE LANG HERE*/}
                  </span>
                  <span className="text-sm text-gray-700 mt-1">
                    Total Tassel Available
                  </span>
                </div>
                <div className="bg-[#2563eb] rounded-lg p-7 flex flex-col items-center shadow">
                  <span className="text-3xl font-bold text-[#dadada]">
                    {itemsData.tasselColors["Blue"] || 0} {/*CHANGE VALUE LANG HERE*/}
                  </span>
                  <span className="text-sm text-[#dadada] mt-1">Blue</span>
                </div>
                <div className="bg-[#60a5fa] rounded-lg p-6 flex flex-col items-center shadow">
                  <span className="text-3xl font-bold text-[#001d5a]">
                    {itemsData.tasselColors["Maroon"] || 0} {/*CHANGE VALUE LANG HERE*/}
                  </span>
                  <span className="text-sm text-[#001d5a] mt-1">Maroon</span>
                </div>
                <div className="bg-[#b6c2e0] rounded-lg p-6 flex flex-col items-center shadow">
                  <span className="text-3xl font-bold text-gray-800">
                    {itemsData.tasselColors["Orange"] || 0} {/*CHANGE VALUE LANG HERE*/}
                  </span>
                  <span className="text-sm text-gray-800 mt-1">Orange</span>
                </div>
                <div className="bg-[#fbbf24] rounded-lg p-6 flex flex-col items-center shadow">
                  <span className="text-3xl font-bold text-black">
                    {itemsData.tasselColors["White"] || 0} {/*CHANGE VALUE LANG HERE*/}
                  </span>
                  <span className="text-sm text-black mt-1">White</span>
                </div>
                <div className="bg-[#60a5fa] rounded-lg p-6 flex flex-col items-center shadow">
                  <span className="text-3xl font-bold text-black">
                    {itemsData.tasselColors["Yellow"] || 0} {/*CHANGE VALUE LANG HERE*/}
                  </span>
                  <span className="text-sm text-black mt-1">Yellow</span>
                </div>
              </>
            )}
            {gown && (
              <>
                {" "}
                {/*IF CLICKED ALL*/}
                <div className="bg-[#E0E7FF] rounded-lg p-6 flex flex-col items-center shadow">
                  <span className="text-3xl font-bold text-[#1E40AF]">
                    {itemsData.totalGown} {/*CHANGE VALUE LANG HERE*/}
                  </span>
                  <span className="text-sm text-gray-700 mt-1">
                    Total Gown Available
                  </span>
                </div>
                <div className="bg-[#2563eb] rounded-lg p-7 flex flex-col items-center shadow">
                  <span className="text-3xl font-bold text-[#dadada]">
                    {itemsData.gownSizes["XS"] || 0} {/*CHANGE VALUE LANG HERE*/}
                  </span>
                  <span className="text-sm text-[#dadada] mt-1">XS</span>
                </div>
                <div className="bg-[#60a5fa] rounded-lg p-6 flex flex-col items-center shadow">
                  <span className="text-3xl font-bold text-[#001d5a]">
                    {itemsData.gownSizes["S"] || 0} {/*CHANGE VALUE LANG HERE*/}
                  </span>
                  <span className="text-sm text-[#001d5a] mt-1">S</span>
                </div>
                <div className="bg-[#4f89cf] rounded-lg p-6 flex flex-col items-center shadow">
                  <span className="text-3xl font-bold text-[#001d5a]">
                    {itemsData.gownSizes["M"] || 0} {/*CHANGE VALUE LANG HERE*/}
                  </span>
                  <span className="text-sm text-[#001d5a] mt-1">M</span>
                </div>
                <div className="bg-[#b6c2e0] rounded-lg p-6 flex flex-col items-center shadow">
                  <span className="text-3xl font-bold text-gray-800">
                    {itemsData.gownSizes["L"] || 0} {/*CHANGE VALUE LANG HERE*/}
                  </span>
                  <span className="text-sm text-gray-800 mt-1">L</span>
                </div>
                <div className="bg-[#fbbf24] rounded-lg p-6 flex flex-col items-center shadow">
                  <span className="text-3xl font-bold text-black">
                    {itemsData.gownSizes["XL"] || 0} {/*CHANGE VALUE LANG HERE*/}
                  </span>
                  <span className="text-sm text-black mt-1">XL</span>
                </div>
                <div className="bg-[#60a5fa] rounded-lg p-6 flex flex-col items-center shadow">
                  <span className="text-3xl font-bold text-black">
                    {itemsData.gownSizes["2XL"] || 0} {/*CHANGE VALUE LANG HERE*/}
                  </span>
                  <span className="text-sm text-black mt-1">2XL</span>
                </div>
                <div className="bg-[#2563eb] rounded-lg p-6 flex flex-col items-center shadow">
                  <span className="text-3xl font-bold text-[#dadada]">
                    {itemsData.gownSizes["3XL"] || 0} {/*CHANGE VALUE LANG HERE*/}
                  </span>
                  <span className="text-sm text-[#dadada] mt-1">3XL</span>
                </div>
              </>
            )}
            {hood && (
              <>
                {" "}
                {/*IF CLICKED ALL*/}
                <div className="bg-[#E0E7FF] rounded-lg p-6 flex flex-col items-center shadow">
                  <span className="text-3xl font-bold text-[#1E40AF]">
                    {itemsData.totalHood} {/*CHANGE VALUE LANG HERE*/}
                  </span>
                  <span className="text-sm text-gray-700 mt-1">
                    Total Hood Available
                  </span>
                </div>
                <div className="bg-[#2563eb] rounded-lg p-7 flex flex-col items-center shadow">
                  <span className="text-3xl font-bold text-[#dadada]">
                    {itemsData.hoodColors["Blue"] || 0} {/*CHANGE VALUE LANG HERE*/}
                  </span>
                  <span className="text-sm text-[#dadada] mt-1">Blue</span>
                </div>
                <div className="bg-[#60a5fa] rounded-lg p-6 flex flex-col items-center shadow">
                  <span className="text-3xl font-bold text-[#001d5a]">
                    {itemsData.hoodColors["Maroon"] || 0} {/*CHANGE VALUE LANG HERE*/}
                  </span>
                  <span className="text-sm text-[#001d5a] mt-1">Maroon</span>
                </div>
                <div className="bg-[#b6c2e0] rounded-lg p-6 flex flex-col items-center shadow">
                  <span className="text-3xl font-bold text-gray-800">
                    {itemsData.hoodColors["Orange"] || 0} {/*CHANGE VALUE LANG HERE*/}
                  </span>
                  <span className="text-sm text-gray-800 mt-1">Orange</span>
                </div>
                <div className="bg-[#fbbf24] rounded-lg p-6 flex flex-col items-center shadow">
                  <span className="text-3xl font-bold text-black">
                    {itemsData.hoodColors["White"] || 0} {/*CHANGE VALUE LANG HERE*/}
                  </span>
                  <span className="text-sm text-black mt-1">White</span>
                </div>
                <div className="bg-[#60a5fa] rounded-lg p-6 flex flex-col items-center shadow">
                  <span className="text-3xl font-bold text-black">
                    {itemsData.hoodColors["Yellow"] || 0} {/*CHANGE VALUE LANG HERE*/}
                  </span>
                  <span className="text-sm text-black mt-1">Yellow</span>
                </div>
              </>
            )}
          </div>
        </div>
        {/* Low Stock Alert Section */}
        <div className=" absolute bottom-0 w-full max-w-3xl mt-10 hidden">
          <h2 className="text-lg font-semibold text-[#ffffff] mb-2">
            Low Stock Alerts
          </h2>
          <div className="bg-[#FFF3CD] border-l-4 border-[#B91C1C] text-[#B91C1C] p-2 rounded flex items-center gap-3">
            <svg
              className="w-6 h-6 text-[#B91C1C]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>
              Some items are running low! Please review your stock levels and
              reorder as needed.
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stocks;
