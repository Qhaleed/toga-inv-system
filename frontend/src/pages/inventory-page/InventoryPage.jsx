import React from "react";
import SideBar from "../../components/common/SideBar";
import NavBar from "../../components/common/NavBar";
import MyChart from "../../components/ui/my-chart";

const InventoryPage = () => {
  return (
    <div className="flex h-screen w-screen bg-[#EBEBEB] font-figtree font-medium overflow-hidden">
      {/* Sidebar instance for Inventory */}
      <div className="w-1/4 h-full bg-[#001C47] text-white hidden sm:block">
        <SideBar activeTab="inventory" />
      </div>
      <div className="flex-1 flex flex-col h-full min-w-0">
        <NavBar activeTab="inventory" />
        {/* Main content area: Inventory Statistics */}
        <div className="flex-1 flex flex-col items-center justify-center p-2 sm:p-6 gap-8 min-w-0 overflow-x-auto">
          <div className="w-full max-w-screen-lg bg-white rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col items-center overflow-x-auto min-w-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#001C47] mb-4 w-full text-center">
              Inventory Statistics (LAYOUT KO MUNA SA FIGMA handleEditChange)
            </h1>
            <h2 className="text-lg sm:text-xl font-semibold text-[#02327B] mb-2 w-full text-center">
              Overview of Inventorrrry nigghas
            </h2>
            <p className="text-gray-600 mb-6 text-center max-w-2xl w-full">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptate, voluptatem quo omnis provident ad aliquid minima
              ducimus distinctio quasi architecto mollitia vel ipsam nostrum
              reiciendis iste esse, officiis nobis saepe!
            </p>
            <div className="w-full flex justify-center items-center min-h-[250px] sm:min-h-[350px] overflow-x-auto">
              <MyChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
