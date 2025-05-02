import React, { useState } from "react";
import NavBar from "../common/NavBar";
import EvaluationTable from "./EvaluationTable";

const EvaluationPage = () => {
  const [isGrid, setIsGrid] = useState(false);
  const [modifyTable, setmodifyTable] = useState(false);
  // Optionally, you can add activeTab state if you want tab highlighting
  return (
    <div className="h-screen w-screen bg-[#EBEBEB] font-figtree font-medium">
      <div className="h-screen w-screen grid grid-cols-4">
        {/* You can add a sidebar here if needed */}
        <div className="col-span-3 h-full">
          <div
            className="w-full flex flex-col items-center"
            style={{ maxWidth: "98%" }}
          >
            <div
              className="w-full"
              style={{ height: "60px", marginBottom: "8px" }}
            >
              <NavBar
                isGrid={isGrid}
                setIsGrid={setIsGrid}
                modifyTable={modifyTable}
                setmodifyTable={setmodifyTable}
              />
            </div>
            <div
              className={`flex justify-center items-start w-full transition-all duration-500 ${
                !isGrid ? "animate-fade-in-bottom" : ""
              }`}
              style={{ height: "600px" }}
            >
              <EvaluationTable isGrid={isGrid} modifyTable={modifyTable} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationPage;
