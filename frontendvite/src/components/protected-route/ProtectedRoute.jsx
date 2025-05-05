import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  // Check if user is authenticated
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Check if user has the required role
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirect to appropriate homepage based on role
    if (userRole === "admin") {
      return <Navigate to="/admin-home" replace />;
    } else {
      return <Navigate to="/student-home" replace />;
    }
  }

  // If authenticated and authorized, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
