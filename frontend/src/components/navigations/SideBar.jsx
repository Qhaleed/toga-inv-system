import React, { useState, useEffect } from "react";
import Profile from "../../assets/images/profilepicture.jpg";
import MenuIcon from "../../assets/icons/white-row.svg?react";
import { Calendar } from "@/components/ui/calendar";
import CalendarHeroIcon from "../../assets/icons/black-calendar.svg?react";
import InventorySidebarButtons from "../common/InventorySidebarButtons";

const SideBar = ({
  setSortOrder,
  activeTab,
  setIsAll,
  setIsEvaluationTab,
  setIsNotEvaluationTab,
  setIsAZ,
  setIsZA,
  userStatus,
  dateReserved,
  dateDue,
  focusedStatus, //setter kada click ng button
  setFocusedStatus, // hover effects to
  onAdminName, // adminname passere this
}) => {
  // Track screen size for responsive sidebar
  const [isLargeScreen, setIsLargeScreen] = useState(
    typeof window !== "undefined" && window.innerWidth >= 640
  );
  const [showSidebar, setShowSidebar] = useState(isLargeScreen);
  const [adminName, setAdminName] = useState("");
  const [adminRole, setAdminRole] = useState("");
  const [date, setDate] = useState(new Date());
  const [focusedStatusLocal, setFocusedStatusLocal] = useState("all");
  // Add state to track which sort button is focused
  const [focusedSort, setFocusedSort] = useState("name-asc");

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
          console.error("Sidebar /users fetch error:", errorMsg);
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.name && data.role) {
          setAdminName(data.name);
          setAdminRole(data.role);
          onAdminName && onAdminName(data.name);
        } else if (data) {
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

  // MGA HANDLER FOR SORTING
  const handleSortNameAsc = () => {
    setSortOrder && setSortOrder("name-asc");
    setFocusedSort("name-asc"); // Update focused sort state
  };

  const handleSortNameDesc = () => {
    setSortOrder && setSortOrder("name-desc");
    setFocusedSort("name-desc"); // Update focused sort state
  };

  const handleSortDateNewest = () => {
    setSortOrder && setSortOrder("newest");
    setFocusedSort("newest"); // Update focused sort state
  };

  const handleSortDateOldest = () => {
    setSortOrder && setSortOrder("oldest");
    setFocusedSort("oldest"); // Update focused sort state
  };

  // Update setFocusedStatusLocal when a sidebar button is clicked
  const All = () => {
    setFocusedStatus("all");
    setFocusedStatusLocal("all");
    setIsAll && setIsAll(true);
    setIsEvaluationTab && setIsEvaluationTab(false);
    setIsNotEvaluationTab && setIsNotEvaluationTab(false);
  };

  const EvaluatedFilter = () => {
    setFocusedStatus("evaluated");
    setFocusedStatusLocal("evaluated");
    setIsAll && setIsAll(false);
    setIsEvaluationTab && setIsEvaluationTab(true);
    setIsNotEvaluationTab && setIsNotEvaluationTab(false);
  };

  const NotEvaluatedFilter = () => {
    setFocusedStatus("noeval");
    setFocusedStatusLocal("noeval");
    setIsAll && setIsAll(false);
    setIsEvaluationTab && setIsEvaluationTab(false);
    setIsNotEvaluationTab && setIsNotEvaluationTab(true);
  };

  console.log(activeTab);

  return (
    <>
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
                <img
                  className="w-10 md:w-16 rounded-full max-w-full"
                  src={Profile}
                  alt="profile"
                  style={{ objectFit: "cover" }}
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
              <h4 className="text-white text-[13px] md:text-[13px] mt-1 ml-4 md:scale-100">
                ITEM STATUS
              </h4>
              {activeTab === "evaluation" ? (
                <div className="w-full h-[90px] md:scale-100">
                  <div className="w-full h-1/2 flex justify-between items-center ">
                    <button
                      className={`relative w-[43%] h-7 rounded-md ml-4 flex justify-between items-center bg-[#E0E7FF] ${
                        focusedStatusLocal === "all"
                          ? "ring-2 ring-[#f3ca91] scale-105"
                          : ""
                      } hover:scale-105 transform-all ease-out duration-300`}
                      onClick={All}
                    >
                      <p className="sm:text-[14px] text-[12px] md:text-[15px] font-figtree font-bold text-[#1E40AF] ml-3">
                        All
                      </p>
                      <div className="right-0 absolute sm:text-[10px] text-[11px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2  py-0.5 px-2">
                        123
                      </div>
                    </button>
                    <button
                      className={`relative w-[43%] h-7 rounded-md mr-4 flex justify-between items-center bg-[#DCFCE7] ${
                        focusedStatusLocal === "evaluated"
                          ? "ring-2 ring-[#2563eb] scale-105"
                          : ""
                      } hover:bg-blue-200 hover:scale-105 transform-all ease-out duration-300`}
                      onClick={EvaluatedFilter}
                    >
                      <p className="sm:text-[11px] text-[9px] md:text-[14px] font-figtree font-bold text-[#15803D] ml-3">
                        Evaluated
                      </p>
                      <div className="absolute right-0 sm:text-[10px] text-[12px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 py-0.5 px-2">
                        13
                      </div>
                    </button>
                  </div>
                  <div className="w-full h-1/2 flex justify-between items-center ">
                    <button
                      className={`relative w-[43%] h-7 rounded-md ml-4 flex justify-between items-center bg-[#FEE2E2] ${
                        focusedStatusLocal === "noeval"
                          ? "ring-2 ring-[#2563eb] scale-105"
                          : ""
                      } hover:bg-blue-200 transform-all ease-out duration-300 hover:scale-105`}
                      onClick={NotEvaluatedFilter}
                    >
                      <p className="sm:text-[12px] text-[13px] font-bold text-[#B91C1C] ml-3">
                        No Evaluation
                      </p>
                      <div className="absolute right-0 sm:text-[10px] text-[8px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 py-0.5 px-2">
                        19
                      </div>
                    </button>
                  </div>
                </div>
              ) : activeTab === "dashboard" ? (
                <div className="w-full  h-[90px] md:scale-100">
                  <div className="w-full h-1/2 gap-2 flex justify-between items-center ">
                    <button
                      className={`relative w-[43%] h-7 rounded-md ml-4 flex justify-between items-center bg-[#E0E7FF] ${
                        focusedStatusLocal === "all"
                          ? "ring-2 ring-[#2563eb] scale-105"
                          : ""
                      } hover:scale-105 transform-all ease-out duration-300`}
                      onClick={() => setFocusedStatus("all")}
                    >
                      <p className=":text-[14px] md:text-[12px] lg:text-[13px] font-figtree font-bold text-[#1E40AF] ml-3">
                        All
                      </p>
                      <div className="right-0 absolute lg:text-[12px] md:text-[10px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 px-2">
                        123
                      </div>
                    </button>
                    <button
                      className={`relative w-[43%] h-7 rounded-md md:mr-2 lg:mr-4 flex justify-between items-center bg-[#FEF9C3] ${
                        focusedStatusLocal === "borrowed"
                          ? "ring-2 ring-[#2563eb] scale-105"
                          : ""
                      } hover:bg-blue-200 hover:scale-105 transform-all ease-out duration-300`}
                      onClick={() => setFocusedStatus("borrowed")}
                    >
                      <p className="md:text-[10px] sm:text-[13px] lg:text-[13px] font-figtree font-bold text-[#B45309] ml-3">
                        Borrowed
                      </p>
                      <div className="absolute right-0 lg:text-[12px] md:text-[10px] bg-[#F3B51A] rounded-lg text-white mr-1 sm:mr-2 px-2">
                        45
                      </div>
                    </button>
                  </div>
                  <div className="w-full h-1/2 flex justify-between items-center ">
                    <button
                      className={`relative w-[43%] h-7 rounded-md ml-4 flex justify-between items-center bg-[#D1FAE5] ${
                        focusedStatusLocal === "returned"
                          ? "ring-2 ring-[#2563eb] scale-105"
                          : ""
                      } hover:bg-blue-200 transform-all ease-out duration-300 hover:scale-105`}
                      onClick={() => setFocusedStatus("returned")}
                    >
                      <p className="md:text-[10px] sm:text-[13px] lg:text-[13px] font-figtree font-bold text-[#B45309] ml-3">
                        Returned
                      </p>
                      <div className="absolute right-0 lg:text-[12px] md:text-[10px] bg-[#102F5E] rounded-lg text-white mr-1 sm:mr-2 px-2">
                        78
                      </div>
                    </button>
                  </div>
                </div>
              ) : activeTab === "inventory" ? (
                <InventorySidebarButtons
                  focusedStatus={focusedStatus}
                  setFocusedStatus={setFocusedStatus}
                />
              ) : activeTab === "pending" ? (
                <div className="w-full h-[100px] md:scale-100">
                  <div className="w-full h-1/2 flex justify-between items-center ">
                    <button
                      className={`relative w-[43%] h-7 rounded-md ml-4 flex justify-between items-center bg-[#E0E7FF] ${
                        focusedStatusLocal === "all"
                          ? "ring-2 ring-[#2563eb] scale-105"
                          : ""
                      } hover:scale-105 transform-all ease-out duration-300`}
                      onClick={() => setFocusedStatus("all")}
                    >
                      <p className="sm:text-[14px] xl:text-[13px] text-[10px] md:text-[13px] font-figtree font-bold text-[#1E40AF] ml-3">
                        All Requests
                      </p>
                      <div className="right-0 absolute 2xl:text-[11px] sm:text-[10px] md:text-[12px] text-[8px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 py-0.5 px-2">
                        50
                      </div>
                    </button>
                    <button
                      className={`relative w-[43%] h-7 rounded-md mr-4 flex justify-between items-center bg-[#D1FAE5] ${
                        focusedStatusLocal === "approved"
                          ? "ring-2 ring-[#2563eb] scale-105"
                          : ""
                      } hover:bg-blue-200 hover:scale-105 transform-all ease-out duration-300`}
                      onClick={() => setFocusedStatus("approved")}
                    >
                      <p className="sm:text-[14px] 2xl:text-[14px] text-[13px] md:text-[13px] font-figtree font-bold text-[#047857]  ml-3">
                        Approved
                      </p>
                      <div className="absolute right-0 2xl:text-[11px] sm:text-[10px] text-[8px] md:text-[12px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 py-0.5 px-2">
                        30
                      </div>
                    </button>
                  </div>
                  <div className="w-full h-1/2 flex justify-between items-center ">
                    <button
                      className={`relative w-[43%] h-7 rounded-md ml-4 flex justify-between items-center bg-[#FEF9C3] ${
                        focusedStatusLocal === "pending"
                          ? "ring-2 ring-[#2563eb] scale-105"
                          : ""
                      } hover:bg-blue-200 transform-all ease-out duration-300 hover:scale-105`}
                      onClick={() => setFocusedStatus("pending")}
                    >
                      <p className="sm:text-[14px] 2xl:text-[14px] text-[13px] md:text-[12px] font-bold text-[#B45309] ml-3">
                        Pending
                      </p>
                      <div className="absolute right-0 2xl:text-[11px] sm:text-[10px] text-[8px] md:text-[12px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 py-0.5 px-2">
                        15
                      </div>
                    </button>
                    <button
                      className={`relative w-[43%] h-7 rounded-md mr-4 flex justify-between items-center bg-[#FECACA] ${
                        focusedStatusLocal === "rejected"
                          ? "ring-2 ring-[#2563eb] scale-105"
                          : ""
                      } hover:bg-blue-200 transform-all ease-out duration-300 hover:scale-105`}
                      onClick={() => setFocusedStatus("rejected")}
                    >
                      <p className="sm:text-[14px] 2xl:text-[14px] text-[13px] md:text-[13px] font-figtree font-bold text-[#B91C1C] ml-3">
                        Rejected
                      </p>
                      <div className="absolute right-0 2xl:text-[11px] sm:text-[10px] text-[8px] md:text-[12px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 py-0.5 px-2">
                        5
                      </div>
                    </button>
                  </div>
                </div>
              ) : activeTab === "student-home" ? (
                <div className="w-full h-[90px] md:scale-100">
                  <div className="w-full h-1/2 flex justify-between items-center">
                    <div className="relative w-[43%] h-7 rounded-md ml-4 flex justify-between items-center bg-gray-200 cursor-default">
                      <p className="sm:text-[14px] text-[12px] font-bold text-black ml-3">
                        Status
                      </p>
                      <p className="absolute right-0 sm:text-[14px] text-[13px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 px-2">
                        {userStatus || "N/A"}
                      </p>
                    </div>
                    <div className="relative w-[43%] h-7 rounded-md mr-4 flex justify-between items-center bg-gray-200 cursor-default">
                      <p className="sm:text-[14px] text-[12px] font-bold text-black ml-3">
                        Reserved
                      </p>
                      <p className="absolute right-0 sm:text-[14px] text-[13px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 px-2">
                        {dateReserved || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="w-full h-1/2 flex justify-between items-center">
                    <div className="relative w-[43%] h-7 rounded-md ml-4 flex justify-between items-center bg-gray-200 cursor-default">
                      <p className="sm:text-[14px] text-[12px] font-bold text-black ml-3">
                        Due
                      </p>
                      <p className="absolute right-0 sm:text-[14px] text-[13px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 px-2">
                        {dateDue || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                // Dashboard buttons (default)
                <div className="w-full h-[90px] md:scale-100">
                  <div className="w-full h-1/2 flex justify-between items-center ">
                    <button
                      className={`relative w-[43%] h-7 rounded-md ml-4 flex justify-between items-center bg-[#E0E7FF] ${
                        focusedStatusLocal === "all"
                          ? "ring-2 ring-[#2563eb] scale-105"
                          : ""
                      } hover:scale-105 transform-all ease-out duration-300`}
                      onClick={() => setFocusedStatus("all")}
                    >
                      <p className="sm:text-[14px] text-[12px] md:text-[15px] font-figtree font-bold text-[#1E40AF] ml-3">
                        All
                      </p>
                      <div className="right-0 absolute sm:text-[14px] text-[13px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 px-2">
                        123
                      </div>
                    </button>
                    <button
                      className={`relative w-[43%] h-7 rounded-md mr-4 flex justify-between items-center bg-[#FEF9C3] ${
                        focusedStatusLocal === "evaluated"
                          ? "ring-2 ring-[#2563eb] scale-105"
                          : ""
                      } hover:bg-blue-200 hover:scale-105 transform-all ease-out duration-300`}
                      onClick={() => setFocusedStatus("evaluated")}
                    >
                      <p className="sm:text-[14px] text-[13px] md:text-[15px] font-figtree font-bold text-[#B45309] ml-3">
                        Evaluated
                      </p>
                      <div className="absolute right-0 sm:text-[14px] text-[13px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 px-2">
                        13
                      </div>
                    </button>
                  </div>
                  <div className="w-full h-1/2 flex justify-between items-center ">
                    <button
                      className={`relative w-[43%] h-7 rounded-md ml-4 flex justify-between items-center bg-[#FEE2E2] ${
                        focusedStatusLocal === "noeval"
                          ? "ring-2 ring-[#2563eb] scale-105"
                          : ""
                      } hover:bg-blue-200 transform-all ease-out duration-300 hover:scale-105`}
                      onClick={() => setFocusedStatus("noeval")}
                    >
                      <p className="sm:text-[12px] text-[13px] font-bold text-[#B91C1C] ml-3">
                        No Evaluation
                      </p>
                      <div className="absolute right-0 sm:text-[14px] text-[13px] md:sm:text-[14px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 px-2">
                        19
                      </div>
                    </button>
                  </div>
                </div>
              )}
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
                            handleSortNameAsc && handleSortNameAsc();
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
                            handleSortNameDesc && handleSortNameDesc();
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
                            handleSortDateNewest && handleSortDateNewest();
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
                            handleSortDateOldest && handleSortDateOldest();
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
            className="min-w-[80%] w-[90%] relative h-70 bg-[#102F5E] flex justify-center items-center rounded-xl mt-4 transition-opacity duration-500 ease-in-out opacity-100 animate-fade-in"
          >
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
