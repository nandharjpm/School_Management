import { IoArrowBackCircle } from "react-icons/io5";

export default function Backbutton({onClick}) {
  return (
    <button
      style={{
        background: "#5f5f5fff",
        color: "#fff",
        fontWeight: "600",
        cursor: "pointer",
        borderRadius: "12px",
        padding: "5px",
        transition: "all 0.5s ease",
        width:"7%",
        fontSize:"30px",
        display:"flex",
        justifyContent:"center"
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
      <IoArrowBackCircle />
    </button>
  );
}
