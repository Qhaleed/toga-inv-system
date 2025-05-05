import React, { useState, useEffect } from "react";
import Profile from "../../assets/images/profilepicture.jpg";
import { ReactComponent as Calendar } from "../../assets/icons/black-calendar.svg";
import { ReactComponent as MenuIcon } from "../../assets/icons/white-row.svg";

const SideBar = ({
  alwaysShowOnLarge,
  setSortOrder,
  viewType,
  studentStatus,
  dateReserved,
  dateDue,
}) => {
  // Track screen size for responsive sidebar
  const [isLargeScreen, setIsLargeScreen] = useState(
    typeof window !== "undefined" && window.innerWidth >= 640
  );
  const [showSidebar, setShowSidebar] = useState(isLargeScreen);
  const [menuActive, setMenuActive] = useState(false);
  // const [all, setAll] = useState(true);
  // const [borrowed, setBorrowed] = useState(false);
  // const [returned, setReturned] = useState(false);
  // const [requests, setRequests] = useState(false);
  // const [name, setName] = useState(false);
  // const [dateNew, setdateNew] = useState(false);
  // const [dateOld, setdateOld] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [adminRole, setAdminRole] = useState("");

  // const allClicked = () => {
  //   setAll(true);
  //   setBorrowed(false);
  //   setReturned(false);
  //   setRequests(false);
  // };
  // const borrowedClicked = () => {
  //   setAll(false);
  //   setBorrowed(true);
  //   setReturned(false);
  //   setRequests(false);
  // };
  // const returnedClicked = () => {
  //   setAll(false);
  //   setBorrowed(false);
  //   setReturned(true);
  //   setRequests(false);
  // };
  // const requestsClicked = () => {
  //   setAll(false);
  //   setBorrowed(false);
  //   setReturned(false);
  //   setRequests(true);
  // };
  // const nameClicked = () => {
  //   if (!name) {
  //     setName(true);
  //     setdateNew(false);
  //     setdateOld(false);
  //   } else {
  //     setName(false);
  //     setdateNew(false);
  //     setdateOld(false);
  //   }
  // };
  // const dateNewClicked = () => {
  //   if (!dateNew) {
  //     setName(false);
  //     setdateNew(true);
  //     setdateOld(false);
  //   } else {
  //     setName(false);
  //     setdateNew(false);
  //     setdateOld(false);
  //   }
  // };
  // const dateOldClicked = () => {
  //   if (!dateOld) {
  //     setName(false);
  //     setdateNew(false);
  //     setdateOld(true);
  //   } else {
  //     setName(false);
  //     setdateNew(false);
  //     setdateOld(false);
  //   }
  // };

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
          }}
        >
          {/* SIDE BAR HERO CONTAINER*/}
          <div className="w-full md:w-full h-20 md:h-24  bg-[#102F5E] bg-center flex justify-between">
            <div className="flex justify-center">
              <div className="  h-full  ml-1  w-16 flex justify-center items-center ">
                <img
                  className=" w-10 md:w-16 rounded-full"
                  src={Profile}
                  alt="profile"
                />
              </div>

              <div className="h-full ml-3 flex flex-col justify-center items-start text-white">
                <p className="text-[16px] md:font-bold">{adminName}</p>
                <p className="sm:text-[14px] text-[13px] md:text-xs font-light">
                  {adminRole}
                </p>
              </div>
            </div>

            <div className="h-full flex justify-end items-center mr-4">
              <button className="bg-[#F3B51A] hover:bg-[#dc9f2d] scale-75 md:scale-100 hover:scale-105 h-12 w-12 rounded-full flex justify-center items-center border border-gray-700 transform-all ease-out duration-500">
                <Calendar className="w-6" />
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
          {viewType === "admin" && (
            <div className="min-w-full scale-90 md:w-11/12 md:scale-100 sm:min-w-24 md:min-w-48 md:h-60 bg-[#102F5E] flex items-center rounded-xl md:mt-7">
              {/* Existing FILTER UI for admin */}
            </div>
          )}

          {(viewType === "userPending" || viewType === "userApproved") && (
            <div className="min-w-full scale-90 md:w-11/12 md:scale-100 sm:min-w-24 md:min-w-48 bg-[#102F5E] flex flex-col items-start p-4 rounded-xl md:mt-7 text-white space-y-3">
              <div className="w-full">
                <h4 className="text-xs mb-1">STUDENT STATUS</h4>
                <p className="text-sm font-semibold">Approved</p>{" "}
                {/* or dynamic value */}
              </div>
              <div className="w-full">
                <h4 className="text-xs mb-1">DATE RESERVED</h4>
                <p className="text-sm font-semibold">April 25, 2025</p>{" "}
                {/* or dynamic */}
              </div>
              <div className="w-full">
                <h4 className="text-xs mb-1">DATE DUE</h4>
                <p className="text-sm font-semibold">May 10, 2025</p>{" "}
                {/* or dynamic */}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SideBar;
