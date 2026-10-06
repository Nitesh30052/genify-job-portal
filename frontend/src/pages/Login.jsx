import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/users/login", {
        email,
        password,
      });

      // Store JWT token
      localStorage.setItem("token", response.data.token);

      // Store logged-in user information
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          role: response.data.role,
        })
      );

      // Go to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          (typeof err.response?.data === "string"
            ? err.response.data
            : "Invalid email or password.")
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
        padding: "30px 20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          backgroundColor: "#ffffff",
          borderRadius: "18px",
          padding: "40px",
          boxShadow: "0 15px 40px rgba(0, 0, 0, 0.18)",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              margin: "0 0 8px",
              fontSize: "32px",
              fontWeight: "700",
              color: "#111827",
            }}
          >
            Genify
          </h1>

          <p
            style={{
              margin: 0,
              color: "#6b7280",
              fontSize: "15px",
            }}
          >
            Sign in to your account
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div
            style={{
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#b91c1c",
              padding: "12px 14px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontSize: "14px",
              lineHeight: "1.5",
            }}
          >
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          {/* Email */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#374151",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "13px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "15px",
                outline: "none",
                backgroundColor: "#ffffff",
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "10px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#374151",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "13px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "15px",
                outline: "none",
                backgroundColor: "#ffffff",
              }}
            />
          </div>

          {/* Forgot Password */}
          <div
            style={{
              textAlign: "right",
              marginBottom: "20px",
            }}
          >
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              style={{
                border: "none",
                background: "none",
                color: "#2563eb",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
                padding: 0,
              }}
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: loading ? "#9ca3af" : "#111827",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "0.2s",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register Link */}
        <div
          style={{
            borderTop: "1px solid #e5e7eb",
            marginTop: "25px",
            paddingTop: "20px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#6b7280",
              fontSize: "14px",
            }}
          >
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              style={{
                border: "none",
                background: "none",
                color: "#2563eb",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
                fontSize: "14px",
                padding: 0,
              }}
            >
              Create Account
            </button>
          </p>
        </div>

        {/* Footer */}
        <p
          style={{
            textAlign: "center",
            marginTop: "25px",
            marginBottom: 0,
            color: "#9ca3af",
            fontSize: "13px",
          }}
        >
          Genify — Job Application Platform
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

export default Login;