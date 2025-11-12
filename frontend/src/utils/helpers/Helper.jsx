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

export async function getDepartmentNameById(id){
  try{
    const res = await axios.get(`${api}/get-department/${id}`);    
    return res.data.collegeView.department;
  }catch(err){
    console.log(err);
  }
}

export async function getRole(id){
  try{ 
    const user_role = [
      {value:"1", label:"Admin"},
      {value:"2", label:"Principal"},
      {value:"3", label:"HOD"},
      {value:"4", label:"Tutor"},
      {value:"5", label:"Student"},
    ];

    const data = user_role.find(item=>item.value == id);
    return data ? data.label : '';
  }catch(err){
    console.log(err);
  }
}