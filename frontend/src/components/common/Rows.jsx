import Table from "../../assets/icons/table.svg?react";
import EyeIcon from "../../assets/icons/eye-icon.svg?react";
import Trash from "../../assets/icons/black-trash.svg?react";
import ChevronDown from "../../assets/icons/chevron-down.svg?react";
import PopupWindow from "./PopupWindow";
import HoverPopup from "./HoverPopup";
import GridView from "./GridView";

import { useState, useEffect, useRef } from "react";

const tasselOptions = ["Blue", "Maroon", "Orange", "White", "Yellow"];
const hoodOptions = ["Blue", "Maroon", "Orange", "White", "Yellow"];
const gownOptions = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

const Rows = ({
  isGrid,
  hideActionButton,
  modifyTable,
  rowHeightClass = "h-16",
  sortOrder,
}) => {
  const [popupDirection, setPopupDirection] = useState("down"); // "down" or "up" ung popup window
  const [dashboard, setDashboard] = useState([]);
  const [originalDashboard, setOriginalDashboard] = useState([]); // Track original data
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  // Animation state for table
  const [tableAnim, setTableAnim] = useState("");
  const prevSortOrder = useRef(sortOrder);
  const [popupMode, setPopupMode] = useState("none"); // "none" | "hover" | "full"
  const [hoveredEyeId, setHoveredEyeId] = useState(null);
  // PopupWindow state
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupUser, setPopupUser] = useState(null);

  // Function to fetch data for the dashboard
  useEffect(() => {
    // kuha data sa backend
    fetch("http://localhost:5001/inventory")
      .then((res) => res.json())
      .then((data) => {
        // Map API response properties to match the component's expected property names
        const mappedData = data.map(item => ({
          id: item.id,
          studentname: item.renters_name,
          program: item.course,
          tassel: item.tassel_color,
          hood: item.hood_color,
          gown: item.toga_size,
          dateofreservation: new Date(item.rent_date).toLocaleDateString(),
          status: item.return_status,
          // Keep other properties that might be needed
          payment_status: item.payment_status,
          evaluation_status: item.evaluation_status,
          remarks: item.remarks,
          return_date: item.return_date,
          is_overdue: item.is_overdue,
          has_cap: item.has_cap,
          item_condition: item.item_condition
        }));

        setDashboard(mappedData);
        setOriginalDashboard(mappedData);
        console.log("Original data:", data);
        console.log("Mapped data for display:", mappedData[0]);
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

  // function for???
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
            fetch(`http://localhost:5001/inventory/${row.id}`, {
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
    console.log("Save button clicked for ID:", id);
    console.log("Current editData:", editData);

    // Get updated data from editData state
    const updatedData = {
      renters_name: editData.studentname,
      course: editData.program,
      tassel_color: editData.tassel,
      hood_color: editData.hood,
      toga_size: editData.gown,
    };

    console.log("Sending update to backend:", updatedData);

    // Send updated data to the backend
    fetch(`http://localhost:5001/inventory/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // Ensuring no caching issues
        "Cache-Control": "no-cache"
      },
      body: JSON.stringify(updatedData),
    })
      .then(response => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        console.log("Update successful:", data);

        // Update the dashboard and original data in local state
        const updatedItem = { ...editData };
        setDashboard(prev =>
          prev.map(item => (item.id === id ? updatedItem : item))
        );
        setOriginalDashboard(prev =>
          prev.map(item => (item.id === id ? updatedItem : item))
        );
        setEditId(null);
        setEditData({});

        // Show success message
        alert("Changes saved successfully!");
      })
      .catch(error => {
        console.error("Error updating inventory item:", error);
        alert("Failed to save changes to the database: " + error.message);
      });
  };

  // Cancel edit, balik sa dati
  const handleCancel = () => {
    setEditId(null);
    setEditData({});
  };

  // updater to siya sa table view
  const handleCellChange = (id, name, value) => {
    setDashboard((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [name]: value } : row))
    );
  };

  // Sorting logic for table view
  const sortedDashboard =
    !isGrid && sortOrder
      ? [...dashboard].sort((a, b) => {
        if (sortOrder === "newest" || sortOrder === "oldest") {
          const dateA = new Date(a.dateofreservation);
          const dateB = new Date(b.dateofreservation);
          if (sortOrder === "newest") return dateB - dateA;
          if (sortOrder === "oldest") return dateA - dateB;
        } else if (sortOrder === "name-asc" || sortOrder === "name-desc") {
          const nameA = a.studentname.toLowerCase();
          const nameB = b.studentname.toLowerCase();
          if (nameA < nameB) return sortOrder === "name-asc" ? -1 : 1;
          if (nameA > nameB) return sortOrder === "name-asc" ? 1 : -1;
          return 0;
        }
        return 0;
      })
      : dashboard;

  useEffect(() => {
    if (!isGrid) {
      // scroller here to horizontal
      const scrollContainer = document.querySelector(".table-scroll-container");
      if (scrollContainer) {
        scrollContainer.scrollLeft = scrollContainer.scrollWidth;
      }
    }
  }, [isGrid]);

  useEffect(() => {
    if (prevSortOrder.current !== sortOrder && !isGrid) {
      setTableAnim("animate-table-sort");
      setTimeout(() => setTableAnim(""), 400);
      prevSortOrder.current = sortOrder;
    }
  }, [sortOrder, isGrid]);

  // Ito palang ung handleEyeMouseEnter para sa hover popup position niya
  function handleEyeMouseEnter(event, dbId) {
    setHoveredEyeId(dbId);
    const tableContainer =
      event.target.closest(".table-scroll-container") ||
      document.querySelector(".table-scroll-container");
    const buttonRect = event.target.getBoundingClientRect();
    const popupHeight = 340; // Approximate height of popup (px)
    let direction = "down";
    if (tableContainer) {
      const containerRect = tableContainer.getBoundingClientRect();
      if (buttonRect.bottom + popupHeight > containerRect.bottom) {
        direction = "up";
      }
    } else {
      if (buttonRect.bottom + popupHeight > window.innerHeight) {
        direction = "up";
      }
    }
    setPopupDirection(direction);
  }

  if (isGrid) {
    // Instead of rendering the grid view here, ni reuse ko nalang un grid view component
    // cleaner code, send lang props sa gridview if may idadagdag
    // bale gridview tapos props nalang like sa baba
    return (
      <GridView
        dashboard={dashboard}
        editId={editId}
        editData={editData}
        hoveredEyeId={hoveredEyeId}
        popupMode={popupMode}
        modifyTable={modifyTable}
        tasselOptions={tasselOptions}
        hoodOptions={hoodOptions}
        gownOptions={gownOptions}
        handleEditClick={handleEditClick}
        handleEditChange={handleEditChange}
        handleSave={handleSave}
        handleCancel={handleCancel}
        setHoveredEyeId={setHoveredEyeId}
        setPopupMode={setPopupMode}
        setPopupUser={setPopupUser}
        setPopupOpen={setPopupOpen}
        hideActionButton={hideActionButton}
      />
    );
  } else {
    // Table/column view with sticky header and scrollable table
    return (
      <div
        className={`w-fit h-80vh ${tableAnim}`}
        style={{ minWidth: "80px", maxWidth: "100vw", height: "100%" }}
      >
        {/* Outer scroll container */}
        <div className="w-fit h-fit">
          <div className="min-w-[300px] max-w-[120vw] sticky overflow-visible top-0 z-1000 bg-white">
            <table className="w-full table-fixed border-separate border-spacing-0 relative">
              <thead className="bg-[#02327B] sticky top-0 z-30">
                <tr className="h-6 relative xs:h-8 sm:h-10 w-full md:h-12">
                  <th className="md:w-[23%] text-white text-[7px] md:text-[11px] xs:text-xs font-bold text-center align-middle min-w-[150px]">
                    <span className="block w-full text-center ">
                      Student Name
                    </span>
                  </th>
                  <th className="sm:w-[12%] md:w-[15%] md:pl-6 sm:pr-1 text-white text-[7px] md:text-[11px] xs:text-xs font-bold text-center align-middle min-w-[100px]">
                    <span className="block w-full text-center ">Program</span>
                  </th>
                  <th className="w-[10%] sm:pr-2 md:w-[10%] md:pl-4 text-white text-[7px] md:text-[11px] xs:text-xs font-bold text-center align-middle min-w-[80px]">
                    <span className="block w-full text-center ">Tassel</span>
                  </th>
                  <th className="sm:w-[8.5%] sm:pr-2 md:pr-6 md:pl-4 md:w-[10%] text-white text-[7px] md:text-[11px] xs:text-xs font-bold text-center align-middle min-w-[80px]">
                    <span className="block w-full text-center ">Hood</span>
                  </th>
                  <th className="w-[10%] text-white text-[7px] md:text-[11px] xs:text-xs font-bold text-center align-middle min-w-[80px]">
                    <span className="block w-full text-center ">Gown</span>
                  </th>
                  <th className="w-[15%] pl-2 text-white text-[7px] md:text-[11px] xs:text-xs font-bold text-center align-middle min-w-[120px]">
                    <span className="block w-full text-center ">
                      Date of Reservation
                    </span>
                  </th>
                  <th className="w-[12.5%] text-white text-[7px] md:text-[11px] xs:text-xs font-bold text-center align-middle min-w-[100px]">
                    <span className="block w-full text-center ">Status</span>
                  </th>
                  <th className="w-[13.5%] text-white text-[7px] md:text-[11px] xs:text-xs font-bold text-center align-middle min-w-[100px]">
                    <span className="block w-full text-center ">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="w-full">
                {sortedDashboard.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="text-center py-8 text-gray-500 font-semibold bg-white"
                    >
                      No data found
                    </td>
                  </tr>
                ) : (
                  sortedDashboard.map((db, idx) => {
                    const rowColor = getRowColor(idx);
                    const isEditing = modifyTable || editId === db.id;
                    return (
                      <tr
                        className={`${rowHeightClass} w-[1417px] ${rowColor} text-xs font-normal table-fixed`}
                        key={db.id}
                      >
                        <td className="text-center max-w-[180px] align-middle relative sm:max-w-[90px] sm:w-[90px] sm:text-[9px] md:max-w-[180px] md:w-[180px] md:text-xs">
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
                                value={
                                  modifyTable ? db.tassel : editData.tassel
                                }
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
                            className="absolute right-0 top-[18px] h-7 w-0.5 bg-gray-600 opacity-50"
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
                                <div
                                  className="relative"
                                  onMouseLeave={() => setHoveredEyeId(null)}
                                >
                                  <button
                                    className={`w-7 h-7 flex justify-center items-center rounded-md transition-transform duration-300 hover:scale-110 ${hoveredEyeId === db.id
                                      ? "bg-blue-600"
                                      : ""
                                      }`}
                                    style={{
                                      background: modifyTable
                                        ? "#bdbdbd"
                                        : hoveredEyeId === db.id
                                          ? "#2563eb"
                                          : "#0C7E48",
                                      cursor: modifyTable
                                        ? "not-allowed"
                                        : "pointer",
                                    }}
                                    disabled={modifyTable}
                                    onMouseEnter={(e) =>
                                      handleEyeMouseEnter(e, db.id)
                                    }
                                    onClick={() => {
                                      setHoveredEyeId(db.id);
                                      setPopupUser(db);
                                      setPopupOpen(true);
                                      setPopupMode("full");
                                    }}
                                  >
                                    <EyeIcon
                                      className={`w-5 transition-colors duration-200 ${hoveredEyeId === db.id
                                        ? "text-blue-200"
                                        : "text-white"
                                        }`}
                                    />
                                  </button>
                                  {hoveredEyeId === db.id && (
                                    <div
                                      className={`absolute right-2 -translate-x-1/2 z-50 w-80 h-fit   rounded-xl opacity-100 transition-all duration-300 animate-fade-in pointer-events-auto ${popupDirection === "up"
                                        ? "bottom-10"
                                        : "top-10"
                                        }`}
                                      style={
                                        popupDirection === "up"
                                          ? { bottom: "2.5rem" }
                                          : { top: "2.5rem" }
                                      }
                                      onMouseEnter={(e) =>
                                        handleEyeMouseEnter(e, db.id)
                                      }
                                      onMouseLeave={() => setHoveredEyeId(null)}
                                    >
                                      <HoverPopup user={db} />
                                    </div>
                                  )}
                                </div>
                                <button
                                  className="w-7 h-7 flex justify-center items-center rounded-md transition-transform duration-300 hover:scale-110"
                                  style={{
                                    background: modifyTable
                                      ? "#bdbdbd"
                                      : "#0C7E48",
                                    cursor: modifyTable
                                      ? "not-allowed"
                                      : "pointer",
                                  }}
                                  disabled={modifyTable}
                                  onClick={() => {
                                    if (!modifyTable) {
                                      setEditId(db.id);
                                      setEditData({ ...db });
                                    }
                                  }}
                                >
                                  <Table className="w-5" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
        <PopupWindow
          open={popupOpen}
          onClose={() => setPopupOpen(false)}
          user={popupUser}
          showBackButton={false}
          fullScreen={true}
        />
      </div>
    );
  }
};

export default Rows;

// CustomDropdown for table/grid inline editing
const CustomDropdown = ({ value, options, onChange, disabled }) => {
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
      className={`relative w-[80%] flex justify-center items-center ${disabled ? "pointer-events-none opacity-60" : ""
        }`}
      tabIndex={0}
      style={{
        outline: open ? "1.5px solid #0C7E48" : "1.5px solid #696969",
        borderRadius: 30,
        cursor: disabled ? "not-allowed" : "pointer",
        boxSizing: "border-box",
        background: open ? "#fff" : "#F3F4F6",
        transition: "outline-color 0.3s, background 0.2s",
      }}
    >
      <button
        type="button"
        className="w-full flex items-center px-1 md:px-3 text-black sm:text-[8px] text-[6px] md:text-[10px] lg:text-[11px] justify-center font-semibold font-Figtree tracking-widest focus:outline-[#EDB427] focus:outline-1.5 focus:outline-offset-[-1px] focus:outline-blur-md"
        style={{
          borderRadius: 35,
          minHeight: "20px",
          background: open ? "#0C7E48" : "#DBDBDB",
          color: open ? "#fff" : "#000000",
          transition: "background 0.3s",
          position: "relative",
        }}
        onClick={() => !disabled && setOpen((o) => !o)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="truncate">{value}</span>
        <span
          className="items-center absolute hidden md:flex lg:flex"
          style={{
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "cursor",
          }}
        >
          <ChevronDown
            className="w-2.5 h-2.5 text-black absolute"
            style={{ opacity: open ? 0.8 : 1, color: open ? "#fff" : "#000" }}
            aria-hidden="true"
          />
        </span>
      </button>
      {open && (
        <div className="absolute z-30 left-0 top-full w-full mt-1 animate-fade-in flex justify-center">
          <div
            className="w-full h-full absolute top-0 left-0 rounded-lg border-[1.5px] border-[#0C7E48] bg-[#E9E9E9] pointer-events-none"
            style={{ zIndex: 0 }}
          />
          <div
            className="relative w-full overflow-auto flex flex-col items-center"
            style={{ zIndex: 1 }}
            role="listbox"
          >
            {options.map((opt, idx) => (
              <div
                key={opt}
                className={`my-1.0 text-xs font-Figtree w-full h-8 flex items-center justify-center text-black cursor-pointer transition-colors duration-150${opt === value
                  ? " font-bold text-[#0C7E48] bg-slate-200 border-l-[1.5px] border-r-[1.5px] border-[#0C7E48]"
                  : ""
                  }`}
                style={{
                  background: opt === value ? "#E9E9E9" : "transparent",
                  borderRadius: "0",
                  borderLeft: opt === value ? "5px solid #0C7E48" : "none",
                  borderRight: opt === value ? "5px solid #0C7E48" : "none",
                  borderTop: "none",
                  borderBottom: "none",
                }}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                role="option"
                aria-selected={opt === value}
                tabIndex={0}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#d9d9d9";
                  e.currentTarget.style.color = "#0C7E48";
                  if (idx === 0) {
                    e.currentTarget.style.borderTopLeftRadius = "5px";
                    e.currentTarget.style.borderTopRightRadius = "5px";
                  } else if (idx === options.length - 1) {
                    e.currentTarget.style.borderBottomLeftRadius = "5px";
                    e.currentTarget.style.borderBottomRightRadius = "5px";
                  } else {
                    e.currentTarget.style.borderTopLeftRadius = "0";
                    e.currentTarget.style.borderTopRightRadius = "0";
                    e.currentTarget.style.borderBottomLeftRadius = "0";
                    e.currentTarget.style.borderBottomRightRadius = "0";
                  }
                  if (opt === value) {
                    e.currentTarget.style.borderLeft = "1.5px solid #0C7E48";
                    e.currentTarget.style.borderRight = "1.5px solid #0C7E48";
                    e.currentTarget.style.borderTop = "none";
                    e.currentTarget.style.borderBottom = "none";
                  } else {
                    e.currentTarget.style.border = "none";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    opt === value ? "#E9E9E9" : "transparent";
                  e.currentTarget.style.color =
                    opt === value ? "#0C7E48" : "#000";
                  e.currentTarget.style.borderTopLeftRadius = "4";
                  e.currentTarget.style.borderTopRightRadius = "4";
                  e.currentTarget.style.borderBottomLeftRadius = "4";
                  e.currentTarget.style.borderBottomRightRadius = "4";
                  if (opt === value) {
                    e.currentTarget.style.borderLeft = "4px solid #0C7E48";
                    e.currentTarget.style.borderRight = "4px solid #0C7E48";
                    e.currentTarget.style.borderTop = "none";
                    e.currentTarget.style.borderBottom = "none";
                  } else {
                    e.currentTarget.style.border = "none";
                  }
                }}
              >
                {opt}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

function getRowColor(index) {
  // Alternate row colors for better readability
  return index % 2 === 0 ? "bg-white" : "bg-gray-50";
}
