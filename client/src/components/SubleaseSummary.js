import React from "react";

const SubleaseSummary = ({ data, onEdit, onClear }) => {
  return (
    <div className="card p-4 shadow-sm">
      <h5>{data.title}</h5>
      <p className="text-muted">{data.address}</p>
      <p><strong>Rent:</strong> ${data.rent} / month</p>
      <p>
        <strong>Available:</strong> {data.availableFrom || "—"} to {data.availableTo || "—"}
      </p>
      <p>{data.description}</p>

      <div className="d-flex gap-2">
        <button className="btn btn-outline-primary" onClick={onEdit}>
          Edit
        </button>
        <button className="btn btn-outline-danger" onClick={onClear}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default SubleaseSummary;
