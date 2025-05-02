import React, { useState } from "react";
import Table from "../common/Table";
import EvaluationTable from "../evaluation/EvaluationTable";
import SideBar from "../common/SideBar";
import NavBar from "../common/NavBar";

const AdminDashboardCard = () => {
  // SO MAY STATES TYO DALAWA GRID PTI COLUMNS
  const [isGrid, setIsGrid] = useState(false);
  const [modifyTable, setmodifyTable] = useState(false);

  return (
      <div className="sm:h-screen  hidden sm:overflow-hidden sm:block sm:w-screen sm:fixed sm:bg-[#EBEBEB] font-figtree  sm:font-medium">

      
      {/* ETo pinaka root Container niggas*/}

      <div className="h-screen fixed sm:w-screen grid grid-cols-4"> {/*<div className="h-screen fixed w-screen grid-cols-4 border border-red-500">*/}
        <SideBar /> 


        <div className="col-span-3   h-full">


          {/* Right Container */}
          <div className="w-full flex flex-col items-center" style={{ maxWidth: "100%" }}>


            <div className="w-full" style={{ height: "60px", marginBottom: "8px" }}>
              <NavBar isGrid={isGrid} setIsGrid={setIsGrid} modifyTable={modifyTable} setmodifyTable={setmodifyTable}/>
            </div>

            
            <div className="flex justify-center items-start w-full" style={{ height: "600px" }}>
               {/*<Table isGrid={isGrid} modifyTable={modifyTable}/> {/*Dashboard Table*/}
               <EvaluationTable isGrid={isGrid} modifyTable={modifyTable}/> {/*Evaluation Table*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardCard;
