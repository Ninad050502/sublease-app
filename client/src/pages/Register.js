import React, { useState } from "react";

const Register = () => {
  const [role, setRole] = useState("taker");
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log({ ...form, role });
    setForm({ email: "", password: "", confirmPassword: "" });
    setRole("taker");
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
        className="card shadow-lg p-4"
        style={{ width: "100%", maxWidth: "420px", borderRadius: "20px" }}
      >
        <h2
          className="text-center mb-4"
          style={{
            fontWeight: "700",
            background: "linear-gradient(90deg, #74ebd5, #ACB6E5)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Register
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              style={{ borderRadius: "10px" }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              style={{ borderRadius: "10px" }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              style={{ borderRadius: "10px" }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Role</label>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="role"
                value="giver"
                checked={role === "giver"}
                onChange={() => setRole("giver")}
              />
              <label className="form-check-label">Sublease Giver</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="role"
                value="taker"
                checked={role === "taker"}
                onChange={() => setRole("taker")}
              />
              <label className="form-check-label">Sublease Taker</label>
            </div>
          </div>

          <button
            type="submit"
            className="btn w-100"
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
