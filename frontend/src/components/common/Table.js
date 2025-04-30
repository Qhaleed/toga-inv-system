import Rows from "./Rows";
import "./Table.css";

const Table = ({ isGrid }) => {
  return (
    <div className="h-[78%] mt-10  w-[98%] flex justify-center ml-[30px] ">
      {/* Parent box for table with black outline, no rounded corners */}
      <div className="h-full  min-w-[95%] flex items-stretch justify-center">
        <div
          className={`h-full w-full ${
            isGrid ? "" : "outline outline-2 outline-black"
          } bg-white flex flex-col`}
        >
          {isGrid ? (
            <Rows isGrid={true} hideActionButton={true} />
          ) : (
            <div className="relative w-full h-full flex flex-col">
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
