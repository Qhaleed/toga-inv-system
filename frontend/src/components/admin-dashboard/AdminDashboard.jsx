import React from "react";
import { GroupBarChart } from "@/components/ui/GroupBarChart";
import { RadialChart } from "../ui/radialchart";

function AdminDashboard() {
  return (
    <div className="grid grid-cols-1 animate-fade-in gap-2 sm:grid-cols-1 lg:grid-cols-3 grid-rows-2 h-[88vh] min-h-[800px]  max-h-[820px] w-full overflow-x-hidden">
      {/* Row 1 */}

      <div className=" flex  h-[350px] md:h-[400px] ">
        <div className="grid grid-cols-2 gap-5 h-full  grid-rows-2  pt-15  px-2 w-100">
          {/* First cell in row 1, spans two columns and two rows */}
          <div className="dashboard-card relative flex rounded-[30px]  w-full h-full">
            <p className="w-10 text-[12px] font-bold ml-4 mt-2">
              Stocks Available
            </p>
            <RadialChart />
          </div>
          <div className="dashboard-card flex rounded-[30px] shadow-lg items-center justify-center w-full h-full"></div>
          <div className="dashboard-card  rounded-[30px] shadow-lg"> asds</div>
          <div className="dashboard-card  rounded-[30px] shadow-lg"> asds</div>
        </div>
      </div>

      <div className=" md:h-[400px] pt-15 px-3 flex  ">
        <div className="flex w-full h-full bg-white rounded-[30px] shadow-lg  "></div>
      </div>
      {/* Vertically connected column for three and six */}
      <div className="bg-gradient-to-b flex flex-col items-center justify-between row-span-2 rounded-tr-[30px] lg:rounded-r-[30px] rounded-br-[30px] text-xs font-bold max-h-[840px] shadow-lg">
        <div className="flex-1 flex  w-full">
          <div className="bg-white rounded-[30px]  w-full h-full shadow-lg">
            {" "}
            asdas
          </div>
        </div>
      </div>
      {/* Row 2 */}
      <div className=" block mt-1 rounded-bl-[30px] text-xs font-bold min-h-[80px]  shrink-0 h-fill col-span-2">
        <div className=" w-full h-full">
          <div className="bg-white relative rounded-[30px] flex items-center justify-center w-full h-full">
            <GroupBarChart />
          </div>
        </div>
      </div>
      {/* The third cell in row 2 is now merged above */}
    </div>
  );
}

export default AdminDashboard;
