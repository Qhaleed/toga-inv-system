import React from "react";
import { GroupBarChart } from "@/components/ui/GroupBarChart";
import { RadialChart } from "../ui/radialchart";
import { PendingRadial } from "../ui/pendingradial";
import { EvaluationRadial } from "../ui/evaluationradial";
import { CheckedOutRadial } from "../ui/checkedoutradial";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function AdminDashboard() {
  return (
    <div className="flex flex-col overflow-auto  gap-4 py-2 md:gap-6 md:py- h-full ">
      {/* SectionCards: 4 boxes */}
      <div className="grid grid-cols-1   md:grid-cols-2 xl:grid-cols-4 gap-4 px-4 lg:px-6">
        {/* 1st box section */}
        <div className="bg-white shadow-xl rounded-2xl  lg:max-h-[10rem] 2xl:max-w-[105rem]  h-[20rem]  md:min-w-[11rem] md:h-[10rem] lg:min-h-[10rem] text-white ">
          <div className="flex w-full h-full ">
            {/* 1st box */}
            <div className="bg-amber-500  h-full flex flex-col w-40 text-black">
              <div className="bg-amber-400 flex justify-center items-center ml-3 mt-5 rounded-xl w-15 h-15">
                Icon
              </div>
              <span className="text-lg mt-2 ml-3">Statistics</span>
            </div>
            <div className=" h-full w-full bg-green-900 ">
              <div className=" bg-red-200 h-10 items-center flex w-full">
                <p> Stocks Available</p>
              </div>
              <div className=" bg-red-100 h-20 text-3xl font-black  text-black w-full">
                156
              </div>
              <div className="flex justify-end items-center pr-5 bg-violet-200 h-10 ">
                <p>View Report</p>
              </div>
            </div>
          </div>
        </div>
        {/* 2nd box section */}
        <div className="bg-white shadow-xl rounded-2xl  lg:max-h-[10rem] 2xl:max-w-[105rem]  h-[20rem]  md:min-w-[11rem] md:h-[10rem] lg:min-h-[10rem] text-white ">
          <div className="flex w-full h-full ">
            {/* 2nd box */}
            <div className="bg-amber-500  h-full flex flex-col w-40 text-black">
              <div className="bg-amber-400 flex justify-center items-center ml-3 mt-5 rounded-xl w-15 h-15">
                Icon
              </div>
              <span className="text-lg mt-2 ml-3">Statistics</span>
            </div>
            <div className=" h-full w-full bg-green-900 ">
              <div className=" bg-red-200 h-10 items-center flex w-full">
                <p> Stocks Available</p>
              </div>
              <div className=" bg-red-100 h-20 text-3xl font-black  text-black w-full">
                156
              </div>
              <div className="flex justify-end items-center pr-5 bg-violet-200 h-10 ">
                <p>View Report</p>
              </div>
            </div>
          </div>
        </div>
        {/* 3rd box section */}
        <div className="bg-white shadow-xl rounded-2xl lg:max-h-[10rem] 2xl:max-w-[105rem]  h-[20rem] md:min-w-[11rem]   md:h-[10rem] lg:min-h-[10rem] text-white ">
          <div className="bg-white shadow-xl rounded-2xl  lg:max-h-[10rem] 2xl:max-w-[105rem]  h-[20rem]  md:min-w-[11rem] md:h-[10rem] lg:min-h-[10rem] text-white ">
            <div className="flex w-full h-full ">
              {/* 3rd box */}
              <div className="bg-amber-500  h-full flex flex-col w-40 text-black">
                <div className="bg-amber-400 flex justify-center items-center ml-3 mt-5 rounded-xl w-15 h-15">
                  Icon
                </div>
                <span className="text-lg mt-2 ml-3">Statistics</span>
              </div>
              <div className=" h-full w-full bg-green-900 ">
                <div className=" bg-red-200 h-10 items-center flex w-full">
                  <p> Stocks Available</p>
                </div>
                <div className=" bg-red-100 h-20 text-3xl font-black  text-black w-full">
                  156
                </div>
                <div className="flex justify-end items-center pr-5 bg-violet-200 h-10 ">
                  <p>View Report</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between"></div>
        </div>
        {/* 4th box section */}
        <div className="bg-white shadow-xl rounded-2xl lg:max-h-[10rem] 2xl:max-w-[105rem]  h-[20rem]  md:h-[10rem] lg:min-h-[10rem] text-white ">
          <div className="bg-white shadow-xl rounded-2xl  lg:max-h-[10rem] 2xl:max-w-[105rem]  h-[20rem]  md:min-w-[11rem] md:h-[10rem] lg:min-h-[10rem] text-white ">
            <div className="flex w-full h-full ">
              {/* 4th box */}
              <div className="bg-amber-500  h-full flex flex-col w-40 text-black">
                <div className="bg-amber-400 flex justify-center items-center ml-3 mt-5 rounded-xl w-15 h-15">
                  Icon
                </div>
                <span className="text-lg mt-2 ml-3">Statistics</span>
              </div>
              <div className=" h-full w-full bg-green-900 ">
                <div className=" bg-red-200 h-10 items-center flex w-full">
                  <p> Stocks Available</p>
                </div>
                <div className=" bg-red-100 h-20 text-3xl font-black  text-black w-full">
                  156
                </div>
                <div className="flex justify-end items-center pr-5 bg-violet-200 h-10 ">
                  <p>View Report</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* New box after the 4 boxes */}
      <div className="bg-blue-200 rounded-xl shadow-lg px-4 py-8 mx-4 lg:mx-6 flex items-center justify-center min-h-[220px]">
        {/* New content here */}
        <span className="text-black font-bold text-lg">
          fixing pa responsiveness desktop to mobile ahhahahah
        </span>
      </div>
      {/* Chart area or other content */}
      <div className="px-4 lg:px-6">
        {/* ChartAreaInteractive or other content here */}
        <div className="bg-green-800 w-full h-40 flex items-center justify-center text-white">
          inayos ko ulit grid system pero admindashboard pa lng
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
