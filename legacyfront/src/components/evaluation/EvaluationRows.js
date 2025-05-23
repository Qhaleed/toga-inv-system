import { ReactComponent as Table } from "../../assets/icons/table.svg";
import { ReactComponent as EyeIcon } from "../../assets/icons/eye-icon.svg";
import { ReactComponent as Trash } from "../../assets/icons/black-trash.svg";
import { ReactComponent as ChevronDown } from "../../assets/icons/chevron-down.svg";

import { useState, useEffect, useRef } from "react";
import { HiMiniArchiveBoxArrowDown } from "react-icons/hi2";

const tasselOptions = ["Blue", "Maroon", "Orange", "White", "Yellow"];
const hoodOptions = ["Blue", "Maroon", "Orange", "White", "Yellow"];
const gownOptions = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
const statusOptions = ["Borrowed", "Not Borrowed"];

const EvaluationRows = ({
  modifyTable,
  rowHeightClass = "h-16",
  setValue,
  setEvaluationTab,
}) => {
  const [dashboard, setDashboard] = useState([]);
  const [originalDashboard, setOriginalDashboard] = useState([]); // Track original data
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    // kuha data sa JSON
    fetch("http://localhost:8000/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setDashboard(
          data.map((db) => ({
            ...db,
            tassel_color: db.tassel,
            hood_color: db.hood,
            toga_size: db.gown,
          }))
        );
        setOriginalDashboard(data);
      });
  }, []);

  const openTab = (db) => {
    setValue(db);
    setEvaluationTab("block");
  };

  // Table/column view with sticky header and scrollable table
  return (
    <div
      className="w-full h-full"
      style={{
        minWidth: "600px",
        maxWidth: "100vw",
        height: "100%",
        position: "relative",
      }}
    >
      <table
        className="w-full min-w-[600px] max-w-[100vw] table-auto border-separate border-spacing-0"
        style={{ tableLayout: "fixed" }}
      >
        <thead className="bg-[#02327B] sticky top-0 z-40">
          <tr className="bg-[#02327B] h-16 xs:h-16 sm:h-16 md:h-16">
            <th className="md:w-[23%] text-white text-[7px] md:text-[11px] xs:text-xs font-bold text-center align-middle min-w-[150px]">
              <span className="block w-full text-center ">Student Name</span>
            </th>
            <th className="sm:w-[12%] md:w-[15%] md:pl-6 sm:pr-1 text-white text-[7px] md:text-[11px] xs:text-xs font-bold text-center align-middle min-w-[100px]">
              <span className="block w-full text-center ">Program</span>
            </th>
            <th className="w-[10%] sm:pr-2 md:w-[10%] md:pl-4 text-white text-[7px] md:text-[11px] xs:text-xs font-bold text-center align-middle min-w-[80px]">
              <span className="block w-full text-center ">Tassel Color</span>
            </th>
            <th className="sm:w-[8.5%] sm:pr-2 md:pr-6 md:pl-4 md:w-[10%] text-white text-[7px] md:text-[11px] xs:text-xs font-bold text-center align-middle min-w-[80px]">
              <span className="block w-full text-center ">Hood Color</span>
            </th>
            <th className="w-[10%] text-white text-[7px] md:text-[11px] xs:text-xs font-bold text-center align-middle min-w-[80px]">
              <span className="block w-full text-center ">Toga Size</span>
            </th>
            <th className="w-[15%] pl-2 text-white text-[7px] md:text-[11px] xs:text-xs font-bold text-center align-middle min-w-[120px]">
              <span className="block w-full text-center ">Evaluation</span>
            </th>
            <th className="w-[12.5%] text-white text-[7px] md:text-[11px] xs:text-xs font-bold text-center align-middle min-w-[100px]">
              <span className="block w-full text-center ">Status</span>
            </th>
          </tr>
        </thead>
        <tbody className="w-full">
          {dashboard.map((db, idx) => {
            const rowColor = db.id % 2 !== 0 ? "bg-[#D4D4D4]" : "bg-[#E9E9E9]";
            return [
              <tr
                className={`${rowHeightClass} w-[1417px] ${rowColor} text-xs font-normal table-fixed`}
                key={db.id}
                style={{ maxWidth: "100%" }}
              >
                <td className="text-center max-w-[180px] align-middle relative sm:max-w-[90px] sm:w-[90px] sm:text-[9px] md:max-w-[180px] md:w-[180px] md:text-xs">
                  <div className="h-full w-[100%] py-4 flex justify-center items-center">
                    <h3 className="truncate">{db.studentname}</h3>
                    {/* Removed the span that was under student name only */}
                  </div>
                </td>
                <td className="text-center max-w-[120px] w-[120px] align-middle relative sm:max-w-[60px] sm:w-[60px] sm:text-[9px] md:max-w-[120px] md:w-[120px] md:text-xs">
                  <div className="h-full w-full py-2 flex justify-center items-center">
                    <h3 className="truncate">{db.program}</h3>
                    <span
                      className="absolute right-0 top-1/6 h-7 w-0.5 bg-gray-600 opacity-50"
                      style={{ borderRadius: "2px" }}
                    ></span>
                  </div>
                </td>
                {/* Tassel Color */}
                <td className="text-center max-w-[80px] w-[80px] align-middle relative sm:max-w-[40px] sm:w-[40px] sm:text-[9px] md:max-w-[80px] md:w-[80px] md:text-xs">
                  <div className="h-full w-full py-2 flex justify-center items-center relative">
                    <h3 className="truncate">{db.tassel_color}</h3>
                    <span
                      className="absolute right-0 top-1/4 h-1/2 w-0.5 bg-gray-600 opacity-50"
                      style={{ borderRadius: "2px" }}
                    ></span>
                  </div>
                </td>
                {/* Hood Color */}
                <td className="text-center max-w-[80px] w-[80px] align-middle relative sm:max-w-[40px] sm:w-[40px] sm:text-[9px] md:max-w-[80px] md:w-[80px] md:text-xs">
                  <div className="h-full w-full py-2 flex justify-center items-center relative">
                    <h3 className="truncate">{db.hood_color}</h3>
                    <span
                      className="absolute right-0 top-1/4 h-1/2 w-0.5 bg-gray-600 opacity-50"
                      style={{ borderRadius: "2px" }}
                    ></span>
                  </div>
                </td>
                {/* Toga Size */}
                <td className="text-center max-w-[80px] w-[80px] align-middle relative sm:max-w-[40px] sm:w-[40px] sm:text-[9px] md:max-w-[80px] md:w-[80px] md:text-xs">
                  <div className="h-full w-full py-2 flex justify-center items-center relative">
                    <h3 className="truncate">{db.toga_size}</h3>
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
                      className="truncate bg-[#0C7E48] text-white text-[10px] w-20 rounded-full lg:w-24 lg:text-xs hover:scale-105 transition-all duration-150 ease-out"
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
                    {db.evaluation}
                  </div>
                </td>
              </tr>,
              idx < dashboard.length - 1 && (
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
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EvaluationRows;
