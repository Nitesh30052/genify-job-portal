import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import BackToDashboard from "../components/BackToDashboard";

function PostJob() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    jobUrl: "",
    source: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await api.post(
        `/jobs/recruiter/${user.id}`,
        formData
      );

      console.log("Job created:", response.data);

      setMessage("Job posted successfully! 🎉");

      setFormData({
        title: "",
        company: "",
        location: "",
        description: "",
        jobUrl: "",
        source: "",
      });
    } catch (error) {
      console.error("Post job error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to post job"
      );
    } finally {
      setLoading(false);
    }
  };

  const pageStyle = {
    minHeight: "calc(100vh - 65px)",
    background:
      "linear-gradient(135deg, #f5f3ff 0%, #eff6ff 50%, #faf5ff 100%)",
    padding: "clamp(22px, 5vw, 45px) clamp(15px, 4vw, 35px)",
    boxSizing: "border-box",
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  };

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    padding: "14px 15px",
    border: "1px solid #e0e7ff",
    borderRadius: "10px",
    fontSize: "14px",
    color: "#1f2937",
    backgroundColor: "#fafaff",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const buttonStyle = {
    width: "100%",
    marginTop: "25px",
    padding: "15px",
    border: "none",
    borderRadius: "11px",
    background: loading
      ? "#a5b4fc"
      : "linear-gradient(135deg, #6366f1, #9333ea)",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "700",
    cursor: loading ? "not-allowed" : "pointer",
    boxShadow: "0 7px 18px rgba(99, 102, 241, 0.22)",
  };

  return (
    <div>
      <Navbar />

      <main style={pageStyle}>
        <div
          style={{
            maxWidth: "900px",
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
              boxShadow:
                "0 15px 35px rgba(99, 102, 241, 0.2)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "190px",
                height: "190px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.08)",
                right: "-45px",
                top: "-90px",
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              <div
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
              </div>

              <h1
                style={{
                  margin: "0 0 12px",
                  fontSize: "clamp(28px, 5vw, 38px)",
                  fontWeight: "800",
                  letterSpacing: "-0.8px",
                }}
              >
                Post a Job
              </h1>

              <p
                style={{
                  margin: 0,
                  maxWidth: "570px",
                  color: "#ede9fe",
                  fontSize: "15px",
                  lineHeight: 1.8,
                }}
              >
                Discover your next great hire. Create a job
                opportunity and connect with candidates who
                are ready to make an impact.
              </p>
            </div>
          </section>

          {/* Form Card */}
          <form
            onSubmit={handleSubmit}
            style={{
              background: "rgba(255,255,255,0.95)",
              padding: "clamp(20px, 4vw, 38px)",
              borderRadius: "20px",
              border: "1px solid rgba(139,92,246,0.12)",
              boxShadow:
                "0 12px 35px rgba(79,70,229,0.07)",
              boxSizing: "border-box",
            }}
          >
            <div style={{ marginBottom: "28px" }}>
              <h2
                style={{
                  margin: "0 0 8px",
                  color: "#312e81",
                  fontSize: "23px",
                  fontWeight: "800",
                }}
              >
                Job Details
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#6b7280",
                  fontSize: "14px",
                  lineHeight: 1.7,
                }}
              >
                Provide accurate information to help candidates
                understand the opportunity.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
                gap: "24px 20px",
              }}
            >
              {/* Job Title */}
              <FormField
                label="Job Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Software Engineer"
                required
                inputStyle={inputStyle}
              />

              {/* Company */}
              <FormField
                label="Company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. Amazon"
                required
                inputStyle={inputStyle}
              />

              {/* Location */}
              <FormField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Hyderabad or Remote"
                inputStyle={inputStyle}
              />

              {/* Source */}
              <FormField
                label="Source"
                name="source"
                value={formData.source}
                onChange={handleChange}
                placeholder="e.g. LinkedIn or Indeed"
                inputStyle={inputStyle}
              />

              <div style={{ gridColumn: "1 / -1" }}>
                <FormField
                  label="Job URL"
                  name="jobUrl"
                  value={formData.jobUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/job"
                  inputStyle={inputStyle}
                />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label
                  htmlFor="description"
                  style={labelStyle}
                >
                  Job Description
                  <span style={{ color: "#dc2626" }}> *</span>
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the role, responsibilities, required skills, qualifications, and experience..."
                  rows={7}
                  required
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    lineHeight: 1.7,
                    minHeight: "150px",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#818cf8";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(99,102,241,0.12)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e0e7ff";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Success Message */}
            {message && (
              <div
                role="status"
                style={{
                  marginTop: "25px",
                  padding: "15px 17px",
                  borderRadius: "11px",
                  background: "#ecfdf5",
                  color: "#047857",
                  border: "1px solid #a7f3d0",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                <span style={{ fontSize: "20px" }}>✓</span>
                {message}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div
                role="alert"
                style={{
                  marginTop: "25px",
                  padding: "15px 17px",
                  borderRadius: "11px",
                  background: "#fef2f2",
                  color: "#b91c1c",
                  border: "1px solid #fecaca",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={buttonStyle}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform =
                    "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 24px rgba(99,102,241,0.3)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 7px 18px rgba(99,102,241,0.22)";
              }}
            >
              {loading ? "Publishing Job..." : "🚀 Publish Job"}
            </button>

            <p
              style={{
                textAlign: "center",
                margin: "15px 0 0",
                fontSize: "12px",
                color: "#9ca3af",
              }}
            >
              Review your details before publishing the opportunity.
            </p>
          </form>

          {/* Bottom Information */}
          <div
            style={{
              textAlign: "center",
              padding: "25px 10px 10px",
              color: "#6b7280",
              fontSize: "13px",
            }}
          >
            Find the right talent with{" "}
            <span
              style={{
                color: "#7c3aed",
                fontWeight: "800",
              }}
            >
              Genify
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: "9px",
  fontWeight: "700",
  color: "#3730a3",
  fontSize: "13px",
};

function FormField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  inputStyle,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        style={labelStyle}
      >
        {label}
        {required && (
          <span style={{ color: "#dc2626" }}> *</span>
        )}
      </label>

      <input
        id={name}
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={inputStyle}
        onFocus={(e) => {
          e.target.style.borderColor = "#818cf8";
          e.target.style.boxShadow =
            "0 0 0 3px rgba(99,102,241,0.12)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#e0e7ff";
          e.target.style.boxShadow = "none";
        }}
      />
    </div>
  );
}

export default PostJob;