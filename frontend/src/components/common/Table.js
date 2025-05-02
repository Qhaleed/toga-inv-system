import Rows from "./Rows";
import "./Table.css";

const Table = ({ isGrid, modifyTable }) => {
  // --- HEIGHT CONTROL: Edit this value to adjust the height of the grid/column view ---
  const mainContentHeight = "80vh"; // <-- EDIT THIS VALUE FOR HEIGHT
  console.log(modifyTable);
  return (
    <div className="h-[80vh] mt-10 w-full max-w-[1200px] flex justify-center ml-0 px-1 sm:px-2 md:px-5 lg:ml-[0px] lg:w-[98%]">
      {/* Set main container responsive: full width on mobile, margin on lg */}
      <div className="h-full  w-full    flex items-stretch justify-center">
        <div className="w-full flex flex-col   justify-center items-center">
          {isGrid ? (
            <div className="flex-1 flex flex-col h-full">
              <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col justify-end p-12 sm:p-2 md:p-4 h-full">
                <Rows isGrid={true} hideActionButton={true} />
              </div>
            </div>
          ) : (
            <div
              className="relative w-fit flex flex-col outline outline-1.5 outline-black outline-offset-[-1px] outline-blur-md"
              style={{
                maxHeight: mainContentHeight,
                minHeight: 1,
                overflow: "visible",
              }}
            >
              <div className="bg-[#02327B] w-full sticky top-0 z-10">
                <table className="table-auto w-full border-none border-separate border-spacing-0 rounded-b-lg sticky top-0 z-10 md:table-fixed md:w-full md:max-w-full md:min-w-0 sm:w-full sm:table-fixed">
                  <thead>
                    <tr className="bg-[#02327B]  full h-10 xs:h-12 sm:h-12 md:h-16">
                      <th className="md:w-[23%] bg-red-50   text-white text-[10px] xs:text-xs font-bold text-center align-middle truncate">
                        <span className="block w-full text-center truncate">
                          Student Name
                        </span>
                      </th>
                      <th className=" sm:w-[12%] md:w-[15%] md:pl-6 sm:pr-8 bg-black  text-white text-[10px] xs:text-xs font-bold text-center align-middle truncate">
                        <span className="block w-full text-center truncate">
                          Program
                        </span>
                      </th>
                      <th className="w-[10%] sm:pr-6 md:w-[10%] md:pl-4  bg-red-950  text-white text-[10px] xs:text-xs font-bold text-center align-middle truncate">
                        <span className="block w-full text-center truncate">
                          Tassel
                        </span>
                      </th>
                      <th className="sm:w-[8.5%] sm:pr-1  md:pr-6 md:pl-4 md:w-[10%] bg-green-950  text-white text-[10px] xs:text-xs font-bold text-center align-middle truncate">
                        <span className="block w-full text-center truncate">
                          Hood
                        </span>
                      </th>
                      <th className="w-[10%]  bg-fuchsia-200 text-white text-[10px] xs:text-xs font-bold text-center align-middle truncate">
                        <span className="block w-full text-center truncate">
                          Gown
                        </span>
                      </th>
                      <th className="w-[15%] pl-2 text-white text-[10px] xs:text-xs font-bold text-center align-middle truncate">
                        <span className="block w-full text-center truncate">
                          Date of Reservation
                        </span>
                      </th>
                      <th className="w-[12.5%]  bg-fuchsia-200 text-white text-[10px] xs:text-xs font-bold text-center align-middle truncate">
                        <span className="block w-full text-center truncate">
                          Status
                        </span>
                      </th>
                      <th className="w-[13.5%]  text-white text-[10px] xs:text-xs font-bold text-center align-middle truncate">
                        <span className="block w-full text-center truncate">
                          Actions
                        </span>
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div className="flex-1 w-full overflow-y-auto overflow-x-auto">
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
