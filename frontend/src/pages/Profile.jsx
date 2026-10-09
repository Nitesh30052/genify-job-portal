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

  const pageStyle = {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #f5f3ff 0%, #eff6ff 50%, #faf5ff 100%)",
    padding: "clamp(20px, 5vw, 45px) clamp(15px, 4vw, 35px)",
    boxSizing: "border-box",
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  };

  const cardStyle = {
    background: "rgba(255,255,255,0.95)",
    borderRadius: "18px",
    border: "1px solid rgba(139,92,246,0.12)",
    boxShadow: "0 10px 30px rgba(79,70,229,0.07)",
    overflow: "hidden",
  };

  return (
    <div style={pageStyle}>
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Back to Dashboard */}
        <BackToDashboard />

        {/* Gradient Header */}
        <section
          style={{
            marginTop: "25px",
            marginBottom: "28px",
            padding: "clamp(25px, 5vw, 40px)",
            borderRadius: "22px",
            color: "#ffffff",
            background:
              "linear-gradient(120deg, #4f46e5 0%, #7c3aed 55%, #9333ea 100%)",
            boxShadow: "0 15px 35px rgba(99,102,241,0.2)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
              right: "-50px",
              top: "-95px",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <span
              style={{
                display: "inline-block",
                padding: "7px 12px",
                borderRadius: "20px",
                background: "rgba(255,255,255,0.15)",
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: "1px",
                marginBottom: "15px",
              }}
            >
              YOUR ACCOUNT
            </span>

            <h1
              style={{
                margin: "0 0 12px",
                fontSize: "clamp(28px, 5vw, 38px)",
                fontWeight: "800",
                letterSpacing: "-0.8px",
              }}
            >
              My Profile
            </h1>

            <p
              style={{
                margin: 0,
                maxWidth: "550px",
                color: "#ede9fe",
                fontSize: "15px",
                lineHeight: 1.8,
              }}
            >
              View your account information and manage your
              professional identity on Genify.
            </p>
          </div>
        </section>

        {/* Profile Card */}
        <section style={cardStyle}>
          {/* Profile Information Header */}
          <div
            style={{
              padding: "clamp(25px, 5vw, 35px)",
              display: "flex",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
              background:
                "linear-gradient(135deg, #faf5ff 0%, #eff6ff 100%)",
              borderBottom: "1px solid #ede9fe",
            }}
          >
            <div
              style={{
                width: "82px",
                height: "82px",
                minWidth: "82px",
                borderRadius: "24px",
                background:
                  "linear-gradient(135deg, #6366f1, #9333ea)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: "36px",
                fontWeight: "800",
                boxShadow: "0 8px 20px rgba(99,102,241,0.22)",
              }}
            >
              {user.name?.trim()?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div style={{ flex: "1", minWidth: 0 }}>
              <h2
                style={{
                  margin: "0 0 8px",
                  color: "#312e81",
                  fontSize: "clamp(21px, 4vw, 27px)",
                  fontWeight: "800",
                  overflowWrap: "anywhere",
                }}
              >
                {user.name || "User"}
              </h2>

              <p
                style={{
                  margin: "0 0 13px",
                  color: "#6b7280",
                  fontSize: "14px",
                  overflowWrap: "anywhere",
                }}
              >
                {user.email || "Email not available"}
              </p>

              <span
                style={{
                  display: "inline-block",
                  padding: "7px 13px",
                  borderRadius: "20px",
                  background: isRecruiter ? "#ede9fe" : "#dbeafe",
                  color: isRecruiter ? "#6d28d9" : "#1d4ed8",
                  fontSize: "12px",
                  fontWeight: "800",
                }}
              >
                {isRecruiter ? "💼 Recruiter" : "🎯 Job Seeker"}
              </span>
            </div>
          </div>

          {/* Account Information */}
          <div style={{ padding: "clamp(20px, 4vw, 35px)" }}>
            <div style={{ marginBottom: "22px" }}>
              <h3
                style={{
                  margin: "0 0 7px",
                  color: "#312e81",
                  fontSize: "21px",
                  fontWeight: "800",
                }}
              >
                Account Information
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "#6b7280",
                  fontSize: "13px",
                }}
              >
                Your registered account details.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
                gap: "15px",
              }}
            >
              <InfoCard
                icon="👤"
                label="Full Name"
                value={user.name || "Not available"}
              />

              <InfoCard
                icon="✉️"
                label="Email Address"
                value={user.email || "Not available"}
              />

              <InfoCard
                icon="💼"
                label="Account Type"
                value={isRecruiter ? "Recruiter" : "Job Seeker"}
              />

              <InfoCard
                icon="🆔"
                label="User ID"
                value={user.id ?? "Not available"}
              />
            </div>

            {/* Bottom Information */}
            <div
              style={{
                marginTop: "28px",
                padding: "17px",
                borderRadius: "12px",
                background:
                  "linear-gradient(135deg, #f5f3ff, #eff6ff)",
                border: "1px solid #e0e7ff",
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
              }}
            >
              <span style={{ fontSize: "21px" }}>🔒</span>

              <div>
                <h4
                  style={{
                    margin: "0 0 5px",
                    color: "#4338ca",
                    fontSize: "14px",
                  }}
                >
                  Account Overview
                </h4>

                <p
                  style={{
                    margin: 0,
                    color: "#6b7280",
                    fontSize: "13px",
                    lineHeight: 1.7,
                  }}
                >
                  Your profile displays the account information
                  associated with your Genify login.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div
          style={{
            textAlign: "center",
            marginTop: "30px",
            padding: "15px",
            color: "#6b7280",
            fontSize: "13px",
          }}
        >
          Your career journey starts with{" "}
          <span style={{ color: "#7c3aed", fontWeight: "800" }}>
            Genify
          </span>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div
      style={{
        padding: "19px",
        borderRadius: "13px",
        background: "#fafaff",
        border: "1px solid #ede9fe",
        minWidth: 0,
        transition: "border-color 0.2s, transform 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#c4b5fd";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#ede9fe";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #ede9fe, #dbeafe)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          marginBottom: "14px",
        }}
      >
        {icon}
      </div>

      <div
        style={{
          color: "#6b7280",
          fontSize: "12px",
          fontWeight: "600",
          marginBottom: "7px",
        }}
      >
        {label}
      </div>

      <div
        style={{
          color: "#312e81",
          fontSize: "15px",
          fontWeight: "700",
          overflowWrap: "anywhere",
          lineHeight: 1.6,
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default Profile;