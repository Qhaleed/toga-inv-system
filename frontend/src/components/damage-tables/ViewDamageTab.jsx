import React from "react";
import CapDamageTable from "./CapDamageTable";
import GownDamageTable from "./GownDamageTable";
import HoodDamageTable from "./HoodDamageTable";

import TasselDamageTable from "./TasselDamageTable";

export default function ViewDamageTab() {
  // Example data for damaged items with new damage categories
  const capData = [
    {
      category: "Discolored",
      reason: "Cap faded from sun",
      student: "John Doe",
      date: "2025-05-10",
    },
    {
      category: "Others",
      reason: "Broken strap",
      student: "Jane Smith",
      date: "2025-05-12",
    },
  ];
  const gownData = [
    {
      category: "Stained",
      reason: "Coffee stain on sleeve",
      student: "Alice Lee",
      date: "2025-05-11",
    },
    {
      category: "Others",
      reason: "Torn seam",
      student: "Bob Brown",
      date: "2025-05-13",
    },
  ];
  const hoodData = [
    {
      category: "Discolored",
      reason: "Color faded",
      student: "Chris Green",
      date: "2025-05-09",
    },
  ];
  const tasselData = [
    {
      category: "Stained",
      reason: "Ink stain",
      student: "Dana White",
      date: "2025-05-14",
    },
    {
      category: "Others",
      reason: "Frayed ends",
      student: "Eli Black",
      date: "2025-05-15",
    },
  ];

  // Summary for cards
  const summary = [
    {
      label: "Cap",
      count: capData.length,
      color: "bg-blue-200",
      text: "text-blue-900",
      icon: (
        <svg
          className="w-7 h-7 text-blue-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M12 3L2 9l10 6 10-6-10-6zm0 13v5m-7-7v2a2 2 0 002 2h10a2 2 0 002-2v-2" />
        </svg>
      ),
    },
    {
      label: "Gown",
      count: gownData.length,
      color: "bg-gray-200",
      text: "text-gray-800",
      icon: (
        <svg
          className="w-7 h-7 text-gray-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l7 7-7 7-7-7 7-7zm0 14v6m-4-4h8" />
        </svg>
      ),
    },
    {
      label: "Hood",
      count: hoodData.length,
      color: "bg-yellow-100",
      text: "text-yellow-900",
      icon: (
        <svg
          className="w-7 h-7 text-yellow-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12h8" />
        </svg>
      ),
    },
    {
      label: "Tassel",
      count: tasselData.length,
      color: "bg-pink-100",
      text: "text-pink-900",
      icon: (
        <svg
          className="w-7 h-7 text-pink-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M12 2v20m0 0l-4-4m4 4l4-4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full p-8 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-[#02327B] mb-6">
        Damaged Items Overview
      </h2>
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 sm:mt-5 md:mt-0 mt-4 gap-3 px-4 lg:px-6 w-full max-w-6xl mb-8">
        {summary.map((item) => (
          <div
            key={item.label}
            className={`bg-white shadow-xl rounded-2xl flex flex-col items-center p-6 ${item.color}`}
          >
            <div className="flex items-center gap-2 mb-2">
              {item.icon}
              <span className={`text-lg font-bold ${item.text}`}>
                {item.label}
              </span>
            </div>
            <span className={`text-4xl font-black ${item.text}`}>
              {item.count}
            </span>
            <span className="text-xs text-gray-500 mt-1">Total Damaged</span>
          </div>
        ))}
      </div>
      {/* Scalable tables for each category */}
      <div className="w-full max-w-6xl flex flex-col gap-10">
        <CapDamageTable data={capData} />
        <GownDamageTable data={gownData} />
        <HoodDamageTable data={hoodData} />
        <TasselDamageTable data={tasselData} />
      </div>
    </div>
  );
}
