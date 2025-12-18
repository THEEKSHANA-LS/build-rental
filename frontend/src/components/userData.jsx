import React, { useEffect, useState } from "react";
import Loader from "./loader.jsx";
import { useNavigate } from "react-router-dom";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import axios from "axios";

export default function UserData(){

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(token){
            axios.get(import.meta.env.VITE_API_URL + "/api/users/me", {
                headers: {
                    Authorization : "Bearer " + token,
                },
            })
            .then((res) => setUser(res.data))
            .catch(() => {
                localStorage.removeItem("token");
                setUser(null);
            })
            .finally(() => setLoading(false));
        } else{
            setLoading(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    const handleNavigate = (path) => {
        setIsDropDownOpen(false);
        navigate(path);
    };

    return(
        <div className="relative flex justify-center items-center py-2">
            {loading && <Loader/>}

            {/* Logout Confirmation */}
            {isLogoutConfirmOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
                 <div className="bg-white w-full max-w-[320px] rounded-xl shadow-lg p-5 text-center animate-fadeIn">
                   <h3 className="text-base font-semibold text-gray-800 mb-4">
                       Are you sure you want to logout ? 
                   </h3>
                   <div className="flex justify-center gap-3 mt-3">
                    <button 
                       className="bg-red-500 hover:bg-red-700 px-5 py-2 rounded-lg text-white transition" 
                       onClick = {handleLogout}  
                    >
                     Yes
                    </button> 
                    <button
                      className="bg-[#1a1a1a] hover:bg-gray-600/50 px-5 py-2 rounded-lg text-white transition"
                      onClick={() => setIsLogoutConfirmOpen(false)}
                    >
                      Cancel
                    </button>
                   </div>
                 </div>
                </div>
            )}

            {/* User Info */}
            {!loading && user && (
                <div className="relative flex items-center gap-2">
                    <img 
                      src = {user.image || "/default-user-icon.jpg"}
                      alt = "User"
                      className="W-[36px] h-[36px] rounded-full border-2 border-accent cursor-pointer object-cover"
                      onClick={() => setIsDropDownOpen(!isDropDownOpen)}
                    />
                    <span 
                      className="text-[#f59f0a] text-sm font-medium cursor-pointer truncate max-w-[100px]" 
                      onClick={() => setIsDropDownOpen(!isDropDownOpen)}
                    >
                        {user.name}
                    </span>

                    {/* Dropdown Menu */}
                    {isDropDownOpen && (
                        <>
                          <div className="absolute top-[48px] right-0 w-[180px] bg-white border border-gray-200 rounded-lg shadow-lg z-40 overflow-hidden animate-fadeIin">
                             <button
                               onClick={() => handleNavigate("/my-orders")}
                               className="flex items-center w-full px-4 p-[4px] text-sm text-gray-700 hover:bg-gray-100"
                             >
                               <MdOutlineAccountCircle className="mr-2 text-gray-500 text-lg"/>
                                 My Orders
                             </button>
                             <button
                               onClick={() => setIsLogoutConfirmOpen(true)}
                               className="flex items-center w-full px-4 p-[4px] text-sm text-gray-700 hover:bg-gray-100"
                             >
                               <IoLogOutOutline className="mr-2 text-gray-500 text-lg"/>
                                  Logout
                             </button>
                          </div>
                        </>
                    )}
                </div>
            )}

            {/*If No user*/}
            {!loading && !user && (
                <button 
                  onClick={() => {
                    navigate("/login")
                  }} 
                  className="w-[100px] rounded-xl text-white hover:text-[black] font-bold p-[10px] hover:bg-[#ffb800] border border-gray-100/20"
                >
                    Login
                </button>
            )}
            </div>
    );
}