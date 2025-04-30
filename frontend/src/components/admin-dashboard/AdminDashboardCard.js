import React, { useState } from "react";
import Table from "../common/Table";
import SideBar from "../common/SideBar";
import NavBar from "../common/NavBar";

const AdminDashboardCard = () => {
  // SO MAY STATES TYO DALAWA GRID PTI COLUMNS
  const [isGrid, setIsGrid] = useState(false);

  return (
    <div className="h-screen overflow-hidden w-screen fixed bg-[#EBEBEB] font-figtree font-medium">
      {" "}
      {/* ETo pinaka root Container niggas*/}
      <div className="h-screen fixed w-screen grid grid-cols-[0.9fr_3.1fr]">
        {" "}
        {/*Container of the Left and Right Containers*/}
        <SideBar /> {/* Left Container and SideBar */}
        <div className="col-span-1 h-full">
          {/* Right Container */}
          {/* Pass isGrid and setIsGrid to NavBar */}
          <NavBar isGrid={isGrid} setIsGrid={setIsGrid} />
          {/* Pass isGrid to Table */}
          <Table isGrid={isGrid} /> {/*Dashboard Table*/}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardCard;
