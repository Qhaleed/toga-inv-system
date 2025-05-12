import React, { useState } from "react";
import SideBar from "../../components/navigations/SideBar";
import Navbar from "../../components/navigations/NavBar";
import MyChart from "../../components/ui/my-chart";
import Rows from "../../components/common/Rows";
import {
  StocksTab,
  ItemStatusTab,
  CheckReturnTab,
  ViewDamageTab,
  ViewRepairTab,
} from "./InventoryTabs";

const InventoryPage = ({ setSortOrder }) => {
  const [searchResults, setSearchResults] = useState(null);
  const [focusedStatus, setFocusedStatus] = useState("stocks");
  const [activeTab, setActiveTab] = useState("inventory"); // Ensure activeTab defaults to "inventory" for this page
  const searchActive =
    searchResults && Array.isArray(searchResults) && searchResults.length > 0;
  return (
    <div className="min-h-screen w-full relative bg-[#EBEBEB] font-figtree font-medium">
      {/* Responsive grid: sidebar above on mobile, left on desktop */}
      <div className="max-w-full relative grid grid-cols-1 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 sm:gap-0 sm:top-0 sm:left-0 sm:h-screen sm:w-screen">
        {/* Sidebar: full width above on mobile, left on desktop */}
        <div
          className={`w-full sm:col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1 bg-[#001C47] text-white hidden sm:block h-full ${
            searchActive ? "pointer-events-none opacity-30" : ""
          }`}
        >
          <SideBar
            alwaysShowOnLarge
            setSortOrder={setSortOrder}
            activeTab={activeTab}
            focusedStatus={focusedStatus}
            setFocusedStatus={setFocusedStatus}
          />
        </div>
        {/* Main content: full width on mobile, right of sidebar on desktop */}
        <div className="w-full flex-1 md:col-span-3 xl:col-span-3 2xl:col-span-4 sm:col-span-3 overflow-x-auto sm:overflow-x-visible col-span-1 h-max-screen">
          <div
            className="w-full h-screen flex flex-col items-center"
            style={{ maxWidth: "100vw" }}
          >
            <div
              className="w-full"
              style={{ height: "60px", marginBottom: "10px" }}
            >
              <Navbar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onSearch={setSearchResults}
              />
            </div>
            <div className="flex-1 relative flex  flex-col items-center justify-start  sm:p-6 gap-8 min-w-0 overflow-x-auto w-full">
              {/* Inventory tab content switching */}
              {activeTab === "inventory" &&
                (() => {
                  switch (focusedStatus) {
                    case "stocks":
                      return <StocksTab />;
                    case "itemstatus":
                      return <ItemStatusTab />;
                    case "checkreturn":
                      return <CheckReturnTab />;
                    case "viewdamage":
                      return <ViewDamageTab />;
                    case "viewrepair":
                      return <ViewRepairTab />;
                    default:
                      return <StocksTab />;
                  }
                })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
