import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/loader.jsx";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import toast from "react-hot-toast";

export default function AdminToolPage(){

    const [tools, setTools] = useState([]);
    const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
    const [toolToDelete, setToolToDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    //fetch tools fromk databse...
    useEffect(() => {
        if(isLoading){
            axios.get(import.meta.env.VITE_API_URL + "/api/tools/get-tools").then((response) => {
                setTools(response.data);
                setIsLoading(false);
            });
        }
    }, [isLoading]);

    return(
        <div className="flex flex-col">
            {/* Delete confirmation popup */}
            {isDeleteConfirmVisible && (
                <ToolDeleteConfirm
                  refresh={() => setIsLoading(true)}
                  toolId={toolToDelete}
                  close={() => setIsDeleteConfirmVisible(false)}
                />
            )}

            <h1 className="text-2xl font-bold text-white mb-4">Manage Tools</h1>

            <div className="overflow-x-auto rounded-2xl shadow-lg border">
                {isLoading ? (
                    <Loader/>
                ) : (
                    <table className="w-full border-collapse">
                        <thead className="text-[#ffaa00]">
                            <tr>
                              <th className="p-3 text-left">Image</th>
                              <th className="p-3 text-left">Tool Id</th>
                              <th className="p-3 text-left">Tool Name</th>
                              <th className="p-3 text-left">Category</th>
                              <th className="p-3 text-left">Price Per Day</th>
                              <th className="p-3 text-left">Quantity</th>
                              <th className="p-3 text-left">Condition</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tools.map((tool, index) => (
                                <tr key={tool.toolId} className={`${index % 2 === 0 ? "bg-[#1a1a1a]" : "bg-[#242424]"} hover:bg-white/20`}>
                                    <td className="p-3">
                                        <img src={tool.images[0]} alt={tool.name} className="w-16 h-16 rounded-lg object-cover shadow"/>
                                    </td>
                                    <td className="p-3 font-semibold text-white">
                                        {tool.toolId}
                                    </td>
                                    <td className="p-3 font-semibold text-white">
                                        {tool.name}
                                    </td>
                                    <td className="p-3 font-semibold text-white">
                                        {tool.category}
                                    </td>
                                    <td className="p-3 font-semibold text-white">
                                        Rs. {tool.pricePerDay}
                                    </td>
                                    <td className="p-3 font-semibold text-white">
                                       {tool.quantity}
                                    </td>
                                    <td className="p-3 font-semibold text-white">
                                        {tool.condition}
                                    </td>
                                    <td className="p-3">
                                        <div className="flex justify-center gap-6">
                                            <FaRegTrashCan 
                                                size={20} 
                                                className="cursor-pointer text-red-500 hover:text-red-700 transition"
                                                onClick={() =>{
                                                     setToolToDelete(tool.toolId);
                                                     setIsDeleteConfirmVisible(true);
                                                }}
                                            />
                                            <FaEdit 
                                               size={20}
                                               className="cursor-pointer text-[#ffaa00] hover:text-[#ffcc00]/80 transition"
                                               onClick={() => {
                                                navigate("/admin/update-tool", {state: tool});
                                               }}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <Link 
               to="/admin/add-tool"
               className = "fixed right-5 bottom-5 bg-[#ffb800] hover:bg-[#ffaa00]/80 text-black p-4 rounded-full shadow-lg flex justify-center items-center cursor-pointer transition"
            >
                <IoMdAddCircleOutline size={30}/>            
            </Link>
        </div>
    )
}

//popup for confirm tool deletion...
function ToolDeleteConfirm({toolId, close, refresh}){
  function DeleteTool(){
    const token = localStorage.getItem("token");
    axios.delete(import.meta.env.VITE_API_URL + "/api/tools/" + toolId, {
        headers: {
            Authorization : "Bearer " + token
        },
    }).then(() => {
        toast.success("Tool deleted successfully");
        close();
        refresh();
    }).catch(() => {
        toast.error("Failed to delete tool");
    });
  }

  return(
    <div className="fiexd left-0 top-0 w-full h-screen bg-black/40 z-[100] flex justify-center items-center px-4">
        <div className="w-full max-w-[450px] bg-white/20 relative rounded-2xl shadow-2xl p-6">
          <IoCloseSharp 
            size={30}
            onClick={close}
            className="absolute right-3 top-3 text-red-500 hover:text-red-700 cursor-pointer"
          />
          <p className="text-center font-medium mt-6 mb-6 text-black">
            Are you sure you want to delete this tool with Id: <span className="font-semibold text-[#ffaa00]">{toolId}</span> ?
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={close}
              className="bg-[#1a1a1a] hover:bg-white/50 px-5 py-2 rounded-lg text-white transition"
            >
                Cancel
            </button>
            <button
              onClick={DeleteTool}
              className="bg-red-500 hover:bg-red-700 px-5 py-2 rounded-lg text-white transition"
            >
                Yes
            </button>
          </div>
        </div>
    </div>
  )
}