import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login-page/Login';
import Home from './pages/home-page/Home';
import Register from './pages/register-page/Register';
import AdminHome from './pages/admin-home/AdminHome';
import AdminDashboard from './pages/admin-dashboard/AdminDashboard';
import StudentHome from './pages/student-home/StudentHome';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/student-home" element={<StudentHome />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;