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
  const [contacting, setContacting] = useState(false);

  const handleContact = async () => {
    try {
      const takerEmail = sessionStorage.getItem("email");
      const takerId = sessionStorage.getItem("userId");

      if (!takerEmail || !takerId) {
        alert("Please log in again");
        return;
      }

      setContacting(true);
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
        alert("You've already contacted this giver! ✅");
        return;
      }

      alert("✅ Notification sent! The giver will be notified of your interest.");
      setShowDetails(false);
    } catch (err) {
      console.error("Contact error:", err);
      alert("Could not contact the giver. Please try again.");
    } finally {
      setContacting(false);
    }
  };

  return (
    <>
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
              <strong>Rent:</strong> <span style={{ color: "#667eea", fontWeight: "600", fontSize: "1.1rem" }}>${lease.amount}</span>/month
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
          </Card.Text>
          <Button
            variant="primary"
            onClick={() => setShowDetails(true)}
            className="w-100"
            style={{ fontWeight: "600" }}
          >
            View Details & Contact
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showDetails} onHide={() => setShowDetails(false)} size="lg" centered>
        <Modal.Header closeButton style={{ borderBottom: "2px solid #f0f0f0" }}>
          <Modal.Title style={{ fontWeight: "700", color: "#333" }}>
            {lease.title}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ padding: "24px" }}>
          {/* Photo Gallery */}
          {lease.photos?.length > 0 ? (
            <div className="mb-4">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "12px",
                }}
              >
                {lease.photos.map((photo, idx) => (
                  <img
                    key={idx}
                    src={`http://localhost:5000${photo}`}
                    alt={`${lease.title} - Photo ${idx + 1}`}
                    className="img-fluid"
                    style={{
                      borderRadius: "12px",
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      border: "2px solid #e0e0e0",
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div
              className="mb-4 text-center py-4"
              style={{
                background: "#f8f9fa",
                borderRadius: "12px",
                color: "#999",
              }}
            >
              📷 No photos available
            </div>
          )}

          <div style={{ borderTop: "2px solid #f0f0f0", paddingTop: "20px" }}>
            <div className="mb-3">
              <strong style={{ color: "#667eea" }}>📍 Location:</strong>
              <p className="mb-0" style={{ fontSize: "1.1rem", color: "#333" }}>{lease.location}</p>
            </div>

            <div className="mb-3">
              <strong style={{ color: "#667eea" }}>💰 Monthly Rent:</strong>
              <p className="mb-0" style={{ fontSize: "1.3rem", color: "#667eea", fontWeight: "600" }}>
                ${lease.amount}/month
              </p>
            </div>

            <div className="mb-3">
              <strong style={{ color: "#667eea" }}>📅 Duration:</strong>
              <p className="mb-0" style={{ fontSize: "1.1rem", color: "#333" }}>
                {lease.duration} {lease.duration === 1 ? "month" : "months"}
              </p>
            </div>

            {lease.startDate && lease.endDate && (
              <div className="mb-3">
                <strong style={{ color: "#667eea" }}>📆 Available Dates:</strong>
                <p className="mb-0" style={{ fontSize: "1.1rem", color: "#333" }}>
                  {new Date(lease.startDate).toLocaleDateString("en-US", { 
                    month: "long", 
                    day: "numeric", 
                    year: "numeric" 
                  })} - {new Date(lease.endDate).toLocaleDateString("en-US", { 
                    month: "long", 
                    day: "numeric", 
                    year: "numeric" 
                  })}
                </p>
              </div>
            )}

            {lease.description && (
              <div className="mb-3">
                <strong style={{ color: "#667eea" }}>📝 Description:</strong>
                <p className="mb-0" style={{ color: "#666", lineHeight: "1.6" }}>
                  {lease.description}
                </p>
              </div>
            )}
          </div>
        </Modal.Body>

        <Modal.Footer style={{ borderTop: "2px solid #f0f0f0" }}>
          <Button
            variant="secondary"
            onClick={() => setShowDetails(false)}
            style={{ fontWeight: "600" }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleContact}
            disabled={contacting}
            style={{ fontWeight: "600" }}
          >
            {contacting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Sending...
              </>
            ) : (
              "📧 Contact Giver"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LeaseCard;
