import { useEffect, useState } from "react";
import Header from "../../../admin/admin_panel/Header";
import LeftMenu from "../../../admin/admin_panel/LeftMenu";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Backbutton from "../../../../utils/components/Backbutton";
import {
  getLocationNamebyId,
  getCollegeNamebyId,
  getDepartmentNameById,
  getYear,
} from "../../../../utils/helpers/Helper";

export default function CourseView() {
  const navigate = useNavigate();
  const [courses, setCourse] = useState([{ name: "" }]);
  const api = import.meta.env.VITE_API_URL;
  const [location, setLocation] = useState([]);
  const [college, setCollege] = useState([]);
  const [department, setDepartment] = useState([]);
  const [year, setYear] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      const getCourse = await axios.get(`${api}/edit-course/${id}`);
      const courseData = getCourse.data.editCourse;
      const course_data = courseData.course.map((data) => ({ name: data }));

      setLocation(getLocationNamebyId(courseData.location_id));
      setCollege(getCollegeNamebyId(courseData.college_id));
      setDepartment(getDepartmentNameById(courseData.department_id));
      setYear(getYear(courseData.year));
      setCourse(course_data);
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
          <Backbutton onClick={() => navigate("/course/list")} />
        </div>

        <p
          className="text-center text-2xl"
          style={{ backgroundColor: "#cfcfcfff", padding: "8px", marginBottom: "8px", borderRadius: "5px", color: "#000", fontWeight: "600"}}
        >
          Course View
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
                style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000", marginBottom: "10px"}}
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
                htmlFor="department"
                style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000", marginBottom: "10px"}}
              >
                Department
              </label>
              <div style={{ marginLeft: "5px" }}>
                <p className="text-lg" style={{ color: "#000000ff" }}>
                  {department}
                </p>
              </div>
            </div>

            <div
              style={{ marginTop: 10, boxShadow: "0 5px 18px 0 rgba(197, 197, 197, 0.37)", padding: 40, height: "90%", width: "320%", borderRadius: "20px",
              }}
            >
              <p className="text-center text-2xl"
                style={{ backgroundColor: "#e7e7e7", padding: "8px", marginBottom: "8px", borderRadius: "5px", color: "#000", fontWeight: "600", textAlign: "center"}}
              >
                {year}
              </p>

              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center", border:"1px solid #eee" }}>
                <thead>
                  <tr>
                    <th style={{ padding: "10px", fontSize: "1.2rem", color: "#000", fontWeight: "600",borderBottom: "1px solid #eee"}}>
                      Course
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {courses.map((course, index) => (
                    <tr key={index}>
                      <td
                        style={{ padding: "10px", fontSize: "1rem", color: "#000", borderBottom: "1px solid #eee"}}
                      >
                        {course.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
