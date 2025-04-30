import { ReactComponent as Home } from "../../assets/icons/blue-house.svg";
import { ReactComponent as Inventory } from "../../assets/icons/blue-inventory.svg";
import { ReactComponent as Search } from "../../assets/icons/blue-search.svg";
import { ReactComponent as Application } from "../../assets/icons/blue-applications.svg";
import { ReactComponent as Grid } from "../../assets/icons/white-grid.svg";
import { ReactComponent as GrayGrid } from "../../assets/icons/gray-grid.svg";
import { ReactComponent as Rows } from "../../assets/icons/white-row.svg";
import { ReactComponent as GrayRows } from "../../assets/icons/gray-rows.svg";
import { ReactComponent as GrayInventory } from "../../assets/icons/gray-inventory.svg";
import { ReactComponent as GrayHouse } from "../../assets/icons/gray-house.svg";
import { ReactComponent as Statistic } from "../../assets/icons/blue-reports.svg";
import { ReactComponent as GrayStatistic } from "../../assets/icons/gray-statistics.svg";
import { ReactComponent as GrayApplication } from "../../assets/icons/gray-checkgray.svg";
import { useState } from "react";

const Navbar = ({ isGrid, setIsGrid }) => {
  // Tab states
  const [dashboardToggle, setdashboardToggle] = useState(true);
  const [inventoryToggle, setinventoryToggle] = useState(false);
  const [pendingToggle, setpendingToggle] = useState(false);
  const [evaluationToggle, setevaluationToggle] = useState(false);

  // Dashboard tab switch
  const switchDashboard = () => {
    setdashboardToggle(true);
    setinventoryToggle(false);
    setpendingToggle(false);
    setevaluationToggle(false);
  };
  // Inventory tab switch
  const switchInventory = () => {
    setdashboardToggle(false);
    setinventoryToggle(true);
    setpendingToggle(false);
    setevaluationToggle(false);
  };
  // Pending tab switch
  const switchPending = () => {
    setdashboardToggle(false);
    setinventoryToggle(false);
    setpendingToggle(true);
    setevaluationToggle(false);
  };
  // Evaluation tab switch
  const switchEvaluation = () => {
    setdashboardToggle(false);
    setinventoryToggle(false);
    setpendingToggle(false);
    setevaluationToggle(true);
  };

  // Toggle grid/row
  const switchSize = () => {
    setIsGrid((prev) => !prev);
  };

  // Tab/toggle classes
  const dashboard = dashboardToggle
    ? "hover:scale-110 bg-gray-300 border border-[#02327B] flex ml-6 justify-center mr-6 items-center w-36 h-7 text-[#02327B] rounded-xl transition-all ease-out duration-500"
    : "hover:scale-110 mr-6 flex ml-6 justify-center items-center w-36 h-7 text-gray-500 border border-gray-500 rounded-xl transition-all ease-out duration-500";
  const inventory = !inventoryToggle
    ? "hover:scale-110 border border-gray-500 flex justify-center items-center w-36 h-7 mr-6 text-gray-500 rounded-xl opacity-100 transition-all ease-out duration-500"
    : "hover:scale-110 bg-gray-300 border mr-6 border-[#02327B] flex justify-center items-center w-36  h-7 text-[#02327B] rounded-xl transition-all ease-out duration-500";
  const pending = !pendingToggle
    ? "hover:scale-110 border border-gray-500 flex justify-center items-center w-36 h-7 text-gray-500 rounded-xl mr-6 opacity-100 transition-all ease-out duration-500"
    : "hover:scale-110 bg-gray-300 border mr-6 border-[#02327B] flex justify-center items-center w-36 h-7 text-[#02327B]  rounded-xl hover:opacity-100 transition-all ease-out duration-500";
  const evaluation = !evaluationToggle
    ? "hover:scale-110 border border-gray-500 flex justify-center items-center w-36 h-7 text-gray-500 rounded-xl opacity-100 transition-all ease-out duration-500"
    : "hover:scale-110 bg-gray-300 border border-[#02327B] flex justify-center items-center w-36 h-7 text-[#02327B] rounded-xl hover:opacity-100 transition-all ease-out duration-500";
  // Row/grid toggle classes
  const row = !isGrid
    ? "h-10 w-14 bg-[#02327B] flex justify-center items-center rounded-xl transition-all duration-300 shadow-md hover:shadow-xl hover:scale-110 animate-slide-in-left"
    : "h-10 w-10 flex justify-center items-center rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg animate-slide-in-left";
  const grid = isGrid
    ? "h-10 w-14 bg-[#02327B] flex justify-center items-center rounded-xl transition-all duration-300 shadow-md hover:shadow-xl hover:scale-110 animate-slide-in-right"
    : "h-10 w-10 flex justify-center items-center rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg animate-slide-in-right";

  // Icon depende sa tab
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
    <Rows className="w-8 p-1"></Rows>
  ) : (
    <GrayRows className="w-7 p-1"></GrayRows>
  );
  const gridIcon = isGrid ? (
    <Grid className="w-8 p-1"></Grid>
  ) : (
    <GrayGrid className="w-7 p-1"></GrayGrid>
  );

  return (
    <div className="h-32">
      {/* Top nav */}
      <div className="h-1/2 flex justify-start items-center ">
        {/* Tabs */}
        <button onClick={switchDashboard} className={dashboard}>
          <span>{houseiconToggle}</span>
          <span className="text-xs ml-3">Dashboard</span>
        </button>
        <button onClick={switchInventory} className={inventory}>
          <span>{inventoryiconToggle}</span>
          <span className="text-xs mx-3">Inventory</span>
        </button>
        <button onClick={switchPending} className={pending}>
          <span>{pendingiconToggle}</span>
          <span className="text-xs mx-3">Pending</span>
        </button>
        <button onClick={switchEvaluation} className={evaluation}>
          <span>{evaluationiconToggle}</span>
          <span className="text-xs mx-3">Evaluation</span>
        </button>
      </div>
      <div className="h-1/2 flex justify-start items-center transition-all duration-500">
        {/* Search at toggle */}
        <div className="ml-6 mr-6 w-[600px] transform-all ease-out duration-500 transition-all">
          <div className="relative">
            <Search className="absolute w-8 top-2.5 left-2.5"></Search>
          </div>
          <input
            className="bg-[#E2E2E2] shadow-inner shadow-gray-500 w-full px-10 py-2 text-[#02327B] rounded-xl outline-none transform-all ease-out duration-500 transition-all placeholder:text-[#02327B]"
            type="text"
            placeholder="Search student..."
          />
        </div>
        <div className="h-10 w-20 bg-[#E2E2E2] shadow-inner shadow-gray-500 rounded-xl flex justify-around items-center mr-5 transition-all duration-500">
          {/* Toggle view btns */}
          <button onClick={switchSize} className={row}>
            {rowIcon}
          </button>
          <button onClick={switchSize} className={grid}>
            {gridIcon}
          </button>
        </div>
        <button className="hover:scale-105 h-10 w-40 bg-[#0C7E48] rounded-xl text-white transform-all ease-out duration-500 transition-all">
          Modify Table
        </button>
      </div>
    </div>
  );
};

export default Navbar;
