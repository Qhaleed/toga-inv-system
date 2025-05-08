import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/login-page/Login";
import Home from "./pages/home-page/Home";
import Register from "./pages/register-page/Register";
import AdminHome from "./pages/admin-home/AdminHome";
import AdminDashboard from "./pages/admin-dashboard/AdminDashboard";
import StudentHome from "./pages/student-home/StudentHome";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";
import "./index.css";
import "./App.css";
import Evaluation from "./pages/evaluation-page/Evaluation";
import InventoryPage from "./pages/inventory-page/InventoryPage";
import PendingPage from "./pages/pending-page/PendingPage";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes for both admin and students */}
          <Route
            element={<ProtectedRoute allowedRoles={["admin", "student"]} />}
          >
            <Route path="/home" element={<Home />} />
          </Route>

          {/* Admin only routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin-home" element={<AdminHome />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/evaluation-page" element={<Evaluation />} />
            <Route
              path="/inventory"
              element={
                <InventoryPage
                  activeTab="inventory"
                  setActiveTab={setActiveTab}
                />
              }
            />
            <Route
              path="/pending"
              element={
                <PendingPage activeTab="pending" setActiveTab={setActiveTab} />
              }
            />
          </Route>

          {/* Student only routes */}
          <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
            <Route path="/student-home" element={<StudentHome />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
