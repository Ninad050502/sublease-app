import React, { useEffect, useState } from "react";

const defaultData = {
  title: "",
  address: "",
  rent: "",
  availableFrom: "",
  availableTo: "",
  description: "",
};

const SubleaseForm = ({ initialData, onSave }) => {
  const [form, setForm] = useState(defaultData);

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.address || !form.rent) {
      alert("Please fill out Title, Address, and Rent.");
      return;
    }
    onSave(form);
  };

  return (
    <div className="card p-4 shadow-sm">
      <h5 className="mb-3">Enter Sublease Details</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g. 2BHK near campus"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            className="form-control"
            placeholder="Full address"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Monthly Rent (USD)</label>
          <input
            type="number"
            name="rent"
            value={form.rent}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter rent"
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Available From</label>
            <input
              type="date"
              name="availableFrom"
              value={form.availableFrom}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Available To</label>
            <input
              type="date"
              name="availableTo"
              value={form.availableTo}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="form-control"
            rows="3"
            placeholder="Add details about the property..."
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default SubleaseForm;
