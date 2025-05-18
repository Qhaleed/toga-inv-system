// import React, { useEffect, useState } from "react";
import Profile from "../../assets/images/dump.jpg";
import { CarouselPlugin } from "../../components/ui/my-carousel";

import CapDamageTable from "../../components/damage-tables/CapDamageTable";
import GownDamageTable from "../../components/damage-tables/GownDamageTable";
import HoodDamageTable from "../../components/damage-tables/HoodDamageTable";
import TasselDamageTable from "../../components/damage-tables/TasselDamageTable";
import TasselIcon from "@/assets/icons/tassel.svg?react";
import CapIcon from "@/assets/icons/cap.svg?react";
import GownIcon from "@/assets/icons/gown.svg?react";
import HoodIcon from "@/assets/icons/hood.svg?react";
import {
  capData,
  gownData,
  hoodData,
  tasselData,
} from "../../components/damage-tables/damageData";
import Stocks from "./Stocks";
import ItemStatus from "./ItemStatus";
import CheckReturn from "./CheckReturn";

export function StocksTab() {
  return (
    <>
      <Stocks />
    </>
  );
}

{
  /* ITEM STATUS */
}

export function ItemStatusTab() {
  return (
    <>
      <ItemStatus />
    </>
  );
}

{
  /* CHECK RETURN */
}
export function CheckReturnTab() {
  return (
    <>
      <CheckReturn />
    </>
  );
}

export function ViewDamageTab() {
  const summary = [
    {
      label: "Cap",
      count: capData.length,
      color: "bg-blue-200",
      text: "text-[#2840A1]",
      icon: <CapIcon className="w-7 h-7 text-[#2840A1]" />,
    },
    {
      label: "Gown",
      count: gownData.length,
      color: "bg-gray-200",
      text: "text-[#2840A1]",
      icon: <GownIcon className="w-7 h-7 text-[#2840A1]" />,
    },
    {
      label: "Hood",
      count: hoodData.length,
      color: "bg-yellow-100",
      text: "text-[#2840A1]",
      icon: <HoodIcon className="w-7 h-7 text-[#2840A1]" />,
    },
    {
      label: "Tassel",
      count: tasselData.length,
      color: "bg-pink-100",
      text: "text-[#2840A1]",
      icon: <TasselIcon className="w-7 h-7 text-[#2840A1]" />,
    },
  ];

  return (
    <div className="w-full p-8 pb-20 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-[#02327B] mb-6">
        Damaged Items Overview Nig
      </h2>
      {/* Summary cards  4 boxesd */}
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
      <div className="w-full  flex flex-col gap-8">
        {" "}
        {/* Dito ung designs ng table*/}
        <CapDamageTable />
        <GownDamageTable />
        <HoodDamageTable />
        <TasselDamageTable />
      </div>
    </div>
  );
}

export function ViewRepairTab() {
  return (
    <div className="h-full flex justify-center w-full">
      <h1>DI KO NA TO ICAROUSEL, same ko nalng sa view damage items</h1>
    </div>
  );
}
