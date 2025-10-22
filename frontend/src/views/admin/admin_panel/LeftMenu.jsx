import React, { useState } from "react";
import "../../../css/leftmenu_style.css";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  FaBars,
  FaBuilding,
  FaHotel,
  FaLocationArrow,
  FaUser,
  FaUserCog,
  FaUserGraduate,
  FaUsers,
  FaUserTie,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function LeftMenu() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", height: "100vh", marginTop: "60px" }}>
      <Sidebar collapsed={collapsed} className="left-menu">
        <Menu
          menuItemStyles={{
            button: {
              color: "#fff",
              backgroundColor: "#111827",
              "&:hover": {
                backgroundColor: "#1f2937",
                color: "#00bcd4",
              },
            },
            icon: {
              color: "#e7e7e7ff",
            },
          }}
        >
          <MenuItem
            icon={<FaBars />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ marginLeft: "-1px" }}
          >
            {collapsed ? "" : collapsed}
          </MenuItem>

          <SubMenu icon={<FaUserCog />} label="Master">
            <MenuItem
              icon={<FaHotel />}
              onClick={() => navigate("/college")}
              active={location.pathname === "/college"}
            >
              College
            </MenuItem>
            <MenuItem
              icon={<FaLocationArrow />}
              onClick={() => navigate("/location")}
              active={location.pathname === "/location"}
            >
              Location
            </MenuItem>
            <MenuItem
              icon={<FaBuilding />}
              onClick={() => navigate("/building")}
              active={location.pathname === "/building"}
            >
              Building
            </MenuItem>
            <SubMenu icon={<FaUser />} label="User Master">
              <MenuItem
                icon={<FaUserTie />}
                onClick={() => navigate("/satff")}
                active={location.pathname === "/satff"}
              >
                Staff
              </MenuItem>
              <MenuItem
                icon={<FaUserGraduate />}
                onClick={() => navigate("/students")}
                active={location.pathname === "/students"}
              >
                Students
              </MenuItem>
              <MenuItem
                icon={<FaUsers />}
                onClick={() => navigate("/employees")}
                active={location.pathname === "/employees"}
              >
                Employees
              </MenuItem>
            </SubMenu>
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  );
}
