import "../../../css/header_style.css";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaBell } from "react-icons/fa";
import { useUser } from "../../../context/UserContext";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const { user } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="w-full fixed top-0 z-50 bg-gray-900 backdrop-blur-lg shadow-lg">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-3">
        <div className="flex items-center space-x-2">
          <img
            src=""
            alt="Logo"
            className="h-10 w-10 cursor-pointer"
            onClick={() => navigate("/")}
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

          <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <img src="" alt="User" className="h-8 w-8 rounded-full" />
              <span className="text-white font-medium">
                {user ? user.username : "Guest"}
              </span>
            </div>
    
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-50">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/profile");
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogOut}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
