/**
 * PendingPage Component
 * Main page component for displaying pending toga inventory items
 * Shows item status instead of return status and provides grid/table view options
 */

import React, { useState, useMemo } from "react";
import { useQuery } from '@tanstack/react-query';
import PendingTable from "../../components/pending-page/PendingTable";
import SideBar from "../../components/navigations/SideBar";
import Navbar from "../../components/navigations/NavBar";
import { inventoryAPI } from "../../lib/api";

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
  const [focusedStatus, setFocusedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch inventory data using React Query
  const { data: inventoryData = [], refetch } = useQuery({
    queryKey: ['inventory'],
    queryFn: inventoryAPI.getAll,
  });

  // Filter and process data
  const allData = useMemo(() => {
    return inventoryData.filter(
      (item) => 
        item.status === 'pending' || 
        item.status === 'approved' || 
        item.status === 'rejected'
    );
  }, [inventoryData]);

  // Client-side search filtering
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) {
      return allData;
    }

    const normalize = str => str.replace(/[\s.,]/g, '').toLowerCase();
    const normalizedSearch = normalize(searchTerm);

    return allData.filter(item => {
      const fullName = `${item.surname || ''}, ${item.first_name || ''}${item.middle_initial ? ' ' + item.middle_initial : ''}`;
      const normalizedName = normalize(fullName);
      
      // Also search by ID number and course
      const idNumber = normalize(item.id_number || '');
      const course = normalize(item.course || '');
      
      return normalizedName.includes(normalizedSearch) || 
             idNumber.includes(normalizedSearch) ||
             course.includes(normalizedSearch);
    });
  }, [allData, searchTerm]);

  // Calculate dynamic counts for sidebar
  const allRequestsCount = allData.length;
  const approvedCount = allData.filter(item => item.status === 'approved').length;
  const pendingCount = allData.filter(item => item.status === 'pending').length;
  const rejectedCount = allData.filter(item => item.status === 'rejected').length;

  // Handle search from NavBar
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Refresh data function (refetch from React Query)
  const refreshData = () => {
    refetch();
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
            onSearch={handleSearch}
            searchTerm={searchTerm}
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
