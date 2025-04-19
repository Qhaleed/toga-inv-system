import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import BgImg from "../../assets/images/reglogbg.jpg";
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
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat bg-center p-4 sm:p-6"
      style={{ backgroundImage: `url(${BgImg})` }}
    >
      <div className="w-full max-w-5xl bg-white bg-opacity-30 backdrop-blur-lg rounded-2xl p-6 sm:p-10 shadow-2xl ring-1 ring-white/10">
        <div className="grid grid-cols-1 md:grid-cols-[0.8fr_2.2fr] gap-6">
          <div className="space-y-4 text-white border-r-2 border-white border-opacity-80 pr-4 sm:pr-6">
            <h2 className="text-2xl sm:text-3xl font-bold leading-snug">
              Register and <br /> validate your account
            </h2>
            <ul className="text-sm text-gray-300 list-disc list-inside mt-4 space-y-1">
              <li>Streamlined management</li>
              <li>Other point</li>
              <li>More flavor text</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 text-white">
            {/* STEP 1 */}
            <div>
              <span className="text-purple-600 text-lg sm:text-xl font-semibold mr-1">
                STEP 1:
              </span>
              <span className="text-white-50 text-lg sm:text-xl font-semibold">
                Register your account
              </span>
            </div>
            <div className="space-y-4">
              {/* Username */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4">
                <label className="w-full sm:w-32 text-white-400 text-sm font-semibold opacity-80">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="w-full flex-1 bg-transparent border-b-2 border-white text-white placeholder-gray-300 focus:outline-none focus:border-purple-600"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 relative">
                <label className="w-full sm:w-32 text-white-400 text-sm font-semibold opacity-80">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full flex-1 bg-transparent border-b-2 border-white text-white placeholder-gray-300 focus:outline-none focus:border-purple-600 pr-10"
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
                <label className="w-full sm:w-32 text-white-400 text-sm font-semibold opacity-80">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full flex-1 bg-transparent border-b-2 border-white text-white placeholder-gray-300 focus:outline-none focus:border-purple-600"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4">
                <label className="w-full sm:w-32 text-white-400 text-sm font-semibold opacity-80">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full flex-1 bg-transparent border-b-2 border-white text-white placeholder-gray-300 focus:outline-none focus:border-purple-600"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* STEP 2 */}
            <div>
              <span className="text-purple-600 text-lg sm:text-xl font-semibold mr-1">
                STEP 2:
              </span>
              <span className="text-white-400 text-lg sm:text-xl font-semibold">
                Input Student Details
              </span>
              <div className="grid sm:grid-cols-[2fr_1fr] gap-4 mt-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4">
                  <label className="w-full sm:w-32 text-white-400 text-sm font-semibold opacity-80">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="w-full flex-1 bg-transparent border-b-2 border-white text-white placeholder-gray-300 focus:outline-none focus:border-purple-600"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4">
                  <label className="w-full sm:w-16 text-white-400 text-sm font-semibold opacity-80">
                    M.I.
                  </label>
                  <input
                    type="text"
                    name="middleInitial"
                    placeholder="M.I."
                    className="w-full flex-1 bg-transparent border-b-2 border-white text-white placeholder-gray-300 focus:outline-none focus:border-purple-600"
                    value={formData.middleInitial}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 mt-4">
                <label className="w-full sm:w-32 text-white-400 text-sm font-semibold opacity-80">
                  Surname
                </label>
                <input
                  type="text"
                  name="surname"
                  placeholder="Surname"
                  className="w-full flex-1 bg-transparent border-b-2 border-white text-white placeholder-gray-300 focus:outline-none focus:border-purple-600"
                  value={formData.surname}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 mt-4">
                <label className="w-full sm:w-32 text-white-400 text-sm font-semibold opacity-80">
                  ID Number
                </label>
                <input
                  type="text"
                  name="idNumber"
                  placeholder="ID Number"
                  className="w-full flex-1 bg-transparent border-b-2 border-white text-white placeholder-gray-300 focus:outline-none focus:border-purple-600"
                  value={formData.idNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* STEP 3 */}
            <div>
              <span className="text-purple-600 text-lg sm:text-xl font-semibold mr-1 ">
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
                    <p className="text-sm mt-2">
                      Drag your image here or upload from computer
                    </p>
                    <button
                      type="button"
                      className="mt-2 px-4 py-1 bg-white text-black rounded-full text-sm font-medium"
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
              className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-full font-semibold text-white transition"
            >
              Register and Verify Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
