// src/pages/giver/GiverForm.js
import React, { useState } from "react";
import GiverNav from "./GiverNav";

const GiverForm = () => {
  const [formData, setFormData] = useState({
    address: "",
    rent: "",
    duration: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Sublease form submitted successfully (frontend only)!");
  };

  return (
    <div className="container py-4">
      <GiverNav />
      <div className="card shadow mt-4">
        <div className="card-body">
          <h3 className="card-title mb-3 text-center">Sublease Form</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Rent (USD/month)</label>
              <input
                type="number"
                className="form-control"
                name="rent"
                value={formData.rent}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Duration (months)</label>
              <input
                type="number"
                className="form-control"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
              />
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary w-50">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GiverForm;
