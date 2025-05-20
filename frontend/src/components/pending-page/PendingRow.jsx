/*
 * PendingRow Component
 * Displays rows of toga inventory data with a focus on item status
 * This component is specifically designed for the pending page to show item status
 * instead of return status in the status column
 */

import React, { useState, useEffect, useRef } from "react";
import Table from "../../assets/icons/table.svg?react";
import EyeIcon from "../../assets/icons/eye-icon.svg?react";
import Trash from "../../assets/icons/black-trash.svg?react";
import ChevronDown from "../../assets/icons/chevron-down.svg?react";
import PopupWindow from "../common/PopupWindow";
import HoverPopup from "../common/HoverPopup";
import GridView from "../common/GridView";
import ReactDOM from "react-dom";
import AlertCard from "../common/AlertCard";

// Constants for dropdown options

const PendingRow = ({
  isGrid,
  hideActionButton,
  modifyTable,
  rowHeightClass = "h-16",
  sortOrder,
  searchResults,
  allData,
  focusedStatus, // New prop for focused status from sidebar
}) => {
  // State management
  const [dashboard, setDashboard] = useState([]);
  const [originalDashboard, setOriginalDashboard] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [tableAnim, setTableAnim] = useState("");
  const prevSortOrder = useRef(sortOrder);
  const [popupMode, setPopupMode] = useState("none");
  const [hoveredEyeId, setHoveredEyeId] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupUser, setPopupUser] = useState(false);
  const [filterStatus, setFilterStatus] = useState(focusedStatus || "all"); // 'all', 'Approved', 'Pending', 'Rejected'
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const showAlert = (message, type = "success") => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert((a) => ({ ...a, show: false })), 3000);
  };

  // Use allData for dashboard, like Rows.jsx
  useEffect(() => {
    if (allData && Array.isArray(allData)) {
      // Show all inventory records (remove hardcoded account_id filter)
      const mapped = allData.map((item) => ({
        id: item.inventory_id,
        account_id: item.account_id, // <-- add account_id for PATCH
        studentname:
          (item.surname || "") +
          ", " +
          (item.first_name || "") +
          (item.middle_initial ? " " + item.middle_initial : ""),
        course: item.course,
        tassel_color: item.tassel_color,
        hood_color: item.hood_color,
        toga_size: item.toga_size,
        dateofreservation: item.rent_date
          ? new Date(item.rent_date).toLocaleDateString()
          : "",
        status: item.status, // Using status instead of return_status here
        payment_status: item.payment_status,
        evaluation_status: item.evaluation_status,
        remarks: item.remarks,
        return_date: item.return_date,
        is_overdue: item.is_overdue,
        has_cap: item.has_cap,
        item_condition: item.item_condition,
        // Add default UI state for edit/trash icons
        eye: "block",
        trash: "hidden",
      }));
      setDashboard(mapped);
      setOriginalDashboard(mapped);
    }
  }, [allData]);

  // Update dashboard state when modifyTable changes
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

  // Reset edit state when modifyTable changes
  useEffect(() => {
    if (modifyTable) {
      setEditId(null);
      setEditData({});
    }
  }, [modifyTable]);

  const prevModifyTable = useRef(modifyTable);

  // Save changes to the backend when exiting edit mode (bulk edit)
  useEffect(() => {
    if (prevModifyTable.current && !modifyTable) {
      const changedRows = dashboard.filter((row) => {
        const orig = originalDashboard.find((o) => o.id === row.id);
        return (
          orig &&
          (row.tassel_color !== orig.tassel_color ||
            row.hood_color !== orig.hood_color ||
            row.toga_size !== orig.toga_size ||
            row.status !== orig.status)
        );
      });
      if (changedRows.length > 0) {
        Promise.all(
          changedRows.map(async (row) => {
            const orig = originalDashboard.find((o) => o.id === row.id) || {};
            const payload = {};
            if (row.tassel_color !== orig.tassel_color)
              payload.tassel_color = row.tassel_color;
            if (row.hood_color !== orig.hood_color)
              payload.hood_color = row.hood_color;
            if (row.toga_size !== orig.toga_size)
              payload.toga_size = row.toga_size;

            // PATCH status to accounts if changed
            let statusPromise = Promise.resolve();
            if (row.status !== orig.status && row.status !== undefined) {
              statusPromise = fetch(
                `http://localhost:5001/accounts/${row.account_id}`,
                {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ status: String(row.status) }),
                }
              ).then((res) => {
                if (!res.ok) throw new Error("Failed to update status");
              });
            }

            // PATCH other fields to inventory if changed
            let inventoryPromise = Promise.resolve();
            if (Object.keys(payload).length > 0) {
              inventoryPromise = fetch(
                `http://localhost:5001/inventory/${row.id}`,
                {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(payload),
                }
              ).then((res) => {
                if (!res.ok) throw new Error("Failed to update inventory");
                return res.json();
              });
            }

            await Promise.all([statusPromise, inventoryPromise]);
          })
        )
          .then(() => {
            showAlert("Changes saved!", "success");
            setOriginalDashboard(dashboard);
          })
          .catch((err) => {
            showAlert("Failed to save changes. " + err.message, "error");
          });
      }
    }
    prevModifyTable.current = modifyTable;
  }, [modifyTable, dashboard, originalDashboard]);

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
    setEditData({ ...db });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (id) => {
    // Save logic for single-row edit
    const orig = originalDashboard.find((o) => o.id === id) || {};
    // Only send changed fields
    const updatedData = {};
    if (editData.tassel_color !== orig.tassel_color)
      updatedData.tassel_color = editData.tassel_color;
    if (editData.hood_color !== orig.hood_color)
      updatedData.hood_color = editData.hood_color;
    if (editData.toga_size !== orig.toga_size)
      updatedData.toga_size = editData.toga_size;

    let statusPromise = Promise.resolve();
    if (editData.status !== orig.status && editData.status !== undefined) {
      statusPromise = fetch(
        `http://localhost:5001/accounts/${editData.account_id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: String(editData.status) }),
        }
      ).then((res) => {
        if (!res.ok) throw new Error("Failed to update status");
        return res.json();
      });
    }

    let inventoryPromise = Promise.resolve();
    if (Object.keys(updatedData).length > 0) {
      inventoryPromise = fetch(`http://localhost:5001/inventory/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify(updatedData),
      }).then((res) => {
        if (!res.ok) throw new Error("Failed to update inventory");
        return res.json();
      });
    }

    if (
      Object.keys(updatedData).length === 0 &&
      !(editData.status !== orig.status && editData.status !== undefined)
    ) {
      setEditId(null);
      setEditData({});
      showAlert("No changes to save.", "error");
      return;
    }

    try {
      await Promise.all([statusPromise, inventoryPromise]);
      setDashboard((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...editData } : item))
      );
      setOriginalDashboard((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...editData } : item))
      );
      setEditId(null);
      setEditData({});
      showAlert("Changes saved successfully!", "success");
    } catch (error) {
      showAlert(
        "Failed to save changes to the database: " + error.message,
        "error"
      );
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setEditData({});
  };

  const handleCellChange = (id, name, value) => {
    setDashboard((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [name]: value } : row))
    );
  };

  const handleDelete = (id) => {
    console.log("Delete button clicked for ID:", id);

    fetch(`http://localhost:5001/inventory/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => {
        console.log("Delete response status:", response.status);
        if (!response.ok) {
          throw new Error("Network response was not ok: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Delete successful:", data);

        // Remove the deleted item from both state arrays
        setDashboard((prev) => prev.filter((item) => item.id !== id));
        setOriginalDashboard((prev) => prev.filter((item) => item.id !== id));

        // Clear edit state if the deleted item was being edited
        if (editId === id) {
          setEditId(null);
          setEditData({});
        }

        showAlert("Item deleted successfully!", "success");
      })
      .catch((error) => {
        showAlert("Failed to delete the item: " + error.message, "error");
      });
  };

  // Approve handler: PATCH status to accounts and inventory
  const handleApprove = async (id) => {
    const row = dashboard.find((item) => item.id === id);
    if (!row || row.status !== "Pending") return;

    try {
      // Fetch items from the inventory endpoint
      const inventoryRes = await fetch(`http://localhost:5001/items`);
      if (!inventoryRes.ok) {
        throw new Error(`Failed to fetch inventory: ${inventoryRes.status}`);
      }

      const inventoryItems = await inventoryRes.json();

      // Convert tassel_color, hood_color, and toga_size to lowercase for case-insensitive matching
      const requiredItems = [
        { item_type: "tassel", variant: row.tassel_color?.toLowerCase() },
        { item_type: "hood", variant: row.hood_color?.toLowerCase() },
        { item_type: "gown", variant: row.toga_size?.toLowerCase() },
        { item_type: "cap", variant: null },
      ];

      console.log("Checking inventory for the following items:", requiredItems);

      for (const requiredItem of requiredItems) {
        const matchingItem = inventoryItems.find(
          (item) =>
            item.item_type === requiredItem.item_type &&
            (item.variant?.toLowerCase() || null) === requiredItem.variant &&
            item.item_status === "In Good Condition" &&
            item.return_status === "Returned"
        );

        console.log(
          `Available for ${requiredItem.item_type} (${requiredItem.variant || "N/A"
          }):`,
          matchingItem ? matchingItem.quantity : 0
        );

        if (!matchingItem || matchingItem.quantity <= 0) {
          showAlert(
            `Insufficient inventory for ${requiredItem.item_type} (${requiredItem.variant || "N/A"
            }).`,
            "error"
          );
          return;
        }
      }

      // Update the quantities for the items involved
      for (const requiredItem of requiredItems) {
        const returnedItem = inventoryItems.find(
          (item) =>
            item.item_type === requiredItem.item_type &&
            (item.variant?.toLowerCase() || null) === requiredItem.variant &&
            item.item_status === "In Good Condition" &&
            item.return_status === "Returned"
        );

        const notReturnedItem = inventoryItems.find(
          (item) =>
            item.item_type === requiredItem.item_type &&
            (item.variant?.toLowerCase() || null) === requiredItem.variant &&
            item.item_status === "In Good Condition" &&
            item.return_status === "Not Returned"
        );

        // Decrement the "Returned" quantity
        await fetch(`http://localhost:5001/items/${returnedItem.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: returnedItem.quantity - 1 }),
        });

        if (notReturnedItem) {
          // Increment the "Not Returned" quantity
          await fetch(`http://localhost:5001/items/${notReturnedItem.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: notReturnedItem.quantity + 1 }),
          });
        } else {
          // Create a new "Not Returned" entry if it doesn't exist
          await fetch(`http://localhost:5001/items`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              item_type: requiredItem.item_type,
              variant: requiredItem.variant,
              item_status: "In Good Condition",
              return_status: "Not Returned",
              quantity: 1,
            }),
          });
        }
      }

      // Approve the account
      const accountRes = await fetch(
        `http://localhost:5001/accounts/${row.account_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Approved" }),
        }
      );

      const accountResBody = await accountRes.text();
      if (!accountRes.ok) {
        console.error(
          "Account PATCH error:",
          accountRes.status,
          accountResBody
        );
        throw new Error(
          `Failed to update account status: ${accountRes.status} - ${accountResBody}`
        );
      }

      setDashboard((prev) =>
        prev.map((item) =>
          item.account_id === row.account_id
            ? { ...item, status: "Approved" }
            : item
        )
      );
      setOriginalDashboard((prev) =>
        prev.map((item) =>
          item.account_id === row.account_id
            ? { ...item, status: "Approved" }
            : item
        )
      );
      showAlert("Student status updated to Approved!", "success");
    } catch (error) {
      showAlert("Failed to update status: " + error.message, "error");
    }
  };

  // Extract unique dropdown options from allData (like Rows.jsx)
  const tasselColorOptions = Array.from(
    new Set((allData || []).map((item) => item.tassel_color).filter(Boolean))
  );
  const hoodColorOptions = Array.from(
    new Set((allData || []).map((item) => item.hood_color).filter(Boolean))
  );
  // Hardcoded gown size options XS to 3XL
  const togaSizeOptions = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

  const sortedDashboard =
    !isGrid && sortOrder
      ? [...dashboard].sort((a, b) => {
        if (sortOrder === "newest" || sortOrder === "oldest") {
          const dateA = new Date(a.dateofreservation);
          const dateB = new Date(b.dateofreservation);
          if (sortOrder === "newest") return dateB - dateA;
          if (sortOrder === "oldest") return dateA - dateB;
        } else if (sortOrder === "name-asc" || sortOrder === "name-desc") {
          const nameA = (a.studentname || "").toLowerCase();
          const nameB = (b.studentname || "").toLowerCase();
          if (nameA < nameB) return sortOrder === "name-asc" ? -1 : 1;
          if (nameA > nameB) return sortOrder === "name-asc" ? 1 : -1;
          return 0;
        }
        return 0;
      })
      : dashboard;

  useEffect(() => {
    if (!isGrid) {
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

  function handleEyeMouseEnter(event, dbId) {
    setHoveredEyeId(dbId);
  }

  const displayDashboard =
    Array.isArray(searchResults) && searchResults.length > 0
      ? searchResults
      : sortedDashboard;

  useEffect(() => {
    setFilterStatus(focusedStatus || "all");
  }, [focusedStatus]);

  if (isGrid) {
    return (
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
          className={`w-full max-h-[80vh] overflow-x-auto overflow-y-auto ${tableAnim}`}
          style={{ minWidth: "100px", maxWidth: "100vw", height: "auto" }}
        >
          <div className="min-w-[300px] max-w-[120vw] sticky overflow-visible top-0 z-1000 bg-red">
            <table className="w-full table-fixed border-separate border-spacing-0 relative">
              <PopupWindow
                open={popupOpen}
                onClose={(updatedData) => {
                  setPopupOpen(false);
                  if (updatedData) {
                    // Filter out entries without toga_size before mapping
                    const filteredData = updatedData.filter(
                      (item) =>
                        item.toga_size !== null && item.toga_size !== undefined
                    );

                    // Map the filtered data to match our component's format
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
                      status: item.status, // Using status instead of return_status here
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
              <thead className="bg-[#02327B] sticky top-0 z-30">
                <tr className="h-6 relative xs:h-8 sm:h-10 w-full md:h-12">
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
                      Date Requested
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
                {displayDashboard.filter((db) =>
                  filterStatus === "all"
                    ? true
                    : (db.status || "").toLowerCase() ===
                    filterStatus.toLowerCase()
                ).length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="text-center py-8 text-gray-500 font-semibold bg-white"
                    >
                      No data found
                    </td>
                  </tr>
                ) : (
                  displayDashboard
                    .filter((db) =>
                      filterStatus === "all"
                        ? true
                        : (db.status || "").toLowerCase() ===
                        filterStatus.toLowerCase()
                    )
                    .map((db, idx) => {
                      const rowColor = getRowColor(idx);
                      const isEditing = modifyTable || editId === db.id;
                      return (
                        <tr
                          className={`${rowHeightClass} w-[1417px] ${rowColor} text-xs font-normal table-columns`}
                          key={db.id}
                        >
                          <td className="text-center max-w-[180px] align-middle relative sm:max-w-[90px] sm:w-[90px] sm:text-[9px] md:max-w-[180px] md:w-[180px] md:text-xs">
                            <div className="h-full w-[100%] py-4 flex justify-center items-center">
                              <h3
                                className="truncate cursor-pointer"
                                title={db.studentname}
                              >
                                {db.studentname}
                              </h3>
                              <span className="absolute right-0 top-1/3 h-7 w-0.5 bg-gray-600 opacity-20 border-2"></span>
                            </div>
                          </td>
                          <td className="text-center max-w-[120px] w-[120px] align-middle relative sm:max-w-[60px] sm:w-[60px] sm:text-[9px] md:max-w-[120px] md:w-[120px] md:text-xs">
                            <div className="h-full w-full py-2 flex justify-center items-center">
                              <h5
                                className="truncate cursor-pointer"
                                title={db.course}
                              >
                                {db.course}
                              </h5>
                              <span className="absolute right-0 top-1/3 h-7 w-0.5 bg-gray-600 opacity-20 border-2"></span>
                            </div>
                          </td>
                          <td className="text-center max-w-[80px] w-[80px] align-middle relative sm:max-w-[40px] sm:w-[40px] sm:text-[9px] md:max-w-[80px] md:w-[80px] md:text-xs">
                            <div className="h-full w-full py-2 flex justify-center items-center relative">
                              <h3
                                className="truncate cursor-pointer"
                                title={db.tassel_color}
                              >
                                {db.tassel_color}
                              </h3>
                              <span className="absolute right-0 top-1/6 h-7 w-0.5 bg-gray-600 opacity-20 border-2"></span>
                            </div>
                          </td>
                          <td className="text-center max-w-[80px] w-[80px] align-middle relative sm:max-w-[40px] sm:w-[40px] sm:text-[9px] md:max-w-[80px] md:w-[80px] md:text-xs">
                            <div className="h-full w-full py-2 flex justify-center items-center relative">
                              <h3
                                className="truncate cursor-pointer"
                                title={db.hood_color}
                              >
                                {db.hood_color}
                              </h3>
                              <span className="absolute right-0 top-1/6 h-7 w-0.5 bg-gray-600 opacity-20 border-2"></span>
                            </div>
                          </td>
                          <td className="text-center max-w-[80px] w-[80px] align-middle relative sm:max-w-[40px] sm:w-[40px] sm:text-[9px] md:max-w-[80px] md:w-[80px] md:text-xs">
                            <div className="h-full w-full py-2 flex justify-center items-center relative">
                              <h3
                                className="truncate cursor-pointer"
                                title={db.toga_size}
                              >
                                {db.toga_size}
                              </h3>
                              <span className="absolute right-0 top-1/6 h-7 w-0.5 bg-gray-600 opacity-20 border-2"></span>
                            </div>
                          </td>
                          <td className="text-center max-w-[120px] w-[120px] align-middle relative sm:max-w-[60px] sm:w-[60px] sm:text-[9px] md:max-w-[120px] md:w-[120px] md:text-xs">
                            <div className="h-full w-full py-2 flex justify-center items-center">
                              <h3
                                className="truncate"
                                cursor-pointer
                                title={db.dateofreservation}
                              >
                                {db.dateofreservation}
                              </h3>
                              <span className="absolute right-0 top-1/3 h-7 w-0.5 bg-gray-600 opacity-20 border-2"></span>
                            </div>
                          </td>
                          <td className="w-[100px] align-middle relative sm:max-w-[50px] sm:w-[50px] sm:text-[9px] md:max-w-[100px] md:w-[100px] md:text-xs">
                            <div className="w-full flex justify-center items-center text-black text-xs font-semibold tracking-widest h-full">
                              {isEditing ? (
                                <div className="flex flex-col items-center w-full">
                                  <CustomDropdown
                                    value={
                                      modifyTable ? db.status : editData.status
                                    }
                                    options={[
                                      "Pending",
                                      "Approved",
                                      "Rejected",
                                    ]}
                                    onChange={(val) => {
                                      if (modifyTable) {
                                        handleCellChange(db.id, "status", val);
                                      } else {
                                        setEditData((prev) => ({
                                          ...prev,
                                          status: val,
                                        }));
                                      }
                                    }}
                                    disabled={false}
                                  />
                                  {/* Show Save/Cancel only in single-row edit (portal) mode */}
                                </div>
                              ) : db.status === "Pending" ? (
                                <button
                                  className="px-3 py-1 bg-emerald-700 text-white rounded hover:bg-blue-800 text-xs"
                                  onClick={() => handleApprove(db.id)}
                                >
                                  Approve
                                </button>
                              ) : (
                                <span
                                  className={
                                    db.status === "Approved"
                                      ? "text-green-600"
                                      : db.status === "Rejected"
                                        ? "text-red-600"
                                        : ""
                                  }
                                >
                                  {db.status}
                                </span>
                              )}
                            </div>
                            <span className="absolute right-0 top-1/3 h-7 w-0.5 bg-gray-600 opacity-20 border-2"></span>
                          </td>
                          <td className="text-center max-w-[100px] w-[100px] align-middle sm:max-w-[50px] sm:w-[50px] sm:text-[9px] md:max-w-[100px] md:w-[100px] md:text-xs">
                            <div className="h-full w-full py-2 flex justify-center items-center gap-2 relative">
                              {/* Eye/Trash Icon and Edit Button logic (copied from Rows.jsx) */}
                              {editId === db.id || modifyTable ? (
                                <>
                                  {/* Trash replaces Eye when editing or in modifyTable mode */}
                                  <button
                                    className="w-7 h-7 bg-[#C0392B] flex justify-center items-center rounded-md transition-transform duration-300 hover:scale-110 hover:bg-red-700"
                                    onClick={() => {
                                      if (
                                        window.confirm(
                                          `Are you sure you want to delete ${db.studentname}'s records?`
                                        )
                                      ) {
                                        handleDelete(db.id);
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
                                  {/* Single row edit save/cancel popup */}
                                  {editId === db.id && !modifyTable && (
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
                                        onClick={() => handleSave(db.id)}
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
                                        className="fixed left-9/12 top-1/2 z-50 w-80 h-fit rounded-xl opacity-200 transition-all duration-300 animate-fade-in pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 "
                                        onMouseEnter={(e) =>
                                          handleEyeMouseEnter(e, db.id)
                                        }
                                        onMouseLeave={() =>
                                          setHoveredEyeId(null)
                                        }
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
        </div>
      </>
    );
  }
};

export default PendingRow;

/**
 * CustomDropdown Component
 * Reusable dropdown component for editing table cell values
 * @param {Object} props - Component props
 * @param {string} props.value - Current selected value
 * @param {Array} props.options - Available options
 * @param {Function} props.onChange - Change handler
 * @param {boolean} props.disabled - Whether dropdown is disabled
 */
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
      className={`relative w-[80%] flex justify-center items-center ${disabled ? "pointer-events-none opacity-20" : ""
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

const getRowColor = (index) => {
  return index % 2 === 0 ? "bg-[#E9E9E9]" : "bg-[#D4D4D4]";
};
