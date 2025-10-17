
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import GiverNav from "./GiverNav";

// const GiverHome = () => {
//   const navigate = useNavigate();
//   const [status, setStatus] = useState("offers");

//   const renderMessage = () => {
//     switch (status) {
//       case "complete":
//         return (
//           <div className="alert alert-success">
//             ✅ You’ve already filled a sublease form!  
//             <button
//               className="btn btn-primary ms-2"
//               onClick={() => navigate("/giver/form")}
//             >
//               Make Changes
//             </button>
//           </div>
//         );
//       case "partial":
//         return (
//           <div className="alert alert-warning">
//             🕓 You have a partially completed sublease form.  
//             <button
//               className="btn btn-primary ms-2"
//               onClick={() => navigate("/giver/form")}
//             >
//               Complete Form
//             </button>
//           </div>
//         );
//       case "offers":
//         return (
//           <div className="alert alert-info">
//             🎉 Your sublease has offers!  
//             <button
//               className="btn btn-primary ms-2"
//               onClick={() => navigate("/giver/offers")}
//             >
//               View Offers
//             </button>
//           </div>
//         );
//       default:
//         return <div className="alert alert-secondary">Loading your data...</div>;
//     }
//   };

//   return (
//     <div className="container py-4">
//       <GiverNav />
//       <div className="text-center mt-4">
//         <h2 className="mb-4">Welcome, Sublease Giver!</h2>
//         {renderMessage()}

//         <div className="mt-5">
//           <h5>🔄 Change Status (for testing):</h5>
//           <div className="btn-group mt-2">
//             <button onClick={() => setStatus("complete")} className="btn btn-outline-success">
//               Complete
//             </button>
//             <button onClick={() => setStatus("partial")} className="btn btn-outline-warning">
//               Partial
//             </button>
//             <button onClick={() => setStatus("offers")} className="btn btn-outline-info">
//               Offers
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GiverHome;
// src/pages/giver/GiverHome.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GiverNav from "./GiverNav";
import { Container, Row, Col, Card } from "react-bootstrap";

const GiverHome = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("offers"); // can be "complete", "partial", "offers"

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
        return <p>Loading...</p>;
    }
  };

  return (
    <div className="home-background min-vh-100 d-flex flex-column">
      <GiverNav status={status} />
      <Container className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <h1 className="display-5 fw-bold text-light mb-4">Welcome, Sublease Giver</h1>
        <Row className="justify-content-center w-100">
          <Col md={8} lg={6}>{renderMessage()}</Col>
        </Row>
        <div className="mt-5">
          <h6 className="text-white-50 mb-3">Change Status (for testing)</h6>
          <div className="btn-group">
            <button onClick={() => setStatus("complete")} className="btn btn-outline-success">Complete</button>
            <button onClick={() => setStatus("partial")} className="btn btn-outline-warning">Partial</button>
            <button onClick={() => setStatus("offers")} className="btn btn-outline-info">Offers</button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default GiverHome;
