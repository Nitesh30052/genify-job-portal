import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav
      style={{
        backgroundColor: "#111827",
        color: "white",
        padding: "0 35px",
        height: "65px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}
    >
      {/* Logo */}
      <div
        onClick={() => navigate("/dashboard")}
        style={{
          fontSize: "24px",
          fontWeight: "700",
          cursor: "pointer",
          letterSpacing: "0.5px",
        }}
      >
        Genify
      </div>

      {/* Navigation */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <button
          onClick={() => navigate("/dashboard")}
          style={navButtonStyle}
        >
          Dashboard
        </button>

        {user?.role === "RECRUITER" && (
          <>
            <button
              onClick={() => navigate("/post-job")}
              style={navButtonStyle}
            >
              Post Job
            </button>

            <button
              onClick={() => navigate("/my-jobs")}
              style={navButtonStyle}
            >
              My Jobs
            </button>
          </>
        )}

        {user?.role === "JOB_SEEKER" && (
          <>
            <button
              onClick={() => navigate("/jobs")}
              style={navButtonStyle}
            >
              Find Jobs
            </button>

            <button
              onClick={() => navigate("/my-applications")}
              style={navButtonStyle}
            >
              My Applications
            </button>
          </>
        )}

        <button
          onClick={() => navigate("/profile")}
          style={navButtonStyle}
        >
          Profile
        </button>

        <button
          onClick={handleLogout}
          style={{
            ...navButtonStyle,
            backgroundColor: "#dc2626",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

const navButtonStyle = {
  border: "none",
  borderRadius: "6px",
  padding: "9px 14px",
  backgroundColor: "#374151",
  color: "white",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
};

export default Navbar;