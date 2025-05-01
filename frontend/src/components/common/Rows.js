import { ReactComponent as Table } from "../../assets/icons/table.svg";
import { ReactComponent as EyeIcon } from "../../assets/icons/eye-icon.svg";
import { ReactComponent as Trash } from "../../assets/icons/trash.svg";
import { useState, useEffect } from "react";

const tasselOptions = ["Blue", "Maroon", "Orange", "White", "Yellow"];
const hoodOptions = ["Blue", "Maroon", "Orange", "White", "Yellow"];
const gownOptions = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
const statusOptions = ["Borrowed", "Not Borrowed"];

const Rows = ({ isGrid, hideActionButton }) => {
  const [dashboard, setDashboard] = useState([]);
  // Bagong state para sa edit mode per row/card
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    // kuha data sa JSON
    fetch("http://localhost:8000/dashboard")
      .then((res) => res.json())
      .then((data) => setDashboard(data));
  }, []);

  // Para sa grid/column view: pag click ng edit icon, mag-edit mode
  const handleEditClick = (db) => {
    setEditId(db.id);
    setEditData({ ...db }); // copy current data
  };

  // Pag change ng input/select sa edit mode
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // Save changes sa dashboard state
  const handleSave = (id) => {
    setDashboard((prev) =>
      prev.map((item) => (item.id === id ? { ...editData } : item))
    );
    setEditId(null);
    setEditData({});
  };

  // Cancel edit, balik sa dati
  const handleCancel = () => {
    setEditId(null);
    setEditData({});
  };

  if (isGrid) {
    // grid view to
    return (
      <div className="flex flex-col h-full animate-fade-in">
        {/* wala header dito */}
        <div
          className="flex-1 overflow-y-auto min-h-0"
          style={{ maxHeight: "500px", paddingBottom: "48px" }}
        >
          <div className="grid grid-cols-3 gap-6 p-4">
            {dashboard.map((db, idx) => (
              <div
                key={db.id}
                className="bg-white rounded-lg shadow p-4 flex flex-col items-center border border-gray-200 transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl opacity-0 animate-fade-in relative"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                {editId === db.id ? (
                  // Edit mode UI
                  <>
                    <h3 className="font-bold text-lg mb-2 text-center">
                      {db.studentname}
                    </h3>
                    <div className="text-sm text-gray-700 mb-1">
                      Program: <span>{db.program}</span>
                    </div>
                    <div className="text-sm text-gray-700 mb-1">
                      Tassel:{" "}
                      <select
                        className="bg-[#0C7E48] text-white w-20 text-center focus:outline-primary rounded-md"
                        name="tassel"
                        value={editData.tassel}
                        onChange={handleEditChange}
                        style={{ position: "static" }}
                      >
                        {tasselOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="text-sm text-gray-700 mb-1">
                      Hood:{" "}
                      <select
                        className="bg-[#0C7E48] text-white w-20 text-center focus:outline-primary rounded-md"
                        name="hood"
                        value={editData.hood}
                        onChange={handleEditChange}
                        style={{ position: "static" }}
                      >
                        {hoodOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="text-sm text-gray-700 mb-1">
                      Gown:{" "}
                      <select
                        className="bg-[#0C7E48] text-white w-20 text-center focus:outline-primary rounded-md"
                        name="gown"
                        value={editData.gown}
                        onChange={handleEditChange}
                        style={{ position: "static" }}
                      >
                        {gownOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="text-sm text-gray-700 mb-1">
                      Date: <span>{db.dateofreservation}</span>
                    </div>
                    <div className="text-sm text-gray-700 mb-2">
                      Status:{" "}
                      <select
                        className="bg-[#0C7E48] text-white w-24 text-center focus:outline-primary rounded-md"
                        name="status"
                        value={editData.status}
                        onChange={handleEditChange}
                        style={{ position: "static" }}
                      >
                        {statusOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Floating Save/Cancel Popup */}
                    <div className="absolute top-2 right-2 z-20 flex flex-col gap-2 bg-white shadow-lg rounded-lg p-2 border border-gray-200 animate-fade-in">
                      <button
                        className="px-3 py-1 bg-emerald-700 text-white rounded hover:bg-blue-800 text-xs mb-1"
                        onClick={() => handleSave(db.id)}
                      >
                        Save
                      </button>
                      <button
                        className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-600 text-xs"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button
                        className="w-7 h-7 bg-[#0C7E48] flex justify-center items-center rounded-md transition-transform duration-300 hover:scale-110 hover:bg-red-700"
                        // trash icon only in edit mode
                      >
                        <Trash className="w-4" />
                      </button>
                    </div>
                  </>
                ) : (
                  // Normal view UI
                  <>
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
                      <button
                        className="w-7 h-7 bg-[#0C7E48] flex justify-center items-center rounded-md transition-transform duration-300 hover:scale-110 hover:bg-green-700"
                        // eye icon only
                      >
                        <EyeIcon className="w-5" />
                      </button>
                      <button
                        className="w-7 h-7 bg-[#0C7E48] flex justify-center items-center rounded-md transition-transform duration-300 hover:scale-110 hover:bg-blue-700"
                        onClick={() => handleEditClick(db)}
                      >
                        <Table className="w-5" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* action btn sa baba, hide if grid floating */}
        {!hideActionButton && (
          <div className="p-4 flex justify-center">
            <button className="bg-blue-600 text-white px-6 py-2 rounded shadow transition-transform duration-300 hover:scale-105 hover:bg-blue-800">
              Action Button
            </button>
          </div>
        )}
      </div>
    );
  } else {
    // table/column view with inline editing
    return (
      <tbody className="animate-fade-in">
        {dashboard.map((db) => {
          const isEditing = editId === db.id;
          const rowColor = db.id % 2 !== 0 ? "bg-[#BAB4B1]" : "bg-[#E9E9E9]";
          return (
            <tr
              className={`h-12 ${rowColor} text-xs font-normal relative`}
              key={db.id}
            >
              {/* Student Name */}
              <td>
                <div className="h-full w-full py-2 border-r border-gray-600">
                  <h3 className="ml-4">{db.studentname}</h3>
                </div>
              </td>
              {/* Program */}
              <td>
                <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                  <h3 className="text-black">{db.program}</h3>
                </div>
              </td>
              {/* Tassel */}
              <td>
                <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                  {isEditing ? (
                    <select
                      className="bg-[#0C7E48] text-white w-16 rounded-md text-center focus:outline-primary"
                      name="tassel"
                      value={editData.tassel}
                      onChange={handleEditChange}
                      style={{ position: "static" }}
                    >
                      {tasselOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <h3 className="text-black">{db.tassel}</h3>
                  )}
                </div>
              </td>
              {/* Hood */}
              <td>
                <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                  {isEditing ? (
                    <select
                      className="bg-[#0C7E48] text-white w-16 rounded-md text-center focus:outline-primary"
                      name="hood"
                      value={editData.hood}
                      onChange={handleEditChange}
                      style={{ position: "static" }}
                    >
                      {hoodOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <h3 className="text-black">{db.hood}</h3>
                  )}
                </div>
              </td>
              {/* Gown */}
              <td>
                <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                  {isEditing ? (
                    <select
                      className="bg-[#0C7E48] text-white w-16 rounded-md text-center focus:outline-primary"
                      name="gown"
                      value={editData.gown}
                      onChange={handleEditChange}
                      style={{ position: "static" }}
                    >
                      {gownOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <h3 className="text-black">{db.gown}</h3>
                  )}
                </div>
              </td>
              {/* Date of Reservation */}
              <td>
                <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                  <h3>{db.dateofreservation}</h3>
                </div>
              </td>
              {/* Status */}
              <td>
                <div className="h-full w-full py-2 border-r border-gray-600 flex justify-center">
                  {isEditing ? (
                    <select
                      className="bg-[#0C7E48] text-white w-28 rounded-md text-center focus:outline-primary"
                      name="status"
                      value={editData.status}
                      onChange={handleEditChange}
                      style={{ position: "static" }}
                    >
                      {statusOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <h3 className="text-black">{db.status}</h3>
                  )}
                </div>
              </td>
              {/* Actions */}
              <td className="relative">
                <div className="h-full w-full py-2 flex justify-evenly">
                  {isEditing ? (
                    <>
                      {/* Floating Save/Cancel Popup for table view */}
                      <div className="absolute top-0 right-10 z-20 flex flex-col gap-2 bg-white shadow-lg rounded-lg p-2 border border-gray-200 animate-fade-in">
                        <button
                          className="px-3 py-1 bg-emerald-700 text-white rounded hover:bg-blue-800 text-xs mb-1"
                          onClick={() => handleSave(db.id)}
                        >
                          Save
                        </button>
                        <button
                          className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-600 text-xs"
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                      </div>
                      <button
                        className="w-7 h-7 bg-[#0C7E48] flex justify-center items-center rounded-md transition-transform duration-300 hover:scale-110 hover:bg-red-700"
                        // trash icon only in edit mode
                      >
                        <Trash className="w-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="w-7 h-7 bg-[#0C7E48] flex justify-center items-center rounded-md transition-transform duration-300 hover:scale-110 hover:bg-green-700"
                        // eye icon only
                      >
                        <EyeIcon className="w-5" />
                      </button>
                      <button
                        className="w-7 h-7 bg-[#0C7E48] flex justify-center items-center rounded-md transition-transform duration-300 hover:scale-110 hover:bg-blue-700"
                        onClick={() => handleEditClick(db)}
                      >
                        <Table className="w-5" />
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  }
};

export default Rows;
