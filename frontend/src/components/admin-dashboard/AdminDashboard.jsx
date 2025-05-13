import React from "react";
import { GroupBarChart } from "@/components/ui/GroupBarChart";
import { RadialChart } from "../ui/radialchart";
import { PendingRadial } from "../ui/pendingradial";
import { EvaluationRadial } from "../ui/evaluationradial";
import { CheckedOutRadial } from "../ui/checkedoutradial";

function AdminDashboard({ adminName }) {
  // Only show the first word (before the first space)
  const firstName = adminName ? adminName.split(" ")[0] : "Admin";
  return (
    <div className="grid grid-cols-1 relative animate-fade-in gap-4 p sm:grid-cols-1 lg:grid-cols-3 grid-rows-2 h-[88vh]  w-full ">
      {/* Row 1 */}
      <div className=" flex bg-amber-300 pt-10  md-0 md:pt-0 md:pl-8 relative h-full ">
        <p className="absolute flex  text-lg md:text-2xl ml-4 top-0 font-semibold md:mt-2 md:ml-2">
          {`Welcome, ${firstName}! 👋🏻`}
        </p>
        <div className="grid md:grid-cols-2 gap-5 h-full grid-rows-2 grid-cols-2  md:grid-rows-2  md:pt-12   w-full">
          {/* First cell in row 1, spans two columns and two rows */}
          <div className="dashboard-card relative flex rounded-[30px] md:w-full md:h-full ">
            <p className="w-10 text-[12px] font-bold ml-4 mt-2">
              Stocks Available
            </p>
            <RadialChart />
          </div>
          <div className="dashboard-card relative flex rounded-[30px] shadow-lg  w-full h-full">
            <p className="w-10 text-[12px] font-bold ml-4 mt-2">
              Pending Status
            </p>
            <PendingRadial />
          </div>
          <div className="dashboard-card relative flex z-10 rounded-[30px] shadow-lg  w-full h-full">
            <p className="w-10 text-[13px] font-bold ml-4 mt-2">
              Evaluation Status
            </p>
            <EvaluationRadial />
          </div>
          <div className="dashboard-card  relative rounded-[30px] shadow-lg w-full h-full flex ">
            <p className="w-10 text-[13px] font-bold ml-4 mt-2">Checked Out</p>
            <CheckedOutRadial />
          </div>
        </div>
      </div>
      <div className=" h-full bg-green-300 pt-12 w-full flex  ">
        {/* <div className="flex w-full h-full  bg-white rounded-[30px] shadow-lg  ">
          asdsds
        </div> */}
      </div>
      {/* Vertically connected column for three and six */}
      <div className="  row-span-2  h-full min-h-0 bg-amber-500 text-xs font-bold ">
        {/* <div className="  h-full flex  justify-center w-full">
          <div className="bg-white rounded-[30px] w-30 h-30 shadow-lg">
            asdas
          </div>
        </div> */}
      </div>
      {/* Row 2 */}
      <div className=" flex mt-1  text-xs font-bold  bg-amber-600   h-full col-span-2">
        {/* <div className=" bg-yellow-800 w-full h-full">asdasd</div> */}
      </div>
      {/* The third cell in row 2 is now merged above */}
    </div>
  );
}

export default AdminDashboard;
