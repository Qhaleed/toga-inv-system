import React from "react";

const LoaderAnimation = () => {
  return (
    <div className="fixed w-screen h-screen flex items-center justify-center bg-black/40 z-50">
      <div className="flex flex-col items-center justify-center p-12 space-y-10 bg-black/40 rounded-2xl shadow-xl">
        {/* Loader Circle with animation */}
        <div className="w-16 h-16 border-4 border-t-transparent border-white border-solid rounded-full animate-spin"></div>

        <p className="text-white text-lg font-semibold animate-pulse">
          Loading, please wait...
        </p>

        <div className="mt-4">
          <span className="text-white opacity-70 text-sm">
            If it's taking too long, please check your connection.
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoaderAnimation;
