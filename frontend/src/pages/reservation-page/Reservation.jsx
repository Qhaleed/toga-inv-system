import React, { useState, useEffect } from "react";
import SideBar from "../../components/navigations/SideBar";
import NavBar from "../../components/navigations/NavBar";
import Table from "../../components/common/Table";

const ReservationPage = () => {
  const [isGrid, setIsGrid] = useState(false);
  const [modifyTable, setmodifyTable] = useState(false);
  const [activeTab, setActiveTab] = useState("reservation");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // Reservation tab filtering/sorting states
  const [isAll, setIsAll] = useState(true);
  const [isReturnedTab, setIsReturnedTab] = useState(false);
  const [isNotReturnedTab, setIsNotReturnedTab] = useState(false);
  const [isAZ, setIsAZ] = useState(false);
  const [isZA, setIsZA] = useState(false);
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // FOR SEARCH BAR


  //fetch info from db
  useEffect(() => {
    fetch("http://localhost:5001/inventory")
      .then((res) => res.json())
      .then((data) => {
        const filteredData = data.filter(
          (item) => 
            item.toga_size !== null &&
            item.toga_size !== undefined &&
            item.status !== "Pending" &&
            item.status !== null &&
            item.status !== undefined
        );
        setAllData(filteredData);
      });
  }, []);

//para ma filter ang data if nag search
  useEffect(() => {
  setFilteredData(allData);
}, [allData]);

  const handleEvaluationSearch = (results) => {
  const filtered = results.filter(
    (item) =>
      item.toga_size !== null &&
      item.toga_size !== undefined &&
      item.status !== "Pending" &&
      item.status !== null &&
      item.status !== undefined
  );
  setFilteredData(filtered);
};

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
            setIsReturnedTab={setIsReturnedTab}
            setIsNotReturnedTab={setIsNotReturnedTab}
            setIsAZ={setIsAZ}
            setIsZA={setIsZA}
            allCount={allData.length}
            returnedCount={
              allData.filter((item) => item.status === "Returned").length
            }
            notReturnedCount={
              allData.filter((item) => item.status === "Not Returned").length
            }
          />
        </div>
      )}
      {/* Main content */}
      <div className="bg-[#F3F9FF] w-full h-full">
        {/* NavBar always at the top */}
        <div className="w-full z-10 h-14 pt-15 flex items-center relative">
          <NavBar
            isGrid={isGrid}
            setIsGrid={setIsGrid}
            modifyTable={modifyTable}
            setmodifyTable={setmodifyTable}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onSearch={handleEvaluationSearch}
          />
        </div>
        <div className="w-full relative h-full flex flex-col">
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
          <div className="w-full h-full overflow-hidden flex flex-col flex-1">
            <div className="overflow-hidden flex mx-auto w-full animate-fade-in ">
              <Table
                isGrid={isGrid}
                modifyTable={modifyTable}
                isAll={isAll}
                isReturnedTab={isReturnedTab}
                isNotReturnedTab={isNotReturnedTab}
                isAZ={isAZ}
                isZA={isZA}
                allData={filteredData}
                
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
