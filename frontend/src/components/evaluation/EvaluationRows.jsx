import Table from "../../assets/icons/table.svg?react";
import EyeIcon from "../../assets/icons/eye-icon.svg?react";
import Trash from "../../assets/icons/black-trash.svg?react";
import ChevronDown from "../../assets/icons/chevron-down.svg?react";
import { useState, useEffect } from "react";

const EvaluationRows = ({
  rowHeightClass = "h-16",
  setValue,
  setEvaluationTab,
  isAll,
  isevalTab,
  isnotevalTab,
  isAZ,
  isZA,
  allData,
}) => {
  const [dashboard, setDashboard] = useState([]);

  const openTab = (db) => {
    setValue(db);
    setEvaluationTab("block");
  };

  useEffect(() => {
    // Start with filtered data (no null toga_size)
    let filtered = allData;
    if (isevalTab) {
      filtered = allData.filter((db) => db.evaluation_status === "Evaluated");
    } else if (isnotevalTab) {
      filtered = allData.filter(
        (db) => db.evaluation_status === "Not Evaluated"
      );
    } else if (isAll) {
      filtered = allData;
    }
    // Sorting
    if (isAZ) {
      filtered = [...filtered].sort((a, b) =>
        (a.surname + ", " + a.first_name).localeCompare(
          b.surname + ", " + b.first_name
        )
      );
    } else if (isZA) {
      filtered = [...filtered].sort((a, b) =>
        (b.surname + ", " + b.first_name).localeCompare(
          a.surname + ", " + a.first_name
        )
      );
    }
    setDashboard(filtered);
  }, [isAll, isevalTab, isnotevalTab, isAZ, isZA, allData]);

  // Table/column view with sticky header and scrollable table
  return (
    <div
      className="w-full  max-h-screen overflow-x-auto"
      style={{
        minWidth: "600px",
        maxWidth: "100vw",
      }}
    >
      <div className="min-w-[300px] max-w-[120vw] overflow-visible relative bg-white">
        <table className="w-full ">
          <thead className="bg-[#02327B]  top-0 sticky">
            <tr className="h-6 relative xs:h-8 sm:h-10 w-full md:h-12">
              <th className="md:w-[23%] text-white text-[7px] md:text-[11px] xs:text-xs font-bold text-center align-middle min-w-[150px]">
                <span className="block text-[10px] md:text-[15px] w-full text-center ">
                  Student Name
                </span>
              </th>
              <th className="sm:w-[12%] md:w-[15%] md:pl-6 sm:pr-1 text-white text-[7px] md:text-[11px] xs:text-xs font-bold text-center align-middle min-w-[100px]">
                <span className="block text-[10px] md:text-[15px] w-full text-center ">
                  Program
                </span>
              </th>
              <th className="w-[10%] sm:pr-2 md:w-[10%] md:pl-4 text-white text-[7px] md:text-[11px] xs:text-xs font-bold text-center align-middle min-w-[80px]">
                <span className="block text-[10px] md:text-[15px] w-full text-center ">
                  Tassel
                </span>
              </th>
              <th className="sm:w-[8.5%] sm:pr-2 md:pr-6 md:pl-4 md:w-[10%] text-white text-[7px] md:text-[11px] xs:text-xs font-bold text-center align-middle min-w-[80px]">
                <span className="block text-[10px] md:text-[15px] w-full text-center ">
                  Hood
                </span>
              </th>
              <th className="w-[10%] text-white text-[7px] md:text-[11px] xs:text-xs font-bold text-center align-middle min-w-[80px]">
                <span className="block text-[10px] md:text-[15px] w-full text-center ">
                  Gown
                </span>
              </th>
              <th className="w-[15%] pl-2 text-white text-[7px] md:text-[11px] xs:text-xs font-bold text-center align-middle min-w-[120px]">
                <span className="block text-[10px] md:text-[15px] w-full text-center ">
                  Evaluation
                </span>
              </th>
              <th className="w-[12.5%] text-white text-[7px] md:text-[11px] xs:text-xs font-bold text-center align-middle min-w-[100px]">
                <span className="block text-[10px] md:text-[15px] w-full text-center ">
                  Status
                </span>
              </th>
            </tr>
          </thead>

          <tbody className="w-full">
            {dashboard.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-8 text-gray-500 font-semibold bg-white"
                >
                  No data found
                </td>
              </tr>
            ) : (
              dashboard.map((db, index) => {
                const rowColor =
                  index % 2 !== 0 ? "bg-[#D4D4D4]" : "bg-[#E9E9E9]";
                return [
                  <tr
                    className={`${rowHeightClass} w-[1417px] ${rowColor} text-xs font-normal table-fixed`}
                    key={db.id}
                    style={{ maxWidth: "100%" }}
                  >
                    <td className="text-center max-w-[180px] align-middle relative sm:max-w-[90px] sm:w-[90px] sm:text-[9px] md:max-w-[180px] md:w-[180px] md:text-xs">
                      <div className="h-full w-[100%] py-4 flex justify-center items-center">
                        <h3
                          className="truncate cursor-pointer"
                          title={
                            db.surname +
                            ", " +
                            db.first_name +
                            " " +
                            db.middle_initial +
                            "."
                          }
                        >
                          {db.surname +
                            ", " +
                            db.first_name +
                            " " +
                            db.middle_initial +
                            "."}
                        </h3>
                      </div>
                    </td>
                    <td className="text-center max-w-[120px] w-[120px] align-middle relative sm:max-w-[60px] sm:w-[60px] sm:text-[9px] md:max-w-[120px] md:w-[120px] md:text-xs">
                      <div className="h-full w-full py-2 flex justify-center items-center">
                        <h3
                          className="truncate cursor-pointer"
                          title={db.course}
                        >
                          {db.course}
                        </h3>
                        <span
                          className="absolute right-0 top-1/6 h-7 w-0.5 bg-gray-600 opacity-50"
                          style={{ borderRadius: "2px" }}
                        ></span>
                      </div>
                    </td>
                    {/* Tassel */}
                    <td className="text-center max-w-[80px] w-[80px] align-middle relative sm:max-w-[40px] sm:w-[40px] sm:text-[9px] md:max-w-[80px] md:w-[80px] md:text-xs">
                      <div className="h-full w-full py-2 flex justify-center items-center relative">
                        <h3
                          className="truncate cursor-pointer"
                          title={db.tassel_color}
                        >
                          {db.tassel_color}
                        </h3>
                        <span
                          className="absolute right-0 top-1/4 h-1/2 w-0.5 bg-gray-600 opacity-50"
                          style={{ borderRadius: "2px" }}
                        ></span>
                      </div>
                    </td>
                    {/* Hood */}
                    <td className="text-center max-w-[80px] w-[80px] align-middle relative sm:max-w-[40px] sm:w-[40px] sm:text-[9px] md:max-w-[80px] md:w-[80px] md:text-xs">
                      <div className="h-full w-full py-2 flex justify-center items-center relative">
                        <h3
                          className="truncate cursor-pointer"
                          title={db.hood_color}
                        >
                          {db.hood_color}
                        </h3>
                        <span
                          className="absolute right-0 top-1/4 h-1/2 w-0.5 bg-gray-600 opacity-50"
                          style={{ borderRadius: "2px" }}
                        ></span>
                      </div>
                    </td>
                    {/* Gown */}
                    <td className="text-center max-w-[80px] w-[80px] align-middle relative sm:max-w-[40px] sm:w-[40px] sm:text-[9px] md:max-w-[80px] md:w-[80px] md:text-xs">
                      <div className="h-full w-full py-2 flex justify-center items-center relative">
                        <h3
                          className="truncate cursor-pointer"
                          title={db.toga_size}
                        >
                          {db.toga_size}
                        </h3>
                        <span
                          className="absolute right-0 top-1/4 h-1/2 w-0.5 bg-gray-600 opacity-50"
                          style={{ borderRadius: "2px" }}
                        ></span>
                      </div>
                    </td>
                    {/*Evaluation*/}
                    <td className="text-center max-w-[120px] w-[120px] align-middle relative sm:max-w-[60px] sm:w-[60px] sm:text-[9px] md:max-w-[120px] md:w-[120px] md:text-xs">
                      <div className="h-full w-full py-2 flex justify-center items-center">
                        <button
                          onClick={() => openTab(db)}
                          className="truncate bg-[#0C7E48] text-white text-[10px] w-20 rounded-full lg:w-24 lg:text-xs hover:scale-105 transition-all duration-150 ease-out cursor-pointer"
                          title={db.evaluation_status}
                        >
                          Evaluate
                        </button>
                        <span
                          className="absolute right-0 top-1/6 h-7 w-0.5 bg-gray-600 opacity-50"
                          style={{ borderRadius: "2px" }}
                        ></span>
                      </div>
                    </td>
                    {/* Status */}
                    <td className="w-[100px] align-middle relative sm:max-w-[50px] sm:w-[50px] sm:text-[9px] md:max-w-[100px] md:w-[100px] md:text-xs">
                      <div className="w-full flex justify-center items-center text-black text-xs font-semibold tracking-widest h-full">
                        <span
                          className="cursor-pointer"
                          title={db.evaluation_status}
                        >
                          {db.evaluation_status}
                        </span>
                      </div>
                    </td>
                  </tr>,
                  index < dashboard.length - 1 && (
                    <tr key={`gap-${db.id}`} className="w-full">
                      <td
                        colSpan={7}
                        style={{
                          height: "1px",
                          background: "transparent",
                          padding: 0,
                        }}
                      ></td>
                    </tr>
                  ),
                ];
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EvaluationRows;
