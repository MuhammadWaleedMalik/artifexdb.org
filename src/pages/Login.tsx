import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


import useLogin from "../hooks/useLogin";

export default function Login() {
  const { login } = useLogin();
  
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Both fields are required");
      return;
    }

    try {
      if (email === "admin@artifexdb.org" && password === "@Abc123456") {
        localStorage.setItem("Admin", "Done");
        navigate("/admin");
      } else {
        const response = await login(email, password);
        if (response !== undefined) {
          localStorage.setItem("credits", response.user.credits);
          localStorage.setItem("token", response.token);
          alert("Logged in successfully!");
          navigate("/");
        } else {
          setError("Internal Error Occurred. Try Again Later.");
        }
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Google Sign-In Handler
 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-white">Login</h2>

        <p className="text-center text-gray-400 mb-6">Welcome back! Please login to your account.</p>

        {/* Google Sign-In Button */}
        {/* Divider */}
        <div className="my-4 text-center text-gray-400 relative">
          <span className="bg-gray-800 px-3 text-sm">OR</span>
          <div className="absolute top-1/2 w-full h-px bg-gray-700"></div>
        </div>

        {/* Email Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 transition duration-200"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 transition duration-200"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-400 text-sm font-semibold">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition duration-200 shadow-md"
          >
            Login
          </button>
        </form>

        {/* Sign-up Link */}
        <p className="text-center text-gray-400 mt-4">
          Don't have an account? <Link to="/signup" className="text-blue-400 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
