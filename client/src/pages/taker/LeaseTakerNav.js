// // import React from "react";
// // import { Navbar, Container, Nav } from "react-bootstrap";
// // import { Link } from "react-router-dom";

// // const LeaseTakerNav = () => {
// //   return (
// //     <Navbar bg="dark" variant="dark" expand="lg">
// //       <Container>
// //         <Navbar.Brand as={Link} to="/taker-home">LeaseTaker Portal</Navbar.Brand>
// //         <Navbar.Toggle aria-controls="basic-navbar-nav" />
// //         <Navbar.Collapse id="basic-navbar-nav">
// //           <Nav className="ms-auto">
// //             <Nav.Link as={Link} to="/taker-home">Home</Nav.Link>
// //             <Nav.Link as={Link} to="/available-leases">Available Leases</Nav.Link>
// //             <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
// //           </Nav>
// //         </Navbar.Collapse>
// //       </Container>
// //     </Navbar>
// //   );
// // };

// // export default LeaseTakerNav;
// import React, { useEffect, useState } from "react";
// import { Navbar, Container, Nav } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";

// const LeaseTakerNav = () => {
//   const navigate = useNavigate();
//   const [hasLease, setHasLease] = useState(false);

//   useEffect(() => {
//     // Check stored info about current lease
//     const leaseInfo = localStorage.getItem("hasLease");
//     setHasLease(leaseInfo === "true");
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <Navbar bg="dark" variant="dark" expand="lg">
//       <Container>
//         <Navbar.Brand as={Link} to="/taker">
//           LeaseTaker Portal
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto">
//             <Nav.Link as={Link} to="/taker">Home</Nav.Link>
//             {/* ✅ Only show when taker has no lease */}
//             {!hasLease && (
//               <Nav.Link as={Link} to="/available-leases">Available Leases</Nav.Link>
//             )}
//             <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default LeaseTakerNav;
import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const LeaseTakerNav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/taker">
          LeaseTaker Portal
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/taker">
              Home
            </Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default LeaseTakerNav;
