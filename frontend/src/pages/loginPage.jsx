import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react'; // Example icons, you'll need to install 'lucide-react'
import { FaHelmetSafety } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
// You might need to install lucide-react: npm install lucide-react

export default function LoginPage(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function login(e){
        e.preventDefault(); 
        try{
          const response = await axios.post(import.meta.env.VITE_API_URL + "/api/users/login", 
          {email, password}
        );
          localStorage.setItem("token", response.data.token);
          toast.success("Login Successful");

          const user = response.data.user;
        if(user.role === "admin"){
            navigate("/admin");
        } else{
            navigate("/");
        }
        } catch(error){
          console.error("Login failed:", error);
          toast.error("Login Failed. Please check your credentials.");
        }
    }

  return (
    // Full screen container with dark background
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
      
      {/* Login Card Container */}
      <div className="w-full max-w-md bg-[#242424] rounded-lg shadow-2xl p-6 sm:p-8 md:p-10">
        
        {/* Logo/Icon Area */}
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-orange-600/20 rounded-full">
            <FaHelmetSafety className="h-6 w-6 text-[#f59f0a]" />
          </div>
        </div>
        
        {/* Header Text */}
        <h2 className="text-xl font-semibold text-white text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-400 text-center mb-6">
          Sign in to your account to continue.
        </p>
        
        {/* Form */}
        <form className="space-y-6" onSubmit={login}>
          
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="text-sm font-medium text-white block mb-2">
              Email
            </label>
            <div className="relative">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-[#1a1a1a]  text-white border border-[#f59f0a] rounded-lg  placeholder-gray-400"
                required
              />
              <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="text-sm font-medium text-white block mb-2">
              Password
            </label>
            <div className="relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-[#1a1a1a]  text-white border border-[#f59f0a] rounded-lg placeholder-gray-500"
                required
              />
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          {/* Forgot Password Link */}
          <div className="text-left">
            <Link 
              to="/forgot-password" 
              className="text-sm text-[#f59f0a] hover:text-[#f59f0a] transition duration-150 ease-in-out font-medium"
            >
              Forgot password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-gray-900 bg-[#f59f0a] hover:bg-[#f59f0a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 focus:ring-offset-gray-900 transition duration-150 ease-in-out"
          >
            Sign In
          </button>
        </form>

        {/* Separator and Sign Up/Admin Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400 mb-4">
            Don't have an account? 
            <Link 
              to="/signup" 
              className="font-semibold text-[#f59f0a] hover:text-[#f59f0a] ml-1 transition duration-150 ease-in-out"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
