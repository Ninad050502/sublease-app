import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import GiverNav from "./GiverNav";

const GiverHome = () => {
  const [leases, setLeases] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");

  const fetchMyLeases = async () => {
    try {
      const giverId = sessionStorage.getItem("userId");
      const res = await fetch(`http://localhost:5000/api/giver/my-leases/${giverId}`);
      const data = await res.json();
      setLeases(data);
    } catch (err) {
      console.error("Error fetching giver leases:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyLeases();
  }, []);

  const handleDelete = async (leaseId) => {
    if (!window.confirm("Are you sure you want to delete this listing? This action cannot be undone.")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/giver/delete/${leaseId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete lease");
      alert("Listing deleted successfully!");
      fetchMyLeases();
    } catch (err) {
      console.error("Error deleting lease:", err);
      alert("Could not delete listing. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", background: "rgba(255, 255, 255, 0.95)" }}>
        <div className="text-center">
          <Spinner animation="border" variant="primary" style={{ width: "3rem", height: "3rem" }} />
          <p className="mt-3 text-muted">Loading your listings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ background: "rgba(255, 255, 255, 0.95)" }}>
      <GiverNav />
      <Container className="py-5 fade-in">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 style={{ fontWeight: "700", color: "#333", marginBottom: "8px" }}>My Listings</h2>
            <p className="text-muted mb-0">Manage your sublease listings</p>
          </div>
          <div className="badge bg-primary" style={{ fontSize: "1rem", padding: "8px 16px" }}>
            {leases.length} {leases.length === 1 ? "Listing" : "Listings"}
          </div>
        </div>

        {leases.length === 0 ? (
          <div className="text-center py-5">
            <div style={{ fontSize: "4rem", marginBottom: "20px" }}>🏠</div>
            <h4 style={{ color: "#666", marginBottom: "12px" }}>No Listings Yet</h4>
            <p className="text-muted mb-4">Start by creating your first sublease listing!</p>
            <Button 
              variant="primary"
              onClick={() => username && navigate(`/${username}/listings/create`)}
            >
              Create Your First Listing
            </Button>
          </div>
        ) : (
          <Row>
            {leases.map((lease) => (
              <Col md={4} key={lease._id} className="mb-4">
                <Card className="h-100 shadow-sm">
                  {lease.photos && lease.photos.length > 0 && (
                    <div
                      style={{
                        height: "200px",
                        overflow: "hidden",
                        background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
                        position: "relative",
                      }}
                    >
                      <img
                        src={`http://localhost:5000${lease.photos[0]}`}
                        alt={lease.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                  <Card.Body className="d-flex flex-column">
                    <Card.Title style={{ fontSize: "1.25rem", fontWeight: "600", color: "#333", marginBottom: "12px" }}>
                      {lease.title}
                    </Card.Title>
                    <Card.Text style={{ flexGrow: 1, color: "#666" }}>
                      <div className="mb-2">
                        <i className="bi bi-geo-alt-fill me-2" style={{ color: "#667eea" }}></i>
                        <strong>Location:</strong> {lease.location}
                      </div>
                      <div className="mb-2">
                        <i className="bi bi-currency-dollar me-2" style={{ color: "#667eea" }}></i>
                        <strong>Rent:</strong> <span style={{ color: "#667eea", fontWeight: "600" }}>${lease.amount}</span>/month
                      </div>
                      <div className="mb-2">
                        <i className="bi bi-calendar-check me-2" style={{ color: "#667eea" }}></i>
                        <strong>Duration:</strong> {lease.duration} {lease.duration === 1 ? "month" : "months"}
                      </div>
                      {lease.startDate && lease.endDate && (
                        <div className="mb-2">
                          <i className="bi bi-calendar-range me-2" style={{ color: "#667eea" }}></i>
                          <strong>Available:</strong> {new Date(lease.startDate).toLocaleDateString("en-US", { 
                            month: "short", 
                            day: "numeric", 
                            year: "numeric" 
                          })} - {new Date(lease.endDate).toLocaleDateString("en-US", { 
                            month: "short", 
                            day: "numeric", 
                            year: "numeric" 
                          })}
                        </div>
                      )}
                      {lease.description && (
                        <div className="mt-2" style={{ fontSize: "0.9rem", color: "#888" }}>
                          {lease.description.length > 80
                            ? `${lease.description.substring(0, 80)}...`
                            : lease.description}
                        </div>
                      )}
                    </Card.Text>
                    <div className="mt-auto pt-3">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(lease._id)}
                        className="w-100"
                        style={{ fontWeight: "600" }}
                      >
                        <i className="bi bi-trash me-2"></i>
                        Delete Listing
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default GiverHome;
