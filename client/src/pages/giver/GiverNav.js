import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const GiverNav = ({ status }) => {
  const navigate = useNavigate();

  const renderLinks = () => {
    switch (status) {
      case "complete":
        return (
          <>
            <Nav.Link onClick={() => navigate("/giver")}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate("/giver/form")}>Edit Form</Nav.Link>
          </>
        );
      case "partial":
        return (
          <>
            <Nav.Link onClick={() => navigate("/giver")}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate("/giver/form")}>Complete Form</Nav.Link>
          </>
        );
      case "offers":
        return (
          <>
            <Nav.Link onClick={() => navigate("/giver")}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate("/giver/offers")}>Offers</Nav.Link>
          </>
        );
      default:
        return <Nav.Link onClick={() => navigate("/giver")}>Home</Nav.Link>;
    }
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="shadow-sm">
      <Container>
        <Navbar.Brand
          className="fw-bold text-info"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/giver")}
        >
          Sublease Portal
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto align-items-center">
            {renderLinks()}
            <Nav.Link onClick={() => navigate("/login")} className="text-danger fw-semibold">
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default GiverNav;
