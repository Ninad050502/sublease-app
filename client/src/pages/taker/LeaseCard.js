// import React from "react";
// import { Card, Button } from "react-bootstrap";

// const LeaseCard = ({ lease }) => {
//   const handleSelect = () => {
//     // Call API to "buy" the lease
//     fetch(`/api/lease-taker/select/${lease.id}`, { method: "POST" })
//       .then(() => alert("Lease purchased successfully!"))
//       .catch(err => console.error(err));
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
import React from "react";
import { Card, Button } from "react-bootstrap";

const LeaseCard = ({ lease }) => {
  const handleSelect = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const res = await fetch(`/api/lease-taker/select/${lease._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) throw new Error("Failed to claim lease");
      alert("Lease claimed successfully!");
    } catch (err) {
      console.error("Error selecting lease:", err);
      alert("Could not claim lease.");
    }
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
