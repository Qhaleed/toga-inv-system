import PendingRow from "./PendingRow";
import "../common/Table.css";
import { useState, useEffect } from "react";

const PendingTable = ({
  isGrid,
  modifyTable,
  sortOrder,
  data,
  allData,
  focusedStatus,
}) => {
  // Track internal sort order state
  const [internalSortOrder, setInternalSortOrder] = useState(sortOrder || null);

  // Update internal sort order when prop changes
  useEffect(() => {
    setInternalSortOrder(sortOrder);
  }, [sortOrder]);

  const mainContentHeight = "100vh";
  return (
    <div className="w-full flex flex-col items-center animate-fade-in justify-start  mt-10">
      <div className="w-full flex flex-col items-start justify-center mb-2 px-2" />
      <div
        className="w-full flex justify-center items-start px-1 sm:px-2 md:px-5 lg:ml-0 lg:w-full"
        style={{ height: mainContentHeight, maxWidth: "100vw" }}
      >
        <div className="h-full w-full flex items-stretch justify-center">
          <div className="h-full w-full flex flex-col justify-start items-center">
            {isGrid ? (
              <div className="flex-1 flex flex-col h-full">
                <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col justify-end p-12 sm:p-2 md:p-4 h-full">
                  <PendingRow
                    isGrid
                    hideActionButton
                    allData={allData}
                    focusedStatus={focusedStatus}
                  />
                </div>
              </div>
            ) : (
              <div
                className="relative w-full flex flex-col min-h-fit max-w-full border border-black shadow outline-none bg-white z-0"
                style={{
                  maxHeight: mainContentHeight,
                  minWidth: 300,
                  maxWidth: "100vw",
                  overflow: "visible",
                  zIndex: 0, // Ensure table is always below overlays
                }}
              >
                <div className="w-full overflow-x-auto scrollbar-hide">
                  <div className="min-w-[600px] relative max-w-full">
                    <table
                      className="table-auto border-none border-separate border-spacing-0 rounded-b-lg w-full min-w-[600px] max-w-full"
                      style={{
                        tableLayout: "fixed",
                        width: "100%",
                        minWidth: 0,
                        maxWidth: "100%",
                      }}
                    ></table>
                  </div>
                </div>
                <PendingRow
                  isGrid={false}
                  modifyTable={modifyTable}
                  rowHeightClass="h-16"
                  sortOrder={internalSortOrder}
                  data={data}
                  allData={allData}
                  focusedStatus={focusedStatus}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingTable;
