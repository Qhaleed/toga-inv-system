import React from "react";
import BackIcon from "../../assets/icons/BackIcon.svg?react";
import Inventory from "../../assets/icons/white-inventory.svg?react";
import User from "../../assets/icons/white-user.svg?react";
import RightArrow from "../../assets/icons/small-arrow.svg?react";
import Pin from "../../assets/icons/white-pin.svg?react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PopupWindow = ({
  open,
  onClose,
  user,
  onDelete, // New prop for delete callback
  onUpdate, // New prop for update callback
}) => {
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    toga_size: "",
    hood_color: "",
    tassel_color: "",
    has_cap: null,
    return_status: "Not Returned",
    status: "Pending", // Add status field
  });
  const navigate = useNavigate();

  // Helper function to get dynamic return status
  const getDynamicReturnStatus = (userData) => {
    // Check if evaluation is completed (either "Completed" or "Evaluated")
    const isEvaluated = userData.evaluation_status === "Completed" || userData.evaluation_status === "Evaluated";
    
    if (isEvaluated && userData.item_condition === "Good") {
      return "Returned";
    } else if (isEvaluated && userData.item_condition && userData.item_condition !== "Good") {
      return "Returned with Issues";
    } else if (isEvaluated && !userData.item_condition) {
      // If evaluated but no item_condition specified, use the stored return_status
      return userData.return_status || "Returned";
    } else {
      return userData.return_status || "Not Returned";
    }
  };

  React.useEffect(() => {
    if (user) {
      // Get dynamic return status
      const dynamicReturnStatus = getDynamicReturnStatus(user);
      
      setFormData({
        toga_size: user.toga_size || "",
        hood_color: user.hood_color || "",
        tassel_color: user.tassel_color || "",
        has_cap: user.has_cap,
        return_status: dynamicReturnStatus,
        status: user.status || "Pending",
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
      // Check if status is changing from approved to pending - if so, reset toga size data
      const statusChangingToPending = user.status === 'approved' && formData.status === 'pending';
      
      const updatedData = {
        toga_size: statusChangingToPending ? null : formData.toga_size,
        hood_color: statusChangingToPending ? null : formData.hood_color,
        tassel_color: statusChangingToPending ? null : formData.tassel_color,
        has_cap: formData.has_cap === "Yes" ? 1 : 0,
        return_status: formData.return_status,
        status: formData.status,
      };

      console.log("Sending update to backend:", updatedData);
      if (statusChangingToPending) {
        console.log("Status changing from approved to pending - resetting toga size data");
      }

      // Update inventory
      const inventoryResponse = await fetch(
        `http://localhost:5001/inventory/${user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
          body: JSON.stringify({
            toga_size: updatedData.toga_size,
            hood_color: updatedData.hood_color,
            tassel_color: updatedData.tassel_color,
            has_cap: updatedData.has_cap,
            return_status: updatedData.return_status,
          }),
        }
      );

      if (!inventoryResponse.ok) {
        throw new Error("Failed to update inventory: " + inventoryResponse.status);
      }

      // Update account status if changed
      if (user.account_id && updatedData.status !== user.status) {
        const accountResponse = await fetch(
          `http://localhost:5001/accounts/${user.account_id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-cache",
            },
            body: JSON.stringify({
              status: updatedData.status,
            }),
          }
        );

        if (!accountResponse.ok) {
          throw new Error("Failed to update account status: " + accountResponse.status);
        }
      }

      // Update local state
      setEdit(false);
      
      // Update user object with new data for immediate UI update
      const updatedUser = {
        ...user,
        ...updatedData,
      };
      
      if (onUpdate) {
        onUpdate(updatedUser);
      }
      
      alert("Changes saved successfully!");
      
      // Close the popup and trigger parent refresh
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Failed to save changes: " + error.message);
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${user.studentname}'s records? This will remove both inventory and account records.`
      )
    ) {
      try {
        // Delete inventory record
        const inventoryResponse = await fetch(
          `http://localhost:5001/inventory/${user.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-cache",
            },
          }
        );

        if (!inventoryResponse.ok) {
          throw new Error("Failed to delete inventory: " + inventoryResponse.status);
        }

        // Delete account record if account_id exists
        if (user.account_id) {
          const accountResponse = await fetch(
            `http://localhost:5001/accounts/${user.account_id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
              },
            }
          );

          if (!accountResponse.ok) {
            throw new Error("Failed to delete account: " + accountResponse.status);
          }
        }

        alert("Records deleted successfully!");
        
        if (onDelete) {
          onDelete(user.id);
        }
        
        if (onClose) {
          onClose();
        }
      } catch (error) {
        console.error("Error deleting records:", error);
        alert("Failed to delete records: " + error.message);
      }
    }
  };

  const exitReset = () => {
    setEdit(false);
    if (user) {
      const dynamicReturnStatus = getDynamicReturnStatus(user);
      
      setFormData({
        toga_size: user.toga_size || "",
        hood_color: user.hood_color || "",
        tassel_color: user.tassel_color || "",
        has_cap: user.has_cap,
        return_status: dynamicReturnStatus,
        status: user.status || "Pending",
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

  const handleAccountStatusChange = (status) => {
    setFormData((prev) => ({
      ...prev,
      status: status,
    }));
  };

  // Dynamic return status based on evaluation
  const getReturnStatus = () => {
    return getDynamicReturnStatus(user);
  };

  if (!user) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center transition-all duration-500 ${
        open
          ? "opacity-100 pointer-events-auto backdrop-blur-sm"
          : "opacity-0 pointer-events-none"
      }`}
      style={{ background: "rgba(0,0,0,0.4)" }}
    >
      <div className="bg-[#001C47] border border-white w-full max-w-4xl max-h-[90vh] mx-4 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-600 flex-shrink-0">
            <div className="flex items-center space-x-4">
              <button
                className="w-12 h-12 bg-[#F3B51A] rounded-2xl flex justify-center items-center cursor-pointer hover:bg-[#d99f0f] hover:scale-105 transition-all duration-200"
                onClick={() => {
                  onClose();
                  exitReset();
                }}
              >
                <BackIcon className="w-5" />
              </button>
              <div className="hidden md:flex items-center space-x-2">
                <button className="border border-white px-3 py-1 rounded-md flex items-center text-white text-xs">
                  <Inventory className="w-4 mr-2" />
                  <span>Reservation</span>
                </button>
                <RightArrow className="w-3" />
                <button className="border border-white px-3 py-1 rounded-md flex items-center text-white text-xs">
                  <User className="w-5 mr-2" />
                  <span className="truncate max-w-32">{user?.studentname}</span>
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                className={`px-4 py-2 rounded-lg text-xs ${
                  !edit
                    ? "border border-green-400 text-green-400"
                    : "bg-green-400 text-white"
                } hover:bg-green-400 hover:text-white hover:scale-105 transition-all duration-200`}
                onClick={EditMode}
              >
                EDIT
              </button>
              <button
                className="border border-red-500 text-red-500 px-4 py-2 rounded-lg text-xs hover:bg-red-500 hover:text-white hover:scale-105 transition-all duration-200"
                onClick={handleDelete}
              >
                DELETE
              </button>
              <button
                className="bg-[#0C7E48] text-white px-4 py-2 rounded-lg hover:bg-[#0A6F40] hover:scale-105 transition-all duration-200"
                onClick={() => navigate("/evaluation-page")}
              >
                Evaluate
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Student Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Student Name */}
                <div>
                  <h1 className="text-white font-bold text-3xl break-words">
                    {user?.studentname}
                  </h1>
                  <h6 className="text-white font-light text-base">Student</h6>
                </div>

                {/* Basic Information */}
                <div className="space-y-3">
                  <h3 className="text-white text-lg">Basic Information</h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-4">
                      <span className="text-xs text-gray-400 font-light">FULL NAME</span>
                      <span className="text-xs text-white font-light break-words">{user?.studentname}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <span className="text-xs text-gray-400 font-light">COURSE</span>
                      <span className="text-xs text-white font-light break-words">{user?.course}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <span className="text-xs text-gray-400 font-light">EMAIL</span>
                      <span className="text-xs text-white font-light break-words">{user?.email || "N/A"}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <span className="text-xs text-gray-400 font-light">ID NUMBER</span>
                      <span className="text-xs text-white font-light">{user?.id_number}</span>
                    </div>
                  </div>
                </div>

                {/* Measurements */}
                <div className="space-y-3">
                  <h3 className="text-white text-lg">Measurements</h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <span className="text-xs text-gray-400 font-light">GOWN</span>
                      <div className="text-xs text-white font-light">
                        {!edit ? (
                          <span>{formData.toga_size}</span>
                        ) : (
                          <select
                            className="w-20 h-6 bg-[#404078] rounded text-center text-xs"
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
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <span className="text-xs text-gray-400 font-light">HOOD</span>
                      <div className="text-xs text-white font-light">
                        {!edit ? (
                          <span>{formData.hood_color}</span>
                        ) : (
                          <select
                            className="w-20 h-6 bg-[#404078] rounded text-center text-xs"
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
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <span className="text-xs text-gray-400 font-light">TASSEL</span>
                      <div className="text-xs text-white font-light">
                        {!edit ? (
                          <span>{formData.tassel_color}</span>
                        ) : (
                          <select
                            className="w-20 h-6 bg-[#404078] rounded text-center text-xs"
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
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <span className="text-xs text-gray-400 font-light">CAP</span>
                      <div className="text-xs text-white font-light">
                        {!edit ? (
                          <span>{formData.has_cap ? "Yes" : "No"}</span>
                        ) : (
                          <select
                            className="w-20 h-6 bg-[#404078] rounded text-center text-xs"
                            value={formData.has_cap ? "Yes" : "No"}
                            onChange={(e) =>
                              handleInputChange("has_cap", e.target.value === "Yes")
                            }
                          >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Status */}
                <div className="space-y-3">
                  <h3 className="text-white text-lg">Account Status</h3>
                  <div className="bg-[#40407888] p-3 rounded-xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-white text-sm min-w-fit">Status:</span>
                      <div className="flex flex-wrap gap-1">
                        {["Pending", "Approved", "Rejected"].map((status) => (
                          <button
                            key={status}
                            className={`px-3 py-1 rounded text-xs ${
                              formData.status === status
                                ? "bg-[#86E4A1] text-black"
                                : "bg-[#1B1B42] text-gray-500"
                            } ${edit ? "hover:bg-[#86E4A1] hover:text-black" : ""}`}
                            disabled={!edit}
                            onClick={() => handleAccountStatusChange(status)}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Item Status */}
                <div className="space-y-3">
                  <h3 className="text-white text-lg">Return Status</h3>
                  <div className="bg-[#40407888] p-3 rounded-xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-white text-sm min-w-fit">Status:</span>
                      <div className="flex flex-wrap gap-1">
                        <button
                          className={`px-3 py-1 rounded text-xs ${
                            getReturnStatus() === "Not Returned"
                              ? "bg-[#86E4A1] text-black"
                              : "bg-[#1B1B42] text-gray-500"
                          } ${edit && !user.evaluation_status ? "hover:bg-[#86E4A1] hover:text-black" : ""}`}
                          disabled={!edit || user.evaluation_status === "Completed" || user.evaluation_status === "Evaluated"}
                          onClick={() => handleStatusChange("Not Returned")}
                        >
                          Not Returned
                        </button>
                        <button
                          className={`px-3 py-1 rounded text-xs ${
                            getReturnStatus() === "Returned"
                              ? "bg-[#86E4A1] text-black"
                              : "bg-[#1B1B42] text-gray-500"
                          } ${edit && !user.evaluation_status ? "hover:bg-[#86E4A1] hover:text-black" : ""}`}
                          disabled={!edit || user.evaluation_status === "Completed" || user.evaluation_status === "Evaluated"}
                          onClick={() => handleStatusChange("Returned")}
                        >
                          Returned
                        </button>
                        {(user.evaluation_status === "Completed" || user.evaluation_status === "Evaluated") && user.item_condition && user.item_condition !== "Good" && (
                          <span className="px-3 py-1 rounded text-xs bg-yellow-500 text-black">
                            With Issues
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {(user.evaluation_status === "Completed" || user.evaluation_status === "Evaluated") && (
                    <p className="text-xs text-gray-400">
                      Status determined by evaluation results. 
                      {user.item_condition ? ` Item condition: ${user.item_condition}` : " Item condition: Not specified"}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column - Reservation Date & Save */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-white text-lg mb-4">Reservation Date</h3>
                  <div className="bg-[#4040783a] p-4 rounded-xl">
                    <div className="bg-[#1B1B42] p-4 rounded-lg text-center">
                      <span className="text-2xl text-white break-words">
                        {user?.dateofreservation || "N/A"}
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <Pin className="absolute -top-6 right-4 w-7" />
                  </div>
                </div>

                {edit && (
                  <div className="flex justify-end">
                    <button
                      className="bg-[#86E4A1] text-black px-6 py-2 rounded-xl hover:scale-105 hover:bg-[#57b27f] transition-all duration-200"
                      onClick={handleSave}
                    >
                      SAVE
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupWindow;
