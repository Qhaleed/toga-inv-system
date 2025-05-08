import React, { useEffect, useState } from "react";
import Profile from "../../assets/images/dump.jpg";
import MyChart from "../../components/ui/my-chart";

export function StocksTab() {
  const [totals, setTotals] = useState({ cap: 0, tassel: 0, gown: 0 });

  useEffect(() => {
    fetch("http://localhost:5001/inventory")
      .then((res) => res.json())
      .then((data) => {
        let cap = 0,
          tassel = 0,
          gown = 0;
        data.forEach((item) => {
          if (item.has_cap === 1) cap += 1;
          if (item.tassel_color) tassel += 1;
          if (item.toga_size) gown += 1;
        });
        setTotals({ cap, tassel, gown });
      });
  }, []);

  const totalItems = totals.cap + totals.tassel + totals.gown;

  return (
    <>
      {" "}
      <div className="  left-25 2xl:top-50 lg:top-0 absolute text-xl sm:text-3xl font-bold text-[#0C7E48] mb-2 text-center">
        <span className="opacity-20 hover:opacity-40 cursor-pointer text-black font-semibold">
          {" "}
          Inventory {">"}
        </span>
        <span className="text-[#111240] hover:opacity-70 cursor-pointer">
          {" "}
          Stocks
        </span>
      </div>
      <div className="w-full p-8 flex flex-col items-center">
        <div className="w-full flex flex-col md:flex-row items-center gap-8 justify-center">
          <div className="flex-1 flex flex-col items-center">
            <div className="bg-white rounded-2xl shadow-md flex items-center justify-center min-h-[420px] min-w-[420px] max-w-[520px] w-full mb-4">
              <MyChart />
            </div>
            <span className="text-gray-400 text-sm">
              Inventory Distribution
            </span>
          </div>
          {/* Stock Summary Section */}
          <div className="flex-1 w-full max-w-md grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#E0E7FF] rounded-lg p-6 flex flex-col items-center shadow">
              <span className="text-3xl font-bold text-[#1E40AF]">
                {totalItems}
              </span>
              <span className="text-base text-gray-700 mt-1">Total Items</span>
            </div>
            <div className="bg-[#DCFCE7] rounded-lg p-6 flex flex-col items-center shadow">
              <span className="text-3xl font-bold text-[#15803D]">
                {totals.cap}
              </span>
              <span className="text-base text-gray-700 mt-1">
                Available Cap
              </span>
            </div>
            <div className="bg-[#B6E0FE] rounded-lg p-6 flex flex-col items-center shadow">
              <span className="text-3xl font-bold text-[#2563eb]">
                {totals.tassel}
              </span>
              <span className="text-base text-gray-700 mt-1">
                Available Tassel
              </span>
            </div>
            <div className="bg-[#F3E8FF] rounded-lg p-6 flex flex-col items-center shadow">
              <span className="text-3xl font-bold text-[#b6c2e0]">
                {totals.gown}
              </span>
              <span className="text-base text-gray-700 mt-1">
                Available Gown
              </span>
            </div>
          </div>
        </div>
        {/* Low Stock Alert Section */}
        <div className="w-full max-w-3xl mt-10">
          <h2 className="text-lg font-semibold text-[#B91C1C] mb-2">
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

export function ItemStatusTab() {
  return (
    <div className="w-full p-8 text-center text-xl">Item Status Content</div>
  );
}

export function CheckReturnTab() {
  return (
    <div className="w-full p-8 text-center text-xl">Check Return Content</div>
  );
}

export function ViewDamageTab() {
  return (
    <div className="w-full p-8 text-center text-xl">
      View Damage Items Content
    </div>
  );
}

export function ViewRepairTab() {
  return (
    <div className="w-full p-8 flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-[#0C7E48] mb-2 w-full text-center">
        Repair Items
      </h1>
      <h2 className="text-lg sm:text-xl font-semibold text-[#02327B] mb-4 w-full text-center">
        Track and manage items currently under repair
      </h2>
      <div className="w-full max-w-2xl flex flex-row items-center gap-2 mb-6">
        <input
          type="text"
          placeholder="Search repair items..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0C7E48] text-gray-800"
        />
        <button className="px-4 py-2 rounded-lg bg-[#0C7E48] text-white font-semibold hover:bg-[#15803D] transition-colors">
          Search
        </button>
      </div>
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#0C7E48] text-white">
              <th className="py-3 px-4">Item Name</th>
              <th className="py-3 px-4">Issue</th>
              <th className="py-3 px-4">Date Sent</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="even:bg-[#F3F4F6]">
              <td className="py-2 px-4">Toga - Large</td>
              <td className="py-2 px-4">Torn seam</td>
              <td className="py-2 px-4">2025-05-01</td>
              <td className="py-2 px-4 text-yellow-600 font-semibold">
                In Repair
              </td>
              <td className="py-2 px-4">
                <button className="px-3 py-1 rounded bg-[#F3B51A] text-white font-bold hover:bg-yellow-500 transition-colors text-xs">
                  Mark as Fixed
                </button>
              </td>
            </tr>
            <tr className="even:bg-[#F3F4F6] ">
              <td className="py-2 px-4">Cap - Medium</td>
              <td className="py-2 px-4">Broken strap</td>
              <td className="py-2 px-4">2025-05-03</td>
              <td className="py-2 px-4 text-yellow-600 font-semibold">
                In Repair
              </td>
              <td className="py-2 px-4">
                <button className="px-3 py-1 rounded bg-[#F3B51A] text-white font-bold hover:bg-yellow-500 transition-colors text-xs">
                  Mark as Fixed
                </button>
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
      <button className="mt-8 px-6 py-3 rounded-lg bg-[#0C7E48] text-white font-bold text-lg shadow hover:bg-[#15803D] transition-colors">
        Add Repair Item
      </button>
    </div>
  );
}
