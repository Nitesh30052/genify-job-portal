import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "JOB_SEEKER",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      await api.post("/users/register", formData);

      setMessage("Account created successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "40px",
          boxShadow: "0 12px 35px rgba(0,0,0,0.18)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1
            style={{
              margin: "0 0 8px",
              fontSize: "32px",
              color: "#111827",
            }}
          >
            Genify
          </h1>

          <p
            style={{
              margin: 0,
              color: "#6b7280",
            }}
          >
            Create your account
          </p>
        </div>

        <form onSubmit={handleRegister}>
          <label
            style={{
              display: "block",
              marginBottom: "7px",
              fontWeight: "600",
              color: "#374151",
            }}
          >
            Full Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            style={inputStyle}
          />

          <label
            style={{
              display: "block",
              marginBottom: "7px",
              fontWeight: "600",
              color: "#374151",
            }}
          >
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            style={inputStyle}
          />

          <label
            style={{
              display: "block",
              marginBottom: "7px",
              fontWeight: "600",
              color: "#374151",
            }}
          >
            Password
          </label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
            minLength={6}
            style={inputStyle}
          />

          <label
            style={{
              display: "block",
              marginBottom: "7px",
              fontWeight: "600",
              color: "#374151",
            }}
          >
            Account Type
          </label>

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="JOB_SEEKER">Job Seeker</option>
            <option value="RECRUITER">Recruiter</option>
          </select>

          {error && (
            <p
              style={{
                color: "#dc2626",
                fontSize: "14px",
                marginBottom: "15px",
              }}
            >
              {error}
            </p>
          )}

          {message && (
            <p
              style={{
                color: "#16a34a",
                fontSize: "14px",
                marginBottom: "15px",
              }}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: loading ? "#9ca3af" : "#111827",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: "8px",
            }}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "25px",
            color: "#6b7280",
            fontSize: "14px",
          }}
        >
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            style={{
              border: "none",
              background: "none",
              color: "#2563eb",
              cursor: "pointer",
              fontWeight: "600",
              padding: 0,
            }}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "15px",
  marginBottom: "18px",
  outline: "none",
};

export default Register;