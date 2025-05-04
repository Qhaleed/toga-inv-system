import React from "react";

const LoaderAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4 bg-black/60 rounded-xl shadow-xl">
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
  );
};

export default LoaderAnimation;
