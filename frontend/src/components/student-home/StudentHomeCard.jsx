import React, { useState, useEffect } from "react";
import SideBar from "../navigations/SideBar";
import UserPending from "./UserPending";
import UserApproved from "./UserApproved";

const Dashboard = () => {
  const [userStatus, setUserStatus] = useState(null);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const authToken = localStorage.getItem("token");
        // There is no users
        const userResponse = await fetch("http://localhost:5001/users", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const userData = await userResponse.json();
        
        setUserName(userData.first_name + " " + userData.surname);
        setUserStatus(userData.status); // Use DB status directly
        setUserData(userData); // Store full user data
      } catch (error) {
        console.error("Error fetching data:", error);
        setUserStatus("error");
      } finally {
        setLoading(false);  
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#001C47] text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div
      className={`w-screen h-screen overflow-hidden grid grid-rows-1 md:grid-rows-1 transition-transform duration-500 ease-in-out md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr] 2xl:grid-cols-[400px_1fr]`}
    >
      {/* Sidebar: left on desktop, hidden on mobile */}
      <div className="max-md:hidden md:block w-full relative transition-transform duration-500 ease-in-out">
        <SideBar
          alwaysShowOnLarge
          activeTab="student-home"
          userStatus={userStatus}
          dateReserved="May 10, 2025"
          dateDue="May 17, 2025"
        />
      </div>
      {/* Main content */}
      <div className="bg-[#F3F9FF] w-full h-full flex flex-col">
<<<<<<< HEAD
        {userStatus === "pending" && userData && <UserPending userData={userData} />}
        {userStatus === "approved" && <UserApproved name={userName} />}
=======
        {userStatus === "pending" && userData && <UserApproved userData={userData} />}
        {userStatus === "Approved" && <UserApproved name={userName} />}
>>>>>>> e734b50 (Hardcoded 'xs' at AddStockPopup on onsubmit,)
        {userStatus === "error" && (
          <div className="flex justify-center items-center text-red-500">
            <p>Failed to load user data. Please try again later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
