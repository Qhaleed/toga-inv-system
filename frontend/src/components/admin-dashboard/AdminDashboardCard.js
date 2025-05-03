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
    <div className="h-screen  w-screen flex bg-[#EBEBEB] font-figtree font-medium">
      {/* Responsive: Sidebar above navbar on small screens, left on large screens */}
      <div className="w-full lex-col sm:grid sm:grid-cols-4 ">
        {/* Sidebar: full width above navbar on small screens, left on large screens */}
        <div className="w-full sm:col-span-1 ">
          {/* Always show sidebar on large screens, toggle on small screens */}
          <SideBar alwaysShowOnLarge setSortOrder={setSortOrder} />
        </div>

        {/* Main content: below sidebar on small screens, right of sidebar on large screens */}
        <div className="flex-1 sm:col-span-3 h-full">
          <div
            className="w-full flex flex-col items-center"
            style={{ maxWidth: "100vw" }}
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
