// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import GiverNav from "./GiverNav";
// import { Container, Row, Col, Card, Spinner } from "react-bootstrap";

// const GiverHome = () => {
//   const navigate = useNavigate();
//   const [status, setStatus] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchStatus = async () => {
//       try {
//         const userId = localStorage.getItem("userId");
//         const res = await fetch(`http://localhost:5000/api/giver/${userId}/status`);
//         if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//         const data = await res.json();
//         console.log("📥 Giver status:", data);
//         setStatus(data.status);
//       } catch (err) {
//         console.error("Error fetching giver status:", err);
//         setError("Failed to load status.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStatus();
//   }, []);

//   const renderMessage = () => {
//     switch (status) {
//       case "complete":
//         return (
//           <Card className="shadow-lg border-0 p-4 text-center">
//             <Card.Body>
//               <h4 className="text-success fw-bold">
//                 ✅ You’ve already filled your sublease form!
//               </h4>
//               <p className="mt-2">Click below if you wish to make any changes.</p>
//               <button className="btn btn-primary mt-3 px-4" onClick={() => navigate("/giver/form")}>
//                 Edit Form
//               </button>
//             </Card.Body>
//           </Card>
//         );

//       case "partial":
//         return (
//           <Card className="shadow-lg border-0 p-4 text-center">
//             <Card.Body>
//               <h4 className="text-warning fw-bold">🕓 You have a partially filled form.</h4>
//               <p className="mt-2">Complete it to make your sublease visible.</p>
//               <button className="btn btn-warning mt-3 px-4" onClick={() => navigate("/giver/form")}>
//                 Complete Form
//               </button>
//             </Card.Body>
//           </Card>
//         );

//       case "offers":
//         return (
//           <Card className="shadow-lg border-0 p-4 text-center">
//             <Card.Body>
//               <h4 className="text-info fw-bold">🎉 Great news! You’ve received new offers.</h4>
//               <p className="mt-2">Review and respond to them below.</p>
//               <button className="btn btn-info mt-3 px-4 text-white" onClick={() => navigate("/giver/offers")}>
//                 View Offers
//               </button>
//             </Card.Body>
//           </Card>
//         );

//       default:
//         return <p>Loading status...</p>;
//     }
//   };

//   if (loading)
//     return (
//       <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
//         <Spinner animation="border" />
//       </div>
//     );

//   if (error)
//     return (
//       <Container className="text-center mt-5">
//         <h5 className="text-danger">{error}</h5>
//       </Container>
//     );

//   return (
//     <div className="home-background min-vh-100 d-flex flex-column">
//       <GiverNav status={status} />
//       <Container className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
//         <h1 className="display-5 fw-bold text-light mb-4">Welcome, Sublease Giver</h1>
//         <Row className="justify-content-center w-100">
//           <Col md={8} lg={6}>{renderMessage()}</Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default GiverHome;
// src/pages/giver/GiverHome.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import GiverNav from "./GiverNav";

const GiverHome = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const giverId = localStorage.getItem("userId");
        if (!giverId) {
          setError("No user ID found. Please log in again.");
          setLoading(false);
          return;
        }

        const res = await fetch(`http://localhost:5000/api/giver/${giverId}/status`);
        if (!res.ok) throw new Error("Failed to fetch giver status");

        const data = await res.json();
        console.log("Fetched giver status:", data);
        setStatus(data.status);
      } catch (err) {
        console.error("Error fetching status:", err);
        setError("Failed to load your data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  const renderMessage = () => {
    switch (status) {
      case "complete":
        return (
          <Card className="shadow-lg border-0 p-4 text-center">
            <Card.Body>
              <h4 className="text-success fw-bold">
                ✅ You’ve already filled your sublease form!
              </h4>
              <p className="mt-2">
                Click below if you wish to make any changes or updates.
              </p>
              <button
                className="btn btn-primary mt-3 px-4"
                onClick={() => navigate("/giver/form")}
              >
                Edit Form
              </button>
            </Card.Body>
          </Card>
        );

      case "partial":
        return (
          <Card className="shadow-lg border-0 p-4 text-center">
            <Card.Body>
              <h4 className="text-warning fw-bold">
                🕓 You have a partially filled sublease form.
              </h4>
              <p className="mt-2">
                Complete it to make your sublease visible to others.
              </p>
              <button
                className="btn btn-warning mt-3 px-4"
                onClick={() => navigate("/giver/form")}
              >
                Complete Form
              </button>
            </Card.Body>
          </Card>
        );

      case "offers":
        return (
          <Card className="shadow-lg border-0 p-4 text-center">
            <Card.Body>
              <h4 className="text-info fw-bold">
                🎉 Great news! You’ve received new offers.
              </h4>
              <p className="mt-2">
                Review and respond to them below.
              </p>
              <button
                className="btn btn-info mt-3 px-4 text-white"
                onClick={() => navigate("/giver/offers")}
              >
                View Offers
              </button>
            </Card.Body>
          </Card>
        );

      default:
        return (
          <Alert variant="secondary" className="text-center">
            Loading your dashboard...
          </Alert>
        );
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <h4 className="text-danger">{error}</h4>
        <button className="btn btn-primary" onClick={() => navigate("/login")}>
          Go to Login
        </button>
      </Container>
    );
  }

  return (
    <div className="home-background min-vh-100 d-flex flex-column">
      <GiverNav status={status} />
      <Container className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <h1 className="display-5 fw-bold text-light mb-4">
          Welcome, Sublease Giver
        </h1>
        <Row className="justify-content-center w-100">
          <Col md={8} lg={6}>
            {renderMessage()}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GiverHome;
