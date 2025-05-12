import { useState } from "react";
import SideBar from "../navigations/SideBar";
import NavBar from "../navigations/NavBar";
import EvaluationTable from "./EvaluationTable";
import EvaluationTab from "./EvaluationTab";

const EvaluationPage = () => {
  // SO MAY STATES TYO DALAWA GRID PTI COLUMNS
  const [modifyTable, setmodifyTable] = useState(false);
  const [activeTab, setActiveTab] = useState("evaluation");
  const [value, setValue] = useState([]);
  const [evalTab, setEvaluationTab] = useState("hidden");

  // State for sidebar-driven filtering/sorting
  const [isAll, setIsAll] = useState(true);
  const [isEvaluationTab, setIsEvaluationTab] = useState(false);
  const [isNotEvaluationTab, setIsNotEvaluationTab] = useState(false);
  const [isAZ, setIsAZ] = useState(false);
  const [isZA, setIsZA] = useState(false);

  return (
    <>
      <div className="h-fit w-screen relative bg-[#EBEBEB] font-figtree font-medium">
        {/* Responsive grid: sidebar above on mobile, left on desktop */}
        <div className="max-w-full relative grid grid-cols-1 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 sm:gap-0 sm:top-0 sm:left-0 sm:h-screen sm:w-screen">
          {/* Sidebar: full width above on mobile, left on desktop */}
          <div className="w-full stik sm:col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1 bg-[#001C47] text-white hidden sm:block h-full">
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
          {/* Main content: full width on mobile, right of sidebar on desktop */}
          <div className="w-full flex-1 md:col-span-3 xl:col-span-3 2xl:col-span-4 sm:col-span-3 overflow-x-auto sm:overflow-x-visible col-span-1 h-full">
            <div
              className="w-full h-screen overflow-hidden flex flex-col items-center "
              style={{ maxWidth: "100vw" }}
            >
              <div
                className="w-full "
                style={{ height: "60px", marginBottom: "10px" }}
              >
                <NavBar
                  modifyTable={modifyTable}
                  setmodifyTable={setmodifyTable}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              </div>
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
          </div>
        </div>
      </div>
      <EvaluationTab
        value={value}
        evalTab={evalTab}
        setEvaluationTab={setEvaluationTab}
      />
    </>
  );
};

export default EvaluationPage;
