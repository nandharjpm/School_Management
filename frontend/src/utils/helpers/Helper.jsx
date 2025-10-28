import axios from "axios";

export async function getLocationNamebyId(id) {
  try {
    const api = import.meta.env.VITE_API_URL;
    const res = await axios.get(`${api}/get-location/${id}`);
    return res.data.locationView.location;
  } catch (err) {
    console.error("Error fetching location:", err);
    return "Unknown";
  }
}
