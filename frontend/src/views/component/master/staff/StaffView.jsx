import { useEffect, useState } from "react";
import Header from "../../../admin/admin_panel/Header";
import LeftMenu from "../../../admin/admin_panel/LeftMenu";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Backbutton from "../../../../utils/components/Backbutton";
import { getLocationNamebyId, getCollegeNamebyId, getDepartmentNameById, getRole} from "../../../../utils/helpers/Helper";

import dayjs from "dayjs";

export default function StaffView() {
  const navigate = useNavigate();
  const [department, setDepartment] = useState(null);
  const [staff_name, setStaffname] = useState(null);
  const [location, setLocation] = useState(null);
  const [college, setCollege] = useState(null);
  const [username, setUsername] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);
  const [dob, setDob] = useState(null);
  const { id } = useParams();
  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchStaffdata();
  }, []);

  const fetchStaffdata = async () => {
    const staffData = await axios.get(`${api}/staff-edit/${id}`);
    const data = staffData.data.userData;
    const location_name = getLocationNamebyId(data.location_id);
    const college_name = getCollegeNamebyId(data.college_id);
    const department_name = getDepartmentNameById(data.department_id);
    const role = getRole(data.role);

    setLocation(location_name);
    setCollege(college_name);
    setStaffname(data.name);
    setDepartment(department_name);
    setUsername(data.username);
    setMobile(data.mobile);
    setEmail(data.email);
    setDob(data.dob ? dayjs(data.dob) : null);
    setRole(role);
  };
  return (
    <div
      style={{ display: "flex", minHeight: "100vh", fontFamily: "'Poppins', sans-serif", color: "#fff",
      }}
    >
      <Header />
      <LeftMenu />
      <div
        style={{ marginTop: 120, marginLeft: 100, boxShadow: "0 5px 18px 0 rgba(0, 0, 0, 0.37)", padding: 40, height: "90%", width: "70%", borderRadius: "20px"}}
      >
        <div
          style={{ display: "flex", justifyContent: "flex-start", marginBottom: "5px"}}
        >
          <Backbutton onClick={() => navigate("/staff/list")} />
        </div>

        <p
          className="text-center text-2xl"
          style={{ backgroundColor: "#cfcfcfff", padding: "8px", marginBottom: "8px", borderRadius: "5px", color: "#000", fontWeight: "600"}}
        >
          Staff View
        </p>

        <form style={{ marginTop: "30px" }}>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px", alignItems: "start"}}
          >
            <div>
              <label
                htmlFor="location"
                style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000", marginBottom: "10px"}}
              >
                Location
              </label>
              <div style={{ marginLeft: "5px" }}>
                <p className="text-lg" style={{ color: "#000000ff" }}>
                  {location}
                </p>
              </div>
            </div>

            <div>
              <label
                htmlFor="college"
                style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000", marginBottom: "10px",
                }}
              >
                College
              </label>

              <div style={{ marginLeft: "5px" }}>
                <p className="text-lg" style={{ color: "#000000ff" }}>
                  {college}
                </p>
              </div>
            </div>

            <div>
              <label
                htmlFor="staff_name"
                style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000", marginBottom: "10px",
                }}
              >
                Staff Name
              </label>

              <div style={{ marginLeft: "5px" }}>
                <p className="text-lg" style={{ color: "#000000ff" }}>
                  {staff_name}
                </p>
              </div>
            </div>

            <div>
              <label
                htmlFor="username"
                style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000", marginBottom: "10px",
                }}
              >
                User name
              </label>

              <div style={{ marginLeft: "5px" }}>
                <p className="text-lg" style={{ color: "#000000ff" }}>
                  {username}
                </p>
              </div>
            </div>

            <div>
              <label
                htmlFor="college"
                style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000", marginBottom: "10px",
                }}
              >
                DOB
              </label>
              <div style={{ marginLeft: "5px" }}>
                <p className="text-lg" style={{ color: "#000000ff" }}>
                  {dob ? dob.format("YYYY-MM-DD") : ""}
                </p>
              </div>
            </div>

            <div>
              <label
                htmlFor="Email"
                style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000", marginBottom: "10px",
                }}
              >
                Email
              </label>

              <div style={{ marginLeft: "5px" }}>
                <p className="text-lg" style={{ color: "#000000ff" }}>
                  {email}
                </p>
              </div>
            </div>

            <div>
              <label
                htmlFor="mobile"
                style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000", marginBottom: "10px",
                }}
              >
                Mobile Number
              </label>

              <div style={{ marginLeft: "5px" }}>
                <p className="text-lg" style={{ color: "#000000ff" }}>
                  {mobile}
                </p>
              </div>
            </div>

            <div>
              <label
                htmlFor="department"
                style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000", marginBottom: "10px",
                }}
              >
                Department
              </label>

              <div style={{ marginLeft: "5px" }}>
                <p className="text-lg" style={{ color: "#000000ff" }}>
                  {department}
                </p>
              </div>
            </div>

            <div>
              <label
                htmlFor="user_role"
                style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000", marginBottom: "10px",
                }}
              >
                User Role
              </label>
              <div style={{ marginLeft: "5px" }}>
                <p className="text-lg" style={{ color: "#000000ff" }}>
                  {role}
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "40px",
              display: "flex",
              justifyContent: "end",
            }}
          ></div>
        </form>
      </div>
    </div>
  );
}
