import React, { useState } from "react";
import SubleaseForm from "../../components/SubleaseForm";
import SubleaseSummary from "../../components/SubleaseSummary";

const GiverHome = () => {
  const [sublease, setSublease] = useState(null);
  const [editing, setEditing] = useState(true);

  const handleSave = (data) => {
    setSublease(data);
    setEditing(false);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleClear = () => {
    setSublease(null);
    setEditing(true);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-start"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",
        paddingTop: "50px",
        paddingBottom: "50px",
      }}
    >
      <div
        className="card shadow p-4"
        style={{ maxWidth: "800px", width: "100%", borderRadius: "15px" }}
      >
        <h2 className="text-center mb-4 text-primary">Sublease Giver Dashboard</h2>

        {sublease && !editing ? (
          <SubleaseSummary
            data={sublease}
            onEdit={handleEdit}
            onClear={handleClear}
          />
        ) : (
          <SubleaseForm initialData={sublease} onSave={handleSave} />
        )}
      </div>
    </div>
  );
};

export default GiverHome;
