import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GroupBarChart } from "@/components/ui/GroupBarChart";
import { RadialChart } from "../ui/radialchart";
import { PendingRadial } from "../ui/pendingradial";
import { EvaluationRadial } from "../ui/evaluationradial";
import { CheckedOutRadial } from "../ui/checkedoutradial";
import {
  PieChart,
  TrendingDownIcon,
  TrendingUpIcon,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import BoxIcon from "@/assets/icons/box.svg?react";
import Upstats from "@/assets/icons/upstat.svg?react";
import Downstats from "@/assets/icons/downstat.svg?react";
import List from "@/assets/icons/list.svg?react";
import Eval from "@/assets/icons/eval.svg?react";
import Time from "@/assets/icons/time.svg?react";
import PieChartDash from "../ui/pie-chart";
import { DashboardPie } from "../ui/dashboardpie";
import StudentConcernsModal from "./StudentConcernsModal";

function AdminDashboard() {
  const navigate = useNavigate();
  const [showConcernModal, setShowConcernModal] = useState(false);
  const [selectedConcern, setSelectedConcern] = useState(null);
  // hardcoded muna to
  const concerns = [
    {
      subject: "Lost Gown",
      status: "Resolved",
      statusColor: "bg-green-100 text-green-700",
      student: "Donald Lee",
      message: "I lost my gown after the event. What should I do?",
      response: "Please visit the admin office for assistance.",
      date: "2025-05-15",
      time: "10:30 AM",
    },
    {
      subject: "Damaged Cap",
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-700",
      student: "Magang Magang",
      message: "My cap is broken, can I get a replacement?",
      response: "Awaiting admin review.",
      date: "2025-05-15",
      time: "09:10 AM",
    },
    {
      subject: "Missing Hood",
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-700",
      student: "Johnny Sins",
      message: "I did not receive a hood with my set.",
      response: "Awaiting admin review.",
      date: "2025-05-14",
      time: "03:45 PM",
    },
    {
      subject: "Wrong Toga Size",
      status: "Resolved",
      statusColor: "bg-green-100 text-green-700",
      student: "Gold Neger",
      message: "I received the wrong toga size.",
      response: "Please exchange at the admin office.",
      date: "2025-05-13",
      time: "01:20 PM",
    },
  ];
  return (
    <div className="flex flex-col overflow-auto gap-4 py-2 md:gap-4 md:pb-10 h-full w-full min-h-0 mb-8">
      <div className="md:h-4 hidden items-start md:flex">
        <p className="ml-6 font-bold 2xl:text-2xl xl:text-xl">{`Welcome, Admin! 👋🏻`}</p>
      </div>
      {/* SectionCards: 4 boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 px-4 lg:px-6">
        {/* 1st box section */}
        <div className="bg-white shadow-xl rounded-2xl lg:max-h-[10rem] 2xl:max-w-[105rem] h-[20rem] md:min-w-[11rem] md:h-[8rem] lg:min-h-[8rem] text-white cursor-pointer outline-none">
          <div className="flex w-full h-full ">
            {/* 1st box */}
            <div className="h-full flex flex-col w-40 text-black">
              <button
                className="bg-[#CFE1FF] flex justify-center items-center ml-3 mt-5 rounded-xl w-12 h-12 focus:outline-none transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg focus:scale-105 focus:shadow-lg"
                onClick={() => navigate("/inventory")}
                tabIndex={0}
                aria-label="Go to Inventory"
              >
                <BoxIcon className="w-6 h-6 cursor-pointer text-blue-700" />
              </button>
              <span className="text-lg flex text-center items-center  mt-8 ml-4">
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
              <div className="h-20 text-3xl font-black  text-[#102F5E] w-full">
                12
              </div>
              <div className="flex justify-end items-end pr-4 h-0">
                <button
                  className="self-end mt-1 text-xs text-blue-600 hover:underline focus:underline font-semibold bg-transparent border-none outline-none cursor-pointer"
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
        <div className="bg-white shadow-xl rounded-2xl lg:max-h-[10rem] 2xl:max-w-[105rem] h-[20rem] md:min-w-[11rem] md:h-[8rem] lg:min-h-[8rem] text-white cursor-pointer outline-none">
          <div className="flex w-full h-full ">
            {/* 2nd box */}
            <div className="h-full flex flex-col w-40 text-[#102F5E]">
              <button
                className="bg-[#CFE1FF] flex justify-center items-center ml-3 mt-5 rounded-xl w-12 h-12 focus:outline-none transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg focus:scale-105 focus:shadow-lg"
                onClick={() => navigate("/reservation")}
                tabIndex={0}
                aria-label="Go to Reservation"
              >
                <List className="w-6 h-6 cursor-pointer text-blue-700" />
              </button>
              <span className="text-lg flex text-center items-center  mt-8 ml-4">
                <Upstats className="w-4" />
                <p className="text-[#0DDF65] font-semibold text-xs ml-1">4%</p>
              </span>
            </div>
            <div className="h-full w-full">
              <div className="h-10 items-center flex w-full">
                <p className="text-sm text-gray-500 font-semibold">Reserved</p>
              </div>
              <div className="h-20 text-3xl font-black text-[#102F5E]">51</div>
              <div className="flex justify-end items-end pr-4 h-0">
                <button
                  className="self-end mt-1 text-xs text-blue-600 hover:underline focus:underline font-semibold bg-transparent border-none outline-none cursor-pointer"
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
        <div className="bg-white shadow-xl rounded-2xl lg:max-h-[10rem] 2xl:max-w-[105rem] h-[20rem] md:min-w-[11rem] md:h-[8rem] lg:min-h-[8rem] text-white  outline-none">
          <div className="flex w-full h-full ">
            {/* 3rd box */}
            <div className="h-full flex flex-col w-40 text-black">
              <button
                className="bg-[#CFE1FF] flex justify-center items-center ml-3 mt-5 rounded-xl w-12 h-12 focus:outline-none transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg focus:scale-105 focus:shadow-lg"
                onClick={() => navigate("/pending")}
                tabIndex={0}
                aria-label="Go to Pending"
              >
                <Time className="w-6 h-6 cursor-pointer text-blue-700" />
              </button>
              <span className="text-lg flex text-center items-center  mt-8 ml-4">
                <Downstats className="w-4" />
                <p className="text-[#FF5757] font-semibold text-xs ml-1">4%</p>
              </span>
            </div>
            <div className="h-full w-full">
              <div className="h-10 items-center flex w-full">
                <p className="text-sm text-gray-500 font-semibold">Pending</p>
              </div>
              <div className="h-20 text-3xl font-black text-[#102F5E] w-full">
                143
              </div>
              <div className="flex justify-end items-end pr-4 h-0">
                <button
                  className="self-end mt-1 text-xs text-blue-600 hover:underline focus:underline font-semibold bg-transparent border-none outline-none cursor-pointer"
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
        <div className="bg-white shadow-xl rounded-2xl lg:max-h-[10rem] 2xl:max-w-[105rem] h-[20rem] md:min-w-[11rem] md:h-[8rem] lg:min-h-[8rem] text-white  outline-none">
          <div className="flex w-full h-full ">
            {/* 4th box */}
            <div className="h-full flex flex-col w-40 text-black">
              <button
                className="bg-[#CFE1FF] flex justify-center items-center ml-3 mt-5 rounded-xl w-12 h-12 focus:outline-none transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg focus:scale-105 focus:shadow-lg"
                onClick={() => navigate("/evaluation-page")}
                tabIndex={0}
                aria-label="Go to Evaluation"
              >
                <Eval className="w-7 h-7 cursor-pointer text-blue-700" />
              </button>
              <span className="text-lg flex text-center items-center  mt-8 ml-4">
                <Downstats className="w-4" />
                <p className="text-[#FF5757] font-semibold text-xs ml-1">4%</p>
              </span>
            </div>
            <div className="h-full w-full">
              <div className="h-10 items-center flex w-full">
                <p className="text-sm text-gray-500 font-semibold">Evaluated</p>
              </div>
              <div className="h-20 text-3xl font-black text-[#102F5E] w-full">
                4
              </div>
              <div className="flex justify-end items-end pr-4 h-0">
                <button
                  className="self-end mt-1 text-xs text-blue-600 hover:underline focus:underline font-semibold bg-transparent border-none outline-none cursor-pointer"
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

      {/* 2nd row: 2 columns  */}
      <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-4 px-4 lg:px-6">
        <div className="bg-white rounded-xl shadow-lg px-4 py-8 flex items-center justify-center min-h-[220px] transition-all duration-700 ease-in-out hover:scale-102 hover:shadow-2xl focus:scale-102 focus:shadow-2xl  outline-none">
          <span className="text-black font-semibold text-lg">
            Graph to becontinued hahahahahhahahaha
          </span>
        </div>
        <div className="bg-white relative rounded-xl flex flex-col min-h-[220px] max-h-[260px] transition-all duration-700 ease-in-out hover:scale-102 hover:shadow-2xl focus:scale-102 focus:shadow-2xl  outline-none">
          <p className="text-lg  font-extrabold !font-manjari  pl-5 pt-5 h-10 flex items-center text-start">
            Overview of Items
          </p>
          <div className="w-full flex justify-start min-h-[180px] max-h-[200px] overflow-hidden">
            <DashboardPie />
          </div>
        </div>
      </div>
      {/* 3rd row: 3 columns */}
      <div className="flex flex-wrap gap-4 px-4 lg:px-6 w-full">
        {/* 1st col: New Users Registered */}
        <div className="bg-white w-full md:w-[32%] flex flex-col rounded-xl shadow-lg p-4 min-h-[200px] flex-1">
          <h3 className="text-lg font-bold text-gray-700 mb-2">
            New Users Registered
          </h3>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-3 border-b pb-2 last:border-b-0">
              <img
                src="https://ui-avatars.com/api/?name=Donald+Lee"
                alt="Donald Lee"
                className="w-8 h-8 rounded-full bg-gray-200"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">Donald Lee</span>
                <span className="text-xs text-gray-400">2 min ago</span>
              </div>
            </li>
            <li className="flex items-center gap-3 border-b pb-2 last:border-b-0">
              <img
                src="https://ui-avatars.com/api/?name=Magang+Magang"
                alt="Magang Magang"
                className="w-8 h-8 rounded-full bg-gray-200"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">
                  Magang Magang
                </span>
                <span className="text-xs text-gray-400">10 min ago</span>
              </div>
            </li>
            <li className="flex items-center gap-3 border-b pb-2 last:border-b-0">
              <img
                src="https://ui-avatars.com/api/?name=Gold+Neger"
                alt="Gold Neger"
                className="w-8 h-8 rounded-full bg-gray-200"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">Gold Neger</span>
                <span className="text-xs text-gray-400">1 hr ago</span>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <img
                src="https://ui-avatars.com/api/?name=Johnny+Sins"
                alt="Johnny Sins"
                className="w-8 h-8 rounded-full bg-gray-200"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">Johnny Sins</span>
                <span className="text-xs text-gray-400">2 hr ago</span>
              </div>
            </li>
          </ul>
        </div>

        {/* 2nd col: Approval Requests */}
        <div className="bg-white w-full md:w-[32%] flex flex-col rounded-xl shadow-lg p-4 min-h-[200px] relative flex-1">
          <h3 className="text-lg font-bold text-gray-700 mb-2 flex items-center justify-between">
            Approval Requests
            <button
              onClick={() => navigate("/pending")}
              className="relative rounded-full p-2 shadow hover:bg-blue-100 focus:bg-blue-100 transition-all duration-300 ml-2"
              aria-label="Go to Pending Page"
              tabIndex={0}
            >
              <ArrowRight className="w-5 h-5 text-[#102F5E]" />
              <span className="absolute right-0 top-full mt-2 w-max px-2 py-1 rounded bg-gray-900 text-white text-xs opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity pointer-events-none z-50">
                Go to Pending Page
              </span>
            </button>
          </h3>
          <ul className="flex flex-col gap-3">
            {/*Newly registered students  dito */}
            <li className="flex flex-col gap-1 border-b pb-2 last:border-b-0">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="font-semibold text-gray-800">
                  Labazmo T. Timo
                </span>
                <span className="ml-auto px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                  New
                </span>
              </div>
              <div className="text-xs text-gray-500 ml-4">ID: 203111</div>
              <div className="text-xs text-gray-500 ml-4">
                Course: BS Biology (BSBio)
              </div>
              <div className="flex gap-2 ml-4 mt-1">
                <button
                  className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 focus:bg-blue-200 transition"
                  onClick={() =>
                    alert("Show registration form for Steven Universe")
                  }
                >
                  View Form
                </button>
                <button className="px-2 py-1 text-xs rounded bg-green-100 text-green-700 font-semibold hover:bg-green-200 focus:bg-green-200 transition">
                  Accept
                </button>
                <button className="px-2 py-1 text-xs rounded bg-red-100 text-red-700 font-semibold hover:bg-red-200 focus:bg-red-200 transition">
                  Deny
                </button>
              </div>
            </li>
            <li className="flex flex-col gap-1 border-b pb-2 last:border-b-0">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="font-semibold text-gray-800">Pablo Jab</span>
                <span className="ml-auto px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                  New
                </span>
              </div>
              <div className="text-xs text-gray-500 ml-4">ID: 333222</div>
              <div className="text-xs text-gray-500 ml-4">
                Course: Bachelor of Elementary Education (BEEd)
              </div>
              <div className="flex gap-2 ml-4 mt-1">
                <button
                  className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 focus:bg-blue-200 transition"
                  onClick={() => alert("Show registration form for Pablo Jab")}
                >
                  View Form
                </button>
                <button className="px-2 py-1 text-xs rounded bg-green-100 text-green-700 font-semibold hover:bg-green-200 focus:bg-green-200 transition">
                  Accept
                </button>
                <button className="px-2 py-1 text-xs rounded bg-red-100 text-red-700 font-semibold hover:bg-red-200 focus:bg-red-200 transition">
                  Deny
                </button>
              </div>
            </li>
          </ul>
        </div>
        {/* 3rd col: Student Concerns Results */}
        <div className="bg-white w-full md:w-[32%] flex flex-col rounded-xl shadow-lg p-4 min-h-[350px] flex-1">
          <h3 className="text-lg font-bold text-gray-700 mb-2 flex items-center justify-between">
            Student Concerns
            <button
              className="text-xs text-blue-600 hover:underline focus:underline font-semibold ml-2 cursor-pointer"
              onClick={() => {
                setSelectedConcern(null);
                setShowConcernModal(true);
              }}
              aria-label="View More Student Concerns"
            >
              View More
            </button>
          </h3>
          <ul className="flex flex-col gap-3">
            {concerns.slice(0, 2).map((concern, idx) => (
              <li
                key={idx}
                className="flex flex-col gap-1 border-b pb-2 last:border-b-0"
              >
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                  <span className="font-semibold text-gray-800">
                    {concern.subject}
                  </span>
                  <span
                    className={`ml-auto px-2 py-0.5 rounded-full text-xs font-semibold ${concern.statusColor}`}
                  >
                    {concern.status}
                  </span>
                </div>
                <div className="flex items-center text-xs text-gray-400 ml-4 gap-2">
                  <span>{concern.date}</span>
                  <span>{concern.time}</span>
                </div>
                <div className="text-xs text-gray-500 ml-4">
                  Student: {concern.student}
                </div>
                <div className="text-xs text-gray-600 ml-4">
                  "{concern.message}"
                </div>
                <div className="text-xs text-gray-400 ml-4">
                  Response: {concern.response}
                </div>
                <button
                  className="self-end mt-1 text-xs text-blue-600 hover:underline focus:underline font-semibold cursor-pointer"
                  onClick={() => {
                    setSelectedConcern(concern);
                    setShowConcernModal(true);
                  }}
                  aria-label={`View full concern for ${concern.student}`}
                >
                  View
                </button>
              </li>
            ))}
          </ul>
          {/* Floating modal para sa concerns stuffs from uyserr  new file */}
          {showConcernModal && (
            <StudentConcernsModal
              concerns={selectedConcern ? [selectedConcern] : concerns}
              onClose={() => setShowConcernModal(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
