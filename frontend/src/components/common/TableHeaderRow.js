import React from "react";

// This header can be reused anywhere outside the table for consistent alignment
const TableHeaderRow = () => (
  <div className="w-full flex bg-[#0C7E48] h-10 rounded-t-lg">
    <div className="flex-1 text-center text-white text-xs font-bold flex items-center justify-center border-r border-gray-600 max-w-[180px]">
      Student Name
    </div>
    <div className="flex-1 text-center text-white text-xs font-bold flex items-center justify-center border-r border-gray-600 max-w-[120px]">
      Program
    </div>
    <div className="flex-1 text-center text-white text-xs font-bold flex items-center justify-center border-r border-gray-600 max-w-[80px]">
      Tassel
    </div>
    <div className="flex-1 text-center text-white text-xs font-bold flex items-center justify-center border-r border-gray-600 max-w-[80px]">
      Hood
    </div>
    <div className="flex-1 text-center text-white text-xs font-bold flex items-center justify-center border-r border-gray-600 max-w-[80px]">
      Gown
    </div>
    <div className="flex-1 text-center text-white text-xs font-bold flex items-center justify-center border-r border-gray-600 max-w-[120px]">
      Date of Reservation
    </div>
    <div className="flex-1 text-center text-white text-xs font-bold flex items-center justify-center border-r border-gray-600 max-w-[100px]">
      Status
    </div>
    <div className="flex-1 text-center text-white text-xs font-bold flex items-center justify-center max-w-[100px]">
      Actions
    </div>
  </div>
);

export default TableHeaderRow;
