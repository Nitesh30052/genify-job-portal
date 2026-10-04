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

  return (
    <div>
      <Navbar />

      <main
        style={{
          minHeight: "calc(100vh - 65px)",
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
          <BackToDashboard />

          <div style={{ marginBottom: "25px" }}>
            <h1
              style={{
                margin: "0 0 8px",
                color: "#111827",
                fontSize: "32px",
              }}
            >
              Post a Job
            </h1>

            <p
              style={{
                margin: "0",
                color: "#6b7280",
              }}
            >
              Create a new job opportunity for candidates.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: "white",
              padding: "35px",
              borderRadius: "16px",
              border: "1px solid #e5e7eb",
              boxShadow:
                "0 4px 15px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "20px",
              }}
            >
              {/* Job Title */}
              <FormField
                label="Job Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Example: Software Engineer"
                required
              />

              {/* Company */}
              <FormField
                label="Company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Example: Amazon"
                required
              />

              {/* Location */}
              <FormField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Example: Hyderabad"
              />

              {/* Source */}
              <FormField
                label="Source"
                name="source"
                value={formData.source}
                onChange={handleChange}
                placeholder="Example: Indeed"
              />

              {/* Job URL */}
              <div
                style={{
                  gridColumn: "1 / -1",
                }}
              >
                <FormField
                  label="Job URL"
                  name="jobUrl"
                  value={formData.jobUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/job"
                />
              </div>

              {/* Description */}
              <div
                style={{
                  gridColumn: "1 / -1",
                }}
              >
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "600",
                    color: "#374151",
                  }}
                >
                  Job Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter job description..."
                  rows="7"
                  required
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "13px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "15px",
                    resize: "vertical",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            {/* Messages */}
            {message && (
              <div
                style={{
                  marginTop: "20px",
                  padding: "13px 16px",
                  borderRadius: "8px",
                  backgroundColor: "#ecfdf5",
                  color: "#047857",
                  border: "1px solid #a7f3d0",
                  fontWeight: "600",
                }}
              >
                {message}
              </div>
            )}

            {error && (
              <div
                style={{
                  marginTop: "20px",
                  padding: "13px 16px",
                  borderRadius: "8px",
                  backgroundColor: "#fef2f2",
                  color: "#b91c1c",
                  border: "1px solid #fecaca",
                  fontWeight: "600",
                }}
              >
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                marginTop: "25px",
                padding: "14px",
                border: "none",
                borderRadius: "8px",
                backgroundColor: loading
                  ? "#9ca3af"
                  : "#2563eb",
                color: "white",
                fontSize: "16px",
                fontWeight: "600",
                cursor: loading
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              {loading ? "Posting..." : "Post Job"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

function FormField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          marginBottom: "8px",
          fontWeight: "600",
          color: "#374151",
        }}
      >
        {label}
        {required && (
          <span style={{ color: "#dc2626" }}>
            {" "}
            *
          </span>
        )}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "13px",
          border: "1px solid #d1d5db",
          borderRadius: "8px",
          fontSize: "15px",
          outline: "none",
        }}
      />
    </div>
  );
}

export default PostJob;