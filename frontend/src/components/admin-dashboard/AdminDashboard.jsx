import React, { useEffect, useState } from "react";
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
  Group,
  BarChart3, // Retained from previous
  CheckCircle, // Added for Items Overview
  AlertCircle, // Added for Items Overview
  // Tools, // Alternative for "For Repair" if needed later
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
// import StudentConcernsModal from "./StudentConcernsModal";

function AdminDashboard() {
  const navigate = useNavigate();
  // const [showConcernModal, setShowConcernModal] = useState(false);
  // const [selectedConcern, setSelectedConcern] = useState(null);
  //default is 0 since need number ang value not string
  const [totalPending, setTotalPending] = useState(0); //state for total pending
  const [totalEvaluated, setTotalEvaluated] = useState(0); //state for total evaluated
  const [totalReservation, setTotalReservation] = useState(0); //state for total reservation
  const [totalStock, setTotalStock] = useState(0); // state for total stock
  const [items, setItems] = useState([]); // state for items data
  const [inventoryData, setInventoryData] = useState([]); // state to store all inventory data
  const [latestRegistrations, setLatestRegistrations] = useState([]); // state for latest registrations
  const [pendingApprovals, setPendingApprovals] = useState([]); // state for pending approvals
  const [inventoryStats, setInventoryStats] = useState({
    total: 0,
    returned: 0,
    notReturned: 0,
    overdue: 0,
    evaluated: 0,
    notEvaluated: 0,
    courses: {},
  });
  const [itemsStats, setItemsStats] = useState({
    returnStatus: {
      returned: 0,
      notReturned: 0,
    },
    itemStatus: {
      goodCondition: 0,
      forRepair: 0,
      damaged: 0,
    },
    itemTypes: {},
  });

  //get data from backend para sa mga total value ng mga stuff (items,pending,reservation)
  useEffect(() => {
    // Fetch inventory data
    fetch("http://localhost:5001/inventory")
      .then((res) => res.json())
      .then((data) => {
        setInventoryData(data); // Store all inventory data
        setTotalPending(
          data.filter((item) => item.status === "Pending").length
        ); //get total number ng may status na "Pending"
        setTotalEvaluated(
          data.filter((item) => item.evaluation_status === "Evaluated").length
        ); //get total number ng may evaluation_status na "Evaluated"
        setTotalReservation(data.filter((item) => item.rent_date).length); // get total number ng may rent_date na not null/undefined/or empty string

        // Get latest 4 registrations based on rent_date
        const sortedRegistrations = [...data]
          .filter((item) => item.rent_date) // Only items with a rent_date
          .sort((a, b) => new Date(b.rent_date) - new Date(a.rent_date)) // Sort by date (newest first)
          .slice(0, 4); // Get only the first 4

        setLatestRegistrations(sortedRegistrations);

        // Get pending approvals sorted alphabetically by first_name
        const pendingItems = data
          .filter((item) => item.status === "Pending")
          .sort((a, b) => {
            // Sort alphabetically by first name
            if (a.first_name && b.first_name) {
              return a.first_name.localeCompare(b.first_name);
            }
            return 0;
          })
          .slice(0, 3); // Get only the first 2

        setPendingApprovals(pendingItems);

        // Calculate inventory statistics
        const activeInventory = data.filter((item) => item.inventory_id !== null);
        const returnedCount = data.filter(
          (item) => item.return_status === "Returned"
        ).length;
        const notReturnedCount = data.filter(
          (item) => item.return_status === "Not Returned"
        ).length;
        const overdueCount = data.filter((item) => item.is_overdue === 1).length;
        const evaluatedCount = data.filter(
          (item) => item.evaluation_status === "Evaluated"
        ).length;
        const notEvaluatedCount = data.filter(
          (item) => item.evaluation_status === "Not Evaluated"
        ).length;

        // Count by courses
        const courseStats = data.reduce((acc, item) => {
          if (item.course) {
            acc[item.course] = (acc[item.course] || 0) + 1;
          }
          return acc;
        }, {});

        setInventoryStats({
          total: activeInventory.length,
          returned: returnedCount,
          notReturned: notReturnedCount,
          overdue: overdueCount,
          evaluated: evaluatedCount,
          notEvaluated: notEvaluatedCount,
          courses: courseStats,
        });
      });

    // Fetch items data
    fetch("http://localhost:5001/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        // Calculate total stock by summing up the quantities of all items
        const totalQty = data.reduce((total, item) => total + item.quantity, 0);
        setTotalStock(totalQty);

        // Calculate item statistics
        const returnStats = { returned: 0, notReturned: 0 };
        const statusStats = { goodCondition: 0, forRepair: 0, damaged: 0 };
        const itemTypeStats = {}; // Calculation for itemTypeStats can remain if needed elsewhere
        data.forEach(item => {
          if (item.return_status === "Returned") returnStats.returned += item.quantity;
          else if (item.return_status === "Not Returned") returnStats.notReturned += item.quantity;

          if (item.item_status === "In Good Condition") statusStats.goodCondition += item.quantity;
          else if (item.item_status === "For Repair") statusStats.forRepair += item.quantity;
          else if (item.item_status === "Damaged") statusStats.damaged += item.quantity;

          // Item type stats calculation (can be kept for other uses)
          const typeKey = item.item_type;
          if (!itemTypeStats[typeKey]) {
            itemTypeStats[typeKey] = {
              total: 0, returned: 0, notReturned: 0,
              goodCondition: 0, forRepair: 0, damaged: 0,
            };
          }
          itemTypeStats[typeKey].total += item.quantity;
          if (item.return_status === "Returned") itemTypeStats[typeKey].returned += item.quantity;
          else if (item.return_status === "Not Returned") itemTypeStats[typeKey].notReturned += item.quantity;
          if (item.item_status === "In Good Condition") itemTypeStats[typeKey].goodCondition += item.quantity;
          else if (item.item_status === "For Repair") itemTypeStats[typeKey].forRepair += item.quantity;
          else if (item.item_status === "Damaged") itemTypeStats[typeKey].damaged += item.quantity;
        });
        setItemsStats({
          returnStatus: returnStats,
          itemStatus: statusStats,
          itemTypes: itemTypeStats,
        });
      });
  }, []);

  // Group items by type for chart display
  /*const itemsByType = items.reduce((acc, item) => {
    if (!acc[item.item_type]) {
      acc[item.item_type] = 0;
    }
    acc[item.item_type] += item.quantity;
    return acc;
  }, {});
  */

  return (
    <div className="flex flex-col overflow-auto gap-4 py-2 md:gap-4 md:pb-10 h-full w-full min-h-0 mb-8">
      <div className="md:h-4 hidden items-start md:flex">
        <p className="ml-6 font-bold 2xl:text-2xl xl:text-xl">{`Welcome, Admin! 👋🏻`}</p>
      </div>
      {/* SectionCards: 4 boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 sm:mt:5 md:mt-0 mt-10 gap-3 px-4 lg:px-6">
        {/* 1st box section */}
        <div className="bg-white shadow-xl rounded-2xl lg:max-h-[10rem] 2xl:max-w-[105rem] max-w-[25rem] sm:max-w-[105rem] mh-[12rem] md:min-w-[11rem] md:h-[8rem] lg:min-h-[8rem] text-white cursor-pointer outline-none">
          <div className="flex w-full h-full ">
            {/* 1st box */}
            <div className="h-full flex flex-col w-40 sm:w-75 md:w-40 text-black">
              <button
                className="bg-[#CFE1FF] flex justify-center items-center mt-10 ml-3 sm:ml-3 sm:mt-5  rounded-xl md:w-12 md:h-12 sm:w-40 sm:h-40 w-20 h-20 focus:outline-none transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg focus:scale-105 focus:shadow-lg"
                onClick={() => navigate("/inventory")}
                tabIndex={0}
                aria-label="Go to Inventory"
              >
                <BoxIcon className="sm:w-20 sm:h-20 w-12 h-12 md:w-6 md:h-6 cursor-pointer text-blue-700" />
              </button>
              <span className="text-lg flex text-center items-center  mt-8 ml-4">

              </span>
            </div>
            <div className="h-full w-full">
              <div className="h-20 md:h-10 items-center flex w-full">
                <p className="  text-md sm:text-lg md:text-sm text-gray-500 font-semibold">
                  Current Stock
                </p>
              </div>
              <div className="h-20   text-5xl sm:text-6xl md:text-3xl font-black  text-[#102F5E] w-full">
                {totalStock}
              </div>
              <div className="flex justify-end items-end pr-4 md:pb-6 pb-3 h-10 sm:h-30 md:h-0">
                <button
                  className="self-end mt-1  md:text-xs  text-lg  sm:text-xl text-blue-600 hover:underline focus:underline font-semibold bg-transparent border-none outline-none cursor-pointer"
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
        <div className="bg-white shadow-xl rounded-2xl lg:max-h-[10rem] 2xl:max-w-[105rem] max-w-[25rem] sm:max-w-[105rem] mh-[12rem] md:min-w-[11rem] md:h-[8rem] lg:min-h-[8rem] text-white cursor-pointer outline-none">
          <div className="flex w-full h-full ">
            {/* 2nd box */}
            <div className="h-full flex flex-col w-40 sm:w-75 md:w-40 text-[#102F5E]">
              <button
                className="bg-[#CFE1FF] flex justify-center items-center mt-10 ml-3 sm:ml-3 sm:mt-5 rounded-xl md:w-12 md:h-12 sm:w-40 sm:h-40 w-20 h-20 focus:outline-none transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg focus:scale-105 focus:shadow-lg"
                onClick={() => navigate("/reservation")}
                tabIndex={0}
                aria-label="Go to Reservation"
              >
                <List className="sm:w-20 sm:h-20 w-12 h-12 md:w-6 md:h-6 cursor-pointer text-blue-700" />
              </button>
              <span className="text-lg flex text-center items-center mt-8 ml-4">

              </span>
            </div>
            <div className="h-full w-full">
              <div className="h-20 md:h-10 items-center flex w-full">
                <p className="text-md sm:text-lg md:text-sm text-gray-500 font-semibold">
                  Reserved
                </p>
              </div>
              <div className="h-20   text-5xl sm:text-6xl md:text-3xl font-black text-[#102F5E] w-full">
                {totalReservation}
              </div>
              <div className="flex justify-end items-end pr-4 md:pb-6 pb-3 h-10 sm:h-30 md:h-0">
                <button
                  className="self-end mt-1  md:text-xs text-lg sm:text-xl text-blue-600 hover:underline focus:underline font-semibold bg-transparent border-none outline-none cursor-pointer"
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
        <div className="bg-white shadow-xl rounded-2xl lg:max-h-[10rem] 2xl:max-w-[105rem] max-w-[25rem] sm:max-w-[105rem] mh-[12rem] md:min-w-[11rem] md:h-[8rem] lg:min-h-[8rem] text-white  outline-none">
          <div className="flex w-full h-full ">
            {/* 3rd box */}
            <div className="h-full flex flex-col w-40 sm:w-75 md:w-40 text-black">
              <button
                className="bg-[#CFE1FF] flex justify-center items-center mt-10 ml-3 sm:ml-3 sm:mt-5  rounded-xl md:w-12 md:h-12 sm:w-40 sm:h-40 w-20 h-20 focus:outline-none transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg focus:scale-105 focus:shadow-lg"
                onClick={() => navigate("/pending")}
                tabIndex={0}
                aria-label="Go to Pending"
              >
                <Time className="sm:w-20 sm:h-20 w-12 h-12 md:w-6 md:h-6 cursor-pointer text-blue-700" />
              </button>
              <span className="text-lg flex text-center items-center mt-8 ml-4">

              </span>
            </div>
            <div className="h-full w-full">
              <div className="h-20 md:h-10 items-center flex w-full">
                <p className="text-md sm:text-lg md:text-sm text-gray-500 font-semibold">
                  Pending
                </p>
              </div>
              <div className="h-20   text-5xl sm:text-6xl md:text-3xl font-black text-[#102F5E] w-full">
                {totalPending}
              </div>
              <div className="flex justify-end items-end pr-4 md:pb-6 pb-3 h-10 sm:h-30 md:h-0">
                <button
                  className="self-end mt-1  md:text-xs  text-lg  sm:text-xl text-blue-600 hover:underline focus:underline font-semibold bg-transparent border-none outline-none cursor-pointer"
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
        <div className="bg-white shadow-xl rounded-2xl lg:max-h-[10rem] 2xl:max-w-[105rem] max-w-[25rem] sm:max-w-[105rem] mh-[12rem] md:min-w-[11rem] md:h-[8rem] lg:min-h-[8rem] text-white  outline-none">
          <div className="flex w-full h-full ">
            {/* 4th box */}
            <div className="h-full flex flex-col w-40 sm:w-75 md:w-40 text-black">
              <button
                className="bg-[#CFE1FF] flex justify-center items-center mt-10 ml-3 sm:ml-3 sm:mt-5  rounded-xl md:w-12 md:h-12 sm:w-40 sm:h-40 w-20 h-20 focus:outline-none transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg focus:scale-105 focus:shadow-lg"
                onClick={() => navigate("/evaluation-page")}
                tabIndex={0}
                aria-label="Go to Evaluation"
              >
                <Eval className="sm:w-24 sm:h-24 w-12 h-12 md:w-7 md:h-7 cursor-pointer text-blue-700" />
              </button>
              <span className="text-lg flex text-center items-center mt-8 ml-4">

              </span>
            </div>
            <div className="h-full w-full">
              <div className="h-20 md:h-10 items-center flex w-full">
                <p className="text-md sm:text-lg md:text-sm text-gray-500 font-semibold">
                  Evaluated
                </p>
              </div>
              <div className="h-20   text-5xl sm:text-6xl md:text-3xl font-black text-[#102F5E] w-full">
                {totalEvaluated}
              </div>
              <div className="flex justify-end items-end pr-4 md:pb-6 pb-3 h-10 sm:h-30 md:h-0">
                <button
                  className="self-end mt-1  md:text-xs text-lg sm:text-xl text-blue-600 hover:underline focus:underline font-semibold bg-transparent border-none outline-none cursor-pointer"
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
        <div className="bg-white rounded-xl shadow-lg rlative  flex items-center justify-center   max-h-[350px]  transition-all duration-700 ease-in-out hover:scale-102 hover:shadow-2xl focus:scale-102 focus:shadow-2xl  outline-none">
          <GroupBarChart />
        </div>
        <div className="bg-white relative rounded-xl flex flex-col min-h-[350px] shadow-lg max-h-[380px] outline-none">
          <p className="text-lg  font-extrabold !font-manjari  pl-5 pt-5 h-10 flex items-center text-start">
            Overview of Items
          </p>
          <div className="w-full  flex justify-start min-h-[180px] max-h-[200px] overflow-hidden">
            <DashboardPie />
          </div>
        </div>
      </div>
      {/* 3rd row: 3 columns */}
      <div className="flex flex-wrap gap-4 px-4 lg:px-6 w-full">
        {/* 1st col: New Users Registered */}
        <div className="bg-white w-full md:w-[32%] flex flex-col rounded-xl shadow-lg p-4 min-h-[200px] flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-gray-700">
              New Users Registered
            </h3>
            <button
              className="text-xs text-blue-600 font-semibold hover:underline focus:underline transition"
              onClick={() => navigate("/reservation")}
            >
              View All
            </button>
          </div>
          <ul className="flex flex-col gap-3">
            {latestRegistrations.length > 0 ? (
              latestRegistrations.map((user, index) => {
                // Calculate time difference
                const rentDate = new Date(user.rent_date);
                const now = new Date();
                const diffTime = Math.abs(now - rentDate);
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                const diffHours = Math.floor(
                  (diffTime / (1000 * 60 * 60)) % 24
                );
                const diffMinutes = Math.floor((diffTime / (1000 * 60)) % 60);

                let timeAgo;
                if (diffDays > 0) {
                  timeAgo = `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
                } else if (diffHours > 0) {
                  timeAgo = `${diffHours} hr${diffHours > 1 ? "s" : ""} ago`;
                } else {
                  timeAgo = `${diffMinutes} min${diffMinutes > 1 ? "s" : ""
                    } ago`;
                }

                // Create full name for avatar
                const fullName = `${user.first_name} ${user.surname}`;

                return (
                  <li
                    key={index}
                    className="flex items-center gap-3 border-b pb-2 last:border-b-0 hover:bg-blue-50 rounded-lg transition"
                  >
                    <img
                      src={`https://ui-avatars.com/api/?name=${user.first_name}+${user.surname}`}
                      alt={fullName}
                      className="w-10 h-10 rounded-full bg-gray-200 border-2 border-blue-200 shadow"
                    />
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="font-semibold text-gray-800 truncate">
                        {fullName}
                      </span>
                      <span className="text-xs text-gray-400 truncate">
                        {timeAgo}
                      </span>
                      <span className="text-xs text-blue-700 font-medium truncate">
                        {user.course}
                      </span>
                    </div>
                    <span className="ml-auto px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      New
                    </span>
                  </li>
                );
              })
            ) : (
              <li className="text-center py-4 text-gray-500">
                No recent registrations found
              </li>
            )}
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
            {pendingApprovals.length > 0 ? (
              pendingApprovals.map((item, index) => (
                <li
                  key={index}
                  className="flex flex-col gap-1 border-b pb-2 last:border-b-0"
                >
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                    <span className="font-semibold text-gray-800">
                      {item.first_name} {item.surname}
                    </span>
                    <span className="ml-auto px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                      New
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 ml-4">
                    ID: {item.id_number}
                  </div>
                  <div className="text-xs text-gray-500 ml-4">
                    Course: {item.course}
                  </div>
                  <div className="flex gap-2 ml-4 mt-1">

                  </div>
                </li>
              ))
            ) : (
              <li className="text-center py-4 text-gray-500">
                No approval requests found
              </li>
            )}
          </ul>
        </div>
        {/* 3rd col: Items Overview (Replaces Inventory Overview) */}
        <div className="bg-white w-full md:w-[32%] flex flex-col rounded-xl shadow-lg p-4 min-h-[350px] flex-1">
          <h3 className="text-lg font-bold text-gray-700 mb-2 flex items-center justify-between">
            Items Overview
            <button
              className="md:text-xs text-2xl text-blue-600 hover:underline focus:underline font-semibold ml-2 cursor-pointer"
              onClick={() => navigate("/inventory")} // Or a more specific items page if available
              aria-label="View Full Items Report"
            >
              <ArrowRight className="w-5 h-5 inline-block" />
            </button>
          </h3>
          <div className="flex flex-col gap-4 h-full">
            {/* Item statistics cards */}
            <div className="grid grid-cols-2 gap-3 flex-1">
              <div className="bg-green-50 p-4 rounded-lg shadow-md flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Returned Items</p>
                  <p className="text-lg font-bold text-[#102F5E]">
                    {itemsStats.returnStatus.returned}
                  </p>
                </div>
                <TrendingUpIcon className="w-8 h-8 text-green-600" />
              </div>
              <div className="bg-red-50 p-4 rounded-lg shadow-md flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Not Returned Items</p>
                  <p className="text-lg font-bold text-[#102F5E]">
                    {itemsStats.returnStatus.notReturned}
                  </p>
                </div>
                <TrendingDownIcon className="w-8 h-8 text-red-600" />
              </div>
              <div className="bg-blue-50 p-4 rounded-lg shadow-md flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Good Condition</p>
                  <p className="text-lg font-bold text-[#102F5E]">
                    {itemsStats.itemStatus.goodCondition}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg shadow-md flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Items for Repair </p>
                  <p className="text-lg font-bold text-[#102F5E]">
                    {itemsStats.itemStatus.forRepair + itemsStats.itemStatus.damaged}
                  </p>
                </div>
                <AlertCircle className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            {/* Chart for item status */}
            <div className="flex-1">
              <RadialChart
                data={[
                  {
                    label: "Good",
                    value: itemsStats.itemStatus.goodCondition,
                    color: "#4CAF50", // Green
                  },
                  {
                    label: "Repair",
                    value: itemsStats.itemStatus.forRepair,
                    color: "#FFC107", // Amber
                  },
                  {
                    label: "Damaged",
                    value: itemsStats.itemStatus.damaged,
                    color: "#F44336", // Red
                  },
                ]}
                totalValue={
                  itemsStats.itemStatus.goodCondition +
                  itemsStats.itemStatus.forRepair +
                  itemsStats.itemStatus.damaged
                }
                labelColor="#fff" // Adjust as needed for visibility
                className="mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
