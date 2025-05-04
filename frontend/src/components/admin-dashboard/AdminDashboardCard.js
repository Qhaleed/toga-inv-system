import React, { useState } from "react";
import Table from "../common/Table";
import SideBar from "../common/SideBar";
import NavBar from "../common/NavBar";

const AdminDashboardCard = () => {
  // SO MAY STATES TYO DALAWA GRID PTI COLUMNS
  const [isGrid, setIsGrid] = useState(false);
  const [modifyTable, setmodifyTable] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sortOrder, setSortOrder] = useState(null); // Add sort state here

  return (
    <div className="h-fit w-screen relative fixed bg-[#EBEBEB] font-figtree font-medium">
      {/* responsive view____  > Sidebar above navbar on small screens, left on large screens */}
      <div className="max-w-full  relative fixed sm:grid sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-5   sm:gap-0 sm:top-0 sm:left-0 sm:h-screen sm:w-screen">
        {/* sidebar section _____> full width above navbar on small screens, left on large screens */}
        <div className="w-full sm:col-span-1 ">
          {/* Always show sidebar on large screens, toggle on small screens */}
          <SideBar alwaysShowOnLarge setSortOrder={setSortOrder} />
        </div>

        {/* MAIN CONTENT TO ____> below sidebar on small screens, right of sidebar on large screens */}
        <div className="flex-1 md:col-span-  xl:col-span-4 sm:col-span-2 overflow-x-clipped sm:overflow-x-visible col-span-1 h-full">
          <div
            className="w-full h-screen  overflow-hidden flex flex-col items-center"
            style={{ maxWidth: "screen" }}
          >
            <div
              className="w-full"
              style={{ height: "60px", marginBottom: "8px" }}
            >
              <NavBar
                isGrid={isGrid}
                setIsGrid={setIsGrid}
                modifyTable={modifyTable}
                setmodifyTable={setmodifyTable}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>
            <Table
              isGrid={isGrid}
              modifyTable={modifyTable}
              sortOrder={sortOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardCard;
