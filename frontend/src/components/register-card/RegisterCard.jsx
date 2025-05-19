import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import UploadIcon from "../../assets/images/cloudupload.png";
import FormWrapper from "../common/FormWrapper";
import { useNavigate } from "react-router-dom";
import "../../styles/animations.css";

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
    idImage: [],
    course: "",
  });
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(""); //error message
  const navigate = useNavigate(); //used for redirecting
  const [success, setSuccess] = useState(""); //success message
  const courseGroups = {
    Blue: [
      "Bachelor of Early Childhood Education (BECEd)",
      "Bachelor of Elementary Education (BEEd)",
      "Bachelor of Physical Education (BPEd)",
      "Bachelor of Secondary Education (BSEd)",
    ],
    Maroon: [
      "BS Biomedical Engineering (BSBME)",
      "BS Computer Engineering (BSCE)",
      "BS Electronics Communication Engineering (BSECE)",
      "Associate in Electronics Engineering Technology (AEET)",
      "Associate in Computer Networking (ACN)",
    ],
    Orange: ["BS Nursing (BSN)"],
    White: [
      "BS Biology (BSBio)",
      "BS Computer Science (BSCS)",
      "BS Information Technology (BSIT)",
      "BS Mathematics (BSMath)",
      "BS Mathematics Sciences (BSMS)",
      "BS New Media and Computer Animation (BSNMCA)",
      "BS Psychology (BSPsych)",
      "BA Communication (BAC)",
      "BA English Language Studies (BAELS)",
      "BA Interdisciplinary Studies (BAIDS)",
      "BA International Studies (BAIS)",
      "BA Philosophy (BAPhil)",
    ],
    Yellow: [
      "BS Accountancy (BSA)",
      "BS Accounting Information System (BSAIS)",
      "BS Internal Auditing (BSIA)",
      "BS Management Accounting (BSMA)",
      "BS Business Administration (BSBA)",
      "BS Office Management (BSOM)",
      "BS Legal Management (BSLM)",
    ],
  };

  Object.keys(courseGroups).forEach((color) => {
    courseGroups[color].sort();
  });

  useEffect(() => {
    const preventDefaults = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    window.addEventListener("dragover", preventDefaults);
    window.addEventListener("drop", preventDefaults);

    return () => {
      window.removeEventListener("dragover", preventDefaults);
      window.removeEventListener("drop", preventDefaults);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || e.dataTransfer.files);
    const newImages = files.filter((file) => file.type.startsWith("image/"));

    setFormData((prev) => ({
      ...prev,
      idImage: [...prev.idImage, ...newImages],
    }));

    if (e.target.files) {
      e.target.value = "";
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      idImage: prev.idImage.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    //send values to the backend
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          first_name: formData.firstName,
          surname: formData.surname,
          middleInitial: formData.middleInitial,
          idNumber: formData.idNumber,
          course: value,
        }),
      });
          const data = await response.json();
      if (response.ok) {
        setError(""); // Clear any previous error messages
        setSuccess("Registered successfully! Redirecting you to login page...");
        setTimeout(() => navigate("/"), 2000); // 2 seconds delay
      } else {
        setError(data.message || "Registration failed"); //set error message
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <FormWrapper
      title="Register and validate your account"
      onSubmit={handleSubmit}
      className="register-card"
    >
      {/* STEP 1 */}
      <div className="mt-4">
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
          placeholder="co123456@adzu.edu.ph"
          className="w-full flex-1 bg-transparent border-b-2 border-blue-50/50 font-manjari
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
          className="w-full flex-1 bg-transparent border-b-2 border-blue-50/50 font-manjari
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 relative mb-6">
        <label className="w-full sm:w-20 text-primary text-m font-manjari font-bold">
          Confirm Password
        </label>
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="•••••••••••"
          className="w-full flex-1 bg-transparent border-b-2 border-blue-50/50 font-manjari
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
      <div className="mt-4">
        <span className="text-primary text-lg sm:text-xl font-figtree font-extrabold mr-1">
          STEP 2:
        </span>
        <span className="text-white-400 text-lg sm:text-xl font-semibold mr-1">
          Input Student Details
        </span>
      </div>
      <div className="grid sm:grid-cols-[2fr_1fr] gap-4 mt-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4">
          {/* First Name */}
          <label className="w-full sm:w-20 text-primary text-m font-manjari font-bold">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            placeholder="Juan Antonio"
            className="w-full flex-1 bg-transparent border-b-2 border-blue-50/50 font-manjari
                     text-white placeholder-gray-300 placeholder:font-manjari
                     focus:outline-none 
                     focus:border-primary
                     transition duration-200"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        {/*Middle Initial */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
          <label className="w-full sm:w-10 text-primary text-m font-manjari font-bold">
            M.I.
          </label>
          <input
            type="text"
            name="middleInitial"
            placeholder="A."
            className="w-full flex-1 bg-transparent border-b-2 border-blue-50/50 font-manjari
                     text-white placeholder-gray-300 placeholder:font-manjari
                     focus:outline-none 
                     focus:border-primary
                     transition duration-200"
            value={formData.middleInitial}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-[2fr_1fr] gap-4 mt-4">
        {/* Surname */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4">
          <label className="w-full sm:w-20 text-primary text-m font-manjari font-bold">
            Surname
          </label>
          <input
            type="text"
            name="surname"
            placeholder="Dela Cruz"
            className="w-full flex-1 bg-transparent border-b-2 border-blue-50/50 font-manjari
                     text-white placeholder-gray-300 placeholder:font-manjari
                     focus:outline-none 
                     focus:border-primary
                     transition duration-200"
            value={formData.surname}
            onChange={handleChange}
          />
        </div>
        {/* ID Number */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4">
          <label className="w-full sm:w-20 text-primary text-m font-manjari font-bold">
            ID Number
          </label>
          <input
            type="text"
            name="idNumber"
            placeholder="123456"
            className="w-full flex-1 bg-transparent border-b-2 border-blue-50/50 font-manjari
                     text-white placeholder-gray-300 placeholder:font-manjari
                     focus:outline-none 
                     focus:border-primary
                     transition duration-200"
            value={formData.idNumber}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-4">
        {/* Course */}
        <div className="relative w-full sm:w-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4">
            <label className="w-full sm:w-20 text-primary text-m font-manjari font-bold">
              Course
            </label>

            <div
              onClick={() => setOpen(!open)}
              onMouseDown={(e) => e.preventDefault()}
              className="w-full flex-1 cursor-pointer bg-[#2A4D89] text-white rounded-md font-manjari
                hover:bg-primary transition duration-200 ease-in-out relative"
            >
              <div className="py-2 px-3">{value || "Select"}</div>

              {/* Dropdown Arrow */}
              <div
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-white transition-transform duration-300 ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              >
                ▼
              </div>

              {open && (
                <div
                  className="absolute z-10 mt-1 w-full bg-gray-800 text-white rounded-md shadow-lg max-h-40 overflow-y-auto border border-gray-600
                    opacity-0 animate-fade-down transition-opacity duration-300"
                >
                  {Object.entries(courseGroups).map(([color, courses]) => (
                    <div key={color}>
                      <div className="px-4 py-2 bg-gray-700 font-figtree font-semibold">
                        {color} Toga
                      </div>
                      {courses.map((course) => (
                        <div
                          key={course}
                          onClick={() => {
                            setValue(course);
                            setOpen(false);
                          }}
                          className="px-6 py-3 hover:bg-primary hover:text-white transition duration-200 ease-in-out"
                        >
                          {course}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* STEP 3 */}
      <div className="mt-4">
        <span className="text-primary text-lg sm:text-xl font-figtree font-extrabold mr-1">
          STEP 3:
        </span>
        <span className="text-white-400 text-lg sm:text-xl font-semibold mr-1">
          Upload ID Image
        </span>
      </div>
      {/* Upload ID Image Box */}
      <div
        className="mt-3 w-full group p-4 sm:p-6 text-center cursor-pointer bg-gradient-to-b from-[#112047] to-[#2A4D89] rounded-3xl transition-all duration-300 ease-in-out hover:opacity-100"
        onDrop={handleImageChange}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="border-2 border-dashed border-blue-50/50 rounded-2xl p-4 sm:p-6">
          <input
            type="file"
            name="idImage"
            accept="image/*"
            className="hidden"
            id="upload"
            multiple
            onChange={handleImageChange}
          />
          <label htmlFor="upload" className="cursor-pointer">
            <img
              src={UploadIcon}
              alt="Upload"
              className="mx-auto pt-8 transition-transform ease-in-out duration-300 group-hover:scale-110"
            />
            <p className="text-sm mt-2 font-manjari text-white-400">
              Drag your images here or upload from computer
            </p>
            <button
              type="button"
              className="font-manjari font-bold mt-2 px-4 py-2 mb-8  bg-white text-black rounded-full text-sm transition hover:bg-gray-300 user-select-none"
              onClick={() => document.getElementById("upload").click()}
            >
              Browse Computer
            </button>
          </label>

          {formData.idImage.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {formData.idImage.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-black bg-opacity-60 text-white text-xs px-1 rounded hover:bg-opacity-90 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/*Success Message */}
      {success && (
        <div className="w-full mb-2 text-center text-green-400">
          {success}
        </div>
      )}
      {/* Error Message */}
      {error && (
        <div className="w-full mb-2 text-center text-red-600">
          {error}
        </div>
      )}
      
      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[#2A4D89] hover:bg-primary py-2 transition rounded-full font-manjari text-white mb-6"
      >
        Register and Verify Account
      </button>

      {/* Return to Login Link */}
      <div className="flex justify-center items-center text-center">
        <a
          href="/"
          className="w-full text-[#17153B] font-manjari bg-white hover:bg-gray-300 px-6 py-2 rounded-full transition duration-300 mb-6"
        >
          Return to Login
        </a>
      </div>
    </FormWrapper>
  );
}
