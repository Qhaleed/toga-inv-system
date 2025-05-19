// import React, { useEffect, useState } from "react";
import React, { useState, useEffect } from "react";
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
  const [damageData, setDamageData] = useState({
    capData: [],
    gownData: [],
    hoodData: [],
    tasselData: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDamageData = async () => {
      setIsLoading(true);
      try {
        // Fetch evaluation data from backend
        const response = await fetch("http://localhost:5001/evaluation");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Process and categorize damaged items
        const capItems = [];
        const gownItems = [];
        const hoodItems = [];
        const tasselItems = [];

        data.forEach(item => {
          // Only process items that have been evaluated
          if (item.evaluation_status === "Evaluated" || item.evaluation_status === "evaluated") {
            const studentName = `${item.surname}, ${item.first_name}${item.middle_initial ? ` ${item.middle_initial}.` : ''}`;
            const evaluationDate = item.updated_at || new Date().toISOString().split('T')[0];

            // Process cap damage
            if (item.cap_deform && item.cap_deform !== "None") {
              capItems.push({
                category: item.cap_deform,
                reason: item.cap_remarks || "No details provided",
                student: studentName,
                date: evaluationDate
              });
            }

            // Process gown damage
            if (item.gown_damage && item.gown_damage !== "None") {
              gownItems.push({
                category: item.gown_damage,
                reason: item.gown_remarks || "No details provided",
                student: studentName,
                date: evaluationDate
              });
            }

            // Process hood damage
            if (item.hood_damage && item.hood_damage !== "None") {
              hoodItems.push({
                category: item.hood_damage,
                reason: item.hood_remarks || "No details provided",
                student: studentName,
                date: evaluationDate
              });
            }

            // Process tassel damage
            if (item.tassel_damage && item.tassel_damage !== "None") {
              tasselItems.push({
                category: item.tassel_damage,
                reason: item.tassel_remarks || "No details provided",
                student: studentName,
                date: evaluationDate
              });
            }
          }
        });

        setDamageData({
          capData: capItems,
          gownData: gownItems,
          hoodData: hoodItems,
          tasselData: tasselItems
        });

      } catch (err) {
        console.error("Error fetching damage data:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDamageData();
  }, []);

  const summary = [
    {
      label: "Cap",
      count: damageData.capData.length,
      color: "bg-blue-200",
      text: "text-[#2840A1]",
      icon: <CapIcon className="w-7 h-7 text-[#2840A1]" />,
    },
    {
      label: "Gown",
      count: damageData.gownData.length,
      color: "bg-gray-200",
      text: "text-[#2840A1]",
      icon: <GownIcon className="w-7 h-7 text-[#2840A1]" />,
    },
    {
      label: "Hood",
      count: damageData.hoodData.length,
      color: "bg-yellow-100",
      text: "text-[#2840A1]",
      icon: <HoodIcon className="w-7 h-7 text-[#2840A1]" />,
    },
    {
      label: "Tassel",
      count: damageData.tasselData.length,
      color: "bg-pink-100",
      text: "text-[#2840A1]",
      icon: <TasselIcon className="w-7 h-7 text-[#2840A1]" />,
    },
  ];

  return (
    <div className="w-full p-8 pb-20 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-[#02327B] mb-6">
        Damaged Items Overview
      </h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#02327B]"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-lg text-red-600 w-full max-w-6xl text-center">
          Error loading damage data: {error}. Please try again.
        </div>
      ) : (
        <>
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
          <div className="w-full flex flex-col gap-8">
            <CapDamageTable data={damageData.capData} />
            <GownDamageTable data={damageData.gownData} />
            <HoodDamageTable data={damageData.hoodData} />
            <TasselDamageTable data={damageData.tasselData} />
          </div>
        </>
      )}
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
