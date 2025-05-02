import Rows from "./Rows";
import "./Table.css";
import { useState } from "react";

const Table = ({ isGrid, modifyTable }) => {
  // --- HEIGHT CONTROL: Edit this value to adjust the height of the grid/column view ---
  const mainContentHeight = "80vh"; // <-- EDIT THIS VALUE FOR HEIGHT
  console.log(modifyTable);
  return (
    <div className="h-[80vh] mt-10 w-[98%] flex justify-center ml-[30px]">
      {" "}
      {/* Set muna ng main container nas naka 80vh*/}
      {/* Parent box to  */}
      <div className="h-full min-w-[98%] flex items-stretch justify-center">
        <div
          className={`h-full w-full bg-white shadow-md outline-2 ${
            isGrid
              ? ""
              : "outline outline-1.5 outline-gray-950 outline-offset-[-1px] outline-blur-md"
          } flex flex-col`}
        >
          {isGrid ? (
            // Grid view content will fill and scroll to the bottom of the parent
            <div className="flex-1 flex flex-col h-full">
              {/* The grid will fill the parent (80vh white bg), and content will be 100% of parent */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col justify-end p-4 h-full">
                <Rows isGrid={true} hideActionButton={true} />
              </div>
            </div>
          ) : (
            <div
              className="relative w-full flex flex-col"
              style={{ height: mainContentHeight }}
            >
              {/* Custom header ste outside del table for sticky effect  */}
              <div className="w-full bg-[#02327B] " style={{ display: "flex" }}>
                <div className="text-center text-white text-xs font-bold flex items-center justify-center border-r border-gray-600 max-w-[180px] w-[180px] h-10">
                  Student Name
                </div>
                <div className="text-center text-white text-xs font-bold flex items-center justify-center border-r  border-gray-600 max-w-[120px] w-[120px] h-10">
                  Program
                </div>
                <div className="text-center text-white text-xs font-bold flex items-center justify-center border-r border-gray-600 max-w-[80px] w-[80px] h-10">
                  Tassel
                </div>
                <div className="text-center text-white text-xs font-bold flex items-center justify-center border-r border-gray-600 max-w-[80px] w-[80px] h-10">
                  Hood
                </div>
                <div className="text-center text-white text-xs font-bold flex items-center justify-center border-r border-gray-600 max-w-[80px] w-[80px] h-10">
                  Gown
                </div>
                <div className="text-center text-white text-xs font-bold flex items-center justify-center border-r border-gray-600 max-w-[120px] w-[120px] h-10">
                  Date of Reservation
                </div>
                <div className="text-center text-white text-xs font-bold flex items-center justify-center border-r border-gray-600 max-w-[100px] w-[100px] h-10">
                  Status
                </div>
                <div className="text-center text-white text-xs font-bold flex items-center justify-center max-w-[100px] w-[100px] h-10">
                  Actions
                </div>
              </div>
              <div className="flex-1 w-full overflow-y- overflow-x-hidden">
                <table className="table-auto w-full border-none border-separate border-spacing-0 rounded-b-lg">
                  <Rows isGrid={false} modifyTable={modifyTable} />
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;
