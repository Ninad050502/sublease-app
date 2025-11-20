import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";

const LeaseTakerNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <Navbar
      expand="lg"
      className="shadow-sm"
      style={{
        background: "rgba(255, 255, 255, 0.98)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/taker"
          style={{
            fontWeight: "700",
            fontSize: "1.5rem",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textDecoration: "none",
          }}
        >
          🔍 Sublease Finder
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="taker-navbar" />
        <Navbar.Collapse id="taker-navbar">
          <Nav className="ms-auto align-items-center">
            <Nav.Link
              as={Link}
              to="/taker"
              style={{
                color: location.pathname === "/taker" ? "#667eea" : "#333",
                fontWeight: location.pathname === "/taker" ? "600" : "400",
                textDecoration: "none",
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/available-leases"
              style={{
                color: location.pathname === "/available-leases" ? "#667eea" : "#333",
                fontWeight: location.pathname === "/available-leases" ? "600" : "400",
                textDecoration: "none",
              }}
            >
              🔎 Browse Listings
            </Nav.Link>
            <Nav.Link
              onClick={handleLogout}
              style={{
                color: "#dc3545",
                fontWeight: "600",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default LeaseTakerNav;
