import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoaderAnimation from "./LoaderAnimation"; // Adjust path if needed
import { ReactComponent as EyeOff } from "../../assets/icons/eyeOff.svg"; // Adjust path if needed
import { ReactComponent as EyeOn } from "../../assets/icons/eyeIconOpen.svg"; // Adjust path if needed

function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await fetch("/auth/login", { //change proxy in package.json to 5001 if mac (default is 5000)
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userRole", data.role);

        // Wait 2 seconds before navigating
        setTimeout(() => {
          if (data.role === "admin") {
            navigate("/admin-home");
          } else {
            navigate("/student-home");
          }
        }, 2000); // Wait for 2 seconds
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
        setLoading(false); // Stop loading if response fails
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false); // Stop loading if there's an error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-login-bg bg-opacity-0 bg-cover bg-no-repeat bg-center relative">
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black/60 z-0"></div>

      {/* Login Card */}
      <div className="overflow-hidden relative z-10 bg-[#D9D9D9] bg-opacity-20 p-8 rounded-[30px] shadow-l w-[90%] sm:w-[80%] md:w-[80%] lg:w-[851px] lg:h-[500px]">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-[35%_65%] gap-5 h-full">
          {/* Left Side Content */}
          <div className="p-0 relative">
            {/* Title */}
            <div className="mt-5 ml-5 pt-5 bg-red-400 justify-start text-transparent bg-clip-text bg-text-gradient-ul text-[22px] sm:text-[25px] md:text-[24px] lg:text-[35px] leading-tight font-semibold">
              Toga Inventory Management System
            </div>

            {/* Bullet Points */}
            <div className="w-full mt-10 h-auto ml-6 flex flex-col sm:gap-2 sm:ml-0 md:ml-1 justify-start space-y-2">
              <div className="flex items-start gap-5">
                <span className="text-white text-sm font-regular font-manjari hidden md:block md:text-sm">
                  •
                </span>
                <span className="text-white text-sm font-regular font-manjari md:text-[12px]">
                  Streamlined management
                </span>
              </div>
              <div className="flex items-start gap-5">
                <span className="text-white text-sm font-regular hidden md:block font-manjari md:text-[12px]">
                  •
                </span>
                <span className="text-white text-sm font-regular font-manjari md:text-[12px]">
                  Other point
                </span>
              </div>
              <div className="flex items-start gap-5">
                <span className="text-white text-sm font-regular hidden md:block font-manjari md:text-[12px]">
                  •
                </span>
                <span className="text-white text-sm font-regular font-manjari md:text-[12px]">
                  More flavor text
                </span>
              </div>
            </div>
            {/* Vertical Divider */}
            <div className="absolute top-10 right-0 w-0.5 md:block hidden rounded-4xl min-h-80 bg-gray-400"></div>
          </div>

          {/* Right Side Content */}
          <div className="flex flex-col p-2 pt-9">
            <h2 className="text-[17px] font-bold mt-5 font-manjari bg-grey w-max h-min text-white">
              Login To your Account
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-1 text-white flex flex-col font-manjari"
            >
              <div className="relative overflow-hidden mr-3">
                <InputField
                  label="Username"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="NameOfUser"
                />
              </div>

              <div
                className=" relative pb-2 w-auto overflow-hidden mr-3"
              >
                <InputField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="•••••••••••"
                />
                <EyeOff id="eye" className="absolute hover:cursor-pointer text-white top-12 right-2 transform -translate-y-1/2" />
              </div>
              <div className="flex items-center justify-between text-sm ">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-indigo-500" />
                  Remember me
                  <div></div>
                </label>
                <a href="/" className="text-white hover:underline">
                  {" "}
                  {/* wala pang reference*/}
                  Forgot password?
                </a>
              </div>
              <br></br>
              <button
                type="submit"
                className="min-w-max  rounded-full bg-[#1E1E49] hover:bg-[#45458d] text-white font-semibold py-2 transition duration-300"
              >
                Login
              </button>
              <br></br>
              {error && <p className="text-red-500 text-center">{error}</p>}

              <div className="flex min-w-max justify-center items-center text-center h-10 rounded-full bg-[#D9D9D9] hover:bg-[#f8dbff] transition duration-300">
                <a
                  href="/register"
                  className="text-[#17153B] hover:w-full max-h-fit pt-2 pb-2"
                >
                  Register
                </a>
              </div>
            </form>
          </div>
        </div>

        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <LoaderAnimation />
          </div>
        )}
      </div>
    </div>
  );
}

function InputField({
  label,
  type,
  value,
  onChange,
  placeholder,
  labelColor = "text-white",
}) {
  return (
    <div className="flex items-center gap-5 mt-10">
      <label className={`text-sm font-medium whitespace-nowrap ${labelColor}`}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="flex-1 px-4 py-0 bg-white bg-opacity-0 border-b-2 border-gray-300 border-opacity-30 rounded-sm text-white placeholder-gray-300 focus:outline-none focus:border-purple-600 transition duration-200"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default LoginCard;
