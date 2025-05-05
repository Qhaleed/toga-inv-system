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
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setLoading(true); // Show loader when login starts
    try {
      const response = await fetch("/api/auth/login", {
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
    } catch {
      setError("Failed to connect to the server. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <>
      <FormWrapper
        title="Toga Inventory Management System"
        onSubmit={handleSubmit}
      >
        {/* Form content */}
        {/* Title */}
        <div className="mb-4">
          <span className="text-primary text-lg sm:text-xl font-figtree font-extrabold mr-1">
            LOGIN TO YOUR ACCOUNT
          </span>
        </div>

        {/* Email */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 mb-4">
          <label className="w-full sm:w-20 text-primary text-m font-manjari font-bold">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            className="w-full flex-1  bg-opacity-0 border-b-2 border-white border-opacity-50 rounded-sm font-manjari
                    text-white placeholder-gray-300 placeholder:font-manjari
                    focus:outline-none 
                    focus:border-primary
                    transition duration-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 relative mb-4">
          <label className="w-full sm:w-20 text-primary text-m font-manjari font-bold">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="•••••••••••"
            className="w-full flex-1 bg-opacity-0 border-b-2 border-white border-opacity-50 rounded-sm font-manjari
                    text-white placeholder-gray-300 placeholder:font-manjari
                    focus:outline-none 
                    focus:border-primary
                    transition duration-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white-400 cursor-pointer select-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Error Message */}
        {error && (
          <div className="absolute mb-4 left-[50%] sm:left-[50%] md:left-[63%] translate-x-[-50%]">
            <p className="text-red-500 text-[10px] sm:text-[15px] md:text-[16px] text-center font-manjari font-bold">
              {error}
            </p>
          </div>
        )}

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

          {/* Forgot Password */}
          <a href="/" className="font-manjari text-white pt-1 hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Submit Button */}
        <div className="mb-6">
          <button
            type="submit"
            className="w-full bg-[#2A4D89] hover:bg-primary py-2 transition rounded-full font-manjari text-white"
          >
            Login
          </button>
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
