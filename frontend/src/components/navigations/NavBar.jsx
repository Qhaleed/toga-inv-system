import Home from "../../assets/icons/blue-house.svg?react";
import Inventory from "../../assets/icons/blue-inventory.svg?react";
import Search from "../../assets/icons/blue-search.svg?react";
import Application from "../../assets/icons/blue-applications.svg?react";
import GrayInventory from "../../assets/icons/gray-inventory.svg?react";
import GrayHouse from "../../assets/icons/gray-house.svg?react";
import Statistic from "../../assets/icons/blue-reports.svg?react";
import GrayStatistic from "../../assets/icons/gray-statistics.svg?react";
import GrayApplication from "../../assets/icons/gray-checkgray.svg?react";
import GrayRows from "../../assets/icons/gray-rows.svg?react";
import GrayGrid from "../../assets/icons/gray-grid.svg?react";
import Rows from "../../assets/icons/white-row.svg?react";
import Grid from "../../assets/icons/white-grid.svg?react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoaderAnimation from "../login-card/LoaderAnimation";

const Navbar = ({
  isGrid,
  setIsGrid,
  modifyTable,
  setmodifyTable,
  activeTab,
  setActiveTab, // <-- add this prop to update activeTab state
  onSearch, // <-- add this prop for search callback
}) => {
  const editallClicked = () => {
    setmodifyTable((prev) => !prev);
  };

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [sortOption] = useState(""); // Removed unused setter

  // Disable controls if search bar is active
  const searchActive = searchValue.trim().length > 0;

  const tabClass = (tabName) =>
    activeTab === tabName
      ? "hover:scale-105 bg-blue-100 ring-0.5 border border-blue-700 flex ml-2 justify-center mr-2 items-center md:w-30 lg:h-6 lg:w-40 lg:h-6 w-18 h-4 text-xs rounded-lg transition-all ease-out duration-500"
      : "hover:scale-105 hover:bg-blue-100 hover:text-blue-700 bg-gray-200 text-gray-500 border border-gray-400 flex ml-2 justify-center mr-2 items-center md:w-30 lg:h-6 lg:w-40 lg:h-6 w-18 h-4 text-xs rounded-lg transition-all ease-out duration-500";

  const handleNavigation = (tabName, route) => {
    if (activeTab !== tabName) {
      setActiveTab(tabName); // Update activeTab state
      navigate(route);
    }
  };

  const rowIcon = (
    <Rows
      className={`w-7 p-1 ${
        !isGrid ? "text-white fill-white" : "text-gray-500 fill-gray-500"
      }`}
    />
  );

  const gridIcon = (
    <Grid
      className={`w-7 p-1 ${
        isGrid ? "text-white fill-white" : "text-gray-500 fill-gray-500"
      }`}
    />
  );

  const isEvaluation = activeTab === "evaluation" ? "hidden" : "block";

  // eto ung logut butson
  const handleLogout = () => {
    setLoading(true);
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 1500);
  };

  // Update search handler to include sorting
  const handleSearch = async (e) => {
    if ((e && e.key === "Enter") || e === "iconClick") {
      try {
        setLoading(true);
        let query = `http://localhost:5001/inventory?search=${encodeURIComponent(
          searchValue
        )}`;
        if (sortOption) {
          query += `&sort=${encodeURIComponent(sortOption)}`;
        }
        const res = await fetch(query);
        if (!res.ok) throw new Error("Failed to fetch inventory");
        const data = await res.json();
        if (onSearch) onSearch(data);
      } catch (err) {
        alert("Error searching inventory: " + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <LoaderAnimation />
        </div>
      )}
      <div className="h-24 relative ">
        {/* Top Navigation */}
        <div className="h-1/2 flex justify-start items-center ml-14 md:ml-10 mr-2">
          {/* Dashboard button */}
          <button
            onClick={() => navigate("/admin-dashboard")}
            className={`${tabClass("dashboard")} removeEffect`}
          >
            <span className="w-3">
              <Home className="w-4" />
            </span>
            <span className="text-[12px] mx-1 md:mx-6 content-center ">
              Dashboard
            </span>
          </button>

          <button
            onClick={() => handleNavigation("inventory", "/inventory")}
            className={`${tabClass("inventory")} removeEffect`}
          >
            <span className="w-3">
              <Inventory className="w-4" />
            </span>
            <span className="text-[12px] mx-2 md:mx-4">Inventory</span>
          </button>

          <button
            onClick={() => handleNavigation("pending", "/pending")}
            className={`${tabClass("pending")} removeEffect`}
          >
            <span className="w-3">
              <Statistic className="w-4" />
            </span>
            <span className="text-[12px] mx-2 md:mx-6 content-center">
              Pending
            </span>
          </button>

          <button
            onClick={() => navigate("/evaluation-page")}
            className={`${tabClass("evaluation")} removeEffect`}
          >
            <span className="w-3">
              <Application className="w-4" />
            </span>
            <span className="text-[12px]  mx-1  md:mx-4">Evaluation</span>
          </button>

          <button
            onClick={() => navigate("/reservation")}
            className={`${tabClass("reservation")} removeEffect`}
          >
            <span className="w-3">
              <Application className="w-4" />
            </span>
            <span className="text-[12px] mx-1 md:mx-4">Reservation</span>
          </button>

          {/* Logout button at top right */}
          <div className="relative ml-auto mr-5 ">
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold  md:text-[13px] text-[9px]  sm:py-1 md:py-2 md:px-6 md:mt-1 sm:px-5 py-1 px-3 mb-1 sm:mb-0 rounded-2xl shadow transition-all duration-500"
              style={{ minWidth: 20 }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Bottom Navigation */}
        {/* Removed bottom navigation for dashboard as requested */}
        {activeTab !== "inventory" &&
          activeTab !== "pending" &&
          activeTab !== "dashboard" && (
            <div className="h-1/2  animate-fade-in flex justify-start items-center">
              <div className="w-full max-w-[150px] sm:max-w-[200px] md:max-w-[300px] lg:max-w-[400px] xl:max-w-[800px]">
                <div className="relative lg:ml-14 md:ml-10 ml-8 mr-2">
                  <Search className="absolute w-5 top-1 left-2" />
                  <input
                    className="bg-[#E2E2E2] shadow-inner h-8 shadow-gray-500 w-full px-10 py-1 text-xs text-[#02327B] rounded-lg outline-none placeholder:text-[#02327B] focus:outline focus:outline-1.5 focus:outline-[#02327B]"
                    type="text"
                    placeholder="Search student..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={handleSearch}
                  />
                </div>
              </div>
              <div
                className={`h-7 w-22 bg-[#E2E2E2] shadow-inner shadow-gray-500 rounded-lg flex justify-around items-center ml-6 mr-8 md:mr-2 ${isEvaluation}`}
              >
                <button
                  onClick={() => setIsGrid(false)}
                  className={`h-7 w-8 md:h-7 md:w-10 removeEffect flex justify-center items-center rounded-lg transition-all duration-200 shadow-md hover:shadow-xl hover:scale-105 ${
                    !isGrid
                      ? "bg-[#02327B] text-white"
                      : "bg-[#E2E2E2] text-gray-500 opacity-70 hover:opacity-100"
                  } ${searchActive ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={searchActive}
                >
                  {rowIcon}
                </button>
                <button
                  onClick={() => setIsGrid(true)}
                  className={`h-7 w-8 md:h-7 md:w-10 removeEffect flex justify-center items-center rounded-lg transition-all duration-200 shadow-md hover:shadow-xl hover:scale-105 ${
                    isGrid
                      ? "bg-[#02327B] text-white"
                      : "bg-[#E2E2E2] text-gray-500 opacity-70 hover:opacity-100"
                  } ${searchActive ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={searchActive}
                >
                  {gridIcon}
                </button>
              </div>
              <button
                className={`${isEvaluation} hover:scale-105 h-7 px-3 removeEffect  w-20 text-[10px] whitespace-nowrap md:w-28 rounded-lg md:text-xs text-white md:ml-2 md:mr-3 mr-10 ${
                  modifyTable
                    ? "bg-[#0C7E48] ring-black opacity-70 shadow-[0px_0px_2px_.9px_#3f3f3f] active:opacity-60  ] hover:opacity-100"
                    : "bg-[#0C7E48] active:font-semibold hover:bg-[#949494] hover:text-red font-semibold active:opacity-60"
                } ${searchActive ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={editallClicked}
                disabled={searchActive}
              >
                {modifyTable ? "Save Table" : "Modify Table"}
              </button>
            </div>
          )}
      </div>
    </>
  );
};

export default Navbar;
