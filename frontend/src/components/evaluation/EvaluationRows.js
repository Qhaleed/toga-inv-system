import { ReactComponent as Table } from "../../assets/icons/table.svg";
import { ReactComponent as EyeIcon } from "../../assets/icons/eye-icon.svg";
import { ReactComponent as Trash } from "../../assets/icons/black-trash.svg";
import { useState, useEffect, useRef } from "react";

const tasselOptions = ["Blue", "Maroon", "Orange", "White", "Yellow"];
const hoodOptions = ["Blue", "Maroon", "Orange", "White", "Yellow"];
const gownOptions = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
const statusOptions = ["Borrowed", "Not Borrowed"];

const EvaluationRows = ({ isGrid, hideActionButton, modifyTable }) => {
  const [dashboard, setDashboard] = useState([]);
  const [originalDashboard, setOriginalDashboard] = useState([]); // Track original data
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    // kuha data sa JSON
    fetch("http://localhost:8000/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setDashboard(data);
        setOriginalDashboard(data);
      });
  }, []);

  useEffect(() => {
    if (modifyTable) {
      setDashboard((prev) =>
        prev.map((item) => ({ ...item, eye: "hidden", trash: "block" }))
      );
    } else {
      setDashboard((prev) =>
        prev.map((item) => ({ ...item, eye: "block", trash: "hidden" }))
      );
    }
  }, [modifyTable]);

  useEffect(() => {
    if (modifyTable) {
      setEditId(null);
      setEditData({});
    }
  }, [modifyTable]);

  const prevModifyTable = useRef(modifyTable);

  useEffect(() => {
    if (prevModifyTable.current && !modifyTable) {
      // Exiting modify mode, save changes
      const changedRows = dashboard.filter((row) => {
        const orig = originalDashboard.find((o) => o.id === row.id);
        return (
          orig &&
          (row.tassel !== orig.tassel ||
            row.hood !== orig.hood ||
            row.gown !== orig.gown)
        );
      });
      if (changedRows.length > 0) {
        Promise.all(
          changedRows.map((row) =>
            fetch(`http://localhost:8000/dashboard/${row.id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                tassel: row.tassel,
                hood: row.hood,
                gown: row.gown,
              }),
            })
          )
        )
          .then(() => {
            alert("Changes saved!");
            setOriginalDashboard(dashboard);
          })
          .catch(() => {
            alert("Failed to save changes.");
          });
      }
    }
    prevModifyTable.current = modifyTable;
    // eslint-disable-next-line
  }, [modifyTable]);

  // Para sa grid/column view: pag click ng edit icon, mag-edit mode
  const handleEditClick = (db) => {
    setDashboard((prev) =>
      prev.map((item) =>
        db.id === item.id
          ? {
              ...item,
              eye: item.eye === "block" ? "hidden" : "block",
              trash: item.trash === "hidden" ? "block" : "hidden",
            }
          : item
      )
    );
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

  // When editing a cell in modifyTable mode, update dashboard state directly
  const handleCellChange = (id, name, value) => {
    setDashboard((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [name]: value } : row))
    );
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
                        className="table-dropdown w-full text-center rounded-[20px] px-2 py-1"
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
                        className="table-dropdown w-full text-center rounded-[20px] px-2 py-1"
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
                        className="table-dropdown w-full text-center rounded-[20px] px-2 py-1"
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
                        className="px-3 py-1 bg-[#919191] text-white rounded hover:bg-gray-600 text-xs"
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
    // Remove scrolling in edit mode (modifyTable) and in per-row inline editing (editId !== null)
    const isEditingAny = modifyTable || editId !== null;
    return (
      <tbody
        className={`w-full${
          isEditingAny ? "" : " overflow-y-auto"
        } scrollbar-hide custom-scrollbar-hide`}
        style={isEditingAny ? {} : { maxHeight: "calc(80vh - 40px)" }}
      >
        {dashboard.map((db, idx) => {
          const rowColor = db.id % 2 !== 0 ? "bg-[#D4D4D4]" : "bg-[#E9E9E9]";
          const isEditing = modifyTable || editId === db.id;
          return [
            <tr
              className={`h-10 ${rowColor} text-xs font-normal table-fixed w-full`}
              key={db.id}
              style={{ maxWidth: "100%" }}
            >
              <td className="text-center max-w-[180px] w-[180px] align-middle relative">
                <div className="h-full w-full py-2 flex justify-center items-center">
                  <h3 className="truncate">{db.studentname}</h3>
                  <span
                    className="absolute right-0 top-1/6 h-7 w-0.5 bg-gray-600 opacity-50"
                    style={{ borderRadius: "2px" }}
                  ></span>
                </div>
              </td>
              <td className="text-center max-w-[120px] w-[120px] align-middle relative">
                <div className="h-full w-full py-2 flex justify-center items-center">
                  <h3 className="truncate">{db.program}</h3>
                  <span
                    className="absolute right-0 top-1/6 h-7 w-0.5 bg-gray-600 opacity-50"
                    style={{ borderRadius: "2px" }}
                  ></span>
                </div>
              </td>
              <td className="text-center max-w-[80px] w-[80px] align-middle relative">
                <div className="h-full w-full py-2 flex justify-center items-center relative">
                  {isEditing ? (
                    <select
                      name="tassel"
                      value={modifyTable ? db.tassel : editData.tassel}
                      onChange={
                        modifyTable
                          ? (e) =>
                              handleCellChange(db.id, "tassel", e.target.value)
                          : handleEditChange
                      }
                      className="table-dropdown w-full text-center rounded-[20px] px-2 py-1"
                    >
                      {tasselOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <h3 className="truncate">{db.tassel}</h3>
                  )}
                  <span
                    className="absolute right-0 top-1/6 h-7 w-0.5 bg-gray-600 opacity-50"
                    style={{ borderRadius: "2px" }}
                  ></span>
                </div>
              </td>
              <td className="text-center max-w-[80px] w-[80px] align-middle relative">
                <div className="h-full w-full py-2 flex justify-center items-center relative">
                  {isEditing ? (
                    <select
                      name="hood"
                      value={modifyTable ? db.hood : editData.hood}
                      onChange={
                        modifyTable
                          ? (e) =>
                              handleCellChange(db.id, "hood", e.target.value)
                          : handleEditChange
                      }
                      className="table-dropdown w-full text-center rounded-[20px] px-2 py-1"
                    >
                      {hoodOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <h3 className="truncate">{db.hood}</h3>
                  )}
                  <span
                    className="absolute right-0 top-1/6 h-7 w-0.5 bg-gray-600 opacity-50"
                    style={{ borderRadius: "2px" }}
                  ></span>
                </div>
              </td>
              <td className="text-center max-w-[80px] w-[80px] align-middle relative">
                <div className="h-full w-full py-2 flex justify-center items-center relative">
                  {isEditing ? (
                    <select
                      name="gown"
                      value={modifyTable ? db.gown : editData.gown}
                      onChange={
                        modifyTable
                          ? (e) =>
                              handleCellChange(db.id, "gown", e.target.value)
                          : handleEditChange
                      }
                      className="table-dropdown w-full text-center rounded-[20px] px-2 py-1"
                    >
                      {gownOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <h3 className="truncate">{db.gown}</h3>
                  )}
                  <span
                    className="absolute right-0 top-1/6 h-7 w-0.5 bg-gray-600 opacity-50"
                    style={{ borderRadius: "2px" }}
                  ></span>
                </div>
              </td>
              <td className="text-center max-w-[120px] w-[120px] align-middle relative">
                <div className="h-full w-full py-2 flex justify-center items-center">
                  <button className="truncate bg-[#0C7E48] text-white px-4 rounded-full hover:bg-[rgb(27,107,70)]">
                    Evaluate
                  </button>
                  <span
                    className="absolute right-0 top-1/6 h-7 w-0.5 bg-gray-600 opacity-50"
                    style={{ borderRadius: "2px" }}
                  ></span>
                </div>
              </td>
              <td className="text-center max-w-[100px] w-[100px] align-middle relative">
                <div className="w-20 justify-start text-black text-xs font-semibold font-Figtree tracking-widest">
                  {db.status}
                </div>
                <span
                  className="absolute right-0 top-1/6 h-7 w-0.5 bg-gray-600 opacity-50"
                  style={{ borderRadius: "2px" }}
                ></span>
              </td>
            </tr>,
            idx < dashboard.length - 1 && (
              <tr key={`gap-${db.id}`} className="w-full">
                <td
                  colSpan={8}
                  style={{
                    height: "3px",
                    background: "transparent",
                    padding: 0,
                    border: "none",
                  }}
                ></td>
              </tr>
            ),
          ];
        })}
      </tbody>
    );
  }
};

export default EvaluationRows;
