import React from "react";
import Rows from "../common/Rows";

const EvaluationTable = ({ isGrid, modifyTable }) => {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Header similar to dashboard */}
      <div className="w-full max-w-[1200px] flex flex-col items-start justify-center mt-8 mb-2 px-2"></div>
      <div className="h-[80vh] w-full max-w-[1200px] flex justify-center mt-4 px-1 sm:px-2 md:px-5 lg:ml-[0px] lg:w-[98%]">
        <div className="h-full w-full flex items-stretch justify-center">
          <div className="h-full w-full flex flex-col justify-center items-center">
            <div className="flex-1 flex flex-col h-full">
              <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col justify-end p-12 sm:p-2 md:p-4 h-full">
                <table className="table-auto w-full border-none border-separate border-spacing-0 rounded-b-lg">
                  <Rows isGrid={isGrid} modifyTable={modifyTable} />
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationTable;
