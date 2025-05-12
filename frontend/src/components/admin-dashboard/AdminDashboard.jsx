import React from "react";
function AdminDashboard() {
  return (
    <div className="grid grid-cols-1  gap-4 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 h-[88vh] min-h-[400px] w-full overflow-x-hidden">
      {/* Row 1 */}

      <div className=" flex  h-[350px] md:h-[400px] ">
        <div className="grid grid-cols-2 gap-5 h-full  grid-rows-2  pt-15  px-5 w-full">
          {/* First cell in row 1, spans two columns and two rows */}
          <div className="dashboard-card flex  rounded-[30px] shadow-lg">
            {" "}
            asds
          </div>
          <div className="dashboard-card  rounded-[30px] shadow-lg"> asds</div>
          <div className="dashboard-card  rounded-[30px] shadow-lg"> asds</div>
          <div className="dashboard-card  rounded-[30px] shadow-lg"> asds</div>
        </div>
      </div>

      <div className=" md:h-[400px] pt-15 px-3 flex  ">
        <div className="flex w-full h-full bg-white rounded-[30px] shadow-lg  ">
          ansdkjansdjks
        </div>
      </div>
      {/* Vertically connected column for three and six */}
      <div className="bg-gradient-to-b flex flex-col items-center justify-between row-span-2 rounded-tr-[30px] lg:rounded-r-[30px] rounded-br-[30px] text-xs font-bold min-h-[120px] shadow-lg">
        <div className="flex-1 flex  w-full">
          <div className="bg-white rounded-[30px]  w-full h-full shadow-lg">
            {" "}
            asdas
          </div>
        </div>
      </div>
      {/* Row 2 */}
      <div className=" mt-10 flex items-center justify-center rounded-bl-[30px] text-xs font-bold min-h-[100px] col-span-2">
        <div className="flex w-full h-full">
          <div className="bg-white rounded-[30px] flex items-center justify-center w-full h-full shadow-lg"></div>
        </div>
      </div>
      {/* The third cell in row 2 is now merged above */}
    </div>
  );
}

export default AdminDashboard;
