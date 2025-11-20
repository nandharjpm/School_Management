import React, { useEffect, useState } from "react";
import Header from "../../admin/admin_panel/Header";
import LeftMenu from "../../admin/admin_panel/LeftMenu";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {AddAnouncementbutton} from "../../../utils/components/Addbutton";
import {FaEdit, FaEye, FaTrash} from "react-icons/fa";
import Swal from "sweetalert2";

export default function NoticeBoard() {
  const [CourseList, setCourseList] = useState([]);
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchCourseList();
  }, []);


  const fetchCourseList = async () => {
    const res = await axios.get(`${api}/course`);
    const data = res.data.courseData;
    
    const courseData = await Promise.all(
      data.map(async(item)=>{
        const college_name = await getCollegeNamebyId(item.college_id);
        const department_name = await getDepartmentNameById(item.department_id);
        const user_role = await getRole(item.role)
        const year = await getYear(item.year)
        return {...item, collegeName: college_name, departName:department_name, userRole:user_role, year:year}
      })
    );
    
    setCourseList(courseData);
  };

  const deleteStudent = async(id)=>{
    const result = await Swal.fire({
      title:"Are You Sure",
      text:"You Want Delete This Course",
      icon:"warning",
      showCancelButton:true,
      confirmButtonColor:"#0d43d8ff",
      cancelButtonColor:"#ec0505ff",
      confirmButtonText:"Yes Delete it"
    });
    if(result.isConfirmed){
      await axios.post(`${api}/delete-course/${id}`);
      Swal.fire("Deleted", "Course has been Deleted", "success");
      fetchCourseList();
    }

  }

  const columns = [
    {name: "S.NO",selector: (row, index) => (index + 1),sortable: true,},
    {name: "College", selector: (row) => row.collegeName, sortable: true },
    {name: "Department", selector: (row) => row.departName, sortable: true },
    {name: "Year", selector: (row) => row.year, sortable: true },
    {name:"Action",
      cell:(row)=>(
        <div style={{display:"flex", gap:"15px"}}>
          <FaEye
            title="View"
            onClick={()=>navigate(`/course/view/${row._id}`)}
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
            onClick={()=>navigate(`/course/edit/${row._id}`)}
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
            onClick={()=> deleteStudent(row._id)}
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
          <h2 style={{ color: "#000000ff", fontWeight: 600 }}>Anonouncement Details</h2>
          <AddAnouncementbutton onClick={()=>navigate("/noticeboard/add")}/>
        </div>

        <DataTable
          columns={columns}
          data={CourseList}
          pagination
          highlightOnHover
          customStyles={customStyles}
        />
      </div>
    </div>
  );
}
