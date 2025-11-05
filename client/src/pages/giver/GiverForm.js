import React, { useState } from "react";
import GiverNav from "./GiverNav";

const GiverForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    amount: "",
    duration: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userId = localStorage.getItem("userId");

    try {
      const res = await fetch(`http://localhost:5000/api/giver/${userId}/form`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, isComplete: true }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Sublease form submitted successfully!");
        console.log("Lease saved:", data);
      } else {
        setMessage("❌ Error submitting form: " + data.message);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setMessage("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <GiverNav />
      <div className="card shadow mt-4">
        <div className="card-body">
          <h3 className="card-title mb-3 text-center">Sublease Form</h3>
          {message && <p className="text-center fw-semibold">{message}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Location</label>
              <input type="text" className="form-control" name="location" value={formData.location} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Amount (USD/month)</label>
              <input type="number" className="form-control" name="amount" value={formData.amount} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Duration (months)</label>
              <input type="number" className="form-control" name="duration" value={formData.duration} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} rows="3" />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary w-50" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GiverForm;
