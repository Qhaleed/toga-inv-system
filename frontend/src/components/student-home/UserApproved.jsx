import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormWrapper from "../common/FormWrapper";
import measureInstruct from "../../assets/images/measureinstruct.png";
import LoaderAnimation from "../login-card/LoaderAnimation";

const UserApproved = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleInitial: "",
    surname: "",
    idNumber: "",
    shoulderWidth: "",
    togaSize: "",
    account_id: "",
  });
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const togaSizes = [
    "XS (17 inches)",
    "S (18 inches)",
    "M (19 inches)",
    "L (20 inches)",
    "XL (21 inches)",
    "2XL (22 inches)",
    "3XL (23 inches)",
    "4XL (24 inches)",
  ];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setFormData({
          firstName: "Guest",
          middleInitial: "",
          surname: "",
          idNumber: "",
          shoulderWidth: "",
          togaSize: "",
          account_id: "",
        });
        return;
      }
      try {
        const res = await fetch("http://localhost:5001/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          setFormData({
            firstName: "Guest",
            middleInitial: "",
            surname: "",
            idNumber: "",
            shoulderWidth: "",
            togaSize: "",
            account_id: "",
          });
          return;
        }
        const data = await res.json();
        setFormData((prev) => ({
          ...prev,
          firstName: data.first_name,
          middleInitial: data.middle_initial,
          surname: data.surname,
          idNumber: data.id_number || data.idNumber || "",
          course: data.course,
          account_id: data.account_id,
          status: data.status, // <-- add status to formData
        }));
      } catch {
        setFormData({
          firstName: "Guest",
          middleInitial: "",
          surname: "",
          idNumber: "",
          shoulderWidth: "",
          togaSize: "",
          account_id: "",
        });
      }
    };
    fetchUserDetails();
  }, []);

  const getRecommendedSize = (shoulderWidth) => {
    const width = parseFloat(shoulderWidth);
    if (isNaN(width)) return "";
    if (width < 17.5) return "XS (17 inches)";
    if (width >= 17.5 && width < 18.5) return "S (18 inches)";
    if (width >= 18.5 && width < 19.5) return "M (19 inches)";
    if (width >= 19.5 && width < 20.5) return "L (20 inches)";
    if (width >= 20.5 && width < 21.5) return "XL (21 inches)";
    if (width >= 21.5 && width < 22.5) return "2XL (22 inches)";
    if (width >= 22.5 && width < 23.5) return "3XL (23 inches)";
    if (width >= 23.5) return "4XL (24 inches)";
    return "";
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      recommendedSize: getRecommendedSize(prevData.shoulderWidth),
    }));
  }, [formData.shoulderWidth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedTogaSize = formData.togaSize
      ? formData.togaSize.split(" ")[0]
      : ""; //remove the parenthesis sa gown size
    try {
      const response = await fetch("http://localhost:5001/student-home", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gown_size: trimmedTogaSize,
          tasselColor: determineColorFromCourse(formData.course).tasselColor,
          hoodColor: determineColorFromCourse(formData.course).hoodColor,
          cap: true,
          account_id: formData.account_id,
        }),
      });
      alert(JSON.stringify(formData, null, 2));
    } catch (error) {
      console.log("Error submitting form:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTogaSizeSelect = (size) => {
    setFormData((prevData) => ({
      ...prevData,
      togaSize: size,
    }));
    setOpenDropdown(false);
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      navigate("/login");
      setIsLoggingOut(false);
    }, 1000);
  };

  // Use the same logic as determineColorFromCourse from StudentHomeCard
  const determineColorFromCourse = (course) => {
    if (!course) {
      return { tasselColor: "Blue", hoodColor: "Blue" };
    }
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
    for (const [color, courses] of Object.entries(courseGroups)) {
      if (courses.some((c) => course && course.includes(c))) {
        return { tasselColor: color, hoodColor: color };
      }
    }
    return { tasselColor: "Blue", hoodColor: "Blue" };
  };

  return (
    <>
      {isLoggingOut && <LoaderAnimation isLogin={false} />}
      <FormWrapper
        title="Toga Sizing Form"
        onSubmit={handleSubmit}
        className="register-card"
      >
        {/* STEP 1: Display fetched student details */}
        <div className="mt-4">
          <span className="text-primary text-lg sm:text-xl font-figtree font-extrabold mr-1">
            STEP 1:
          </span>
          <span className="text-white-400 text-lg sm:text-xl font-semibold mr-1">
            Review Your Details
          </span>
        </div>

        <div className="grid sm:grid-cols-[2fr_1fr] gap-4 mt-4">
          {/* First Name (readonly) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4">
            <label className="w-full sm:w-20 text-primary text-m font-manjari font-bold">
              First Name
            </label>
            <input
              type="text"
              value={formData.firstName}
              readOnly
              tabIndex={-1}
              className="w-full flex-1 bg-transparent border-b-2 border-gray-400/30 font-manjari text-white/70 focus:outline-none focus:ring-0 focus:border-gray-400/30 select-text cursor-default"
            />
          </div>
          {/* Middle Initial (readonly) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
            <label className="w-full sm:w-10 text-primary text-m font-manjari font-bold">
              M.I.
            </label>
            <input
              type="text"
              value={formData.middleInitial}
              readOnly
              tabIndex={-1}
              className="w-full flex-1 bg-transparent border-b-2 border-gray-400/30 font-manjari text-white/70 focus:outline-none focus:ring-0 focus:border-gray-400/30 select-text cursor-default"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-[2fr_1fr] gap-4 mt-4">
          {/* Surname (readonly) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4">
            <label className="w-full sm:w-20 text-primary text-m font-manjari font-bold">
              Surname
            </label>
            <input
              type="text"
              value={formData.surname}
              readOnly
              tabIndex={-1}
              className="w-full flex-1 bg-transparent border-b-2 border-gray-400/30 font-manjari text-white/70 focus:outline-none focus:ring-0 focus:border-gray-400/30 select-text cursor-default"
            />
          </div>
          {/* ID Number (readonly) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4">
            <label className="w-full sm:w-20 text-primary text-m font-manjari font-bold">
              ID Number
            </label>
            <input
              type="text"
              value={formData.idNumber}
              readOnly
              tabIndex={-1}
              className="w-full flex-1 bg-transparent border-b-2 border-gray-400/30 font-manjari text-white/70 focus:outline-none focus:ring-0 focus:border-gray-400/30 select-text cursor-default"
            />
          </div>
        </div>

        {/* Course (readonly) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 mt-4">
          <label className="w-full sm:w-20 text-primary text-m font-manjari font-bold">
            Course
          </label>
          <input
            type="text"
            value={formData.course || ""}
            readOnly
            tabIndex={-1}
            className="w-full flex-1 bg-transparent border-b-2 border-gray-400/30 font-manjari text-white/70 focus:outline-none focus:ring-0 focus:border-gray-400/30 select-text cursor-default"
          />
        </div>

        {/* STEP : Toga Measurement */}
        <div className="mt-6">
          <span className="text-primary text-lg sm:text-xl font-figtree font-extrabold mr-1">
            STEP 2:
          </span>
          <span className="text-white-400 text-lg sm:text-xl font-semibold mr-1">
            Select Your Toga Size
          </span>
        </div>

        {/* Measurement Instruction Image and Text */}
        <div className="bg-[#2A4D89] border-2 border-primary rounded-lg p-4 flex flex-col md:flex-row gap-6 mt-4 shadow-md">
          <img
            src={measureInstruct}
            alt="Shoulder Measurement Instruction"
            className="w-full md:w-1/2 h-auto rounded shadow-md border border-gray-300 object-contain bg-white"
          />
          <div className="text-white font-manjari text-base w-full md:w-1/2">
            <strong className="font-figtree text-white text-lg block mb-2">
              How to measure your shoulder width:
            </strong>
            Use a measuring tape to measure from the edge of one shoulder
            straight across to the edge of the other shoulder. Stand up straight
            and relax your shoulders for the most accurate measurement. Enter
            the value in INCHES below.
          </div>
        </div>

        {/* Shoulder Width */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 mt-4">
          <label className="w-full sm:w-32 text-primary text-m font-manjari font-bold">
            Shoulder Width
          </label>
          <input
            type="number"
            name="shoulderWidth"
            placeholder="20.5 (in inches)"
            value={formData.shoulderWidth || ""}
            onChange={handleChange}
            className="w-full flex-1 bg-transparent border-b-2 border-blue-50/50 font-manjari
                text-white placeholder-gray-300 placeholder:font-manjari
                focus:outline-none focus:border-primary transition duration-200"
          />
        </div>

        {/* Recommended Size Display */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 mt-2">
          <label className="w-full sm:w-32 text-primary text-m font-manjari font-bold">
            Recommended Size
          </label>
          <input
            type="text"
            value={formData.recommendedSize || ""}
            readOnly
            tabIndex={-1}
            className="w-full flex-1 bg-transparent border-b-2 border-gray-400/30 font-manjari text-green-300 focus:outline-none focus:ring-0 focus:border-gray-400/30 select-text cursor-default"
          />
        </div>

        {/* Toga Size Dropdown */}
        <div className="relative w-full sm:w-auto mt-4">
          <div
            onClick={() => setOpenDropdown(!openDropdown)}
            onMouseDown={(e) => e.preventDefault()}
            className="w-full flex-1 cursor-pointer bg-[#2A4D89] text-white rounded-md font-manjari
            hover:bg-primary transition duration-200 ease-in-out relative"
          >
            <div className="py-2 px-3">
              {formData.togaSize || "Select Toga Size"}
            </div>

            {/* Dropdown Arrow */}
            <div
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-white transition-transform duration-300 ${
                openDropdown ? "rotate-180" : "rotate-0"
              }`}
            >
              ▼
            </div>

            {openDropdown && (
              <div
                className="absolute z-10 mt-1 w-full bg-gray-800 text-white rounded-md shadow-lg max-h-40 overflow-y-auto border border-gray-600
                opacity-0 animate-fade-down transition-opacity duration-300"
              >
                {togaSizes.map((size) => (
                  <div
                    key={size}
                    onClick={() => handleTogaSizeSelect(size)}
                    className="px-6 py-3 hover:bg-primary hover:text-white transition duration-200 ease-in-out"
                  >
                    {size}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* STEP 3: Review Reservation */}
        <div className="mt-8">
          <span className="text-primary text-lg sm:text-xl font-figtree font-extrabold mr-1">
            STEP 3:
          </span>
          <span className="text-white-400 text-lg sm:text-xl font-semibold mr-1">
            Review Your Reservation
          </span>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          {/* Selected Gown Size (readonly) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4">
            <label className="w-full sm:w-32 text-primary text-m font-manjari font-bold">
              Gown Size
            </label>
            <input
              type="text"
              value={formData.togaSize || "Not selected"}
              readOnly
              tabIndex={-1}
              className="w-full flex-1 bg-transparent border-b-2 border-gray-400/30 font-manjari text-white/70 focus:outline-none focus:ring-0 focus:border-gray-400/30 select-text cursor-default"
            />
          </div>
          {/* Tassel Color (readonly) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4">
            <label className="w-full sm:w-32 text-primary text-m font-manjari font-bold">
              Tassel Color
            </label>
            <input
              type="text"
              value={determineColorFromCourse(formData.course).tasselColor}
              readOnly
              tabIndex={-1}
              className="w-full flex-1 bg-transparent border-b-2 border-gray-400/30 font-manjari text-white/70 focus:outline-none focus:ring-0 focus:border-gray-400/30 select-text cursor-default"
            />
          </div>
          {/* Hood Color (readonly) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4">
            <label className="w-full sm:w-32 text-primary text-m font-manjari font-bold">
              Hood Color
            </label>
            <input
              type="text"
              value={determineColorFromCourse(formData.course).hoodColor}
              readOnly
              tabIndex={-1}
              className="w-full flex-1 bg-transparent border-b-2 border-gray-400/30 font-manjari text-white/70 focus:outline-none focus:ring-0 focus:border-gray-400/30 select-text cursor-default"
            />
          </div>
          {/* Cap (readonly, always Yes) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4">
            <label className="w-full sm:w-32 text-primary text-m font-manjari font-bold">
              Cap
            </label>
            <input
              type="text"
              value="Yes"
              readOnly
              tabIndex={-1}
              className="w-full flex-1 bg-transparent border-b-2 border-gray-400/30 font-manjari text-white/70 focus:outline-none focus:ring-0 focus:border-gray-400/30 select-text cursor-default"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#2A4D89] hover:bg-primary py-2 transition rounded-full font-manjari text-white mb-6"
        >
          Submit Toga Measurement
        </button>

        {/* Return Link */}
        <div className="flex justify-center items-center text-center">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full text-[#17153B] font-manjari bg-white hover:bg-gray-300 px-6 py-2 rounded-full transition duration-300 mb-6"
          >
            Logout
          </button>
        </div>
      </FormWrapper>
    </>
  );
};

export default UserApproved;
