export default function Submitbutton({onClick}) {
  return (
    <button
      type="submit"
      style={{
        width: "25%",
        background:
          "linear-gradient(90deg, rgba(80, 79, 79, 1) 0%, rgba(104, 104, 105, 1) 100%)",
        color: "#fff",
        border: "none",
        fontWeight: "600",
        cursor: "pointer",
        marginLeft: "30px",
        borderRadius: "12px",
        padding: "13px 0",
        fontSize: "1rem",
        letterSpacing: "1px",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.target.style.boxShadow = "0 0 30px rgba(0,212,255,0.6)";
        e.target.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.target.style.boxShadow = "0 0 20px rgba(0,212,255,0.3)";
        e.target.style.transform = "scale(1)";
      }}
    >
      Submit
    </button>
  );
}
