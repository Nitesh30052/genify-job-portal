import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import BackToDashboard from "../components/BackToDashboard";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      navigate("/login");
      return;
    }

    fetchApplications();

    if (location.state?.successMessage) {
      setSuccessMessage(location.state.successMessage);

      // Remove message from browser history
      // so it does not appear again after refresh.
      navigate(location.pathname, {
        replace: true,
        state: {},
      });
    }
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await api.get(
        `/applications/user/${user.id}`
      );

      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "APPLIED":
        return {
          background: "#dbeafe",
          color: "#1d4ed8",
        };

      case "IN_REVIEW":
        return {
          background: "#fef3c7",
          color: "#92400e",
        };

      case "INTERVIEW":
        return {
          background: "#ede9fe",
          color: "#6d28d9",
        };

      case "OFFER":
        return {
          background: "#dcfce7",
          color: "#166534",
        };

      case "REJECTED":
        return {
          background: "#fee2e2",
          color: "#b91c1c",
        };

      default:
        return {
          background: "#f3f4f6",
          color: "#374151",
        };
    }
  };

  const pageStyle = {
    minHeight: "100vh",
    padding: "clamp(20px, 5vw, 50px) clamp(15px, 4vw, 40px)",
    background:
      "linear-gradient(135deg, #f5f3ff 0%, #eff6ff 50%, #faf5ff 100%)",
    boxSizing: "border-box",
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  };

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.92)",
    border: "1px solid rgba(139, 92, 246, 0.12)",
    borderRadius: "18px",
    padding: "clamp(20px, 3vw, 28px)",
    boxShadow: "0 10px 30px rgba(79, 70, 229, 0.07)",
    boxSizing: "border-box",
    minWidth: 0,
  };

  const primaryButtonStyle = {
    border: "none",
    borderRadius: "10px",
    padding: "12px 20px",
    color: "#ffffff",
    background: "linear-gradient(135deg, #6366f1, #9333ea)",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    boxShadow: "0 5px 14px rgba(99, 102, 241, 0.2)",
  };

  if (loading) {
    return (
      <div
        style={{
          ...pageStyle,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            ...cardStyle,
            textAlign: "center",
            width: "100%",
            maxWidth: "420px",
          }}
        >
          <div
            style={{
              fontSize: "36px",
              marginBottom: "12px",
            }}
          >
            💼
          </div>

          <h2
            style={{
              color: "#4338ca",
              margin: "0 0 8px",
            }}
          >
            Loading applications
          </h2>

          <p style={{ color: "#6b7280", margin: 0 }}>
            Fetching your application details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div
        style={{
          maxWidth: "1150px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <BackToDashboard />

        {/* Page Header */}
        <section
          style={{
            background:
              "linear-gradient(120deg, #4f46e5 0%, #7c3aed 55%, #9333ea 100%)",
            borderRadius: "22px",
            padding: "clamp(25px, 5vw, 42px)",
            marginTop: "25px",
            marginBottom: "28px",
            color: "#ffffff",
            boxShadow: "0 15px 35px rgba(99, 102, 241, 0.22)",
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
              right: "-55px",
              top: "-90px",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                fontSize: "13px",
                fontWeight: "700",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                opacity: 0.85,
                marginBottom: "12px",
              }}
            >
              Your Career Journey
            </div>

            <h1
              style={{
                margin: "0 0 12px",
                fontSize: "clamp(28px, 5vw, 38px)",
                fontWeight: "800",
                letterSpacing: "-0.8px",
              }}
            >
              My Applications
            </h1>

            <p
              style={{
                margin: 0,
                maxWidth: "600px",
                lineHeight: 1.7,
                fontSize: "15px",
                color: "#ede9fe",
              }}
            >
              Track your job applications, monitor their progress,
              and stay updated on your career opportunities.
            </p>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "24px",
                padding: "12px 17px",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <span style={{ fontSize: "22px" }}>📋</span>

              <div>
                <div
                  style={{
                    fontSize: "23px",
                    fontWeight: "800",
                    lineHeight: 1.2,
                  }}
                >
                  {applications.length}
                </div>

                <div style={{ fontSize: "12px", opacity: 0.9 }}>
                  Total Applications
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Message */}
        {successMessage && (
          <div
            role="status"
            style={{
              background: "#ecfdf5",
              color: "#047857",
              border: "1px solid #a7f3d0",
              padding: "16px 18px",
              borderRadius: "12px",
              marginBottom: "25px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              boxShadow: "0 4px 15px rgba(16, 185, 129, 0.06)",
            }}
          >
            <span style={{ fontSize: "22px" }}>✓</span>
            <span style={{ fontWeight: "600" }}>
              {successMessage}
            </span>
          </div>
        )}

        {/* Section Heading */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <div>
            <h2
              style={{
                color: "#1e1b4b",
                margin: "0 0 6px",
                fontSize: "23px",
                fontWeight: "800",
              }}
            >
              Application History
            </h2>

            <p
              style={{
                margin: 0,
                color: "#6b7280",
                fontSize: "14px",
              }}
            >
              All the opportunities you have applied for.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/jobs")}
            style={primaryButtonStyle}
          >
            + Find More Jobs
          </button>
        </div>

        {/* Applications */}
        {applications.length === 0 ? (
          <div
            style={{
              ...cardStyle,
              padding: "55px 25px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "24px",
                background:
                  "linear-gradient(135deg, #ede9fe, #dbeafe)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "36px",
                margin: "0 auto 22px",
              }}
            >
              📋
            </div>

            <h2
              style={{
                color: "#312e81",
                margin: "0 0 12px",
                fontSize: "24px",
              }}
            >
              No applications yet
            </h2>

            <p
              style={{
                color: "#6b7280",
                lineHeight: 1.7,
                maxWidth: "420px",
                margin: "0 auto 25px",
              }}
            >
              Your next opportunity could be just around the
              corner. Explore available jobs and take the next
              step in your career.
            </p>

            <button
              type="button"
              onClick={() => navigate("/jobs")}
              style={primaryButtonStyle}
            >
              Explore Jobs →
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 310px), 1fr))",
              gap: "22px",
            }}
          >
            {applications.map((application) => {
              const statusStyle = getStatusStyle(
                application.status
              );

              return (
                <article
                  key={application.id}
                  style={{
                    ...cardStyle,
                    display: "flex",
                    flexDirection: "column",
                    transition:
                      "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 16px 35px rgba(79, 70, 229, 0.13)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 30px rgba(79, 70, 229, 0.07)";
                  }}
                >
                  {/* Job Title and Status */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "12px",
                      marginBottom: "22px",
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          width: "46px",
                          height: "46px",
                          borderRadius: "13px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background:
                            "linear-gradient(135deg, #ede9fe, #dbeafe)",
                          fontSize: "23px",
                          marginBottom: "15px",
                        }}
                      >
                        💼
                      </div>

                      <h3
                        style={{
                          color: "#312e81",
                          fontSize: "20px",
                          fontWeight: "800",
                          lineHeight: 1.4,
                          margin: 0,
                          overflowWrap: "anywhere",
                        }}
                      >
                        {application.job?.title || "Job Title"}
                      </h3>
                    </div>

                    <span
                      style={{
                        background: statusStyle.background,
                        color: statusStyle.color,
                        padding: "7px 11px",
                        borderRadius: "20px",
                        fontSize: "11px",
                        fontWeight: "800",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      {(application.status || "UNKNOWN")
                        .replace(/_/g, " ")}
                    </span>
                  </div>

                  {/* Company */}
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "flex-start",
                      marginBottom: "16px",
                    }}
                  >
                    <span style={{ fontSize: "19px" }}>🏢</span>

                    <div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#9ca3af",
                          marginBottom: "4px",
                        }}
                      >
                        Company
                      </div>

                      <div
                        style={{
                          color: "#374151",
                          fontSize: "14px",
                          fontWeight: "600",
                          overflowWrap: "anywhere",
                        }}
                      >
                        {application.job?.company || "N/A"}
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "flex-start",
                      marginBottom: "20px",
                    }}
                  >
                    <span style={{ fontSize: "19px" }}>📍</span>

                    <div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#9ca3af",
                          marginBottom: "4px",
                        }}
                      >
                        Location
                      </div>

                      <div
                        style={{
                          color: "#374151",
                          fontSize: "14px",
                          fontWeight: "600",
                          overflowWrap: "anywhere",
                        }}
                      >
                        {application.job?.location || "N/A"}
                      </div>
                    </div>
                  </div>

                  {/* Applied Date */}
                  <div
                    style={{
                      borderTop: "1px solid #ede9fe",
                      marginTop: "auto",
                      paddingTop: "17px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        color: "#6b7280",
                        fontSize: "13px",
                      }}
                    >
                      Applied on
                    </span>

                    <span
                      style={{
                        color: "#4f46e5",
                        fontSize: "13px",
                        fontWeight: "700",
                      }}
                    >
                      {application.appliedAt
                        ? new Date(
                            application.appliedAt
                          ).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "N/A"}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Bottom Note */}
        <div
          style={{
            textAlign: "center",
            marginTop: "35px",
            padding: "20px",
            color: "#6b7280",
            fontSize: "13px",
          }}
        >
          Built for your next career move ·{" "}
          <span
            style={{
              color: "#7c3aed",
              fontWeight: "700",
            }}
          >
            Genify
          </span>
        </div>
      </div>
    </div>
  );
}

export default MyApplications;