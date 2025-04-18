import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userRole", data.role);

        // Redirect based on role retrieved from the server
        if (data.role === "admin") {
          navigate("/admin-home");
        } else {
          navigate("/student-home");
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-login-bg bg-opacity-0 bg-cover bg-no-repeat bg-center">
      {/* Dark background behind the card */}
      <div className="absolute inset-0 bg-black/50 rounded-2xl w-full h-full "></div>

      {/* The card itself */}
      <div className=" overflow-hidden relative z-10 bg-zinc-300 bg-opacity-20 p-8 rounded-[50px] shadow-xl w-full h-auto max-w-[1271px] max-h-[754px] sm:w-[90%] sm:h-[70vh] md:w-[1000px] md:h-[600px] 2xl:w-[1150px] 2xl:h-[700px] xl:w-[1271px] xl:h-[754px]">
        <div className="grid grid-cols-1 sm:grid-cols-[35%_60%] gap-4 h-full">
          {/* Left side content */}
          <div className=" bg-gray-100 bg-opacity-10 p-8 relative">
            <div className=" mt-10 ml-5 w-3/2 h-[160px] bg-slate-600 justify-start text-transparent bg-clip-text bg-text-gradient-ul text-5xl font-bold">
              Toga Inventory Management System
            </div>

            <div className="w-80 h-28 mt-4 ml-6 flex flex-col justify-start space-y-2">
              <div className="flex items-start gap-5">
                <span className="text-white text-2xl font-normal font-['Manjari']">
                  •
                </span>
                <span className="text-white text-2xl font-normal font-['Manjari']">
                  Streamlined management
                </span>
              </div>
              <div className="flex items-start gap-5">
                <span className="text-white text-2xl font-normal font-['Manjari']">
                  •
                </span>
                <span className="text-white text-2xl font-normal font-['Manjari']">
                  Other point
                </span>
              </div>
              <div className="flex items-start gap-5">
                <span className="text-white text-2xl font-normal font-['Manjari']">
                  •
                </span>
                <span className="text-white text-2xl font-normal font-['Manjari']">
                  More flavor text
                </span>
              </div>
            </div>

            <div className="absolute top-16 right-0 w-0.5 rounded-4xl h-3/4 bg-gray-300"></div>
          </div>

          {/* Right side content */}
          <div className="flex flex-col bg-gray-200 p-8">
            <h2 className="text-2xl font-bold bg-grey w-max bg-slate-900 h-min ">
              Login To your Account
            </h2>
            <p>This is the right portion of the layout.</p>
          </div>
        </div>

        {/*         
        <form onSubmit={handleSubmit} className="space-y-4 text-white">
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="•••••••••••"
          />
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-indigo-500" />
              Remember me
              <div></div>
            </label>
            <a href="#" className="text-indigo-500 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl transition duration-300"
          >
            Login
          </button>
        </form> */}

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        <div className="text-center mt-4">
          <a href="/register" className="text-white hover:underline">
            Register
          </a>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, type, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default LoginCard;
