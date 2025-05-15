import React, { useState, useCallback } from "react";
import Table from "../common/Table";
import SideBar from "../navigations/SideBar";
import NavBar from "../navigations/NavBar";
import AdminDashboard from "./AdminDashboard"; // Import the AdminDashboard component
import profilePic from "@/assets/images/profilepicture.jpg";

const AdminDashboardCard = () => {
  // States for grid and modifyTable
  const [isGrid, setIsGrid] = useState(false);
  const [modifyTable, setmodifyTable] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard"); // State for active tab
  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar toggle state
  const [adminName, setAdminName] = useState("Admin");

  const handleAdminName = useCallback((name) => setAdminName(name), []);
  const firstName = adminName.split(" ")[0];

  return (
    <div
      className={`w-screen h-screen overflow-x-hidden n grid grid-rows-1 md:grid-rows-1  transition-transform duration-500 ease-in-out ${
        sidebarOpen
          ? "md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr] 2xl:grid-cols-[400px_1fr] trans"
          : "md:grid-cols-1"
      }`}
    >
      {/* Sidebar: left on desktop, hidden on mobile */}
      {sidebarOpen && (
        <div className="max-md:hidden md:block  w-full relative transition-transform duration-500 ease-in-out">
          <SideBar
            alwaysShowOnLarge
            activeTab="dashboard"
            onAdminName={handleAdminName}
          />
        </div>
      )}
      {/* Main content dito */}
      <div className="bg-[#F3F9FF]   w-full h-full">
        <div className="w-full relative h-full  overflow-hidden  flex flex-col">
          <div className="w-full  z-10 h-15 flex items-center ">
            <button
              className="hidden md:block absolute bg-gray-100 left-0 opacity-80 top-1/2 -translate-y-1/2 z-50 border border-gray-300 rounded-full shadow p-1 hover:bg-gray-100 transition"
              onClick={() => setSidebarOpen((open) => !open)}
              aria-label={sidebarOpen ? "Minimize sidebar" : "Open sidebar"}
              style={{ marginLeft: 10 }}
            >
              <span className="text-xl text-[#2840A1]">
                {sidebarOpen ? "\u2190" : "\u2192"}
              </span>
            </button>
            <NavBar
              isGrid={isGrid}
              setIsGrid={setIsGrid}
              modifyTable={modifyTable}
              setmodifyTable={setmodifyTable}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          <div className="w-full h-full overflow-visible  flex flex-col flex-1">
            <div className=" md:h-10 hidden items-center md:flex  ">
              <p className="md:ml-6 font-semibold md:text-2xl">{`Welcome, ${firstName}! 👋🏻`}</p>
            </div>

            <AdminDashboard adminName={adminName} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardCard;
