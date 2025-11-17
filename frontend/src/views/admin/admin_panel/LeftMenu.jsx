import React, { useState } from "react";
import "../../../css/leftmenu_style.css";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaBars, FaBuilding, FaHotel, FaLocationArrow, FaUser, FaUserCog, FaUserGraduate, FaUserTie, FaBookReader} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { HiAcademicCap } from "react-icons/hi2";
import { PiExamFill } from "react-icons/pi";
import { FaNewspaper } from "react-icons/fa6";


export default function LeftMenu() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", height: "90vh", marginTop: "60px" }}>
      <Sidebar collapsed={collapsed} className="left-menu">
        <Menu style={{backgroundColor:"#000000ff"}}
          menuItemStyles={{
            button: { color: "#fff", backgroundColor: "#111827", "&:hover": { backgroundColor: "#1f2937", color: "#00bcd4" }, marginBottom:"30px"},
            icon: { color: "#e7e7e7ff" },
          }}
        >
          <MenuItem
            icon={<FaBars />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ marginLeft: "-1px" }}
          >
            {collapsed ? "" : collapsed}
          </MenuItem>

          <MenuItem
            icon={<MdDashboard />}
            onClick={() => navigate("/admindashboard")}
            active={location.pathname === "/admindashboard"}
          >
            Dashboard
          </MenuItem>

          <SubMenu icon={<FaUserCog />} label="Master">
            <MenuItem
              icon={<FaLocationArrow />}
              onClick={() => navigate("/location")}
              active={location.pathname === "/location"}
            >
              Location
            </MenuItem>

            <MenuItem
              icon={<FaHotel />}
              onClick={() => navigate("/college")}
              active={location.pathname === "/college"}
            >
              College
            </MenuItem>

            <MenuItem
              icon={<FaBuilding />}
              onClick={() => navigate("/building")}
              active={location.pathname === "/building"}
            >
              Building
            </MenuItem>

            <MenuItem
              icon={<FaBuilding />}
              onClick={() => navigate("/department")}
              active={location.pathname === "/department"}
            >
              Department
            </MenuItem>
          </SubMenu>

          <SubMenu icon={<FaUser />} label="User Master">
            <MenuItem
              icon={<FaUserTie />}
              onClick={() => navigate("/staff")}
              active={location.pathname === "/staff"}
            >
              Staff
            </MenuItem>
            <MenuItem
              icon={<FaUserGraduate />}
              onClick={() => navigate("/student")}
              active={location.pathname === "/student"}
            >
              Students
            </MenuItem>
          </SubMenu>



          <SubMenu icon={<HiAcademicCap />} label="Academic">
            <MenuItem
              icon={<FaUserTie />}
              onClick={() => navigate("/course")}
              active={location.pathname === "/course"}
            >
              Course/Programs
            </MenuItem>
            <MenuItem
              icon={<FaUserGraduate />}
              onClick={() => navigate("/timetable")}
              active={location.pathname === "/timetable"}
            >
              Time Table
            </MenuItem>
          </SubMenu>

          <SubMenu icon={<PiExamFill />} label="Examination">
            <MenuItem
              icon={<FaUserTie />}
              onClick={() => navigate("/staff")}
              active={location.pathname === "/staff"}
            >
              Exam Setup
            </MenuItem>
            <MenuItem
              icon={<FaUserGraduate />}
              onClick={() => navigate("/student")}
              active={location.pathname === "/student"}
            >
              Exam Result
            </MenuItem>
            <MenuItem
              icon={<FaUserGraduate />}
              onClick={() => navigate("/student")}
              active={location.pathname === "/student"}
            >
              Result Analysis
            </MenuItem>
          </SubMenu>

          <SubMenu icon={<FaBookReader />} label="Academic Records">
            <MenuItem
              icon={<FaUserTie />}
              onClick={() => navigate("/staff")}
              active={location.pathname === "/staff"}
            >
              Assignment
            </MenuItem>
            <MenuItem
              icon={<FaUserGraduate />}
              onClick={() => navigate("/student")}
              active={location.pathname === "/student"}
            >
              Documents
            </MenuItem>
            <MenuItem
              icon={<FaUserGraduate />}
              onClick={() => navigate("/student")}
              active={location.pathname === "/student"}
            >
              Digital Library
            </MenuItem>
          </SubMenu>

          <SubMenu icon={<FaNewspaper />} label="News">
            <MenuItem
              icon={<FaUserTie />}
              onClick={() => navigate("/staff")}
              active={location.pathname === "/staff"}
            >
              Notice Board/Annoncements
            </MenuItem>
            <MenuItem
              icon={<FaUserGraduate />}
              onClick={() => navigate("/student")}
              active={location.pathname === "/student"}
            >
              Events
            </MenuItem>
            <MenuItem
              icon={<FaUserGraduate />}
              onClick={() => navigate("/student")}
              active={location.pathname === "/student"}
            >
              Complaints
            </MenuItem>
          </SubMenu>

        </Menu>
      </Sidebar>
    </div>
  );
}
