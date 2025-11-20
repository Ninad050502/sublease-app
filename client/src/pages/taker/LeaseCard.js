// import React, { useState } from "react";
// import { Card, Button, Modal } from "react-bootstrap";

// const LeaseCard = ({ lease }) => {
//   const [showDetails, setShowDetails] = useState(false);
// //Third Time
// const handleContact = async () => {
//   try {
//     const takerEmail = localStorage.getItem("email");
//     const takerId = localStorage.getItem("userId");

//     if (!takerEmail || !takerId) {
//       alert("Please log in again.");
//       return;
//     }

//     const res = await fetch(
//       `http://localhost:5000/api/leases/contact/${lease._id}`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ takerEmail, takerId }),
//       }
//     );

//     const data = await res.json();

//     if (data.alreadySent) {
//       alert("Notification Already Sent");
//       return;
//     }

//     alert("Notification sent to the Giver!");
//   } catch (err) {
//     console.error("Contact error:", err);
//     alert("Could not contact the giver.");
//   }
// };


//   return (
//     <>
//       {/* Lease card */}
//       <Card className="mb-3 shadow-sm">
//         <Card.Body>
//           <Card.Title>{lease.title}</Card.Title>
//           <Card.Text>
//             <strong>Location:</strong> {lease.location} <br />
//             <strong>Rent:</strong> ${lease.amount} <br />
//             <strong>Duration:</strong> {lease.duration} months
//           </Card.Text>

//           <div className="d-flex gap-2">
//             <Button variant="secondary" onClick={() => setShowDetails(true)}>
//               View Details
//             </Button>

//             <Button variant="primary" onClick={handleContact}>
//               Contact Giver
//             </Button>
//           </div>
//         </Card.Body>
//       </Card>

//       {/* Details modal */}
//       <Modal show={showDetails} onHide={() => setShowDetails(false)} size="lg" centered>
//         <Modal.Header closeButton>
//           <Modal.Title>{lease.title}</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           {/* Photos */}
//           {lease.photos && lease.photos.length > 0 ? (
//             <div>
//               {lease.photos.map((photo, index) => (
//                 <img
//                   key={index}
//                   src={`http://localhost:5000${photo}`}
//                   alt="Lease"
//                   className="img-fluid mb-3"
//                   style={{ borderRadius: "6px" }}
//                 />
//               ))}
//             </div>
//           ) : (
//             <p>No photos available</p>
//           )}

//           <p><strong>Location:</strong> {lease.location}</p>
//           <p><strong>Rent:</strong> ${lease.amount}</p>
//           <p><strong>Duration:</strong> {lease.duration} months</p>
//           <p><strong>Description:</strong> {lease.description}</p>
//         </Modal.Body>

//         <Modal.Footer>
//           <Button variant="primary" onClick={handleContact}>
//             Contact Giver
//           </Button>
//           <Button variant="secondary" onClick={() => setShowDetails(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default LeaseCard;
import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";

const LeaseCard = ({ lease }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleContact = async () => {
    try {
      const takerEmail = localStorage.getItem("email");
      const takerId = localStorage.getItem("userId");

      if (!takerEmail || !takerId) {
        alert("Please log in again");
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

      const data = await res.json();

      if (data.alreadySent) {
        alert("Notification already sent!");
        return;
      }

      alert("Notification sent!");
    } catch (err) {
      console.error("Contact error:", err);
      alert("Could not contact the giver");
    }
  };

  return (
    <>
      <Card className="mb-3 shadow-sm">
        <Card.Body>
          <Card.Title>{lease.title}</Card.Title>
          <Card.Text>
            <strong>Location:</strong> {lease.location} <br />
            <strong>Rent:</strong> ${lease.amount} <br />
            <strong>Duration:</strong> {lease.duration} months
          </Card.Text>

          <Button variant="secondary" onClick={() => setShowDetails(true)}>
            View Details
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showDetails} onHide={() => setShowDetails(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{lease.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* Show multiple photos */}
          {lease.photos?.length > 0 ? (
            lease.photos.map((photo, idx) => (
              <img
                key={idx}
                src={`http://localhost:5000${photo}`}
                alt="Lease"
                className="img-fluid mb-3"
                style={{ borderRadius: "8px" }}
              />
            ))
          ) : (
            <p>No photos available</p>
          )}

          <p><strong>Location:</strong> {lease.location}</p>
          <p><strong>Rent:</strong> ${lease.amount}</p>
          <p><strong>Duration:</strong> {lease.duration} months</p>
          <p><strong>Description:</strong> {lease.description}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleContact}>
            Contact Giver
          </Button>
          <Button variant="secondary" onClick={() => setShowDetails(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LeaseCard;
