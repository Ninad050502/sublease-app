import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [role, setRole] = useState("taker");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          username: form.username, 
          email: form.email, 
          password: form.password, 
          role 
        }),
      });

      const data = await res.json();
      if (res.ok) {
        // Automatically log in the user after registration
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("role", data.role);
        sessionStorage.setItem("userId", data._id);
        sessionStorage.setItem("email", data.email);
        sessionStorage.setItem("username", data.username);

        // Redirect to appropriate page based on role
        if (data.role === "giver") {
          navigate(`/${data.username}/listings`);
        } else {
          navigate(`/${data.username}/browse`);
        }
      } else {
        alert(data.message || "Error during registration.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setForm({ username: "", email: "", password: "", confirmPassword: "" });
      setRole("taker");
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
        className="card shadow-lg search-card"
        style={{
          maxWidth: "500px",
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
            Create Account
          </h2>
          <p className="text-muted">Join our sublease platform</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ color: "#333" }}>
              Username *
            </label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="e.g., johndoe123"
              required
              style={{ fontSize: "16px" }}
              pattern="[a-z0-9_-]+"
              title="Only lowercase letters, numbers, hyphens, and underscores allowed"
            />
            <small className="text-muted">3-30 characters, lowercase letters, numbers, hyphens, and underscores only</small>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ color: "#333" }}>
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              style={{ fontSize: "16px" }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ color: "#333" }}>
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              required
              style={{ fontSize: "16px" }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ color: "#333" }}>
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              required
              style={{ fontSize: "16px" }}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold" style={{ color: "#333" }}>
              I want to
            </label>
            <div className="d-flex gap-3">
              <div
                className="form-check p-3 border rounded"
                style={{
                  flex: 1,
                  cursor: "pointer",
                  border: role === "giver" ? "2px solid #667eea" : "2px solid #e0e0e0",
                  background: role === "giver" ? "rgba(102, 126, 234, 0.1)" : "transparent",
                  transition: "all 0.3s ease",
                }}
                onClick={() => setRole("giver")}
              >
                <input
                  type="radio"
                  className="form-check-input"
                  name="role"
                  value="giver"
                  checked={role === "giver"}
                  onChange={() => setRole("giver")}
                />
                <label className="form-check-label fw-semibold" style={{ cursor: "pointer" }}>
                  List a Sublease
                </label>
                <small className="d-block text-muted mt-1">I have a property to sublease</small>
              </div>
              <div
                className="form-check p-3 border rounded"
                style={{
                  flex: 1,
                  cursor: "pointer",
                  border: role === "taker" ? "2px solid #667eea" : "2px solid #e0e0e0",
                  background: role === "taker" ? "rgba(102, 126, 234, 0.1)" : "transparent",
                  transition: "all 0.3s ease",
                }}
                onClick={() => setRole("taker")}
              >
                <input
                  type="radio"
                  className="form-check-input"
                  name="role"
                  value="taker"
                  checked={role === "taker"}
                  onChange={() => setRole("taker")}
                />
                <label className="form-check-label fw-semibold" style={{ cursor: "pointer" }}>
                  Find a Sublease
                </label>
                <small className="d-block text-muted mt-1">I'm looking for a sublease</small>
              </div>
            </div>
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
                Registering...
              </>
            ) : (
              "Create Account"
            )}
          </button>

          <div className="text-center">
            <p className="mb-0" style={{ color: "#666" }}>
              Already have an account?{" "}
              <a
                href="/login"
                style={{
                  color: "#667eea",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                Sign in here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
