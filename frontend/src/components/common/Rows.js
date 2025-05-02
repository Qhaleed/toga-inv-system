import { ReactComponent as Table } from "../../assets/icons/table.svg";
import { ReactComponent as EyeIcon } from "../../assets/icons/eye-icon.svg";
import { ReactComponent as Trash } from "../../assets/icons/black-trash.svg";
import { ReactComponent as ChevronDown } from "../../assets/icons/chevron-down.svg";

import { useState, useEffect, useRef } from "react";

const tasselOptions = ["Blue", "Maroon", "Orange", "White", "Yellow"];
const hoodOptions = ["Blue", "Maroon", "Orange", "White", "Yellow"];
const gownOptions = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
const statusOptions = ["Borrowed", "Not Borrowed"];

const Rows = ({ isGrid, hideActionButton, modifyTable }) => {
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
      <div className="w-full animate-fade-in" style={{ height: "80vh" }}>
        <div className="flex flex-wrap gap-4 h-full w-full p-4 justify-center items-start">
          {dashboard.map((db, idx) => (
            <div
              key={db.id}
              className="bg-slate-50 rounded-lg shadow flex flex-col items-center border border-gray-200 transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-xl opacity-0 animate-fade-in relative"
              style={{
                animationDelay: `${idx * 80}ms`,
                width: "100%",
                maxWidth: "320px",
                minWidth: "220px",
                height: "340px",
                maxHeight: "400px",
                minHeight: "300px",
                padding: "1.5rem",
                flex: "1 1 300px",
                boxSizing: "border-box",
                margin: 0,
              }}
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
                      className="bg-[#0C7E48] text-white w-24 text-center ml-5 focus:outline-primary rounded-md"
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
                  {/* Floating Save/Cancel Popup Niggas */}
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
                  <div className="flex gap-2 mt-2 w-full">
                    <button
                      className="w-full h-7 bg-[#0C7E48] flex justify-center items-center rounded-md transition-transform duration-300 hover:scale-105 hover:bg-green-700"
                      style={{ minWidth: 0 }}
                    >
                      <EyeIcon className="w-5" />
                    </button>
                    <button
                      className="w-full h-7 bg-[#0C7E48] flex justify-center items-center rounded-md transition-transform duration-300 hover:scale-105 hover:bg-blue-700"
                      style={{ minWidth: 0 }}
                      onClick={() => handleEditClick(db)}
                    >
                      <Table className="w-5" />
                    </button>
                    <button
                      className="w-full h-7 bg-[#C0392B] flex justify-center items-center rounded-md transition-transform duration-300 hover:scale-105 hover:bg-red-700 ml-2"
                      style={{ minWidth: 0 }}
                      onClick={() => {
                        /* implement delete logic here */
                      }}
                    >
                      <Trash className="w-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
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
              className={`h-16 w-[1417px] ${rowColor} text-xs font-normal table-fixed`}
              key={db.id}
              style={{ maxWidth: "100%" }}
            >
              <td className="text-center max-w-[180px]  align-middle relative sm:max-w-[90px] sm:w-[90px] sm:text-[9px] md:max-w-[180px] md:w-[180px] md:text-xs">
                <div className="h-full w-[100%] py-4 flex justify-center items-center">
                  <h3 className="truncate">{db.studentname}</h3>
                  <span
                    className="absolute right-0 top-1/6 h-7 w-0.5 bg-gray-600 opacity-50"
                    style={{ borderRadius: "2px" }}
                  ></span>
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
              {/* Tassel */}
              <td className="text-center max-w-[80px] w-[80px] align-middle relative sm:max-w-[40px] sm:w-[40px] sm:text-[9px] md:max-w-[80px] md:w-[80px] md:text-xs">
                <div className="h-full w-full py-2 flex justify-center items-center relative">
                  {isEditing ? (
                    <CustomDropdown
                      value={modifyTable ? db.tassel : editData.tassel}
                      options={tasselOptions}
                      onChange={(val) =>
                        modifyTable
                          ? handleCellChange(db.id, "tassel", val)
                          : handleEditChange({
                              target: { name: "tassel", value: val },
                            })
                      }
                      disabled={false}
                    />
                  ) : (
                    <h3 className="truncate">{db.tassel}</h3>
                  )}
                  <span
                    className="absolute right-0 top-1/4 h-1/2 w-0.5 bg-gray-600 opacity-50"
                    style={{ borderRadius: "2px" }}
                  ></span>
                </div>
              </td>
              {/* Hood */}
              <td className="text-center max-w-[80px] w-[80px] align-middle relative sm:max-w-[40px] sm:w-[40px] sm:text-[9px] md:max-w-[80px] md:w-[80px] md:text-xs">
                <div className="h-full w-full py-2 flex justify-center items-center relative">
                  {isEditing ? (
                    <CustomDropdown
                      value={modifyTable ? db.hood : editData.hood}
                      options={hoodOptions}
                      onChange={(val) =>
                        modifyTable
                          ? handleCellChange(db.id, "hood", val)
                          : handleEditChange({
                              target: { name: "hood", value: val },
                            })
                      }
                      disabled={false}
                    />
                  ) : (
                    <h3 className="truncate">{db.hood}</h3>
                  )}
                  <span
                    className="absolute right-0 top-1/4 h-1/2 w-0.5 bg-gray-600 opacity-50"
                    style={{ borderRadius: "2px" }}
                  ></span>
                </div>
              </td>
              {/* Gown */}
              <td className="text-center max-w-[80px] w-[80px] align-middle relative sm:max-w-[40px] sm:w-[40px] sm:text-[9px] md:max-w-[80px] md:w-[80px] md:text-xs">
                <div className="h-full w-full py-2 flex justify-center items-center relative">
                  {isEditing ? (
                    <CustomDropdown
                      value={modifyTable ? db.gown : editData.gown}
                      options={gownOptions}
                      onChange={(val) =>
                        modifyTable
                          ? handleCellChange(db.id, "gown", val)
                          : handleEditChange({
                              target: { name: "gown", value: val },
                            })
                      }
                      disabled={false}
                    />
                  ) : (
                    <h3 className="truncate">{db.gown}</h3>
                  )}
                  <span
                    className="absolute right-0 top-1/4 h-1/2 w-0.5 bg-gray-600 opacity-50"
                    style={{ borderRadius: "2px" }}
                  ></span>
                </div>
              </td>
              <td className="text-center max-w-[120px] w-[120px] align-middle relative sm:max-w-[60px] sm:w-[60px] sm:text-[9px] md:max-w-[120px] md:w-[120px] md:text-xs">
                <div className="h-full w-full py-2 flex justify-center items-center">
                  <h3 className="truncate">{db.dateofreservation}</h3>
                  <span
                    className="absolute right-0 top-1/6 h-7 w-0.5 bg-gray-600 opacity-50"
                    style={{ borderRadius: "2px" }}
                  ></span>
                </div>
              </td>
              {/* Status */}
              <td className="w-[100px] align-middle relative sm:max-w-[50px] sm:w-[50px] sm:text-[9px] md:max-w-[100px] md:w-[100px] md:text-xs">
                <div className="w-full flex justify-center items-center text-black text-xs font-semibold tracking-widest h-full">
                  {db.status}
                </div>
                <span
                  className="absolute right-0 top-[10px] h-7 w-0.5 bg-gray-600 opacity-50"
                  style={{ borderRadius: "2px" }}
                ></span>
              </td>
              {/* Actions */}
              <td className="text-center max-w-[100px] w-[100px] align-middle sm:max-w-[50px] sm:w-[50px] sm:text-[9px] md:max-w-[100px] md:w-[100px] md:text-xs">
                <div className="h-full w-full py-2 flex justify-center items-center gap-2 relative">
                  {editId === db.id ? (
                    <>
                      <button
                        className="w-7 h-7 bg-[#C0392B] flex justify-center items-center rounded-md transition-transform duration-300 hover:scale-110 hover:bg-red-700"
                        onClick={() => {
                          // TODO: implement delete logic for column view
                        }}
                      >
                        <Trash className="w-4" />
                      </button>
                      {/* Floating Save/Cancel absolute container at the bottom sa edit view inline */}
                      <div className="absolute  left-2/8 top-10 -translate-x-1/2  z-30 flex flex-col gap-1 bg-white shadow-lg rounded-lg p-2 border border-gray-200 animate-fade-in">
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
                    </>
                  ) : (
                    <>
                      <button className="w-7 h-7 bg-[#0C7E48] flex justify-center items-center rounded-md transition-transform duration-300 hover:scale-110 hover:bg-green-700">
                        <EyeIcon className="w-5" />
                      </button>
                      <button
                        className="w-7 h-7 bg-[#0C7E48] flex justify-center items-center rounded-md transition-transform duration-300 hover:scale-110 hover:bg-blue-700"
                        onClick={() => {
                          setEditId(db.id);
                          setEditData({ ...db });
                        }}
                      >
                        <Table className="w-5" />
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>,
            idx < dashboard.length - 1 && (
              <tr key={`gap-${db.id}`} className="w-full">
                <td
                  colSpan={8}
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
    );
  }
};

// CustomDropdown for table inline editing (no duplicate imports)
function CustomDropdown({ value, options, onChange, disabled }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className={`relative w-[60px] h-[15px] flex justify-center items-center ${
        disabled ? "pointer-events-none opacity-60" : ""
      }`}
      tabIndex={0}
      onClick={() => !disabled && setOpen((o) => !o)}
      onBlur={() => setOpen(false)}
      style={{
        outline: open ? "1.5px solid #EDB427" : "1.5px solid #696969",
        borderRadius: 30,
        cursor: disabled ? "not-allowed" : "pointer",
        boxSizing: "border-box",
        height: "15px",
        background: open ? "#fff" : "#2D2B3",
        transition: "outline-color 0.3s, background 0.2s",
      }}
    >
      <div
        className={`w-full text-black text-[11px] font-semibold font-Figtree tracking-widest flex items-center justify-between px-2`}
        style={{
          borderRadius: 35,
          height: "16px",
          background: open ? "#8D8D8D" : "#DBDBDB",
          color: open ? "#F3B51A" : "#000000",
          transition: "background 0.3s",
          position: "relative",
        }}
      >
        <span className="truncate">{value}</span>
        <span
          className="ml-2 flex items-center"
          style={{
            position: "absolute",
            right: 6,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <ChevronDown className="w-3 h-3 text-black" style={{ opacity: open ? 1 : 0.7 }} />
        </span>
      </div>
      {open && (
        <div
          className="absolute z-30 left-0 top-full w-full border border-[#0C7E48] shadow-md mt-1 animate-fade-in"
          style={{ minWidth: "12px", background: "#D4D4D4" }}
        >
          {options.map((opt) => (
            <div
              key={opt}
              className={`px-2 py-1.5 text-xs font-Figtree ring-1 ring-opacity-50 flex-col w-full text-black cursor-pointer ${
                opt === value
                  ? "font-bold text-[#0C7E48] bg-slate-200 w-full"
                  : ""
              } hover:text-[#F3B51A]`}
              style={{ background: "#D4D4D4", transition: "background 0.2s" }}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Rows;
