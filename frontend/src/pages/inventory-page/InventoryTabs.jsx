// import React, { useEffect, useState } from "react";
import React, { useState, useEffect } from "react";
import Profile from "../../assets/images/dump.jpg";
import { CarouselPlugin } from "../../components/ui/my-carousel";

import CapDamageTable from "../../components/damage-tables/CapDamageTable";
import GownDamageTable from "../../components/damage-tables/GownDamageTable";
import HoodDamageTable from "../../components/damage-tables/HoodDamageTable";
import TasselDamageTable from "../../components/damage-tables/TasselDamageTable";
import CapRepairTable from "../../components/repair-tables/CapRepairTable";
import GownRepairTable from "../../components/repair-tables/GownRepairTable";
import HoodRepairTable from "../../components/repair-tables/HoodRepairTable";
import TasselRepairTable from "../../components/repair-tables/TasselRepairTable";
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
    tasselData: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDamageData = async () => {
      setIsLoading(true);
      try {
        // Fetch items data - this will be our primary source for damaged items
        const itemsResponse = await fetch("http://localhost:5001/items");
        if (!itemsResponse.ok) {
          throw new Error(`HTTP error! Status: ${itemsResponse.status}`);
        }
        const itemsData = await itemsResponse.json();

        // Process damaged items from items table
        const damagedItems = itemsData.filter(
          (item) => item.item_status === "Damaged" && 
                   item.damage_type && 
                   item.damage_type !== "Uncategorized" &&
                   item.damage_type.trim() !== ""
        );

        // Group by item type (case insensitive matching)
        const capDamaged = damagedItems.filter(
          (item) => item.item_type?.toLowerCase() === "cap"
        );
        const gownDamaged = damagedItems.filter(
          (item) => item.item_type?.toLowerCase() === "gown"
        );
        const hoodDamaged = damagedItems.filter(
          (item) => item.item_type?.toLowerCase() === "hood"
        );
        const tasselDamaged = damagedItems.filter(
          (item) => item.item_type?.toLowerCase() === "tassel"
        );

        // Create structured damage data
        const capItems = capDamaged.map((item) => ({
          category: item.damage_type || "N/A",
          reason: item.damage_reason || "Not specified",
          student: item.damaged_by || "Unknown",
          date: item.damage_date || new Date().toISOString().split("T")[0],
          quantity: item.quantity || 1,
          size: item.variant || "N/A", // Cap variant is size
          status: item.item_status || "Damaged"
        }));

        const gownItems = gownDamaged.map((item) => ({
          category: item.damage_type || "N/A",
          reason: item.damage_reason || "Not specified",
          student: item.damaged_by || "Unknown",
          date: item.damage_date || new Date().toISOString().split("T")[0],
          quantity: item.quantity || 1,
          size: item.variant ? item.variant.toUpperCase() : "N/A", // Gown variant is size
          status: item.item_status || "Damaged"
        }));

        const hoodItems = hoodDamaged.map((item) => ({
          category: item.damage_type || "N/A",
          reason: item.damage_reason || "Not specified",
          student: item.damaged_by || "Unknown",
          date: item.damage_date || new Date().toISOString().split("T")[0],
          quantity: item.quantity || 1,
          color: item.variant || "N/A", // Hood variant is color
          status: item.item_status || "Damaged"
        }));

        const tasselItems = tasselDamaged.map((item) => ({
          category: item.damage_type || "N/A",
          reason: item.damage_reason || "Not specified",
          student: item.damaged_by || "Unknown",
          date: item.damage_date || new Date().toISOString().split("T")[0],
          quantity: item.quantity || 1,
          color: item.variant || "N/A", // Tassel variant is color
          status: item.item_status || "Damaged"
        }));

        // Also fetch evaluation data to enrich our damage information where possible
        const evalResponse = await fetch("http://localhost:5001/evaluation");
        if (evalResponse.ok) {
          const evalData = await evalResponse.json();

          // Process evaluated items with damage info
          evalData.forEach((item) => {
            if (
              item.evaluation_status === "Evaluated" ||
              item.evaluation_status === "evaluated"
            ) {
              const studentName = `${item.surname}, ${item.first_name}${
                item.middle_initial ? ` ${item.middle_initial}.` : ""
              }`;
              const evaluationDate =
                item.updated_at || new Date().toISOString().split("T")[0];

              // Enrich cap damage data if applicable
              if (
                item.cap_deform &&
                item.cap_deform !== "None" &&
                capItems.length > 0
              ) {
                // Replace a generic entry with this specific one if available
                const genericIndex = capItems.findIndex(
                  (c) => c.category === "Uncategorized"
                );
                if (genericIndex >= 0) {
                  capItems[genericIndex] = {
                    category: item.cap_deform,
                    reason: item.cap_remarks || "No details provided",
                    student: studentName,
                    date: evaluationDate,
                    quantity: 1,
                  };
                }
              }

              // Enrich gown damage data
              if (
                item.gown_damage &&
                item.gown_damage !== "None" &&
                gownItems.length > 0
              ) {
                const genericIndex = gownItems.findIndex(
                  (c) => c.category === "Uncategorized"
                );
                if (genericIndex >= 0) {
                  gownItems[genericIndex] = {
                    category: item.gown_damage,
                    reason: item.gown_remarks || "No details provided",
                    student: studentName,
                    date: evaluationDate,
                    quantity: 1,
                  };
                }
              }

              // Enrich hood damage data
              if (
                item.hood_damage &&
                item.hood_damage !== "None" &&
                hoodItems.length > 0
              ) {
                const genericIndex = hoodItems.findIndex(
                  (c) => c.category === "Uncategorized"
                );
                if (genericIndex >= 0) {
                  hoodItems[genericIndex] = {
                    category: item.hood_damage,
                    reason: item.hood_remarks || "No details provided",
                    student: studentName,
                    date: evaluationDate,
                    quantity: 1,
                  };
                }
              }

              // Enrich tassel damage data
              if (
                item.tassel_damage &&
                item.tassel_damage !== "None" &&
                tasselItems.length > 0
              ) {
                const genericIndex = tasselItems.findIndex(
                  (c) => c.category === "Uncategorized"
                );
                if (genericIndex >= 0) {
                  tasselItems[genericIndex] = {
                    category: item.tassel_damage,
                    reason: item.tassel_remarks || "No details provided",
                    student: studentName,
                    date: evaluationDate,
                    quantity: 1,
                  };
                }
              }
            }
          });
        }

        // Expand entries based on quantity
        const expandByQuantity = (items) => {
          let expanded = [];
          items.forEach((item) => {
            const quantity = item.quantity || 1;
            for (let i = 0; i < quantity; i++) {
              expanded.push({
                category: item.category,
                reason: item.reason,
                student: item.student,
                date: item.date,
                size: item.size, // Preserve size for caps and gowns
                color: item.color, // Preserve color for hoods and tassels
                status: item.status, // Preserve status
              });
            }
          });
          return expanded;
        };

        // Set the damage data with expanded items
        setDamageData({
          capData: expandByQuantity(capItems),
          gownData: expandByQuantity(gownItems),
          hoodData: expandByQuantity(hoodItems),
          tasselData: expandByQuantity(tasselItems),
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

  // Calculate total damaged items
  const totalDamagedItems =
    damageData.capData.length +
    damageData.gownData.length +
    damageData.hoodData.length +
    damageData.tasselData.length;

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
          {/* Total count display */}
          <div className="bg-white shadow-lg rounded-lg px-6 py-4 mb-6 w-full max-w-6xl">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-700">
                Total Damaged Items:
              </span>
              <span className="text-2xl font-bold text-[#102F5E]">
                {totalDamagedItems}
              </span>
            </div>
          </div>

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
                <span className="text-xs text-gray-500 mt-1">
                  Total Damaged
                </span>
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
  // lahat dito is finollow ko lang ui ng viewdamages -clyde
  const [repairData, setRepairData] = useState({
    capData: [],
    gownData: [],
    hoodData: [],
    tasselData: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepairData = async () => {
      setIsLoading(true);
      try {
        // Fetch items data - primary source for items needing repair
        const itemsResponse = await fetch("http://localhost:5001/items");
        if (!itemsResponse.ok) {
          throw new Error(`HTTP error! Status: ${itemsResponse.status}`);
        }
        const itemsData = await itemsResponse.json();

        // Filter items with item_status 'For Repair'
        const repairItems = itemsData.filter(
          (item) => item.item_status === "For Repair" && 
                   item.damage_type && 
                   item.damage_type !== "Uncategorized" &&
                   item.damage_type.trim() !== ""
        );

        // Group by item type (case insensitive matching)
        const capRepair = repairItems.filter(
          (item) => item.item_type?.toLowerCase() === "cap"
        );
        const gownRepair = repairItems.filter(
          (item) => item.item_type?.toLowerCase() === "gown"
        );
        const hoodRepair = repairItems.filter(
          (item) => item.item_type?.toLowerCase() === "hood"
        );
        const tasselRepair = repairItems.filter(
          (item) => item.item_type?.toLowerCase() === "tassel"
        );

        // Structure repair data
        const capItems = capRepair.map((item) => ({
          category: item.damage_type || "N/A",
          reason: item.damage_reason || "Not specified",
          student: item.damaged_by || "Unknown",
          date: item.damage_date || new Date().toISOString().split("T")[0],
          quantity: item.quantity || 1,
          size: item.variant || "N/A", // Cap variant is size
          status: item.item_status || "For Repair"
        }));
        const gownItems = gownRepair.map((item) => ({
          category: item.damage_type || "N/A",
          reason: item.damage_reason || "Not specified",
          student: item.damaged_by || "Unknown",
          date: item.damage_date || new Date().toISOString().split("T")[0],
          quantity: item.quantity || 1,
          size: item.variant ? item.variant.toUpperCase() : "N/A", // Gown variant is size
          status: item.item_status || "For Repair"
        }));
        const hoodItems = hoodRepair.map((item) => ({
          category: item.damage_type || "N/A",
          reason: item.damage_reason || "Not specified",
          student: item.damaged_by || "Unknown",
          date: item.damage_date || new Date().toISOString().split("T")[0],
          quantity: item.quantity || 1,
          color: item.variant || "N/A", // Hood variant is color
          status: item.item_status || "For Repair"
        }));
        const tasselItems = tasselRepair.map((item) => ({
          category: item.damage_type || "N/A",
          reason: item.damage_reason || "Not specified",
          student: item.damaged_by || "Unknown",
          date: item.damage_date || new Date().toISOString().split("T")[0],
          quantity: item.quantity || 1,
          color: item.variant || "N/A", // Tassel variant is color
          status: item.item_status || "For Repair"
        }));

        // Expand entries based on quantity
        const expandByQuantity = (items) => {
          let expanded = [];
          items.forEach((item) => {
            const quantity = item.quantity || 1;
            for (let i = 0; i < quantity; i++) {
              expanded.push({
                category: item.category,
                reason: item.reason,
                student: item.student,
                date: item.date,
                size: item.size, // Preserve size for caps and gowns
                color: item.color, // Preserve color for hoods and tassels
                status: item.status, // Preserve status
              });
            }
          });
          return expanded;
        };

        setRepairData({
          capData: expandByQuantity(capItems),
          gownData: expandByQuantity(gownItems),
          hoodData: expandByQuantity(hoodItems),
          tasselData: expandByQuantity(tasselItems),
        });
      } catch (err) {
        console.error("Error fetching repair data:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRepairData();
  }, []);

  const summary = [
    {
      label: "Cap",
      count: repairData.capData.length,
      color: "bg-blue-100",
      text: "text-[#2840A1]",
      icon: <CapIcon className="w-7 h-7 text-[#2840A1]" />,
    },
    {
      label: "Gown",
      count: repairData.gownData.length,
      color: "bg-gray-100",
      text: "text-[#2840A1]",
      icon: <GownIcon className="w-7 h-7 text-[#2840A1]" />,
    },
    {
      label: "Hood",
      count: repairData.hoodData.length,
      color: "bg-yellow-50",
      text: "text-[#2840A1]",
      icon: <HoodIcon className="w-7 h-7 text-[#2840A1]" />,
    },
    {
      label: "Tassel",
      count: repairData.tasselData.length,
      color: "bg-pink-50",
      text: "text-[#2840A1]",
      icon: <TasselIcon className="w-7 h-7 text-[#2840A1]" />,
    },
  ];

  const totalRepairItems =
    repairData.capData.length +
    repairData.gownData.length +
    repairData.hoodData.length +
    repairData.tasselData.length;

  return (
    <div className="w-full p-8 pb-20 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-[#02327B] mb-6">
        Items for Repair Overview
      </h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#02327B]"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-lg text-red-600 w-full max-w-6xl text-center">
          Error loading repair data: {error}. Please try again.
        </div>
      ) : (
        <>
          {/* Total count display */}
          <div className="bg-white shadow-lg rounded-lg px-6 py-4 mb-6 w-full max-w-6xl">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-700">
                Total Items for Repair:
              </span>
              <span className="text-2xl font-bold text-[#102F5E]">
                {totalRepairItems}
              </span>
            </div>
          </div>
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
                <span className="text-xs text-gray-500 mt-1">
                  Total for Repair
                </span>
              </div>
            ))}
          </div>
          {/* Scalable tables for each category */}
          <div className="w-full flex flex-col gap-8">
            <CapRepairTable data={repairData.capData} />
            <GownRepairTable data={repairData.gownData} />
            <HoodRepairTable data={repairData.hoodData} />
            <TasselRepairTable data={repairData.tasselData} />
          </div>
        </>
      )}
    </div>
  );
}
