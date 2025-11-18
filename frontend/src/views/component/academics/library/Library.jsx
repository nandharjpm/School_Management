import React, { useState } from "react";
import Header from "../../../admin/admin_panel/Header";
import LeftMenu from "../../../admin/admin_panel/LeftMenu";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

export default function Library() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState("");
  const api = import.meta.env.VITE_API_URL;

  const searchBooks = async () => {
    if (!query.trim()) return;

    try {
      const res = await axios.get(`${api}/books/search?query=${query}`);
      console.log(results);
      
      setResults(res?.data?.books);
      setSummary(res.data.summary);
    } catch (error) {
      console.log(error);
      alert("No books found or server error");
    }
  };

  return (
    <div
      style={{ display: "flex", fontFamily: "'Poppins', sans-serif", color: "#fff",}}
    >
      <Header />
      <LeftMenu />

      <div
        style={{ display: "flex", marginTop: 120, marginLeft: 70, width: "75%", gap: "20px"}}
      >
        <div
          style={{ flex: 2, maxHeight: "80vh", overflowY: "auto", paddingRight: "10px",}}
        >
          <div className="flex flex-col items-center w-full mb-4">
            <div className="flex items-center w-full max-w-xl bg-white rounded-full shadow-md px-4 py-2">
              <input
                type="text"
                placeholder="Search Your Books"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 outline-none px-4 py-2 text-gray-700"
              />
              <button onClick={searchBooks}>
                <FaSearch className="text-gray-700 cursor-pointer" />
              </button>
            </div>
            <button
              onClick={searchBooks}
              className="bg-gray-300 px-5 py-2 mt-3 rounded-md text-sm text-gray-800 hover:bg-gray-200 transition cursor-pointer"
            >
              Search Books
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {results.map((book, index) => (
              <div
                key={index}
                className="bg-white text-black p-4 rounded-lg shadow-md"
              >
                <h3 className="font-bold text-lg">{book.volumeInfo.title}</h3>
                <p className="text-gray-600 text-sm mt-1">
                  {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
                </p>

                <div className="mt-4 flex space-x-3">
                  <a
                    href={book.volumeInfo.previewLink}
                    target="_blank"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Preview
                  </a>
                  {book.accessInfo?.pdf?.downloadLink && (
                    <a
                      href={book.accessInfo.pdf.downloadLink}
                      target="_blank"
                      className="bg-green-600 text-white px-4 py-2 rounded-md"
                    >
                      Download
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{ flex: 1, maxHeight: "80vh", overflowY: "auto", background: "rgba(255,255,255,0.9)", color: "#000", padding: "20px", borderRadius: "20px", boxShadow: "0 5px 18px rgba(0,0,0,0.37)"}}
        >
          {summary ? (
            <>
              <h2 className="text-xl font-bold mb-4">AI Description</h2>
              <p className="leading-7">{summary}</p>
            </>
          ) : (
            <p>I will summarize your book content</p>
          )}
        </div>
      </div>
    </div>
  );
}
