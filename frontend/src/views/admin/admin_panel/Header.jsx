import "../../../css/header_style.css";
import { useNavigate, useNavigate } from "react-router-dom";
import { FaEnvelope, FaBell } from "react-icons/fa";
import { useUser } from "../../../context/UserContext";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const { user } = useUser();
  const [drodownOpen, setdropdownOpen] = useState(false);
  const dropdownRef = useRef(nill);
  const {useNavigate} = useNavigate();

  useEffect(()=>{
    const handleClickOutSide = (event) => {
      if(dropdownRef.current && !dropdownRef.current.contains(event)){
        setdropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutSide);
    return () => document.removeEventListener("mousedown", handleClickOutSide);
  },[]);
  

  const handleLogOut = () => {
    localStorage.removeItem("token");
    useNavigate("/login")
  }

  return (
    <header className="w-full fixed top-0 z-50 bg-gray-900 backdrop-blur-lg shadow-lg">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-3">
        
        <div className="flex items-center space-x-2">
          <img
            src="/path-to-logo.png"
            alt="Logo"
            className="h-10 w-10 cursor-pointer" id="profiledrop_down"
          />
          <span className="text-xl font-bold text-white cursor-pointer">
            NK School
          </span>
        </div>

     

        <div className="flex items-center space-x-6">
          <div className="relative cursor-pointer">
            <FaEnvelope className="text-white text-lg" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1">
              9
            </span>
          </div>
          <div className="relative cursor-pointer">
            <FaBell className="text-white text-lg" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1">
              5
            </span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <img
              src="/path-to-avatar.jpg"
              alt="User"
              className="h-8 w-8 rounded-full"
            />
            <span className="text-white font-medium">{user ? user.username : "Guest"}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
