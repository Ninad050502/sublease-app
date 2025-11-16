import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LeaseCard = ({ lease }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // const handleSelect = async () => {
  //   try {
  //     const userId = localStorage.getItem("userId");
  //     const res = await fetch(`/api/lease-taker/select/${lease._id}`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ userId }),
  //     });

  //     if (!res.ok) throw new Error("Failed to claim lease");

  //     // ✅ Save lease status for navbar
  //     localStorage.setItem("hasLease", "true");

  //     // ✅ Show congratulations modal
  //     setShowModal(true);
  //   } catch (err) {
  //     console.error("Error selecting lease:", err);
  //     alert("Could not claim lease. Please try again.");
  //   }
  // };
  const handleSelect = async () => {
  try {
    const userId = localStorage.getItem("userId");
    const res = await fetch(`/api/leases/offer/${lease._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    if (!res.ok) throw new Error("Failed to submit offer");
    alert("Your offer has been sent to the lease giver!");
  } catch (err) {
    console.error("Error sending offer:", err);
    alert("Could not send offer. Please try again.");
    }
  };

  const handleClose = () => {
    setShowModal(false);
    navigate("/taker"); // ✅ Redirect to home after closing modal
  };

  return (
    <>
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
          <Button variant="success" onClick={handleSelect}>
            Choose Lease
          </Button>
        </Card.Body>
      </Card>

      {/* ✅ Congratulations Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>🎉 Congratulations!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            You’ve successfully claimed the lease <strong>{lease.title}</strong> in{" "}
            <strong>{lease.location}</strong>.
          </p>
          <p>You can now view your lease details in your dashboard.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LeaseCard;
