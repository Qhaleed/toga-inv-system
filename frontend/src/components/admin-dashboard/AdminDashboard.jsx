import React from "react";
import { PieChartDash } from "../ui/pie-chart";
function AdminDashboard() {
  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
      {/* Pie Chart 1 */}
      <div className="flex justify-center">
        <PieChartDash />
      </div>
      {/* Pie Chart 2 */}
      <div className="flex justify-center">
        <PieChartDash />
      </div>
      {/* Pie Chart 3 */}
      <div className="flex justify-center">
        <PieChartDash />
      </div>
      {/* Bar Graph or Large Content Box */}
      <div className="col-span-1 md:col-span-3 flex justify-center items-center bg-amber-600">
        <div className="bg-white w-full rounded-2xl shadow-2xl h-[40vh] flex items-center justify-center">
          bar graph div
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
