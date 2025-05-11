import React, { useState, useEffect } from "react";
import Table from "../../components/common/Table";
import SideBar from "../../components/navigations/SideBar";
import NavBar from "../../components/navigations/NavBar";

const ReservationPage = () => {
  // States for grid, modifyTable, and sortOrder
  const [isGrid, setIsGrid] = useState(false);
  const [modifyTable, setmodifyTable] = useState(false);
  const [sortOrder, setSortOrder] = useState("name-asc");
  const [tableData, setTableData] = useState([]);
  const [activeTab, setActiveTab] = useState("reservation"); // State for active tab
  // Ensure activeTab defaults to "inventory" for this page

  // Fetch reservation data from backend with sortOrder
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:5001/inventory?sort=${sortOrder}`
        );
        const data = await res.json();
        const mappedData = data.map((item) => ({
          id: item.inventory_id,
          studentname: item.renters_name,
          program: item.course,
          tassel: item.tassel_color,
          hood: item.hood_color,
          gown: item.toga_size,
          dateofreservation: item.rent_date
            ? new Date(item.rent_date).toLocaleDateString()
            : "",
          status: item.return_status,
          payment_status: item.payment_status,
          evaluation_status: item.evaluation_status,
          remarks: item.remarks,
          return_date: item.return_date,
          is_overdue: item.is_overdue,
          has_cap: item.has_cap,
          item_condition: item.item_condition,
        }));
        setTableData(mappedData);
      } catch {
        setTableData([]);
      }
    };
    fetchData();
  }, [sortOrder]);

  // Handler functions for sort buttons
  const handleSortNameAsc = () => setSortOrder("name-asc");
  const handleSortNameDesc = () => setSortOrder("name-desc");
  const handleSortDateNewest = () => setSortOrder("newest");
  const handleSortDateOldest = () => setSortOrder("oldest");

  return (
    <div className="h-fit w-screen relative bg-[#EBEBEB] font-figtree font-medium">
      {/* Responsive grid: sidebar above on mobile, left on desktop */}
      <div className="max-w-full relative grid grid-cols-1 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 sm:gap-0 sm:top-0 sm:left-0 sm:h-screen sm:w-screen">
        {/* Sidebar: full width above on mobile, left on desktop */}
        <div className="w-full sm:col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1 bg-[#001C47] text-white hidden sm:block h-full">
          <SideBar
            alwaysShowOnLarge
            setSortOrder={setSortOrder}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            focusedSort={sortOrder}
            handleSortNameAsc={handleSortNameAsc}
            handleSortNameDesc={handleSortNameDesc}
            handleSortDateNewest={handleSortDateNewest}
            handleSortDateOldest={handleSortDateOldest}
          />
        </div>

        {/* Main content: full width on mobile, right of sidebar on desktop */}
        <div className="w-full flex-1 md:col-span-3 xl:col-span-3 2xl:col-span-4 sm:col-span-3 overflow-x-auto sm:overflow-x-visible col-span-1 h-full">
          <div
            className="w-full h-screen overflow-hidden flex flex-col items-center"
            style={{ maxWidth: "100vw" }}
          >
            <div
              className="w-full"
              style={{ height: "60px", marginBottom: "10px" }}
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
            <Table
              isGrid={isGrid}
              modifyTable={modifyTable}
              sortOrder={sortOrder}
              data={tableData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
