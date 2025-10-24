import React from "react";
import { Card, Button } from "react-bootstrap";

const LeaseCard = ({ lease }) => {
  const handleSelect = () => {
    // Call API to "buy" the lease
    fetch(`/api/lease-taker/select/${lease.id}`, { method: "POST" })
      .then(() => alert("Lease purchased successfully!"))
      .catch(err => console.error(err));
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{lease.title}</Card.Title>
        <Card.Text>
          <strong>Location:</strong> {lease.location}<br />
          <strong>Amount:</strong> ${lease.amount}<br />
          <strong>Duration:</strong> {lease.duration} months
        </Card.Text>
        <Button variant="success" onClick={handleSelect}>
          Choose Lease
        </Button>
      </Card.Body>
    </Card>
  );
};

export default LeaseCard;
