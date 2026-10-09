import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import BackToDashboard from "../components/BackToDashboard";

const pageBackground = {
  minHeight: "100vh",
  background:
    "linear-gradient(135deg, #f5f3ff 0%, #eff6ff 50%, #faf5ff 100%)",
  padding: "clamp(20px, 4vw, 45px) clamp(14px, 4vw, 40px)",
  boxSizing: "border-box",
  color: "#1f2937",
  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
};

const primaryButton = {
  border: "none",
  borderRadius: "12px",
  padding: "13px 20px",
  background: "linear-gradient(135deg, #6366f1, #9333ea)",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "700",
  cursor: "pointer",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "13px 15px",
  border: "1px solid #e0e7ff",
  borderRadius: "10px",
  background: "#ffffff",
  color: "#1f2937",
  fontSize: "14px",
  outline: "none",
};

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [selectedJob, setSelectedJob] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const [formData, setFormData] = useState({
    applicantName: user?.name || "",
    applicantEmail: user?.email || "",
    phone: "",
    degree: "",
    department: "",
    college: "",
    graduationYear: "",
    skills: "",
    experience: "",
    resumeUrl: "",
    linkedinUrl: "",
    githubUrl: "",
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setFetchError("");
      const response = await api.get("/jobs");
      setJobs(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setFetchError(
        "Unable to load jobs right now. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // OPEN APPLICATION FORM
  // =========================

  const handleApply = (job) => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role && user.role !== "JOB_SEEKER") {
      setMessage("Only job seekers can apply for jobs.");
      setMessageType("error");
      return;
    }

    setSelectedJob(job);

    setFormData((previous) => ({
      ...previous,
      applicantName: user.name || "",
      applicantEmail: user.email || "",
    }));

    setMessage("");
    setMessageType("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmitApplication = async (event) => {
    event.preventDefault();

    if (!selectedJob || !user) {
      return;
    }

    setSubmitting(true);
    setMessage("");
    setMessageType("");

    try {
      await api.post("/applications", null, {
        params: {
          userId: user.id,
          jobId: selectedJob.id,

          applicantName: formData.applicantName,
          applicantEmail: formData.applicantEmail,
          phone: formData.phone,
          degree: formData.degree,
          department: formData.department,
          college: formData.college,
          graduationYear: formData.graduationYear,
          skills: formData.skills,
          experience: formData.experience,
          resumeUrl: formData.resumeUrl,
          linkedinUrl: formData.linkedinUrl,
          githubUrl: formData.githubUrl,
        },
      });

      // Close the application form
      setSelectedJob(null);
      setMessage("Your application has been submitted successfully!");
      setMessageType("success");

      // Keep the success message visible before redirecting.
      window.setTimeout(() => {
        navigate("/my-applications", {
          state: {
            successMessage: "Application submitted successfully!",
          },
        });
      }, 1800);
    } catch (error) {
      console.error("Application error:", error);

      const responseData = error.response?.data;

      setMessage(
        typeof responseData === "string"
          ? responseData
          : "Failed to submit your application. Please try again."
      );

      setMessageType("error");
    } finally {
      setSubmitting(false);
    }
  };

  const closeApplicationForm = () => {
    if (submitting) return;

    setSelectedJob(null);
    setMessage("");
    setMessageType("");
  };

  const filteredJobs = jobs.filter((job) => {
    const searchText = search.trim().toLowerCase();

    return (
      job.title?.toLowerCase().includes(searchText) ||
      job.company?.toLowerCase().includes(searchText) ||
      job.location?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div style={pageBackground}>
      <style>{`
        .jobs-search:focus,
        .application-input:focus,
        .application-textarea:focus {
          border-color: #818cf8 !important;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
        }

        .job-card {
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }

        .job-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 35px rgba(79,70,229,0.12) !important;
        }

        .job-apply-button:hover {
          box-shadow: 0 7px 18px rgba(99,102,241,0.25);
        }

        .job-modal-overlay {
          animation: jobsFadeIn 0.2s ease;
        }

        .job-modal-content {
          animation: jobsSlideUp 0.25s ease;
        }

        @keyframes jobsFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes jobsSlideUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 600px) {
          .jobs-hero-title {
            font-size: 31px !important;
          }

          .jobs-stats {
            grid-template-columns: 1fr !important;
          }

          .application-modal-content {
            padding: 21px !important;
          }

          .application-action-buttons {
            flex-direction: column-reverse !important;
          }

          .application-action-buttons button {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .job-card,
          .job-modal-content,
          .job-modal-overlay {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <main
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <BackToDashboard />

        {/* Hero Section */}
        <section
          style={{
            marginTop: "25px",
            marginBottom: "30px",
            padding: "clamp(25px, 5vw, 48px)",
            borderRadius: "26px",
            background:
              "linear-gradient(120deg, #4f46e5 0%, #7c3aed 55%, #9333ea 100%)",
            color: "#ffffff",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 18px 45px rgba(79,70,229,0.20)",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "230px",
              height: "230px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.07)",
              top: "-110px",
              right: "-45px",
            }}
          />

          <div
            style={{
              position: "absolute",
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
              bottom: "-100px",
              right: "180px",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <span
              style={{
                display: "inline-block",
                padding: "7px 13px",
                borderRadius: "30px",
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.2)",
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: "0.5px",
                marginBottom: "17px",
              }}
            >
              YOUR NEXT OPPORTUNITY STARTS HERE
            </span>

            <h1
              className="jobs-hero-title"
              style={{
                fontSize: "clamp(32px, 5vw, 45px)",
                lineHeight: 1.15,
                letterSpacing: "-1.3px",
                margin: "0 0 15px",
                fontWeight: "800",
                maxWidth: "700px",
              }}
            >
              Find Jobs That Move You Forward
            </h1>

            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.8,
                maxWidth: "610px",
                color: "#ede9fe",
                margin: "0",
              }}
            >
              Explore opportunities, discover your next career move,
              and apply for roles that match your skills.
            </p>

            <div
              className="jobs-stats"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 180px))",
                gap: "12px",
                marginTop: "28px",
              }}
            >
              <div
                style={{
                  padding: "15px",
                  borderRadius: "14px",
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.14)",
                }}
              >
                <div style={{ fontSize: "25px", fontWeight: "800" }}>
                  {jobs.length}
                </div>
                <div style={{ fontSize: "12px", color: "#ede9fe" }}>
                  Available Jobs
                </div>
              </div>

              <div
                style={{
                  padding: "15px",
                  borderRadius: "14px",
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.14)",
                }}
              >
                <div style={{ fontSize: "25px", fontWeight: "800" }}>
                  {filteredJobs.length}
                </div>
                <div style={{ fontSize: "12px", color: "#ede9fe" }}>
                  Matching Results
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section
          style={{
            background: "#ffffff",
            padding: "clamp(18px, 3vw, 26px)",
            borderRadius: "20px",
            border: "1px solid #e9e7ff",
            boxShadow: "0 7px 25px rgba(79,70,229,0.06)",
            marginBottom: "30px",
          }}
        >
          <label
            htmlFor="job-search"
            style={{
              display: "block",
              fontSize: "15px",
              fontWeight: "750",
              marginBottom: "12px",
              color: "#312e81",
            }}
          >
            Find your perfect role
          </label>

          <div style={{ position: "relative" }}>
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "19px",
              }}
            >
              🔍
            </span>

            <input
              id="job-search"
              className="jobs-search"
              type="search"
              placeholder="Search by job title, company, or location..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              style={{
                ...inputStyle,
                padding: "16px 45px",
                borderRadius: "12px",
                fontSize: "14px",
                background: "#fafaff",
              }}
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear job search"
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  border: "none",
                  background: "transparent",
                  color: "#6b7280",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
              >
                ×
              </button>
            )}
          </div>
        </section>

        {/* General Error */}
        {message && !selectedJob && messageType === "error" && (
          <div
            role="alert"
            style={{
              background: "#fff1f2",
              border: "1px solid #fecdd3",
              color: "#be123c",
              padding: "15px 18px",
              borderRadius: "13px",
              marginBottom: "22px",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            {message}
          </div>
        )}

        {/* Jobs Heading */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "23px",
                fontWeight: "800",
                color: "#1e1b4b",
                margin: "0 0 5px",
              }}
            >
              Explore Opportunities
            </h2>

            <p
              style={{
                color: "#6b7280",
                fontSize: "13px",
                margin: 0,
              }}
            >
              {loading
                ? "Finding available positions..."
                : `${filteredJobs.length} ${
                    filteredJobs.length === 1 ? "position" : "positions"
                  } found`}
            </p>
          </div>

          {!loading && (
            <button
              type="button"
              onClick={fetchJobs}
              style={{
                border: "1px solid #ddd6fe",
                background: "#ffffff",
                color: "#6d28d9",
                borderRadius: "10px",
                padding: "10px 14px",
                fontWeight: "700",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              ↻ Refresh Jobs
            </button>
          )}
        </div>

        {/* Loading */}
        {loading ? (
          <div
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              padding: "55px 20px",
              textAlign: "center",
              border: "1px solid #e9e7ff",
            }}
          >
            <div style={{ fontSize: "35px", marginBottom: "12px" }}>
              💼
            </div>
            <h3 style={{ color: "#312e81", margin: "0 0 8px" }}>
              Finding opportunities
            </h3>
            <p style={{ color: "#6b7280", fontSize: "14px" }}>
              Please wait while we load available jobs.
            </p>
          </div>
        ) : fetchError ? (
          <div
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              padding: "45px 20px",
              textAlign: "center",
              border: "1px solid #fecaca",
            }}
          >
            <div style={{ fontSize: "36px" }}>⚠️</div>
            <h3 style={{ color: "#991b1b" }}>Unable to load jobs</h3>
            <p style={{ color: "#6b7280", fontSize: "14px" }}>
              {fetchError}
            </p>
            <button
              type="button"
              onClick={fetchJobs}
              style={primaryButton}
            >
              Try Again
            </button>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              padding: "55px 20px",
              textAlign: "center",
              border: "1px solid #e9e7ff",
              boxShadow: "0 7px 25px rgba(79,70,229,0.04)",
            }}
          >
            <div style={{ fontSize: "45px", marginBottom: "12px" }}>
              {search ? "🔎" : "💼"}
            </div>

            <h3 style={{ color: "#312e81", margin: "0 0 10px" }}>
              {search ? "No matching jobs found" : "No jobs available yet"}
            </h3>

            <p
              style={{
                color: "#6b7280",
                maxWidth: "420px",
                margin: "0 auto 20px",
                lineHeight: 1.7,
                fontSize: "14px",
              }}
            >
              {search
                ? "Try another job title, company, or location."
                : "Check back soon for new opportunities."}
            </p>

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                style={primaryButton}
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 290px), 1fr))",
              gap: "22px",
              alignItems: "stretch",
            }}
          >
            {filteredJobs.map((job) => (
              <article
                className="job-card"
                key={job.id}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e9e7ff",
                  borderRadius: "20px",
                  padding: "24px",
                  boxShadow: "0 5px 20px rgba(79,70,229,0.05)",
                  display: "flex",
                  flexDirection: "column",
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "14px",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      width: "49px",
                      height: "49px",
                      flexShrink: 0,
                      borderRadius: "14px",
                      background:
                        "linear-gradient(135deg, #ede9fe, #dbeafe)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#6d28d9",
                      fontSize: "24px",
                      fontWeight: "800",
                    }}
                  >
                    {(job.company || "J").charAt(0).toUpperCase()}
                  </div>

                  <div style={{ minWidth: 0, flex: 1 }}>
                    <h3
                      style={{
                        color: "#1e1b4b",
                        fontSize: "18px",
                        fontWeight: "800",
                        lineHeight: 1.4,
                        margin: "0 0 5px",
                        overflowWrap: "anywhere",
                      }}
                    >
                      {job.title || "Untitled Position"}
                    </h3>

                    <p
                      style={{
                        color: "#7c3aed",
                        fontSize: "13px",
                        fontWeight: "650",
                        margin: 0,
                        overflowWrap: "anywhere",
                      }}
                    >
                      {job.company || "Company not specified"}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginBottom: "17px",
                  }}
                >
                  <span
                    style={{
                      background: "#eef2ff",
                      color: "#4338ca",
                      borderRadius: "8px",
                      padding: "7px 10px",
                      fontSize: "12px",
                      fontWeight: "650",
                    }}
                  >
                    📍 {job.location || "Location not specified"}
                  </span>

                  {job.source && (
                    <span
                      style={{
                        background: "#f5f3ff",
                        color: "#6d28d9",
                        borderRadius: "8px",
                        padding: "7px 10px",
                        fontSize: "12px",
                        fontWeight: "650",
                      }}
                    >
                      {job.source}
                    </span>
                  )}
                </div>

                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "13px",
                    lineHeight: 1.8,
                    margin: "0 0 24px",
                    flexGrow: 1,
                    overflowWrap: "anywhere",
                    whiteSpace: "pre-line",
                  }}
                >
                  {job.description || "No job description provided."}
                </p>

                <button
                  type="button"
                  className="job-apply-button"
                  onClick={() => handleApply(job)}
                  style={{
                    ...primaryButton,
                    width: "100%",
                    marginTop: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  Apply Now <span aria-hidden="true">→</span>
                </button>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Success Popup */}
      {message && !selectedJob && messageType === "success" && (
        <div
          className="job-modal-overlay"
          role="status"
          aria-live="polite"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 3000,
            background: "rgba(30,27,75,0.55)",
            backdropFilter: "blur(5px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "18px",
            boxSizing: "border-box",
          }}
        >
          <div
            className="job-modal-content"
            style={{
              width: "100%",
              maxWidth: "410px",
              background: "#ffffff",
              padding: "35px 25px",
              borderRadius: "24px",
              textAlign: "center",
              boxShadow: "0 25px 70px rgba(30,27,75,0.25)",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                width: "66px",
                height: "66px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
                color: "#15803d",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto 20px",
                fontSize: "34px",
                fontWeight: "800",
              }}
            >
              ✓
            </div>

            <h2
              style={{
                color: "#1e1b4b",
                fontSize: "23px",
                margin: "0 0 12px",
              }}
            >
              Application Submitted!
            </h2>

            <p
              style={{
                color: "#6b7280",
                fontSize: "14px",
                lineHeight: 1.7,
                margin: "0 0 18px",
              }}
            >
              {message}
            </p>

            <div
              style={{
                height: "4px",
                background: "#ede9fe",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, #6366f1, #9333ea)",
                  animation: "jobsProgress 1.8s linear forwards",
                }}
              />
            </div>

            <p
              style={{
                fontSize: "12px",
                color: "#7c3aed",
                fontWeight: "650",
                marginTop: "14px",
              }}
            >
              Redirecting to My Applications...
            </p>

            <style>{`
              @keyframes jobsProgress {
                from { transform: translateX(-100%); }
                to { transform: translateX(0); }
              }
            `}</style>
          </div>
        </div>
      )}

      {/* Application Form Modal */}
      {selectedJob && (
        <div
          className="job-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeApplicationForm();
            }
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2000,
            background: "rgba(30,27,75,0.60)",
            backdropFilter: "blur(5px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "15px",
            boxSizing: "border-box",
            overflowY: "auto",
          }}
        >
          <div
            className="job-modal-content application-modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="application-modal-title"
            style={{
              width: "100%",
              maxWidth: "690px",
              maxHeight: "92vh",
              overflowY: "auto",
              background: "#ffffff",
              borderRadius: "24px",
              padding: "clamp(20px, 4vw, 34px)",
              boxSizing: "border-box",
              boxShadow: "0 25px 70px rgba(30,27,75,0.30)",
            }}
          >
            {/* Modal Heading */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "15px",
                marginBottom: "24px",
              }}
            >
              <div style={{ minWidth: 0 }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "6px 10px",
                    borderRadius: "20px",
                    background: "#f5f3ff",
                    color: "#7c3aed",
                    fontSize: "11px",
                    fontWeight: "800",
                    letterSpacing: "0.5px",
                    marginBottom: "12px",
                  }}
                >
                  JOB APPLICATION
                </span>

                <h2
                  id="application-modal-title"
                  style={{
                    color: "#1e1b4b",
                    fontSize: "clamp(20px, 4vw, 26px)",
                    fontWeight: "800",
                    lineHeight: 1.4,
                    margin: "0 0 8px",
                    overflowWrap: "anywhere",
                  }}
                >
                  Apply for {selectedJob.title}
                </h2>

                <p
                  style={{
                    color: "#7c3aed",
                    fontSize: "13px",
                    margin: 0,
                    overflowWrap: "anywhere",
                  }}
                >
                  {selectedJob.company} · {selectedJob.location}
                </p>
              </div>

              <button
                type="button"
                onClick={closeApplicationForm}
                disabled={submitting}
                aria-label="Close application form"
                style={{
                  width: "38px",
                  height: "38px",
                  flexShrink: 0,
                  border: "1px solid #e5e7eb",
                  borderRadius: "11px",
                  background: "#f9fafb",
                  color: "#4b5563",
                  fontSize: "23px",
                  cursor: submitting ? "not-allowed" : "pointer",
                }}
              >
                ×
              </button>
            </div>

            <div
              style={{
                background: "#f5f3ff",
                border: "1px solid #ddd6fe",
                color: "#5b21b6",
                padding: "13px 15px",
                borderRadius: "12px",
                marginBottom: "25px",
                fontSize: "13px",
                lineHeight: 1.7,
              }}
            >
              Please provide accurate details so the recruiter can review
              your application.
            </div>

            {message && messageType === "error" && (
              <div
                role="alert"
                style={{
                  background: "#fff1f2",
                  border: "1px solid #fecdd3",
                  color: "#be123c",
                  padding: "13px 15px",
                  borderRadius: "11px",
                  marginBottom: "20px",
                  fontSize: "13px",
                  fontWeight: "600",
                  overflowWrap: "anywhere",
                }}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmitApplication}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
                  gap: "0 16px",
                }}
              >
                <FormInput
                  label="Full Name"
                  name="applicantName"
                  value={formData.applicantName}
                  onChange={handleChange}
                  required
                />

                <FormInput
                  label="Email Address"
                  name="applicantEmail"
                  type="email"
                  value={formData.applicantEmail}
                  onChange={handleChange}
                  required
                />

                <FormInput
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. 9876543210"
                  required
                />

                <FormInput
                  label="Degree"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  placeholder="e.g. B.Tech"
                  required
                />

                <FormInput
                  label="Department / Stream"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="e.g. Computer Science"
                  required
                />

                <FormInput
                  label="College / University"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  placeholder="e.g. KL University"
                  required
                />

                <FormInput
                  label="Graduation Year"
                  name="graduationYear"
                  type="number"
                  value={formData.graduationYear}
                  onChange={handleChange}
                  placeholder="e.g. 2025"
                  required
                />

                <FormInput
                  label="Resume URL"
                  name="resumeUrl"
                  type="url"
                  value={formData.resumeUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                  required
                />

                <FormInput
                  label="LinkedIn URL"
                  name="linkedinUrl"
                  type="url"
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/..."
                />

                <FormInput
                  label="GitHub URL"
                  name="githubUrl"
                  type="url"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  placeholder="https://github.com/..."
                />
              </div>

              <FormTextarea
                label="Skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g. Java, React, SQL, Spring Boot"
                required
              />

              <FormTextarea
                label="Experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Describe your experience or enter Fresher."
              />

              <div
                className="application-action-buttons"
                style={{
                  display: "flex",
                  gap: "12px",
                  marginTop: "25px",
                }}
              >
                <button
                  type="button"
                  onClick={closeApplicationForm}
                  disabled={submitting}
                  style={{
                    flex: 1,
                    padding: "14px",
                    border: "1px solid #ddd6fe",
                    borderRadius: "11px",
                    background: "#ffffff",
                    color: "#6d28d9",
                    fontWeight: "750",
                    fontSize: "13px",
                    cursor: submitting ? "not-allowed" : "pointer",
                    opacity: submitting ? 0.6 : 1,
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    ...primaryButton,
                    flex: 1,
                    opacity: submitting ? 0.7 : 1,
                    cursor: submitting ? "not-allowed" : "pointer",
                  }}
                >
                  {submitting ? "Submitting..." : "Submit Application →"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div style={{ marginBottom: "18px", minWidth: 0 }}>
      <label
        htmlFor={name}
        style={{
          display: "block",
          marginBottom: "8px",
          fontSize: "13px",
          fontWeight: "750",
          color: "#374151",
        }}
      >
        {label}
        {required && (
          <span style={{ color: "#dc2626" }}> *</span>
        )}
      </label>

      <input
        id={name}
        className="application-input"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={inputStyle}
      />
    </div>
  );
}

function FormTextarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <label
        htmlFor={name}
        style={{
          display: "block",
          marginBottom: "8px",
          fontSize: "13px",
          fontWeight: "750",
          color: "#374151",
        }}
      >
        {label}
        {required && (
          <span style={{ color: "#dc2626" }}> *</span>
        )}
      </label>

      <textarea
        id={name}
        className="application-textarea"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={3}
        style={{
          ...inputStyle,
          resize: "vertical",
          minHeight: "90px",
          lineHeight: 1.6,
        }}
      />
    </div>
  );
}

export default Jobs;