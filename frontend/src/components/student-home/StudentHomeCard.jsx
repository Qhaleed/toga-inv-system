import React, { useState, useEffect } from "react";
import SideBar from "../navigations/SideBar";
import PendingApproval from "./UserPending";
import ApprovedView from "./UserApproved";

const Dashboard = () => {
  const [userStatus, setUserStatus] = useState(null); // null indicates loading
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState(null); // null indicates loading
  const [dateReserved, setDateReserved] = useState(null);
  const [dateDue, setDateDue] = useState(null);
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
    <div className="max-w-full relative grid grid-cols-1 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 sm:gap-0 sm:top-0 sm:left-0 sm:h-screen sm:w-screen">
      {/* Sidebar */}
      <div className="w-full stik sm:col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1 bg-[#001C47] text-white hidden sm:block h-full">
        <SideBar
          alwaysShowOnLarge
          activeTab="student-home"
          userStatus={userStatus}
          dateReserved="May 10, 2025" // Or some real value
          dateDue="May 17, 2025" // Or some real value
        />
      </div>

      {/* Main Content */}
      <div className="w-full flex-1 md:col-span-3 xl:col-span-3 2xl:col-span-4 sm:col-span-3 overflow-x-auto sm:overflow-x-visible col-span-1 h-full">
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
