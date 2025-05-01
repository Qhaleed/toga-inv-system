import { ReactComponent as Home } from "../../assets/icons/blue-house.svg";
import { ReactComponent as Inventory } from "../../assets/icons/blue-inventory.svg";
import { ReactComponent as Search } from "../../assets/icons/blue-search.svg";
import { ReactComponent as Application } from "../../assets/icons/blue-applications.svg";
import { ReactComponent as GrayInventory } from "../../assets/icons/gray-inventory.svg";
import { ReactComponent as GrayHouse } from "../../assets/icons/gray-house.svg";
import { ReactComponent as Statistic } from "../../assets/icons/blue-reports.svg";
import { ReactComponent as GrayStatistic } from "../../assets/icons/gray-statistics.svg";
import { ReactComponent as GrayApplication } from "../../assets/icons/gray-checkgray.svg";
import { ReactComponent as GrayRows } from "../../assets/icons/gray-rows.svg";
import { ReactComponent as GrayGrid } from "../../assets/icons/gray-grid.svg";
import { ReactComponent as Rows } from "../../assets/icons/white-row.svg";
import { ReactComponent as Grid } from "../../assets/icons/white-grid.svg";
import { useState } from "react";

/*

    Follow these if you use SideBar and Navbar!

    <div className="h-screen overflow-hidden w-screen fixed bg-linear-primary bg-cover font-figtree font-medium">
        <div className="h-screen fixed w-screen grid grid-cols-4 ">
            <SideBar />
            <div className="col-span-3 h-full">
                <Navbar />
                <-- INPUT YOUR CODE HERE -->
            </div>
        </div>
    </div>    


*/

const Navbar = ({ isGrid, setIsGrid }) => {
  // TOGGLE EFFECTS

  const [dashboardToggle, setdashboardToggle] = useState(true);
  const [inventoryToggle, setinventoryToggle] = useState(false);
  const [pendingToggle, setpendingToggle] = useState(false);
  const [evaluationToggle, setevaluationToggle] = useState(false);

  const switchDashboard = () => {
    setdashboardToggle(true);
    setinventoryToggle(false);
    setpendingToggle(false);
    setevaluationToggle(false);
  };
  const switchInventory = () => {
    setdashboardToggle(false);
    setinventoryToggle(true);
    setpendingToggle(false);
    setevaluationToggle(false);
  };

  const switchPending = () => {
    setdashboardToggle(false);
    setinventoryToggle(false);
    setpendingToggle(true);
    setevaluationToggle(false);
  };

  const switchEvaluation = () => {
    setdashboardToggle(false);
    setinventoryToggle(false);
    setpendingToggle(false);
    setevaluationToggle(true);
  };

  // Removed unused switchSize function since each button now has its own onClick logic

  // Use fixed width/margin for all tab classes to prevent shifting
  const dashboard = dashboardToggle
    ? "hover:scale-105 bg-gray-300 border border-[#02327B] flex ml-2 justify-center mr-2 items-center w-28 h-5 text-xs text-[#02327B] rounded-lg transition-all ease-out duration-500"
    : "hover:scale-105 mr-2 flex ml-2 justify-center items-center w-28 h-5 text-xs text-gray-500 border border-gray-500 rounded-lg transition-all ease-out duration-500";
  const inventory = !inventoryToggle
    ? "hover:scale-105 border border-gray-500 flex justify-center items-center w-28 h-5 text-xs text-gray-500 rounded-lg ml-2 mr-2 opacity-100 transition-all ease-out duration-500"
    : "hover:scale-105 bg-gray-300 border border-[#02327B] flex justify-center items-center w-28 h-5 text-xs text-[#02327B] rounded-lg ml-2 mr-2 transition-all ease-out duration-500";
  const pending = !pendingToggle
    ? "hover:scale-105 border border-gray-500 flex justify-center items-center w-28 h-5 text-xs text-gray-500 rounded-lg ml-2 mr-2 opacity-100 transition-all ease-out duration-500"
    : "hover:scale-105 bg-gray-300 border border-[#02327B] flex justify-center items-center w-28 h-5 text-xs text-[#02327B] rounded-lg ml-2 mr-2 hover:opacity-100 transition-all ease-out duration-500";
  const evaluation = !evaluationToggle
    ? "hover:scale-105 border border-gray-500 flex justify-center items-center w-28 h-5 text-xs text-gray-500 rounded-lg ml-2 mr-2 opacity-100 transition-all ease-out duration-500"
    : "hover:scale-105 bg-gray-300 border border-[#02327B] flex justify-center items-center w-28 h-5 text-xs text-[#02327B] rounded-lg ml-2 mr-2 hover:opacity-100 transition-all ease-out duration-500";
  const houseiconToggle = dashboardToggle ? (
    <Home className="w-4"></Home>
  ) : (
    <GrayHouse className="w-4"></GrayHouse>
  );
  const inventoryiconToggle = !inventoryToggle ? (
    <GrayInventory className="w-4"></GrayInventory>
  ) : (
    <Inventory className="w-4"></Inventory>
  );
  const pendingiconToggle = !pendingToggle ? (
    <GrayStatistic className="w-4"></GrayStatistic>
  ) : (
    <Statistic className="w-4"></Statistic>
  );
  const evaluationiconToggle = !evaluationToggle ? (
    <GrayApplication className="w-4"></GrayApplication>
  ) : (
    <Application className="w-4"></Application>
  );
  const rowIcon = !isGrid ? (
    <Rows className="w-7 p-1" style={{ color: "white", fill: "white" }} />
  ) : (
    <GrayRows
      className="w-7 p-1"
      style={{ color: "#6B7280", fill: "#6B7280" }}
    />
  );
  const gridIcon = isGrid ? (
    <Grid className="w-7 p-1" style={{ color: "white", fill: "white" }} />
  ) : (
    <GrayGrid
      className="w-7 p-1"
      style={{ color: "#6B7280", fill: "#6B7280" }}
    />
  );

  return (
    {
      /* Main Container of navs ste */
    },
    (
      <div className="h-24 ">
        {/* Top Navigation nav */}
        <div className="h-1/2 flex justify-start items-center ml-14">
          {/* search Navigation  asta modfy */}
          <button
            onClick={switchDashboard}
            className={dashboard.replace(
              "w-36 h-7",
              "w-28 h-5 text-xs ml-2 mr-2"
            )}
          >
            <span className="w-3">{houseiconToggle}</span>
            <span className="text-[10px] ml-2">Dashboard</span>
          </button>
          <button
            onClick={switchInventory}
            className={inventory.replace(
              "w-36 h-7",
              "w-28 h-5 text-xs ml-2 mr-2"
            )}
          >
            <span className="w-3">{inventoryiconToggle}</span>
            <span className="text-[10px] mx-2">Inventory</span>
          </button>
          <button
            onClick={switchPending}
            className={pending.replace(
              "w-36 h-7",
              "w-28 h-5 text-xs ml-2 mr-2"
            )}
          >
            <span className="w-3">{pendingiconToggle}</span>
            <span className="text-[10px] mx-2">Pending</span>
          </button>
          <button
            onClick={switchEvaluation}
            className={evaluation.replace(
              "w-36 h-7",
              "w-28 h-5 text-xs ml-2 mr-2"
            )}
          >
            <span className="w-3">{evaluationiconToggle}</span>
            <span className="text-[10px] mx-2">Evaluation</span>
          </button>
        </div>
        {/* Bottom Navigation to */}
        <div className="h-1/2 flex justify-start items-center">
          <div className="ml-8 mr-3 w-[400px]">
            <div className="relative ml-7 ">
              <Search className="absolute w-5 top-1 left-2"></Search>
              <input
                className="bg-[#E2E2E2] shadow-inner h-8 shadow-gray-500 w-[520px] px-10 py-1 text-xs text-[#02327B] rounded-lg outline-none placeholder:text-[#02327B] focus:outline focus:outline-2 focus:outline-[#02327B]"
                type="text"
                placeholder="Search student..."
              />
            </div>
          </div>
          <div className="h-7 w-16 bg-[#E2E2E2] shadow-inner shadow-gray-500 rounded-lg flex justify-around items-center ml-40">
            <button
              onClick={() => {
                if (isGrid) setIsGrid(false);
              }}
              className={
                (!isGrid
                  ? "bg-[#02327B] text-white opacity-100"
                  : "bg-[#E2E2E2] text-gray-500 opacity-70 hover:opacity-100") +
                " h-7 w-10 flex justify-center items-center rounded-lg transition-all duration-200 shadow-md hover:shadow-xl hover:scale-105"
              }
            >
              {rowIcon}
            </button>
            <button
              onClick={() => {
                if (!isGrid) setIsGrid(true);
              }}
              className={
                (isGrid
                  ? "bg-[#02327B] text-white opacity-100"
                  : "bg-[#E2E2E2] text-gray-500 opacity-70 hover:opacity-100") +
                " h-7 w-10 flex justify-center items-center rounded-lg transition-all duration-200 shadow-md hover:shadow-xl hover:scale-105"
              }
            >
              {gridIcon}
            </button>
          </div>
          <button className="hover:scale-105 h-7 w-28 bg-[#0C7E48] rounded-lg text-xs text-white ml-2">
            Modify Table
          </button>
        </div>
      </div>
    )
  );
};

export default Navbar;
