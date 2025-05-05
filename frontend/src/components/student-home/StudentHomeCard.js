import React, { useState, useEffect } from "react";
import SideBar from "../common/SideBar";
import PendingApproval from "./UserPending";
import ApprovedView from "./UserApproved";

const Dashboard = () => {
  const [userStatus, setUserStatus] = useState(null); // null indicates loading
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

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
    <div className="h-screen w-screen flex bg-[#EBEBEB] font-figtree font-medium">
      {/* Sidebar */}
      <div className="w-1/4 h-full bg-[#001C47] text-white hidden sm:block">
        <SideBar alwaysShowOnLarge activeTab="dashboard" />
      </div>

      {/* Main Content */}
      <div className="flex-1 h-full overflow-y-auto">
        {userStatus === "pending" && <PendingApproval name={userName} />}
        {userStatus === "approved" && <ApprovedView name={userName} />}
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
