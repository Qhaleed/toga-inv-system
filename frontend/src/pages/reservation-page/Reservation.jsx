import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from '@tanstack/react-query';
import SideBar from "../../components/navigations/SideBar";
import NavBar from "../../components/navigations/NavBar";
import Table from "../../components/common/Table";
import { inventoryAPI } from "../../lib/api";

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
  const [filteredData, setFilteredData] = useState([]); // FOR SEARCH BAR
  const [dashboard, setDashboard] = useState([]);
  const [sortOrder, setSortOrder] = useState("name-asc"); // default to A-Z
  const [searchTerm, setSearchTerm] = useState("");

  //fetch info from db using React Query
  const { data: inventoryData = [] } = useQuery({
    queryKey: ['inventory'],
    queryFn: inventoryAPI.getAll,
  });

  // Filter data - only show users with toga assigned
  const allData = useMemo(() => {
    return inventoryData.filter(
      (item) =>
        item.toga_size !== null &&
        item.toga_size !== undefined
    );
  }, [inventoryData]);

  // Client-side search filtering
  const searchFilteredData = useMemo(() => {
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

  //para ma filter ang data if nag search
  useEffect(() => {
    setFilteredData(searchFilteredData);
  }, [searchFilteredData]);

  const handleSearch = (term) => {
    setSearchTerm(term);
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
            onSearch={handleSearch}
            searchTerm={searchTerm}
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
