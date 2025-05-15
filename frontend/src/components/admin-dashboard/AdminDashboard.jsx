import React from "react";
import { useNavigate } from "react-router-dom";
import { GroupBarChart } from "@/components/ui/GroupBarChart";
import { RadialChart } from "../ui/radialchart";
import { PendingRadial } from "../ui/pendingradial";
import { EvaluationRadial } from "../ui/evaluationradial";
import { CheckedOutRadial } from "../ui/checkedoutradial";
import { PieChart, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import BoxIcon from "@/assets/icons/box.svg?react";
import Upstats from "@/assets/icons/upstat.svg?react";
import Downstats from "@/assets/icons/downstat.svg?react";
import List from "@/assets/icons/list.svg?react";
import Eval from "@/assets/icons/eval.svg?react";
import Time from "@/assets/icons/time.svg?react";
import PieChartDash from "../ui/pie-chart";
import { DashboardPie } from "../ui/dashboardpie";

function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col overflow-auto  gap-4 py-2 md:gap-4 md:py- h-full ">
      {/* SectionCards: 4 boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 px-4 lg:px-6">
        {/* 1st box section */}
        <div className="bg-white shadow-xl rounded-2xl lg:max-h-[10rem] 2xl:max-w-[105rem] h-[20rem] md:min-w-[11rem] md:h-[9rem] lg:min-h-[9rem] text-white cursor-pointer outline-none">
          <div className="flex w-full h-full ">
            {/* 1st box */}
            <div className="h-full flex flex-col w-40 text-black">
              <button
                className="bg-[#CFE1FF] flex justify-center items-center ml-3 mt-5 rounded-xl w-12 h-12 focus:outline-none transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg focus:scale-105 focus:shadow-lg"
                onClick={() => navigate("/inventory")}
                tabIndex={0}
                aria-label="Go to Inventory"
              >
                <BoxIcon className="w-6 h-6 text-blue-700" />
              </button>
              <span className="text-lg flex text-center items-center mt-8 ml-4">
                <Upstats className="w-4" />
                <p className="text-[#0DDF65] font-semibold text-xs ml-1">4%</p>
              </span>
            </div>
            <div className="h-full w-full">
              <div className="h-10 items-center flex w-full">
                <p className="text-sm text-gray-500 font-semibold">
                  Current Stock
                </p>
              </div>
              <div className="h-20 text-3xl font-black text-black w-full">
                12
              </div>
              <div className="flex justify-end items-center pr-4 h-3">
                <button
                  className="text-blue-500 transition-all duration-200 cursor-pointer ease-in-out hover:scale-105 hover:underline focus:scale-105 focus:underline text-xs font-semibold bg-transparent border-none outline-none"
                  onClick={() => navigate("/inventory")}
                  tabIndex={0}
                  aria-label="Go to Inventory"
                >
                  View Report
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* 2nd box section */}
        <div className="bg-white shadow-xl rounded-2xl lg:max-h-[10rem] 2xl:max-w-[105rem] h-[20rem] md:min-w-[11rem] md:h-[9rem] lg:min-h-[9rem] text-white cursor-pointer outline-none">
          <div className="flex w-full h-full ">
            {/* 2nd box */}
            <div className="h-full flex flex-col w-40 text-black">
              <button
                className="bg-[#CFE1FF] flex justify-center items-center ml-3 mt-5 rounded-xl w-12 h-12 focus:outline-none transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg focus:scale-105 focus:shadow-lg"
                onClick={() => navigate("/reservation")}
                tabIndex={0}
                aria-label="Go to Reservation"
              >
                <List className="w-6 h-6 text-blue-700" />
              </button>
              <span className="text-lg flex text-center items-center mt-8 ml-4">
                <Upstats className="w-4" />
                <p className="text-[#0DDF65] font-semibold text-xs ml-1">4%</p>
              </span>
            </div>
            <div className="h-full w-full">
              <div className="h-10 items-center flex w-full">
                <p className="text-sm text-gray-500 font-semibold">Reserved</p>
              </div>
              <div className="h-20 text-3xl font-black text-black w-full">
                51
              </div>
              <div className="flex justify-end items-center pr-4 h-3">
                <button
                  className="text-blue-500 transition-all duration-200 cursor-pointer ease-in-out hover:scale-105 hover:underline focus:scale-105 focus:underline text-xs font-semibold bg-transparent border-none outline-none"
                  onClick={() => navigate("/reservation")}
                  tabIndex={0}
                  aria-label="Go to Reservation"
                >
                  View Report
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* 3rd box section */}
        <div className="bg-white shadow-xl rounded-2xl lg:max-h-[10rem] 2xl:max-w-[105rem] h-[20rem] md:min-w-[11rem] md:h-[9rem] lg:min-h-[9rem] text-white cursor-pointer outline-none">
          <div className="flex w-full h-full ">
            {/* 3rd box */}
            <div className="h-full flex flex-col w-40 text-black">
              <button
                className="bg-[#CFE1FF] flex justify-center items-center ml-3 mt-5 rounded-xl w-12 h-12 focus:outline-none transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg focus:scale-105 focus:shadow-lg"
                onClick={() => navigate("/pending")}
                tabIndex={0}
                aria-label="Go to Pending"
              >
                <Time className="w-6 h-6 text-blue-700" />
              </button>
              <span className="text-lg flex text-center items-center mt-8 ml-4">
                <Downstats className="w-4" />
                <p className="text-[#FF5757] font-semibold text-xs ml-1">4%</p>
              </span>
            </div>
            <div className="h-full w-full">
              <div className="h-10 items-center flex w-full">
                <p className="text-sm text-gray-500 font-semibold">Pending</p>
              </div>
              <div className="h-20 text-3xl font-black text-black w-full">
                143
              </div>
              <div className="flex justify-end items-center pr-4 h-3">
                <button
                  className="text-blue-500 transition-all duration-200 cursor-pointer ease-in-out hover:scale-105 hover:underline focus:scale-105 focus:underline text-xs font-semibold bg-transparent border-none outline-none"
                  onClick={() => navigate("/pending")}
                  tabIndex={0}
                  aria-label="Go to Pending"
                >
                  View Report
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* 4th box section */}
        <div className="bg-white shadow-xl rounded-2xl lg:max-h-[10rem] 2xl:max-w-[105rem] h-[20rem] md:min-w-[11rem] md:h-[9rem] lg:min-h-[9rem] text-white cursor-pointer outline-none">
          <div className="flex w-full h-full ">
            {/* 4th box */}
            <div className="h-full flex flex-col w-40 text-black">
              <button
                className="bg-[#CFE1FF] flex justify-center items-center ml-3 mt-5 rounded-xl w-12 h-12 focus:outline-none transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg focus:scale-105 focus:shadow-lg"
                onClick={() => navigate("/evaluation-page")}
                tabIndex={0}
                aria-label="Go to Evaluation"
              >
                <Eval className="w-7 h-7 text-blue-700" />
              </button>
              <span className="text-lg flex text-center items-center mt-8 ml-4">
                <Downstats className="w-4" />
                <p className="text-[#FF5757] font-semibold text-xs ml-1">4%</p>
              </span>
            </div>
            <div className="h-full w-full">
              <div className="h-10 items-center flex w-full">
                <p className="text-sm text-gray-500 font-semibold">Evaluated</p>
              </div>
              <div className="h-20 text-3xl font-black text-black w-full">
                4
              </div>
              <div className="flex justify-end items-center pr-4 h-3">
                <button
                  className="text-blue-500 transition-all duration-200 cursor-pointer ease-in-out hover:scale-105 hover:underline focus:scale-105 focus:underline text-xs font-semibold bg-transparent border-none outline-none"
                  onClick={() => navigate("/evaluation-page")}
                  tabIndex={0}
                  aria-label="Go to Evaluation"
                >
                  View Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2nd row: 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-4 px-4 lg:px-6">
        <div className="bg-blue-200 rounded-xl shadow-lg px-4 py-8 flex items-center justify-center min-h-[220px] transition-all duration-700 ease-in-out hover:scale-102 hover:shadow-2xl focus:scale-102 focus:shadow-2xl cursor-pointer outline-none">
          <span className="text-black font-semibold text-lg">
            fixing pa responsiveness desktop to mobile ahhahahah
          </span>
        </div>
        <div className="bg-white relative rounded-xl flex flex-col min-h-[220px] max-h-[260px] transition-all duration-700 ease-in-out hover:scale-102 hover:shadow-2xl focus:scale-102 focus:shadow-2xl cursor-pointer outline-none">
          <p className="text-xl font-semibold pl-5 h-10 flex items-center text-start">
            Overview of Items
          </p>
          <div className="w-full flex justify-start min-h-[180px] max-h-[200px] overflow-hidden">
            <DashboardPie />
          </div>
        </div>
      </div>
      {/* 3rd row: 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr_1.8fr] min-h-[200px] gap-4 px-4 lg:px-6 ">
        {/* 1st col: New Users Registered (moved here) */}
        <div className="bg-green-800 w-full flex flex-col rounded-xl shadow-lg p-4 min-h-[200px] text-white">
          <h3 className="text-lg font-bold text-white mb-2">New Users Registered</h3>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-green-300"></span>
              <span className="font-semibold">Donald Lee</span>
              <span className="text-xs text-gray-200 ml-auto">2 min ago</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-green-300"></span>
              <span className="font-semibold">Magang Magang</span>
              <span className="text-xs text-gray-200 ml-auto">10 min ago</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-green-300"></span>
              <span className="font-semibold">Gold Neger</span>
              <span className="text-xs text-gray-200 ml-auto">1 hr ago</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-green-300"></span>
              <span className="font-semibold">Johnny Sins</span>
              <span className="text-xs text-gray-200 ml-auto">2 hr ago</span>
            </li>
          </ul>
        </div>
        {/* 2nd col: (empty or placeholder) */}
        <div className="bg-white w-full flex flex-col rounded-xl shadow-lg p-4 min-h-[200px]">
          {/* Placeholder for future content */}
        </div>
        {/* 3rd col: Student Concerns Results */}
        <div className="bg-white w-full flex flex-col rounded-xl shadow-lg p-4 min-h-[200px]">
          <h3 className="text-lg font-bold text-gray-700 mb-2">Student Concerns</h3>
          <ul className="flex flex-col gap-3">
            {/* Only show 2 rows for min height fit */}
            <li className="flex flex-col gap-1 border-b pb-2 last:border-b-0">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="font-semibold text-gray-800">Lost Gown</span>
                <span className="ml-auto px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">Resolved</span>
              </div>
              <div className="text-xs text-gray-500 ml-4">Student: Donald Lee</div>
              <div className="text-xs text-gray-600 ml-4">"I lost my gown after the event. What should I do?"</div>
              <div className="text-xs text-gray-400 ml-4">Response: Please visit the admin office for assistance.</div>
            </li>
            <li className="flex flex-col gap-1 border-b pb-2 last:border-b-0">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-yellow-400"></span>
                <span className="font-semibold text-gray-800">Damaged Cap</span>
                <span className="ml-auto px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">Pending</span>
              </div>
              <div className="text-xs text-gray-500 ml-4">Student: Magang Magang</div>
              <div className="text-xs text-gray-600 ml-4">"My cap is broken, can I get a replacement?"</div>
              <div className="text-xs text-gray-400 ml-4">Response: Awaiting admin review.</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
