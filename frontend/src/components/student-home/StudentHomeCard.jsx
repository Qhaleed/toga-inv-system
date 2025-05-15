import React, { useState, useEffect } from "react";
import SideBar from "../navigations/SideBar";
import PendingApproval from "./UserPending";
import UserApproved from "./UserApproved";

const Dashboard = () => {
  const [userStatus, setUserStatus] = useState(null);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [togaSize, setTogaSize] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const authToken = localStorage.getItem("token");

        // Fetch user's basic info
        const userResponse = await fetch("http://localhost:5001/users", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const userData = await userResponse.json();
        setUserName(userData.first_name + " " + userData.surname);

        // Check toga size submission status
        const togaResponse = await fetch(
          "http://localhost:5001/inventory/check-toga-size",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const togaData = await togaResponse.json();

        if (togaData.hasSubmitted) {
          setUserStatus("approved");
          setShowForm(false);
          setTogaSize(togaData.togaSize);
        } else {
          setUserStatus("pending");
          setShowForm(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setUserStatus("error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTogaSizeSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    try {
      const authToken = localStorage.getItem("token");
      const response = await fetch("http://localhost:5001/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ toga_size: togaSize }),
      });

      if (response.ok) {
        setUserStatus("pending");
        setShowForm(false);
      }
    } catch (error) {
      console.error("Error submitting toga size:", error);
    } finally {
      setFormSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#001C47] text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-full relative grid grid-cols-1 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 sm:gap-0 sm:top-0 sm:left-0 sm:h-screen sm:w-screen">
      <div className="w-full stik sm:col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1 bg-[#001C47] text-white hidden sm:block h-full">
        <SideBar
          alwaysShowOnLarge
          activeTab="student-home"
          userStatus={userStatus}
          dateReserved="May 10, 2025"
          dateDue="May 17, 2025"
        />
      </div>

      <div className="w-full flex-1 md:col-span-3 xl:col-span-3 2xl:col-span-4 sm:col-span-3 overflow-x-auto sm:overflow-x-visible col-span-1 h-full">
        {showForm ? (
          <div className="flex flex-col items-center justify-center h-full bg-[#001C47] p-8">
            <h2 className="text-2xl text-white mb-8">Welcome {userName}</h2>
            <form onSubmit={handleTogaSizeSubmit} className="w-full max-w-md">
              <div className="mb-6">
                <label htmlFor="togaSize" className="block text-white mb-2">
                  Please select your toga size:
                </label>
                <select
                  id="togaSize"
                  value={togaSize}
                  onChange={(e) => setTogaSize(e.target.value)}
                  required
                  className="w-full p-2 rounded bg-white text-black"
                  disabled={formSubmitting}
                >
                  <option value="">Select size...</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="2XL">2XL</option>
                  <option value="3XL">3XL</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={formSubmitting}
                className="w-full bg-[#0C7E48] text-white py-2 rounded hover:bg-[#0A6F40] transition-colors disabled:opacity-50"
              >
                {formSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        ) : (
          <>
            {userStatus === "pending" && <PendingApproval name={userName} />}
            {userStatus === "approved" && <UserApproved name={userName} />}
            {userStatus === "error" && (
              <div className="flex justify-center items-center text-red-500">
                <p>Failed to load user data. Please try again later.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
