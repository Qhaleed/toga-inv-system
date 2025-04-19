import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import UploadIcon from "../../assets/images/cloudupload.png";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    firstName: "",
    surname: "",
    middleInitial: "",
    idNumber: "",
    idImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Form Submitted");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-login-bg bg-cover bg-no-repeat bg-center p-4 sm:p-6">
      <div className="fixed inset-0 bg-black/60 rounded-l w-full min-h-screen"></div>
      <div className="w-full max-w-5xl bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 sm:p-10 shadow-2xl ring-1 ring-white/10">
        <div className="grid grid-cols-1 md:grid-cols-[0.8fr_2.2fr] gap-6">
          <div className="space-y-4 text-white border-r-2 border-gray-400 pr-4 sm:pr-6">
            <h2 className="text-2xl sm:text-3xl text-transparent font-figtree font-bold bg-clip-text bg-text-gradient-ul leading-snug">
              Register and <br /> validate your account
            </h2>
            <ul className="text-white text-sm font-regular font-manjari hidden md:block md:text-sm list-disc list-inside mt-4 space-y-1">
              <li>Streamlined management</li>
              <li>Other point</li>
              <li>More flavor text</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 text-white">
            {/* STEP 1 */}
            <div>
              <span className="text-purple-300 text-lg sm:text-xl font-figtree font-bold mr-1">
                STEP 1:
              </span>
              <span className="text-white-50 text-lg sm:text-xl font-semibold">
                Register your account
              </span>
            </div>
            <div className="space-y-4">
              {/* Username */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4">
                <label className="w-full sm:w-32 text-white-400 text-m font-manjari font-semibold opacity-80">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="NameOfUser"
                  className="w-full flex-1 bg-white bg-opacity-0 border-b-2 border-gray-300 border-opacity-30 rounded-sm font-manjari
                          text-white placeholder-gray-300 placeholder:font-manjari
                          focus:outline-none 
                          focus:border-purple-600
                          transition duration-200"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 relative">
                <label className="w-full sm:w-32 text-white-400 text-m font-manjari font-semibold opacity-80">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="•••••••••••"
                  className="w-full flex-1 bg-white bg-opacity-0 border-b-2 border-gray-300 border-opacity-30 rounded-sm font-manjari
                          text-white placeholder-gray-300 placeholder:font-manjari
                          focus:outline-none 
                          focus:border-purple-600
                          transition duration-200"
                  value={formData.password}
                  onChange={handleChange}
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white-400 cursor-pointer select-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4">
                <label className="w-full sm:w-32 text-white-400 text-m font-manjari font-semibold opacity-80">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="•••••••••••"
                  className="w-full flex-1 bg-white bg-opacity-0 border-b-2 border-gray-300 border-opacity-30 rounded-sm font-manjari
                          text-white placeholder-gray-300 placeholder:font-manjari
                          focus:outline-none 
                          focus:border-purple-600
                          transition duration-200"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4">
                <label className="w-full sm:w-32 text-white-400 text-m font-manjari font-semibold opacity-80">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  className="w-full flex-1 bg-white bg-opacity-0 border-b-2 border-gray-300 border-opacity-30 rounded-sm font-manjari
                          text-white placeholder-gray-300 placeholder:font-manjari
                          focus:outline-none 
                          focus:border-purple-600
                          transition duration-200"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* STEP 2 */}
            <div>
              <span className="text-purple-300 text-lg sm:text-xl font-figtree font-bold mr-1">
                STEP 2:
              </span>
              <span className="text-white-400 text-lg sm:text-xl font-semibold">
                Input Student Details
              </span>
              <div className="grid sm:grid-cols-[2fr_1fr] gap-4 mt-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4">
                  <label className="w-full sm:w-32 text-white-400 text-m font-manjari font-semibold opacity-80">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Juan Antonio"
                    className="w-full flex-1 bg-white bg-opacity-0 border-b-2 border-gray-300 border-opacity-30 rounded-sm font-manjari
                          text-white placeholder-gray-300 placeholder:font-manjari
                          focus:outline-none 
                          focus:border-purple-600
                          transition duration-200"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
                  <label className="w-full sm:w-16 text-white-400 text-m font-semibold opacity-80 font-manjari">
                    M.I.
                  </label>
                  <input
                    type="text"
                    name="middleInitial"
                    placeholder="A."
                    className="w-full flex-1 bg-white bg-opacity-0 border-b-2 border-gray-300 border-opacity-30 rounded-sm font-manjari
                          text-white placeholder-gray-300 placeholder:font-manjari
                          focus:outline-none 
                          focus:border-purple-600
                          transition duration-200"
                    value={formData.middleInitial}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 mt-4">
                <label className="w-full sm:w-32 text-white-400 text-m font-manjari font-semibold opacity-80">
                  Surname
                </label>
                <input
                  type="text"
                  name="surname"
                  placeholder="Dela Cruz"
                  className="w-full flex-1 bg-white bg-opacity-0 border-b-2 border-gray-300 border-opacity-30 rounded-sm font-manjari
                          text-white placeholder-gray-300 placeholder:font-manjari
                          focus:outline-none 
                          focus:border-purple-600
                          transition duration-200"
                  value={formData.surname}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 mt-4">
                <label className="w-full sm:w-32 text-white-400 text-m font-manjari font-semibold opacity-80">
                  ID Number
                </label>
                <input
                  type="text"
                  name="idNumber"
                  placeholder="123456"
                  className="w-full flex-1 bg-white bg-opacity-0 border-b-2 border-gray-300 border-opacity-30 rounded-sm font-manjari
                          text-white placeholder-gray-300 placeholder:font-manjari
                          focus:outline-none 
                          focus:border-purple-600
                          transition duration-200"
                  value={formData.idNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* STEP 3 */}
            <div>
              <span className="text-purple-300 text-lg sm:text-xl font-figtree font-bold mr-1">
                STEP 3:
              </span>
              <span className="text-white-400 text-lg sm:text-xl font-semibold">
                Upload ID Image
              </span>
              <div className="mt-3 w-full group p-4 sm:p-6 text-center cursor-pointer bg-gradient-to-b from-indigo-950 to-indigo-800 rounded-[30px] transition-all duration-300 ease-in-out hover:opacity-100">
                <div className="border-2 border-dashed border-white-500 opacity-80 rounded-[20px] p-4 sm:p-6">
                  <input
                    type="file"
                    name="idImage"
                    accept="image/*"
                    className="hidden"
                    id="upload"
                    onChange={handleChange}
                  />
                  <label htmlFor="upload">
                    <img
                      src={UploadIcon}
                      alt="Upload"
                      className="mx-auto transition-transform ease-in-out duration-300 group-hover:scale-110"
                    />
                    <p className="text-sm mt-2 font-manjari text-white-400 opacity-80">
                      Drag your image here or upload from computer
                    </p>
                    <button
                      type="button"
                      className="font-manjari font-bold mt-2 px-4 py-1 bg-white text-black rounded-full text-sm transition hover:scale-105 hover:text-white hover:bg-purple-500"
                    >
                      Browse Computer
                    </button>
                  </label>
                  {formData.idImage && (
                    <p className="mt-2 text-xs text-green-300">
                      Uploaded: {formData.idImage.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1E1E49] hover:bg-[#45458d] py-2  transition rounded-full font-manjari text-white"
            >
              Register and Verify Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
