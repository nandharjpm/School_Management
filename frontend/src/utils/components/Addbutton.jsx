import { RiMapPinAddFill } from "react-icons/ri";
export default function Addbutton({onClick}) {
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
