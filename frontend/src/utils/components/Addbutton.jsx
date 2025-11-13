import { RiMapPinAddFill } from "react-icons/ri";
import { BsBuildingFillAdd } from "react-icons/bs";
import { MdOutlineDomainAdd } from "react-icons/md";
import { RiUserAddLine } from "react-icons/ri";
import { SiGoogleclassroom } from "react-icons/si";
import { PiStudentBold } from "react-icons/pi";


export function AddLocationbutton({ onClick }) {
  return (
    <button
      style={{
        background: "#5f5f5fff",
        color: "#fff",
        fontWeight: "600",
        cursor: "pointer",
        borderRadius: "12px",
        padding: "12px",
        transition: "all 0.5s ease",
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.target.style.boxShadow = "#00e1ffff";
        e.target.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.target.style.boxShadow = "#fff";
        e.target.style.transform = "scale(1)";
      }}
    >
      <RiMapPinAddFill />
    </button>
  );
}

export function AddCollegebutton({ onClick }) {
  return (
    <button
      style={{
        background: "#5f5f5fff",
        color: "#fff",
        fontWeight: "600",
        cursor: "pointer",
        borderRadius: "12px",
        padding: "12px",
        transition: "all 0.5s ease",
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.target.style.boxShadow = "#00e1ffff";
        e.target.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.target.style.boxShadow = "#fff";
        e.target.style.transform = "scale(1)";
      }}
    >
      <BsBuildingFillAdd />
    </button>
  );
}


export function AddBuildingbutton({ onClick }) {
  return (
    <button
      style={{
        background: "#5f5f5fff",
        color: "#fff",
        fontWeight: "600",
        cursor: "pointer",
        borderRadius: "12px",
        padding: "12px",
        transition: "all 0.5s ease",
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.target.style.boxShadow = "#00e1ffff";
        e.target.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.target.style.boxShadow = "#fff";
        e.target.style.transform = "scale(1)";
      }}
    >
      <MdOutlineDomainAdd />
    </button>
  );
}

export function AddStaffbutton({ onClick }) {
  return (
    <button
      style={{
        background: "#5f5f5fff",
        color: "#fff",
        fontWeight: "600",
        cursor: "pointer",
        borderRadius: "12px",
        padding: "12px",
        transition: "all 0.5s ease",
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.target.style.boxShadow = "#00e1ffff";
        e.target.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.target.style.boxShadow = "#fff";
        e.target.style.transform = "scale(1)";
      }}
    >
      <RiUserAddLine />
    </button>
  );
}

export function AddStudentbutton({ onClick }) {
  return (
    <button
      style={{
        background: "#5f5f5fff",
        color: "#fff",
        fontWeight: "600",
        cursor: "pointer",
        borderRadius: "12px",
        padding: "12px",
        transition: "all 0.5s ease",
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.target.style.boxShadow = "#00e1ffff";
        e.target.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.target.style.boxShadow = "#fff";
        e.target.style.transform = "scale(1)";
      }}
    >
      <PiStudentBold />
    </button>
  );
}

export function AddDepartmentbutton({ onClick }) {
  return (
    <button
      style={{
        background: "#5f5f5fff",
        color: "#fff",
        fontWeight: "600",
        cursor: "pointer",
        borderRadius: "12px",
        padding: "12px",
        transition: "all 0.5s ease",
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.target.style.boxShadow = "#00e1ffff";
        e.target.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.target.style.boxShadow = "#fff";
        e.target.style.transform = "scale(1)";
      }}
    >
      <SiGoogleclassroom />
    </button>
  );
}
