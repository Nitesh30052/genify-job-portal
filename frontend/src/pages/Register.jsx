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

      setMessage(
        "Account created successfully! Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          (typeof err.response?.data === "string"
            ? err.response.data
            : "Registration failed. Please try again.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 15% 20%, rgba(129,140,248,0.35), transparent 35%), radial-gradient(circle at 85% 80%, rgba(192,132,252,0.35), transparent 35%), linear-gradient(135deg, #eef2ff, #f5f3ff, #e0e7ff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px 16px",
        boxSizing: "border-box",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      {/* REGISTER CARD */}
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          backgroundColor: "rgba(255,255,255,0.97)",
          border: "1px solid rgba(255,255,255,0.9)",
          borderRadius: "22px",
          padding: "38px",
          boxShadow: "0 20px 60px rgba(79,70,229,0.13)",
          boxSizing: "border-box",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              margin: "0 auto 16px",
              borderRadius: "18px",
              background:
                "linear-gradient(135deg, #4f46e5, #9333ea)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#ffffff",
              fontSize: "28px",
              fontWeight: "800",
              boxShadow: "0 8px 22px rgba(79,70,229,0.25)",
            }}
          >
            G
          </div>

          <h1
            style={{
              margin: "0 0 8px",
              fontSize: "33px",
              fontWeight: "800",
              letterSpacing: "-1px",
              background:
                "linear-gradient(135deg, #4338ca, #9333ea)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Genify
          </h1>

          <h2
            style={{
              margin: "0 0 8px",
              fontSize: "21px",
              color: "#111827",
              fontWeight: "700",
            }}
          >
            Create Your Account
          </h2>

          <p
            style={{
              margin: 0,
              color: "#64748b",
              fontSize: "14px",
              lineHeight: "1.7",
            }}
          >
            Join Genify and take the next step in your career.
          </p>
        </div>

        {/* SUCCESS MESSAGE */}
        {message && (
          <div
            role="status"
            style={{
              backgroundColor: "#ecfdf5",
              border: "1px solid #a7f3d0",
              color: "#047857",
              padding: "12px 14px",
              borderRadius: "10px",
              marginBottom: "20px",
              fontSize: "14px",
              lineHeight: "1.5",
            }}
          >
            {message}
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div
            role="alert"
            style={{
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#b91c1c",
              padding: "12px 14px",
              borderRadius: "10px",
              marginBottom: "20px",
              fontSize: "14px",
              lineHeight: "1.5",
            }}
          >
            {error}
          </div>
        )}

        {/* REGISTRATION FORM */}
        <form onSubmit={handleRegister}>
          {/* FULL NAME */}
          <div style={{ marginBottom: "19px" }}>
            <label htmlFor="register-name" style={labelStyle}>
              Full Name
            </label>

            <input
              id="register-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              autoComplete="name"
              required
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          {/* EMAIL */}
          <div style={{ marginBottom: "19px" }}>
            <label htmlFor="register-email" style={labelStyle}>
              Email Address
            </label>

            <input
              id="register-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              required
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          {/* PASSWORD */}
          <div style={{ marginBottom: "19px" }}>
            <label htmlFor="register-password" style={labelStyle}>
              Password
            </label>

            <input
              id="register-password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              autoComplete="new-password"
              minLength={6}
              required
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            <p
              style={{
                margin: "7px 0 0",
                color: "#94a3b8",
                fontSize: "12px",
              }}
            >
              Password must contain at least 6 characters.
            </p>
          </div>

          {/* ACCOUNT TYPE */}
          <div style={{ marginBottom: "24px" }}>
            <label htmlFor="register-role" style={labelStyle}>
              Account Type
            </label>

            <select
              id="register-role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              style={{
                ...inputStyle,
                cursor: "pointer",
                appearance: "auto",
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              <option value="JOB_SEEKER">Job Seeker</option>
              <option value="RECRUITER">Recruiter</option>
            </select>

            <p
              style={{
                margin: "7px 0 0",
                color: "#94a3b8",
                fontSize: "12px",
              }}
            >
              Choose the account type that suits your needs.
            </p>
          </div>

          {/* CREATE ACCOUNT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "11px",
              background: loading
                ? "#9ca3af"
                : "linear-gradient(135deg, #4f46e5, #7c3aed, #9333ea)",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: "700",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: loading
                ? "none"
                : "0 8px 20px rgba(79,70,229,0.23)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 25px rgba(79,70,229,0.3)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = loading
                ? "none"
                : "0 8px 20px rgba(79,70,229,0.23)";
            }}
          >
            {loading ? "Creating Account..." : "Create Account →"}
          </button>
        </form>

        {/* LOGIN LINK */}
        <div
          style={{
            borderTop: "1px solid #eef0f6",
            marginTop: "27px",
            paddingTop: "22px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#64748b",
              fontSize: "14px",
              lineHeight: "1.8",
            }}
          >
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              style={{
                border: "none",
                background: "transparent",
                color: "#6366f1",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "700",
                padding: 0,
              }}
            >
              Sign In
            </button>
          </p>
        </div>

        {/* BACK TO HOME */}
        <div style={{ textAlign: "center", marginTop: "18px" }}>
          <button
            type="button"
            onClick={() => navigate("/")}
            style={{
              border: "none",
              background: "transparent",
              color: "#64748b",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "600",
            }}
          >
            ← Back to Home
          </button>
        </div>

        {/* FOOTER */}
        <p
          style={{
            textAlign: "center",
            marginTop: "23px",
            marginBottom: 0,
            color: "#94a3b8",
            fontSize: "12px",
          }}
        >
          © {new Date().getFullYear()} Genify · Job Application Platform
        </p>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: "9px",
  color: "#334155",
  fontSize: "13px",
  fontWeight: "700",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "14px",
  border: "1px solid #e2e8f0",
  borderRadius: "10px",
  fontSize: "14px",
  outline: "none",
  backgroundColor: "#f8faff",
  color: "#111827",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

function handleFocus(e) {
  e.currentTarget.style.borderColor = "#818cf8";
  e.currentTarget.style.boxShadow =
    "0 0 0 3px rgba(99,102,241,0.12)";
}

function handleBlur(e) {
  e.currentTarget.style.borderColor = "#e2e8f0";
  e.currentTarget.style.boxShadow = "none";
}

export default Register;