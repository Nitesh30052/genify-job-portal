import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Unable to load user information:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!user) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #eef2ff, #f5f3ff)",
          color: "#6366f1",
          fontFamily: "Inter, Arial, sans-serif",
          fontSize: "16px",
          fontWeight: "600",
        }}
      >
        Loading your dashboard...
      </div>
    );
  }

  const isRecruiter = user.role === "RECRUITER";

  const actions = isRecruiter
    ? [
        {
          icon: "📝",
          title: "Post a Job",
          description:
            "Create a new job opening and reach potential candidates.",
          button: "Create Job",
          path: "/post-job",
          color: "#4f46e5",
          background: "linear-gradient(135deg, #eef2ff, #e0e7ff)",
        },
        {
          icon: "💼",
          title: "My Jobs",
          description:
            "View and manage the job opportunities you have posted.",
          button: "Manage Jobs",
          path: "/my-jobs",
          color: "#7c3aed",
          background: "linear-gradient(135deg, #f3e8ff, #ede9fe)",
        },
        {
          icon: "👤",
          title: "My Profile",
          description:
            "View your account information and account type.",
          button: "View Profile",
          path: "/profile",
          color: "#6d28d9",
          background: "linear-gradient(135deg, #f5f3ff, #ede9fe)",
        },
      ]
    : [
        {
          icon: "🔎",
          title: "Find Jobs",
          description:
            "Explore available job opportunities and find your next role.",
          button: "Explore Jobs",
          path: "/jobs",
          color: "#4f46e5",
          background: "linear-gradient(135deg, #eef2ff, #e0e7ff)",
        },
        {
          icon: "📋",
          title: "My Applications",
          description:
            "Review your submitted applications and track their status.",
          button: "View Applications",
          path: "/my-applications",
          color: "#7c3aed",
          background: "linear-gradient(135deg, #f3e8ff, #ede9fe)",
        },
        {
          icon: "👤",
          title: "My Profile",
          description:
            "View your account information and account type.",
          button: "View Profile",
          path: "/profile",
          color: "#6d28d9",
          background: "linear-gradient(135deg, #f5f3ff, #ede9fe)",
        },
      ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8faff",
        fontFamily: "Inter, Arial, sans-serif",
        color: "#111827",
      }}
    >
      <Navbar />

      <main
        style={{
          width: "100%",
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "35px 24px 60px",
          boxSizing: "border-box",
        }}
      >
        {/* WELCOME SECTION */}
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "clamp(28px, 5vw, 48px)",
            borderRadius: "24px",
            background:
              "radial-gradient(circle at 90% 15%, rgba(255,255,255,0.18), transparent 30%), linear-gradient(120deg, #4338ca 0%, #6d28d9 55%, #9333ea 100%)",
            color: "#ffffff",
            marginBottom: "38px",
            boxShadow: "0 15px 35px rgba(79,70,229,0.18)",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "220px",
              height: "220px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.12)",
              right: "-55px",
              top: "-100px",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "absolute",
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.12)",
              right: "55px",
              bottom: "-100px",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <span
              style={{
                display: "inline-block",
                padding: "8px 13px",
                borderRadius: "30px",
                backgroundColor: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.18)",
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: "0.5px",
                marginBottom: "20px",
              }}
            >
              {isRecruiter
                ? "RECRUITER DASHBOARD"
                : "JOB SEEKER DASHBOARD"}
            </span>

            <p
              style={{
                margin: "0 0 8px",
                color: "#e0e7ff",
                fontSize: "15px",
                fontWeight: "600",
              }}
            >
              Welcome back 👋
            </p>

            <h1
              style={{
                margin: "0 0 15px",
                fontSize: "clamp(29px, 5vw, 43px)",
                fontWeight: "800",
                letterSpacing: "-1px",
                overflowWrap: "anywhere",
              }}
            >
              Hello, {user.name}!
            </h1>

            <p
              style={{
                margin: "0",
                color: "#e0e7ff",
                fontSize: "15px",
                lineHeight: "1.8",
                overflowWrap: "anywhere",
              }}
            >
              {isRecruiter
                ? "Manage your job postings and discover potential candidates."
                : "Discover opportunities and take the next step in your career."}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "12px",
                marginTop: "25px",
              }}
            >
              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: "9px",
                  backgroundColor: "rgba(255,255,255,0.12)",
                  fontSize: "13px",
                  color: "#ffffff",
                  overflowWrap: "anywhere",
                }}
              >
                ✉️ {user.email}
              </div>

              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: "9px",
                  backgroundColor: "rgba(255,255,255,0.12)",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#ffffff",
                }}
              >
                ✓ {isRecruiter ? "Recruiter" : "Job Seeker"}
              </div>
            </div>
          </div>
        </section>

        {/* QUICK ACTIONS HEADER */}
        <section>
          <div style={{ marginBottom: "27px" }}>
            <p
              style={{
                margin: "0 0 9px",
                color: "#6366f1",
                fontSize: "12px",
                fontWeight: "800",
                letterSpacing: "1.8px",
              }}
            >
              YOUR WORKSPACE
            </p>

            <h2
              style={{
                margin: "0 0 10px",
                fontSize: "clamp(25px, 4vw, 32px)",
                fontWeight: "800",
                color: "#111827",
                letterSpacing: "-0.7px",
              }}
            >
              Quick Actions
            </h2>

            <p
              style={{
                margin: 0,
                color: "#64748b",
                fontSize: "15px",
                lineHeight: "1.7",
              }}
            >
              {isRecruiter
                ? "Everything you need to manage your hiring activities."
                : "Everything you need to manage your job search."}
            </p>
          </div>

          {/* ACTION CARDS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 270px), 1fr))",
              gap: "24px",
            }}
          >
            {actions.map((action) => (
              <ActionCard
                key={action.title}
                {...action}
                onClick={() => navigate(action.path)}
              />
            ))}
          </div>
        </section>

        {/* BOTTOM BANNER */}
        <section
          style={{
            marginTop: "38px",
            padding: "25px 28px",
            borderRadius: "17px",
            border: "1px solid #e8eaff",
            background:
              "linear-gradient(120deg, #ffffff, #f5f3ff)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "18px",
          }}
        >
          <div>
            <h3
              style={{
                margin: "0 0 8px",
                fontSize: "18px",
                color: "#312e81",
                fontWeight: "750",
              }}
            >
              Make your next move with Genify.
            </h3>

            <p
              style={{
                margin: 0,
                color: "#64748b",
                fontSize: "14px",
                lineHeight: "1.7",
              }}
            >
              {isRecruiter
                ? "Keep your job listings updated and review your applicants."
                : "Explore new opportunities and keep track of your applications."}
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate(isRecruiter ? "/my-jobs" : "/jobs")
            }
            style={{
              padding: "12px 19px",
              border: "none",
              borderRadius: "9px",
              background:
                "linear-gradient(135deg, #4f46e5, #7c3aed)",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 5px 15px rgba(79,70,229,0.18)",
            }}
          >
            {isRecruiter ? "Manage My Jobs →" : "Explore Jobs →"}
          </button>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          padding: "24px 20px",
          textAlign: "center",
          borderTop: "1px solid #e8ecf5",
          backgroundColor: "#ffffff",
          color: "#94a3b8",
          fontSize: "12px",
        }}
      >
        © {new Date().getFullYear()} Genify · Job Application Platform
      </footer>
    </div>
  );
}

function ActionCard({
  icon,
  title,
  description,
  button,
  color,
  background,
  onClick,
}) {
  return (
    <article
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      role="link"
      tabIndex={0}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        backgroundColor: "#ffffff",
        border: "1px solid #e8ecf5",
        borderRadius: "18px",
        padding: "27px",
        cursor: "pointer",
        boxShadow: "0 6px 22px rgba(15,23,42,0.04)",
        transition: "transform 0.2s, box-shadow 0.2s",
        minWidth: 0,
        boxSizing: "border-box",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow =
          "0 15px 35px rgba(79,70,229,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 6px 22px rgba(15,23,42,0.04)";
      }}
    >
      <div
        style={{
          width: "58px",
          height: "58px",
          borderRadius: "16px",
          background,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "28px",
          marginBottom: "22px",
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          margin: "0 0 11px",
          fontSize: "19px",
          fontWeight: "750",
          color: "#111827",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          margin: "0 0 24px",
          color: "#64748b",
          lineHeight: "1.8",
          fontSize: "14px",
          flex: 1,
        }}
      >
        {description}
      </p>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        style={{
          width: "100%",
          padding: "12px 15px",
          border: "1px solid #e0e7ff",
          borderRadius: "9px",
          background: "linear-gradient(135deg, #eef2ff, #f5f3ff)",
          color,
          fontSize: "14px",
          fontWeight: "700",
          cursor: "pointer",
        }}
      >
        {button} →
      </button>
    </article>
  );
}

export default Dashboard;