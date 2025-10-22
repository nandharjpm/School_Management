import React, { useEffect, useState } from "react";
import Header from "../../../admin/admin_panel/Header";
import LeftMenu from "../../../admin/admin_panel/LeftMenu";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function College_list() {
  const [college, setCollege] = useState([]);
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  useEffect(() => {
    fetchCollegeList();
  }, []);

  const fetchCollegeList = async () => {
    const res = await api.get("/college");
    setCollege(res.data);
  };

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "College", selector: (row) => row.name, sortable: true },
  ];
  return (
    <div style={{ display: "flex" }}>
      <Header />
      <LeftMenu />
      <div style={{ width: "80%", margin: "auto", marginTop: 90 }}>
        <button onClick={() => navigate("/college/add")} className="cursor-pointer">+ Add College</button>
        <DataTable
          title="College Details"
          columns={columns}
          data={college}
          pagination
          highlightOnHover
        />
      </div>
    </div>
  );
}
