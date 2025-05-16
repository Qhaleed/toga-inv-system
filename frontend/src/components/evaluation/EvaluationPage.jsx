import React, { useState } from "react";
import SideBar from "../navigations/SideBar";
import NavBar from "../navigations/NavBar";
import EvaluationTable from "./EvaluationTable";
import EvaluationTab from "./EvaluationTab";

const EvaluationPage = () => {
  const [modifyTable, setmodifyTable] = useState(false);
  const [activeTab, setActiveTab] = useState("evaluation");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [value, setValue] = useState([]);
  const [evalTab, setEvaluationTab] = useState("hidden");
  // Sidebar-driven filtering/sorting
  const [isAll, setIsAll] = useState(true);
  const [isEvaluationTab, setIsEvaluationTab] = useState(false);
  const [isNotEvaluationTab, setIsNotEvaluationTab] = useState(false);
  const [isAZ, setIsAZ] = useState(false);
  const [isZA, setIsZA] = useState(false);

  return (
    <div
      className={`w-screen h-screen overflow-x-hidden grid grid-rows-1 md:grid-rows-1 transition-transform duration-500 ease-in-out ${
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
            activeTab={activeTab}
            setIsAll={setIsAll}
            setIsEvaluationTab={setIsEvaluationTab}
            setIsNotEvaluationTab={setIsNotEvaluationTab}
            setIsAZ={setIsAZ}
            setIsZA={setIsZA}
          />
        </div>
      )}
      {/* Main content */}
      <div className="bg-[#F3F9FF] w-full h-full">
        <div className="w-full relative h-full flex flex-col">
          <div className="w-full z-10 h-15 flex items-center ">
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
            <NavBar
              modifyTable={modifyTable}
              setmodifyTable={setmodifyTable}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
          <div className="w-full h-full overflow-hidden flex flex-col flex-1">
            {/* Main evaluation table and tab */}
            <div className="flex-1 overflow-hidden flex mx-auto w-full animate-fade-in ">
              <EvaluationTable
                modifyTable={modifyTable}
                setValue={setValue}
                setEvaluationTab={setEvaluationTab}
                isAll={isAll}
                isevalTab={isEvaluationTab}
                isnotevalTab={isNotEvaluationTab}
                isAZ={isAZ}
                isZA={isZA}
              />
            </div>
            <EvaluationTab
              value={value}
              evalTab={evalTab}
              setEvaluationTab={setEvaluationTab}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationPage;
