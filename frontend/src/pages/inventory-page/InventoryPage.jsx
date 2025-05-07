import React from "react";
import SideBar from "../../components/common/SideBar";
import NavBar from "../../components/common/NavBar";
import MyChart from "../../components/ui/my-chart";
import Profile from "../../assets/images/dump.jpg"; // Adjust the path as necessary

const InventoryPage = ({ activeTab, setActiveTab, setSortOrder }) => {
  return (
    <div className="h-fit w-screen relative bg-[#EBEBEB] font-figtree font-medium">
      {/* Responsive grid: sidebar above on mobile, left on desktop */}
      <div className="max-w-full relative grid grid-cols-1 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 sm:gap-0 sm:top-0 sm:left-0 sm:h-screen sm:w-screen">
        {/* Sidebar: full width above on mobile, left on desktop */}
        <div className="w-full sm:col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1 bg-[#001C47] text-white hidden sm:block h-full">
          <SideBar
            alwaysShowOnLarge
            setSortOrder={setSortOrder}
            activeTab={activeTab}
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
              <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-2 sm:p-6 gap-8 min-w-0 overflow-x-auto w-full">
              <div className="w-full max-w-screen-lg bg-white rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col items-center overflow-x-auto min-w-0">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#001C47] mb-4 w-full text-center">
                  Inventory Statistics (i'figma layout ko muna hehe)
                </h1>
                <h2 className="text-lg sm:text-xl font-semibold text-[#02327B] mb-2 w-full text-center">
                  Overview of Inveniggastory
                </h2>
                <p className="text-gray-600 mb-6 text-center max-w-2xl w-full">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptate, voluptatem quo omnis provident ad aliquid minima
                  ducimus distinctio quasi architecto mollitia vel ipsam nostrum
                  reiciendis iste esse, officiis nobis saepe!
                </p>
                <span className=" absolute text-l w-50 bottom-70 border-8   text-gray-500 animate-ping 3d-spin">
                  <img src={Profile} alt="" />
                </span>
                <div className="w-full flex justify-center items-center min-h-[250px] sm:min-h-[350px] overflow-x-auto">
                  <MyChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
