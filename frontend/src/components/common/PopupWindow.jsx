import React from "react";
import BackIcon from "../../assets/icons/BackIcon.svg?react";
import Inventory from "../../assets/icons/white-inventory.svg?react";
import User from "../../assets/icons/white-user.svg?react";
import RightArrow from "../../assets/icons/small-arrow.svg?react";
import Profile from "../../assets/images/profilepicture.jpg";
import Pin from "../../assets/icons/white-pin.svg?react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PopupWindow = ({
  open,
  onClose,
  user,
  // showBackButton,
  // onBack,
  // fullScreen,
}) => {
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    toga_size: "",
    hood_color: "",
    tassel_color: "",
    has_cap: null,
    return_status: "",
  });
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      setFormData({
        toga_size: user.toga_size || "",
        hood_color: user.hood_color || "",
        tassel_color: user.tassel_color || "",
        has_cap: user.has_cap,
        return_status: user.return_status || "Returned",
      });
    }
  }, [user, edit]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        toga_size: formData.toga_size,
        hood_color: formData.hood_color,
        tassel_color: formData.tassel_color,
        has_cap: formData.has_cap === "Yes" ? 1 : 0,
        return_status: formData.return_status,
      };

      console.log("Sending update to backend:", updatedData);

      const response = await fetch(
        `http://localhost:5001/inventory/${user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.status);
      }

      const data = await response.json();
      console.log("Update successful:", data);

      // Refetch the latest data
      const refetchResponse = await fetch("http://localhost:5001/inventory");
      const refetchedData = await refetchResponse.json();

      // Update the local state with the new data
      setEdit(false);
      if (onClose) {
        // Pass the updated and refetched data back to the parent component
        onClose(refetchedData);
      }
      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Failed to save changes: " + error.message);
    }
  };

  const exitReset = () => {
    setEdit(false);
    if (user) {
      setFormData({
        toga_size: user.toga_size || "",
        hood_color: user.hood_color || "",
        tassel_color: user.tassel_color || "",
        has_cap: user.has_cap,
        return_status: user.return_status || "Returned",
      });
    }
  };

  const EditMode = () => {
    setEdit((prev) => !prev);
  };

  const handleStatusChange = (status) => {
    setFormData((prev) => ({
      ...prev,
      return_status: status,
    }));
  };

  return (
    <div
      className={`fixed left-0 top-0 right-0 bottom-0 z-[9999] w-full h-full flex justify-center items-center transition-all duration-500 ${open
        ? "opacity-100 pointer-events-auto backdrop-blur-sm"
        : "opacity-0 pointer-events-none"
        }`}
      style={{ background: "rgba(0,0,0,0.4)" }}
    >
      <div className="bg-[#001C47] border border-white w-[450px] md:w-3xl h-[630px] rounded-2xl shadow-2xl p-0 relative animate-slide-up overflow-x-hidden overflow-auto transition-all duration-300">
        <div className="h-12 w-full flex justify-between mt-6">
          <div className="h-full w-96 flex justify-start ml-3 ">
            <div className="h-full w-16 flex justify-end items-center ml-2">
              <button
                className="w-12 h-12 bg-[#F3B51A] rounded-2xl flex justify-center items-center mr-2 cursor-pointer hover:bg-[#d99f0f] hover:scale-105 transition-all duration-200"
                onClick={() => {
                  onClose();
                  exitReset();
                }}
              >
                <BackIcon className="w-5" />
              </button>
            </div>
            <div className="h-full w-32 hidden md:flex justify-center items-center">
              <button className="border border-white w-28 h-6 rounded-md flex justify-center items-center text-white text-[10px]">
                <Inventory className="w-4 mr-2" />
                <h5>Reservation</h5>
              </button>
            </div>
            <div className="h-full w-3 hidden md:flex justify-center items-center">
              <RightArrow className="w-3" />
            </div>
            <div className="h-full w-fit pl-2 hidden md:flex justify-center items-center">
              <button className="border border-white w-fit px-2 h-6 rounded-md flex justify-center items-center text-white text-[10px]">
                <User className="w-5 mr-2" />
                <h5>{user.studentname}</h5>
              </button>
            </div>
          </div>
          <div className="h-full w-80 flex justify-end items-center">
            <div className="h-full w-24 flex justify-center items-center text-sm pr-1">
              <button
                className={`w-20 h-10 rounded-lg text-xs ${!edit
                  ? "border border-green-400 text-green-400"
                  : "bg-green-400 text-white"
                  } hover:bg-green-400 hover:text-white hover:scale-105 transition-all duration-200`}
                onClick={EditMode}
              >
                <h3>EDIT</h3>
              </button>
            </div>
            <div className="h-full w-24 flex justify-center items-center text-sm pr-2">
              <button className="border border-red-500 text-red-500 w-20 h-10 rounded-lg text-xs hover:bg-red-500 hover:text-white hover:scale-105 transition-all duration-200">
                <h3>DELETE</h3>
              </button>
            </div>
            <div className="ps-2 h-10 w-28 border-l-2 flex justify-center items-center border-gray-500 mr-7 text-sm">
              <button
                className="bg-[#0C7E48] text-white w-24 h-8 rounded-lg hover:bg-[#0A6F40] hover:scale-105 transition-all duration-200"
                onClick={() => navigate("/evaluation-page")}
              >
                <h3>Evaluate</h3>
              </button>
            </div>
          </div>
        </div>
        <div className="w-full h-[545px] mt-1 grid grid-cols-1 md:grid-cols-5">
          <div className="col-span-1 md:col-span-3 w-full h-full">
            <div className="w-full h-28 flex justify-start items-center">
              <div className="w-full h-full">
                <div className="h-[57%] w-full flex justify-start items-end">
                  <h1 className="text-white font-figtree-extrabold text-[35px] ml-12">
                    {user.studentname}
                  </h1>
                </div>
                <div className="h-[43%] w-full">
                  <h6 className="text-white font-light text-base ml-12">
                    Student
                  </h6>
                </div>
              </div>
            </div>
            <div className="w-full h-[176px]">
              <div className="w-full h-12 flex items-center">
                <h3 className="text-white text-lg ml-12 mt-2">
                  Basic Information
                </h3>
              </div>
              <div className="w-full h-8 flex justify-center">
                <div className="w-3/8 h-full flex items-center text-xs text-gray-400 font-extralight">
                  <h3>FULL NAME</h3>
                </div>
                <div className="w-3/8 h-full flex items-center text-xs text-white font-extralight">
                  <h3>{user.studentname}</h3>
                </div>
              </div>
              <div className="w-full h-8 flex justify-center">
                <div className="w-3/8 h-full flex items-center text-xs text-gray-400 font-extralight">
                  <h3>COURSE</h3>
                </div>
                <div className="w-3/8 h-full flex items-center text-xs text-white font-extralight">
                  <h3>{user.course}</h3>
                </div>
              </div>
              <div className="w-full h-8 flex justify-center">
                <div className="w-3/8 h-full flex items-center text-xs text-gray-400 font-extralight">
                  <h3>EMAIL</h3>
                </div>
                <div className="w-3/8 h-full flex items-center text-xs text-white font-extralight">
                  <h3>{user.email || "N/A"}</h3>
                </div>
              </div>
              <div className="w-full h-8 flex justify-center">
                <div className="w-3/8 h-full flex items-center text-xs text-gray-400 font-extralight">
                  <h3>ID NUMBER</h3>
                </div>
                <div className="w-3/8 h-full flex items-center text-xs text-white font-extralight">
                  <h3>{user.id_number}</h3>
                </div>
              </div>
            </div>
            <div className="w-full h-[176px]">
              <div className="w-full h-12 flex items-center">
                <h3 className="text-white text-lg ml-12 mt-2">Measurements</h3>
              </div>
              <div className="w-full h-8 flex justify-center">
                <div className="w-3/8 h-full flex items-center text-xs text-gray-400 font-extralight">
                  <h3>GOWN</h3>
                </div>
                <div className="w-3/8 h-full flex items-center text-xs text-white font-extralight">
                  {!edit ? (
                    <h3>{formData.toga_size}</h3>
                  ) : (
                    <select
                      className="w-20 h-5 bg-[#404078] rounded-full text-center"
                      value={formData.toga_size}
                      onChange={(e) =>
                        handleInputChange("toga_size", e.target.value)
                      }
                    >
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="2XL">2XL</option>
                      <option value="3XL">3XL</option>
                    </select>
                  )}
                </div>
              </div>
              <div className="w-full h-8 flex justify-center">
                <div className="w-3/8 h-full flex items-center text-xs text-gray-400 font-extralight">
                  <h3>HOOD</h3>
                </div>
                <div className="w-3/8 h-full flex items-center text-xs text-white font-extralight">
                  {!edit ? (
                    <h3>{formData.hood_color}</h3>
                  ) : (
                    <select
                      className="w-20 h-5 bg-[#404078] rounded-full text-center"
                      value={formData.hood_color}
                      onChange={(e) =>
                        handleInputChange("hood_color", e.target.value)
                      }
                    >
                      <option value="Blue">Blue</option>
                      <option value="Maroon">Maroon</option>
                      <option value="Orange">Orange</option>
                      <option value="White">White</option>
                      <option value="Yellow">Yellow</option>
                    </select>
                  )}
                </div>
              </div>
              <div className="w-full h-8 flex justify-center">
                <div className="w-3/8 h-full flex items-center text-xs text-gray-400 font-extralight">
                  <h3>TASSEL</h3>
                </div>
                <div className="w-3/8 h-full flex items-center text-xs text-white font-extralight">
                  {!edit ? (
                    <h3>{formData.tassel_color}</h3>
                  ) : (
                    <select
                      className="w-20 h-5 bg-[#404078] rounded-full text-center"
                      value={formData.tassel_color}
                      onChange={(e) =>
                        handleInputChange("tassel_color", e.target.value)
                      }
                    >
                      <option value="Blue">Blue</option>
                      <option value="Maroon">Maroon</option>
                      <option value="Orange">Orange</option>
                      <option value="White">White</option>
                      <option value="Yellow">Yellow</option>
                    </select>
                  )}
                </div>
              </div>
              <div className="w-full h-8 flex justify-center">
                <div className="w-3/8 h-full flex items-center text-xs text-gray-400 font-extralight">
                  <h3>CAP</h3>
                </div>
                <div className="w-3/8 h-full flex items-center text-xs text-white font-extralight">
                  {!edit ? (
                    <h3>{formData.has_cap ? "Yes" : "No"}</h3>
                  ) : (
                    <select
                      className="w-20 h-5 bg-[#404078] rounded-full text-center"
                      value={formData.has_cap ? "Yes" : "No"}
                      onChange={(e) =>
                        handleInputChange(
                          "has_cap",
                          e.target.value === "Yes"
                        )
                      }
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  )}
                </div>
              </div>
            </div>
            <div
              className={`h-20 w-full flex justify-center items-center ${!edit && "opacity-50"
                }`}
            >
              <div className="bg-[#40407888] h-[45px] w-[85%] rounded-2xl flex justify-start items-center">
                <div className="h-6 w-32 border-r-2 border-gray-400 flex justify-start items-center text-white text-lg">
                  <h1 className="ml-5">Item Status</h1>
                </div>
                <div className="bg-[#1B1B42] w-50 h-8 ml-6 rounded-lg flex justify-center items-center">
                  <button
                    className={`${formData.return_status === "Borrowed"
                      ? "bg-[#86E4A1] w-[55%] h-[75%] ml-1 rounded-md text-black text-sm"
                      : "bg-[#1B1B42] w-[45%] h-[75%] mr-1 rounded-md text-gray-500 text-sm"
                      }`}
                    disabled={!edit}
                    onClick={() => handleStatusChange("Borrowed")}
                  >
                    <h4>Borrowed</h4>
                  </button>
                  <button
                    className={`${formData.return_status === "Returned"
                      ? "bg-[#86E4A1] w-[55%] h-[75%] mr-1 rounded-md text-black text-sm"
                      : "bg-[#1B1B42] w-[45%] h-[75%] ml-1 rounded-md text-gray-500 text-sm"
                      }`}
                    disabled={!edit}
                    onClick={() => handleStatusChange("Returned")}
                  >
                    <h4>Returned</h4>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 md:col-span-2 w-full h-full">
            <div className="w-full h-52 md:mt-20 flex items-center md:items-start flex-col">
              <div className="w-full h-12 text-white flex items-center justify-center md:justify-start text-lg">
                <h3>Reservation Date</h3>
              </div>
              <div className="w-64 h-32 bg-[#4040783a] rounded-2xl flex justify-center items-center">
                <div className="w-56 h-24 bg-[#1B1B42] rounded-xl flex justify-center items-center text-4xl text-white">
                  {user.dateofreservation || "N/A"}
                </div>
              </div>
              <div className="relative">
                <Pin className="absolute bottom-28 left-28 md:left-60 w-7" />
              </div>
            </div>
            <div
              className={`w-full h-20 flex justify-end items-center ${!edit && "hidden"
                }`}
            >
              <button
                className="w-28 h-10 bg-[#86E4A1] mr-8 rounded-2xl text-black text-lg hover:scale-105 hover:bg-[#57b27f] transition-all duration-200"
                onClick={handleSave}
              >
                SAVE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupWindow;
