// import React, { useEffect, useState } from "react";
// import GiverNav from "./GiverNav";
// import { Spinner } from "react-bootstrap";

// const GiverOffers = () => {
//   const [offers, setOffers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchOffers = async () => {
//       try {
//         const userId = localStorage.getItem("userId");
//         const res = await fetch(`http://localhost:5000/api/giver/${userId}/offers`);
//         const data = await res.json();
//         if (res.ok) setOffers(data.offers || []);
//         else setError(data.message || "Failed to fetch offers");
//       } catch (err) {
//         console.error("Error fetching offers:", err);
//         setError("Something went wrong while loading offers.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOffers();
//   }, []);

//   if (loading)
//     return (
//       <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
//         <Spinner animation="border" />
//       </div>
//     );

//   if (error)
//     return (
//       <div className="text-center text-danger mt-5">
//         <h5>{error}</h5>
//       </div>
//     );

//   return (
//     <div className="container py-4">
//       <GiverNav status="offers" />
//       <h3 className="mt-4 mb-3 text-center">Your Sublease Offers</h3>
//       {offers.length > 0 ? (
//         <div className="row justify-content-center">
//           {offers.map((offer, index) => (
//             <div key={index} className="col-md-6 mb-3">
//               <div className="card shadow-sm">
//                 <div className="card-body">
//                   <h5 className="card-title">{offer.taker?.email || "Anonymous"}</h5>
//                   <p className="card-text mb-1">💰 <strong>${offer.amount}</strong></p>
//                   <p className="text-muted">{offer.message}</p>
//                   <div className="d-flex justify-content-end">
//                     <button className="btn btn-success me-2">Accept</button>
//                     <button className="btn btn-outline-danger">Reject</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-muted mt-4">No offers yet. Check back later!</p>
//       )}
//     </div>
//   );
// };

// export default GiverOffers;
// src/pages/giver/GiverOffers.js
import React, { useEffect, useState } from "react";
import { Container, Card, Button, Spinner, Row, Col, Badge } from "react-bootstrap";
import GiverNav from "./GiverNav";

const GiverOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOffers = async () => {
    try {
      const giverId = localStorage.getItem("userId");
      const res = await fetch(`http://localhost:5000/api/giver/${giverId}/offers`);
      if (!res.ok) throw new Error("Failed to fetch offers");

      const data = await res.json();
      console.log("Fetched offers:", data);
      setOffers(data);
    } catch (err) {
      console.error("Error fetching offers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleAccept = async (leaseId, offerId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/giver/offer/${leaseId}/accept/${offerId}`,
        { method: "POST" }
      );
      if (!res.ok) throw new Error("Failed to accept offer");

      alert("Offer accepted! Lease assigned.");
      fetchOffers(); // refresh offers
    } catch (err) {
      console.error("Error accepting offer:", err);
      alert("Something went wrong while accepting the offer.");
    }
  };

  const handleReject = async (leaseId, offerId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/giver/offer/${leaseId}/reject/${offerId}`,
        { method: "POST" }
      );
      if (!res.ok) throw new Error("Failed to reject offer");

      alert("Offer rejected.");
      fetchOffers(); // refresh offers
    } catch (err) {
      console.error("Error rejecting offer:", err);
      alert("Something went wrong while rejecting the offer.");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex flex-column">
      <GiverNav status="offers" />
      <Container className="py-4">
        <h3 className="text-center mb-4">Your Sublease Offers</h3>

        {offers.length === 0 ? (
          <p className="text-center text-muted">No offers yet. Check back later!</p>
        ) : (
          <Row className="justify-content-center">
            {offers.map((offer) => (
              <Col md={6} key={offer._id} className="mb-3">
                <Card className="shadow-sm">
                  <Card.Body>
                    <h5 className="card-title">
                      Lease: {offer.leaseTitle}
                    </h5>
                    <p className="mb-2">
                      <strong>From:</strong> {offer.taker?.email || "Unknown User"}
                    </p>
                    <Badge
                      bg={
                        offer.status === "pending"
                          ? "warning"
                          : offer.status === "accepted"
                          ? "success"
                          : "secondary"
                      }
                      className="mb-3"
                    >
                      {offer.status.toUpperCase()}
                    </Badge>
                    <div className="d-flex justify-content-end">
                      {offer.status === "pending" && (
                        <>
                          <Button
                            variant="success"
                            className="me-2"
                            onClick={() => handleAccept(offer.leaseId, offer._id)}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="outline-danger"
                            onClick={() => handleReject(offer.leaseId, offer._id)}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                      {offer.status !== "pending" && (
                        <small className="text-muted fst-italic">
                          Action taken: {offer.status}
                        </small>
                      )}
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

export default GiverOffers;
