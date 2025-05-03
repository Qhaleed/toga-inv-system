import React, { useState, useEffect } from "react";
import Profile from "../../assets/images/profilepicture.jpg";
import { ReactComponent as Calendar } from "../../assets/icons/black-calendar.svg";

const SideBar = ({ alwaysShowOnLarge }) => {
  // Track screen size for responsive sidebar
  const [isLargeScreen, setIsLargeScreen] = useState(
    typeof window !== "undefined" && window.innerWidth >= 640
  );
  const [showSidebar, setShowSidebar] = useState(isLargeScreen);
  const [all, setAll] = useState(true);
  const [borrowed, setBorrowed] = useState(false);
  const [returned, setReturned] = useState(false);
  const [requests, setRequests] = useState(false);
  const [name, setName] = useState(false);
  const [dateNew, setdateNew] = useState(false);
  const [dateOld, setdateOld] = useState(false);
  const [sidebarName, setSidebarName] = useState("Loading...");
  const [adminName, setAdminName] = useState("");
  const [adminRole, setAdminRole] = useState("");

  const allClicked = () => {
    setAll(true);
    setBorrowed(false);
    setReturned(false);
    setRequests(false);
  };
  const borrowedClicked = () => {
    setAll(false);
    setBorrowed(true);
    setReturned(false);
    setRequests(false);
  };
  const returnedClicked = () => {
    setAll(false);
    setBorrowed(false);
    setReturned(true);
    setRequests(false);
  };
  const requestsClicked = () => {
    setAll(false);
    setBorrowed(false);
    setReturned(false);
    setRequests(true);
  };
  const nameClicked = () => {
    if (!name) {
      setName(true);
      setdateNew(false);
      setdateOld(false);
    } else {
      setName(false);
      setdateNew(false);
      setdateOld(false);
    }
  };
  const dateNewClicked = () => {
    if (!dateNew) {
      setName(false);
      setdateNew(true);
      setdateOld(false);
    } else {
      setName(false);
      setdateNew(false);
      setdateOld(false);
    }
  };
  const dateOldClicked = () => {
    if (!dateOld) {
      setName(false);
      setdateNew(false);
      setdateOld(true);
    } else {
      setName(false);
      setdateNew(false);
      setdateOld(false);
    }
  };

  // Listen for window resize to update isLargeScreen and autoshow sidebar
  useEffect(() => {
    function handleResize() {
      const large = window.innerWidth >= 640;
      setIsLargeScreen(large);
      if (large) setShowSidebar(true); // Always show sidebar on large screens
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch the first student name from sample.json
  useEffect(() => {
    fetch("/components/admin-dashboard/sample.json")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.dashboard && data.dashboard.length > 0) {
          setSidebarName(data.dashboard[0].studentname);
        } else {
          setSidebarName("Unknown");
        }
      })
      .catch(() => setSidebarName("Unknown"));
  }, []);

  // Fetch admin name and role from sample.json in public folder
  useEffect(() => {
    fetch("/components/admin-dashboard/sample.json")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.admin) {
          setAdminName(data.admin.name || "");
          setAdminRole(data.admin.role || "");
        } else {
          setAdminName("");
          setAdminRole("");
        }
      })
      .catch(() => {
        setAdminName("");
        setAdminRole("");
      });
  }, []);

  // Responsive: show/hide sidebar on small screens, always show on large
  const visible = isLargeScreen ? true : showSidebar;

  return (
    <>
      {/* Options button for small screens */}
      <div className="sm:hidden w-vw flex justify-start items-center bg-[#001C47] p-1">
        <button
          className="bg-[#F3B51A] text-[#001C47] px-4 py-1 rounded-lg font-bold shadow-md transition-all duration-300 transform"
          onClick={() => setShowSidebar((prev) => !prev)}
        >
          {visible ? "Hide Menu" : "Show Menu"}
        </button>
      </div>

      {/* Sidebar: above navbar on small screens, left on large screens */}
      {visible && (
        <div
          className={`sm:col-span-2 w-full sm:w-auto overflow-hidden whitespace-nowrap  h-full flex flex-col justify-start items-center bg-[#001C47] sm:static fixed top-0 left-0 z-30 sm:z-auto transition-all duration-500 ease-in-out ${
            showSidebar ? "animate-slide-in-left" : "animate-fade-in"
          }`}
          style={{
            position: "static",
            height: isLargeScreen ? "100vh" : "88%",
            transition: "transform 0.2s",
          }}
        >
          {/* SIDE BAR HERO CONTAINER*/}
          <div className=" w-full md:w-full h-20 md:h-24  bg-[#102F5E] bg-center flex justify-between">
            <div className="flex justify-center">
              <div className="h-full  ml-1  w-16 flex justify-center items-center ">
                <img
                  className=" w-10 md:w-16 rounded-full"
                  src={Profile}
                  alt="profile"
                />
              </div>

              <div className="h-full ml-3 flex flex-col justify-center items-start text-white">
                <p className="text-[10px] md:font-bold">{adminName}</p>
                <p className="sm:text-[14px] text-[13px] md:text-xs font-light">
                  {adminRole}
                </p>
              </div>
            </div>

            <div className="h-full flex justify-end items-center mr-4">
              <button className="bg-[#F3B51A] hover:bg-[#dc9f2d] scale-75 md:scale-100 hover:scale-105 h-12 w-12 rounded-full flex justify-center items-center border border-gray-700 transform-all ease-out duration-500">
                <Calendar className="w-6"></Calendar>
                <div className="relative">
                  <div className="bg-[#0C7E48] rounded-full text-white text-xs absolute px-1 bottom-2">
                    4 {/* Notification count */}
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* SIDE BAR HERO CONTAINER EN okay?*/}
          <div class=" flex w-96 h-16 bg-gradient-to-l from-cyan-900 to-blue-950  shadow-[0px_1px_2px_0px_rgba(0,0,0,0.30)]"></div>
          {/* SIDE BAR NAVIGATION CONTAINER*/}
          <div className=" min-w-full  md:w-11/12  md:scale-100 scale-90  md:min-w-full md:h-60 bg-[#102F5E] flex items-center rounded-xl md:mt-7">
            <div className="relative w-full flex flex-col justify-between    md:w-full">
              <h4 className="text-white text-[13px]  md:text-[13px] mt-1 ml-4 md:scale-100">
                ITEM STATUS
              </h4>

              <div className="w-full h-[90px]  md:scale-100">
                <div className="w-full h-1/2 flex justify-between items-center ">
                  <button className=" relative w-[43%] h-7 rounded-md ml-4 flex justify-between items-center bg-gray-300 hover:scale-105 transform-all ease-out duration-300">
                    <p className="sm:text-[14px] text-[12px] md:text-[15px] font-figtree font-bold text-black ml-3">
                      All
                    </p>
                    <div className="  right-0 absolute sm:text-[14px] text-[13px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 px-2">
                      123
                    </div>
                  </button>
                  <button className=" relative w-[43%] h-7 rounded-md mr-4 flex justify-between items-center bg-[#E9E9E9] transform-all ease-out duration-300 hover:scale-105">
                    <p className="sm:text-[14px] text-[13px] md:text-[15px] font-figtree font-bold text-black ml-3">
                      Borrowed
                    </p>
                    <div className="absolute right-0 sm:text-[14px] text-[13px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 px-2">
                      13
                    </div>
                  </button>
                </div>
                <div className="w-full h-1/2 flex  justify-between items-center ">
                  <button className="relative w-[43%] h-7 rounded-md ml-4 flex justify-between items-center bg-[#E9E9E9] transform-all ease-out duration-300 hover:scale-105">
                    <p className="sm:text-[14px] text-[13px] font-bold text-black ml-3">
                      Returned
                    </p>
                    <div className="absolute right-0 sm:text-[14px] text-[13px] md:sm:text-[14px]  bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 px-2">
                      19
                    </div>
                  </button>
                  <button className=" relative w-[43%] h-7 rounded-md mr-4 flex justify-between items-center bg-[#E9E9E9] transform-all ease-out duration-300 hover:scale-105">
                    <p className="sm:text-[14px] text-[13px] md:text-[15px] font-figtree font-bold text-black ml-3">
                      Requests
                    </p>
                    <div className="absolute right-0 sm:text-[14px] text-[13px] md:sm:text-[14px] bg-[#0C7E48] rounded-lg text-white mr-1 sm:mr-2 px-2">
                      23
                    </div>
                  </button>
                </div>
              </div>
              <h4 className="text-white text-xs mt-1 ml-4 md:scale-100">
                SORT BY
              </h4>
              <div className="w-full h-[90px] md:scale-100">
                <div className="w-full h-1/2 flex justify-between items-center">
                  <button className="w-[43%] h-7 rounded-md bg-[#E9E9E9] ml-4 flex justify-between items-center hover:scale-105 transform-all ease-out duration-300">
                    <p className="text-[13px] md:text-[15px] font-figtree font-bold text-black ml-3">
                      Name
                    </p>
                    <p className="sm:text-[14px] text-[13px] text-black mr-3">
                      (A - Z)
                    </p>
                  </button>
                  <button className="w-[43%] h-7 rounded-md flex justify-between mr-4 items-center bg-[#E9E9E9]  transform-all ease-out duration-300 hover:scale-105">
                    <p className="text-[13px] md:text-[15px] font-figtree font-bold text-black ml-3">
                      Date
                    </p>
                    <p className="sm:text-[14px] text-[13px] text-black mr-3">
                      (Newest)
                    </p>
                  </button>
                </div>
                <div className="w-full h-1/2 flex justify-start items-center pb-2">
                  <button className="w-[43%] h-7 rounded-md flex justify-between ml-4 items-center bg-[#E9E9E9] transform-all ease-out duration-300 hover:scale-105">
                    <p className="text-[13px] md:text-[15px] font-figtree font-bold text-black ml-3">
                      Date
                    </p>
                    <p className="sm:text-[14px] text-[13px] text-black mr-3">
                      (Oldest)
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
