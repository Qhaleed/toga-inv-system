import React from "react";
import { PieChartDash } from "../ui/pie-chart";
function AdminDashboard() {
  return (
    <>
      <div className="text-4xl absolute  font-figtree-light"> Reports </div>\
      {/* box dfetails */}
      <div className="   flex  bg-amber-100  gap-4 w-full h-full mt-20">
        <div className="dash-container flex ">
          <PieChartDash />
        </div>
        <div className="dash-container  flex">
          <PieChartDash />
        </div>
        <div className="dash-container flex content-center">
          <PieChartDash />
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
