import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import BackToDashboard from "../components/BackToDashboard";

function Applicants() {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  const fetchApplicants = async () => {
    setLoading(true);

    try {
      const response = await api.get(
        `/applications/job/${jobId}`
      );

      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applicants:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (applicationId, status) => {
    const previousApplications = applications;

    // Update the UI immediately.
    setApplications((prev) =>
      prev.map((application) =>
        application.id === applicationId
          ? { ...application, status }
          : application
      )
    );

    try {
      await api.put(
        `/applications/${applicationId}/status?status=${status}`
      );
    } catch (error) {
      console.error("Error updating status:", error);

      // Restore the previous status if the API fails.
      setApplications(previousApplications);

      window.alert("Failed to update application status.");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "APPLIED":
        return { background: "#dbeafe", color: "#1d4ed8" };

      case "IN_REVIEW":
        return { background: "#fef3c7", color: "#92400e" };

      case "INTERVIEW":
        return { background: "#ede9fe", color: "#6d28d9" };

      case "OFFER":
        return { background: "#dcfce7", color: "#166534" };

      case "REJECTED":
        return { background: "#fee2e2", color: "#b91c1c" };

      default:
        return { background: "#f3f4f6", color: "#374151" };
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
    background: "rgba(255,255,255,0.95)",
    border: "1px solid rgba(139,92,246,0.12)",
    borderRadius: "18px",
    padding: "clamp(20px, 3vw, 28px)",
    boxShadow: "0 10px 30px rgba(79,70,229,0.07)",
    minWidth: 0,
    boxSizing: "border-box",
  };

  const primaryButtonStyle = {
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    textAlign: "center",
    padding: "12px 15px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #6366f1, #9333ea)",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "700",
    textDecoration: "none",
    cursor: "pointer",
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
        <div style={{ ...cardStyle, textAlign: "center", width: "100%", maxWidth: "400px" }}>
          <div style={{ fontSize: "38px", marginBottom: "12px" }}>
            👥
          </div>

          <h2 style={{ color: "#4338ca", margin: "0 0 8px" }}>
            Loading applicants
          </h2>

          <p style={{ color: "#6b7280", margin: 0 }}>
            Fetching candidate details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: "1150px", margin: "0 auto", width: "100%" }}>
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
              Job Applicants
            </h1>

            <p
              style={{
                margin: 0,
                maxWidth: "600px",
                color: "#ede9fe",
                fontSize: "15px",
                lineHeight: 1.8,
              }}
            >
              Discover talented candidates, review their profiles,
              and manage their progress through your recruitment process.
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
              <span style={{ fontSize: "24px" }}>👥</span>

              <div>
                <div style={{ fontSize: "23px", fontWeight: "800" }}>
                  {applications.length}
                </div>

                <div style={{ fontSize: "12px", opacity: 0.9 }}>
                  Total Applicants
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Applicants Heading */}
        <div style={{ marginBottom: "22px" }}>
          <h2
            style={{
              color: "#312e81",
              fontSize: "23px",
              fontWeight: "800",
              margin: "0 0 6px",
            }}
          >
            Candidate Profiles
          </h2>

          <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>
            Review candidate qualifications and update application statuses.
          </p>
        </div>

        {/* Empty State */}
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
                width: "82px",
                height: "82px",
                borderRadius: "24px",
                background: "linear-gradient(135deg, #ede9fe, #dbeafe)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "38px",
                margin: "0 auto 22px",
              }}
            >
              👥
            </div>

            <h2 style={{ color: "#312e81", margin: "0 0 12px" }}>
              No applicants yet
            </h2>

            <p
              style={{
                color: "#6b7280",
                maxWidth: "420px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              No candidates have applied for this job yet.
              Applicants will appear here when applications are submitted.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 330px), 1fr))",
              gap: "22px",
            }}
          >
            {applications.map((application) => {
              const statusStyle = getStatusStyle(application.status);

              return (
                <article
                  key={application.id}
                  style={cardStyle}
                >
                  {/* Candidate Header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      marginBottom: "20px",
                    }}
                  >
                    <div
                      style={{
                        width: "52px",
                        height: "52px",
                        minWidth: "52px",
                        borderRadius: "16px",
                        background:
                          "linear-gradient(135deg, #ede9fe, #dbeafe)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "25px",
                      }}
                    >
                      👤
                    </div>

                    <div style={{ minWidth: 0 }}>
                      <h3
                        style={{
                          margin: "0 0 5px",
                          fontSize: "19px",
                          color: "#312e81",
                          fontWeight: "800",
                          overflowWrap: "anywhere",
                        }}
                      >
                        {application.applicantName ||
                          application.user?.name ||
                          "Unknown User"}
                      </h3>

                      <p
                        style={{
                          margin: 0,
                          color: "#6b7280",
                          fontSize: "13px",
                          overflowWrap: "anywhere",
                        }}
                      >
                        {application.applicantEmail ||
                          application.user?.email ||
                          "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div style={{ marginBottom: "22px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "7px 12px",
                        borderRadius: "20px",
                        background: statusStyle.background,
                        color: statusStyle.color,
                        fontSize: "11px",
                        fontWeight: "800",
                      }}
                    >
                      {(application.status || "UNKNOWN").replace(/_/g, " ")}
                    </span>
                  </div>

                  {/* Candidate Details */}
                  <div
                    style={{
                      background: "#f8f7ff",
                      border: "1px solid #ede9fe",
                      borderRadius: "13px",
                      padding: "17px",
                      marginBottom: "18px",
                    }}
                  >
                    <h4
                      style={{
                        margin: "0 0 16px",
                        color: "#4338ca",
                        fontSize: "13px",
                        fontWeight: "800",
                        letterSpacing: "0.5px",
                      }}
                    >
                      CANDIDATE DETAILS
                    </h4>

                    <DetailRow label="📱 Phone" value={application.phone} />
                    <DetailRow label="🎓 Degree" value={application.degree} />
                    <DetailRow label="📚 Department" value={application.department} />
                    <DetailRow label="🏫 College" value={application.college} />
                    <DetailRow label="📅 Graduation" value={application.graduationYear} />
                    <DetailRow label="💻 Skills" value={application.skills} />
                    <DetailRow
                      label="💼 Experience"
                      value={application.experience || "Fresher / Not provided"}
                    />
                  </div>

                  {/* Resume and Social Links */}
                  <div
                    style={{
                      display: "grid",
                      gap: "10px",
                      marginBottom: "20px",
                    }}
                  >
                    {application.resumeUrl && (
                      <a
                        href={application.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={primaryButtonStyle}
                      >
                        📄 View Resume
                      </a>
                    )}

                    {application.linkedinUrl && (
                      <a
                        href={application.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          ...primaryButtonStyle,
                          background: "#0a66c2",
                        }}
                      >
                        🔗 LinkedIn Profile
                      </a>
                    )}

                    {application.githubUrl && (
                      <a
                        href={application.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          ...primaryButtonStyle,
                          background: "#24292f",
                        }}
                      >
                        💻 GitHub Profile
                      </a>
                    )}
                  </div>

                  {/* Notes */}
                  <div
                    style={{
                      background: "#f8f7ff",
                      border: "1px solid #ede9fe",
                      padding: "14px",
                      borderRadius: "11px",
                      marginBottom: "18px",
                    }}
                  >
                    <div
                      style={{
                        color: "#4338ca",
                        fontSize: "12px",
                        fontWeight: "800",
                        marginBottom: "7px",
                      }}
                    >
                      RECRUITER NOTES
                    </div>

                    <p
                      style={{
                        margin: 0,
                        color: "#4b5563",
                        fontSize: "13px",
                        lineHeight: 1.7,
                        overflowWrap: "anywhere",
                      }}
                    >
                      {application.notes || "No notes"}
                    </p>
                  </div>

                  {/* Applied Date */}
                  <p
                    style={{
                      margin: "0 0 22px",
                      color: "#6b7280",
                      fontSize: "13px",
                    }}
                  >
                    <strong>Applied:</strong>{" "}
                    {application.appliedAt
                      ? new Date(application.appliedAt).toLocaleString()
                      : "N/A"}
                  </p>

                  {/* Change Status */}
                  <label
                    htmlFor={`status-${application.id}`}
                    style={{
                      display: "block",
                      marginBottom: "9px",
                      fontWeight: "700",
                      color: "#3730a3",
                      fontSize: "13px",
                    }}
                  >
                    Update Application Status
                  </label>

                  <select
                    id={`status-${application.id}`}
                    value={application.status || "APPLIED"}
                    onChange={(e) =>
                      handleStatusChange(application.id, e.target.value)
                    }
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      padding: "13px",
                      border: "1px solid #ddd6fe",
                      borderRadius: "10px",
                      background: "#ffffff",
                      color: "#3730a3",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  >
                    <option value="APPLIED">Applied</option>
                    <option value="IN_REVIEW">In Review</option>
                    <option value="INTERVIEW">Interview</option>
                    <option value="REJECTED">Rejected</option>
                    <option value="OFFER">Offer</option>
                  </select>
                </article>
              );
            })}
          </div>
        )}

        <div
          style={{
            textAlign: "center",
            marginTop: "35px",
            padding: "20px 10px 5px",
            color: "#6b7280",
            fontSize: "13px",
          }}
        >
          Find great talent with{" "}
          <span style={{ color: "#7c3aed", fontWeight: "800" }}>
            Genify
          </span>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        marginBottom: "13px",
        color: "#374151",
        fontSize: "13px",
        lineHeight: 1.6,
      }}
    >
      <strong style={{ color: "#6b7280" }}>{label}</strong>

      <span style={{ overflowWrap: "anywhere" }}>
        {value || "Not provided"}
      </span>
    </div>
  );
}

export default Applicants;