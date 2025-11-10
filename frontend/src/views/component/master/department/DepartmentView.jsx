import { useEffect, useState } from "react";
import Header from "../../../admin/admin_panel/Header";
import LeftMenu from "../../../admin/admin_panel/LeftMenu";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Backbutton from "../../../../utils/components/Backbutton";
import {getLocationNamebyId, getCollegeNamebyId} from "../../../../utils/helpers/Helper";

export default function DepartmentView() {
  const navigate = useNavigate();
  const [locations, setLocation] = useState([]);
  const [college, setCollege] = useState([]);
  const [department, setDepartment] = useState([]);
  const {id} = useParams();
  const api = import.meta.env.VITE_API_URL;


  useEffect(() => {
    fetchBuilding();
  }, []);
  
  
  const fetchBuilding = async () => {
    try {
      const res = await axios.get(`${api}/edit-department/${id}`);
      const data = res.data.editDepartment;

      const location_name = getLocationNamebyId(data.location_id);
      const college_name = getCollegeNamebyId(data.college_id);
      setLocation(location_name);
      setCollege(college_name);
      setDepartment(data.department);
    } catch (err) {
      console.log(err);
    }
  };

  

  return (
      <div
        style={{ display: "flex", minHeight: "100vh", fontFamily: "'Poppins', sans-serif", color: "#fff"}}
      >
        <Header />
        <LeftMenu />
        <div
          style={{ marginTop: 120, marginLeft: 100, boxShadow: "0 5px 18px 0 rgba(0, 0, 0, 0.37)", padding: 40, height: "90%", width: "70%", borderRadius: "20px"}}
        >
          <div
            style={{ display: "flex", justifyContent: "flex-start", marginBottom: "5px"}}
          >
            <Backbutton onClick={() => navigate("/department/list")} />
          </div>
  
          <p
            className="text-center text-2xl"
            style={{backgroundColor: "#cfcfcfff",padding: "8px",marginBottom: "8px",borderRadius: "5px",color: "#000",fontWeight: "600",}}
          >
            Department View
          </p>
  
          <form>
            <div
              style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px", alignItems: "start"}}
            >
              <div style={{ marginLeft:"10px" }}>
                <label
                  htmlFor="location"
                  style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000", marginBottom: "10px"}}
                >
                  Location
                </label>
                <div style={{ marginLeft: "5px" }}>
                  <p className="text-lg" style={{ color:"#000000ff" }}>{locations}</p>
                </div>
              </div>
  
              <div>
                <label
                  htmlFor="college"
                  style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000", marginBottom: "10px"}}
                >
                  College
                </label>
  
                <div style={{ marginLeft: "5px" }}>
                  <p className="text-lg" style={{ color:"#000000ff" }}>{college}</p>
                </div>
              </div>


              <div>
                <label
                  htmlFor="college"
                  style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000", marginBottom: "10px"}}
                >
                  Department
                </label>
  
                <div style={{ marginLeft: "5px" }}>
                  <p className="text-lg" style={{ color:"#000000ff" }}>{department}</p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
}
