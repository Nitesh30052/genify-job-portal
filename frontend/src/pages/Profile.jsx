import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BackToDashboard from "../components/BackToDashboard";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch (error) {
      console.error("Error reading user information:", error);

      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [navigate]);

  if (!user) {
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
          maxWidth: "850px",
          margin: "0 auto",
        }}
      >
        {/* Back to Dashboard */}
        <BackToDashboard />

        {/* Page Heading */}
        <div
          style={{
            marginBottom: "30px",
          }}
        >
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
            Manage your account information.
          </p>
        </div>

        {/* Profile Card */}
        <div
          style={{
            backgroundColor: "#ffffff",
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
              color: "#ffffff",
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
                flexShrink: 0,
              }}
            >
              👤
            </div>

            {/* Name and Role */}
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
                {isRecruiter ? "Recruiter" : "Job Seeker"}
              </span>
            </div>
          </div>

          {/* Account Information */}
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
                gap: "0",
              }}
            >
              <InfoRow
                label="Full Name"
                value={user.name || "Not available"}
              />

              <InfoRow
                label="Email"
                value={user.email || "Not available"}
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
                value={user.id || "Not available"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================
   INFORMATION ROW
========================= */

function InfoRow({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "20px",
        padding: "15px 0",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <span
        style={{
          color: "#6b7280",
          fontWeight: "600",
          minWidth: "140px",
        }}
      >
        {label}
      </span>

      <span
        style={{
          color: "#111827",
          fontWeight: "500",
          textAlign: "right",
          overflowWrap: "anywhere",
        }}
      >
        {value}
      </span>
    </div>
  );
}

export default Profile;