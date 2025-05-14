import React, { useState } from "react";
import Table from "../../components/common/Table";
import SideBar from "../../components/navigations/SideBar";
import Navbar from "../../components/navigations/NavBar";

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
    <div className="h-fit w-screen relative bg-[#F3F9FF] font-figtree font-medium">
      {/* Responsive grid: sidebar above on mobile, left on desktop */}
      <div className="max-w-full relative grid grid-cols-1 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 sm:gap-0 sm:top-0 sm:left-0 sm:h-screen sm:w-screen">
        {/* Sidebar: full width above on mobile, left on desktop */}
        <div className="w-full sm:col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1 bg-[#001C47] text-white hidden sm:block h-full">
          <SideBar
            alwaysShowOnLarge
            setSortOrder={setSortOrder}
            activeTab={activeTab}
            focusedSort={sortOrder}
            handleSortNameAsc={handleSortNameAsc}
            handleSortNameDesc={handleSortNameDesc}
            handleSortDateNewest={handleSortDateNewest}
            handleSortDateOldest={handleSortDateOldest}
          />
        </div>
        {/* Main content: full width on mobile, right of sidebar on desktop */}
        <div className="w-full flex-1 md:col-span-3 xl:col-span-3 2xl:col-span-4 sm:col-span-3 overflow-x-auto sm:overflow-x-visible col-span-1 h-full">
          <div
            className="w-full h-screen overflow-hidden flex flex-col items-center"
            style={{ maxWidth: "100vw" }}
          >
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
