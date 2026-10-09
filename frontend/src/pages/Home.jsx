import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: "🔎",
      title: "Discover Opportunities",
      description:
        "Explore job opportunities and find roles that match your skills and career goals.",
    },
    {
      icon: "📄",
      title: "Easy Applications",
      description:
        "Apply for jobs and keep track of your applications in one convenient place.",
    },
    {
      icon: "🤝",
      title: "Recruiter Dashboard",
      description:
        "Post job openings, manage listings, and review candidate applications efficiently.",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8faff",
        fontFamily: "Inter, Arial, sans-serif",
        color: "#111827",
        overflow: "hidden",
      }}
    >
      {/* NAVBAR */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 7%",
          backgroundColor: "rgba(255,255,255,0.95)",
          borderBottom: "1px solid #e8ecf5",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <div
          onClick={() => navigate("/")}
          style={{
            fontSize: "28px",
            fontWeight: "800",
            letterSpacing: "-1px",
            cursor: "pointer",
            background: "linear-gradient(135deg, #4f46e5, #9333ea)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Genify<span style={{ color: "#4f46e5" }}>.</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "11px 22px",
              border: "none",
              background: "transparent",
              color: "#374151",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            style={{
              padding: "12px 22px",
              border: "none",
              borderRadius: "9px",
              background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 5px 15px rgba(79,70,229,0.22)",
            }}
          >
            Get Started →
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section
        style={{
          position: "relative",
          padding: "90px 24px 85px",
          background:
            "radial-gradient(circle at 10% 20%, rgba(129,140,248,0.18), transparent 35%), radial-gradient(circle at 90% 80%, rgba(192,132,252,0.18), transparent 35%), linear-gradient(135deg, #f8faff, #eef2ff)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "9px 16px",
              borderRadius: "30px",
              backgroundColor: "#ffffff",
              border: "1px solid #e0e7ff",
              color: "#4f46e5",
              fontSize: "13px",
              fontWeight: "700",
              marginBottom: "28px",
              boxShadow: "0 4px 15px rgba(79,70,229,0.06)",
            }}
          >
            ✨ YOUR NEXT CAREER CHAPTER STARTS HERE
          </div>

          <h1
            style={{
              fontSize: "clamp(38px, 6vw, 68px)",
              fontWeight: "800",
              lineHeight: "1.12",
              letterSpacing: "-2px",
              margin: "0 0 25px",
              color: "#111827",
            }}
          >
            Find Work That
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #4f46e5, #9333ea)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Moves You Forward.
            </span>
          </h1>

          <p
            style={{
              maxWidth: "660px",
              margin: "0 auto",
              fontSize: "17px",
              lineHeight: "1.9",
              color: "#64748b",
            }}
          >
            Discover opportunities, apply for jobs, and take the next
            step in your career. Genify brings job seekers and
            recruiters together in one simple platform.
          </p>

          {/* HERO BUTTONS */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "15px",
              flexWrap: "wrap",
              marginTop: "35px",
            }}
          >
            <button
              onClick={() => navigate("/login")}
              style={{
                padding: "15px 30px",
                border: "none",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                color: "#ffffff",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: "0 8px 20px rgba(79,70,229,0.25)",
              }}
            >
              Explore Jobs →
            </button>

            <button
              onClick={() => navigate("/register")}
              style={{
                padding: "15px 30px",
                border: "1px solid #dbe2f0",
                borderRadius: "10px",
                backgroundColor: "#ffffff",
                color: "#374151",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Create an Account
            </button>
          </div>

          {/* TRUST LABELS */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "25px",
              flexWrap: "wrap",
              marginTop: "35px",
              color: "#64748b",
              fontSize: "13px",
              fontWeight: "500",
            }}
          >
            <span>✓ Simple job applications</span>
            <span>✓ Dedicated recruiter tools</span>
            <span>✓ One platform, two roles</span>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section
        style={{
          padding: "75px 7%",
          backgroundColor: "#ffffff",
        }}
      >
        <div
          style={{
            maxWidth: "1150px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "45px",
            }}
          >
            <p
              style={{
                color: "#6366f1",
                fontSize: "13px",
                fontWeight: "800",
                letterSpacing: "2px",
                marginBottom: "12px",
              }}
            >
              WHY GENIFY?
            </p>

            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: "800",
                letterSpacing: "-1px",
                margin: "0 0 15px",
                color: "#111827",
              }}
            >
              Everything you need to move ahead
            </h2>

            <p
              style={{
                color: "#64748b",
                fontSize: "16px",
                lineHeight: "1.7",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Tools designed to make job searching and recruitment
              more straightforward.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px",
            }}
          >
            {features.map((feature, index) => (
              <div
                key={feature.title}
                style={{
                  padding: "30px",
                  border: "1px solid #e8ecf5",
                  borderRadius: "16px",
                  background:
                    index === 1
                      ? "linear-gradient(145deg, #ffffff, #f5f3ff)"
                      : "linear-gradient(145deg, #ffffff, #f8faff)",
                  boxShadow: "0 8px 25px rgba(15,23,42,0.04)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 35px rgba(79,70,229,0.10)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(15,23,42,0.04)";
                }}
              >
                <div
                  style={{
                    width: "55px",
                    height: "55px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "14px",
                    background:
                      "linear-gradient(135deg, #eef2ff, #f3e8ff)",
                    fontSize: "27px",
                    marginBottom: "22px",
                  }}
                >
                  {feature.icon}
                </div>

                <h3
                  style={{
                    fontSize: "19px",
                    fontWeight: "750",
                    color: "#111827",
                    margin: "0 0 12px",
                  }}
                >
                  {feature.title}
                </h3>

                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: "1.9",
                    color: "#64748b",
                    margin: 0,
                  }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section
        style={{
          padding: "30px 7% 75px",
          backgroundColor: "#ffffff",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "50px 30px",
            borderRadius: "22px",
            background:
              "linear-gradient(120deg, #4338ca 0%, #6d28d9 55%, #9333ea 100%)",
            textAlign: "center",
            color: "#ffffff",
            boxShadow: "0 18px 40px rgba(79,70,229,0.20)",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(27px, 4vw, 38px)",
              fontWeight: "800",
              margin: "0 0 15px",
            }}
          >
            Your next opportunity awaits.
          </h2>

          <p
            style={{
              maxWidth: "600px",
              margin: "0 auto",
              color: "#e0e7ff",
              fontSize: "15px",
              lineHeight: "1.8",
            }}
          >
            Sign in to explore job opportunities or join Genify to
            get started with your career journey.
          </p>

          <button
            onClick={() => navigate("/register")}
            style={{
              marginTop: "25px",
              padding: "14px 28px",
              border: "none",
              borderRadius: "9px",
              backgroundColor: "#ffffff",
              color: "#4f46e5",
              fontSize: "15px",
              fontWeight: "800",
              cursor: "pointer",
            }}
          >
            Get Started Today →
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: "25px 20px",
          textAlign: "center",
          borderTop: "1px solid #e8ecf5",
          backgroundColor: "#f8faff",
          color: "#64748b",
          fontSize: "13px",
        }}
      >
        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()} Genify. Built to connect talent
          with opportunity.
        </p>
      </footer>
    </div>
  );
}

export default Home;