import React from "react";
import SideBar from "../../components/common/SideBar";
import NavBar from "../../components/common/NavBar";

const PendingPage = () => {
  return (
    <div className="flex h-screen w-screen bg-[#EBEBEB] font-figtree font-medium">
      {/* Sidebar instance for Pending */}
      <div className="w-1/4 h-full bg-[#001C47] text-white hidden sm:block">
        <SideBar activeTab="pending" />
      </div>
      <div className="flex-1 flex flex-col h-full">
        <NavBar activeTab="pending" />
        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-3xl font-bold">Pending Page Content</h1>
        </div>
      </div>
    </div>
  );
};

export default PendingPage;
