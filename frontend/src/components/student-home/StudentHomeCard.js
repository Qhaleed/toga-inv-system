import React, { useState, useEffect } from "react";
import SideBar from "../common/SideBar";
import PendingApproval from "../userpending/UserPending";
import ApprovedView from "../userapproved/UserApproved";

const Dashboard = () => {
  const [userStatus, setUserStatus] = useState(null); // null indicates loading
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  // Example data for student status, date reserved, and date due
  const studentStatus = "Active";
  const dateReserved = "2025-05-10";
  const dateDue = "2025-05-20";

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        // Simulate pending or approved status
        const data = { status: "pending", name: "John Doe" };
        setUserStatus(data.status);
        setUserName(data.name);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserStatus("error");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#001C47] text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Main Content */}
      <div className="flex flex-col sm:flex-row h-screen w-screen bg-[#001C47]">
        <SideBar
          studentStatus={studentStatus}
          dateReserved={dateReserved}
          dateDue={dateDue}
        />
        {userStatus === "pending" && <PendingApproval name={userName} />}
        {userStatus === "approved" && <ApprovedView name={userName} />}
        {userStatus === "error" && (
          <div className="flex-1 flex justify-center items-center text-white">
            <p>Failed to load user data. Please try again later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
