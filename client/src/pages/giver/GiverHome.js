import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import GiverNav from "./GiverNav";

const GiverHome = () => {
  const [leases, setLeases] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyLeases = async () => {
    try {
      const giverId = localStorage.getItem("userId");
      const res = await fetch(`/api/giver/my-leases/${giverId}`);
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
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    try {
      const res = await fetch(`/api/giver/delete/${leaseId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete lease");
      alert("Listing deleted.");
      fetchMyLeases();
    } catch (err) {
      console.error("Error deleting lease:", err);
      alert("Could not delete listing.");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex flex-column">
      <GiverNav />
      <Container className="py-4">
        <h3 className="mb-4">My Listings</h3>
        {leases.length === 0 ? (
          <p className="text-muted">You have no listings yet. Create one using "Add Listing".</p>
        ) : (
          <Row>
            {leases.map((lease) => (
              <Col md={4} key={lease._id} className="mb-3">
                <Card className="shadow-sm">
                  <Card.Body>
                    <Card.Title>{lease.title}</Card.Title>
                    <Card.Text>
                      <strong>Location:</strong> {lease.location} <br />
                      <strong>Rent:</strong> ${lease.amount}/month <br />
                      <strong>Duration:</strong> {lease.duration} months
                    </Card.Text>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(lease._id)}
                    >
                      Delete
                    </Button>
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
