import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LoaderAnimation from "./LoaderAnimation";
import FormWrapper from "../common/FormWrapper";

function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader when login starts
    try {
      const response = await fetch("/auth/login", {
        //change proxy in package.json to 5001 if mac (default is 5000)
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userRole", data.role);

        setTimeout(() => {
          setLoading(false); // Hide loader after navigation
          if (data.role === "admin") {
            navigate("/admin-dashboard");
          } else {
            navigate("/student-home");
          }
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Wrong email or password nigga!");
        setLoading(false);
      }
    } catch (err) {
      setError("error to fetch server nigga SERVER IS DOWN");
      setLoading(false);
    }
  };

  return (

    <FormWrapper
      title="Toga Inventory Management System"
      onSubmit={handleSubmit}
    >
      {/* Form content */}
      {/* Title */}
      <div className="mt-4 mb-4">
        <span className="text-primary text-lg sm:text-xl font-figtree font-extrabold mr-1">
          LOGIN TO YOUR ACCOUNT
        </span>
      </div>

      {/* Email */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 space-y-6 sm:gap-4 mb-6">
        <label className="w-full sm:w-20 text-primary text-m font-manjari font-bold mt-8">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="example@email.com"
          className="w-full flex-1 bg-white bg-opacity-0 border-b-2 border-white border-opacity-50 rounded-sm font-manjari
                    text-white placeholder-gray-300 placeholder:font-manjari
                    focus:outline-none 
                    focus:border-primary
                    transition duration-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

      {/* Password */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 space-y-6  relative sm:gap-4 mb-6">
        <label className="w-full sm:w-20 text-primary text-m font-manjari font-bold mt-8">
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="•••••••••••"
          className="w-full flex-1 bg-white bg-opacity-0 border-b-2 border-white border-opacity-50 rounded-sm font-manjari
                    text-white placeholder-gray-300 placeholder:font-manjari
                    focus:outline-none 
                    focus:border-primary
                    transition duration-200"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span
          className="absolute right-3 top-1/4 transform -translate-y-1/3 text-white-400 cursor-pointer select-none"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      {/* Remember Me and Forgot Password */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-sm mb-4">
        {/* Remember Me */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 accent-[#2A4D89] border-2 border-gray-300 rounded"
          />
          <span className="text-white font-manjari pt-1 select-none">
            Remember me
          </span>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-center font-manjari font-bold mt-2 pt-1 sm:mt-0">
            {error}
          </div>
        )}

        {/* Forgot Password */}
        <a href="/" className="font-manjari text-white pt-1 hover:underline">
          Forgot password?
        </a>
      </div>

        {/* Remember Me and Forgot Password */}
        <div className="flex items-center justify-between text-sm mb-4">
          {/* Remember Me */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 accent-[#2A4D89] border-2 border-gray-300 rounded"
            />
            <span className="text-white font-manjari select-none pt-1">
              Remember me
            </span>
          </label>
      {/* Register Link */}
      <div className="flex justify-center items-center text-center">
        <a
          href="/register"
          className="w-full text-[#17153B] font-manjari bg-white hover:bg-gray-300 px-6 py-2 rounded-full transition duration-300 mb-6"
        >
          Register
        </a>
      </div>

        {/* Register Link */}
        <div className="flex justify-center items-center text-center">
          <a
            href="/register"
            className="w-full text-[#17153B] font-manjari bg-white hover:bg-gray-300 px-6 py-2 rounded-full transition duration-300"
          >
            Register
          </a>
        </div>
      </FormWrapper>
      {/* Loader Animation */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <LoaderAnimation />{" "}
        </div>
      )}
    </>
  );
}

export default LoginCard;
