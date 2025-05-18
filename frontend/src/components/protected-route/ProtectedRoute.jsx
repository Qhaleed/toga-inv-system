import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isTokenExpired } from "@/lib/utils";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    // Check token expiration periodically
    const checkToken = () => {
      if (isTokenExpired(token)) {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userRole");
        window.location.href = "/";
      }
    };

    const tokenCheck = setInterval(checkToken, 60000); // Check every minute
    return () => clearInterval(tokenCheck);
  }, [token]);

  // Check if user is authenticated
  if (!token || isTokenExpired(token)) {
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
