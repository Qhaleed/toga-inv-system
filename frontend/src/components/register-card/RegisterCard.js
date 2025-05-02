import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import UploadIcon from "../../assets/images/cloudupload.png";
import FormWrapper from "../common/FormWrapper";

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
  const options = ["Bruh", "Pluh", "Guh"];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Form Submitted");
  };

  return (
    <FormWrapper
      title="Register and validate your account"
      onSubmit={handleSubmit}
      className="register-card"
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 relative mb-6">
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
            className="w-full flex-1 bg-white bg-opacity-0 border-b-2 border-white border-opacity-50 rounded-sm font-manjari
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
            className="w-full flex-1 bg-white bg-opacity-0 border-b-2 border-white border-opacity-50 rounded-sm font-manjari
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

      <div className="mt-4">
        {/* Course */}
        <div className="relative w-full sm:w-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4">
            <label className="w-full sm:w-20 text-primary text-m font-manjari font-bold">
              Course
            </label>

            <div
              onClick={() => setOpen(!open)}
              className="w-full flex-1 cursor-pointer bg-[#2A4D89] text-white border-b-2 border-gray-600 rounded-md font-manjari
                hover:bg-gray-700 transition duration-200 ease-in-out relative"
            >
              <div className="py-2 px-3">{value || "Select"}</div>

              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-white">
                ▼
              </div>

              {open && (
                <div className="absolute z-10 mt-1 w-full bg-gray-800 text-white rounded-md shadow-lg max-h-40 overflow-y-auto border border-gray-600">
                  {options.map((opt) => (
                    <div
                      key={opt}
                      onClick={() => {
                        setValue(opt);
                        setOpen(false);
                      }}
                      className="px-6 py-3 hover:bg-primary hover:text-white transition"
                    >
                      {opt}
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
      <div
        className="mt-3 w-full group p-4 sm:p-6 text-center cursor-pointer bg-gradient-to-b from-[#112047] to-[#2A4D89] rounded-[30px] transition-all duration-300 ease-in-out hover:opacity-100"
        onDrop={handleImageChange}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="border-2 border-dashed border-white border-opacity-50 rounded-[20px] p-4 sm:p-6">
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
              className="mx-auto transition-transform ease-in-out duration-300 group-hover:scale-110"
            />
            <p className="text-sm mt-2 font-manjari text-white-400">
              Drag your images here or upload from computer
            </p>
            <button
              type="button"
              className="font-manjari font-bold mt-2 px-4 pt-1 bg-white text-black rounded-full text-sm transition hover:bg-gray-300"
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

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[#2A4D89] hover:bg-primary py-2 transition rounded-full font-manjari text-white"
      >
        Register and Verify Account
      </button>
    </FormWrapper>
  );
}
