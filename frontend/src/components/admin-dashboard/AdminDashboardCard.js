import React, { useState } from "react";
import Table from "../common/Table";
import SideBar from "../common/SideBar";
import NavBar from "../common/NavBar";
import EvaluationTable from "../../components/evaluation/EvaluationTable";

const AdminDashboardCard = () => {
  // SO MAY STATES TYO DALAWA GRID PTI COLUMNS
  const [isGrid, setIsGrid] = useState(false);
  const [modifyTable, setmodifyTable] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  function renderContent() {
    if (activeTab === "dashboard") {
      return <Table isGrid={isGrid} modifyTable={modifyTable} />;
    }
    if (activeTab === "evaluation") {
      return (
        <div className="w-full h-full flex justify-center items-start">
          <div className="w-full max-w-[1400px] h-full">
            <EvaluationTable isGrid={isGrid} modifyTable={modifyTable} />
          </div>
        </div>
      );
    }
    if (activeTab === "inventory") {
      return (
        <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-[#02327B]">
          Inventory Placeholder
        </div>
      );
    }
    if (activeTab === "pending") {
      return (
        <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-[#02327B]">
          Pending Placeholder
        </div>
      );
    }
    return null;
  }

  return (
    <div className="h-screen overflow-hidden w-screen fixed bg-[#EBEBEB] font-figtree font-medium">
      {/* Responsive: Sidebar above navbar on small screens, left on large screens */}
      <div className="w-full flex flex-col sm:grid sm:grid-cols-4 h-screen">
        {/* Sidebar: full width above navbar on small screens, left on large screens */}
        <div className="w-full sm:col-span-1">
          {/* Always show sidebar on large screens, toggle on small screens */}
          <SideBar alwaysShowOnLarge />
        </div>
        {/* Main content: below sidebar on small screens, right of sidebar on large screens */}
        <div className="flex-1 sm:col-span-3 h-full">
          <div
            className="w-full flex flex-col items-center"
            style={{ maxWidth: "100vw" }}
          >
            <div
              className="w-full"
              style={{ height: "60px", marginBottom: "8px" }}
            >
              <NavBar
                isGrid={isGrid}
                setIsGrid={setIsGrid}
                modifyTable={modifyTable}
                setmodifyTable={setmodifyTable}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardCard;
