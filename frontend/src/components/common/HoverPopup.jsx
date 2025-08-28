import React from "react";

// This component is now a preview version of PopupWindow, without overlay or close buttons.
const HoverPopup = ({ user }) => {
  if (!user) return null;
  return (
    <div className="bg-white w-70 h-fit scale-90 rounded-xl shadow-2xl p-0 animate-slide-up flex flex-col justify-center items-center border border-gray-200">
      <h5>PLACEHOLDER MUNA TO </h5>

      <h2 className="text-3xl font-bold text-center text-[#0C7E48] w-full mt-4">
        {user.studentname}
      </h2>
      <div className="grid grid-cols-2 grid-rows-3 w-full h-full p-6 gap-2">
        <div className="bg-blue-200 flex items-center justify-center font-bold text-lg w-full h-20 rounded-xl">
          {user.program}
        </div>
        <div className="bg-green-200 flex items-center justify-center font-bold text-lg w-full h-20 rounded-xl">
          {user.tassel}
        </div>
        <div className="bg-yellow-200 flex items-center justify-center font-bold text-lg w-full h-20 rounded-xl">
          {user.hood}
        </div>
        <div className="bg-pink-200 flex items-center justify-center font-bold text-lg w-full h-20 rounded-xl">
          {user.gown}
        </div>
        <div className="bg-gray-200 flex flex-col items-center justify-center font-semibold text-base w-full h-20 rounded-xl col-span-2">
          <div>Date: {user.dateofreservation}</div>
          <div>Status: {user.status}</div>
          <div className="text-xs text-gray-500 mt-1">ID: {user.id_number}</div>
        </div>
      </div>
    </div>
  );
};

export default HoverPopup;
