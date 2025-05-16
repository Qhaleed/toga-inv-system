import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormWrapper from "../common/FormWrapper";

const UserApproved = () => {
  const [firstName, setFirstName] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    middleInitial: "",
    surname: "",
    idNumber: "",
    shoulderWidth: "",
    togaSize: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setFormData({
        firstName: "Guest",
        middleInitial: "",
        surname: "",
        idNumber: "",
      });
      return;
    }

    fetch("http://localhost:5001/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          setFormData({
            firstName: "Guest",
            middleInitial: "",
            surname: "",
            idNumber: "",
          });
          return;
        }
        const data = await res.json();
        setFormData({
          firstName: data.first_name || "",
          middleInitial: data.middle_initial || "",
          surname: data.surname || "",
          idNumber: data.id_number || "",
        });
      })
      .catch(() => {
        setFormData({
          firstName: "Guest",
          middleInitial: "",
          surname: "",
          idNumber: "",
        });
      });
  }, []);

  const getRecommendedSize = (shoulderWidth) => {
    if (shoulderWidth < 40) return "XS";
    if (shoulderWidth >= 40 && shoulderWidth < 45) return "S";
    if (shoulderWidth >= 45 && shoulderWidth < 50) return "M";
    if (shoulderWidth >= 50 && shoulderWidth < 55) return "L";
    if (shoulderWidth >= 55) return "XL";
    return ""; // Default if no valid input
  };

  useEffect(() => {
    const recommendedSize = getRecommendedSize(formData.shoulderWidth);
    setFormData((prevData) => ({
      ...prevData,
      recommendedSize,
    }));
  }, [formData.shoulderWidth]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <FormWrapper
      title="Toga Sizing Form"
      onSubmit={handleSubmit}
      className="register-card"
    >
      {/* STEP 2: Display fetched student details */}
      <div className="mt-4">
        <span className="text-primary text-lg sm:text-xl font-figtree font-extrabold mr-1">
          STEP 2:
        </span>
        <span className="text-white-400 text-lg sm:text-xl font-semibold mr-1">
          Verify Your Details
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
            className="w-full flex-1 bg-transparent border-b-2 border-gray-400/30 font-manjari text-white/70"
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
            className="w-full flex-1 bg-transparent border-b-2 border-gray-400/30 font-manjari text-white/70"
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
            className="w-full flex-1 bg-transparent border-b-2 border-gray-400/30 font-manjari text-white/70"
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
            className="w-full flex-1 bg-transparent border-b-2 border-gray-400/30 font-manjari text-white/70"
          />
        </div>
      </div>

      {/* STEP 3: Toga Measurement */}
      <div className="mt-6">
        <span className="text-primary text-lg sm:text-xl font-figtree font-extrabold mr-1">
          STEP 3:
        </span>
        <span className="text-white-400 text-lg sm:text-xl font-semibold mr-1">
          Enter Your Toga Measurement
        </span>
      </div>

      {/* Shoulder Width */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 mt-4">
        <label className="w-full sm:w-32 text-primary text-m font-manjari font-bold">
          Shoulder Width
        </label>
        <input
          type="number"
          name="shoulderWidth"
          placeholder="In centimeters"
          value={formData.shoulderWidth}
          onChange={handleChange}
          className="w-full flex-1 bg-transparent border-b-2 border-blue-50/50 font-manjari
                text-white placeholder-gray-300 placeholder:font-manjari
                focus:outline-none focus:border-primary transition duration-200"
        />
      </div>

      {/* Toga Size Dropdown */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 mt-4">
        <label className="w-full sm:w-32 text-primary text-m font-manjari font-bold">
          Toga Size
        </label>
        <select
          name="togaSize"
          value={formData.togaSize}
          onChange={handleChange}
          className="w-full flex-1 bg-[#2A4D89] text-white font-manjari rounded-md px-3 py-2
                focus:outline-none focus:ring-2 focus:ring-primary transition"
        >
          <option value="">Select size</option>
          <option value="XS">Extra Small</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
          <option value="XL">Extra Large</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[#2A4D89] hover:bg-primary py-2 mt-6 transition rounded-full font-manjari text-white mb-6"
      >
        Submit Toga Measurement
      </button>

      {/* Return Link */}
      <div className="flex justify-center items-center text-center">
        <a
          href="/"
          className="w-full text-[#17153B] font-manjari bg-white hover:bg-gray-300 px-6 py-2 rounded-full transition duration-300 mb-6"
        >
          Return to Dashboard
        </a>
      </div>
    </FormWrapper>
  );
};

export default UserApproved;
