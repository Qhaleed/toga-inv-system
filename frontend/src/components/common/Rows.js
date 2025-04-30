import { ReactComponent as Table } from "../../assets/icons/table.svg";
import { ReactComponent as EyeIcon } from "../../assets/icons/eye-icon.svg";
import { ReactComponent as Trash } from "../../assets/icons/trash.svg";
import { ReactComponent as BlackTable } from "../../assets/icons/black-table.svg";
import { ReactComponent as BlackEyeIcon } from "../../assets/icons/black-eye-icon.svg";
import { ReactComponent as BlackTrash } from "../../assets/icons/black-trash.svg";
import { useState, useEffect } from "react";

const Rows = ({ isGrid }) => {
  const [dashboard, setDashboard] = useState([]);

  useEffect(() => {
    //dito gakuha ng file sa JSOn
    fetch("http://localhost:8000/dashboard")
      .then((res) => res.json())
      .then((data) => setDashboard(data));
  }, []);

  const SwitchMode = (id) => {
    // switching function to depende sa click
    setDashboard(
      dashboard.map((item) =>
        item.id === id
          ? {
              ...item,
              eye: item.eye === "block" ? "hidden" : "block",
              trash: item.trash === "hidden" ? "block" : "hidden",
            }
          : item
      )
    );
  };

  if (isGrid) {
    // bale function ng grid view na to sia

    return (
      <div className="flex flex-col h-full animate-fade-in">
        {/* wala na fixed header dto */}
        <div
          className="flex-1 overflow-y-auto min-h-0"
          style={{ maxHeight: "500px", paddingBottom: "48px" }} // para sa grid view to
        >
          <div className="grid grid-cols-3 gap-6 p-4">
            {dashboard.map((db, idx) => (
              <div
                key={db.id}
                className="bg-white rounded-lg shadow p-4 flex flex-col items-center border border-gray-200 transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl opacity-0 animate-fade-in"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <h3 className="font-bold text-lg mb-2">{db.studentname}</h3>
                <div className="text-sm text-gray-700 mb-1">
                  Program: {db.program}
                </div>
                <div className="text-sm text-gray-700 mb-1">
                  Tassel: {db.tassel}
                </div>
                <div className="text-sm text-gray-700 mb-1">
                  Hood: {db.hood}
                </div>
                <div className="text-sm text-gray-700 mb-1">
                  Gown: {db.gown}
                </div>
                <div className="text-sm text-gray-700 mb-1">
                  Date: {db.dateofreservation}
                </div>
                <div className="text-sm text-gray-700 mb-2">
                  Status: {db.status}
                </div>
                <div className="flex gap-2 mt-2">
                  <button className="w-7 h-7 bg-[#0C7E48] flex justify-center items-center rounded-md transition-transform duration-300 hover:scale-110 hover:bg-green-700">
                    <EyeIcon className="w-5" />
                  </button>
                  <button className="w-7 h-7 bg-[#0C7E48] flex justify-center items-center rounded-md transition-transform duration-300 hover:scale-110 hover:bg-red-700">
                    <Trash className="w-4" />
                  </button>
                  <button
                    className="w-7 h-7 bg-[#0C7E48] flex justify-center items-center rounded-md transition-transform duration-300 hover:scale-110 hover:bg-blue-700"
                    onClick={() => SwitchMode(db.id)}
                  >
                    <Table className="w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* nmigga  */}
        <div className="p-4 flex justify-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded shadow transition-transform duration-300 hover:scale-105 hover:bg-blue-800">
            Action Button
          </button>
        </div>
      </div>
    );
  } else {
    // Animate table in when going back
    return (
      <tbody className="animate-fade-in">
        {/* Make the table header sticky */}
        {/* This should be done in Table.js, but you can add the class here for thead */}
        {dashboard.map((db) =>
          db.id % 2 !== 0 ? (
            <tr className="h-12 bg-[#BAB4B1] text-xs font-normal" key={db.id}>
              {" "}
              {/*Condition for different colored rows*/} {/*ODD COLORED ROWS*/}
              <td>
                <div className="h-full w-full py-2 border-r border-gray-600">
                  <h3 className="ml-4">{db.studentname}</h3> {/*STUDENT NAME*/}
                </div>
              </td>
              <td>
                <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                  <h3 className="text-black">{db.program}</h3> {/*PROGRAM*/}
                </div>
              </td>
              <td>
                <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                  <h3 className={`text-black ${db.eye}`}>{db.tassel}</h3>
                  <select
                    className={`bg-[#0C7E48] text-white w-16 rounded-full text-center ${db.trash}`}
                  >
                    <option className="text-center" disabled selected hidden>
                      {db.tassel}
                    </option>{" "}
                    {/*TASSEL*/}
                    <option className="text-center">Blue</option>
                    <option className="text-center">Maroon</option>
                    <option className="text-center">Orange</option>
                    <option className="text-center">White</option>
                    <option className="text-center">Yellow</option>
                  </select>
                </div>
              </td>
              <td>
                <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                  <h3 className={`text-black ${db.eye}`}>{db.hood}</h3>
                  <select
                    className={`bg-[#0C7E48] text-white w-16 rounded-full text-center ${db.trash}`}
                  >
                    <option className="text-center" disabled selected hidden>
                      {db.hood}
                    </option>{" "}
                    {/*HOOD*/}
                    <option className="text-center">Blue</option>
                    <option className="text-center">Maroon</option>
                    <option className="text-center">Orange</option>
                    <option className="text-center">White</option>
                    <option className="text-center">Yellow</option>
                  </select>
                </div>
              </td>
              <td>
                <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                  <h3 className={`text-black" ${db.eye}`}>{db.gown}</h3>
                  <select
                    className={`bg-[#0C7E48] text-white w-16 rounded-full text-center ${db.trash}`}
                  >
                    {" "}
                    {/*GOWN*/}
                    <option className="text-center" disabled selected hidden>
                      {db.gown}
                    </option>
                    <option className="text-center">XS</option>
                    <option className="text-center">S</option>
                    <option className="text-center">M</option>
                    <option className="text-center">L</option>
                    <option className="text-center">XL</option>
                    <option className="text-center">2XL</option>
                    <option className="text-center">3XL</option>
                  </select>
                </div>
              </td>
              <td>
                <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                  <h3>{db.dateofreservation}</h3> {/*DATE OF RESERVATION*/}
                </div>
              </td>
              <td>
                <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                  <h3 className={`text-black ${db.eye}`}>{db.status}</h3>
                  <select
                    className={`bg-[#0C7E48] text-white w-28 rounded-full text-center ${db.trash}`}
                  >
                    {" "}
                    {/*STATUS*/}
                    <option className="text-center" disabled selected hidden>
                      {db.status}
                    </option>
                    <option className="text-center">Borrowed</option>
                    <option className="text-center">Not Borrowed</option>
                  </select>
                </div>
              </td>
              <td>
                <div className="h-full w-full py-2 flex justify-evenly">
                  <button
                    className={`w-7 h-7 bg-[#0C7E48] flex justify-center items-center rounded-md ${db.eye}`}
                  >
                    <EyeIcon className="w-5" />
                  </button>{" "}
                  {/*BUTTONS FOR CUSTOMIZATION*/}
                  <button
                    className={`w-7 h-7 bg-[#0C7E48] flex justify-center items-center rounded-md ${db.trash}`}
                  >
                    <Trash className="w-4" />
                  </button>
                  <button
                    className="w-7 h-7 bg-[#0C7E48] flex justify-center items-center rounded-md"
                    onClick={() => SwitchMode(db.id)}
                  >
                    <Table className="w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ) : (
            <tr className="h-12 bg-[#E9E9E9] text-xs font-normal" key={db.id}>
              <td>
                <div className="h-full w-full py-2 border-r border-gray-600">
                  <h3 className="ml-4">{db.studentname}</h3> {/*STUDENT NAME*/}
                </div>
              </td>
              <td>
                <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                  <h3 className="text-black">{db.program}</h3>
                  {/*PROGRAM*/}
                </div>
              </td>
              <td>
                <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                  <h3 className={`text-black ${db.eye}`}>{db.tassel}</h3>
                  <select
                    className={`bg-[#D2D2D2] text-black border border-black w-16 rounded-full text-center ${db.trash}`}
                  >
                    {" "}
                    {/*TASSEL*/}
                    <option className="text-center" disabled selected hidden>
                      {db.tassel}
                    </option>
                    <option className="text-center">Blue</option>
                    <option className="text-center">Maroon</option>
                    <option className="text-center">Orange</option>
                    <option className="text-center">White</option>
                    <option className="text-center">Yellow</option>
                  </select>
                </div>
              </td>
              <td>
                <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                  <h3 className={`text-black ${db.eye}`}>{db.hood}</h3>
                  <select
                    className={`bg-[#D2D2D2] text-black border border-black w-16 rounded-full text-center ${db.trash}`}
                  >
                    <option className="text-center" disabled selected hidden>
                      {db.hood}
                    </option>{" "}
                    {/*HOOD*/}
                    <option className="text-center">Blue</option>
                    <option className="text-center">Maroon</option>
                    <option className="text-center">Orange</option>
                    <option className="text-center">White</option>
                    <option className="text-center">Yellow</option>
                  </select>
                </div>
              </td>
              <td>
                <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                  <h3 className={`text-black ${db.eye}`}>{db.gown}</h3>
                  <select
                    className={`bg-[#D2D2D2] text-black border border-black w-16 rounded-full text-center ${db.trash}`}
                  >
                    <option className="text-center" disabled selected hidden>
                      {db.gown}
                    </option>{" "}
                    {/*GOWN*/}
                    <option className="text-center">XS</option>
                    <option className="text-center">S</option>
                    <option className="text-center">M</option>
                    <option className="text-center">L</option>
                    <option className="text-center">XL</option>
                    <option className="text-center">2XL</option>
                    <option className="text-center">3XL</option>
                  </select>
                </div>
              </td>
              <td>
                <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                  {" "}
                  {/*DATE OF RESERVATION*/}
                  <h3>{db.dateofreservation}</h3>
                </div>
              </td>
              <td>
                <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                  {" "}
                  {/*STATUS*/}
                  <h3 className={`text-black ${db.eye}`}>{db.status}</h3>
                  <select
                    className={`bg-[#D2D2D2] text-black border border-black w-28 rounded-full text-center ${db.trash}`}
                  >
                    <option className="text-center" disabled selected hidden>
                      {db.status}
                    </option>
                    <option className="text-center">Borrowed</option>
                    <option className="text-center">Not Borrowed</option>
                  </select>
                </div>
              </td>
              <td>
                <div className="h-full w-full py-2 flex justify-evenly">
                  <button
                    className={`w-7 h-7 bg-[#D2D2D2] text-black border border-black flex justify-center items-center rounded-md ${db.eye}`}
                  >
                    <BlackEyeIcon className="w-5" />
                  </button>{" "}
                  {/*BUTTONS FOR CUSTOMIZATION*/}
                  <button
                    className={`w-7 h-7 bg-[#D2D2D2] text-black border border-black flex justify-center items-center rounded-md ${db.trash}`}
                  >
                    <BlackTrash className="w-4" />
                  </button>
                  <button
                    className="w-7 h-7 bg-[#D2D2D2] text-black border border-black flex justify-center items-center rounded-md"
                    onClick={() => {
                      SwitchMode(db.id);
                    }}
                  >
                    <BlackTable className="w-5" />
                  </button>
                </div>
              </td>
            </tr>
          )
        )}
      </tbody>
    );
  }
};

export default Rows;
