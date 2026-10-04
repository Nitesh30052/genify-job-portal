import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div>
      <Navbar />

      <main
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "45px 30px",
        }}
      >
        {/* Welcome Section */}
        {user && (
          <section
            style={{
              background:
                "linear-gradient(135deg, #111827, #1f2937)",
              color: "white",
              borderRadius: "16px",
              padding: "40px",
              marginBottom: "30px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
            }}
          >
            <p
              style={{
                margin: "0 0 8px",
                color: "#93c5fd",
                fontWeight: "600",
              }}
            >
              Welcome back 👋
            </p>

            <h1
              style={{
                margin: "0 0 15px",
                fontSize: "34px",
              }}
            >
              {user.name}
            </h1>

            <p
              style={{
                margin: "6px 0",
                color: "#d1d5db",
              }}
            >
              {user.email}
            </p>

            <span
              style={{
                display: "inline-block",
                marginTop: "15px",
                padding: "6px 12px",
                borderRadius: "20px",
                backgroundColor: "#374151",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              {user.role === "RECRUITER"
                ? "Recruiter"
                : "Job Seeker"}
            </span>
          </section>
        )}

        {!user && <p>Loading user information...</p>}

        {/* Quick Actions */}
        <section>
          <h2
            style={{
              marginBottom: "8px",
              fontSize: "24px",
            }}
          >
            Quick Actions
          </h2>

          <p
            style={{
              color: "#6b7280",
              marginTop: "0",
              marginBottom: "22px",
            }}
          >
            Quickly access the features you use most.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
            }}
          >
            {/* Recruiter Actions */}
            {user?.role === "RECRUITER" && (
              <>
                <ActionCard
                  icon="📝"
                  title="Post a Job"
                  description="Create and publish a new job opportunity."
                  onClick={() => navigate("/post-job")}
                />

                <ActionCard
                  icon="💼"
                  title="My Jobs"
                  description="View and manage jobs posted by you."
                  onClick={() => navigate("/my-jobs")}
                />
              </>
            )}

            {/* Job Seeker Actions */}
            {user?.role === "JOB_SEEKER" && (
              <>
                <ActionCard
                  icon="🔎"
                  title="Find Jobs"
                  description="Search and apply for available jobs."
                  onClick={() => navigate("/jobs")}
                />

                <ActionCard
                  icon="📋"
                  title="My Applications"
                  description="Track the status of your applications."
                  onClick={() => navigate("/my-applications")}
                />
              </>
            )}

            <ActionCard
              icon="👤"
              title="Profile"
              description="View and manage your profile information."
              onClick={() => navigate("/profile")}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

function ActionCard({
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: "white",
        border: "1px solid #e5e7eb",
        borderRadius: "14px",
        padding: "25px",
        cursor: "pointer",
        boxShadow: "0 3px 12px rgba(0,0,0,0.06)",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-4px)";
        e.currentTarget.style.boxShadow =
          "0 8px 20px rgba(0,0,0,0.10)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 3px 12px rgba(0,0,0,0.06)";
      }}
    >
      <div
        style={{
          fontSize: "30px",
          marginBottom: "15px",
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          margin: "0 0 8px",
          fontSize: "19px",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          margin: "0",
          color: "#6b7280",
          lineHeight: "1.5",
          fontSize: "14px",
        }}
      >
        {description}
      </p>
    </div>
  );
}

export default Dashboard;