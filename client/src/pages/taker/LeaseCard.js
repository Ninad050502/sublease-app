import React from "react";
import { Card, Button } from "react-bootstrap";

const LeaseCard = ({ lease }) => {
  const handleContact = async () => {
    try {
      const takerId = localStorage.getItem("userId");
      const takerEmail = localStorage.getItem("email");

      if (!takerId || !takerEmail) {
        alert("Please log in again.");
        return;
      }

      const res = await fetch(
        `http://localhost:5000/api/leases/contact/${lease._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ takerId, takerEmail }),
        }
      );

      if (!res.ok) throw new Error("Failed to send contact request");

      alert("Notification sent to the Giver!");
    } catch (err) {
      console.error("❌ Contact giver error:", err);
      alert("Could not contact giver. Please try again.");
    }
  };

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>{lease.title}</Card.Title>
        <Card.Text>
          <strong>Location:</strong> {lease.location}
          <br />
          <strong>Amount:</strong> ${lease.amount}
          <br />
          <strong>Duration:</strong> {lease.duration} months
        </Card.Text>

        <Button variant="primary" onClick={handleContact}>
          Contact Giver
        </Button>
      </Card.Body>
    </Card>
  );
};

export default LeaseCard;
