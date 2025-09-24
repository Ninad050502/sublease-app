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
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Role</label>
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

        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
