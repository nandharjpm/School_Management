import React, { useEffect, useState } from "react";
import Header from "../../../admin/admin_panel/Header";
import LeftMenu from "../../../admin/admin_panel/LeftMenu";
import DataTable from "react-data-table-component";
import axios from "axios";
import {AddBuildingbutton} from "../../../../utils/components/Addbutton";
import {FaEdit, FaEye, FaTrash} from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {getLocationNamebyId, getCollegeNamebyId} from "../../../../utils/helpers/Helper";


export default function BuildingList(){
    const [building, setBuilding] = useState([]);
    const api = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    useEffect(()=>{
        fetchBuildingList();
    },[])
    
    
    const fetchBuildingList = async() => {
      try{
        const getBuildingData = await axios.get(`${api}/building`);
        const data = getBuildingData.data.buildingData;
        
        const allBuildings = await Promise.all(
        data.map(async (item) => {
          const locationName = await getLocationNamebyId(item.location_id);
          const collegeName = await getCollegeNamebyId(item.college_id);
          return { ...item, location_name: locationName, college_name: collegeName };
        })
      );
        setBuilding(allBuildings);
      }catch(err){
        console.log(err);
      }
    }


    const deleteCol = async(id)=>{
        const result = await Swal.fire({
          title:"Are You Sure",
          text:"You Want Delete Building",
          icon:"warning",
          showCancelButton:true,
          confirmButtonColor:"#0d43d8ff",
          cancelButtonColor:"#ec0505ff",
          confirmButtonText:"Yes Delete it"
        });
        if(result.isConfirmed){
          await axios.post(`${api}/delete-building/${id}`);
          Swal.fire("Deleted", "Building has been Deleted", "success");
          fetchBuildingList();
        }
    
      }
    
      const columns = [
        {name: "S.NO",selector: (row, index) => (index + 1),sortable: true,},
        {name: "Location", selector: (row) => row.location_name, sortable: true },
        {name: "College", selector: (row) => row.college_name, sortable: true },
        {name: "Building", selector: (row) => row.building, sortable: true },
        {name:"Action",
          cell:(row)=>(
            <div style={{display:"flex", gap:"15px"}}>
              <FaEye
                title="View"
                onClick={()=>navigate(`/building/view/${row._id}`)}
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
                onClick={()=>navigate(`/building/edit/${row._id}`)}
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
                onClick={()=> deleteCol(row._id)}
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
              <h2 style={{ color: "#000000ff", fontWeight: 600 }}>Building Details</h2>
              <AddBuildingbutton onClick={()=>navigate("/building/add")}/>
            </div>
    
            <DataTable
              columns={columns}
              data={building}
              pagination
              highlightOnHover
              customStyles={customStyles}
            />
          </div>
        </div>
      );
}