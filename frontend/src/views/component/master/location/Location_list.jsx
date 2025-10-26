import React, { useEffect, useState } from "react";
import Header from "../../../admin/admin_panel/Header";
import LeftMenu from "../../../admin/admin_panel/LeftMenu";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Addbutton from "../../../../utils/components/Addbutton";
import {FaEdit, FaEye, FaTrash} from "react-icons/fa";
import Swal from "sweetalert2";

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

  const deleteLoc = async(id)=>{
    const result = await Swal.fire({
      title:"Are You Sure",
      text:"You Want Delete Location",
      icon:"warning",
      showCancelButton:true,
      confirmButtonColor:"#0d43d8ff",
      cancelButtonColor:"#ec0505ff",
      confirmButtonText:"Yes Delete it"
    });
    if(result.isConfirmed){
      await axios.post(`${api}/delete-location/${id}`);
      Swal.fire("Deleted", "Location has been Deleted", "success");
      fetchLocationList();
    }

  }

  const columns = [
    {name: "S.NO",selector: (row, index) => (index + 1),sortable: true,},
    {name: "Location", selector: (row) => row.location, sortable: true },
    {name:"Action",
      cell:(row)=>(
        <div style={{display:"flex", gap:"15px"}}>
          <FaEye
            title="View"
            onClick={()=>navigate(`/location/view/${row._id}`)}
            style={{
              cursor:"pointer",
              color:"#003cffff",
              fontSize:"22px",
            }}
            onMouseEnter={(e)=>(e.target.style.color="#000000ff")}
            onMouseLeave={(e)=>(e.target.style.color="#003cffff")}
          />
          <FaEdit 
            title="Edit"
            onClick={()=>navigate(`/location/edit/${row._id}`)}
            style={{
              color:"#006d0fff",
              fontSize:"20px",
              cursor:"pointer",
            }}
            onMouseEnter={(e)=>(e.target.style.color="#000000ff")}
            onMouseLeave={(e)=>(e.target.style.color="#006d0fff")}
          />
          <FaTrash 
            title="Delete"
            onClick={()=> deleteLoc(row._id)}
            style={{
              color:"#ff0000ff",
              fontSize:"18px",
              cursor:"pointer"
            }}
            onMouseEnter={(e)=>(e.target.style.color="#000000ff")}
            onMouseLeave={(e)=>(e.target.style.color="#ff0000ff")}
          />

        </div>
      ),
    }
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
      <div style={{ marginTop: 120, height:"20%", marginLeft: 70, width: "75%", padding: 40, borderRadius: "20px", background: "rgba(243, 243, 243, 0.25)", boxShadow: "0 5px 18px 0 rgba(0, 0, 0, 0.37)"}}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px"}}>
          <h2 style={{ color: "#000000ff", fontWeight: 600 }}>Location Details</h2>
          <Addbutton onClick={()=>navigate("/location/add")}/>
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
