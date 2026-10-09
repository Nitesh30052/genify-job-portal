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
        background:
          "radial-gradient(circle at 15% 20%, rgba(129,140,248,0.35), transparent 35%), radial-gradient(circle at 85% 80%, rgba(192,132,252,0.35), transparent 35%), linear-gradient(135deg, #eef2ff, #f5f3ff, #e0e7ff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px 16px",
        boxSizing: "border-box",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      {/* LOGIN CARD */}
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          backgroundColor: "rgba(255,255,255,0.96)",
          border: "1px solid rgba(255,255,255,0.9)",
          borderRadius: "22px",
          padding: "40px",
          boxShadow: "0 15px 40px rgba(0, 0, 0, 0.18)",
          boxSizing: "border-box",
          boxShadow: "0 20px 60px rgba(79,70,229,0.13)",
        }}
      >
        {/* LOGO */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              margin: "0 auto 18px",
              borderRadius: "19px",
              background:
                "linear-gradient(135deg, #4f46e5, #9333ea)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#ffffff",
              fontSize: "29px",
              fontWeight: "800",
              boxShadow: "0 8px 22px rgba(79,70,229,0.25)",
            }}
          >
            G
          </div>

          <h1
            style={{
              margin: "0 0 9px",
              fontSize: "34px",
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
              margin: "0 0 9px",
              fontSize: "21px",
              color: "#111827",
              fontWeight: "700",
            }}
          >
            Welcome Back!
          </h2>

          <p
            style={{
              margin: 0,
              color: "#6b7280",
              fontSize: "14px",
              lineHeight: "1.7",
            }}
          >
            Sign in to continue your career journey.
          </p>
        </div>

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
              marginBottom: "22px",
              fontSize: "14px",
              lineHeight: "1.5",
            }}
          >
            {error}
          </div>
        )}

        {/* LOGIN FORM */}
        <form onSubmit={handleLogin}>
          {/* EMAIL */}
          <div style={{ marginBottom: "21px" }}>
            <label
              htmlFor="login-email"
              style={labelStyle}
            >
              Email Address
            </label>

            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
              style={inputStyle}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#818cf8";
                e.currentTarget.style.boxShadow =
                  "0 0 0 3px rgba(99,102,241,0.12)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          {/* PASSWORD */}
          <div style={{ marginBottom: "8px" }}>
            <label
              htmlFor="login-password"
              style={labelStyle}
            >
              Password
            </label>

            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              style={inputStyle}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#818cf8";
                e.currentTarget.style.boxShadow =
                  "0 0 0 3px rgba(99,102,241,0.12)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          {/* FORGOT PASSWORD */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "25px",
            }}
          >
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              style={{
                border: "none",
                background: "transparent",
                color: "#6366f1",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "700",
                padding: "5px 0",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#9333ea";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#6366f1";
              }}
            >
              Forgot Password?
            </button>
          </div>

          {/* LOGIN BUTTON */}
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
            {loading ? "Signing In..." : "Sign In →"}
          </button>
        </form>

        {/* REGISTER LINK */}
        <div
          style={{
            borderTop: "1px solid #eef0f6",
            marginTop: "28px",
            paddingTop: "23px",
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
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
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
              Create Account
            </button>
          </p>
        </div>

        {/* FOOTER */}
        <p
          style={{
            textAlign: "center",
            marginTop: "27px",
            marginBottom: 0,
            color: "#94a3b8",
            fontSize: "12px",
          }}
        >
          © {new Date().getFullYear()} Genify · Job Application Platform
        </p>

        {/* BACK TO HOME */}
        <div style={{ textAlign: "center", marginTop: "17px" }}>
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

export default Login;