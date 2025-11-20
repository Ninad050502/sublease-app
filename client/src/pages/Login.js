import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("role", data.role);
        sessionStorage.setItem("userId", data._id);
        sessionStorage.setItem("email", data.email);

        if (data.role === "giver") navigate("/giver");
        else navigate("/taker");
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setForm({ email: "", password: "" });
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center fade-in"
      style={{
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div
        className="card shadow-lg"
        style={{
          maxWidth: "450px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          padding: "40px",
        }}
      >
        <div className="text-center mb-4">
          <h2
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "700",
              fontSize: "2rem",
              marginBottom: "8px",
            }}
          >
            Sublease Finder
          </h2>
          <p className="text-muted">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ color: "#333" }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-control"
              placeholder="you@example.com"
              required
              style={{ fontSize: "16px" }}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold" style={{ color: "#333" }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your password"
              required
              style={{ fontSize: "16px" }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-100 mb-3"
            style={{
              color: "white",
              fontWeight: "600",
              padding: "14px",
              fontSize: "16px",
            }}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          <div className="text-center">
            <p className="mb-0" style={{ color: "#666" }}>
              Don't have an account?{" "}
              <a
                href="/register"
                style={{
                  color: "#667eea",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                Sign up here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
