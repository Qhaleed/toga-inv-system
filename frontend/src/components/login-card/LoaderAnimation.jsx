import React, { useState, useEffect } from "react";
import Profile from "../../assets/images/profilepicture.jpg";

const LoaderAnimation = ({ isLogin }) => {
  const [counter, setCounter] = useState(10);

  useEffect(() => {
    if (isLogin) {
      const timer = setInterval(() => {
        setCounter((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            // Add any additional logic here when the timer reaches 0
            console.log("Timeout reached");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer); // Cleanup the timer on component unmount
    }
  }, [isLogin]);

  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black/40 zoom-in-100">
      <div className="flex flex-col items-center justify-center p-12 space-y-10 bg-black/40 rounded-2xl shadow-xl">
        {/* Loader Circle with animation */}
        <div className="w-16 h-16 border-4 border-t-transparent border-white border-solid rounded-full animate-spin"></div>
        {/* <div className="w-16 h-16 rounded-full animate-spin">
          <img
            className=" w-10 md:w-16 rounded-full"
            src={Profile}
            alt="profile"
          />
        </div> */}

        <p className="text-white text-lg font-semibold animate-pulse">
          Loading po, please wait...
        </p>

        <div className="mt-4">
          <span className="text-white opacity-70 text-sm">
            If it's taking too long, please check your Internet connection.
          </span>
        </div>

        {/* Display the live countdown only for login */}
        {isLogin && (
          <div className="text-white text-lg font-bold mt-4">
            {`Timeout in: ${counter} seconds`}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoaderAnimation;
