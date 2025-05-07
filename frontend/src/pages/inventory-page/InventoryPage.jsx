import React from "react";
import SideBar from "../../components/common/SideBar";
import NavBar from "../../components/common/NavBar";
import MyChart from "../../components/ui/my-chart";

const InventoryPage = () => {
  return (
    <div className="flex h-screen w-screen bg-[#EBEBEB] font-figtree font-medium">
      {/* Sidebar instance for Inventory */}
      <div className="w-1/4 h-full bg-[#001C47] text-white hidden sm:block">
        <SideBar activeTab="inventory" />
      </div>
      <div className="flex-1 flex flex-col h-full">
        <NavBar activeTab="inventory" />
        {/* Main content area: Inventory Statistics */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 gap-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#001C47] mb-4">
            Inventory Statistics (layout ko muna sa figma)
          </h1>
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold text-[#02327B] mb-2">
              Overview to ng Inventory statistics niggers
            </h2>
            <p className="text-gray-600 mb-6 text-center max-w-2xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptate, voluptatem quo omnis provident ad aliquid minima
              ducimus distinctio quasi architecto mollitia vel ipsam nostrum
              reiciendis iste esse, officiis nobis saepe!
            </p>
            <div className="w-full flex justify-center items-center min-h-[350px]">
              <MyChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
