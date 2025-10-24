import React from "react";
import Header from "../../../admin/admin_panel/Header";
import LeftMenu from "../../../admin/admin_panel/LeftMenu";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Location_add() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const api = import.meta.env.VITE_API_URL;
  const onSubmit = async(data) => {
    try{
        const result = await axios.post(`${api}/location-submit`, data);
        if(result.status == 201){
          toast.success('Location is Created');
          navigate("/location/list"); 
        }
    }catch(err){
        console.log(err);
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <label
            htmlFor="location"
            style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000000ff"}}
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
          />
          {errors.location && (<p style={{color:"red", position:"absolute", marginTop:"5px"}}>{errors.location.message}</p>)}

          <button type="submit"
            style={{width: "25%", background:"linear-gradient(90deg, rgba(80, 79, 79, 1) 0%, rgba(104, 104, 105, 1) 100%)", color: "#fff", border: "none", fontWeight: "600", cursor: "pointer", marginLeft:"30px", borderRadius: "12px", padding: "13px 0", fontSize: "1rem", letterSpacing: "1px", transition: "all 0.3s ease"}}
            onMouseEnter={(e) => { e.target.style.boxShadow = "0 0 30px rgba(0,212,255,0.6)"; e.target.style.transform = "scale(1.05)";}}
            onMouseLeave={(e) => { e.target.style.boxShadow = "0 0 20px rgba(0,212,255,0.3)"; e.target.style.transform = "scale(1)";}}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
