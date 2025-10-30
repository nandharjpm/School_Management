import { useEffect, useState } from "react";
import Header from "../../../admin/admin_panel/Header";
import LeftMenu from "../../../admin/admin_panel/LeftMenu";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Backbutton from "../../../../utils/components/Backbutton";
import {getLocationNamebyId} from "../../../../utils/helpers/Helper"

export default function CollegeView() {
  const [college, setCollege] = useState(null);
  const [location, setLocation] = useState(null);
  const api = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCollege();
  }, []);
  

  const fetchCollege = async () => {
    try {
      const getCollege = await axios.get(`${api}/get-college/${id}`);
      setCollege(getCollege.data.collegeView.college);
      const getLocation = await getLocationNamebyId(getCollege.data.collegeView.location_id);      
      setLocation(getLocation);
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
          <Backbutton onClick={() => navigate("/college/list")} />
        </div>

        <p
          className="text-center text-2xl"
          style={{backgroundColor: "#cfcfcfff",padding: "8px",marginBottom: "8px",borderRadius: "5px",color: "#000",fontWeight: "600",}}
        >
          College View
        </p>

        <form>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "40px", alignItems: "start"}}
          >
            <div style={{ marginLeft:"10px" }}>
              <label
                htmlFor="location"
                style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000", marginBottom: "10px"}}
              >
                Location
              </label>
              <div style={{ marginLeft: "5px" }}>
                <p className="text-lg" style={{ color:"#000000ff" }}>{location}</p>
              </div>
            </div>

            <div>
              <label
                htmlFor="college"
                style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000", marginBottom: "10px"}}
              >
                College Name
              </label>

              <div style={{ marginLeft: "5px" }}>
                <p className="text-lg" style={{ color:"#000000ff" }}>{college}</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
