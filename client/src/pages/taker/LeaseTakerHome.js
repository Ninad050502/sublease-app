// import React, { useEffect, useState } from "react";
// import { Button, Container, Card, Spinner } from "react-bootstrap";
// import LeaseTakerNav from "./LeaseTakerNav";
// import { useNavigate } from "react-router-dom";

// const LeaseTakerHome = () => {
//   const [takerData, setTakerData] = useState(null);
//   const [hasLease, setHasLease] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchTakerData = async () => {
//       try {
//         const userId = localStorage.getItem("userId");
//         console.log("Fetched userId:", userId);

//         if (!userId) {
//           setError("No user ID found. Please log in again.");
//           setLoading(false);
//           return;
//         }

//         const res = await fetch(`http://localhost:5000/api/lease-taker/${userId}`);
//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();
//         console.log("Fetched taker data:", data);

//         setTakerData(data);
//         setHasLease(!!data?.currentLease);
//         localStorage.setItem("hasLease", !!data?.currentLease);
//       } catch (err) {
//         console.error("Error fetching taker data:", err);
//         setError("Failed to load your data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTakerData();
//   }, []);

//   const handleSearchClick = () => navigate("/available-leases");
//   const handleGiveUpLease = async () => {
//   try {
//     const userId = localStorage.getItem("userId");
//     const leaseId = takerData?.currentLease?._id;

//     if (!leaseId || !userId) {
//       alert("Lease or user information missing!");
//       return;
//     }

//     const res = await fetch(`http://localhost:5000/api/lease-taker/release/${leaseId}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ userId }),
//     });

//     if (!res.ok) throw new Error("Failed to release lease");

//     alert("Lease released successfully!");
//     localStorage.setItem("hasLease", "false"); // ✅ update navbar state
//     navigate("/available-leases");
//   } catch (err) {
//     console.error("Error releasing lease:", err);
//     alert("Something went wrong while releasing your lease.");
//     }
//   };

//   // 🌀 Show loading spinner
//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
//         <Spinner animation="border" variant="primary" />
//       </div>
//     );
//   }

//   // ❌ Show error message
//   if (error) {
//     return (
//       <Container className="text-center mt-5">
//         <h4 className="text-danger">{error}</h4>
//         <Button variant="primary" onClick={() => navigate("/login")}>
//           Go to Login
//         </Button>
//       </Container>
//     );
//   }

//   // ✅ Render main content
//   return (
//     <>
//       <LeaseTakerNav />
//       <Container className="mt-5 text-center">
//         {!hasLease ? (
//           <>
//             <h4>Welcome, {takerData.name}!</h4>
//             <p>You don’t have any leases yet.</p>
//             <Button variant="primary" onClick={handleSearchClick}>
//               View Available Leases
//             </Button>
//           </>
//         ) : (
//           <>
//             <h4>Welcome back, {takerData.name}!</h4>
//             <p className="mt-3">
//               You already have a lease to your name. Do you wish to give it up and search for a new one?
//             </p>

//             <Card className="mx-auto my-3 shadow" style={{ maxWidth: "500px" }}>
//               <Card.Body>
//                 <Card.Title>{takerData.currentLease.title}</Card.Title>
//                 <Card.Text>
//                   <strong>Location:</strong> {takerData.currentLease.location}
//                   <br />
//                   <strong>Amount:</strong> ${takerData.currentLease.amount}
//                   <br />
//                   <strong>Duration:</strong> {takerData.currentLease.duration} months
//                 </Card.Text>
//               </Card.Body>
//             </Card>

//             <Button variant="danger" onClick={handleGiveUpLease}>
//               Give Up and Search New Lease
//             </Button>
//           </>
//         )}
//       </Container>
//     </>
//   );
// };

// export default LeaseTakerHome;
// import React, { useEffect, useState } from "react";
// import { Button, Container, Card, Spinner, Modal } from "react-bootstrap";
// import LeaseTakerNav from "./LeaseTakerNav";
// import { useNavigate } from "react-router-dom";

// const LeaseTakerHome = () => {
//   const [takerData, setTakerData] = useState(null);
//   const [hasLease, setHasLease] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [showConfirmModal, setShowConfirmModal] = useState(false); // ✅ new state
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchTakerData = async () => {
//       try {
//         const userId = localStorage.getItem("userId");
//         if (!userId) {
//           setError("No user ID found. Please log in again.");
//           setLoading(false);
//           return;
//         }

//         const res = await fetch(`http://localhost:5000/api/lease-taker/${userId}`);
//         if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

//         const data = await res.json();
//         console.log("Fetched taker data:", data);

//         setTakerData(data);
//         setHasLease(!!data?.currentLease);
//         localStorage.setItem("hasLease", !!data?.currentLease);
//       } catch (err) {
//         console.error("Error fetching taker data:", err);
//         setError("Failed to load your data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTakerData();
//   }, []);

//   const handleSearchClick = () => navigate("/available-leases");

//   // ✅ When user clicks “Give Up Lease”, just show modal first
//   const handleGiveUpClick = () => {
//     setShowConfirmModal(true);
//   };

//   // ✅ If user confirms “Yes”
//   const confirmGiveUpLease = async () => {
//     try {
//       const userId = localStorage.getItem("userId");
//       const leaseId = takerData?.currentLease?._id;

//       if (!leaseId || !userId) {
//         alert("Lease or user information missing!");
//         return;
//       }

//       const res = await fetch(`http://localhost:5000/api/lease-taker/release/${leaseId}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId }),
//       });

//       if (!res.ok) throw new Error("Failed to release lease");

//       // ✅ Update UI dynamically
//       setHasLease(false);
//       setTakerData({ ...takerData, currentLease: null });
//       localStorage.setItem("hasLease", "false");

//       setShowConfirmModal(false);
//     } catch (err) {
//       console.error("Error releasing lease:", err);
//       alert("Something went wrong while releasing your lease.");
//     }
//   };

//   // ✅ If user cancels “No”
//   const cancelGiveUpLease = () => {
//     setShowConfirmModal(false);
//   };

//   // 🌀 Loading state
//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
//         <Spinner animation="border" variant="primary" />
//       </div>
//     );
//   }

//   // ❌ Error state
//   if (error) {
//     return (
//       <Container className="text-center mt-5">
//         <h4 className="text-danger">{error}</h4>
//         <Button variant="primary" onClick={() => navigate("/login")}>
//           Go to Login
//         </Button>
//       </Container>
//     );
//   }

//   // ✅ Main render
//   return (
//     <>
//       <LeaseTakerNav />
//       <Container className="mt-5 text-center">
//         {!hasLease ? (
//           <>
//             <h4>Welcome, {takerData.name}!</h4>
//             <p>You don’t have any leases yet.</p>
//             <Button variant="primary" onClick={handleSearchClick}>
//               View Available Leases
//             </Button>
//           </>
//         ) : (
//           <>
//             <h4>Welcome back, {takerData.name}!</h4>
//             <p className="mt-3">
//               You already have a lease to your name. Do you wish to give it up and search for a new one?
//             </p>

//             <Card className="mx-auto my-3 shadow" style={{ maxWidth: "500px" }}>
//               <Card.Body>
//                 <Card.Title>{takerData.currentLease.title}</Card.Title>
//                 <Card.Text>
//                   <strong>Location:</strong> {takerData.currentLease.location}
//                   <br />
//                   <strong>Amount:</strong> ${takerData.currentLease.amount}
//                   <br />
//                   <strong>Duration:</strong> {takerData.currentLease.duration} months
//                 </Card.Text>
//               </Card.Body>
//             </Card>

//             <Button variant="danger" onClick={handleGiveUpClick}>
//               Give Up Lease
//             </Button>
//           </>
//         )}
//       </Container>

//       {/* ✅ Confirmation Modal */}
//       <Modal show={showConfirmModal} onHide={cancelGiveUpLease} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>⚠️ Confirm Lease Release</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>Are you sure you want to give up your lease?</p>
//           <p className="text-muted mb-0">
//             You’ll lose access to this property, and it’ll be available for other users.
//           </p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={cancelGiveUpLease}>
//             No, Keep It
//           </Button>
//           <Button variant="danger" onClick={confirmGiveUpLease}>
//             Yes, Give Up Lease
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default LeaseTakerHome;
import React from "react";
import { Button, Container } from "react-bootstrap";
import LeaseTakerNav from "./LeaseTakerNav";
import { useNavigate, useParams } from "react-router-dom";

const LeaseTakerHome = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const currentUsername = sessionStorage.getItem("username") || username;

  const handleSearchClick = () => {
    if (currentUsername) {
      navigate(`/${currentUsername}/browse`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div style={{ background: "rgba(255, 255, 255, 0.95)", minHeight: "100vh" }}>
      <LeaseTakerNav />

      <Container className="py-5 fade-in">
        <div className="text-center" style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ fontSize: "5rem", marginBottom: "24px" }}>🏠</div>
          <h2
            style={{
              fontWeight: "700",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "16px",
            }}
          >
            Welcome to Sublease Finder
          </h2>
          <p className="text-muted mb-4" style={{ fontSize: "1.1rem" }}>
            Discover your perfect sublease! Browse available listings, view detailed information,
            and connect directly with property owners.
          </p>

          <div className="card shadow-sm mb-4" style={{ background: "rgba(102, 126, 234, 0.05)", border: "none" }}>
            <div className="card-body p-4">
              <h5 className="mb-3" style={{ color: "#333", fontWeight: "600" }}>
                How it works:
              </h5>
              <div className="text-start" style={{ maxWidth: "400px", margin: "0 auto" }}>
                <div className="mb-3">
                  <strong style={{ color: "#667eea" }}>1. 🔍 Browse</strong>
                  <p className="mb-0 text-muted">Search listings by location and filter by price</p>
                </div>
                <div className="mb-3">
                  <strong style={{ color: "#667eea" }}>2. 👀 View Details</strong>
                  <p className="mb-0 text-muted">See photos, descriptions, and all property details</p>
                </div>
                <div>
                  <strong style={{ color: "#667eea" }}>3. 📧 Contact</strong>
                  <p className="mb-0 text-muted">Send a notification to the giver expressing your interest</p>
                </div>
              </div>
            </div>
          </div>

          <Button
            variant="primary"
            onClick={handleSearchClick}
            size="lg"
            style={{
              fontWeight: "600",
              padding: "14px 32px",
              fontSize: "1.1rem",
            }}
          >
            🔎 Start Browsing Listings
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default LeaseTakerHome;
