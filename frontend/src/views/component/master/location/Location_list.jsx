import React, { useEffect, useState } from "react";
import Header from "../../../admin/admin_panel/Header";
import LeftMenu from "../../../admin/admin_panel/LeftMenu";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Location_list() {
  const [location, setLocation] = useState([]);
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchLocationList();
  }, []);

  const fetchLocationList = async () => {
    const res = await axios.get(`${api}/location`);
    const data = res.data.locationData;
    setLocation(data);
  };

  const columns = [
    {name: "S.NO",selector: (row, index) => (index + 1),sortable: true,},
    { name: "Location", selector: (row) => row.location, sortable: true },
  ];

  const customStyles = {
    headCells: {
      style: { fontSize: "1rem", fontWeight: "600", color: "#000000ff", backgroundColor: "rgba(216, 216, 216, 0.3)", borderBottom: "1px solid rgba(255, 1, 1, 0.1)"},
    },
    cells: {
      style: {color: "#000000ff",fontSize: "0.95rem",background: "rgba(255,255,255,0.2)"},
    },
    rows: {
      style: {
        borderBottom: "1px solid rgba(133, 133, 133, 0.1)",
        "&:hover": {
          backgroundColor: "rgba(0, 212, 255, 0.15)",
        },
      },
    },
  };

  return (
    <div
      style={{ display: "flex", fontFamily: "'Poppins', sans-serif", color: "#fff"}}>
      <Header />
      <LeftMenu />
      <div style={{ marginTop: 120, marginLeft: 70, width: "75%", padding: 40, borderRadius: "20px", background: "rgba(243, 243, 243, 0.25)", boxShadow: "0 5px 18px 0 rgba(0, 0, 0, 0.37)"}}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px"}}>
          <h2 style={{ color: "#000000ff", fontWeight: 600 }}>Location Details</h2>
          <button
            onClick={() => navigate("/location/add")}
            style={{
              width: "15%",
              background: "#5f5f5fff",
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer",
              borderRadius: "12px",
              padding: "12px",
              letterSpacing: "1px",
              transition: "all 0.5s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = "#00e1ffff";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = "#fff";
              e.target.style.transform = "scale(1)";
            }}
          >
            Add Location
          </button>
        </div>

        <DataTable
          columns={columns}
          data={location}
          pagination
          highlightOnHover
          customStyles={customStyles}
        />
      </div>
    </div>
  );
}
