import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaHelmetSafety } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';

export default function SignupPage() {

  const [fullName, setFullName] = useState("");
  const [nic, setNic] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function signUp() {

    if(!fullName || !nic || !email || !password || !confirmPassword){
        toast.error("Please fill all the fields");
        return;
    }

    if(password !== confirmPassword){
        toast.error("Passwords do not match");
        return;
    }

    try {
        const response = await axios.post(
            import.meta.env.VITE_API_URL + "/api/users/register",
            { fullName, nic, email, password }
        );

        toast.success("Account created successfully");
        navigate("/login");

    } catch(error){
        console.error("Registration Failed:", error);

        if(error.response?.data?.message){
            toast.error(error.response.data.message);
        } else {
            toast.error("Registration failed. Try again.");
        }
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-[#242424] rounded-lg shadow-2xl p-8">
        
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-orange-600/20 rounded-full">
            <FaHelmetSafety className="h-6 w-6 text-[#f59f0a]" />
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white text-center mb-2">
          Create an Account
        </h2>
        <p className="text-sm text-gray-400 text-center mb-6">
          Sign up to start renting professional tools
        </p>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); signUp(); }}>

            <div>
                <label className="text-sm font-medium text-white block mb-2">Full Name</label>
                <input 
                   onChange={(e) => setFullName(e.target.value)}
                   type="text"
                   placeholder="Your full name"
                   className="w-full px-4 py-3 bg-[#1a1a1a] text-white border border-[#f59f0a] 
                              rounded-lg placeholder-gray-400"
                />
            </div>

            <div>
                <label className="text-sm font-medium text-white block mb-2">NIC Number</label>
                <input 
                   onChange={(e) => setNic(e.target.value)}
                   type="text"
                   placeholder="Your NIC number"
                   className="w-full px-4 py-3 bg-[#1a1a1a] text-white border border-[#f59f0a] 
                              rounded-lg placeholder-gray-400"
                />
            </div>

            <div>
                <label className="text-sm font-medium text-white block mb-2">Email</label>
                <input 
                   onChange={(e) => setEmail(e.target.value)}
                   type="email"
                   placeholder="you@example.com"
                   className="w-full px-4 py-3 bg-[#1a1a1a] text-white border border-[#f59f0a] 
                              rounded-lg placeholder-gray-400"
                />
            </div>

            <div>
                <label className="text-sm font-medium text-white block mb-2">Password</label>
                <input 
                   onChange={(e) => setPassword(e.target.value)}
                   type="password"
                   placeholder="Enter your password"
                   className="w-full px-4 py-3 bg-[#1a1a1a] text-white border border-[#f59f0a] 
                              rounded-lg placeholder-gray-400"
                />
            </div>

            <div>
                <label className="text-sm font-medium text-white block mb-2">Confirm Password</label>
                <input 
                   onChange={(e) => setConfirmPassword(e.target.value)}
                   type="password"
                   id="confirmPassword"
                   name="confirmPassword"
                   placeholder="Confirm password"
                   className="w-full px-4 py-3 bg-[#1a1a1a] text-white border border-[#f59f0a] 
                              rounded-lg placeholder-gray-400"
                />
            </div>

            <button 
               type="submit" 
               className="w-full py-3 rounded-lg text-gray-900 bg-[#f59f0a] font-medium"
            >
                Create Account 
            </button>

        </form>

        <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
            Already have an account?
            <Link to="/login" className="font-semibold text-[#f59f0a] ml-1">
              Login
            </Link>
            </p>
        </div>

      </div>
    </div>
  );
}
