import React, { useEffect, useState } from "react";
import Profile from "../../assets/images/dump.jpg";
import { CarouselPlugin } from "../../components/ui/my-carousel";
import ReturnedAllChart from "@/components/ui/ReturnedAllChart";
import ReturnedCapChart from "@/components/ui/ReturnedCapChart";
import ReturnedGownChart from "@/components/ui/ReturnedGownChart";
import ReturnedHoodChart from "@/components/ui/ReturnedHoodChart";
import ReturnedTasselChart from "@/components/ui/ReturnedTasselChart";
import MissingAllChart from "@/components/ui/MissingAllChart";
import MissingCapChart from "@/components/ui/MissingCapChart";
import MissingGownChart from "@/components/ui/MissingGownChart";
import MissingHoodChart from "@/components/ui/MissingHoodChart";
import MissingTasselChart from "@/components/ui/MissingTasselChart";

const CheckReturn = () => {
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

  // New state for tracking returned items data
  const [returnData, setReturnData] = useState({
    totalReturned: 0,
    totalMissing: 0,
    returnByType: {
      cap: { returned: 0, missing: 0 },
      tassel: { returned: 0, missing: 0 },
      gown: { returned: 0, missing: 0 },
      hood: { returned: 0, missing: 0 },
    },
    // Track returns by variant
    returnByVariant: {
      cap: {},
      tassel: {}, // Colors
      gown: {}, // Sizes
      hood: {}, // Colors
    },
  });

  useEffect(() => {
    console.log("Current totals:", setTotals);
    console.log("Return data:", returnData);
  }, [setTotals, returnData]);

  /*  I DID NOT USE THIS FETCH FOR THE DATA FOR THE CHECK RETURN
   NUMBERS CUZ KAY CLYDE TO, CONTINUE IT NALANG IF EVER OR MODIFY, 
  YUNG MGA GRAPHS/CHARTS MAHAHANAP LANG SA UI FOLDER KASI STATIC
   LANG RIN YUNG DATA DOON*/

  useEffect(() => {
    fetch("http://localhost:5001/items")
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

        // Initialize return data
        let totalReturned = 0;
        let totalMissing = 0;
        let returnByType = {
          cap: { returned: 0, missing: 0 },
          tassel: { returned: 0, missing: 0 },
          gown: { returned: 0, missing: 0 },
          hood: { returned: 0, missing: 0 },
        };

        // Initialize variant tracking for returns
        let returnByVariant = {
          cap: {},
          tassel: {}, // Colors
          gown: {}, // Sizes
          hood: {}, // Colors
        };

        data.forEach((item) => {
          const itemType = item.item_type;
          const variant = item.variant;
          const quantity = item.quantity || 0;
          const returnStatus = item.return_status;

          // Count totals for each item type
          if (itemType === "cap") {
            cap += quantity;
            if (variant) {
              capSizes[variant] = (capSizes[variant] || 0) + quantity;
            }
          } else if (itemType === "tassle" || itemType === "tassel") {
            tassel += quantity;
            if (variant) {
              tasselColors[variant] = (tasselColors[variant] || 0) + quantity;
            }
          } else if (itemType === "gown") {
            gown += quantity;
            if (variant) {
              gownSizes[variant] = (gownSizes[variant] || 0) + quantity;
            }
          } else if (itemType === "hood") {
            hood += quantity;
            if (variant) {
              hoodColors[variant] = (hoodColors[variant] || 0) + quantity;
            }
          }

          // Process return status data
          if (returnStatus === "Returned") {
            totalReturned += quantity;
            if (itemType === "cap") returnByType.cap.returned += quantity;
            else if (itemType === "tassle" || itemType === "tassel")
              returnByType.tassel.returned += quantity;
            else if (itemType === "gown")
              returnByType.gown.returned += quantity;
            else if (itemType === "hood")
              returnByType.hood.returned += quantity;

            // Track returns by variant
            if (variant) {
              if (itemType === "cap") {
                returnByVariant.cap[variant] =
                  (returnByVariant.cap[variant] || 0) + quantity;
              } else if (itemType === "tassle" || itemType === "tassel") {
                returnByVariant.tassel[variant] =
                  (returnByVariant.tassel[variant] || 0) + quantity;
              } else if (itemType === "gown") {
                returnByVariant.gown[variant] =
                  (returnByVariant.gown[variant] || 0) + quantity;
              } else if (itemType === "hood") {
                returnByVariant.hood[variant] =
                  (returnByVariant.hood[variant] || 0) + quantity;
              }
            }
          } else if (returnStatus === "Not Returned") {
            totalMissing += quantity;
            if (itemType === "cap") returnByType.cap.missing += quantity;
            else if (itemType === "tassle" || itemType === "tassel")
              returnByType.tassel.missing += quantity;
            else if (itemType === "gown") returnByType.gown.missing += quantity;
            else if (itemType === "hood") returnByType.hood.missing += quantity;
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

        setReturnData({
          totalReturned,
          totalMissing,
          returnByType,
          returnByVariant,
        });
      })
      .catch((error) => {
        console.error("Error fetching inventory data:", error);
      });
  }, []);

  const [returnToggle, setReturnToggle] = useState(true);
  {
    /*TOGGLE EFFECTS FOR EACH BUTTON*/
  }

  const returnToggler = () => {
    setReturnToggle(true);
  };

  const notreturnToggler = () => {
    setReturnToggle(false);
  };

  let returnedBtn = returnToggle
    ? "bg-[#02327B] text-white h-full w-24 mr-2 rounded-lg font-figtree-medium"
    : "border border-[#02327B] text-[#02327B] h-full w-24 mr-2 rounded-lg font-figtree-medium transition-all duration-500 opacity-70 scale-90 mr-3";

  let notreturnedBtn = !returnToggle
    ? "bg-[#02327B] text-white h-full w-28 mr-2 rounded-lg font-figtree-medium"
    : "border border-[#02327B] text-[#02327B] h-full w-28 mr-2 rounded-lg font-figtree-medium transition-all duration-500 opacity-70 scale-90";

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
    ? "bg-[#02327B] text-white h-full w-24 mr-2 rounded-lg font-figtree-medium"
    : "border border-[#02327B] text-[#02327B] h-full w-24 mr-2 rounded-lg font-figtree-medium transition-all duration-500 opacity-70 scale-90";

  let hoodBtn = hood
    ? "bg-[#02327B] text-white h-full w-24 mr-2 rounded-lg font-figtree-medium"
    : "border border-[#02327B] text-[#02327B] h-full w-24 mr-2 rounded-lg font-figtree-medium transition-all duration-500 opacity-70 scale-90";

  const getButtonClass = (isActive) =>
    isActive
      ? "bg-[#02327B] text-white h-full w-32 rounded-lg font-figtree-medium shadow-md scale-105 transition-all duration-200 hover:bg-[#1e293b] hover:shadow-lg"
      : "border border-[#02327B] text-[#02327B] h-full w-32 rounded-lg font-figtree-medium transition-all duration-200 opacity-80 hover:opacity-100 hover:scale-105 hover:bg-[#e0e7ef] hover:text-[#02327B] hover:shadow-md";

  return (
    <div className="w-full p-6 flex flex-col gap-6">
      {/* Breadcrumb Title (styled like ItemStatus.jsx) */}
      <h2 className="text-2xl font-figtree tracking-tight text-[#1e293b] mb-2 drop-shadow-sm">
        <span className="text-black font-bold">Inventory</span>
        <span className="mx-2 text-gray-400 font-bold">&gt;</span>
        <span className="text-primary">Check Return</span>
        <span className="mx-2 text-gray-400 font-bold">&gt;</span>
        <span className="text-[#2563eb]">
          {all && (returnToggle ? "Returned All" : "Missing All")}
          {cap && (returnToggle ? "Returned Cap" : "Missing Cap")}
          {tassel && (returnToggle ? "Returned Tassel" : "Missing Tassel")}
          {gown && (returnToggle ? "Returned Gown" : "Missing Gown")}
          {hood && (returnToggle ? "Returned Hood" : "Missing Hood")}
        </span>
      </h2>
      {/* Chart Type Selector */}
      <div className="flex flex-wrap justify-center gap-4">
        <button className={getButtonClass(all)} onClick={allToggle}>
          All
        </button>
        <button className={getButtonClass(cap)} onClick={capToggle}>
          Cap
        </button>
        <button className={getButtonClass(tassel)} onClick={tasselToggle}>
          Tassel
        </button>
        <button className={getButtonClass(gown)} onClick={gownToggle}>
          Gown
        </button>
        <button className={getButtonClass(hood)} onClick={hoodToggle}>
          Hood
        </button>
      </div>
      {/* Returned / Not Returned Toggle */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <button
          className={getButtonClass(returnToggle)}
          onClick={returnToggler}
        >
          Returned
        </button>
        <button
          className={getButtonClass(!returnToggle)}
          onClick={notreturnToggler}
        >
          Not Returned
        </button>
      </div>
      {/* Chart and Stock Summary Side by Side */}
      <div className="w-full flex flex-col lg:flex-row justify-center items-start gap-4 mt-6">
        <div className="w-full flex flex-col md:flex-row gap-4 items-stretch overflow-visible">
          {/* Chart */}
          <div className="w-full flex justify-center">
            <div className="bg-white shadow-md rounded-xl p-4 flex flex-col justify-center h-full w-full">
              {returnToggle && all && (
                <ReturnedAllChart returnData={returnData} />
              )}
              {returnToggle && cap && (
                <ReturnedCapChart returnData={returnData} />
              )}
              {returnToggle && tassel && (
                <ReturnedTasselChart returnData={returnData} />
              )}
              {returnToggle && gown && (
                <ReturnedGownChart returnData={returnData} />
              )}
              {returnToggle && hood && (
                <ReturnedHoodChart returnData={returnData} />
              )}
              {!returnToggle && all && (
                <MissingAllChart returnData={returnData} />
              )}
              {!returnToggle && cap && (
                <MissingCapChart returnData={returnData} />
              )}
              {!returnToggle && tassel && (
                <MissingTasselChart returnData={returnData} />
              )}
              {!returnToggle && gown && (
                <MissingGownChart returnData={returnData} />
              )}
              {!returnToggle && hood && (
                <MissingHoodChart returnData={returnData} />
              )}
            </div>
          </div>

          {/* Stock Summary Section (Only for "All") */}
          {all && (
            <div className="md:w-1/3 w-full grid grid-cols-1 gap-4">
              <div className="bg-[#E0E7FF] rounded-lg p-6 flex flex-col items-center shadow">
                <span className="text-3xl font-bold text-[#1E40AF]">
                  {returnToggle
                    ? returnData.totalReturned
                    : returnData.totalMissing}
                </span>
                <span className="text-sm text-gray-700 mt-1">
                  {returnToggle ? "Total Returned Item" : "Total Missing Items"}
                </span>
              </div>
              <div className="bg-[#2563eb] rounded-lg p-7 flex flex-col items-center shadow">
                <span className="text-3xl font-bold text-[#dadada]">
                  {returnToggle
                    ? returnData.returnByType.cap.returned
                    : returnData.returnByType.cap.missing}
                </span>
                <span className="text-sm text-[#dadada] mt-1">
                  {returnToggle ? "Returned Cap" : "Missing Cap"}
                </span>
              </div>
              <div className="bg-[#60a5fa] rounded-lg p-6 flex flex-col items-center shadow">
                <span className="text-3xl font-bold text-[#001d5a]">
                  {returnToggle
                    ? returnData.returnByType.tassel.returned
                    : returnData.returnByType.tassel.missing}
                </span>
                <span className="text-sm text-[#001d5a] mt-1">
                  {returnToggle ? "Returned Tassel" : "Missing Tassel"}
                </span>
                <span className="text-xs text-[#001d5a] mt-1">
                  {Object.entries(
                    returnToggle ? returnData.returnByVariant?.tassel || {} : {}
                  )
                    .map(([color, count]) => `${color}: ${count}`)
                    .join(", ")}
                </span>
              </div>
              <div className="bg-[#b6c2e0] rounded-lg p-6 flex flex-col items-center shadow">
                <span className="text-3xl font-bold text-gray-800">
                  {returnToggle
                    ? returnData.returnByType.gown.returned
                    : returnData.returnByType.gown.missing}
                </span>
                <span className="text-sm text-gray-800 mt-1">
                  {returnToggle ? "Returned Gown" : "Missing Gown"}
                </span>
                <span className="text-xs text-gray-800 mt-1">
                  {Object.entries(
                    returnToggle ? returnData.returnByVariant?.gown || {} : {}
                  )
                    .map(([size, count]) => `${size}: ${count}`)
                    .join(", ")}
                </span>
              </div>
              <div className="bg-[#fbbf24] rounded-lg p-6 flex flex-col items-center shadow">
                <span className="text-3xl font-bold text-black">
                  {returnToggle
                    ? returnData.returnByType.hood.returned
                    : returnData.returnByType.hood.missing}
                </span>
                <span className="text-sm text-black mt-1">
                  {returnToggle ? "Returned Hood" : "Missing Hood"}
                </span>
                <span className="text-xs text-black mt-1">
                  {Object.entries(
                    returnToggle ? returnData.returnByVariant?.hood || {} : {}
                  )
                    .map(([color, count]) => `${color}: ${count}`)
                    .join(", ")}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckReturn;
