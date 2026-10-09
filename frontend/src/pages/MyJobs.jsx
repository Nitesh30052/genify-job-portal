import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import BackToDashboard from "../components/BackToDashboard";

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      navigate("/login");
      return;
    }

    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      const response = await api.get(
        `/jobs/recruiter/${user.id}`
      );

      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/jobs/${jobId}`);

      setJobs((prevJobs) =>
        prevJobs.filter((job) => job.id !== jobId)
      );
    } catch (error) {
      console.error("Error deleting job:", error);
      window.alert("Failed to delete job.");
    }
  };

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
    background: "rgba(255, 255, 255, 0.95)",
    borderRadius: "18px",
    padding: "clamp(20px, 3vw, 28px)",
    border: "1px solid rgba(139, 92, 246, 0.12)",
    boxShadow: "0 10px 30px rgba(79, 70, 229, 0.07)",
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    boxSizing: "border-box",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  };

  const primaryButtonStyle = {
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #6366f1, #9333ea)",
    color: "#ffffff",
    padding: "12px 16px",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 5px 14px rgba(99, 102, 241, 0.18)",
  };

  if (loading) {
    return (
      <div
        style={{
          ...pageStyle,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            ...cardStyle,
            alignItems: "center",
            width: "100%",
            maxWidth: "400px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "38px", marginBottom: "12px" }}>
            💼
          </div>

          <h2 style={{ color: "#4338ca", margin: "0 0 8px" }}>
            Loading your jobs
          </h2>

          <p style={{ color: "#6b7280", margin: 0 }}>
            Fetching your posted opportunities...
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
            boxShadow: "0 15px 35px rgba(99, 102, 241, 0.2)",
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
              RECRUITER WORKSPACE
            </span>

            <h1
              style={{
                margin: "0 0 12px",
                fontSize: "clamp(28px, 5vw, 38px)",
                fontWeight: "800",
                letterSpacing: "-0.8px",
              }}
            >
              My Jobs
            </h1>

            <p
              style={{
                margin: 0,
                maxWidth: "580px",
                color: "#ede9fe",
                fontSize: "15px",
                lineHeight: 1.8,
              }}
            >
              Manage your posted opportunities, review applicants,
              and find the right talent for your team.
            </p>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                marginTop: "24px",
                padding: "12px 17px",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <span style={{ fontSize: "24px" }}>💼</span>

              <div>
                <div
                  style={{
                    fontSize: "23px",
                    fontWeight: "800",
                    lineHeight: 1.2,
                  }}
                >
                  {jobs.length}
                </div>

                <div style={{ fontSize: "12px", opacity: 0.9 }}>
                  Jobs Posted
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Heading */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "15px",
            marginBottom: "22px",
          }}
        >
          <div>
            <h2
              style={{
                color: "#312e81",
                fontSize: "23px",
                fontWeight: "800",
                margin: "0 0 6px",
              }}
            >
              Your Opportunities
            </h2>

            <p
              style={{
                margin: 0,
                color: "#6b7280",
                fontSize: "14px",
              }}
            >
              Manage job listings and candidate applications.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/post-job")}
            style={primaryButtonStyle}
          >
            + Post a New Job
          </button>
        </div>

        {/* Empty State */}
        {jobs.length === 0 ? (
          <div
            style={{
              ...cardStyle,
              padding: "55px 25px",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "82px",
                height: "82px",
                borderRadius: "24px",
                background:
                  "linear-gradient(135deg, #ede9fe, #dbeafe)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "38px",
                marginBottom: "22px",
              }}
            >
              💼
            </div>

            <h2
              style={{
                color: "#312e81",
                margin: "0 0 12px",
                fontSize: "24px",
              }}
            >
              No jobs posted yet
            </h2>

            <p
              style={{
                color: "#6b7280",
                maxWidth: "420px",
                lineHeight: 1.7,
                margin: "0 0 25px",
              }}
            >
              Your next great hire starts here. Publish your first
              job and connect with potential candidates.
            </p>

            <button
              type="button"
              onClick={() => navigate("/post-job")}
              style={primaryButtonStyle}
            >
              Create Your First Job →
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
              gap: "22px",
            }}
          >
            {jobs.map((job) => (
              <article
                key={job.id}
                style={cardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 16px 35px rgba(79, 70, 229, 0.13)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 30px rgba(79, 70, 229, 0.07)";
                }}
              >
                <div style={{ flexGrow: 1 }}>
                  {/* Job Title */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "14px",
                      marginBottom: "22px",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        minWidth: "48px",
                        borderRadius: "14px",
                        background:
                          "linear-gradient(135deg, #ede9fe, #dbeafe)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "24px",
                      }}
                    >
                      💼
                    </div>

                    <div style={{ minWidth: 0 }}>
                      <h3
                        style={{
                          margin: "0 0 6px",
                          color: "#312e81",
                          fontSize: "20px",
                          fontWeight: "800",
                          lineHeight: 1.4,
                          overflowWrap: "anywhere",
                        }}
                      >
                        {job.title}
                      </h3>

                      <p
                        style={{
                          margin: 0,
                          color: "#6b7280",
                          fontSize: "14px",
                          overflowWrap: "anywhere",
                        }}
                      >
                        {job.company}
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <InfoRow
                    icon="📍"
                    label="Location"
                    value={job.location || "Not specified"}
                  />

                  {/* Source */}
                  <InfoRow
                    icon="🌐"
                    label="Source"
                    value={job.source || "Not specified"}
                  />

                  {/* Description */}
                  <div
                    style={{
                      marginTop: "20px",
                      paddingTop: "17px",
                      borderTop: "1px solid #ede9fe",
                    }}
                  >
                    <h4
                      style={{
                        margin: "0 0 9px",
                        color: "#4338ca",
                        fontSize: "13px",
                        fontWeight: "800",
                      }}
                    >
                      JOB DESCRIPTION
                    </h4>

                    <p
                      style={{
                        margin: 0,
                        color: "#6b7280",
                        fontSize: "14px",
                        lineHeight: 1.8,
                        overflowWrap: "anywhere",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {job.description || "No description provided."}
                    </p>
                  </div>

                  {/* Job URL */}
                  {job.jobUrl && (
                    <a
                      href={job.jobUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-block",
                        marginTop: "18px",
                        color: "#6366f1",
                        fontSize: "14px",
                        fontWeight: "700",
                        textDecoration: "none",
                      }}
                    >
                      View Job URL →
                    </a>
                  )}
                </div>

                {/* Action Buttons */}
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "25px",
                    paddingTop: "20px",
                    borderTop: "1px solid #ede9fe",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => navigate(`/applicants/${job.id}`)}
                    style={{
                      ...primaryButtonStyle,
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    View Applicants
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(job.id)}
                    style={{
                      padding: "12px 15px",
                      border: "1px solid #fecaca",
                      borderRadius: "10px",
                      background: "#fff1f2",
                      color: "#be123c",
                      fontSize: "13px",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            marginTop: "35px",
            padding: "20px 10px 5px",
            color: "#6b7280",
            fontSize: "13px",
          }}
        >
          Build your team with{" "}
          <span style={{ color: "#7c3aed", fontWeight: "800" }}>
            Genify
          </span>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        marginBottom: "16px",
      }}
    >
      <span style={{ fontSize: "18px" }}>{icon}</span>

      <div style={{ minWidth: 0 }}>
        <div
          style={{
            color: "#9ca3af",
            fontSize: "12px",
            marginBottom: "4px",
          }}
        >
          {label}
        </div>

        <div
          style={{
            color: "#374151",
            fontSize: "14px",
            fontWeight: "600",
            overflowWrap: "anywhere",
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

export default MyJobs;