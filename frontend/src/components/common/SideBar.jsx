import React, { useState, useEffect } from "react";
import Profile from "../../assets/images/profilepicture.jpg";
import MenuIcon from "../../assets/icons/white-row.svg?react";
import { Calendar } from "@/components/ui/calendar";
import CalendarHeroIcon from "../../assets/icons/black-calendar.svg?react";
const SideBar = ({ setSortOrder, activeTab }) => {
  // Track screen size for responsive sidebar
  const [isLargeScreen, setIsLargeScreen] = useState(
    typeof window !== "undefined" && window.innerWidth >= 640
  );
  const [showSidebar, setShowSidebar] = useState(isLargeScreen);
  const [adminName, setAdminName] = useState("");
  const [adminRole, setAdminRole] = useState("");
  const [date, setDate] = useState(new Date());
  const [focusedStatus, setFocusedStatus] = useState("all");
  // Add state to track which sort button is focused
  const [focusedSort, setFocusedSort] = useState("name-asc");

  useEffect(() => {
    function handleResize() {
      const large = window.innerWidth >= 640;
      setIsLargeScreen(large);
      if (large) setShowSidebar(true); // transition for mga big screens
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // FETCHER TO NG NAME AND ROLE SA JSON SERVER
  useEffect(() => {
    fetch("http://localhost:8000/admins")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAdminName(data[0].adminname);
          setAdminRole(data[0].adminrole);
        } else {
          setAdminName("No admin found");
          setAdminRole("N/A");
        }
      })
      .catch(() => {
        setAdminName("Fetch error");
        setAdminRole("Fetch error");
      });
  }, []);
  // Responsivenesss show/hide sidebar on small screens, always show on large
  const visible = isLargeScreen ? true : showSidebar;

  // MGA HANDLER FOR SORTING
  const handleSortNameAsc = () => setSortOrder && setSortOrder("name-asc");
  const handleSortNameDesc = () => setSortOrder && setSortOrder("name-desc");
  const handleSortDateNewest = () => setSortOrder && setSortOrder("newest");
  const handleSortDateOldest = () => setSortOrder && setSortOrder("oldest");

  console.log(activeTab);

  return (
    <>
      {/* Optional to for small screen */}
      <div className="sm:hidden w-full flex justify-start items-center bg-[#001C47] p-1">
        <button
          className="p-1 rounded-full fill-white hover:scale-105 transform-all ease-out duration-300"
          onClick={() => setShowSidebar((prev) => !prev)}
        >
          <div className="flex justify-center items-center">
            <MenuIcon
              className={`w-7 h-7 transition-colors duration-300 ${
                showSidebar
                  ? "text-color-[#000] fill-[#000]"
                  : "text-[#000] fill-[#000]"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Sidebar idea ->> above navbar on small screens, left on large screens */}
      {visible && (
        <div
          className={`sm:col-span-2 w-full sm:w-auto overflow-hidden whitespace-nowrap h-full flex flex-col justify-start items-center bg-[#001C47] sm:static fixed top-0 left-0 z-30 sm:z-auto transition-all ${
            showSidebar
              ? "animate-slide-in-top duration-800"
              : "animate-fade-in duration-800"
          }`}
          style={{
            position: "static",
            height: isLargeScreen ? "100vh" : "88%",
            transition: "transform ",
            animation: showSidebar ? "slide-in-top 2s" : "fade-in 0.8s",
            maxWidth: "100%", // Prevent overflow
            overflow: "hidden", // Prevent child overflow
          }}
        >
          {/* SIDE BAR HERO CONTAINER*/}
          <div className="w-full md:w-full h-20 md:h-24 bg-[#102F5E] bg-center flex justify-between overflow-hidden rounded-t-xl">
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
                <p className="text-[16px] md:font-bold truncate max-w-[100px] md:max-w-[140px]">
                  {adminName}
                </p>
                <p className="sm:text-[14px] text-[13px] md:text-xs font-light truncate max-w-[100px] md:max-w-[140px]">
                  {adminRole}
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

          {/* SIDE BAR HERO CONTAINER EN okay?*/}
          <div class=" hidden sm:flex w-full h-16 bg-gradient-to-l from-cyan-900 to-blue-950  shadow-[0px_1px_2px_0px_rgba(0,0,0,0.30)]">
            {/* toga design */}
          </div>

          {/* SIDE BAR NAVIGATION CONTAINER*/}

          <div className=" min-w-full md:w-11/12  md:scale-100 scale-90 sm:min-w-24 md:min-w-48 md:h-60 bg-[#102F5E] flex items-center rounded-xl md:mt-7">
            <div className="relative w-full flex flex-col justify-between md:w-full">
              <h4 className="text-white text-[13px] md:text-[13px] mt-1 ml-4 md:scale-100">
                ITEM STATUS
              </h4>
              {activeTab === "evaluation" ? (
                <div className="w-full h-[90px] md:scale-100">
                  <div className="w-full h-1/2 flex justify-between items-center ">
                    <button
                      className={`relative w-[43%] h-7 rounded-md ml-4 flex justify-between items-center bg-[#E0E7FF] ${
                        focusedStatus === "all"
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
                      className={`relative w-[43%] h-7 rounded-md mr-4 flex justify-between items-center bg-[#DCFCE7] ${
                        focusedStatus === "evaluated"
                          ? "ring-2 ring-[#2563eb] scale-105"
                          : ""
                      } hover:bg-blue-200 hover:scale-105 transform-all ease-out duration-300`}
                      onClick={() => setFocusedStatus("evaluated")}
                    >
                      <p className="sm:text-[14px] text-[13px] md:text-[15px] font-figtree font-bold text-[#15803D] ml-3">
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
                        focusedStatus === "noeval"
                          ? "ring-2 ring-[#2563eb] scale-105"
                          : ""
                      } hover:bg-blue-200 transform-all ease-out duration-300 hover:scale-105`}
                      onClick={() => setFocusedStatus("noeval")}
                    >
                      <p className="sm:text-[14px] text-[13px] font-bold text-[#B91C1C] ml-3">
                        No Evaluation
                      </p>
                      <div className="absolute right-0 sm:text-[14px] text-[13px] md:sm:text-[14px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 px-2">
                        19
                      </div>
                    </button>
                  </div>
                </div>
              ) : activeTab === "dashboard" ? (
                <div className="w-full h-[90px] md:scale-100">
                  <div className="w-full h-1/2 flex justify-between items-center ">
                    <button
                      className={`relative w-[43%] h-7 rounded-md ml-4 flex justify-between items-center bg-[#E0E7FF] ${
                        focusedStatus === "all"
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
                        focusedStatus === "borrowed"
                          ? "ring-2 ring-[#2563eb] scale-105"
                          : ""
                      } hover:bg-blue-200 hover:scale-105 transform-all ease-out duration-300`}
                      onClick={() => setFocusedStatus("borrowed")}
                    >
                      <p className="sm:text-[14px] text-[13px] md:text-[15px] font-figtree font-bold text-[#B45309] ml-3">
                        Borrowed
                      </p>
                      <div className="absolute right-0 sm:text-[14px] text-[13px] bg-[#F3B51A] rounded-lg text-white mr-1 sm:mr-2 px-2">
                        45
                      </div>
                    </button>
                  </div>
                  <div className="w-full h-1/2 flex justify-between items-center ">
                    <button
                      className={`relative w-[43%] h-7 rounded-md ml-4 flex justify-between items-center bg-[#D1FAE5] ${
                        focusedStatus === "returned"
                          ? "ring-2 ring-[#2563eb] scale-105"
                          : ""
                      } hover:bg-blue-200 transform-all ease-out duration-300 hover:scale-105`}
                      onClick={() => setFocusedStatus("returned")}
                    >
                      <p className="sm:text-[14px] text-[13px] font-bold text-[#047857] ml-3">
                        Returned
                      </p>
                      <div className="absolute right-0 sm:text-[14px] text-[13px] md:sm:text-[14px] bg-[#102F5E] rounded-lg text-white mr-1 sm:mr-2 px-2">
                        78
                      </div>
                    </button>
                  </div>
                </div>
              ) : activeTab === "inventory" ? (
                <div className="w-full h-[90px] md:scale-100">
                  <div className="w-full h-1/2 flex justify-between items-center ">
                    <button
                      className={`relative w-[43%] h-7 rounded-md ml-4 flex justify-between items-center bg-[#E0E7FF] ${
                        focusedStatus === "all"
                          ? "ring-2 ring-[#2563eb] scale-105"
                          : ""
                      } hover:scale-105 transform-all ease-out duration-300`}
                      onClick={() => setFocusedStatus("all")}
                    >
                      <p className="sm:text-[14px] 2xl:text-[15px] text-[10px] md:text-[13px] font-figtree font-bold text-[#1E40AF] ml-3">
                        All Items
                      </p>
                      <div className="right-0 absolute 2xl:text-[15px] sm:text-[10px] md:text-[12px] text-[8px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 px-2">
                        200
                      </div>
                    </button>
                    <button
                      className={`relative w-[43%] h-7 rounded-md mr-4 flex justify-between items-center bg-[#FECACA] ${
                        focusedStatus === "lowstock"
                          ? "ring-2 ring-[#2563eb] scale-105"
                          : ""
                      } hover:bg-blue-200 hover:scale-105 transform-all ease-out duration-300`}
                      onClick={() => setFocusedStatus("lowstock")}
                    >
                      <p className="sm:text-[14px] 2xl:text-[15px] text-[13px] md:text-[13px] font-figtree font-bold text-[#B91C1C] ml-3">
                        Low Stock
                      </p>
                      <div className="absolute right-0 2xl:text-[15px] sm:text-[10px] text-[13px] md:sm:text-[12px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 px-2">
                        8
                      </div>
                    </button>
                  </div>
                  <div className="w-full h-1/2 flex justify-between items-center ">
                    <button
                      className={`relative w-[43%] h-7 rounded-md ml-4 flex justify-between items-center bg-[#FDE68A] ${
                        focusedStatus === "checkedout"
                          ? "ring-2 ring-[#2563eb] scale-105"
                          : ""
                      } hover:bg-blue-200 transform-all ease-out duration-300 hover:scale-105`}
                      onClick={() => setFocusedStatus("checkedout")}
                    >
                      <p className="sm:text-[14px] 2xl:text-[15px] text-[13px] md:text-[12px] font-bold text-[#B45309] ml-3">
                        Checked Out
                      </p>
                      <div className="absolute right-0 2xl:text-[15px] sm:text-[10px] text-[13px] md:sm:text-[12px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 px-2">
                        75
                      </div>
                    </button>
                    <button
                      className={`relative w-[43%] h-7 rounded-md mr-4 flex justify-between items-center bg-[#C7D2FE] ${
                        focusedStatus === "requests"
                          ? "ring-2 ring-[#2563eb] scale-105"
                          : ""
                      } hover:bg-blue-200 transform-all ease-out duration-300 hover:scale-105`}
                      onClick={() => setFocusedStatus("requests")}
                    >
                      <p className="sm:text-[14px] 2xl:text-[15px] text-[13px] md:text-[13px] font-figtree font-bold text-[#3730A3] ml-3">
                        Requests
                      </p>
                      <div className="absolute right-0 2xl:text-[15px] sm:text-[10px] text-[13px] md:sm:text-[12px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 px-2">
                        23
                      </div>
                    </button>
                  </div>
                </div>
              ) : activeTab === "pending" ? (
                <div className="w-full h-[90px] md:scale-100">
                  <div className="w-full h-1/2 flex justify-between items-center ">
                    <button
                      className={`relative w-[43%] h-7 rounded-md ml-4 flex justify-between items-center bg-[#E0E7FF] ${
                        focusedStatus === "all"
                          ? "ring-2 ring-[#2563eb] scale-105"
                          : ""
                      } hover:scale-105 transform-all ease-out duration-300`}
                      onClick={() => setFocusedStatus("all")}
                    >
                      <p className="sm:text-[14px] 2xl:text-[15px] text-[10px] md:text-[13px] font-figtree font-bold text-[#1E40AF] ml-3">
                        All Requests
                      </p>
                      <div className="right-0 absolute 2xl:text-[15px] sm:text-[10px] md:text-[12px] text-[8px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 px-2">
                        50
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
                      <p className="sm:text-[14px] 2xl:text-[15px] text-[13px] md:text-[13px] font-figtree font-bold text-[#047857] ml-3">
                        Approved
                      </p>
                      <div className="absolute right-0 2xl:text-[15px] sm:text-[10px] text-[13px] md:sm:text-[12px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 px-2">
                        30
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
                      <p className="sm:text-[14px] 2xl:text-[15px] text-[13px] md:text-[12px] font-bold text-[#B45309] ml-3">
                        Pending
                      </p>
                      <div className="absolute right-0 2xl:text-[15px] sm:text-[10px] text-[13px] md:sm:text-[12px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 px-2">
                        15
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
                      <p className="sm:text-[14px] 2xl:text-[15px] text-[13px] md:text-[13px] font-figtree font-bold text-[#B91C1C] ml-3">
                        Rejected
                      </p>
                      <div className="absolute right-0 2xl:text-[15px] sm:text-[10px] text-[13px] md:sm:text-[12px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 px-2">
                        5
                      </div>
                    </button>
                  </div>
                </div>
              ) : (
                // Dashboard buttons (default)
                <div className="w-full h-[90px] md:scale-100">
                  <div className="w-full h-1/2 flex justify-between items-center ">
                    <button
                      className={`relative w-[43%] h-7 rounded-md ml-4 flex justify-between items-center bg-[#E0E7FF] ${
                        focusedStatus === "all"
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
                        focusedStatus === "evaluated"
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
                        focusedStatus === "noeval"
                          ? "ring-2 ring-[#2563eb] scale-105"
                          : ""
                      } hover:bg-blue-200 transform-all ease-out duration-300 hover:scale-105`}
                      onClick={() => setFocusedStatus("noeval")}
                    >
                      <p className="sm:text-[14px] text-[13px] font-bold text-[#B91C1C] ml-3">
                        No Evaluation
                      </p>
                      <div className="absolute right-0 sm:text-[14px] text-[13px] md:sm:text-[14px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 px-2">
                        19
                      </div>
                    </button>
                  </div>
                </div>
              )}
              <h4 className="text-white text-xs mt-1 ml-4 md:scale-100">
                SORT BY
              </h4>
              <div className={`w-full h-[90px] md:scale-100`}>
                <div className="w-full h-1/2 flex justify-between items-center">
                  <button
                    className={`relative w-[43%] h-7 rounded-md ml-4 flex justify-between items-center bg-gray-200 ${focusedSort === "name-asc" ? "ring-2 ring-[#2563eb] scale-105" : ""} hover:scale-105 transform-all ease-out duration-300`}
                    onClick={() => { setFocusedSort("name-asc"); handleSortNameAsc && handleSortNameAsc(); }}
                  >
                    <p className="sm:text-[14px] text-[12px] font-bold text-black ml-3">Name (A-Z)</p>
                  </button>
                  <button
                    className={`relative w-[43%] h-7 rounded-md mr-4 flex justify-between items-center bg-gray-200 ${focusedSort === "name-desc" ? "ring-2 ring-[#2563eb] scale-105" : ""} hover:scale-105 transform-all ease-out duration-300`}
                    onClick={() => { setFocusedSort("name-desc"); handleSortNameDesc && handleSortNameDesc(); }}
                  >
                    <p className="sm:text-[14px] text-[12px] font-bold text-black ml-3">Name (Z-A)</p>
                  </button>
                </div>
                <div className="w-full h-1/2 flex justify-between items-center">
                  <button
                    className={`relative w-[43%] h-7 rounded-md ml-4 flex justify-between items-center bg-gray-200 ${focusedSort === "newest" ? "ring-2 ring-[#2563eb] scale-105" : ""} hover:scale-105 transform-all ease-out duration-300`}
                    onClick={() => { setFocusedSort("newest"); handleSortDateNewest && handleSortDateNewest(); }}
                  >
                    <p className="sm:text-[14px] text-[12px] font-bold text-black ml-3">Date (Newest)</p>
                  </button>
                  <button
                    className={`relative w-[43%] h-7 rounded-md mr-4 flex justify-between items-center bg-gray-200 ${focusedSort === "oldest" ? "ring-2 ring-[#2563eb] scale-105" : ""} hover:scale-105 transform-all ease-out duration-300`}
                    onClick={() => { setFocusedSort("oldest"); handleSortDateOldest && handleSortDateOldest(); }}
                  >
                    <p className="sm:text-[14px] text-[12px] font-bold text-black ml-3">Date (Oldest)</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* SIDE BAR NAVIGATION CONTAINER EN okay?*/}

          {/* CALENDAR */}
          <div className="min-w-[70%] w-[90%] h-[50%] bg-[#102F5E] flex items-center rounded-xl md:mt-7">
            <div className="w-full flex justify-center items-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
