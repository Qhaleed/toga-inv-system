import React, { useState } from "react";
import Table from "../../components/common/Table";
import SideBar from "../../components/navigations/SideBar";
import Navbar from "../../components/navigations/NavBar";
import profilePic from "@/assets/images/profilepicture.jpg";

const PendingPage = () => {
  // States for grid, modifyTable, sortOrder, and activeTab
  const [isGrid, setIsGrid] = useState(false);
  const [modifyTable, setmodifyTable] = useState(false);
  const [sortOrder, setSortOrder] = useState("name-asc");
  const [activeTab, setActiveTab] = useState("pending");

  // Handler functions for sort buttons (for SideBar)
  const handleSortNameAsc = () => setSortOrder("name-asc");
  const handleSortNameDesc = () => setSortOrder("name-desc");
  const handleSortDateNewest = () => setSortOrder("newest");
  const handleSortDateOldest = () => setSortOrder("oldest");

  return (
    <div className="flex flex-row overflow-hidden h-screen w-screen bg-[#F3F9FF] font-figtree font-medium">
      {/* Mobile vertical sidebar with icons (profile + sorting), only on mobile */}
      <div className="w-20 bg-[#001C47] h-full flex flex-col items-center py-4 gap-6 md:hidden">
        {/* Profile picture icon */}
        <img
          src={profilePic}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border-2 border-white mb-2"
        />
        {/* Sorting icons (replace with your actual icons as needed) */}
        <button className="w-8 h-8 flex items-center justify-center bg-white bg-opacity-10 rounded-full hover:bg-opacity-30">
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="white"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M3 6h18M3 12h12M3 18h6" />
          </svg>
        </button>
        <button className="w-8 h-8 flex items-center justify-center bg-white bg-opacity-10 rounded-full hover:bg-opacity-30">
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="white"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        {/* Add more icons/buttons as needed */}
      </div>
      {/* Main grid container, full width on sm and up, shrinks on mobile */}
      <div className="flex-1 max-w-full relative grid grid-cols-1 sm:grid-cols-5 md:grid-cols-3 lg:grid-cols-5   sm:gap-0 sm:top-0 sm:left-0 sm:h-full sm:w-screen">
        {/* Sidebar: full width above on mobile, left on desktop */}
        <div className="w-full sm:col-span-2 relative md:col-span-1 lg:col-span-1   bg-[#001C47] text-white hidden md:block ">
          <SideBar alwaysShowOnLarge />
        </div>
        {/* Main content: full width on mobile, right of sidebar on desktop */}
        <div className="w-full flex-1  col-span-1 md:col-span-2  lg:col-span-4 sm:col-span-4 overflow-x-auto sm:overflow-x-visible  h-max-screen">
          <div className="w-full h-screen overflow-hidden flex flex-col items-center">
            <div
              className="w-full"
              style={{ height: "60px", marginBottom: "10px" }}
            >
              <Navbar
                isGrid={isGrid}
                setIsGrid={setIsGrid}
                modifyTable={modifyTable}
                setmodifyTable={setmodifyTable}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>
            <div className="flex-1 flex mx-auto min-w-fit  animate-fade-in    overflow-hidden ">
              <Table
                isGrid={isGrid}
                modifyTable={modifyTable}
                sortOrder={sortOrder}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingPage;
