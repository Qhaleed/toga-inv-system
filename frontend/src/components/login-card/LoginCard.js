import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginCard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userRole', data.role);

        // Redirect based on role retrieved from the server
        if (data.role === 'admin') {
          navigate('/admin-home');
        } else {
          navigate('/student-home');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">Welcome Back 👋</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="accent-indigo-500"
              />
              Remember me
            </label>
            <a href="#" className="text-indigo-500 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl transition duration-300"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        <div className="text-center mt-4">
          <a href="/register" className="text-indigo-500 hover:underline">
            Register
          </a>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, type, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default LoginCard;
