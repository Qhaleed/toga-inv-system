import React from "react";
import { GroupBarChart } from "@/components/ui/GroupBarChart";
import { RadialChart } from "../ui/radialchart";
import { PendingRadial } from "../ui/pendingradial";
import { EvaluationRadial } from "../ui/evaluationradial";
import { CheckedOutRadial } from "../ui/checkedoutradial";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import BoxIcon from "@/assets/icons/box.svg?react";
import Upstats from "@/assets/icons/upstat.svg?react";
import Downstats from "@/assets/icons/downstat.svg?react";
import List from "@/assets/icons/list.svg?react";
import Eval from "@/assets/icons/eval.svg?react";
import Time from "@/assets/icons/time.svg?react";

function AdminDashboard() {
  return (
    <div className="flex flex-col overflow-auto  gap-4 py-2 md:gap-4 md:py- h-full ">
      {/* SectionCards: 4 boxes */}
      <div className="grid grid-cols-1   md:grid-cols-2 xl:grid-cols-4 gap-3 px-4 lg:px-6">
        {/* 1st box section */}
        <div className="bg-white shadow-xl rounded-2xl  lg:max-h-[10rem] 2xl:max-w-[105rem]  h-[20rem]  md:min-w-[11rem] md:h-[9rem] lg:min-h-[9rem] text-white ">
          <div className="flex w-full h-full ">
            {/* 1st box */}
            <div className="  h-full flex flex-col w-40 text-black">
              <div className="bg-[#CFE1FF] flex justify-center items-center ml-3 mt-5 rounded-xl w-12 h-12">
                <BoxIcon className="w-6 h-6  text-blue-700" />
              </div>
              <span className="text-lg flex  text-center items-center mt-8 ml-4">
                <Upstats className="w-4  " />
                <p className="text-[#0DDF65] font-semibold text-xs ml-1">4%</p>
              </span>
            </div>
            <div className=" h-full w-full  ">
              <div className="  h-10 items-center flex w-full">
                <p className="text-sm text-gray-500 font-semibold">
                  Current Stock
                </p>
              </div>
              <div className=" h-20 text-3xl font-black  text-black w-full">
                12
              </div>
              <div className="flex justify-end items-center pr-4  h-3 ">
                <p className="text-blue-500 transition-all duration-200 cursor-pointer ease-in-out hover:scale-105  text-xs font-semibold">
                  View Report
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* 2nd box section */}
        <div className="bg-white shadow-xl rounded-2xl  lg:max-h-[10rem] 2xl:max-w-[105rem]  h-[20rem]  md:min-w-[11rem] md:h-[9rem] lg:min-h-[9rem] text-white ">
          <div className="flex w-full h-full ">
            {/* 1st box */}
            <div className="  h-full flex flex-col w-40 text-black">
              <div className="bg-[#CFE1FF] flex justify-center items-center ml-3 mt-5 rounded-xl w-12 h-12">
                <List className="w-6 h-6  text-blue-700" />
              </div>
              <span className="text-lg flex  text-center items-center mt-8 ml-4">
                <Upstats className="w-4  " />
                <p className="text-[#0DDF65] font-semibold text-xs ml-1">4%</p>
              </span>
            </div>
            <div className=" h-full w-full  ">
              <div className="  h-10 items-center flex w-full">
                <p className="text-sm text-gray-500 font-semibold">Reserved</p>
              </div>
              <div className=" h-20 text-3xl font-black  text-black w-full">
                51
              </div>
              <div className="flex justify-end items-center pr-4  h-3 ">
                <p className="text-blue-500 transition-all duration-200 cursor-pointer ease-in-out hover:scale-105  text-xs font-semibold">
                  View Report
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* 3rd box section */}
        <div className="bg-white shadow-xl rounded-2xl  lg:max-h-[10rem] 2xl:max-w-[105rem]  h-[20rem]  md:min-w-[11rem] md:h-[9rem] lg:min-h-[9rem] text-white">
          <div className="bg-white shadow-xl rounded-2xl  lg:max-h-[10rem] 2xl:max-w-[105rem]  h-[20rem]  md:min-w-[11rem] md:h-[9rem] lg:min-h-[9rem] text-white">
            <div className="flex w-full h-full ">
              {/* 1st box */}
              <div className="  h-full flex flex-col w-40 text-black">
                <div className="bg-[#CFE1FF] flex justify-center items-center ml-3 mt-5 rounded-xl w-12 h-12">
                  <Time className="w-6 h-6  text-blue-700" />
                </div>
                <span className="text-lg flex  text-center items-center mt-8 ml-4">
                  <Downstats className="w-4  " />
                  <p className="text-[#FF5757] font-semibold text-xs ml-1">
                    4%
                  </p>
                </span>
              </div>
              <div className=" h-full w-full  ">
                <div className="  h-10 items-center flex w-full">
                  <p className="text-sm text-gray-500 font-semibold">Pending</p>
                </div>
                <div className=" h-20 text-3xl font-black  text-black w-full">
                  143
                </div>
                <div className="flex justify-end items-center pr-4  h-3 ">
                  <p className="text-blue-500 transition-all duration-200 cursor-pointer ease-in-out hover:scale-105  text-xs font-semibold">
                    View Report
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between"></div>
        </div>
        {/* 4th box section */}
        <div className="bg-white shadow-xl rounded-2xl  lg:max-h-[10rem] 2xl:max-w-[105rem]  h-[20rem]  md:min-w-[11rem] md:h-[9rem] lg:min-h-[9rem] text-white">
          <div className="flex w-full h-full ">
            {/* 1st box */}
            <div className="  h-full flex flex-col w-40 text-black">
              <div className="bg-[#CFE1FF] flex justify-center items-center ml-3 mt-5 rounded-xl w-12 h-12">
                <Eval className="w-7 h-7  text-blue-700" />
              </div>
              <span className="text-lg flex  text-center items-center mt-8 ml-4">
                <Downstats className="w-4  " />
                <p className="text-[#FF5757] font-semibold text-xs ml-1">4%</p>
              </span>
            </div>
            <div className=" h-full w-full  ">
              <div className="  h-10 items-center flex w-full">
                <p className="text-sm text-gray-500 font-semibold">Evaluated</p>
              </div>
              <div className=" h-20 text-3xl font-black  text-black w-full">
                4
              </div>
              <div className="flex justify-end items-center pr-4  h-3 ">
                <p className="text-blue-500 transition-all duration-200 cursor-pointer ease-in-out hover:scale-105  text-xs font-semibold">
                  View Report
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2nd row: 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-4 px-4 lg:px-6">
        <div className="bg-blue-200 rounded-xl shadow-lg px-4 py-8 flex items-center justify-center min-h-[220px]">
          <span className="text-black font-semibold text-lg">
            fixing pa responsiveness desktop to mobile ahhahahah
          </span>
        </div>
        <div className="bg-blue-300 rounded-xl shadow-lg px-4 py-8 flex items-center justify-center min-h-[220px]">
          <span className="text-black font-semibold text-lg">
            2nd column content
          </span>
        </div>
      </div>
      {/* 3rd row: 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr_1.5fr] min-h-[250px]  gap-4 px-4 lg:px-6 ">
        <div className="bg-green-800 w-full  flex items-center justify-center text-white rounded-xl">
          inayos ko ulit grid system pero admindashboard pa lng
        </div>
        <div className="bg-green-700 w-full flex items-center justify-center text-white rounded-xl">
          2nd col
        </div>
        <div className="bg-green-600 w-fullflex items-center justify-center text-white rounded-xl">
          3rd col
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
