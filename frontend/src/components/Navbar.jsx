import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setMenuOpen(false);
    navigate("/login");
  };

  const goTo = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    ...(user?.role === "RECRUITER"
      ? [
          { label: "Post Job", path: "/post-job" },
          { label: "My Jobs", path: "/my-jobs" },
        ]
      : user?.role === "JOB_SEEKER"
      ? [
          { label: "Find Jobs", path: "/jobs" },
          {
            label: "My Applications",
            path: "/my-applications",
          },
        ]
      : []),
    { label: "Profile", path: "/profile" },
  ];

  const navButtonStyle = {
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "9px",
    padding: "10px 14px",
    background: "rgba(255,255,255,0.10)",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    whiteSpace: "nowrap",
    transition: "background 0.2s ease",
  };

  return (
    <>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          width: "100%",
          boxSizing: "border-box",
          background:
            "linear-gradient(110deg, #4f46e5 0%, #7c3aed 55%, #9333ea 100%)",
          color: "#ffffff",
          padding: "0 clamp(16px, 4vw, 40px)",
          minHeight: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "15px",
          boxShadow: "0 4px 18px rgba(79,70,229,0.20)",
        }}
      >
        {/* Logo */}
        <button
          type="button"
          onClick={() => goTo("/dashboard")}
          aria-label="Genify Dashboard"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            border: "none",
            background: "transparent",
            color: "#ffffff",
            cursor: "pointer",
            padding: 0,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              width: "39px",
              height: "39px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.18)",
              border: "1px solid rgba(255,255,255,0.25)",
              fontSize: "22px",
              fontWeight: "800",
            }}
          >
            G
          </span>

          <span
            style={{
              fontSize: "24px",
              fontWeight: "800",
              letterSpacing: "-0.5px",
            }}
          >
            Genify
          </span>
        </button>

        {/* Desktop Navigation */}
        <div
          className="genify-desktop-nav"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.path}
              type="button"
              onClick={() => goTo(item.path)}
              style={navButtonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "rgba(255,255,255,0.22)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  "rgba(255,255,255,0.10)";
              }}
            >
              {item.label}
            </button>
          ))}

          <button
            type="button"
            onClick={handleLogout}
            style={{
              ...navButtonStyle,
              background: "#ffffff",
              color: "#6d28d9",
              border: "1px solid #ffffff",
              marginLeft: "4px",
            }}
          >
            Logout
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className="genify-menu-toggle"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((previous) => !previous)}
          style={{
            display: "none",
            width: "43px",
            height: "43px",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "10px",
            background: "rgba(255,255,255,0.12)",
            color: "#ffffff",
            fontSize: "25px",
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {menuOpen ? "×" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="genify-mobile-menu"
          style={{
            position: "fixed",
            top: "70px",
            left: 0,
            right: 0,
            zIndex: 999,
            padding: "16px",
            background:
              "linear-gradient(145deg, #4f46e5, #7c3aed, #9333ea)",
            boxShadow: "0 12px 24px rgba(79,70,229,0.2)",
            boxSizing: "border-box",
            display: "none",
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.path}
              type="button"
              onClick={() => goTo(item.path)}
              style={{
                ...navButtonStyle,
                width: "100%",
                textAlign: "left",
                padding: "14px 16px",
                marginBottom: "9px",
                background: "rgba(255,255,255,0.12)",
                fontSize: "14px",
              }}
            >
              {item.label}
            </button>
          ))}

          <button
            type="button"
            onClick={handleLogout}
            style={{
              ...navButtonStyle,
              width: "100%",
              padding: "14px 16px",
              textAlign: "left",
              background: "#ffffff",
              color: "#6d28d9",
              border: "none",
            }}
          >
            Logout
          </button>
        </div>
      )}

      {/* Responsive Navigation Styles */}
      <style>{`
        @media (max-width: 900px) {
          .genify-desktop-nav {
            display: none !important;
          }

          .genify-menu-toggle {
            display: flex !important;
          }

          .genify-mobile-menu {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}

export default Navbar;