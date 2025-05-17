import React, { useEffect, useState } from "react";
import { CarouselPlugin } from "../../components/ui/my-carousel";
import Profile from "../../assets/images/dump.jpg";
import ItemStatusAllChart from "@/components/ui/ItemStatusAllChart";

const ItemStatus = () => {
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
          });
      }, []);
    
      const totalItems = totals.cap + totals.tassel + totals.gown + totals.hood;
    
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
              <div className="bg-[#02327B] flex-1 shadow-lg p-15 rounded-3xl w-full max-w-md grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#E0E7FF] rounded-lg p-6 flex flex-col items-center shadow">
                  <span className="text-3xl font-bold text-[#1E40AF]">
                    {totalItems}
                  </span>
                  <span className="text-sm text-gray-700 mt-1">
                    Total Item Status
                  </span>
                </div>
    
                {/* Add more stock summary items here */}
                <div className="bg-[#2563eb] rounded-lg p-7 flex flex-col items-center shadow">
                  <span className="text-3xl font-bold text-[#dadada]">
                    {totals.cap}
                  </span>
                  <span className="text-sm text-[#dadada] mt-1">
                    Cap Status
                  </span>
                </div>
                <div className="bg-[#60a5fa] rounded-lg p-6 flex flex-col items-center shadow">
                  <span className="text-3xl font-bold text-[#001d5a]">
                    {totals.tassel}
                  </span>
                  <span className="text-base text-[#001d5a] mt-1">
                    Tassel Status
                  </span>
                  <span className="text-xs text-[#001d5a] mt-1">
                    {Object.entries(totals.tasselColors || {})
                      .map(([color, count]) => `${color}: ${count}`)
                      .join(", ")}
                  </span>
                </div>
                <div className="bg-[#b6c2e0] rounded-lg p-6 flex flex-col items-center shadow">
                  <span className="text-3xl font-bold text-gray-800">
                    {totals.gown}
                  </span>
                  <span className="text-base text-gray-800 mt-1">
                    Gown Status
                  </span>
                  <span className="text-xs text-gray-800 mt-1">
                    {Object.entries(totals.gownSizes || {})
                      .map(([size, count]) => `${size}: ${count}`)
                      .join(", ")}
                  </span>
                </div>
                <div className="bg-[#fbbf24] rounded-lg p-6 flex flex-col items-center shadow">
                  <span className="text-3xl font-bold text-black">
                    {totals.hood}
                  </span>
                  <span className="text-base text-black mt-1">
                    Hood Status
                  </span>
                  <span className="text-xs text-black mt-1">
                    {Object.entries(totals.hoodColors || {})
                      .map(([color, count]) => `${color}: ${count}`)
                      .join(", ")}
                  </span>
                </div>
              </div>
            </div>
            {/* Low Stock Alert Section */}
            <div className=" absolute  bottom-0 w-full max-w-3xl mt-10">
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
}
 
export default ItemStatus;