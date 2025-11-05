// import React, { useState } from "react";
// import { Form, Container, Row, Col, Button } from "react-bootstrap";
// import LeaseCard from "./LeaseCard";
// import LeaseTakerNav from "./LeaseTakerNav";

// const AvailableLeases = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [leases, setLeases] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSearch = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const res = await fetch(`/api/leases?location=${encodeURIComponent(searchTerm)}`);
//       if (!res.ok) throw new Error("Failed to fetch leases");
//       const data = await res.json();
//       const sorted = data.sort((a, b) => a.amount - b.amount);
//       setLeases(sorted);
//     } catch (err) {
//       console.error("Error fetching leases:", err);
//       setError("Something went wrong while fetching leases.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* ✅ Add Navbar */}
//       <LeaseTakerNav />

//       <Container className="mt-5">
//         <h3 className="text-center mb-4">Available Leases</h3>

//         <Row className="justify-content-center mb-3">
//           <Col md={6}>
//             <Form.Control
//               type="text"
//               placeholder="Search by location..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </Col>
//           <Col md="auto">
//             <Button variant="primary" onClick={handleSearch} disabled={loading}>
//               {loading ? "Searching..." : "Search"}
//             </Button>
//           </Col>
//         </Row>

//         {error && <p className="text-danger text-center">{error}</p>}

//         <Row>
//           {leases.map((lease) => (
//             <Col md={4} key={lease._id}>
//               <LeaseCard lease={lease} />
//             </Col>
//           ))}
//           {leases.length === 0 && !loading && (
//             <p className="text-center text-muted mt-3">No leases found. Try another location.</p>
//           )}
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default AvailableLeases;
import React, { useState } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import LeaseCard from "./LeaseCard";
import LeaseTakerNav from "./LeaseTakerNav";

const AvailableLeases = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [leases, setLeases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`/api/leases?location=${encodeURIComponent(searchTerm)}`);
      if (!res.ok) throw new Error("Failed to fetch leases");
      const data = await res.json();
      const sorted = data.sort((a, b) => a.amount - b.amount);
      setLeases(sorted);
    } catch (err) {
      console.error("Error fetching leases:", err);
      setError("Something went wrong while fetching leases.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ Navbar at top */}
      <LeaseTakerNav />

      <Container className="mt-5">
        <h3 className="text-center mb-4">Available Leases</h3>

        <Row className="justify-content-center mb-3">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Search by location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md="auto">
            <Button variant="primary" onClick={handleSearch} disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </Col>
        </Row>

        {error && <p className="text-danger text-center">{error}</p>}

        <Row>
          {leases.map((lease) => (
            <Col md={4} key={lease._id}>
              <LeaseCard lease={lease} />
            </Col>
          ))}
          {leases.length === 0 && !loading && (
            <p className="text-center text-muted mt-3">No leases found. Try another location.</p>
          )}
        </Row>
      </Container>
    </>
  );
};

export default AvailableLeases;
