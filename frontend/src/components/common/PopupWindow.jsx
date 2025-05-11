import React from "react";
import BackIcon from "../../assets/icons/BackIcon.svg?react";
import Inventory from "../../assets/icons/white-inventory.svg?react";
import User from "../../assets/icons/white-user.svg?react";
import RightArrow from "../../assets/icons/small-arrow.svg?react";
import Profile from "../../assets/images/profilepicture.jpg";

const PopupWindow = ({
  open,
  onClose,
  user,
  showBackButton,
  onBack,
  fullScreen,
}) => {
  return (
    <div
      className={`fixed left-0 top-0 right-0 bottom-0 z-[9999] w-full h-full flex justify-center items-center transition-all duration-500 ${
        open
          ? "opacity-100 pointer-events-auto backdrop-blur-sm"
          : "opacity-0 pointer-events-none"
      }`}
      style={{ background: "rgba(0,0,0,0.4)" }}
    >
      <div
         className={`bg-[#001C47] border border-white${
          fullScreen
            ? "w-3xl h-auto rounded-2xl"
            : "w-80 rounded-xl"
        } shadow-2xl p-0 relative animate-slide-up`}
        style={{
          maxHeight: "800px"
        }}
      > 
      <div className="h-12 w-full flex justify-between mt-7 border border-red-500">
        <div className="h-full w-96 flex justify-start ml-3">
          <div className="h-full w-16 flex justify-end items-center ml-2">
            <button className="w-12 h-12 bg-[#F3B51A] rounded-2xl flex justify-center items-center mr-2 cursor-pointer hover:bg-[#d99f0f] hover:scale-105 transition-all duration-200" 
            onClick={onClose}
            >
              <BackIcon className="w-5"/>
            </button>
          </div>
          <div className="h-full w-32 flex justify-center items-center">
            <button className="border border-white w-28 h-6 rounded-md flex justify-center items-center text-white text-[10px]">
              <Inventory className="w-3 mr-2"/>
              <h5>Reservation</h5>
            </button>
          </div>
          <div className="h-full w-3 flex justify-center items-center">
            <RightArrow className="w-3"/>
          </div>
          <div className="h-full w-32 flex justify-center items-center">
            <button className="border border-white w-28 h-6 rounded-md flex justify-center items-center text-white text-[10px]">
              <User className="w-4 mr-2"/>
              <h5>Joshua</h5>
            </button>
          </div>
        </div>
        <div className="h-full w-80 flex justify-end items-center">
          <div className="h-full w-24 flex justify-center items-center text-sm pr-1">
            <button className="border border-green-400 text-green-400 w-20 h-10 rounded-lg text-xs hover:bg-green-400 hover:text-white hover:scale-105 transition-all duration-200">
              <h3>EDIT</h3>
            </button>
          </div>
          <div className="h-full w-24 flex justify-center items-center text-sm pr-2">
            <button className="border border-red-500 text-red-500 w-20 h-10 rounded-lg text-xs hover:bg-red-500 hover:text-white hover:scale-105 transition-all duration-200">
              <h3>DELETE</h3>
            </button>
          </div>
          <div className="ps-2 h-10 w-28 border-l-2 flex justify-center items-center border-gray-500 mr-7 text-sm">
            <button className="bg-[#0C7E48] text-white w-24 h-8 rounded-lg hover:bg-[#0A6F40] hover:scale-105 transition-all duration-200">
              <h3>Evaluate</h3>
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-[580px] border border-red-500 mt-1 grid grid-cols-5">
          <div className="col-span-3 w-full h-full border border-red-500">
            <div className="w-full h-28 border border-red-500 flex justify-start">
              <div className="w-[35%] h-full border border-red-500 flex justify-end items-center">
                <img src={Profile} className="w-32 h-20 rounded-4xl object-cover" />
              </div>
              <div className="w-[65%] h-full border border-red-500">
                <div className="h-[57%] w-full border border-red-500 flex justify-start items-end">
                  <h1 className="text-white font-figtree-extrabold text-[29px] ml-3">Joshua Guiritan</h1>
                </div>
                <div className="h-[43%] w-full border border-red-500">
                  <h6 className="text-white font-light text-md ml-3">Student</h6>
                </div>
              </div>
            </div>
            <div className="w-full h-[210px] border border-red-500">
              <div className="w-full h-12 border border-red-500 flex items-center">
                <h3 className="text-white text-lg ml-12 mt-2">Basic Information</h3>
              </div>
              <div className="w-full h-8 border border-red-500 flex justify-center">
                <div className="w-3/8 h-full border border-red-500 flex items-center text-xs text-gray-400 font-extralight">
                  <h3>FULL NAME</h3>
                </div>
                <div className="w-3/8 h-full border border-red-500 flex items-center text-xs text-white font-extralight">
                  <h3>Joshua Eduard L. Guiritan</h3>
                </div>
              </div>
              <div className="w-full h-8 border border-red-500 flex justify-center">
                <div className="w-3/8 h-full border border-red-500 flex items-center text-xs text-gray-400 font-extralight">
                  <h3>PROGRAM</h3>
                </div>
                <div className="w-3/8 h-full border border-red-500 flex items-center text-xs text-white font-extralight">
                  <h3>BS Computer Science</h3>
                </div>
              </div>
              <div className="w-full h-8 border border-red-500 flex justify-center">
                <div className="w-3/8 h-full border border-red-500 flex items-center text-xs text-gray-400 font-extralight">
                  <h3>EMAIL</h3>
                </div>
                <div className="w-3/8 h-full border border-red-500 flex items-center text-xs text-white font-extralight">
                  <h3>admin123@gmail.com</h3>
                </div>
              </div>
              <div className="w-full h-8 border border-red-500 flex justify-center">
                <div className="w-3/8 h-full border border-red-500 flex items-center text-xs text-gray-400 font-extralight">
                  <h3>CONTACT #</h3>
                </div>
                <div className="w-3/8 h-full border border-red-500 flex items-center text-xs text-white font-extralight">
                  <h3>0969-696-6969</h3>
                </div>
              </div>
              <div className="w-full h-8 border border-red-500 flex justify-center">
                <div className="w-3/8 h-full border border-red-500 flex items-center text-xs text-gray-400 font-extralight">
                  <h3>ID NUMBER</h3>
                </div>
                <div className="w-3/8 h-full border border-red-500 flex items-center text-xs text-white font-extralight">
                  <h3>230696</h3>
                </div>
              </div>
            </div>
            <div className="w-full h-[175px] border border-red-500">
              <div className="w-full h-12 border border-red-500 flex items-center">
                <h3 className="text-white text-lg ml-12 mt-2">Measurements</h3>
              </div>
              <div className="w-full h-8 border border-red-500 flex justify-center">
                <div className="w-3/8 h-full border border-red-500 flex items-center text-xs text-gray-400 font-extralight">
                  <h3>TOGA</h3>
                </div>
                <div className="w-3/8 h-full border border-red-500 flex items-center text-xs text-white font-extralight">
                  <h3>XL</h3>
                </div>
              </div>
              <div className="w-full h-8 border border-red-500 flex justify-center">
                <div className="w-3/8 h-full border border-red-500 flex items-center text-xs text-gray-400 font-extralight">
                  <h3>Large</h3>
                </div>
                <div className="w-3/8 h-full border border-red-500 flex items-center text-xs text-white font-extralight">
                  <h3>BS Computer Science</h3>
                </div>
              </div>
              <div className="w-full h-8 border border-red-500 flex justify-center">
                <div className="w-3/8 h-full border border-red-500 flex items-center text-xs text-gray-400 font-extralight">
                  <h3>TASSEL</h3>
                </div>
                <div className="w-3/8 h-full border border-red-500 flex items-center text-xs text-white font-extralight">
                  <h3>White</h3>
                </div>
              </div>
              <div className="w-full h-8 border border-red-500 flex justify-center">
                <div className="w-3/8 h-full border border-red-500 flex items-center text-xs text-gray-400 font-extralight">
                  <h3>CAP</h3>
                </div>
                <div className="w-3/8 h-full border border-red-500 flex items-center text-xs text-white font-extralight">
                  <h3>Medium</h3>
                </div>
              </div>
            </div>
            <div className="">

            </div>
          </div>
          <div className="col-span-2 w-full h-full border border-red-500">
            <div className="w-full h-52 border border-red-500 mt-20">

            </div>
            <div className="w-full h-32 border border-red-500">

            </div>
          </div>
      </div>
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      {/*
        {showBackButton && (
          <button
            className="absolute top-4 left-4 text-gray-500 hover:text-blue-600 text-lg font-bold border border-gray-300 rounded px-3 py-1 bg-gray-100"
            onClick={onBack}
          >
            ← Back
          </button>
        )}

        <h2 className="text-3xl font-bold text-center text-[#0C7E48] w-full">
          {user ? user.studentname : "User Details"}
        </h2>
        <button
          className="absolute top-4 left-4 text-gray-500 hover:text-blue-600 text-lg font-bold border border-gray-300 rounded px-3 py-1 bg-blue-100"
          onClick={onClose}
        >
          Back
        </button>
        <h5>PLACEHOLDER MUNA TO </h5>
        <div className="grid grid-cols-2 grid-rows-3 w-full h-full p-6 gap-2">
          <div className="bg-blue-200 flex items-center justify-center font-bold text-lg w-full h-20 rounded-xl">
            {user ? user.program : "Program"}
          </div>
          <div className="bg-green-200 flex items-center justify-center font-bold text-lg w-full h-20 rounded-xl">
            {user ? user.tassel : "Tassel"}
          </div>
          <div className="bg-yellow-200 flex items-center justify-center font-bold text-lg w-full h-20 rounded-xl">
            {user ? user.hood : "Hood"}
          </div>
          <div className="bg-pink-200 flex items-center justify-center font-bold text-lg w-full h-20 rounded-xl">
            {user ? user.gown : "Gown"}
          </div>
          <div className="bg-gray-200 flex flex-col items-center justify-center font-semibold text-base w-full h-20 rounded-xl col-span-2">
            <div>Date: {user ? user.dateofreservation : "-"}</div>
            <div>Status: {user ? user.status : "-"}</div>
            <div className="text-xs text-gray-500 mt-1">
              ID: {user ? user.id : "-"}
            </div>
          </div>
        </div> */}
      </div> 
    </div>
  );
};

export default PopupWindow;
