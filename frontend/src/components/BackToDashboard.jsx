import { useNavigate } from "react-router-dom";

function BackToDashboard() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/dashboard")}
      style={{
        padding: "10px 18px",
        border: "none",
        borderRadius: "6px",
        backgroundColor: "#374151",
        color: "white",
        cursor: "pointer",
        fontSize: "14px",
        marginBottom: "20px",
      }}
    >
      ← Back to Dashboard
    </button>
  );
}

export default BackToDashboard;