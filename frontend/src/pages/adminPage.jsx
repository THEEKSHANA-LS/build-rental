import React from 'react';
import { FaHelmetSafety } from 'react-icons/fa6';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { LiaToolsSolid } from "react-icons/lia";
import { Link, Route, Routes } from 'react-router-dom';
import { FaCoins } from "react-icons/fa";
import AdminToolPage from './admin/adminToolPage.jsx';
import AdminOrderPage from './admin/adminOrderPage.jsx';
import AdminAddNewTool from './admin/adminAddNewTool.jsx';
import AdminUpdateTool from './admin/adminUpdateTool.jsx';
import AdminUserPage from './admin/adminUserPage.jsx';

export default function AdminPage (){
  return (
    <div className="w-full h-screen flex">
    <div className="w-[350px] min-h-screen bg-[#1a1a1a] border border-hidden shadow-lg flex flex-col">
      <div className="flex flex-row items-center p-[20px]">
        <FaHelmetSafety className="h-7 w-7 text-[#f59f0a] mr-[10px]"></FaHelmetSafety>
        <h1 className="text-[#f59f0a] text-2xl font-semibold">Build Rental Admin</h1>
      </div>
      <div className="flex flex-col items-center mt-[20px]">
        <Link to="/admin" className="w-full flex  justify-start items-center p-[20px] hover:bg-[#242424] text-white text-xl font-semibold gap-3">
         <MdOutlineSpaceDashboard size={20} className="font-semibold"/>
          Dashboard
        </Link>
        <Link to="/admin/tools" className="w-full flex items-center p-[20px] hover:bg-[#242424] text-white text-xl font-semibold gap-3">
        <LiaToolsSolid size={20} className="font-semibold"/>
          Tools
        </Link>
        <Link to="/admin/orders" className="w-full flex items-center p-[20px] hover:bg-[#242424] text-white text-xl font-semibold gap-3">
        <FaCoins size={20} className="font-semibold"/>
          Orders
        </Link>
        <Link to="/admin/users" className="w-full flex items-center p-[20px] hover:bg-[#242424] text-white text-xl font-semibold gap-3">
        <LuUsers size={20} className="font-semibold"/>
          Users
        </Link>
      </div>
    </div>
    <div className="w-[calc(100%-350px)] bg-[#242424] p-[20px]">
    <Routes>
        <Route path="/" element={<h1 className="font-bold text-white">Admin Dashboard</h1>}/>
        <Route path="/tools" element={<AdminToolPage/>}/>
        <Route path="/orders" element={<AdminOrderPage/>}/>
        <Route path="/users" element={<AdminUserPage/>}/>
        <Route path="/add-tool" element={<AdminAddNewTool/>}/>
        <Route path="/update-tool" element={<AdminUpdateTool/>}/>
    </Routes>
    </div>
    </div>
  )
}
