import React from "react";

const ApprovedView = ({ name }) => (
  <div className="flex-1 flex flex-col justify-center items-center text-white p-8 bg-login-bg">
    <h1 className="text-4xl font-bold">Welcome Back,</h1>
    <h2 className="text-5xl font-extrabold my-2">{name}</h2>
    <p className="text-lg mt-4">Your account has been successfully verified.</p>
    <p className="text-md text-gray-300 mb-6">
      Feel free to explore your dashboard and manage your activities.
    </p>
    <button className="bg-[#0C7E48] hover:bg-[#0a5e36] text-white py-2 px-6 rounded-full font-semibold">
      Go to Dashboard
    </button>
  </div>
);

export default ApprovedView;
