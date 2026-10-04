import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fb, #e8eefc)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          width: "100%",
          textAlign: "center",
          backgroundColor: "white",
          padding: "60px 40px",
          borderRadius: "20px",
          boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            marginBottom: "15px",
            color: "#111827",
          }}
        >
          Genify
        </h1>

        <h2
          style={{
            fontSize: "30px",
            marginBottom: "15px",
            color: "#1f2937",
          }}
        >
          Find Your Next Opportunity
        </h2>

        <p
          style={{
            fontSize: "17px",
            color: "#6b7280",
            lineHeight: "1.6",
            marginBottom: "35px",
          }}
        >
          A job application platform that helps job seekers discover
          opportunities and recruiters manage their hiring process.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "13px 28px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: "#111827",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Login
          </button>

          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "13px 28px",
              border: "1px solid #111827",
              borderRadius: "8px",
              backgroundColor: "white",
              color: "#111827",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;