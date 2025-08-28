/**
 * PendingPage Component
 * Main page component for displaying pending toga inventory items
 * Shows item status instead of return status and provides grid/table view options
 */

import React, { useState, useEffect } from "react";
import PendingTable from "../../components/pending-page/PendingTable";
import SideBar from "../../components/navigations/SideBar";
import Navbar from "../../components/navigations/NavBar";

/**
 * PendingPage Component
 * Manages the layout and state for the pending items view
 */
const PendingPage = () => {
  // View state management
  const [isGrid, setIsGrid] = useState(false);
  const [modifyTable, setmodifyTable] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sortOrder, setSortOrder] = useState("name-asc");
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // for future search/filter
  const [focusedStatus, setFocusedStatus] = useState("all");

  // Fetch inventory data on mount (ReservationPage pattern)
  useEffect(() => {
    console.log("PendingPage: Starting fetch...");
    // Use direct route to get all accounts with inventory data
    fetch("http://localhost:5001/inventory")
      .then((res) => {
        console.log("PendingPage: Response status:", res.status);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("=== PENDINGPAGE DEBUG ===");
        console.log("PendingPage: Raw data received:", data);
        console.log("PendingPage: Data length:", data.length);
        console.log("PendingPage: Kenneth's record specifically:");
        const kenneth = data.find(item => item.first_name?.includes("Kenneth"));
        console.log("Kenneth found:", kenneth);
        
        // Filter to show pending, approved, and rejected users (exclude only deleted users if any)
        const filtered = data.filter(
          (item) => 
            (item.status === 'pending' || item.status === 'approved' || item.status === 'rejected')
        );
        console.log("PendingPage: Filtered data:", filtered);
        console.log("PendingPage: Filtered length:", filtered.length);
        
        // Log specific data to debug name/date issues
        filtered.forEach((item, index) => {
          console.log(`PendingPage item ${index}:`, {
            account_id: item.account_id,
            first_name: item.first_name,
            surname: item.surname,
            middle_initial: item.middle_initial,
            course: item.course,
            status: item.status,
            rent_date: item.rent_date,
            created_at: item.created_at,
            inventory_id: item.inventory_id,
            toga_size: item.toga_size,
            tassel_color: item.tassel_color,
            hood_color: item.hood_color
          });
        });
        
        setAllData(filtered);
        setFilteredData(filtered);
      })
      .catch((error) => {
        console.error("PendingPage: Error fetching data", error);
      });
  }, []);

  // Calculate dynamic counts for sidebar
  const allRequestsCount = allData.length;
  const approvedCount = allData.filter(item => item.status === 'approved').length;
  const pendingCount = allData.filter(item => item.status === 'pending').length;
  const rejectedCount = allData.filter(item => item.status === 'rejected').length;

  // Refresh data function to be passed to components
  const refreshData = () => {
    fetch("http://localhost:5001/inventory")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const filtered = data.filter(
          (item) => 
            (item.status === 'pending' || item.status === 'approved' || item.status === 'rejected')
        );
        setAllData(filtered);
        setFilteredData(filtered);
      })
      .catch((error) => {
        console.error("PendingPage: Error refreshing data", error);
      });
  };

  useEffect(() => {
    setFilteredData(allData); //ishow ang filtered data (refer sa handleSearch sa NavBar.jsx)
  }, [allData]);

  const handleEvaluationSearch = (results) => {
    const filtered = results.filter(
      (item) => item.toga_size !== null && item.toga_size !== undefined
    );
    setFilteredData(filtered);
    };

  // Sort handlers for the sidebar controls
  const handleSortNameAsc = () => setSortOrder("name-asc");
  const handleSortNameDesc = () => setSortOrder("name-desc");
  const handleSortDateNewest = () => setSortOrder("newest");
  const handleSortDateOldest = () => setSortOrder("oldest");

  return (
    <div
      className={`w-screen h-screen overflow-hidden grid grid-rows-1 md:grid-rows-1 transition-transform duration-500 ease-in-out ${
        sidebarOpen
          ? "md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr] 2xl:grid-cols-[400px_1fr]"
          : "md:grid-cols-1"
      }`}
    >
      {/* Sidebar: left on desktop, hidden on mobile */}
      {sidebarOpen && (
        <div className="max-md:hidden md:block w-full relative transition-transform duration-500 ease-in-out">
          <SideBar
            alwaysShowOnLarge
            setSortOrder={setSortOrder}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            focusedStatus={focusedStatus}
            setFocusedStatus={setFocusedStatus}
            handleSortNameAsc={handleSortNameAsc}
            handleSortNameDesc={handleSortNameDesc}
            handleSortDateNewest={handleSortDateNewest}
            handleSortDateOldest={handleSortDateOldest}
            allRequestsCount={allRequestsCount}
            approvedCount={approvedCount}
            pendingCount={pendingCount}
            rejectedCount={rejectedCount}
          />
        </div>
      )}
      {/* Main content */}
      <div className="bg-[#F3F9FF] w-full  h-full overflow-hidden">
        {/* NavBar always at the top */}
        <div className="w-full h-10 pt-12.5 flex items-center relative">
          <Navbar
            isGrid={isGrid}
            setIsGrid={setIsGrid}
            modifyTable={modifyTable}
            setmodifyTable={setmodifyTable}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onSearch={handleEvaluationSearch}
          />
        </div>
        <div className="w-full flex flex-col">
          <div className="w-full h-full overflow-hidden flex flex-col flex-1">
               <button
                className="hidden md:block absolute bg-gray-100 z-0  opacity-80 top-1/2  -translate-y-1/2 border border-gray-300 rounded-full shadow p-1 hover:bg-gray-100 transition"
                onClick={() => setSidebarOpen((open) => !open)}
                aria-label={sidebarOpen ? "Minimize sidebar" : "Open sidebar"}
                style={{ marginLeft: 10 }}
              >
                <span className="text-xl text-[#2840A1]">
                  {sidebarOpen ? "\u2190" : "\u2192"}
                </span>
              </button>
            <div className="overflow-hidden flex mx-auto w-full animate-fade-in ">
              <PendingTable
                isGrid={isGrid}
                modifyTable={modifyTable}
                sortOrder={sortOrder}
                data={filteredData}
                allData={filteredData}
                focusedStatus={focusedStatus}
                searchResults={filteredData}
                refreshData={refreshData}
              />
           
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingPage;
