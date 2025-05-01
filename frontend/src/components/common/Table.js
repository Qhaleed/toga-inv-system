import Rows from "./Rows";
import "./Table.css";

const Table = ({ isGrid }) => {
  // --- HEIGHT CONTROL: Edit this value to adjust the height of the grid/column view ---
  const mainContentHeight = "80vh"; // <-- EDIT THIS VALUE FOR HEIGHT

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
              {/* HEIGHT CONTROL: This is the column/table view container. Adjust height above. */}
              <div className="sticky top-0 z-10 bg-[#02327B] w-full">
                {" "}
                {/*Header del table*/}
                <table className="table-auto w-[83%] border-none border-separate border-spacing-0 ">
                  <thead>
                    <tr className="text-[12px] text-white h-10">
                      <th className="font-normal text-left pl-4">
                        Student Name
                      </th>
                      <th className="font-normal pl-5 w-18">Program</th>
                      <th className="font-normal  w-15 ">Tassel</th>
                      <th className="font-normal w-16 pl-6">Hood</th>
                      <th className="font-normal w-16 pl-6">Gown</th>
                      <th className="font-normal">Date of Reservation</th>
                      <th className="font-normal">Status</th>
                      <th className="font-normal"></th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div className="flex-1 w-full overflow-y-auto overflow-x-hidden">
                <table className="table-auto w-full border-none border-spacing-0 border-b-2 border-black min-w-0 max-w-full">
                  <Rows isGrid={false} />
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
