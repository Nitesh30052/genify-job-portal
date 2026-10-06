import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import BackToDashboard from "../components/BackToDashboard";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [selectedJob, setSelectedJob] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

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
      const response = await api.get("/jobs");
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // OPEN APPLICATION FORM
  // =========================

  const handleApply = (job) => {
    if (!user) {
      setMessage("Please login first.");
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

  // =========================
  // FORM CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================
  // SUBMIT APPLICATION
  // =========================

  const handleSubmitApplication = async (e) => {
    e.preventDefault();

    if (!selectedJob) {
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
          graduationYear:
            formData.graduationYear,
          skills: formData.skills,
          experience: formData.experience,
          resumeUrl: formData.resumeUrl,
          linkedinUrl: formData.linkedinUrl,
          githubUrl: formData.githubUrl,
        },
      });

      // Close the application form
      setSelectedJob(null);

      // Show success message immediately
      setMessage(
        "Application submitted successfully! ✅"
      );

      setMessageType("success");

      // Redirect after 1.5 seconds
      setTimeout(() => {
        navigate("/my-applications");
      }, 1500);

    } catch (error) {
      console.error(
        "Application error:",
        error
      );

      setMessageType("error");

      if (error.response?.data) {
        setMessage(
          typeof error.response.data === "string"
            ? error.response.data
            : "Failed to submit application."
        );
      } else {
        setMessage(
          "Failed to submit application."
        );
      }

      setSubmitting(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase();

    return (
      job.title
        ?.toLowerCase()
        .includes(searchText) ||
      job.company
        ?.toLowerCase()
        .includes(searchText) ||
      job.location
        ?.toLowerCase()
        .includes(searchText)
    );
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fb",
        padding: "30px 50px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <BackToDashboard />

        <div
          style={{
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              marginBottom: "8px",
              color: "#111827",
              fontSize: "32px",
            }}
          >
            Find Jobs
          </h1>

          <p
            style={{
              color: "#6b7280",
              marginTop: "0",
            }}
          >
            Discover opportunities and apply for jobs
            that match your skills.
          </p>
        </div>

        {/* Search */}
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.06)",
            marginBottom: "25px",
          }}
        >
          <input
            type="text"
            placeholder="🔍 Search by job title, company or location..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "14px 16px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              fontSize: "15px",
              outline: "none",
            }}
          />
        </div>

        {/* General error */}
        {message &&
          !selectedJob &&
          messageType === "error" && (
            <div
              style={{
                backgroundColor: "#fef2f2",
                color: "#b91c1c",
                border: "1px solid #fecaca",
                padding: "14px 18px",
                borderRadius: "8px",
                marginBottom: "25px",
                fontWeight: "600",
              }}
            >
              {message}
            </div>
          )}

        {/* Jobs */}
        {loading ? (
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <p>Loading jobs...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div
            style={{
              backgroundColor: "white",
              padding: "40px",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <h2>No jobs found</h2>

            <p
              style={{
                color: "#6b7280",
              }}
            >
              Try searching with a different title,
              company or location.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "20px",
            }}
          >
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                style={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  padding: "24px",
                  boxShadow:
                    "0 3px 12px rgba(0,0,0,0.07)",
                  border: "1px solid #e5e7eb",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h2
                  style={{
                    color: "#111827",
                    marginTop: "0",
                    marginBottom: "12px",
                  }}
                >
                  {job.title}
                </h2>

                <p
                  style={{
                    margin: "7px 0",
                    color: "#374151",
                  }}
                >
                  <strong>🏢 Company:</strong>{" "}
                  {job.company}
                </p>

                <p
                  style={{
                    margin: "7px 0",
                    color: "#374151",
                  }}
                >
                  <strong>📍 Location:</strong>{" "}
                  {job.location}
                </p>

                <p
                  style={{
                    margin: "15px 0",
                    color: "#6b7280",
                    lineHeight: "1.6",
                    flexGrow: 1,
                  }}
                >
                  {job.description}
                </p>

                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "14px",
                    marginBottom: "18px",
                  }}
                >
                  <strong>Source:</strong>{" "}
                  {job.source}
                </p>

                <button
                  onClick={() =>
                    handleApply(job)
                  }
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "none",
                    borderRadius: "8px",
                    backgroundColor: "#2563eb",
                    color: "white",
                    fontSize: "15px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* =========================
          SUCCESS MESSAGE
      ========================= */}

      {message &&
        !selectedJob &&
        messageType === "success" && (
          <div
            style={{
              position: "fixed",
              inset: "0",
              backgroundColor:
                "rgba(0, 0, 0, 0.35)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 3000,
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "35px 45px",
                borderRadius: "16px",
                boxShadow:
                  "0 15px 40px rgba(0,0,0,0.2)",
                textAlign: "center",
                minWidth: "300px",
              }}
            >
              <div
                style={{
                  width: "55px",
                  height: "55px",
                  borderRadius: "50%",
                  backgroundColor: "#dcfce7",
                  color: "#16a34a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 15px",
                  fontSize: "28px",
                  fontWeight: "700",
                }}
              >
                ✓
              </div>

              <h2
                style={{
                  margin: "0 0 8px",
                  color: "#111827",
                  fontSize: "21px",
                }}
              >
                Application Submitted
              </h2>

              <p
                style={{
                  margin: "0",
                  color: "#047857",
                  fontWeight: "600",
                }}
              >
                {message}
              </p>

              <p
                style={{
                  marginTop: "12px",
                  marginBottom: "0",
                  color: "#6b7280",
                  fontSize: "13px",
                }}
              >
                Redirecting to My Applications...
              </p>
            </div>
          </div>
        )}

      {/* =========================
          APPLICATION MODAL
      ========================= */}

      {selectedJob && (
        <div
          style={{
            position: "fixed",
            inset: "0",
            backgroundColor:
              "rgba(0,0,0,0.55)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            zIndex: 1000,
            overflowY: "auto",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "650px",
              backgroundColor: "white",
              borderRadius: "16px",
              padding: "30px",
              boxShadow:
                "0 10px 40px rgba(0,0,0,0.2)",
              margin: "30px 0",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "15px",
                marginBottom: "25px",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: "0 0 7px",
                    color: "#111827",
                  }}
                >
                  Apply for {selectedJob.title}
                </h2>

                <p
                  style={{
                    margin: "0",
                    color: "#6b7280",
                  }}
                >
                  {selectedJob.company} •{" "}
                  {selectedJob.location}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedJob(null);
                  setMessage("");
                  setMessageType("");
                }}
                style={{
                  border: "none",
                  backgroundColor: "#f3f4f6",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  fontSize: "20px",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                ×
              </button>
            </div>

            <div
              style={{
                backgroundColor: "#eff6ff",
                border: "1px solid #bfdbfe",
                color: "#1e40af",
                padding: "12px 14px",
                borderRadius: "8px",
                marginBottom: "22px",
                fontSize: "14px",
              }}
            >
              Please provide your details so the
              recruiter can review your application.
            </div>

            {/* Form error */}
            {message &&
              selectedJob &&
              messageType === "error" && (
                <div
                  style={{
                    backgroundColor: "#fef2f2",
                    color: "#b91c1c",
                    border:
                      "1px solid #fecaca",
                    padding: "12px 14px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                    fontWeight: "600",
                  }}
                >
                  {message}
                </div>
              )}

            <form
              onSubmit={
                handleSubmitApplication
              }
            >
              <FormInput
                label="Full Name"
                name="applicantName"
                value={
                  formData.applicantName
                }
                onChange={handleChange}
                required
              />

              <FormInput
                label="Email"
                name="applicantEmail"
                type="email"
                value={
                  formData.applicantEmail
                }
                onChange={handleChange}
                required
              />

              <FormInput
                label="Phone Number"
                name="phone"
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
                value={
                  formData.department
                }
                onChange={handleChange}
                placeholder="e.g. Computer Science Engineering"
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
                value={
                  formData.graduationYear
                }
                onChange={handleChange}
                placeholder="e.g. 2025"
                required
              />

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
                value={
                  formData.experience
                }
                onChange={handleChange}
                placeholder="Enter your experience or write Fresher"
              />

              <FormInput
                label="Resume URL"
                name="resumeUrl"
                value={
                  formData.resumeUrl
                }
                onChange={handleChange}
                placeholder="https://..."
                required
              />

              <FormInput
                label="LinkedIn URL"
                name="linkedinUrl"
                value={
                  formData.linkedinUrl
                }
                onChange={handleChange}
                placeholder="https://linkedin.com/in/..."
              />

              <FormInput
                label="GitHub URL"
                name="githubUrl"
                value={
                  formData.githubUrl
                }
                onChange={handleChange}
                placeholder="https://github.com/..."
              />

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginTop: "25px",
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setSelectedJob(null);
                    setMessage("");
                    setMessageType("");
                  }}
                  disabled={submitting}
                  style={{
                    flex: "1",
                    padding: "13px",
                    border:
                      "1px solid #d1d5db",
                    borderRadius: "8px",
                    backgroundColor: "#f3f4f6",
                    color: "#374151",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    flex: "1",
                    padding: "13px",
                    border: "none",
                    borderRadius: "8px",
                    backgroundColor:
                      submitting
                        ? "#9ca3af"
                        : "#2563eb",
                    color: "white",
                    fontWeight: "600",
                    cursor: submitting
                      ? "not-allowed"
                      : "pointer",
                  }}
                >
                  {submitting
                    ? "Submitting..."
                    : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================
// FORM INPUT
// =========================

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
    <div
      style={{
        marginBottom: "17px",
      }}
    >
      <label
        style={{
          display: "block",
          marginBottom: "7px",
          fontWeight: "600",
          color: "#374151",
          fontSize: "14px",
        }}
      >
        {label}

        {required && (
          <span
            style={{
              color: "#dc2626",
            }}
          >
            {" "}
            *
          </span>
        )}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "12px 14px",
          border: "1px solid #d1d5db",
          borderRadius: "8px",
          fontSize: "14px",
          outline: "none",
        }}
      />
    </div>
  );
}

// =========================
// FORM TEXTAREA
// =========================

function FormTextarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div
      style={{
        marginBottom: "17px",
      }}
    >
      <label
        style={{
          display: "block",
          marginBottom: "7px",
          fontWeight: "600",
          color: "#374151",
          fontSize: "14px",
        }}
      >
        {label}

        {required && (
          <span
            style={{
              color: "#dc2626",
            }}
          >
            {" "}
            *
          </span>
        )}
      </label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows="3"
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "12px 14px",
          border: "1px solid #d1d5db",
          borderRadius: "8px",
          fontSize: "14px",
          outline: "none",
          resize: "vertical",
        }}
      />
    </div>
  );
}

export default Jobs;