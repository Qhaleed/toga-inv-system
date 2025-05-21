import React, { useState, useEffect } from "react";
import CapDamageTable from "./CapDamageTable";
import GownDamageTable from "./GownDamageTable";
import HoodDamageTable from "./HoodDamageTable";
import TasselDamageTable from "./TasselDamageTable";

export default function ViewDamageTab() {
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

        data.forEach((item) => {
          // Only process items that have been evaluated
          if (
            item.evaluation_status === "Evaluated" ||
            item.evaluation_status === "evaluated"
          ) {
            const studentName = `${item.surname}, ${item.first_name}${item.middle_initial ? ` ${item.middle_initial}.` : ""
              }`;
            const evaluationDate =
              item.updated_at || new Date().toISOString().split("T")[0];

            // Process cap damage
            if (item.cap_deform && item.cap_deform !== "None") {
              capItems.push({
                category: item.cap_deform,
                reason: item.cap_remarks || "No details provided",
                student: studentName,
                date: evaluationDate,
              });
            }

            // Process gown damage
            if (item.gown_damage && item.gown_damage !== "None") {
              gownItems.push({
                category: item.gown_damage,
                reason: item.gown_remarks || "No details provided",
                student: studentName,
                date: evaluationDate,
              });
            }

            // Process hood damage
            if (item.hood_damage && item.hood_damage !== "None") {
              hoodItems.push({
                category: item.hood_damage,
                reason: item.hood_remarks || "No details provided",
                student: studentName,
                date: evaluationDate,
              });
            }

            // Process tassel damage
            if (item.tassel_damage && item.tassel_damage !== "None") {
              tasselItems.push({
                category: item.tassel_damage,
                reason: item.tassel_remarks || "No details provided",
                student: studentName,
                date: evaluationDate,
              });
            }
          }
        });

        setDamageData({
          capData: capItems,
          gownData: gownItems,
          hoodData: hoodItems,
          tasselData: tasselItems,
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

  // Create summary for cards based on fetched data
  const summary = [
    {
      label: "Cap",
      count: damageData.capData.length,
      color:
        "bg-gradient-to-br from-blue-200 via-blue-100 to-blue-50 border-blue-300 border-2",
      text: "text-[#2840A1]",
      icon: (
        <svg
          className="w-7 h-7 text-[#2840A1]"
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
      count: damageData.gownData.length,
      color:
        "bg-gradient-to-br from-gray-200 via-gray-100 to-gray-50 border-gray-300 border-2",
      text: "text-[#2840A1]",
      icon: (
        <svg
          className="w-7 h-7 text-[#2840A1]"
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
      count: damageData.hoodData.length,
      color:
        "bg-gradient-to-br from-yellow-100 via-yellow-50 to-white border-yellow-300 border-2",
      text: "text-[#2840A1]",
      icon: (
        <svg
          className="w-7 h-7 text-[#2840A1]"
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
      count: damageData.tasselData.length,
      color:
        "bg-gradient-to-br from-pink-100 via-pink-50 to-white border-pink-300 border-2",
      text: "text-[#2840A1]",
      icon: (
        <svg
          className="w-7 h-7 text-[#2840A1]"
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
                className={`shadow-xl rounded-2xl flex flex-col items-center p-6 ${item.color}`}
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
          <div className="w-full max-w-6xl flex flex-col gap-10">
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
