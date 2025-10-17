// // src/pages/giver/GiverNav.js
// import React from "react";
// import { useNavigate } from "react-router-dom";

// const GiverNav = () => {
//   const navigate = useNavigate();

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light rounded shadow-sm">
//       <div className="container-fluid">
//         <a className="navbar-brand fw-bold">Sublease Portal</a>
//         <div>
//           <button className="btn btn-outline-primary me-2" onClick={() => navigate("/giver/home")}>
//             Home
//           </button>
//           <button className="btn btn-outline-primary me-2" onClick={() => navigate("/giver/form")}>
//             Sublease Form
//           </button>
//           <button className="btn btn-outline-primary me-2" onClick={() => navigate("/giver/offers")}>
//             Offers
//           </button>
//           <button
//             className="btn btn-danger"
//             onClick={() => navigate("/login")}
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default GiverNav;
// src/pages/giver/GiverNav.js
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
            <Nav.Link onClick={() => navigate("/giver/home")}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate("/giver/form")}>Edit Form</Nav.Link>
          </>
        );
      case "partial":
        return (
          <>
            <Nav.Link onClick={() => navigate("/giver/home")}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate("/giver/form")}>Complete Form</Nav.Link>
          </>
        );
      case "offers":
        return (
          <>
            <Nav.Link onClick={() => navigate("/giver/home")}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate("/giver/offers")}>Offers</Nav.Link>
          </>
        );
      default:
        return <Nav.Link onClick={() => navigate("/giver/home")}>Home</Nav.Link>;
    }
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="shadow-sm">
      <Container>
        <Navbar.Brand
          className="fw-bold text-info"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/giver/home")}
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
