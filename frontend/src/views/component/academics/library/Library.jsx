import React, { useEffect, useState } from "react";
import Header from "../../../admin/admin_panel/Header";
import LeftMenu from "../../../admin/admin_panel/LeftMenu";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import axios from "axios";


export default function Library() {
  const [query, setQuery] = useState("");
  const [results, setResult] = useState([]);
  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    searchBooks();
  }, []);

  const searchBooks = async() => {
    const data = await axios.get(`${api}/books/search?query=${query}`);
    setResult(data);
  }



  return (
    <div
      style={{ display: "flex", fontFamily: "'Poppins', sans-serif", color: "#fff"}}>
      <Header />
      <LeftMenu />
      <div style={{ marginTop: 120, height:"20%", marginLeft: 70, width: "75%", padding: 40, borderRadius: "20px", background: "rgba(243, 243, 243, 0.25)", boxShadow: "0 5px 18px 0 rgba(0, 0, 0, 0.37)"}}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px"}}>
          <div className="flex flex-col items-center w-full mt-4">
            <div className="flex items-center w-full max-w-xl bg-white rounded-full shadow-md px-4 py-2">
                <input
                type="text"
                placeholder="Search Your books"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 outline-none px-4 py-2 text-gray-700"
                />

                <button onClick={searchBooks}>
                <FaSearch className="text-gray-700" />
                </button>

            </div>

            <div className="flex space-x-3 mt-4">
                <button
                onClick={searchBooks}
                className="bg-gray-300 px-5 py-2 rounded-md text-sm text-gray-800 hover:bg-gray-200 transition"
                >
                Search Books
                </button>
            </div>
            </div>


        </div>

        
      </div>
    </div>
  );
}
