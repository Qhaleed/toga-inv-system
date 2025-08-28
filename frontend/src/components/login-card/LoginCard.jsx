import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LoaderAnimation from "../login-card/LoaderAnimation";
import FormWrapper from "../common/FormWrapper";
import LoginLoaderAnimation from "./LoginLoaderAnimation";

function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5001/auth/login", {
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
          setLoading(false);
          if (data.role === "admin") {
            navigate("/admin-dashboard");
          } else {
            navigate("/student-home");
          }
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Connection error. Please check your internet connection.");
      setLoading(false);
    }
  };

  return (
    <FormWrapper
      title="TogaTrack: The Toga Inventory Management System"
      onSubmit={handleSubmit}
    >
      <div className="mt-6 mb-0">
        <span className="text-primary text-lg pt-4 sm:text-xl font-figtree font-extrabold mr-1 mb-6">
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
          placeholder="co123456@adzu.edu.ph"
          className="w-full flex-1 bg-transparent border-b-2 border-blue-50/50 font-manjari
                     text-white placeholder-gray-300 placeholder:font-manjari
                     focus:outline-none 
                     focus:border-primary
                     transition duration-200"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Password */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 space-y-6 relative sm:gap-4">
        <label className="w-full sm:w-20 text-primary text-m font-manjari font-bold">
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="•••••••••••"
          className="w-full flex-1 bg-transparent border-b-2 border-blue-50/50 font-manjari
                     text-white placeholder-gray-300 placeholder:font-manjari
                     focus:outline-none 
                     focus:border-primary
                     transition duration-200"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span
          className="absolute right-3 top-1/4 transform -translate-y-1/2 text-white-400 cursor-pointer select-none"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      {/* Remember Me and Forgot Password */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-sm mb-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 accent-[#2A4D89] border-2 border-gray-300 rounded"
          />
          <span className="text-white font-manjari pt-1 select-none">
            Remember me
          </span>
        </label>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-center font-manjari font-bold mt-2 pt-1 sm:mt-0">
            {error}
          </div>
        )}

        <a href="/" className="font-manjari text-white pt-1 hover:underline">
          Forgot password?
        </a>
      </div>

      {/* Login Button */}
      <div className="mb-6">
        <button
          type="submit"
          className="w-full bg-[#2A4D89] hover:bg-primary py-2 transition rounded-xl font-manjari text-white"
        >
          Login
        </button>
      </div>

      {/* Register Link */}
      <div className="flex justify-center items-center text-center">
        <a
          href="/register"
          className="w-full text-[#17153B] font-manjari bg-white hover:bg-gray-300 px-6 py-2 rounded-xl transition duration-300 mb-6"
        >
          Register
        </a>
      </div>

      {/* Loader */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <LoginLoaderAnimation />
        </div>
      )}
    </FormWrapper>
  );
}

export default LoginCard;
