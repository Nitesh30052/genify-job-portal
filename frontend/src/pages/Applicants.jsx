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
    try {
      await api.put(
        `/applications/${applicationId}/status?status=${status}`
      );

      setApplications((prevApplications) =>
        prevApplications.map((application) =>
          application.id === applicationId
            ? { ...application, status: status }
            : application
        )
      );

      alert("Application status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update application status.");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "APPLIED":
        return {
          backgroundColor: "#dbeafe",
          color: "#1d4ed8",
        };

      case "IN_REVIEW":
        return {
          backgroundColor: "#fef3c7",
          color: "#92400e",
        };

      case "INTERVIEW":
        return {
          backgroundColor: "#ede9fe",
          color: "#6d28d9",
        };

      case "OFFER":
        return {
          backgroundColor: "#dcfce7",
          color: "#166534",
        };

      case "REJECTED":
        return {
          backgroundColor: "#fee2e2",
          color: "#b91c1c",
        };

      default:
        return {
          backgroundColor: "#f3f4f6",
          color: "#374151",
        };
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
        <h2>Loading applicants...</h2>
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
            Job Applicants
          </h1>

          <p
            style={{
              margin: "0",
              color: "#6b7280",
            }}
          >
            Review candidates and manage their application
            status.
          </p>
        </div>

        {applications.length === 0 ? (
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
              👥
            </div>

            <h2>No applicants yet</h2>

            <p
              style={{
                color: "#6b7280",
              }}
            >
              No candidates have applied for this job yet.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(330px, 1fr))",
              gap: "22px",
            }}
          >
            {applications.map((application) => (
              <div
                key={application.id}
                style={{
                  backgroundColor: "white",
                  borderRadius: "14px",
                  padding: "25px",
                  border: "1px solid #e5e7eb",
                  boxShadow:
                    "0 3px 12px rgba(0,0,0,0.06)",
                }}
              >
                {/* Candidate */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      backgroundColor: "#e5e7eb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "22px",
                    }}
                  >
                    👤
                  </div>

                  <div>
                    <h2
                      style={{
                        margin: "0 0 5px",
                        fontSize: "20px",
                        color: "#111827",
                      }}
                    >
                      {application.user?.name ||
                        "Unknown User"}
                    </h2>

                    <p
                      style={{
                        margin: "0",
                        color: "#6b7280",
                        fontSize: "14px",
                      }}
                    >
                      {application.user?.email || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div
                  style={{
                    marginBottom: "18px",
                  }}
                >
                  <span
                    style={{
                      ...getStatusStyle(
                        application.status
                      ),
                      display: "inline-block",
                      padding: "7px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "700",
                    }}
                  >
                    {application.status}
                  </span>
                </div>

                {/* Notes */}
                <div
                  style={{
                    backgroundColor: "#f9fafb",
                    padding: "14px",
                    borderRadius: "8px",
                    marginBottom: "15px",
                  }}
                >
                  <p
                    style={{
                      margin: "0",
                      color: "#374151",
                      fontSize: "14px",
                      lineHeight: "1.5",
                    }}
                  >
                    <strong>Notes:</strong>{" "}
                    {application.notes || "No notes"}
                  </p>
                </div>

                {/* Applied Date */}
                <p
                  style={{
                    margin: "0 0 20px",
                    color: "#6b7280",
                    fontSize: "13px",
                  }}
                >
                  <strong>Applied:</strong>{" "}
                  {application.appliedAt
                    ? new Date(
                        application.appliedAt
                      ).toLocaleString()
                    : "N/A"}
                </p>

                {/* Status Change */}
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "600",
                    color: "#374151",
                    fontSize: "14px",
                  }}
                >
                  Change Status
                </label>

                <select
                  value={application.status}
                  onChange={(e) =>
                    handleStatusChange(
                      application.id,
                      e.target.value
                    )
                  }
                  style={{
                    width: "100%",
                    padding: "11px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    backgroundColor: "white",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  <option value="APPLIED">
                    APPLIED
                  </option>

                  <option value="IN_REVIEW">
                    IN_REVIEW
                  </option>

                  <option value="INTERVIEW">
                    INTERVIEW
                  </option>

                  <option value="REJECTED">
                    REJECTED
                  </option>

                  <option value="OFFER">
                    OFFER
                  </option>
                </select>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Applicants;