import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LeftMenu from "../../../admin/admin_panel/LeftMenu";
import Header from "../../../admin/admin_panel/Header";
import Backbutton from "../../../../utils/components/Backbutton";
import { useNavigate } from "react-router-dom";

export default function LocationView() {
  const { id } = useParams();
  const [viewLocation, setViewLocation] = useState([]);
  const api = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    fetchLocationView();
  }, []);

  const fetchLocationView = async () => {
    try {
      const res = await axios.get(`${api}/get-location/${id}`);
      const data = res.data.locationView;
      setViewLocation(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!viewLocation) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex" }}>
      <Header />
      <LeftMenu />
      <div style={{marginTop: 120,height: "250px",marginLeft: 70,width: "75%",padding: 40,borderRadius: "20px",background: "rgba(243, 243, 243, 0.25)",boxShadow: "0 5px 18px 0 rgba(0, 0, 0, 0.37)"}} >
        <div style={{display:"flex", justifyContent:"flex-start", marginBottom:"5px"}}>
            <Backbutton onClick={()=>navigate('/location/list')}/>
        </div>
        <p className="text-center text-2xl" style={{backgroundColor: "#cfcfcfff",padding: "8px",marginBottom: "8px",borderRadius: "5px"}}>
          Location View
        </p>
        <div style={{marginLeft:"5px"}}>
          <p className="text-lg">Location Name:</p>
          <p className="text-lg">{viewLocation.location}</p>
        </div>
      </div>
    </div>
  );
}
