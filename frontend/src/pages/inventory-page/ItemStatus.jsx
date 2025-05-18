import React, { useEffect, useState } from "react";
import { CarouselPlugin } from "../../components/ui/my-carousel";
import Profile from "../../assets/images/dump.jpg";
import ItemStatusAllChart from "@/components/ui/ItemStatusAllChart";
import ItemStatusCapChart from "@/components/ui/ItemStatusCapChart";
import ItemStatusTasselChart from "@/components/ui/ItemStatusTasselChart";
import ItemStatusGownChart from "@/components/ui/ItemStatusGownChart";
import ItemStatusHoodChart from "@/components/ui/ItemStatusHoodChart";

const ItemStatus = () => {
  // Original totals state for backward compatibility
  const [totals, setTotals] = useState({
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
    statusBreakdown: {
      inGoodCondition: 0,
      forRepair: 0,
      damaged: 0,
    },
    returnStatusBreakdown: {
      returned: 0,
      notReturned: 0,
      na: 0,
    }
  });

  // Fetch data from the items endpoint
  useEffect(() => {
    console.log("Fetching items data for ItemStatus...");
    fetch("http://localhost:5001/items")
      .then((res) => res.json())
      .then((data) => {
        console.log("Raw items data from API:", data);

        // Initialize counters and storage objects
        let totalCap = 0;
        let totalTassel = 0;
        let totalGown = 0;
        let totalHood = 0;
        let totalItems = 0;

        let tasselColors = {};
        let gownSizes = {};
        let hoodColors = {};

        // Status tracking
        let inGoodCondition = 0;
        let forRepair = 0;
        let damaged = 0;

        // Return status tracking
        let returned = 0;
        let notReturned = 0;
        let na = 0;

        // Status tracking by item type
        let capStatus = { inGoodCondition: 0, forRepair: 0, damaged: 0 };
        let tasselStatus = { inGoodCondition: 0, forRepair: 0, damaged: 0 };
        let gownStatus = { inGoodCondition: 0, forRepair: 0, damaged: 0 };
        let hoodStatus = { inGoodCondition: 0, forRepair: 0, damaged: 0 };

        // Process the items according to our actual schema
        data.forEach((item) => {
          // Add to total items count based on quantity
          const itemQuantity = item.quantity || 0;
          totalItems += itemQuantity;

          // Track status counts
          if (item.item_status === "In Good Condition") {
            inGoodCondition += itemQuantity;
          } else if (item.item_status === "For Repair") {
            forRepair += itemQuantity;
          } else if (item.item_status === "Damaged") {
            damaged += itemQuantity;
          }

          // Track return status
          if (item.return_status === "Returned") {
            returned += itemQuantity;
          } else if (item.return_status === "Not Returned") {
            notReturned += itemQuantity;
          } else { // N/A or other values
            na += itemQuantity;
          }

          // Process based on item_type
          if (item.item_type === "cap") {
            totalCap += itemQuantity;

            // Track cap status
            if (item.item_status === "In Good Condition") {
              capStatus.inGoodCondition += itemQuantity;
            } else if (item.item_status === "For Repair") {
              capStatus.forRepair += itemQuantity;
            } else if (item.item_status === "Damaged") {
              capStatus.damaged += itemQuantity;
            }
          }
          else if (item.item_type === "tassle" || item.item_type === "tassel") { // Handle possible typo in DB
            totalTassel += itemQuantity;

            // Track tassel status
            if (item.item_status === "In Good Condition") {
              tasselStatus.inGoodCondition += itemQuantity;
            } else if (item.item_status === "For Repair") {
              tasselStatus.forRepair += itemQuantity;
            } else if (item.item_status === "Damaged") {
              tasselStatus.damaged += itemQuantity;
            }

            // Group by variant (color)
            if (item.variant) {
              // Convert first letter to uppercase for display consistency
              const color = item.variant.charAt(0).toUpperCase() + item.variant.slice(1);
              tasselColors[color] = (tasselColors[color] || 0) + itemQuantity;
            }
          }
          else if (item.item_type === "gown") {
            totalGown += itemQuantity;

            // Track gown status
            if (item.item_status === "In Good Condition") {
              gownStatus.inGoodCondition += itemQuantity;
            } else if (item.item_status === "For Repair") {
              gownStatus.forRepair += itemQuantity;
            } else if (item.item_status === "Damaged") {
              gownStatus.damaged += itemQuantity;
            }

            // Group by variant (size)
            if (item.variant) {
              gownSizes[item.variant] = (gownSizes[item.variant] || 0) + itemQuantity;
            }
          }
          else if (item.item_type === "hood") {
            totalHood += itemQuantity;

            // Track hood status
            if (item.item_status === "In Good Condition") {
              hoodStatus.inGoodCondition += itemQuantity;
            } else if (item.item_status === "For Repair") {
              hoodStatus.forRepair += itemQuantity;
            } else if (item.item_status === "Damaged") {
              hoodStatus.damaged += itemQuantity;
            }

            // Group by variant (color)
            if (item.variant) {
              // Convert first letter to uppercase for display consistency
              const color = item.variant.charAt(0).toUpperCase() + item.variant.slice(1);
              hoodColors[color] = (hoodColors[color] || 0) + itemQuantity;
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
          statusBreakdown: {
            inGoodCondition,
            forRepair,
            damaged
          },
          returnStatusBreakdown: {
            returned,
            notReturned,
            na
          },
          capStatus,
          tasselStatus,
          gownStatus,
          hoodStatus
        };

        console.log("Processed items data:", processedData);
        setItemsData(processedData);

        // Also update the original totals state for backward compatibility
        setTotals({
          cap: totalCap,
          tassel: totalTassel,
          gown: totalGown,
          hood: totalHood,
          capSizes: {}, // We don't have cap sizes in new schema
          tasselColors: tasselColors,
          gownSizes: gownSizes,
          hoodColors: hoodColors,
        });
      })
      .catch((error) => {
        console.error("Error fetching items data:", error);
      });
  }, []);

  // Original inventory fetch for backward compatibility
  useEffect(() => {
    fetch("http://localhost:5001/inventory")
      .then((res) => res.json())
      .then((data) => {
        let cap = 0,
          tassel = 0,
          gown = 0,
          hood = 0;
        let capSizes = {},
          tasselColors = {},
          gownSizes = {},
          hoodColors = {};
        data.forEach((item) => {
          // Cap: count by size if has_cap is 1
          if (item.has_cap === 1 && item.toga_size) {
            cap += 1;
            capSizes[item.toga_size] = (capSizes[item.toga_size] || 0) + 1;
          }
          // Tassel: count by color
          if (item.tassel_color) {
            tassel += 1;
            tasselColors[item.tassel_color] =
              (tasselColors[item.tassel_color] || 0) + 1;
          }
          // Gown: count by size
          if (item.toga_size) {
            gown += 1;
            gownSizes[item.toga_size] = (gownSizes[item.toga_size] || 0) + 1;
          }
          // Hood: count by color
          if (item.hood_color) {
            hood += 1;
            hoodColors[item.hood_color] =
              (hoodColors[item.hood_color] || 0) + 1;
          }
        });
        // Only set totals if we didn't already get data from the items API
        if (itemsData.totalItems === 0) {
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
        }
      })
      .catch(error => {
        console.error("Error fetching inventory data:", error);
      });
  }, [itemsData.totalItems]);

  // Use itemsData or fall back to original calculation
  const totalItems = itemsData.totalItems || (totals.cap + totals.tassel + totals.gown + totals.hood);

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
    ? "bg-[#02327B] text-white h-full w-32 rounded-lg font-figtree-medium"
    : "border border-[#02327B] text-[#02327B] h-full w-32 rounded-lg font-figtree-medium transition-all duration-500 opacity-70 scale-90";

  let capBtn = cap
    ? "bg-[#02327B] text-white h-full w-32 rounded-lg font-figtree-medium"
    : "border border-[#02327B] text-[#02327B] h-full w-32 rounded-lg font-figtree-medium transition-all duration-500 opacity-70 scale-90";

  let tasselBtn = tassel
    ? "bg-[#02327B] text-white h-full w-32 rounded-lg font-figtree-medium"
    : "border border-[#02327B] text-[#02327B] h-full w-32 rounded-lg font-figtree-medium transition-all duration-500 opacity-70 scale-90";

  let gownBtn = gown
    ? "bg-[#02327B] text-white h-full w-32 rounded-lg font-figtree-medium"
    : "border border-[#02327B] text-[#02327B] h-full w-32 rounded-lg font-figtree-medium transition-all duration-500 opacity-70 scale-90";

  let hoodBtn = hood
    ? "bg-[#02327B] text-white h-full w-32 rounded-lg font-figtree-medium"
    : "border border-[#02327B] text-[#02327B] h-full w-32 rounded-lg font-figtree-medium transition-all duration-500 opacity-70 scale-90";
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
          Item Status
        </span>
      </div>
      <div className="w-full relative h-screen p-8 flex flex-col items-center">
        <div className="w-full flex flex-col md:flex-row items-center gap-8 justify-center mt-5">

          <div className="flex-1 flex flex-col items-start">
            <div className="border border-gray-500 rounded-2xl shadow-lg flex items-center justify-center min-h-[420px] min-w-[600px] max-w-700px] w-full mb-4">
              {all && <ItemStatusAllChart />}
              {cap && <ItemStatusCapChart />}
              {tassel && <ItemStatusTasselChart />}
              {gown && <ItemStatusGownChart />}
              {hood && <ItemStatusHoodChart />}
            </div>
            <div className="w-full h-10 flex justify-between items-center">
              <div className="w-[700px] h-10 flex justify-between items-center ml-3">
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
              <div className="text-[#02327B] text-xl h-8 flex justify-end items-center border-l-2 border-[#F3B51A] mr-3">
                <h3 className="pl-3">
                  {all && "All Item Status"}
                  {cap && "Cap Status"}
                  {tassel && "Tassel Status"}
                  {gown && "Gown Status"}
                  {hood && "Hood Status"}
                </h3>
              </div>
            </div>
          </div>
          {/* Stock Summary Section */}

          <div className="bg-[#02327B] flex-1 shadow-lg p-15 rounded-3xl w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-4">
            {all && (
              <>

                {/* Total Item Status */}
                <div className="bg-[#E0E7FF] rounded-lg p-6 flex flex-col items-center shadow">
                  <span className="text-3xl font-bold text-[#1E40AF]">
                    {totalItems}
                  </span>
                  <span className="text-sm text-gray-700 mt-1">
                    Total Item Status
                  </span>
                  <div className="flex justify-between w-full mt-1">
                    <div className="text-center">
                      <span className="text-xs">In Good Condition: {itemsData.statusBreakdown?.inGoodCondition || 0}</span>
                    </div>
                  </div>
                  <div className="flex justify-between w-full mt-1">
                    <div className="text-center">
                      <span className="text-xs">For Repair: {itemsData.statusBreakdown?.forRepair || 0}</span>
                    </div>
                  </div>
                  <div className="flex justify-between w-full mt-1">
                    <div className="text-center">
                      <span className="text-xs">Damaged: {itemsData.statusBreakdown?.damaged || 0}</span>
                    </div>
                  </div>
                </div>

                {/* Cap Status */}
                <div className="bg-[#2563eb] rounded-lg p-6 flex flex-col items-center shadow">
                  <span className="text-3xl font-bold text-[#dadada]">
                    {itemsData.totalCap || totals.cap}
                  </span>
                  <span className="text-sm text-[#dadada] mt-1">
                    Cap Status
                  </span>
                  <div className="flex justify-between w-full mt-1">
                    <div className="text-center">
                      <span className="text-xs text-[#dadada]">In Good Condition: {itemsData.capStatus?.inGoodCondition || 0}</span>
                    </div>
                  </div>
                  <div className="flex justify-between w-full mt-1">
                    <div className="text-center">
                      <span className="text-xs text-[#dadada]">For Repair: {itemsData.capStatus?.forRepair || 0}</span>
                    </div>
                  </div>
                  <div className="flex justify-between w-full mt-1">
                    <div className="text-center">
                      <span className="text-xs text-[#dadada]">Damaged: {itemsData.capStatus?.damaged || 0}</span>
                    </div>
                  </div>
                </div>

                {/* Tassel Status */}
                <div className="bg-[#60a5fa] rounded-lg p-6 flex flex-col items-center shadow">
                  <span className="text-3xl font-bold text-[#001d5a]">
                    {itemsData.totalTassel || totals.tassel}
                  </span>
                  <span className="text-base text-[#001d5a] mt-1">
                    Tassel Status
                  </span>
                  <div className="flex justify-between w-full mt-1">
                    <div className="text-center">
                      <span className="text-xs text-[#001d5a]">In Good Condition: {itemsData.tasselStatus?.inGoodCondition || 0}</span>
                    </div>
                  </div>
                  <div className="flex justify-between w-full mt-1">
                    <div className="text-center">
                      <span className="text-xs text-[#001d5a]">For Repair: {itemsData.tasselStatus?.forRepair || 0}</span>
                    </div>
                  </div>
                  <div className="flex justify-between w-full mt-1">
                    <div className="text-center">
                      <span className="text-xs text-[#001d5a]">Damaged: {itemsData.tasselStatus?.damaged || 0}</span>
                    </div>
                  </div>
                </div>

                {/* Gown Status */}
                <div className="bg-[#b6c2e0] rounded-lg p-6 flex flex-col items-center shadow">
                  <span className="text-3xl font-bold text-gray-800">
                    {itemsData.totalGown || totals.gown}
                  </span>
                  <span className="text-base text-gray-800 mt-1">
                    Gown Status
                  </span>
                  <div className="flex justify-between w-full mt-1">
                    <div className="text-center">
                      <span className="text-xs text-gray-800">In Good Condition: {itemsData.gownStatus?.inGoodCondition || 0}</span>
                    </div>
                  </div>
                  <div className="flex justify-between w-full mt-1">
                    <div className="text-center">
                      <span className="text-xs text-gray-800">For Repair: {itemsData.gownStatus?.forRepair || 0}</span>
                    </div>
                  </div>
                  <div className="flex justify-between w-full mt-1">
                    <div className="text-center">
                      <span className="text-xs text-gray-800">Damaged: {itemsData.gownStatus?.damaged || 0}</span>
                    </div>
                  </div>
                </div>

                {/* Hood Status */}
                <div className="bg-[#fbbf24] rounded-lg p-6 flex flex-col items-center shadow">
                  <span className="text-3xl font-bold text-black">
                    {itemsData.totalHood || totals.hood}
                  </span>
                  <span className="text-base text-black mt-1">
                    Hood Status
                  </span>
                  <div className="flex justify-between w-full mt-1">
                    <div className="text-center">
                      <span className="text-xs text-black">In Good Condition: {itemsData.hoodStatus?.inGoodCondition || 0}</span>
                    </div>
                  </div>
                  <div className="flex justify-between w-full mt-1">
                    <div className="text-center">
                      <span className="text-xs text-black">For Repair: {itemsData.hoodStatus?.forRepair || 0}</span>
                    </div>
                  </div>
                  <div className="flex justify-between w-full mt-1">
                    <div className="text-center">
                      <span className="text-xs text-black">Damaged: {itemsData.hoodStatus?.damaged || 0}</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {cap && (
              <>
                <div className="bg-[#E0E7FF] rounded-lg p-6 flex flex-col items-center shadow col-span-2">
                  <span className="text-3xl font-bold text-[#1E40AF]">
                    {itemsData.totalCap || totals.cap}
                  </span>
                  <span className="text-sm text-gray-700 mt-1">
                    Cap Status
                  </span>
                  <div className="flex justify-between w-full mt-1">
                    <div className="text-center w-full">
                      <span className="text-xs font-semibold">In Good Condition: {itemsData.capStatus?.inGoodCondition || 0}</span>
                    </div>
                  </div>
                  <div className="flex justify-between w-full mt-1">
                    <div className="text-center w-full">
                      <span className="text-xs font-semibold">For Repair: {itemsData.capStatus?.forRepair || 0}</span>
                    </div>
                  </div>
                  <div className="flex justify-between w-full mt-1">
                    <div className="text-center w-full">
                      <span className="text-xs font-semibold">Damaged: {itemsData.capStatus?.damaged || 0}</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {tassel && (
              <>
                <div className="bg-[#E0E7FF] rounded-lg p-6 flex flex-col items-center shadow col-span-2">
                  <span className="text-3xl font-bold text-[#1E40AF]">
                    {itemsData.totalTassel || totals.tassel}
                  </span>
                  <span className="text-sm text-gray-700 mt-1">
                    Tassel Status
                  </span>
                  <div className="flex justify-between w-full mt-1">
                    <div className="text-center w-full">
                      <span className="text-xs font-semibold">In Good Condition: {itemsData.tasselStatus?.inGoodCondition || 0}</span>
                    </div>
                  </div>
                  <div className="flex justify-between w-full mt-1">
                    <div className="text-center w-full">
                      <span className="text-xs font-semibold">For Repair: {itemsData.tasselStatus?.forRepair || 0}</span>
                    </div>
                  </div>
                  <div className="flex justify-between w-full mt-1">
                    <div className="text-center w-full">
                      <span className="text-xs font-semibold">Damaged: {itemsData.tasselStatus?.damaged || 0}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-700 mt-1">
                    {Object.entries(itemsData.tasselColors || totals.tasselColors || {})
                      .map(([color, count]) => `${color}: ${count}`)
                      .join(", ")}
                  </span>
                </div>
              </>
            )}

            {gown && (
              <>
                <div className="bg-[#E0E7FF] rounded-lg p-6 flex flex-col items-center shadow col-span-2">
                  <span className="text-3xl font-bold text-[#1E40AF]">
                    {itemsData.totalGown || totals.gown}
                  </span>
                  <span className="text-sm text-gray-700 mt-1">
                    Gown Status
                  </span>
                  <div className="flex justify-between w-full mt-1">
                    <div className="text-center w-full">
                      <span className="text-xs font-semibold">In Good Condition: {itemsData.gownStatus?.inGoodCondition || 0}</span>
                    </div>
                  </div>
                  <div className="flex justify-between w-full mt-1">
                    <div className="text-center w-full">
                      <span className="text-xs font-semibold">For Repair: {itemsData.gownStatus?.forRepair || 0}</span>
                    </div>
                  </div>
                  <div className="flex justify-between w-full mt-1">
                    <div className="text-center w-full">
                      <span className="text-xs font-semibold">Damaged: {itemsData.gownStatus?.damaged || 0}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-700 mt-1">
                    {Object.entries(itemsData.gownSizes || totals.gownSizes || {})
                      .map(([size, count]) => `${size}: ${count}`)
                      .join(", ")}
                  </span>
                </div>
              </>
            )}

            {hood && (
              <>
                <div className="bg-[#E0E7FF] rounded-lg p-6 flex flex-col items-center shadow col-span-2">
                  <span className="text-3xl font-bold text-[#1E40AF]">
                    {itemsData.totalHood || totals.hood}
                  </span>
                  <span className="text-sm text-gray-700 mt-1">
                    Hood Status
                  </span>
                  <div className="flex justify-between w-full mt-1">
                    <div className="text-center w-full">
                      <span className="text-xs font-semibold">In Good Condition: {itemsData.hoodStatus?.inGoodCondition || 0}</span>
                    </div>
                  </div>
                  <div className="flex justify-between w-full mt-1">
                    <div className="text-center w-full">
                      <span className="text-xs font-semibold">For Repair: {itemsData.hoodStatus?.forRepair || 0}</span>
                    </div>
                  </div>
                  <div className="flex justify-between w-full mt-1">
                    <div className="text-center w-full">
                      <span className="text-xs font-semibold">Damaged: {itemsData.hoodStatus?.damaged || 0}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-700 mt-1">
                    {Object.entries(itemsData.hoodColors || totals.hoodColors || {})
                      .map(([color, count]) => `${color}: ${count}`)
                      .join(", ")}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemStatus;