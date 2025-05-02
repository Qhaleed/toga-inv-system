import Rows from "./Rows";
import "./Table.css";

const Table = ({ isGrid, modifyTable }) => {
  // --- HEIGHT CONTROL: Edit this value to adjust the height of the grid/column view ---
  const mainContentHeight = "80vh"; // <-- EDIT THIS VALUE FOR HEIGHT
  console.log(modifyTable);
  return (
    <div className="h-[80vh] mt-10 w-[98%] flex justify-center ml-[30px]">
      {" "}
      {/* Set muna ng main container tas naka 80vh*/}
      {/* Parent box to  */}
      <div className="h-full min-w-[100%] flex items-stretch justify-center">
        <div className="w-full flex flex-col justify-center items-center">
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
              className={`relative w-full flex flex-col outline outline-1.5 outline-black outline-offset-[-1px] outline-blur-md`}
              style={{
                height: "auto",
                maxHeight: mainContentHeight,
                minHeight: "0",
                overflow: "visible",
                // The parent will only grow to fit the content, but never exceed 80vh
              }}
            >
              {/* Custom header ste outside del table for sticky effect  */}
              <div className=" bg-[#02327B] flex flex-row sticky top-0 z-10">
                <table className="table-auto w-full border-none border-separate border-spacing-0 rounded-b-lg sticky top-0 z-10">
                  <thead>
                    <tr className="bg-[#02327B] h-16">
                      <th className="max-w-[180px] w-[180px] text-white text-xs font-bold text-center align-middle sm:text-[10px] md:text-xs">
                        Student Name
                      </th>
                      <th className="max-w-[120px] w-[120px] text-white text-xs font-bold text-center align-middle sm:text-[10px] md:text-xs">
                        Program
                      </th>
                      <th className="max-w-[80px] w-[80px] text-white text-xs font-bold text-center align-middle sm:text-[10px] md:text-xs">
                        Tassel
                      </th>
                      <th className="max-w-[80px] w-[80px] text-white text-xs font-bold text-center align-middle sm:text-[10px] md:text-xs">
                        Hood
                      </th>
                      <th className="max-w-[80px] w-[80px] text-white text-xs font-bold text-center align-middle sm:text-[10px] md:text-xs">
                        Gown
                      </th>
                      <th className="max-w-[120px] w-[120px] text-white text-xs font-bold text-center align-middle sm:text-[10px] md:text-xs">
                        Date of Reservation
                      </th>
                      <th className="max-w-[100px] w-[100px] bg-black text-white text-xs font-bold text-center align-middle sm:text-[10px] md:text-xs">
                        Status
                      </th>
                      <th className="max-w-[100px] w-[100px] text-white text-xs font-bold text-center align-middle sm:text-[10px] md:text-xs">
                        Actions
                      </th>
                    </tr>
                  </thead>
                </table>
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
