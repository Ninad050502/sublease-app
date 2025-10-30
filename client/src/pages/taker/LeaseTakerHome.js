// import React, { useEffect, useState } from "react";
// import { Button, Container, Card } from "react-bootstrap";
// import LeaseTakerNav from "./LeaseTakerNav";
// import { useNavigate } from "react-router-dom";

// const LeaseTakerHome = () => {
//   const [takerData, setTakerData] = useState(null);
//   const [hasLease, setHasLease] = useState(false);
//   const navigate = useNavigate();

//   // TEMP MOCK
//     useEffect(() => {
//     const mockData = {
//         name: "Dhruv",
//         currentLease: null // or {id: 1, title: "College Station Apt", location: "Texas", amount: 800, duration: 12}
//     };
//     setTakerData(mockData);
//     setHasLease(!!mockData.currentLease);
//     }, []);

//   useEffect(() => {
//     // Fetch taker info (mock API call)
//     const userId = localStorage.getItem("userId");
//     fetch(`/api/lease-taker/${userId}`)
//       .then(res => res.json())
//       .then(data => {
//         setTakerData(data);
//         setHasLease(!!data.currentLease);
//       })
//       .catch(err => console.error(err));
//   }, []);

//   const handleSearchClick = () => navigate("/available-leases");
//   const handleGiveUpLease = () => {
//     // API call to release lease
//     fetch(`/api/lease-taker/release/${takerData.currentLease.id}`, {
//       method: "POST",
//     })
//       .then(() => navigate("/available-leases"))
//       .catch(err => console.error(err));
//   };

//   if (!takerData) return <div>Loading...</div>;

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

//             <Card className="mx-auto my-3" style={{ maxWidth: "500px" }}>
//               <Card.Body>
//                 <Card.Title>{takerData.currentLease.title}</Card.Title>
//                 <Card.Text>
//                   <strong>Location:</strong> {takerData.currentLease.location}<br />
//                   <strong>Amount:</strong> ${takerData.currentLease.amount}<br />
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
import React, { useEffect, useState } from "react";
import { Button, Container, Card, Spinner } from "react-bootstrap";
import LeaseTakerNav from "./LeaseTakerNav";
import { useNavigate } from "react-router-dom";

const LeaseTakerHome = () => {
  const [takerData, setTakerData] = useState(null);
  const [hasLease, setHasLease] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTakerData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        console.log("Fetched userId:", userId);

        if (!userId) {
          setError("No user ID found. Please log in again.");
          setLoading(false);
          return;
        }

        const res = await fetch(`http://localhost:5000/api/lease-taker/${userId}`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Fetched taker data:", data);

        setTakerData(data);
        setHasLease(!!data?.currentLease);
      } catch (err) {
        console.error("Error fetching taker data:", err);
        setError("Failed to load your data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTakerData();
  }, []);

  const handleSearchClick = () => navigate("/available-leases");

  const handleGiveUpLease = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const leaseId = takerData?.currentLease?._id;

      if (!leaseId || !userId) {
        alert("Lease or user information missing!");
        return;
      }

      const res = await fetch(`http://localhost:5000/api/lease-taker/release/${leaseId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) throw new Error("Failed to release lease");

      alert("Lease released successfully!");
      navigate("/available-leases");
    } catch (err) {
      console.error("Error releasing lease:", err);
      alert("Something went wrong while releasing your lease.");
    }
  };

  // 🌀 Show loading spinner
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  // ❌ Show error message
  if (error) {
    return (
      <Container className="text-center mt-5">
        <h4 className="text-danger">{error}</h4>
        <Button variant="primary" onClick={() => navigate("/login")}>
          Go to Login
        </Button>
      </Container>
    );
  }

  // ✅ Render main content
  return (
    <>
      <LeaseTakerNav />
      <Container className="mt-5 text-center">
        {!hasLease ? (
          <>
            <h4>Welcome, {takerData.name}!</h4>
            <p>You don’t have any leases yet.</p>
            <Button variant="primary" onClick={handleSearchClick}>
              View Available Leases
            </Button>
          </>
        ) : (
          <>
            <h4>Welcome back, {takerData.name}!</h4>
            <p className="mt-3">
              You already have a lease to your name. Do you wish to give it up and search for a new one?
            </p>

            <Card className="mx-auto my-3 shadow" style={{ maxWidth: "500px" }}>
              <Card.Body>
                <Card.Title>{takerData.currentLease.title}</Card.Title>
                <Card.Text>
                  <strong>Location:</strong> {takerData.currentLease.location}
                  <br />
                  <strong>Amount:</strong> ${takerData.currentLease.amount}
                  <br />
                  <strong>Duration:</strong> {takerData.currentLease.duration} months
                </Card.Text>
              </Card.Body>
            </Card>

            <Button variant="danger" onClick={handleGiveUpLease}>
              Give Up and Search New Lease
            </Button>
          </>
        )}
      </Container>
    </>
  );
};

export default LeaseTakerHome;
