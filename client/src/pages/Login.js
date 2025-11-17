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
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("userId", data._id);
        localStorage.setItem("email", data.email);

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
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",
      }}
    >
      <div
        className="card shadow p-4"
        style={{ maxWidth: "400px", width: "100%", borderRadius: "15px" }}
      >
        <h3 className="text-center mb-4 text-primary">Login</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn w-100 mb-3"
            style={{
              background: "linear-gradient(90deg, #74ebd5, #ACB6E5)",
              border: "none",
              borderRadius: "10px",
              color: "white",
              fontWeight: "600",
              padding: "10px",
              transition: "all 0.3s ease",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="text-center">
            <small className="text-white">
              Don’t have an account?{" "}
              <a href="/register" className="text-warning">
                Register here
              </a>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
