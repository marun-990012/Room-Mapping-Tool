import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react"; // For icons
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { loginValidations } from "../helpers/AuthValidations";

export default function Login() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
      email: "",
      password: "",
    });

  const [loading, setLoading] = useState(false);
  const [showPassword,setShowPassword] = useState(false);

    // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!loginValidations(formData)) return;

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3323/api/user/signin",formData);
      
      console.log("User logged in:", response.data);
      // Save token if required
      localStorage.setItem("token", response.data.token);
      const accountResponse = await axios.get("http://localhost:3323/api/user/account",{headers:{Authorization:localStorage.getItem('token')}});
      navigate(`/room-plans`);
      setFormData({email:"",password:""});
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl w-96 p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Login to your account to continue
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Extra Options */}
        <div className="mt-5 text-center">
          <p className="text-gray-600 text-sm">
            Don’t have an account?{" "}
            <Link to='/signup' className="text-blue-600 font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
