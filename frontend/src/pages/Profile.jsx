import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackToDashboard from "../components/BackToDashboard";
import api from "../services/api";

function Profile() {
  const navigate = useNavigate();

  const storedUser = JSON.parse(
    localStorage.getItem("user")
  );

  const [user, setUser] = useState(storedUser);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    education: "",
    skills: "",
    experience: "",
    resumeUrl: "",
    linkedinUrl: "",
    githubUrl: "",
  });

  useEffect(() => {
    if (!storedUser) {
      navigate("/login");
      return;
    }

    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get(
        `/users/${storedUser.id}`
      );

      setUser(response.data);

      setFormData({
        name: response.data.name || "",
        phone: response.data.phone || "",
        location: response.data.location || "",
        education: response.data.education || "",
        skills: response.data.skills || "",
        experience: response.data.experience || "",
        resumeUrl: response.data.resumeUrl || "",
        linkedinUrl:
          response.data.linkedinUrl || "",
        githubUrl:
          response.data.githubUrl || "",
      });

      // Keep updated user information in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...storedUser,
          name: response.data.name,
        })
      );

    } catch (error) {
      console.error(
        "Error loading profile:",
        error
      );

      setError(
        "Unable to load profile information."
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await api.put(
        `/users/${storedUser.id}/profile`,
        formData
      );

      setUser(response.data);

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...storedUser,
          name: response.data.name,
        })
      );

      setEditing(false);

      setMessage(
        "Profile updated successfully! ✅"
      );

      setTimeout(() => {
        setMessage("");
      }, 3000);

    } catch (error) {
      console.error(
        "Error updating profile:",
        error
      );

      setError(
        error.response?.data ||
          "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return null;
  }

  const isRecruiter =
    user.role === "RECRUITER";

  return (
    <div
      style={{
        minHeight: "100vh",
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

        {/* Page Heading */}
        <div
          style={{
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              margin: "0 0 8px",
              color: "#111827",
              fontSize: "32px",
            }}
          >
            My Profile
          </h1>

          <p
            style={{
              margin: "0",
              color: "#6b7280",
            }}
          >
            Manage your account and professional
            information.
          </p>
        </div>

        {/* Success Message */}
        {message && (
          <div
            style={{
              backgroundColor: "#ecfdf5",
              color: "#047857",
              border: "1px solid #a7f3d0",
              padding: "14px 18px",
              borderRadius: "10px",
              marginBottom: "20px",
              fontWeight: "600",
            }}
          >
            {message}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div
            style={{
              backgroundColor: "#fef2f2",
              color: "#b91c1c",
              border: "1px solid #fecaca",
              padding: "14px 18px",
              borderRadius: "10px",
              marginBottom: "20px",
              fontWeight: "600",
            }}
          >
            {error}
          </div>
        )}

        {/* Profile Card */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            border: "1px solid #e5e7eb",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.06)",
            overflow: "hidden",
          }}
        >
          {/* Profile Header */}
          <div
            style={{
              background:
                "linear-gradient(135deg, #111827, #1f2937)",
              padding: "35px",
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                backgroundColor: "#374151",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
                flexShrink: 0,
              }}
            >
              👤
            </div>

            <div>
              <h2
                style={{
                  margin: "0 0 8px",
                  fontSize: "25px",
                }}
              >
                {user.name}
              </h2>

              <span
                style={{
                  display: "inline-block",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  backgroundColor: "#374151",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                {isRecruiter
                  ? "Recruiter"
                  : "Job Seeker"}
              </span>
            </div>
          </div>

          {/* Account Information */}
          <div
            style={{
              padding: "30px",
            }}
          >
            <h3
              style={{
                marginTop: "0",
                marginBottom: "20px",
                color: "#111827",
              }}
            >
              Account Information
            </h3>

            <div
              style={{
                display: "grid",
                gap: "0",
              }}
            >
              <InfoRow
                label="Full Name"
                value={user.name}
              />

              <InfoRow
                label="Email"
                value={user.email}
              />

              <InfoRow
                label="Account Type"
                value={
                  isRecruiter
                    ? "Recruiter"
                    : "Job Seeker"
                }
              />

              <InfoRow
                label="User ID"
                value={user.id}
              />
            </div>

            {/* Job Seeker Details */}
            {!isRecruiter && (
              <>
                <div
                  style={{
                    marginTop: "35px",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "15px",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        margin: "0 0 5px",
                        color: "#111827",
                      }}
                    >
                      Professional Details
                    </h3>

                    <p
                      style={{
                        margin: "0",
                        color: "#6b7280",
                        fontSize: "14px",
                      }}
                    >
                      Add your details to improve
                      your job applications.
                    </p>
                  </div>

                  {!editing && (
                    <button
                      onClick={() => {
                        setEditing(true);
                        setMessage("");
                        setError("");
                      }}
                      style={{
                        backgroundColor: "#2563eb",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        padding: "10px 18px",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                    >
                      Edit Profile
                    </button>
                  )}
                </div>

                {editing ? (
                  <form onSubmit={handleSave}>
                    <ProfileInput
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />

                    <ProfileInput
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />

                    <ProfileInput
                      label="Location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Vijayawada, Andhra Pradesh"
                    />

                    <ProfileInput
                      label="Education"
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      placeholder="e.g. B.Tech Computer Science"
                    />

                    <ProfileTextarea
                      label="Skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      placeholder="e.g. Java, React, SQL, Spring Boot"
                    />

                    <ProfileTextarea
                      label="Experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="Describe your experience"
                    />

                    <ProfileInput
                      label="Resume URL"
                      name="resumeUrl"
                      value={formData.resumeUrl}
                      onChange={handleChange}
                      placeholder="Paste your resume link"
                    />

                    <ProfileInput
                      label="LinkedIn URL"
                      name="linkedinUrl"
                      value={formData.linkedinUrl}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/your-profile"
                    />

                    <ProfileInput
                      label="GitHub URL"
                      name="githubUrl"
                      value={formData.githubUrl}
                      onChange={handleChange}
                      placeholder="https://github.com/your-username"
                    />

                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        marginTop: "25px",
                      }}
                    >
                      <button
                        type="submit"
                        disabled={saving}
                        style={{
                          backgroundColor: saving
                            ? "#9ca3af"
                            : "#2563eb",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          padding: "12px 22px",
                          fontWeight: "600",
                          cursor: saving
                            ? "not-allowed"
                            : "pointer",
                        }}
                      >
                        {saving
                          ? "Saving..."
                          : "Save Profile"}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setEditing(false);
                          setError("");
                        }}
                        style={{
                          backgroundColor: "#f3f4f6",
                          color: "#374151",
                          border: "1px solid #d1d5db",
                          borderRadius: "8px",
                          padding: "12px 22px",
                          fontWeight: "600",
                          cursor: "pointer",
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div
                    style={{
                      display: "grid",
                      gap: "0",
                    }}
                  >
                    <InfoRow
                      label="Phone Number"
                      value={
                        user.phone || "Not added"
                      }
                    />

                    <InfoRow
                      label="Location"
                      value={
                        user.location || "Not added"
                      }
                    />

                    <InfoRow
                      label="Education"
                      value={
                        user.education || "Not added"
                      }
                    />

                    <InfoRow
                      label="Skills"
                      value={
                        user.skills || "Not added"
                      }
                    />

                    <InfoRow
                      label="Experience"
                      value={
                        user.experience || "Not added"
                      }
                    />

                    <InfoRow
                      label="Resume"
                      value={
                        user.resumeUrl || "Not added"
                      }
                    />

                    <InfoRow
                      label="LinkedIn"
                      value={
                        user.linkedinUrl ||
                        "Not added"
                      }
                    />

                    <InfoRow
                      label="GitHub"
                      value={
                        user.githubUrl ||
                        "Not added"
                      }
                    />
                  </div>
                )}
              </>
            )}

            {/* Recruiter Information */}
            {isRecruiter && (
              <div
                style={{
                  marginTop: "30px",
                  padding: "18px",
                  backgroundColor: "#f9fafb",
                  borderRadius: "10px",
                  color: "#6b7280",
                }}
              >
                Recruiter profile management can be
                added separately.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "20px",
        padding: "15px 0",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <span
        style={{
          color: "#6b7280",
          fontWeight: "600",
          minWidth: "140px",
        }}
      >
        {label}
      </span>

      <span
        style={{
          color: "#111827",
          fontWeight: "500",
          textAlign: "right",
          overflowWrap: "anywhere",
        }}
      >
        {value}
      </span>
    </div>
  );
}

function ProfileInput({
  label,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div
      style={{
        marginBottom: "18px",
      }}
    >
      <label
        style={{
          display: "block",
          marginBottom: "7px",
          color: "#374151",
          fontWeight: "600",
        }}
      >
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "12px 14px",
          border: "1px solid #d1d5db",
          borderRadius: "8px",
          fontSize: "15px",
          outline: "none",
        }}
      />
    </div>
  );
}

function ProfileTextarea({
  label,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div
      style={{
        marginBottom: "18px",
      }}
    >
      <label
        style={{
          display: "block",
          marginBottom: "7px",
          color: "#374151",
          fontWeight: "600",
        }}
      >
        {label}
      </label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows="4"
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "12px 14px",
          border: "1px solid #d1d5db",
          borderRadius: "8px",
          fontSize: "15px",
          outline: "none",
          resize: "vertical",
        }}
      />
    </div>
  );
}

export default Profile;