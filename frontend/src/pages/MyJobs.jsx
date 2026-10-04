import { useEffect, useState } from "react";
import api from "../services/api";
import BackToDashboard from "../components/BackToDashboard";

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
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

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/jobs/${jobId}`);

      setJobs((prevJobs) =>
        prevJobs.filter((job) => job.id !== jobId)
      );
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job.");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f5f7fb",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Loading your jobs...</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fb",
        padding: "40px 30px",
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
              margin: "0 0 8px",
              color: "#111827",
              fontSize: "32px",
            }}
          >
            My Jobs
          </h1>

          <p
            style={{
              margin: "0",
              color: "#6b7280",
            }}
          >
            Manage the jobs you have posted.
          </p>
        </div>

        {jobs.length === 0 ? (
          <div
            style={{
              backgroundColor: "white",
              padding: "50px 30px",
              borderRadius: "14px",
              textAlign: "center",
              border: "1px solid #e5e7eb",
              boxShadow:
                "0 3px 12px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                fontSize: "45px",
                marginBottom: "15px",
              }}
            >
              💼
            </div>

            <h2>No jobs posted yet</h2>

            <p
              style={{
                color: "#6b7280",
                marginBottom: "20px",
              }}
            >
              You haven't posted any jobs yet.
            </p>
          </div>
        ) : (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(330px, 1fr))",
                gap: "22px",
              }}
            >
              {jobs.map((job) => (
                <div
                  key={job.id}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "14px",
                    padding: "25px",
                    border: "1px solid #e5e7eb",
                    boxShadow:
                      "0 3px 12px rgba(0,0,0,0.06)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ flexGrow: 1 }}>
                    <h2
                      style={{
                        margin: "0 0 18px",
                        color: "#111827",
                        fontSize: "21px",
                      }}
                    >
                      {job.title}
                    </h2>

                    <p
                      style={{
                        margin: "9px 0",
                        color: "#374151",
                      }}
                    >
                      <strong>🏢 Company:</strong>{" "}
                      {job.company}
                    </p>

                    <p
                      style={{
                        margin: "9px 0",
                        color: "#374151",
                      }}
                    >
                      <strong>📍 Location:</strong>{" "}
                      {job.location || "Not specified"}
                    </p>

                    <p
                      style={{
                        margin: "9px 0",
                        color: "#374151",
                      }}
                    >
                      <strong>🌐 Source:</strong>{" "}
                      {job.source || "Not specified"}
                    </p>

                    <div
                      style={{
                        marginTop: "18px",
                        paddingTop: "16px",
                        borderTop:
                          "1px solid #e5e7eb",
                      }}
                    >
                      <p
                        style={{
                          margin: "0",
                          color: "#6b7280",
                          lineHeight: "1.6",
                          fontSize: "14px",
                        }}
                      >
                        {job.description}
                      </p>
                    </div>

                    {job.jobUrl && (
                      <a
                        href={job.jobUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: "inline-block",
                          marginTop: "18px",
                          color: "#2563eb",
                          fontWeight: "600",
                          fontSize: "14px",
                        }}
                      >
                        View Job URL →
                      </a>
                    )}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginTop: "25px",
                    }}
                  >
                    <button
                      onClick={() =>
                        (window.location.href = `/applicants/${job.id}`)
                      }
                      style={{
                        flex: "1",
                        padding: "11px",
                        border: "none",
                        borderRadius: "8px",
                        backgroundColor: "#2563eb",
                        color: "white",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                    >
                      View Applicants
                    </button>

                    <button
                      onClick={() => handleDelete(job.id)}
                      style={{
                        padding: "11px 15px",
                        border: "none",
                        borderRadius: "8px",
                        backgroundColor: "#fee2e2",
                        color: "#b91c1c",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MyJobs;