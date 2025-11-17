import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GiverNav from "./GiverNav";

const GiverForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    amount: "",
    duration: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const giverId = localStorage.getItem("userId");
      const body = { ...formData, amount: Number(formData.amount), duration: Number(formData.duration), giverId };

      const res = await fetch("/api/giver/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error creating lease");

      alert("✅ Listing created successfully!");
      navigate("/giver");
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("❌ Something went wrong while creating the listing.");
    }
  };

  return (
    <div className="container py-4">
      <GiverNav />
      <div className="card shadow mt-4">
        <div className="card-body">
          <h3 className="card-title mb-3 text-center">Create Sublease Listing</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Location</label>
              <input
                type="text"
                className="form-control"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Rent (USD/month)</label>
              <input
                type="number"
                className="form-control"
                name="amount"
                value={formData.amount}
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

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary w-50">
                Create Listing
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GiverForm;
