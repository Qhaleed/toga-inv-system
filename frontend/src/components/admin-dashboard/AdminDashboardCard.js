import React, { useState } from "react";
import Table from "../common/Table";
import SideBar from "../common/SideBar";
import NavBar from "../common/NavBar";

const AdminDashboardCard = () => {
  // SO MAY STATES TYO DALAWA GRID PTI COLUMNS
  const [isGrid, setIsGrid] = useState(false);

  return (
    <div className="h-screen overflow-hidden w-screen fixed bg-[#EBEBEB] font-figtree font-medium">
      {/* ETo pinaka root Container niggas*/}
      <div className="h-screen fixed w-screen" style={{ display: "flex" }}>
        <SideBar />
        <div className="flex-1 ml-[20vw] h-full">
          {/* Right Container */}
          <div
            className="w-full flex flex-col items-center"
            style={{ maxWidth: "98%" }}
          >
            <div
              className="w-full"
              style={{ height: "60px", marginBottom: "8px" }}
            >
              <NavBar isGrid={isGrid} setIsGrid={setIsGrid} />
            </div>
            <div
              className="flex justify-center items-start w-full"
              style={{ height: "600px" }}
            >
              <Table isGrid={isGrid} /> {/*Dashboard Table*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardCard;
