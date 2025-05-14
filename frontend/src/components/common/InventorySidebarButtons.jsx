import React from "react";

const buttonConfigs = [
  {
    key: "stocks",
    label: "Stocks",
    bg: "bg-[#E0E7FF]",
    text: "text-[#1E40AF]",
  },
  {
    key: "itemstatus",
    label: "Item Status",
    bg: "bg-[#FECACA]",
    text: "text-[#B91C1C]",
  },
  {
    key: "checkreturn",
    label: "Check Return",
    bg: "bg-[#FDE68A]",
    text: "text-[#B45309]",
  },
  {
    key: "viewdamage",
    label: "View Damage Items",
    bg: "bg-[#C7D2FE]",
    text: "text-[#3730A3]",
  },
  {
    key: "viewrepair",
    label: "View Repair Items",
    bg: "bg-[#DCFCE7]",
    text: "text-[#15803D]",
  },
];

export default function InventorySidebarButtons({
  focusedStatus,
  setFocusedStatus,
}) {
  return (
    <div className="w-full h-fill md:scale-100 flex flex-col gap-4 px-3 py-2">
      {buttonConfigs.map((btn) => (
        <button
          key={btn.key}
          className={`w-full h-fit rounded-xl flex justify-center items-center ${
            btn.bg
          } ${btn.text} font-bold text-md transition-all duration-300 ${
            focusedStatus === btn.key
              ? "ring-2 ring-[#3645efbd] scale-105"
              : "hover:scale-105"
          }`}
          onClick={() => setFocusedStatus(btn.key)}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
}
