import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminHomeCard() {
  const [username, setUsername] = useState("Admin");
  const navigate = useNavigate();

  // Simulate fetching admin data
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const email = localStorage.getItem("userEmail");
    if (email) {
      setUsername(email.split("@")[0]);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <div className=" min-h-screen p-4 bg-linear-primary ">
      <div className="bg-white opacity-100` rounded-lg shadow-md p-10 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center">
            <span className="mr-4">Welcome, {username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <h3 className="font-medium">Total Items</h3>
            <p className="text-2xl font-bold">250</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <h3 className="font-medium">Items Checked Out</h3>
            <p className="text-2xl font-bold">75</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <h3 className="font-medium">Pending Requests</h3>
            <p className="text-2xl font-bold">12</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <h3 className="font-medium">Low Stock Items</h3>
            <p className="text-2xl font-bold">8</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-medium mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded">
                Add Item
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white p-3 rounded">
                Manage Users
              </button>
              <button className="bg-purple-500 hover:bg-purple-600 text-white p-3 rounded">
                Review Requests
              </button>
              <button
                onClick={() => navigate("/admin-dashboard")}
                className="bg-gray-700 hover:bg-gray-800 text-white p-3 rounded"
              >
                Full Dashboard
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-4">Recent Activity</h2>
            <ul className="space-y-2">
              <li className="border-l-4 border-green-500 pl-3 py-1">
                Student John D. checked out laptops
              </li>
              <li className="border-l-4 border-blue-500 pl-3 py-1">
                New inventory: 25 USB drives
              </li>
              <li className="border-l-4 border-yellow-500 pl-3 py-1">
                Equipment request for Lab 103
              </li>
              <li className="border-l-4 border-red-500 pl-3 py-1">
                Low stock: Projector bulbs
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHomeCard;
