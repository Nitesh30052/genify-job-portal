import { useEffect, useState } from "react";
import api from "../services/api";
import BackToDashboard from "../components/BackToDashboard";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

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

  const handleApply = async (jobId) => {
    if (!user) {
      setMessage("Please login first.");
      return;
    }

    try {
      await api.post(
        `/applications?userId=${user.id}&jobId=${jobId}`
      );

      setMessage("Application submitted successfully! ✅");
    } catch (error) {
      console.error(error);

      if (error.response?.data) {
        setMessage(error.response.data);
      } else {
        setMessage("Failed to apply for this job.");
      }
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase();

    return (
      job.title?.toLowerCase().includes(searchText) ||
      job.company?.toLowerCase().includes(searchText) ||
      job.location?.toLowerCase().includes(searchText)
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

        <div style={{ marginBottom: "30px" }}>
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
            Discover opportunities and apply for jobs that match your skills.
          </p>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
            marginBottom: "25px",
          }}
        >
          <input
            type="text"
            placeholder="🔍 Search by job title, company or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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

        {message && (
          <div
            style={{
              backgroundColor: "#ecfdf5",
              color: "#047857",
              border: "1px solid #a7f3d0",
              padding: "14px 18px",
              borderRadius: "8px",
              marginBottom: "25px",
              fontWeight: "600",
            }}
          >
            {message}
          </div>
        )}

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
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            <h2>No jobs found</h2>
            <p style={{ color: "#6b7280" }}>
              Try searching with a different title, company or location.
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
                  boxShadow: "0 3px 12px rgba(0,0,0,0.07)",
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

                <p style={{ margin: "7px 0", color: "#374151" }}>
                  <strong>🏢 Company:</strong> {job.company}
                </p>

                <p style={{ margin: "7px 0", color: "#374151" }}>
                  <strong>📍 Location:</strong> {job.location}
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
                  <strong>Source:</strong> {job.source}
                </p>

                <button
                  onClick={() => handleApply(job.id)}
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
    </div>
  );
}

export default Jobs;