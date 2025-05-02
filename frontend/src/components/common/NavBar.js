import React, { useState, useEffect } from "react";
import { ReactComponent as Home } from "../../assets/icons/blue-house.svg";
import { ReactComponent as Inventory } from "../../assets/icons/blue-inventory.svg";
import { ReactComponent as Search } from "../../assets/icons/blue-search.svg";
import { ReactComponent as Application } from "../../assets/icons/blue-applications.svg";
import { ReactComponent as GrayInventory } from "../../assets/icons/gray-inventory.svg";
import { ReactComponent as GrayHouse } from "../../assets/icons/gray-house.svg";
import { ReactComponent as Statistic } from "../../assets/icons/blue-reports.svg";
import { ReactComponent as GrayStatistic } from "../../assets/icons/gray-statistics.svg";
import { ReactComponent as GrayApplication } from "../../assets/icons/gray-checkgray.svg";
import { ReactComponent as GrayRows } from "../../assets/icons/gray-rows.svg";
import { ReactComponent as GrayGrid } from "../../assets/icons/gray-grid.svg";
import { ReactComponent as Rows } from "../../assets/icons/white-row.svg";
import { ReactComponent as Grid } from "../../assets/icons/white-grid.svg";

const Navbar = ({
  isGrid,
  setIsGrid,
  modifyTable,
  setmodifyTable,
  activeTab,
  setActiveTab,
}) => {
  const [localActiveTab, setLocalActiveTab] = useState(
    activeTab || "dashboard"
  );

  // Keep parent in sync if needed
  useEffect(() => {
    if (setActiveTab) setActiveTab(localActiveTab);
  }, [localActiveTab, setActiveTab]);

  const editallClicked = () => {
    setmodifyTable((prev) => !prev);
  };

  const tabClass = (tabName) =>
    localActiveTab === tabName
      ? "hover:scale-105 bg-gray-300 border border-[#02327B] flex ml-2 justify-center mr-2 items-center w-28 h-5 text-xs text-[#02327B] rounded-lg transition-all ease-out duration-500"
      : "hover:scale-105 mr-2 flex ml-2 justify-center items-center w-28 h-5 text-xs text-gray-500 border border-gray-500 rounded-lg transition-all ease-out duration-500";

  const iconToggle = (tabName, ActiveIcon, InactiveIcon) =>
    localActiveTab === tabName ? (
      <ActiveIcon className="w-4" />
    ) : (
      <InactiveIcon className="w-4" />
    );

  const rowIcon = !isGrid ? (
    <Rows className="w-7 p-1" style={{ color: "white", fill: "white" }} />
  ) : (
    <GrayRows
      className="w-7 p-1"
      style={{ color: "#6B7280", fill: "#6B7280" }}
    />
  );

  const gridIcon = isGrid ? (
    <Grid className="w-7 p-1" style={{ color: "white", fill: "white" }} />
  ) : (
    <GrayGrid
      className="w-7 p-1"
      style={{ color: "#6B7280", fill: "#6B7280" }}
    />
  );

  return (
    <div className="h-24">
      {/* Top Navigation */}
      <div className="h-1/2 flex justify-start items-center ml-14">
        <button
          onClick={() => setLocalActiveTab("dashboard")}
          className={tabClass("dashboard")}
        >
          <span className="w-3">
            {iconToggle("dashboard", Home, GrayHouse)}
          </span>
          <span className="text-[10px] ml-2">Dashboard</span>
        </button>
        <button
          onClick={() => setLocalActiveTab("inventory")}
          className={tabClass("inventory")}
        >
          <span className="w-3">
            {iconToggle("inventory", Inventory, GrayInventory)}
          </span>
          <span className="text-[10px] mx-2">Inventory</span>
        </button>
        <button
          onClick={() => setLocalActiveTab("pending")}
          className={tabClass("pending")}
        >
          <span className="w-3">
            {iconToggle("pending", Statistic, GrayStatistic)}
          </span>
          <span className="text-[10px] mx-2">Pending</span>
        </button>
        <button
          onClick={() => setLocalActiveTab("evaluation")}
          className={tabClass("evaluation")}
        >
          <span className="w-3">
            {iconToggle("evaluation", Application, GrayApplication)}
          </span>
          <span className="text-[10px] mx-2">Evaluation</span>
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="h-1/2 flex justify-between items-center w-full max-w-[100vw] px-4">
        <div className="w-full max-w-[00px] flex-1">
          <div className="relative lg:ml-14 md:ml-10 mr-2">
            <Search className="absolute w-5 top-1 left-2" />
            <input
              className="bg-[#E2E2E2] shadow-inner h-8 shadow-gray-500 w-full px-10 py-1 text-xs text-[#02327B] rounded-lg outline-none placeholder:text-[#02327B] focus:outline focus:outline-1.5 focus:outline-[#02327B]"
              type="text"
              placeholder="Search student..."
            />
          </div>
        </div>
        {/* Only show grid/modifyTable buttons if not on evaluation tab */}
        {localActiveTab !== "evaluation" && (
          <>
            <div className="h-7 w-16 bg-[#E2E2E2] shadow-inner shadow-gray-500 rounded-lg flex justify-around items-center ml-6 mr-2">
              <button
                onClick={() => setIsGrid(false)}
                className={`h-7 w-10 flex justify-center items-center rounded-lg transition-all duration-200 shadow-md hover:shadow-xl hover:scale-105 ${
                  !isGrid
                    ? "bg-[#02327B] text-white"
                    : "bg-[#E2E2E2] text-gray-500 opacity-70 hover:opacity-100"
                }`}
              >
                {rowIcon}
              </button>
              <button
                onClick={() => setIsGrid(true)}
                className={`h-7 w-10 flex justify-center items-center rounded-lg transition-all duration-200 shadow-md hover:shadow-xl hover:scale-105 ${
                  isGrid
                    ? "bg-[#02327B] text-white"
                    : "bg-[#E2E2E2] text-gray-500 opacity-70 hover:opacity-100"
                }`}
              >
                {gridIcon}
              </button>
            </div>
            <button
              className={`hover:scale-105 h-7 w-28 rounded-lg text-xs text-white ml-2 mr-4 ${
                modifyTable ? "bg-[#919191] ring-2" : "bg-[#0C7E48]"
              }`}
              onClick={editallClicked}
            >
              {modifyTable ? "Edit Table" : "Modify Table"}
            </button>
          </>
        )}
      </div>
      <div className="h-1/2 flex justify-start items-center">
        {localActiveTab === "inventory" && (
          <div className="ml-8 text-[#02327B] font-bold">
            Inventory Placeholder
          </div>
        )}
        {localActiveTab === "pending" && (
          <div className="ml-8 text-[#02327B] font-bold">
            Pending Placeholder
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
