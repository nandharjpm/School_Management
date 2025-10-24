import React, { useState } from "react";
import Header from "../../../admin/admin_panel/Header";
import LeftMenu from "../../../admin/admin_panel/LeftMenu";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Backbutton from "../../../../utils/components/Backbutton";
import { useParams } from "react-router-dom";
import Updatebutton from "../../../../utils/components/Updatebutton";
import { useEffect } from "react";


export default function Location_add() {
  const { register, handleSubmit, formState: { errors }} = useForm();
  const {id} = useParams();

  const navigate = useNavigate();
  const [editData, setEditData] = useState([]);

  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
  const fetchLocation = async () => {
      try {
        const response = await axios.get(`${api}/edit-location/${id}`);
        const data = response.data.editLocation;
        setEditData(data);
        
      } catch (err) {
        console.error(err);
      }
    };
    fetchLocation();
  }, [id, api]);


  const onSubmit = async(data) => {
    try{
        const result = await axios.post(`${api}/location-editSubmit`, data);
        if(result.status == 201){
          toast.success('Location is Updated');
          navigate("/location/list"); 
        }
    }catch(err){
        console.error(err);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "'Poppins', sans-serif",
        color: "#fff",
      }}
    >
      <Header />
      <LeftMenu />
      <div
        style={{ marginTop: 120, marginLeft: 100, boxShadow: "0 5px 18px 0 rgba(0, 0, 0, 0.37)", padding: 40, width: "70%", height: "90%", borderRadius: "20px"}}
      >
        <div style={{display:"flex", justifyContent:"flex-start", marginBottom:"5px"}}>
            <Backbutton onClick={()=>navigate('/location/list')}/>
        </div>
        <p className="text-center text-2xl" style={{backgroundColor: "#cfcfcfff",padding: "8px",marginBottom: "8px",borderRadius: "5px"}}>
          Location Edit
        </p>
        <form onSubmit={handleSubmit(onSubmit)} style={{marginTop:"30px"}}>
          <label
            htmlFor="location"
            style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000000ff", marginBottom:"10px"}}
          >
            Location Name
          </label>

          <input
            type="text"
            id="location"
            {...register("location", {required: "Location Name is Required"})}
            style={{ border: "1px solid rgba(255,255,255,0.2)", width: "60%", padding: "12px 15px", borderRadius: "12px", fontSize: "16px", outline: "none", background: "rgba(255,255,255,0.1)", color: "#000000ff", boxShadow: "0 4px 15px rgba(0,0,0,0.3)", transition: "all 0.3s ease"}}
            onFocus={(e) => (e.target.style.border = "1px solid rgba(0,255,255,0.6)")}
            onBlur={(e) => (e.target.style.border = "1px solid rgba(255,255,255,0.2)")}
          />{editData}
          {errors.location && (<p style={{color:"red", position:"absolute", marginTop:"5px"}}>{errors.location.message}</p>)}

          <Updatebutton />
        </form>
      </div>
    </div>
  );
}
