import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login-page/Login";

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
import ReservationPage from "./pages/reservation-page/Reservation";

function App() {
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
            {/* Removed /home route */}
          </Route>

          {/* Admin only routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin-home" element={<AdminHome />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/evaluation-page" element={<Evaluation />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/pending" element={<PendingPage />} />
            <Route path="/reservation" element={<ReservationPage />} />
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
