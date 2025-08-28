import React, { useState, useEffect } from "react";
// Remove the static profile import
import MenuIcon from "../../assets/icons/white-row.svg?react";
import { Calendar } from "@/components/ui/calendar";
import CalendarHeroIcon from "../../assets/icons/black-calendar.svg?react";
import InventorySidebarButtons from "../common/InventorySidebarButtons";
import PopupWindow from "../common/PopupWindow";
import AddStockPopup from "../common/AddStockPopup";
import RemoveStockPopup from "../common/RemoveStockPopup";
import BoxIcon from "../../assets/icons/box.svg";
import BlackTrashIcon from "../../assets/icons/black-trash.svg";
import AlertCard from "../common/AlertCard";

// Add InitialsAvatar component to display user initials
const InitialsAvatar = ({ name, className = "" }) => {
  // Get initials from the name (first letter of first and last name)
  const getInitials = (fullName) => {
    if (
      !fullName ||
      fullName === "Not logged in" ||
      fullName === "Fetch error" ||
      fullName === "No user found"
    ) {
      return "?";
    }

    const names = fullName.split(" ");
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  // Generate a consistent color based on the name
  const getColorClass = (name) => {
    if (
      !name ||
      name === "Not logged in" ||
      name === "Fetch error" ||
      name === "No user found"
    ) {
      return "bg-gray-500";
    }

    const colors = [
      "bg-blue-600",
      "bg-green-600",
      "bg-yellow-600",
      "bg-purple-600",
      "bg-pink-600",
      "bg-indigo-600",
      "bg-red-600",
      "bg-teal-600",
    ];

    // Simple hash function to get consistent color for the same name
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  };

  const initials = getInitials(name);
  const colorClass = getColorClass(name);

  return (
    <div
      className={`rounded-full flex items-center justify-center text-white font-bold ${colorClass} ${className}`}
      style={{ objectFit: "cover" }}
    >
      {initials}
    </div>
  );
};

const SideBar = ({
  setSortOrder,
  activeTab,
  setActiveTab, // <-- add this prop
  setIsAll,
  setIsReturnedTab, // add this
  setIsNotReturnedTab, // add this
  setIsEvaluationTab,
  setIsNotEvaluationTab,
  focusedStatus,
  setFocusedStatus,
  allCount = 0,
  evaluatedCount = 0,
  NotEvaluatedCount = 0,
  returnedCount = 0,
  notReturnedCount = 0,
  // Pending page specific props
  allRequestsCount = 0,
  approvedCount = 0,
  pendingCount = 0,
  rejectedCount = 0,
  userStatus,
  dateReserved,
  dateDue,
  onAdminName,
  refreshData, // auto refresher to kapag mag update stocks sa addstock and deletestock 
}) => {
  // Track screen size for responsive sidebar
  const [isLargeScreen, setIsLargeScreen] = useState(
    typeof window !== "undefined" && window.innerWidth >= 640
  );
  const [showSidebar, setShowSidebar] = useState(isLargeScreen);
  const [adminName, setAdminName] = useState("");
  const [adminRole, setAdminRole] = useState("");
  const [date, setDate] = useState(new Date());
  const [showAddStockPopup, setShowAddStockPopup] = useState(false);
  const [showRemoveStockPopup, setShowRemoveStockPopup] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "success" });

  const showAlert = (message, type = "success") => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert((a) => ({ ...a, show: false })), 3000);
  };

  useEffect(() => {
    function handleResize() {
      const large = window.innerWidth >= 640;
      setIsLargeScreen(large);
      if (large) setShowSidebar(true); // transition  mga big screens
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // FETCHER TO NG NAME AND ROLE SA BACKEND (JWT-protected)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAdminName("Not logged in");
      setAdminRole("N/A");
      onAdminName && onAdminName("Not logged in");
      return;
    }
    fetch("http://localhost:5001/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          // Try to parse error message from backend
          let errorMsg = `HTTP ${res.status}`;
          try {
            const errData = await res.json();
            errorMsg += errData.error ? `: ${errData.error}` : "";
          } catch {
            // Not JSON, ignore
          }
          setAdminName("Bug log in pero nasa inside ka parin");
          setAdminRole(errorMsg);
          onAdminName && onAdminName("Bug log in pero nasa inside ka parin");
          // Kailangan sya redirect so login page once mag expire yung session
          console.error("Sidebar /users fetch error:", errorMsg);
          return;
        }
        return res.json();
      })
      .then((data) => {
        // Prefer full name if available, otherwise fallback to first_name
        let displayName = "";
        if (data) {
          if (data.name) {
            displayName = data.name;
          } else if (data.first_name && data.surname) {
            displayName = `${data.first_name} ${data.surname}`;
          } else if (data.first_name) {
            displayName = data.first_name;
          }
        }
        if (displayName && data.role) {
          setAdminName(displayName);
          setAdminRole(data.role);
          onAdminName && onAdminName(displayName);
        } else {
          setAdminName("No user found");
          setAdminRole("N/A");
          onAdminName && onAdminName("No user found");
        }
      })
      .catch((err) => {
        setAdminName("Fetch error");
        setAdminRole("Network error");
        onAdminName && onAdminName("Fetch error");
        console.error("Sidebar /users fetch network error:", err);
      });
  }, []);
  // Responsivenesss show/hide sidebar on small screens, always show on large screens
  const visible = isLargeScreen ? true : showSidebar;

  // MGA HANDLER FOR SORTING (specifically for reservation tab)
  const handleSortNameAsc = () => {
    if (activeTab === "reservation" && setSortOrder) {
      setSortOrder("name-asc");
    }
  };

  const handleSortNameDesc = () => {
    if (activeTab === "reservation" && setSortOrder) {
      setSortOrder("name-desc");
    }
  };

  const handleSortDateNewest = () => {
    if (activeTab === "reservation" && setSortOrder) {
      setSortOrder("newest");
    }
  };

  const handleSortDateOldest = () => {
    if (activeTab === "reservation" && setSortOrder) {
      setSortOrder("oldest");
    }
  };

  // Update setFocusedStatusLocal when a sidebar button is clicked
  const All = () => {
    setFocusedStatus("all");
    setIsAll && setIsAll(true);
    setIsEvaluationTab && setIsEvaluationTab(false);
    setIsNotEvaluationTab && setIsNotEvaluationTab(false);
  };

  const EvaluatedFilter = () => {
    setFocusedStatus("evaluated");
    setIsAll && setIsAll(false);
    setIsEvaluationTab && setIsEvaluationTab(true);
    setIsNotEvaluationTab && setIsNotEvaluationTab(false);
  };

  const NotEvaluatedFilter = () => {
    setFocusedStatus("noeval");
    setIsAll && setIsAll(false);
    setIsEvaluationTab && setIsEvaluationTab(false);
    setIsNotEvaluationTab && setIsNotEvaluationTab(true);
  };

  // Reservation tab filters (Return Status)
  const [reservationTabFocus, setReservationTabFocus] = useState("all");

  // Sort state for reservation tab
  const [focusedSort, setFocusedSort] = useState("name-asc");

  const AllReturnStatus = () => {
    setReservationTabFocus("all");
    setIsAll && setIsAll(true);
    setIsReturnedTab && setIsReturnedTab(false);
    setIsNotReturnedTab && setIsNotReturnedTab(false);
  };
  const ReturnedFilter = () => {
    setReservationTabFocus("returned");
    setIsAll && setIsAll(false);
    setIsReturnedTab && setIsReturnedTab(true);
    setIsNotReturnedTab && setIsNotReturnedTab(false);
  };
  const NotReturnedFilter = () => {
    setReservationTabFocus("notreturned");
    setIsAll && setIsAll(false);
    setIsReturnedTab && setIsReturnedTab(false);
    setIsNotReturnedTab && setIsNotReturnedTab(true);
  };

  console.log(activeTab);

  return (
    <>
      <AlertCard
        message={alert.message}
        type={alert.type}
        show={alert.show}
        onClose={() => setAlert((a) => ({ ...a, show: false }))}
      />
      {visible && (
        <div
          // Always keep z-10 here so modals (z-[99999]) can overlay SideBar
          className={`sm:col-span-2 w-full sm:w-auto min-w-[220px] overflow-visible  h-full flex flex-col justify-start items-center bg-[#001C47] sm:static   transition-all ${
            showSidebar
              ? "animate-slide-in-top duration-800"
              : "animate-fade-in duration-800"
          }`}
        >
          {/* SIDE BAR HERO CONTAINER*/}
          <div
            key={activeTab + "-navbar"}
            className="w-full md:w-full h-20  md:h-24 bg-[#102F5E] bg-center flex justify-between overflow-x-hidden "
          >
            <div className="flex justify-center">
              <div className="h-full ml-1 w-16 flex justify-center items-center">
                {/* <img
                  className="w-10 md:w-16 rounded-full max-w-full"
                  src={Profile}
                  alt="profile"
                  style={{ objectFit: "cover" }}
                /> */}
                <InitialsAvatar
                  name={adminName}
                  className="w-10 h-10 md:w-16 md:h-16"
                />
              </div>
              <div className="h-full ml-3 flex flex-col justify-center items-start text-white">
                <p
                  className={`font-figtree font-bold max-w-[100px] md:max-w-[140px] leading-tight  
                    ${
                      adminName.length > 24
                        ? "text-[11px] md:text-[14px]"
                        : adminName.length > 16
                        ? "text-[13px] md:text-[16px]"
                        : "text-[15px] md:text-[18px]"
                    }
                  `}
                  style={{
                    fontSize:
                      window.innerWidth < 640
                        ? adminName.length > 24
                          ? "10px"
                          : adminName.length > 16
                          ? "12px"
                          : "14px"
                        : "",
                  }}
                  title={adminName}
                >
                  {adminName}
                </p>

                <p
                  className={`font-manjari max-w-[100px] md:max-w-[140px] leading-tight truncate md:whitespace-normal
                    ${
                      adminRole.length > 24
                        ? "text-[10px] md:text-[12px]"
                        : adminRole.length > 16
                        ? "text-[12px] md:text-[14px]"
                        : "text-[13px] md:text-[15px]"
                    }
                  `}
                  style={{
                    fontSize:
                      window.innerWidth < 640
                        ? adminRole.length > 24
                          ? "9px"
                          : adminRole.length > 16
                          ? "11px"
                          : "13px"
                        : "",
                  }}
                  title={adminRole}
                >
                  {adminRole.charAt(0).toUpperCase() +
                    adminRole.slice(1).toLowerCase()}
                </p>
              </div>
            </div>

            <div className="h-full flex justify-end items-center mr-4">
              <button className="bg-[#F3B51A] hover:bg-[#dc9f2d] scale-75 md:scale-100 hover:scale-105 h-12 w-12 rounded-full flex justify-center items-center border border-gray-700 transform-all ease-out duration-500">
                <CalendarHeroIcon className="w-6" />
                <div className="relative">
                  <div className="bg-[#0C7E48] rounded-full text-white text-xs absolute px-1 bottom-2">
                    4 {/* Notification counts logic adnkjasndkjasndkajsnd */}
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* SIDE BAR HERO CONTAINER END okay?*/}
          {/*TOGA TRACK */}
          <div
            key={activeTab + "-toga-track"}
            className="hidden shrink-0 sm:flex w-full mt-5 rounded-md h-16 bg-gradient-to-t from-[#224273] to-blue-950 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.10)] items-center justify-center transition-opacity duration-500 ease-in-out opacity-100 "
          >
            <div className="w-fit  h-fit flex justify-center items-center">
              <span
                className="md:text-3xl lg:text-4xl font-extrabold font-Figtree tracking-widest bg-gradient-to-r from-[#224273] via-[#537fa5] to-[#b6c2e0] bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(150deg, rgba(34,66,115,1) -50%, rgba(83,127,165,1) 60%, rgba(182,194,224,1) 100%)",
                }}
              >
                TogaTrack ®
              </span>
            </div>
          </div>

          {/* SIDE BAR NAVIGATION CONTAINER*/}
          <div
            key={activeTab}
            className="min-w-full md:w-11/12 md:scale-100 md:min-w-48 md:h-fit py-6 bg-[#102F5E] flex items-center rounded-xl md:mt-5 transition-opacity duration-500 ease-in-out opacity-100 animate-fade-in"
          >
            <div className="relative w-full flex flex-col justify-between md:w-full">
              {activeTab !== "student-home" && (
                <h4 className="text-white text-[13px] md:text-[13px] mt-1 ml-4 md:scale-100">
                  {activeTab === "dashboard" ? "ACTIONS" : "ITEM STATUS"}
                </h4>
              )}
              {activeTab === "evaluation" ? (
                <div className="w-full h-[90px] md:scale-100">
                  <div className="w-full h-1/2 flex justify-between items-center ">
                    <button
                      className={`relative w-[43%] h-7 rounded-md ml-4 flex justify-between items-center bg-[#E0E7FF] ${
                        focusedStatus === "all"
                          ? "ring-2 ring-[#f3ca91] scale-105"
                          : ""
                      } hover:scale-105 transform-all ease-out duration-300`}
                      onClick={All}
                    >
                      <p className="sm:text-[14px] text-[12px] md:text-[15px] font-figtree font-bold text-[#1E40AF] ml-3">
                        All
                      </p>
                      <div className="right-0 absolute sm:text-[10px] text-[11px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2  py-0.5 px-2">
                        {allCount}
                      </div>
                    </button>
                    <button
                      className={`relative w-[43%] h-7 rounded-md mr-4 flex justify-between items-center bg-[#DCFCE7] ${
                        focusedStatus === "evaluated"
                          ? "ring-2 ring-[#2563eb] scale-105"
                          : ""
                      } hover:bg-blue-200 hover:scale-105 transform-all ease-out duration-300`}
                      onClick={EvaluatedFilter}
                    >
                      <p className="sm:text-[11px] text-[9px] md:text-[14px] font-figtree font-bold text-[#15803D] ml-3">
                        Evaluated
                      </p>
                      <div className="absolute right-0 sm:text-[10px] text-[12px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 py-0.5 px-2">
                        {evaluatedCount}
                      </div>
                    </button>
                  </div>
                  <div className="w-full h-1/2 flex justify-between items-center ">
                    <button
                      className={`relative w-[43%] h-7 rounded-md ml-4 flex justify-between items-center bg-[#FEE2E2] ${
                        focusedStatus === "noeval"
                          ? "ring-2 ring-[#2563eb] scale-105"
                          : ""
                      } hover:bg-blue-200 transform-all ease-out duration-300 hover:scale-105`}
                      onClick={NotEvaluatedFilter}
                    >
                      <p className="sm:text-[12px] text-[13px] font-bold text-[#B91C1C] ml-3">
                        No Evaluation
                      </p>
                      <div className="absolute right-0 sm:text-[10px] text-[8px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 py-0.5 px-2">
                        {NotEvaluatedCount}
                      </div>
                    </button>
                  </div>
                </div>
              ) : activeTab === "dashboard" ? (
                <>
                  <div className="w-full flex flex-col items-center gap-4 py-4">
                    <button
                      className="w-4/5 flex items-center gap-3 px-4 py-1 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 shadow-md hover:from-blue-700 hover:to-blue-600 focus:ring-2 focus:ring-blue-300 text-white font-semibold text-base transition-all duration-200 group"
                      onClick={() => setShowAddStockPopup(true)}
                    >
                      <img
                        src={BoxIcon}
                        alt="Add Stocks"
                        className="w-5 h-5 drop-shadow group-hover:scale-110 transition-transform"
                      />
                      <span className="flex-1 text-left">Add Stocks</span>
                    </button>
                    <button
                      className="w-4/5 flex items-center gap-3 px-4 py-1 rounded-xl bg-gradient-to-r from-red-600 to-red-500 shadow-md hover:from-red-700 hover:to-red-600 focus:ring-2 focus:ring-red-300 text-white font-semibold text-base transition-all duration-200 group"
                      onClick={() => setShowRemoveStockPopup(true)}
                    >
                      <img
                        src={BlackTrashIcon}
                        alt="Remove Stocks"
                        className="w-5 h-5 drop-shadow group-hover:scale-110 transition-transform"
                      />
                      <span className="flex-1 text-left">Remove Stocks</span>
                    </button>
                  </div>
                </>
              ) : activeTab === "inventory" ? (
                <InventorySidebarButtons
                  focusedStatus={focusedStatus}
                  setFocusedStatus={setFocusedStatus}
                  setActiveTab={setActiveTab}
                />
              ) : activeTab === "pending" ? (
                <div className="w-full h-[100px] md:scale-100">
                  <div className="w-full h-1/2 flex justify-between items-center ">
                    <button
                      className={`relative w-[43%] h-7 rounded-md ml-4 flex justify-between items-center bg-[#E0E7FF] ${
                        focusedStatus === "all"
                          ? "ring-2 ring-[#2563eb] scale-105"
                          : ""
                      } hover:scale-105 transform-all ease-out duration-300`}
                      onClick={() => setFocusedStatus("all")}
                    >
                      <p className="sm:text-[14px] xl:text-[13px] text-[10px] md:text-[13px] font-figtree font-bold text-[#1E40AF] ml-3">
                        All Requests
                      </p>
                      <div className="right-0 absolute 2xl:text-[11px] sm:text-[10px] md:text-[12px] text-[8px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 py-0.5 px-2">
                        {allRequestsCount}
                      </div>
                    </button>
                    <button
                      className={`relative w-[43%] h-7 rounded-md mr-4 flex justify-between items-center bg-[#D1FAE5] ${
                        focusedStatus === "approved"
                          ? "ring-2 ring-[#2563eb] scale-105"
                          : ""
                      } hover:bg-blue-200 hover:scale-105 transform-all ease-out duration-300`}
                      onClick={() => setFocusedStatus("approved")}
                    >
                      <p className="sm:text-[14px] 2xl:text-[14px] text-[13px] md:text-[13px] font-figtree font-bold text-[#047857]  ml-3">
                        Approved
                      </p>
                      <div className="absolute right-0 2xl:text-[11px] sm:text-[10px] text-[8px] md:text-[12px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 py-0.5 px-2">
                        {approvedCount}
                      </div>
                    </button>
                  </div>
                  <div className="w-full h-1/2 flex justify-between items-center ">
                    <button
                      className={`relative w-[43%] h-7 rounded-md ml-4 flex justify-between items-center bg-[#FEF9C3] ${
                        focusedStatus === "pending"
                          ? "ring-2 ring-[#2563eb] scale-105"
                          : ""
                      } hover:bg-blue-200 transform-all ease-out duration-300 hover:scale-105`}
                      onClick={() => setFocusedStatus("pending")}
                    >
                      <p className="sm:text-[14px] 2xl:text-[14px] text-[13px] md:text-[12px] font-bold text-[#B45309] ml-3">
                        Pending
                      </p>
                      <div className="absolute right-0 2xl:text-[11px] sm:text-[10px] text-[8px] md:text-[12px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 py-0.5 px-2">
                        {pendingCount}
                      </div>
                    </button>
                    <button
                      className={`relative w-[43%] h-7 rounded-md mr-4 flex justify-between items-center bg-[#FECACA] ${
                        focusedStatus === "rejected"
                          ? "ring-2 ring-[#2563eb] scale-105"
                          : ""
                      } hover:bg-blue-200 transform-all ease-out duration-300 hover:scale-105`}
                      onClick={() => setFocusedStatus("rejected")}
                    >
                      <p className="sm:text-[14px] 2xl:text-[14px] text-[13px] md:text-[13px] font-figtree font-bold text-[#B91C1C] ml-3">
                        Rejected
                      </p>
                      <div className="absolute right-0 2xl:text-[11px] sm:text-[10px] text-[8px] md:text-[12px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 py-0.5 px-2">
                        {rejectedCount}
                      </div>
                    </button>
                  </div>
                </div>
              ) : activeTab === "student-home" ? (
                <div className="w-full max-w-sm bg-[#0C2A66] text-white p-4 rounded-lg shadow-md space-y-4">
                  <div>
                    <p className="text-sm font-semibold">CURRENT STATUS</p>
                    <div className="mt-1 bg-white text-black rounded-md px-3 py-2 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 rounded-full bg-[#F4C430]"></span>
                        <span className="text-sm">
                          {userStatus || "Pending Approval"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold">DATE APPROVED</p>
                    <div className="mt-1 bg-white text-black rounded-md px-3 py-2 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 rounded-full bg-[#F4C430]"></span>
                        <span className="text-sm">{dateReserved || "N/A"}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold">DATE DUE</p>
                    <div className="mt-1 bg-white text-black rounded-md px-3 py-2 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 rounded-full bg-[#F4C430]"></span>
                        <span className="text-sm">
                          {dateDue || "May 2, 2026"}
                        </span>
                      </div>
                      {/* Notification bell icon (you can use Heroicons or Lucide) */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ) : activeTab === "reservation" ? (
                <div className="w-full h-[90px] md:scale-100">
                  <div className="w-full h-1/2 flex justify-between items-center ">
                    <button
                      className={`relative w-[43%] h-7 rounded-md ml-4 flex justify-between items-center bg-[#E0E7FF] ${
                        reservationTabFocus === "all"
                          ? "ring-2 ring-[#f3ca91] scale-105"
                          : ""
                      } hover:scale-105 transform-all ease-out duration-300`}
                      onClick={AllReturnStatus}
                    >
                      <p className="sm:text-[14px] text-[12px] md:text-[15px] font-figtree font-bold text-[#1E40AF] ml-3">
                        All
                      </p>
                      <div className="right-0 absolute sm:text-[10px] text-[11px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2  py-0.5 px-2">
                        {allCount}
                      </div>
                    </button>
                    <button
                      className={`relative w-[43%] h-7 rounded-md mr-4 flex justify-between items-center bg-[#DCFCE7] ${
                        reservationTabFocus === "returned"
                          ? "ring-2 ring-[#2563eb] scale-105"
                          : ""
                      } hover:bg-blue-200 hover:scale-105 transform-all ease-out duration-300`}
                      onClick={ReturnedFilter}
                    >
                      <p className="sm:text-[11px] text-[9px] md:text-[14px] font-figtree font-bold text-[#15803D] ml-3">
                        Returned
                      </p>
                      <div className="absolute right-0 sm:text-[10px] text-[12px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 py-0.5 px-2">
                        {returnedCount}
                      </div>
                    </button>
                  </div>
                  <div className="w-full h-1/2 flex justify-between items-center ">
                    <button
                      className={`relative w-[43%] h-7 rounded-md ml-4 flex justify-between items-center bg-[#FEE2E2] ${
                        reservationTabFocus === "notreturned"
                          ? "ring-2 ring-[#2563eb] scale-105"
                          : ""
                      } hover:bg-blue-200 transform-all ease-out duration-300 hover:scale-105`}
                      onClick={NotReturnedFilter}
                    >
                      <p className="sm:text-[12px] text-[13px] font-bold text-[#B91C1C] ml-3">
                        Not Returned
                      </p>
                      <div className="absolute right-0 sm:text-[10px] text-[8px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 py-0.5 px-2">
                        {notReturnedCount}
                      </div>
                    </button>
                  </div>
                </div>
              ) : null}
              {/* REMOVE SORT BY BUTTONS FOR INVENTORY TAB */}
              {activeTab !== "student-home" && activeTab !== "inventory" ? (
                activeTab === "reservation" ? (
                  <>
                    <h4 className="text-white text-xs mt-1 ml-4 md:scale-100">
                      SORT BY
                    </h4>
                    <div className={`w-full h-[90px] md:scale-100`}>
                      <div className="w-full h-1/2 flex justify-between items-center">
                        <button
                          className={`relative w-[43%] h-7 rounded-md ml-4 flex justify-between items-center bg-gray-200 ${
                            focusedSort === "name-asc"
                              ? "ring-2 ring-[#2563eb] scale-105"
                              : ""
                          } hover:scale-105 transform-all ease-out duration-300`}
                          onClick={() => {
                            setFocusedSort("name-asc");
                            handleSortNameAsc();
                          }}
                        >
                          <p className="sm:text-[14px] text-[12px] font-bold text-black ml-3">
                            Name (A-Z)
                          </p>
                        </button>
                        <button
                          className={`relative w-[43%] h-7 rounded-md mr-4 flex justify-between items-center bg-gray-200 ${
                            focusedSort === "name-desc"
                              ? "ring-2 ring-[#2563eb] scale-105"
                              : ""
                          } hover:scale-105 transform-all ease-out duration-300`}
                          onClick={() => {
                            setFocusedSort("name-desc");
                            handleSortNameDesc();
                          }}
                        >
                          <p className="sm:text-[14px] text-[12px] font-bold text-black ml-3">
                            Name (Z-A)
                          </p>
                        </button>
                      </div>
                      <div className="w-full h-1/2 flex justify-between items-center">
                        <button
                          className={`relative w-[43%] h-7 rounded-md ml-4 flex justify-between items-center bg-gray-200 ${
                            focusedSort === "newest"
                              ? "ring-2 ring-[#2563eb] scale-105"
                              : ""
                          } hover:scale-105 transform-all ease-out duration-300`}
                          onClick={() => {
                            setFocusedSort("newest");
                            handleSortDateNewest();
                          }}
                        >
                          <p className="sm:text-[14px] text-[12px] font-bold text-black ml-3">
                            Date (Newest)
                          </p>
                        </button>
                        <button
                          className={`relative w-[43%] h-7 rounded-md mr-4 flex justify-between items-center bg-gray-200 ${
                            focusedSort === "oldest"
                              ? "ring-2 ring-[#2563eb] scale-105"
                              : ""
                          } hover:scale-105 transform-all ease-out duration-300`}
                          onClick={() => {
                            setFocusedSort("oldest");
                            handleSortDateOldest();
                          }}
                        >
                          <p className="sm:text-[14px] text-[12px] font-bold text-black ml-3">
                            Date (Oldest)
                          </p>
                        </button>
                      </div>
                    </div>
                  </>
                ) : null
              ) : null}
            </div>
          </div>
          {/* SIDE BAR NAVIGATION CONTAINER EN okay?*/}

          {/* CALENDAR */}
          <div
            key={activeTab + "-calendar"}
            className="min-w-[80%] w-[90%]  h-fit bg-[#102F5E] flex justify-center items-center rounded-xl mt-4 transition-opacity duration-500 ease-in-out opacity-100 animate-fade-in"
          >
            <Calendar mode="single" selected={date} onSelect={setDate} />
            <AddStockPopup
              open={showAddStockPopup}
              onClose={() => setShowAddStockPopup(false)}
              onSubmit={async (data) => {
                // API call to add stock to items endpoint
                try {
                  console.log(data);
                  const response = await fetch("http://localhost:5001/items", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                  });
                  if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Failed to add stock");
                  }
                  const result = await response.json();
                  console.log(result);
                  showAlert("Stock added successfully!", "success");
                  // Refresh data to update dashboard
                  if (refreshData) refreshData();
                } catch (err) {
                  showAlert("Error adding stock: " + err.message, "error");
                }
              }}
            />
            <RemoveStockPopup
              open={showRemoveStockPopup}
              onClose={() => setShowRemoveStockPopup(false)}
              onSubmit={async (data) => {
                // API call to remove stock
                try {
                  const response = await fetch(
                    "http://localhost:5001/items/remove",
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(data),
                    }
                  );
                  if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Failed to remove stock");
                  }
                  const result = await response.json();
                  console.log(result);
                  showAlert("Stock removed successfully!", "success");
                  // Refresh data to update dashboard
                  if (refreshData) refreshData();
                } catch (err) {
                  showAlert("Error removing stock: " + err.message, "error");
                }
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
