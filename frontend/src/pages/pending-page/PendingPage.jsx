import React, { useState } from "react";
import Table from "../../components/common/Table";

import SideBar from "../../components/common/SideBar";
import NavBar from "../../components/common/NavBar";
import Profile from "../../assets/images/profilepicture.jpg";

const PendingPage = () => {
  // States for grid, modifyTable, and sortOrder
  const [isGrid, setIsGrid] = useState(false);
  const [modifyTable, setmodifyTable] = useState(false);
  const [sortOrder, setSortOrder] = useState(null);
  const [activeButton, setActiveButton] = useState(null); // State to track the last clicked button
  const [activeTab, setActiveTab] = useState("pending"); // State for active tab

  const tableData = []; // Placeholder for table data

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="h-fit w-screen relative bg-[#EBEBEB] font-figtree font-medium">
      {/* Responsive grid: sidebar above on mobile, left on desktop */}
      <div className="max-w-full relative grid grid-cols-1 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 sm:gap-0 sm:top-0 sm:left-0 sm:h-screen sm:w-screen">
        {/* Sidebar: full width above on mobile, left on desktop */}
        <div className="w-full sm:col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1 bg-[#001C47] text-white hidden sm:block h-full">
          <SideBar
            alwaysShowOnLarge
            setSortOrder={setSortOrder}
            activeTab={activeTab}
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
              <NavBar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                handleButtonClick={handleButtonClick} // Pass handler to update activeButton
              />
            </div>
            <div className="flex-1 flex bg-amber-200 mt-6 flex-col items-center justify-center p-2 sm:p-6 gap-8 min-w-0 overflow-x-auto w-full">
              <Table
                isGrid={isGrid}
                modifyTable={modifyTable}
                sortOrder={sortOrder}
                data={tableData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingPage;
