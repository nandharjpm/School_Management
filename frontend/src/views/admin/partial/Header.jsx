import { useState } from "react";
import "../../../css/header_style.css";
import {useNavigate} from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="w-full fixed top-0 z-50 bg-gradient-to-r from-grey-900  via-black to-grey-900 backdrop-blur-lg shadow-lg">
      <div className="max-w-7xl mx-auto px-auto">
        <ul className="flex items-center w-full py-6">
          <div className="flex flex-row space-x-12 ms-auto">
            <li className="text-xl font-semibold tracking-wide text-gray-200 hover:text-white hover:scale-110 transition duration-300 ease-in-out cursor-pointer">
              Home
            </li>
            <li className="text-xl font-semibold tracking-wide text-gray-200 hover:text-white hover:scale-110 transition duration-300 ease-in-out cursor-pointer">
              Program
            </li>
            <li className="text-xl font-semibold tracking-wide text-gray-200 hover:text-white hover:scale-110 transition duration-300 ease-in-out cursor-pointer">
              Innovations
            </li>
            <li className="text-xl font-semibold tracking-wide text-gray-200 hover:text-white hover:scale-110 transition duration-300 ease-in-out cursor-pointer">
              Campus Life
            </li>
          </div>

          <li className="ml-auto text-xl font-semibold tracking-wide text-gray-200 hover:text-white hover:scale-110 transition duration-300 ease-in-out">
            <button  onClick={()=>navigate("/login")} className="cursor-pointer">Sign In</button>
          </li>
        </ul>
      </div>
    </header>
  );
}
