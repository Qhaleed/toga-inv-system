import React, { useState, useMemo } from "react";
import { useQuery } from '@tanstack/react-query';
import SideBar from "../navigations/SideBar";
import Navbar from "../navigations/NavBar";
import EvaluationTable from "./EvaluationTable";
import EvaluationTab from "./EvaluationTab";
import { evaluationAPI } from "../../lib/api";

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
  const [focusedStatus, setFocusedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch evaluation data using React Query
  const { data: evaluationData = [] } = useQuery({
    queryKey: ['evaluation'],
    queryFn: evaluationAPI.getAll,
  });

  // Filter data - only show returned items
  const allData = useMemo(() => {
    return evaluationData.filter(
      (item) =>
        item.toga_size !== null &&
        item.toga_size !== undefined &&
        item.return_status !== "Not Returned" &&
        item.return_status !== null &&
        item.return_status !== undefined
    );
  }, [evaluationData]);

  // Client-side search filtering
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) {
      return allData;
    }

    const normalize = str => str.replace(/[\s.,]/g, '').toLowerCase();
    const normalizedSearch = normalize(searchTerm);

    return allData.filter(item => {
      const fullName = `${item.surname || ''}, ${item.first_name || ''}${item.middle_initial ? ' ' + item.middle_initial : ''}`;
      const normalizedName = normalize(fullName);
      
      // Also search by ID number and course
      const idNumber = normalize(item.id_number || '');
      const course = normalize(item.course || '');
      
      return normalizedName.includes(normalizedSearch) || 
             idNumber.includes(normalizedSearch) ||
             course.includes(normalizedSearch);
    });
  }, [allData, searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div
      className={`w-screen h-screen overflow-hidden grid grid-rows-1 md:grid-rows-1 transition-transform duration-500 ease-in-out ${
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
            focusedStatus={focusedStatus}
            setFocusedStatus={setFocusedStatus}
            allCount={allData.length}
            evaluatedCount={
              allData.filter((item) => item.evaluation_status === "Evaluated")
                .length
            }
            NotEvaluatedCount={
              allData.filter(
                (item) => item.evaluation_status === "Not Evaluated"
              ).length
            }
          />
        </div>
      )}
      {/* Main content */}
      <div className="bg-[#F3F9FF] w-full h-full overflow-hidden">
        {/* NavBar always at the top */}
        <div className="w-full h-10 pt-12.5 flex items-center relative">
          <Navbar
            modifyTable={modifyTable}
            setmodifyTable={setmodifyTable}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onSearch={handleSearch}
            searchTerm={searchTerm}
          />
        </div>
        <div className="w-full flex flex-col">
          <div className="w-full h-full overflow-hidden flex flex-col flex-1">
            <div className="overflow-hidden flex mx-auto w-full animate-fade-in ">
              <EvaluationTable
                modifyTable={modifyTable}
                setValue={setValue}
                setEvaluationTab={setEvaluationTab}
                isAll={isAll}
                isevalTab={isEvaluationTab}
                isnotevalTab={isNotEvaluationTab}
                isAZ={isAZ}
                isZA={isZA}
                allData={filteredData}
              />
              <button
                className="hidden md:block absolute bg-gray-100 z-0  opacity-80 top-1/2 -translate-y-1/2 border border-gray-300 rounded-full shadow p-1 hover:bg-gray-100 transition"
                onClick={() => setSidebarOpen((open) => !open)}
                aria-label={sidebarOpen ? "Minimize sidebar" : "Open sidebar"}
                style={{ marginLeft: 10 }}
              >
                <span className="text-xl text-[#2840A1]">
                  {sidebarOpen ? "\u2190" : "\u2192"}
                </span>
              </button>
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
