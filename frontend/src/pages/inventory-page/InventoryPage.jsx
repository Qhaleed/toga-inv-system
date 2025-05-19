import React, { useState, useEffect } from "react";
import SideBar from "../../components/navigations/SideBar";
import Navbar from "../../components/navigations/NavBar";
import {
  StocksTab,
  ItemStatusTab,
  CheckReturnTab,
  ViewDamageTab,
  ViewRepairTab,
} from "./InventoryTabs";

const InventoryPage = ({ setSortOrder }) => {
  // checker if localstorage is not impty
  const [focusedStatus, setFocusedStatus] = useState(
    () => localStorage.getItem("focusedStatus") || "stocks"
  );
  const [activeTab, setActiveTab] = useState(
    () => localStorage.getItem("activeTab") || "inventory"
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // eto na po lalagyan na ng local storage para di na babalik sa default scree nahahahah
  useEffect(() => {
    localStorage.setItem("focusedStatus", focusedStatus);
  }, [focusedStatus]);
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  return (
    <div
      className={`w-screen h-screen overflow-x-hidden grid grid-rows-1 md:grid-rows-1 transition-transform duration-500 ease-in-out ${
        sidebarOpen
          ? "md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr] 2xl:grid-cols-[400px_1fr]"
          : "md:grid-cols-1"
      }`}
    >
      {/* Sidebar:mobile view */}
      {sidebarOpen && (
        <div className="max-md:hidden md:block w-full relative transition-transform duration-500 ease-in-out">
          <SideBar
            alwaysShowOnLarge
            setSortOrder={setSortOrder}
            activeTab={activeTab}
            focusedStatus={focusedStatus}
            setFocusedStatus={setFocusedStatus}
          />
        </div>
      )}
      {/* Main content */}
      <div className="bg-[#F3F9FF] overflow-hidden  w-full h-full">
        {/* NavBar always at the top */}
        <div className="w-full z-10 h-14 flex items-center relative">
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className="w-full relative h-full  flex flex-col">
          <div className="w-full    h-15 items-center ">
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
          <div className="w-full h-full overflow-visible flex flex-col flex-1">
            <div className="relative flex flex-col items-center justify-start gap-3 min-w-0 overflow-auto w-full animate-fade-in">
              {/* Inventory tab content switching components yk */}
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
