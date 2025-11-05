// // import React from "react";
// // import { Card, Button } from "react-bootstrap";

// // const LeaseCard = ({ lease }) => {
// //   const handleSelect = () => {
// //     // Call API to "buy" the lease
// //     fetch(`/api/lease-taker/select/${lease.id}`, { method: "POST" })
// //       .then(() => alert("Lease purchased successfully!"))
// //       .catch(err => console.error(err));
// //   };

// //   return (
// //     <Card className="mb-3">
// //       <Card.Body>
// //         <Card.Title>{lease.title}</Card.Title>
// //         <Card.Text>
// //           <strong>Location:</strong> {lease.location}<br />
// //           <strong>Amount:</strong> ${lease.amount}<br />
// //           <strong>Duration:</strong> {lease.duration} months
// //         </Card.Text>
// //         <Button variant="success" onClick={handleSelect}>
// //           Choose Lease
// //         </Button>
// //       </Card.Body>
// //     </Card>
// //   );
// // };

// // export default LeaseCard;
// import React from "react";
// import { Card, Button } from "react-bootstrap";

// const LeaseCard = ({ lease }) => {
//   const handleSelect = async () => {
//     try {
//       const userId = localStorage.getItem("userId");
//       const res = await fetch(`/api/lease-taker/select/${lease._id}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId }),
//       });

//       if (!res.ok) throw new Error("Failed to claim lease");
//       alert("Lease claimed successfully!");
//     } catch (err) {
//       console.error("Error selecting lease:", err);
//       alert("Could not claim lease.");
//     }
//   };

//   return (
//     <Card className="mb-3">
//       <Card.Body>
//         <Card.Title>{lease.title}</Card.Title>
//         <Card.Text>
//           <strong>Location:</strong> {lease.location}<br />
//           <strong>Amount:</strong> ${lease.amount}<br />
//           <strong>Duration:</strong> {lease.duration} months
//         </Card.Text>
//         <Button variant="success" onClick={handleSelect}>
//           Choose Lease
//         </Button>
//       </Card.Body>
//     </Card>
//   );
// };

// export default LeaseCard;
import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LeaseCard = ({ lease }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleSelect = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const res = await fetch(`/api/lease-taker/select/${lease._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) throw new Error("Failed to claim lease");

      // ✅ Save lease status for navbar
      localStorage.setItem("hasLease", "true");

      // ✅ Show congratulations modal
      setShowModal(true);
    } catch (err) {
      console.error("Error selecting lease:", err);
      alert("Could not claim lease. Please try again.");
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
