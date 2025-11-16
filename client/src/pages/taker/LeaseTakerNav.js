// import React from "react";
// import { Navbar, Container, Nav } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";

// const LeaseTakerNav = () => {
//   const navigate = useNavigate();

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
//             <Nav.Link as={Link} to="/taker">
//               Home
//             </Nav.Link>
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
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/taker" style={{ cursor: "pointer" }}>
          LeaseTaker Portal
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="taker-navbar" />
        <Navbar.Collapse id="taker-navbar">
          <Nav className="ms-auto">

            {/* Home Page */}
            <Nav.Link as={Link} to="/taker">
              Home
            </Nav.Link>

            {/* New: My Offers Page */}
            <Nav.Link as={Link} to="/taker-offers">
              My Offers
            </Nav.Link>

            {/* Logout */}
            <Nav.Link onClick={handleLogout} className="text-danger fw-semibold">
              Logout
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default LeaseTakerNav;
