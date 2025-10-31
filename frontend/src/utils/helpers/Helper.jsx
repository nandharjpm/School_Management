import axios from "axios";
let api = import.meta.env.VITE_API_URL;

export async function getLocationNamebyId(id) {
  try {
    const res = await axios.get(`${api}/get-location/${id}`);    
    return res.data.locationView.location;
  } catch (err) {
    console.error("Error fetching location:", err);
    return "Unknown";
  }
}

export async function getCollegeNamebyId(id){
  try{
    const res = await axios.get(`${api}/get-college/${id}`);    
    return res.data.collegeView.college;
  }catch(err){
    console.log(err);
  }
}