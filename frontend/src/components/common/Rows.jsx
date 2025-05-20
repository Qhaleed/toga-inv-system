import Table from "../../assets/icons/table.svg?react";
import EyeIcon from "../../assets/icons/eye-icon.svg?react";
import Trash from "../../assets/icons/black-trash.svg?react";
import ChevronDown from "../../assets/icons/chevron-down.svg?react";
import PopupWindow from "./PopupWindow";
import HoverPopup from "./HoverPopup";
import GridView from "./GridView";
import AlertCard from "./AlertCard";

import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const Rows = ({
  isGrid,
  hideActionButton,
  modifyTable,
  rowHeightClass = "h-16",
  searchResults,
  isAll,
  isReturnedTab,
  isNotReturnedTab,
  isAZ,
  isZA,
  allData,
}) => {
  const [dashboard, setDashboard] = useState([]);
  const [originalDashboard, setOriginalDashboard] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  // const [tableAnim, setTableAnim] = useState("");

  const [popupMode, setPopupMode] = useState("none");
  const [hoveredEyeId, setHoveredEyeId] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupUser, setPopupUser] = useState(false);

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const showAlert = (message, type = "success") => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert((a) => ({ ...a, show: false })), 3000);
  };

  // Filtering/sorting logic
  useEffect(() => {
    let filtered = allData;
    // Filter logic
    if (isReturnedTab) {
      filtered = allData.filter((row) => row.return_status === "Returned");
    } else if (isNotReturnedTab) {
      filtered = allData.filter(
        (row) =>
          row.return_status === "Not Returned" || row.return_status === "null"
      );
    } else if (isAll) {
      filtered = allData;
    }
    // Sorting
    if (isAZ) {
      filtered = [...filtered].sort((a, b) =>
        ((a.surname || "") + ", " + (a.first_name || "")).localeCompare(
          (b.surname || "") + ", " + (b.first_name || "")
        )
      );
    } else if (isZA) {
      filtered = [...filtered].sort((a, b) =>
        ((b.surname || "") + ", " + (b.first_name || "")).localeCompare(
          (a.surname || "") + ", " + (a.first_name || "")
        )
      );
    }
    // Always map to add studentname and dateofreservation property
    const mapped = (filtered || []).map((row) => ({
      ...row,
      studentname:
        row.studentname ||
        (row.surname || "") +
          ", " +
          (row.first_name || "") +
          (row.middle_initial ? " " + row.middle_initial : ""),
      dateofreservation:
        row.dateofreservation ||
        (row.rent_date ? new Date(row.rent_date).toLocaleDateString() : ""),
    }));
    setDashboard(mapped);
  }, [isAll, isReturnedTab, isNotReturnedTab, isAZ, isZA, allData]);

  useEffect(() => {
    if (modifyTable) {
      setDashboard((prev = []) =>
        prev.map((item) => ({ ...item, eye: "hidden", trash: "block" }))
      );
    } else {
      setDashboard((prev = []) =>
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
      const changedRows = dashboard.filter((row) => {
        const orig = originalDashboard.find((o) => o.id === row.id);
        return (
          orig &&
          (row.tassel_color !== orig.tassel_color ||
            row.hood_color !== orig.hood_color ||
            row.toga_size !== orig.toga_size)
        );
      });
      if (changedRows.length > 0) {
        Promise.all(
          changedRows.map((row) =>
            fetch(`http://localhost:5001/inventory/${row.id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                tassel_color: row.tassel_color,
                hood_color: row.hood_color,
                toga_size: row.toga_size,
              }),
            })
          )
        )
          .then(() => {
            showAlert("Changes saved!", "success"); // customized to sya showing success alert from
            setOriginalDashboard(dashboard);
          })
          .catch(() => {
            showAlert("Failed to save changes.", "error");
          });
      }
    }
    prevModifyTable.current = modifyTable;
  }, [modifyTable, dashboard, originalDashboard]);

  const handleEditClick = (row) => {
    setDashboard((prev = []) =>
      prev.map((item) =>
        row.inventory_id === item.inventory_id
          ? {
              ...item,
              eye: item.eye === "block" ? "hidden" : "block",
              trash: item.trash === "hidden" ? "block" : "hidden",
            }
          : item
      )
    );
    setEditId(row.inventory_id);
    setEditData({ ...row });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (inventory_id) => {
    const updatedData = {
      renters_name: editData.studentname,
      course: editData.course,
      tassel_color: editData.tassel_color,
      hood_color: editData.hood_color,
      toga_size: editData.toga_size,
      return_status: editData.return_status,
    };
    fetch(`http://localhost:5001/inventory/${inventory_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok: " + response.status);
        }
        return response.json();
      })
      .then(() => {
        const updatedItem = { ...editData };
        setDashboard((prev = []) =>
          prev.map((item) =>
            item.inventory_id === inventory_id ? updatedItem : item
          )
        );
        setOriginalDashboard((prev = []) =>
          prev.map((item) =>
            item.inventory_id === inventory_id ? updatedItem : item
          )
        );
        setEditId(null);
        setEditData({});
        showAlert("Changes saved successfully!", "success");
      })
      .catch((error) => {
        showAlert(
          "Failed to save changes to the database: " + error.message,
          "error"
        );
      });
  };

  const handleCancel = () => {
    setEditId(null);
    setEditData({});
  };

  const handleDelete = (inventory_id) => {
    fetch(`http://localhost:5001/inventory/${inventory_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok: " + response.status);
        }
        return response.json();
      })
      .then(() => {
        setDashboard((prev = []) =>
          prev.filter((item) => item.inventory_id !== inventory_id)
        );
        setOriginalDashboard((prev = []) =>
          prev.filter((item) => item.inventory_id !== inventory_id)
        );
        if (editId === inventory_id) {
          setEditId(null);
          setEditData({});
        }
        showAlert("Item deleted successfully!", "success");
      })
      .catch((error) => {
        showAlert("Failed to delete the item: " + error.message, "error");
      });
  };

  const displayDashboard =
    Array.isArray(searchResults) && searchResults.length > 0
      ? searchResults
      : Array.isArray(dashboard)
      ? dashboard
      : [];

  // Extract unique dropdown options from allData
  const tasselColorOptions = Array.from(
    new Set((allData || []).map((item) => item.tassel_color).filter(Boolean))
  );
  const hoodColorOptions = Array.from(
    new Set((allData || []).map((item) => item.hood_color).filter(Boolean))
  );
  // Hardcoded to ung gown size options XS to 3XL
  const togaSizeOptions = ["XS", "S", "M", "L", "XL", "2XL", "3XL", ""];

  useEffect(() => {
    if (!isGrid) {
      const scrollContainer = document.querySelector(".table-scroll-container");
      if (scrollContainer) {
        scrollContainer.scrollLeft = scrollContainer.scrollWidth;
      }
    }
  }, [isGrid]);

  useEffect(() => {
    // Unified filtering/sorting logic for the reservation tab only
    let filtered = allData;

    // Reservation tab filtering
    if (isReturnedTab) {
      filtered = allData.filter((row) => row.return_status === "Returned");
    } else if (isNotReturnedTab) {
      filtered = allData.filter(
        (row) => row.status === "null" || row.return_status === "Not Returned"
      );
    }
    // else {
    //   // Always default to all if no other filter is set
    //   filtered = allData;
    // }

    // Sorting
    if (isAZ) {
      filtered = [...filtered].sort((a, b) =>
        ((a.surname || "") + ", " + (a.first_name || "")).localeCompare(
          (b.surname || "") + ", " + (b.first_name || "")
        )
      );
    } else if (isZA) {
      filtered = [...filtered].sort((a, b) =>
        ((b.surname || "") + ", " + (b.first_name || "")).localeCompare(
          (a.surname || "") + ", " + (a.first_name || "")
        )
      );
    }

    // Always map to add studentname and dateofreservation property
    const mapped = (filtered || []).map((row) => ({
      ...row,
      studentname:
        row.studentname ||
        (row.surname || "") +
          ", " +
          (row.first_name || "") +
          (row.middle_initial ? " " + row.middle_initial : ""),
      dateofreservation:
        row.dateofreservation ||
        (row.rent_date ? new Date(row.rent_date).toLocaleDateString() : ""),
    }));

    setDashboard(mapped);
  }, [isAll, isReturnedTab, isNotReturnedTab, isAZ, isZA, allData]);

  if (isGrid) {
    return (
      <>
        <AlertCard
          message={alert.message}
          type={alert.type}
          show={alert.show}
          onClose={() => setAlert((a) => ({ ...a, show: false }))}
        />
        <GridView
          dashboard={displayDashboard}
          editId={editId}
          editData={editData}
          hoveredEyeId={hoveredEyeId}
          popupMode={popupMode}
          modifyTable={modifyTable}
          tasselColorOptions={tasselColorOptions}
          hoodColorOptions={hoodColorOptions}
          togaSizeOptions={togaSizeOptions}
          handleEditClick={handleEditClick}
          handleEditChange={handleEditChange}
          handleSave={handleSave}
          handleCancel={handleCancel}
          handleDelete={handleDelete}
          setHoveredEyeId={setHoveredEyeId}
          setPopupMode={setPopupMode}
          setPopupUser={setPopupUser}
          setPopupOpen={setPopupOpen}
          hideActionButton={hideActionButton}
        />
      </>
    );
  } else {
    return (
      <>
        <AlertCard
          message={alert.message}
          type={alert.type}
          show={alert.show}
          onClose={() => setAlert((a) => ({ ...a, show: false }))}
        />
        <div
          className="w-full max-h-screen overflow-x-auto"
          style={{ minWidth: "600px", maxWidth: "100vw" }}
        >
          <div className="min-w-[300px] max-w-[120vw] overflow-visible relative bg-white">
            <table className="w-full ">
              <thead className="bg-[#02327B]  top-0 z-10 sticky">
                <tr className="h-6 relative xs:h-8 sm:h-10 w-full md:h-13">
                  <th className="w-[120px] min-w-[90px] max-w-[180px] text-white text-[10px] xs:text-xs md:text-[11px] font-bold text-center align-middle">
                    <span className="block text-[10px] md:text-[15px] w-full text-center ">
                      Student Name
                    </span>
                  </th>
                  <th className="w-[90px] min-w-[60px] max-w-[120px] text-white text-[10px] xs:text-xs md:text-[11px] font-bold text-center align-middle">
                    <span className="block text-[10px] md:text-[15px] w-full text-center ">
                      Program
                    </span>
                  </th>
                  <th className="w-[60px] min-w-[40px] max-w-[80px] text-white text-[10px] xs:text-xs md:text-[11px] font-bold text-center align-middle">
                    <span className="block text-[10px] md:text-[15px] w-full text-center ">
                      Tassel
                    </span>
                  </th>
                  <th className="w-[60px] min-w-[40px] max-w-[80px] text-white text-[10px] xs:text-xs md:text-[11px] font-bold text-center align-middle">
                    <span className="block text-[10px] md:text-[15px] w-full text-center ">
                      Hood
                    </span>
                  </th>
                  <th className="w-[60px] min-w-[40px] max-w-[80px] text-white text-[10px] xs:text-xs md:text-[11px] font-bold text-center align-middle">
                    <span className="block text-[10px] md:text-[15px] w-full text-center ">
                      Gown
                    </span>
                  </th>
                  <th className="w-[120px] min-w-[80px] max-w-[120px] text-white text-[10px] xs:text-xs md:text-[11px] font-bold text-center align-middle">
                    <span className="block text-[10px] md:text-[15px] w-full text-center ">
                      Date of Reservation
                    </span>
                  </th>
                  <th className="w-[80px] min-w-[50px] max-w-[100px] text-white text-[10px] xs:text-xs md:text-[11px] font-bold text-center align-middle">
                    <span className="block text-[10px] md:text-[15px] w-full text-center ">
                      Status
                    </span>
                  </th>
                  <th className="w-[80px] min-w-[50px] max-w-[100px] text-white text-[10px] xs:text-xs md:text-[11px] font-bold text-center align-middle">
                    <span className="block text-[10px] md:text-[15px] w-full text-center ">
                      Actions
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="w-full">
                {displayDashboard.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="text-center py-8 text-gray-500 font-semibold bg-white"
                    >
                      No data found
                    </td>
                  </tr>
                ) : (
                  displayDashboard.map((row, idx) => {
                    const rowColor = getRowColor(idx);
                    return (
                      <tr
                        className={`${rowHeightClass} w-[1417px] ${rowColor} text-xs font-normal table-columns`}
                        key={row.id}
                      >
                        <td className="text-center max-w-[180px] align-middle relative sm:max-w-[90px] sm:w-[90px] sm:text-[9px] md:max-w-[180px] md:w-[180px] md:text-xs">
                          <div className="h-full w-[100%] py-4 flex justify-center items-center">
                            <h3 className="truncate">{row.studentname}</h3>
                            <span className="absolute right-0 top-1/3 h-7 w-0.5 bg-gray-600 opacity-20 border-2"></span>
                          </div>
                        </td>
                        <td className="text-center max-w-[120px] w-[120px] align-middle relative sm:max-w-[60px] sm:w-[60px] sm:text-[9px] md:max-w-[120px] md:w-[120px] md:text-xs">
                          <div className="h-full w-full py-2 flex justify-center items-center">
                            <h3 className="truncate">{row.course}</h3>
                            <span className="absolute right-0 top-1/3 h-7 w-0.5 bg-gray-600 opacity-20 border-2"></span>
                          </div>
                        </td>
                        <td className="text-center max-w-[80px] w-[80px] align-middle relative sm:max-w-[40px] sm:w-[40px] sm:text-[9px] md:max-w-[80px] md:w-[80px] md:text-xs">
                          <div className="h-full w-full py-2 flex justify-center items-center relative">
                            {modifyTable ? (
                              <CustomDropdown
                                value={row.tassel_color}
                                options={tasselColorOptions}
                                onChange={(val) => {
                                  setDashboard((prev) =>
                                    prev.map((item) =>
                                      item.inventory_id === row.inventory_id
                                        ? { ...item, tassel_color: val }
                                        : item
                                    )
                                  );
                                }}
                                disabled={false}
                              />
                            ) : editId === row.inventory_id ? (
                              <CustomDropdown
                                value={editData.tassel_color}
                                options={tasselColorOptions}
                                onChange={(val) =>
                                  setEditData((prev) => ({
                                    ...prev,
                                    tassel_color: val,
                                  }))
                                }
                                disabled={false}
                              />
                            ) : (
                              <h3 className="truncate">{row.tassel_color}</h3>
                            )}
                            <span className="absolute right-0 top-1/6 h-7 w-0.5 bg-gray-600 opacity-20 border-2"></span>
                          </div>
                        </td>
                        <td className="text-center max-w-[80px] w-[80px] align-middle relative sm:max-w-[40px] sm:w-[40px] sm:text-[9px] md:max-w-[80px] md:w-[80px] md:text-xs">
                          <div className="h-full w-full py-2 flex justify-center items-center relative">
                            {modifyTable ? (
                              <CustomDropdown
                                value={row.hood_color}
                                options={hoodColorOptions}
                                onChange={(val) => {
                                  setDashboard((prev) =>
                                    prev.map((item) =>
                                      item.inventory_id === row.inventory_id
                                        ? { ...item, hood_color: val }
                                        : item
                                    )
                                  );
                                }}
                                disabled={false}
                              />
                            ) : editId === row.inventory_id ? (
                              <CustomDropdown
                                value={editData.hood_color}
                                options={hoodColorOptions}
                                onChange={(val) =>
                                  setEditData((prev) => ({
                                    ...prev,
                                    hood_color: val,
                                  }))
                                }
                                disabled={false}
                              />
                            ) : (
                              <h3 className="truncate">{row.hood_color}</h3>
                            )}
                            <span className="absolute right-0 top-1/6 h-7 w-0.5 bg-gray-600 opacity-20 border-2"></span>
                          </div>
                        </td>
                        <td className="text-center max-w-[80px] w-[80px] align-middle relative sm:max-w-[40px] sm:w-[40px] sm:text-[9px] md:max-w-[80px] md:w-[80px] md:text-xs">
                          <div className="h-full w-full py-2 flex justify-center items-center relative">
                            {modifyTable ? (
                              <CustomDropdown
                                value={row.toga_size}
                                options={togaSizeOptions}
                                onChange={(val) => {
                                  setDashboard((prev) =>
                                    prev.map((item) =>
                                      item.inventory_id === row.inventory_id
                                        ? { ...item, toga_size: val }
                                        : item
                                    )
                                  );
                                }}
                                disabled={false}
                              />
                            ) : editId === row.inventory_id ? (
                              <CustomDropdown
                                value={editData.toga_size}
                                options={togaSizeOptions}
                                onChange={(val) =>
                                  setEditData((prev) => ({
                                    ...prev,
                                    toga_size: val,
                                  }))
                                }
                                disabled={false}
                              />
                            ) : (
                              <h3 className="truncate">{row.toga_size}</h3>
                            )}
                            <span className="absolute right-0 top-1/6 h-7 w-0.5 bg-gray-600 opacity-20 border-2"></span>
                          </div>
                        </td>
                        <td className="text-center max-w-[120px] w-[120px] align-middle relative sm:max-w-[60px] sm:w-[60px] sm:text-[9px] md:max-w-[120px] md:w-[120px] md:text-xs">
                          <div className="h-full w-full py-2 flex justify-center items-center">
                            <h3 className="truncate">
                              {row.dateofreservation}
                            </h3>
                            <span className="absolute right-0 top-1/3 h-7 w-0.5 bg-gray-600 opacity-20 border-2"></span>
                          </div>
                        </td>
                        <td className="w-[100px] align-middle relative sm:max-w-[50px] sm:w-[50px] sm:text-[9px] md:max-w-[100px] md:w-[100px] md:text-xs">
                          <div className="w-full flex justify-center items-center text-black text-xs font-semibold tracking-widest h-full">
                            {modifyTable ? (
                              <CustomDropdown
                                value={row.return_status}
                                options={["Returned", "Not Returned"]}
                                onChange={(val) => {
                                  setDashboard((prev) =>
                                    prev.map((item) =>
                                      item.inventory_id === row.inventory_id
                                        ? { ...item, return_status: val }
                                        : item
                                    )
                                  );
                                }}
                                disabled={false}
                              />
                            ) : editId === row.inventory_id ? (
                              <div className="flex flex-col items-center w-full">
                                <CustomDropdown
                                  value={editData.return_status}
                                  options={["Returned", "Not Returned"]}
                                  onChange={(val) =>
                                    setEditData((prev) => ({
                                      ...prev,
                                      return_status: val,
                                    }))
                                  }
                                  disabled={false}
                                />
                              </div>
                            ) : row.return_status !== "Returned" ? (
                              <button
                                className="px-3 py-1 bg-emerald-700 text-white rounded hover:bg-blue-800 text-xs"
                                onClick={async () => {
                                  try {
                                    const res = await fetch(
                                      `http://localhost:5001/inventory/${row.inventory_id}`,
                                      {
                                        method: "PATCH",
                                        headers: {
                                          "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                          return_status: "Returned",
                                        }),
                                      }
                                    );
                                    if (!res.ok) throw new Error("Failed to update status");
                                    setDashboard((prev) =>
                                      prev.map((item) =>
                                        item.inventory_id === row.inventory_id
                                          ? { ...item, return_status: "Returned" }
                                          : item
                                      )
                                    );
                                    showAlert("Status set to Returned!", "success");
                                  } catch (err) {
                                    showAlert("Failed to set status to Returned: " + err.message, "error");
                                  }
                                }}
                              >
                                Set Returned
                              </button>
                            ) : (
                              <span>{row.return_status}</span>
                            )}
                          </div>
                          <span className="absolute right-0 top-1/3 h-7 w-0.5 bg-gray-600 opacity-20 border-2"></span>
                        </td>
                        <td className="text-center max-w-[100px] w-[100px] align-middle sm:max-w-[50px] sm:w-[50px] sm:text-[9px] md:max-w-[100px] md:w-[100px] md:text-xs">
                          <div className="h-full w-full py-2 flex justify-center items-center gap-2 relative">
                            {/* Eye/Trash Icon and Edit Button logic */}
                            {editId === row.inventory_id || modifyTable ? (
                              <>
                                {/* Trash replaces Eye when editing or in modifyTable mode */}
                                <button
                                  className="w-7 h-7 bg-[#C0392B] flex justify-center items-center rounded-md transition-transform duration-300 hover:scale-110 hover:bg-red-700"
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        `Are you sure you want to delete ${row.studentname}'s records?`
                                      )
                                    ) {
                                      handleDelete(row.inventory_id);
                                    }
                                  }}
                                  aria-label="Delete row"
                                >
                                  <Trash className="w-4" />
                                </button>

                                <button
                                  className="w-7 h-7 flex justify-center items-center rounded-md bg-gray-300 opacity-60 cursor-not-allowed"
                                  disabled
                                  aria-label="Edit row (disabled)"
                                >
                                  <Table className="w-5" />
                                </button>
                                {/*eto ung single row edit  */}
                                {editId === row.inventory_id &&
                                  !modifyTable && (
                                    <div
                                      className="absolute left-15 top-2/8 -translate-y-1/2 z-30 flex flex-col gap-1 bg-white shadow-lg rounded-lg p-1 border border-gray-200 animate-fade-in min-w-[80px] w-max"
                                      style={{
                                        minWidth: 0,
                                        maxWidth: 180,
                                        overflow: "visible",
                                      }}
                                    >
                                      <button
                                        className="px-2 py-1 bg-emerald-700 text-white rounded hover:bg-blue-800 text-xs mb-1 whitespace-nowrap"
                                        onClick={() =>
                                          handleSave(row.inventory_id)
                                        }
                                        style={{ minWidth: 0 }}
                                      >
                                        Save
                                      </button>
                                      <button
                                        className="px-1 py-1 bg-[#919191] text-white rounded hover:bg-gray-600 text-xs whitespace-nowrap"
                                        onClick={handleCancel}
                                        style={{ minWidth: 0 }}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  )}
                              </>
                            ) : (
                              <>
                                {/* basuc Eye icon */}
                                <button
                                  className={`w-7 h-7 flex justify-center items-center rounded-md transition-transform duration-300 hover:scale-110 ${
                                    hoveredEyeId === row.inventory_id
                                      ? "bg-blue-600"
                                      : ""
                                  }`}
                                  style={{
                                    background: modifyTable
                                      ? "#bdbdbd"
                                      : hoveredEyeId === row.inventory_id
                                      ? "#2563eb"
                                      : "#0C7E48",
                                    cursor: modifyTable
                                      ? "not-allowed"
                                      : "pointer",
                                  }}
                                  disabled={modifyTable}
                                  onClick={() => {
                                    setPopupUser(row);
                                    setPopupOpen(true);
                                    setPopupMode("full");
                                  }}
                                  aria-label="View details"
                                >
                                  <EyeIcon
                                    className={`w-5 transition-colors duration-200 ${
                                      hoveredEyeId === row.inventory_id
                                        ? "text-blue-200"
                                        : "text-white"
                                    }`}
                                  />
                                </button>
                                {/* bsic Edit button */}
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
                                      setEditId(row.inventory_id);
                                      setEditData({ ...row });
                                    }
                                  }}
                                  aria-label="Edit row"
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
          <PopupWindow
            open={popupOpen}
            onClose={(updatedData) => {
              setPopupOpen(false);
              if (updatedData) {
                // filter bago mag map
                const filteredData = updatedData.filter(
                  (item) =>
                    item.toga_size !== null && item.toga_size !== undefined
                );

                // Mappers
                const mappedData = filteredData.map((item) => ({
                  id: item.inventory_id,
                  studentname:
                    item.surname +
                    ", " +
                    item.first_name +
                    " " +
                    item.middle_initial,
                  course: item.course,
                  tassel_color: item.tassel_color,
                  hood_color: item.hood_color,
                  toga_size: item.toga_size,
                  dateofreservation: item.rent_date
                    ? new Date(item.rent_date).toLocaleDateString()
                    : "",
                  status: item.return_status,
                  payment_status: item.payment_status,
                  evaluation_status: item.evaluation_status,
                  remarks: item.remarks,
                  return_date: item.return_date,
                  is_overdue: item.is_overdue,
                  has_cap: item.has_cap,
                  item_condition: item.item_condition,
                }));
                setDashboard(mappedData);
                setOriginalDashboard(mappedData);
              }
            }}
            user={popupUser}
            showBackButton={false}
            fullScreen={true}
          />
        </div>
      </>
    );
  }
};

export default Rows;

const CustomDropdown = ({ value, options, onChange, disabled }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const dropdownRef = useRef();
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        (!dropdownRef.current || !dropdownRef.current.contains(event.target))
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [open]);

  // Render dropdown in a portal (body) so it doesn't take up table space
  const dropdownMenu = open
    ? ReactDOM.createPortal(
        <div
          ref={dropdownRef}
          className="z-[9999] fixed"
          style={{
            top: dropdownPos.top,
            left: dropdownPos.left,
            width: dropdownPos.width || 120,
            minWidth: 120,
            background: "#E9E9E9",
            border: "1.5px solid #0C7E48",
            borderRadius: 8,
            boxShadow: "0 4px 24px 0 rgba(43, 43, 43, 0.12)",
            padding: 0,
            margin: 0,
            overflow: "visible",
          }}
          role="listbox"
        >
          {options.map((opt, idx) => (
            <div
              key={opt}
              className={`my-1.0 text-xs font-Figtree w-full h-8 flex items-center justify-center text-black cursor-pointer transition-colors duration-150${
                opt === value
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
              onMouseEnter={function (e) {
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
              onMouseLeave={function (e) {
                e.currentTarget.style.background =
                  opt === value ? "#E9E9E9" : "transparent";
                e.currentTarget.style.color =
                  opt === value ? "#0C7E48" : "#000";
                e.currentTarget.style.borderTopLeftRadius = "4px";
                e.currentTarget.style.borderTopRightRadius = "4px";
                e.currentTarget.style.borderBottomLeftRadius = "4px";
                e.currentTarget.style.borderBottomRightRadius = "4px";
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
        </div>,
        document.body
      )
    : null;

  return (
    <div
      ref={ref}
      className={`relative w-[80%] flex justify-center items-center ${
        disabled ? "pointer-events-none opacity-20" : ""
      }`}
      tabIndex={0}
      style={{
        outline: open ? "1.5px solid #0C7E48" : "1.5px solid #696969",
        borderRadius: 30,
        cursor: disabled ? "not-allowed" : "pointer",
        boxSizing: "border-box",
        background: open ? "#fff" : "#F3F4F6",
        transition: "outline-color 0.3s, background 0.2s",
        zIndex: 20,
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
      {dropdownMenu}
    </div>
  );
};

function getRowColor(index) {
  return index % 2 === 0 ? "bg-[#E9E9E9]" : "bg-[#D4D4D4]";
}
