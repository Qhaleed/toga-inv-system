import React from "react";

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
        className={`bg-white ${
          fullScreen
            ? "w-full max-w-3xl h-auto md:h-[80vh] rounded-2xl"
            : "w-80 rounded-xl"
        } shadow-2xl p-0 relative animate-slide-up flex flex-col justify-center items-center`}
        style={{
          maxHeight: fullScreen ? "90vh" : undefined,
          minHeight: fullScreen ? "400px" : undefined,
        }}
      >
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
        </div>
      </div>
    </div>
  );
};

export default PopupWindow;
