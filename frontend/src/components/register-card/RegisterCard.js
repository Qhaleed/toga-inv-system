import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import UploadIcon from "../../assets/images/cloudupload.png";
import FormWrapper from "../common/FormWrapper"; // Import the reusable wrapper

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    <FormWrapper
      title="Register and validate your account"
      onSubmit={handleSubmit}
    >
      {/* STEP 1 */}
      <div>
        <span className="text-primary text-lg sm:text-xl font-figtree font-extrabold mr-1">
          STEP 1:
        </span>
        <span className="text-white-50 text-lg sm:text-xl font-semibold">
          Register your account
        </span>
      </div>

      {/* Email */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4">
        <label className="w-full sm:w-20 text-primary text-m font-manjari font-bold">
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
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      {/* Password */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 relative">
        <label className="w-full sm:w-20 text-primary text-m font-manjari font-bold">
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 relative">
        <label className="w-full sm:w-20 text-primary text-m font-manjari font-bold">
          Confirm Password
        </label>
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="•••••••••••"
          className="w-full flex-1 bg-white bg-opacity-0 border-b-2 border-white border-opacity-50 rounded-sm font-manjari
                    text-white placeholder-gray-300 placeholder:font-manjari
                    focus:outline-none 
                    focus:border-primary
                    transition duration-200"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <span
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white-400 cursor-pointer select-none"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      {/* STEP 2 */}
      <div>
        <span className="text-primary text-lg sm:text-xl font-figtree font-extrabold mr-1">
          STEP 2:
        </span>
        <span className="text-white-400 text-lg sm:text-xl font-semibold">
          Input Student Details
        </span>
        <div className="grid sm:grid-cols-[2fr_1fr] gap-4 mt-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4">
            <label className="w-full sm:w-20 text-primary text-m font-manjari font-bold">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="Juan Antonio"
              className="w-full flex-1 bg-white bg-opacity-0 border-b-2 border-white border-opacity-50 rounded-sm font-manjari
                        text-white placeholder-gray-300 placeholder:font-manjari
                        focus:outline-none 
                        focus:border-primary
                        transition duration-200"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
            <label className="w-full sm:w-10 text-primary text-m font-manjari font-bold">
              M.I.
            </label>
            <input
              type="text"
              name="middleInitial"
              placeholder="A."
              className="w-full flex-1 bg-white bg-opacity-0 border-b-2 border-white border-opacity-50 rounded-sm font-manjari
                        text-white placeholder-gray-300 placeholder:font-manjari
                        focus:outline-none 
                        focus:border-primary
                        transition duration-200"
              value={formData.middleInitial}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 mt-4">
          <label className="w-full sm:w-20 text-primary text-m font-manjari font-bold">
            Surname
          </label>
          <input
            type="text"
            name="surname"
            placeholder="Dela Cruz"
            className="w-full flex-1 bg-white bg-opacity-0 border-b-2 border-white border-opacity-50 rounded-sm font-manjari
                      text-white placeholder-gray-300 placeholder:font-manjari
                      focus:outline-none 
                      focus:border-primary
                      transition duration-200"
            value={formData.surname}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 mt-4">
          <label className="w-full sm:w-20 text-primary text-m font-manjari font-bold">
            ID Number
          </label>
          <input
            type="text"
            name="idNumber"
            placeholder="123456"
            className="w-full flex-1 bg-white bg-opacity-0 border-b-2 border-white border-opacity-50 rounded-sm font-manjari
                      text-white placeholder-gray-300 placeholder:font-manjari
                      focus:outline-none 
                      focus:border-primary
                      transition duration-200"
            value={formData.idNumber}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* STEP 3 */}
      <div>
        <span className="text-primary text-lg sm:text-xl font-figtree font-extrabold mr-1">
          STEP 3:
        </span>
        <span className="text-white-400 text-lg sm:text-xl font-semibold">
          Upload ID Image
        </span>
        <div className="mt-3 w-full group p-4 sm:p-6 text-center cursor-pointer bg-gradient-to-b from-[#112047] to-[#2A4D89] rounded-[30px] transition-all duration-300 ease-in-out hover:opacity-100">
          <div className="border-2 border-dashed border-white border-opacity-50 rounded-[20px] p-4 sm:p-6">
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
              <p className="text-sm mt-2 font-manjari text-white-400">
                Drag your image here or upload from computer
              </p>
              <button
                type="button"
                className="font-manjari font-bold mt-2 px-4 py-1 bg-white text-black rounded-full text-sm transition hover:bg-gray-200"
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
        className="w-full bg-[#2A4D89] hover:bg-primary py-2 transition rounded-full font-manjari text-white"
      >
        Register and Verify Account
      </button>
    </FormWrapper>
  );
}
