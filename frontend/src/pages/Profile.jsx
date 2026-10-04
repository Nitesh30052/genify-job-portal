import { useNavigate } from "react-router-dom";
import BackToDashboard from "../components/BackToDashboard";

function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate("/login");
    return null;
  }

  const isRecruiter = user.role === "RECRUITER";

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fb",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <BackToDashboard />

        <div style={{ marginBottom: "30px" }}>
          <h1
            style={{
              margin: "0 0 8px",
              color: "#111827",
              fontSize: "32px",
            }}
          >
            My Profile
          </h1>

          <p
            style={{
              margin: "0",
              color: "#6b7280",
            }}
          >
            View your account information.
          </p>
        </div>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
            overflow: "hidden",
          }}
        >
          {/* Profile Header */}
          <div
            style={{
              background:
                "linear-gradient(135deg, #111827, #1f2937)",
              padding: "35px",
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                backgroundColor: "#374151",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
              }}
            >
              👤
            </div>

            <div>
              <h2
                style={{
                  margin: "0 0 8px",
                  fontSize: "25px",
                }}
              >
                {user.name}
              </h2>

              <span
                style={{
                  display: "inline-block",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  backgroundColor: "#374151",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                {isRecruiter
                  ? "Recruiter"
                  : "Job Seeker"}
              </span>
            </div>
          </div>

          {/* Profile Information */}
          <div
            style={{
              padding: "30px",
            }}
          >
            <h3
              style={{
                marginTop: "0",
                marginBottom: "20px",
                color: "#111827",
              }}
            >
              Account Information
            </h3>

            <div
              style={{
                display: "grid",
                gap: "16px",
              }}
            >
              <InfoRow
                label="Full Name"
                value={user.name}
              />

              <InfoRow
                label="Email"
                value={user.email}
              />

              <InfoRow
                label="Account Type"
                value={
                  isRecruiter
                    ? "Recruiter"
                    : "Job Seeker"
                }
              />

              <InfoRow
                label="User ID"
                value={user.id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "20px",
        padding: "15px 0",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <span
        style={{
          color: "#6b7280",
          fontWeight: "600",
        }}
      >
        {label}
      </span>

      <span
        style={{
          color: "#111827",
          fontWeight: "500",
          textAlign: "right",
        }}
      >
        {value}
      </span>
    </div>
  );
}

export default Profile;