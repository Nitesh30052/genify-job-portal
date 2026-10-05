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
      console.error(
        "Error fetching applications:",
        error
      );
    } finally {
      setLoading(false);
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
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h2>Loading applications...</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fb",
        padding: "35px 50px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <BackToDashboard />

        {/* Page Heading */}
        <div
          style={{
            marginBottom: "20px",
          }}
        >
          <h1
            style={{
              marginBottom: "8px",
              color: "#111827",
              fontSize: "32px",
            }}
          >
            My Applications
          </h1>

          <p
            style={{
              marginTop: "0",
              color: "#6b7280",
            }}
          >
            Track the jobs you have applied for and their
            current status.
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div
            style={{
              backgroundColor: "#ecfdf5",
              color: "#047857",
              border: "1px solid #a7f3d0",
              padding: "16px 18px",
              borderRadius: "10px",
              marginBottom: "25px",
              fontWeight: "600",
              fontSize: "15px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{
                fontSize: "20px",
              }}
            >
              ✓
            </span>

            <span>{successMessage}</span>
          </div>
        )}

        {/* Applications */}
        {applications.length === 0 ? (
          <div
            style={{
              backgroundColor: "white",
              padding: "50px 30px",
              borderRadius: "14px",
              textAlign: "center",
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
              📋
            </div>

            <h2>No applications yet</h2>

            <p
              style={{
                color: "#6b7280",
              }}
            >
              You haven't applied for any jobs yet.
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
                {/* Job title + status */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "15px",
                    marginBottom: "18px",
                  }}
                >
                  <h2
                    style={{
                      margin: "0",
                      color: "#111827",
                      fontSize: "21px",
                    }}
                  >
                    {application.job?.title ||
                      "Job Title"}
                  </h2>

                  <span
                    style={{
                      ...getStatusStyle(
                        application.status
                      ),
                      padding: "6px 10px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "700",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {application.status}
                  </span>
                </div>

                {/* Company */}
                <p
                  style={{
                    color: "#374151",
                    margin: "10px 0",
                  }}
                >
                  <strong>🏢 Company:</strong>{" "}
                  {application.job?.company || "N/A"}
                </p>

                {/* Location */}
                <p
                  style={{
                    color: "#374151",
                    margin: "10px 0",
                  }}
                >
                  <strong>📍 Location:</strong>{" "}
                  {application.job?.location || "N/A"}
                </p>

                {/* Applied date */}
                <div
                  style={{
                    borderTop:
                      "1px solid #e5e7eb",
                    marginTop: "20px",
                    paddingTop: "15px",
                  }}
                >
                  <p
                    style={{
                      margin: "0",
                      color: "#6b7280",
                      fontSize: "14px",
                    }}
                  >
                    <strong>Applied:</strong>{" "}
                    {application.appliedAt
                      ? new Date(
                          application.appliedAt
                        ).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyApplications;