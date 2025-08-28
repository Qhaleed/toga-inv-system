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
  const [dashboard, setDashboard] = useState([]);
  const [sortOrder, setSortOrder] = useState("name-asc"); // default to A-Z

  //fetch info from db
  useEffect(() => {
    fetch("http://localhost:5001/inventory")
      .then((res) => res.json())
      .then((data) => {
        const filteredData = data.filter(
          (item) =>
            item.toga_size !== null &&
            item.toga_size !== undefined
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
        item.toga_size !== undefined
    );
    setFilteredData(filtered);
  };

  //sorting
  useEffect(() => {
    let filtered = [...filteredData];
    if (sortOrder === "name-asc") {
      filtered.sort((a, b) =>
        (a.surname + ", " + a.first_name).localeCompare(
          b.surname + ", " + b.first_name
        )
      );
    } else if (sortOrder === "name-desc") {
      filtered.sort((a, b) =>
        (b.surname + ", " + b.first_name).localeCompare(
          a.surname + ", " + a.first_name
        )
      );
    } else if (sortOrder === "oldest") {
      filtered.sort((a, b) => new Date(b.rent_date) - new Date(a.rent_date));
    } else if (sortOrder === "newest") {
      filtered.sort((a, b) => new Date(a.rent_date) - new Date(b.rent_date));
    }
    setDashboard(filtered);
  }, [sortOrder, filteredData]);

  return (
    <div
      className={`w-screen h-screen overflow-hidden grid grid-rows-1 md:grid-rows-1 transition-transform duration-500 ease-in-out ${sidebarOpen
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
              allData.filter((item) => item.return_status === "Returned").length
            }
            notReturnedCount={
              allData.filter((item) => item.return_status === "Not Returned").length
            }
            setSortOrder={setSortOrder}
          />
        </div>
      )}
      {/* Main content */}
      <div className="bg-[#F3F9FF] w-full h-full overflow-hidden">
        {/* NavBar always at the top */}
        <div className="w-full h-10 pt-12.5 flex items-center relative">
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
        <div className="w-full flex flex-col">
          <div className="w-full h-full overflow-hidden flex flex-col flex-1">
            <div className="overflow-hidden flex mx-auto w-full animate-fade-in ">
              {/* sidebar opener */}
              <button
                className="hidden md:block absolute bg-gray-100 z-0 opacity-80 top-1/2 -translate-y-1/2 border border-gray-300 rounded-full shadow p-1 hover:bg-gray-300 transition"
                onClick={() => setSidebarOpen((open) => !open)}
                aria-label={sidebarOpen ? "Minimize sidebar" : "Open sidebar"}
                style={{ marginLeft: 10 }}
              >
                <span className="text-xl text-[#2840A1]">
                  {sidebarOpen ? "\u2190" : "\u2192"}
                </span>
              </button>
              <Table
                isGrid={isGrid}
                modifyTable={modifyTable}
                isAll={isAll}
                isReturnedTab={isReturnedTab}
                isNotReturnedTab={isNotReturnedTab}
                isAZ={isAZ}
                isZA={isZA}
                allData={dashboard}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
