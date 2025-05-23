import React, { useState, useCallback, useEffect } from "react";
import Table from "../common/Table";
import SideBar from "../navigations/SideBar";
import NavBar from "../navigations/NavBar";
import AdminDashboard from "./AdminDashboard"; // Import the AdminDashboard component

const AdminDashboardCard = () => {
  // States for grid and modifyTable
  const [isGrid, setIsGrid] = useState(false);
  const [modifyTable, setmodifyTable] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard"); // State for active tab
  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar toggle state
  const [adminName, setAdminName] = useState("Admin");
  const [allData, setAllData] = useState([]);
  const [approvalRequests, setApprovalRequests] = useState([]); // New state for approval requests

  const handleAdminName = useCallback((name) => setAdminName(name), []);

  // Fetch inventory data on mount (like PendingPage)
  useEffect(() => {
    fetch("http://localhost:5001/items")
      .then((res) => res.json())
      .then((data) => {
        setAllData(data);
      })
      .catch((err) => {
        console.error("Failed to fetch items data:", err);
      });
    // Fetch approval requests from accounts
    fetch("http://localhost:5001/accounts")
      .then((res) => res.json())
      .then((data) => {
        setApprovalRequests(data);
      })
      .catch((err) => {
        console.error("Failed to fetch accounts data:", err);
      });
  }, []);

  return (
    <div
      className={`w-screen h-screen overflow-hidden grid grid-rows-1 md:grid-rows-1 transition-transform duration-500 ease-in-out ${
        sidebarOpen
          ? "md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr] 2xl:grid-cols-[400px_1fr] trans"
          : "md:grid-cols-1"
      }`}
    >
      {/* Sidebar: left on desktop, hidden on mobile */}
      {sidebarOpen && (
        <div className="max-md:hidden md:block w-full relative transition-transform duration-500 ease-in-out">
          <SideBar
            alwaysShowOnLarge
            activeTab="dashboard"
            onAdminName={handleAdminName}
          />
        </div>
      )}
      {/* Main content with NavBar above */}
      <div className="bg-[#F3F9FF] w-full h-full flex flex-col">
        {/* NavBar always at the top */}
        <div className="w-full z-10 h-15 flex items-center relative">
          <NavBar
            isGrid={isGrid}
            setIsGrid={setIsGrid}
            modifyTable={modifyTable}
            setmodifyTable={setmodifyTable}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        {/* Main content below navbar */}
        <div className="w-full h-full overflow-visible relative flex flex-col flex-1">
          <AdminDashboard
            adminName={adminName}
            allData={allData}
            approvalRequests={approvalRequests}
          />
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
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardCard;
