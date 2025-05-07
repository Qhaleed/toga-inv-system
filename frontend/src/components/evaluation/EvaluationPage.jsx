import { useState } from "react";
import SideBar from "../common/SideBar";
import NavBar from "../common/NavBar";
import EvaluationTable from "./EvaluationTable";
import EvaluationTab from "./EvaluationTab";

const EvaluationPage = () => {
  // SO MAY STATES TYO DALAWA GRID PTI COLUMNS
  const [modifyTable, setmodifyTable] = useState(false);
  const [activeTab, setActiveTab] = useState("evaluation");
  const [value, setValue] = useState([]);
  const [evalTab, setEvaluationTab] = useState("hidden");
  const [isAll, setIsAll] = useState(false);
  const [isevalTab, setIsEvaluationTab] = useState(false);
  const [isnotevalTab, setIsNotEvaluationTab] = useState(false);

  return (
    <>
      <div className="h-screen overflow-hidden w-screen fixed bg-[#EBEBEB] font-figtree font-medium">
        {/* Responsive: Sidebar above navbar on small screens, left on large screens */}
        <div className="w-full flex flex-col sm:grid sm:grid-cols-4 h-screen">
          {/* Sidebar: full width above navbar on small screens, left on large screens */}
          <div className="w-full sm:col-span-1">
            {/* Always show sidebar on large screens, toggle on small screens */}
            <SideBar alwaysShowOnLarge activeTab={activeTab} setIsEvaluationTab={setIsEvaluationTab} setIsNotEvaluationTab={setIsNotEvaluationTab}/>
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
                isevalTab={isevalTab}
                isnotevalTab={isnotevalTab}
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
