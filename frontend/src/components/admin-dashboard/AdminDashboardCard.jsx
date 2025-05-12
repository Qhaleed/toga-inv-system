import React, { useState } from "react";
import Table from "../common/Table";
import SideBar from "../navigations/SideBar";
import NavBar from "../navigations/NavBar";
import AdminDashboard from "./AdminDashboard"; // Import the AdminDashboard component

const AdminDashboardCard = () => {
  // States for grid and modifyTable
  const [isGrid, setIsGrid] = useState(false);
  const [modifyTable, setmodifyTable] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard"); // State for active tab

  return (
    <div className="h-fit w-screen relative bg-[#F3F9FF] font-figtree font-medium">
      {/* Responsive grid: sidebar above on mobile, left on desktop */}
      <div className="max-w-full relative grid grid-cols-1 sm:grid-cols-5 md:grid-cols- lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 sm:gap-0 sm:top-0 sm:left-0 sm:h-screen sm:w-screen">
        {/* Sidebar: full width above on mobile, left on desktop */}
        <div className="w-full sm:col-span-2 md:col-span-2 lg:col-span-1  overflow-hidden xl:col-span-1 2xl:col-span-1 bg-[#001C47] text-white hidden sm:block h-full">
          <SideBar alwaysShowOnLarge />
        </div>

        {/* Main content: full width on mobile, right of sidebar on desktop */}
        <div className="w-full flex-1 md:col-span-3 xl:col-span-3 overflow-hidden 2xl:col-span-4 sm:col-span-3 col-span-1 h-full">
          <div
            className="w-full min-h-screen flex flex-col items-center"
            style={{ maxWidth: "100vw" }}
          >
            <div
              className="w-full"
              style={{ height: "40px", marginBottom: "10px" }}
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
            {/* Main dashboard content */}
            <div className="w-full flex-1 flex sm:p-6   overflow-hidden">
              <AdminDashboard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardCard;
