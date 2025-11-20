import React from 'react';
import { FaHelmetSafety } from 'react-icons/fa6';
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';

export default function Header(){
 
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#1a1a1a] h-[70px] px-[80px] flex flex-row justify-between transperant">
      <div className="flex items-center">
        <FaHelmetSafety className="h-7 w-7 text-[#f59f0a] mr-[10px]"></FaHelmetSafety>
        <h1 className="text-[#f59f0a] text-2xl font-semibold">Build Rental</h1>
      </div>
      <div className="flex text-white font-semibold items-center gap-5">
         <Link to="/" className="hover:text-[#ffb800] transition duration-150">Home</Link>
         <Link to="/browse-tools" className="hover:text-[#ffb800] transition duration-150">Browse Tools</Link>
         <Link to="/about" className="hover:text-[#ffb800] transition duration-150">About Us</Link>
         <Link to="/contact" className="hover:text-[#ffb800] transition duration-150">Contact</Link>
      </div>
      <div className="flex items-center gap-5">
        <MdOutlineShoppingCart className="text-white text-2xl"/>
        <button onClick={() => {
          navigate("/login")
        }} className="w-[100px] rounded-xl text-white hover:text-[black] font-bold p-[10px] hover:bg-[#ffb800] border border-gray-100/20">Login</button>
        <button className="w-auto rounded-xl text-black bg-[#ffb800] hover:bg-[#ffb800]/80 p-[10px] font-bold ">Get Started</button>
      </div>
    </div>
  )
}