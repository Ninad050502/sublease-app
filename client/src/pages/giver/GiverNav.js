// import React, { useEffect, useState } from "react";
// import { Navbar, Nav, Container } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";

// const GiverNav = () => {
//   const navigate = useNavigate();
//   const [unreadCount, setUnreadCount] = useState(0);

//   const loadNotifications = async () => {
//     try {
//       const userId = localStorage.getItem("userId");
//       if (!userId) return;

//       const res = await fetch(`http://localhost:5000/api/giver/${userId}/notifications`);
//       const data = await res.json();

//       const unread = data.filter((n) => !n.isRead).length;
//       setUnreadCount(unread);
//     } catch (err) {
//       console.error("❌ Error loading notifications:", err);
//     }
//   };

//   useEffect(() => {
//     loadNotifications();
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
//       <Container>
//         <Navbar.Brand as={Link} to="/giver">
//           Sublease Giver Portal
//         </Navbar.Brand>

//         <Navbar.Toggle aria-controls="giver-nav" />
//         <Navbar.Collapse id="giver-nav">
//           <Nav className="ms-auto">

//             {/* Home */}
//             <Nav.Link as={Link} to="/giver">Home</Nav.Link>

//             {/* Add Listing */}
//             <Nav.Link as={Link} to="/giver/form">
//               Add Listing
//             </Nav.Link>

//             {/* Notifications */}
//             <Nav.Link as={Link} to="/giver/notifications" className="position-relative">
//               {/* <i className="bi bi-bell-fill" style={{ fontSize: "1.4rem" }}></i>
//               {unreadCount > 0 && (
//                 <span
//                   className="position-absolute top-0 start-100 translate-middle bg-danger border border-light rounded-circle"
//                   style={{ width: "12px", height: "12px" }}
//                 ></span>
//               )} */}
//               Notifications
//               {unreadCount > 0 && (
//                 <span
//                   className="position-absolute top-0 start-100 translate-middle bg-danger border border-light rounded-circle"
//                   style={{ width: "12px", height: "12px" }}
//                 ></span>
//               )}
//             </Nav.Link>

//             {/* Logout */}
//             <Nav.Link onClick={handleLogout} className="text-danger fw-bold">
//               Logout
//             </Nav.Link>

//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default GiverNav;
// import React, { useEffect, useState } from "react";
// import { Navbar, Nav, Container } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";

// const GiverNav = () => {
//   const navigate = useNavigate();
//   const [unreadCount, setUnreadCount] = useState(0);

//   const loadNotifications = async () => {
//     try {
//       const userId = localStorage.getItem("userId");
//       if (!userId) return;

//       const res = await fetch(`http://localhost:5000/api/giver/${userId}/notifications`);
//       const data = await res.json();

//       const unread = data.filter((n) => !n.isRead).length;
//       setUnreadCount(unread);
//     } catch (err) {
//       console.error("❌ Error loading notifications:", err);
//     }
//   };

//   useEffect(() => {
//     loadNotifications();
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
//       <Container>
//         <Navbar.Brand as={Link} to="/giver">
//           Sublease Giver Portal
//         </Navbar.Brand>

//         <Navbar.Toggle aria-controls="giver-nav" />
//         <Navbar.Collapse id="giver-nav">
//           <Nav className="ms-auto">

//             <Nav.Link as={Link} to="/giver">Home</Nav.Link>

//             <Nav.Link as={Link} to="/giver/form">
//               Add Listing
//             </Nav.Link>

//             {/* FIXED: correct route + badge */}
//             <Nav.Link as={Link} to="/notifications" className="position-relative">
//               Notifications
//               {unreadCount > 0 && (
//                 <span
//                   className="position-absolute top-0 start-100 translate-middle bg-danger rounded-circle"
//                   style={{ width: "12px", height: "12px" }}
//                 ></span>
//               )}
//             </Nav.Link>

//             <Nav.Link onClick={handleLogout} className="text-danger fw-bold">
//               Logout
//             </Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default GiverNav;
import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";

const GiverNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [unreadCount, setUnreadCount] = useState(0);
  const [hasListing, setHasListing] = useState(false);

  const loadNotifications = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const res = await fetch(`http://localhost:5000/api/giver/${userId}/notifications`);
      const data = await res.json();

      const unread = data.filter((n) => !n.isRead).length;
      setUnreadCount(unread);
    } catch (err) {
      console.error("❌ Error loading notifications:", err);
    }
  };

  const checkListingStatus = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const res = await fetch(`http://localhost:5000/api/giver/my-leases/${userId}`);
      const data = await res.json();
      setHasListing(data.length > 0);
    } catch (err) {
      console.error("❌ Error checking listing status:", err);
    }
  };

  // Load notifications and check listing status on mount + whenever route changes
  useEffect(() => {
    loadNotifications();
    checkListingStatus();
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.clear();
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
          to="/giver"
          style={{
            fontWeight: "700",
            fontSize: "1.5rem",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textDecoration: "none",
          }}
        >
          🏠 Sublease Portal
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="giver-nav" />
        <Navbar.Collapse id="giver-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link
              as={Link}
              to="/giver"
              style={{
                color: location.pathname === "/giver" ? "#667eea" : "#333",
                fontWeight: location.pathname === "/giver" ? "600" : "400",
                textDecoration: "none",
              }}
            >
              My Listings
            </Nav.Link>

            {!hasListing && (
              <Nav.Link
                as={Link}
                to="/giver/form"
                style={{
                  color: location.pathname === "/giver/form" ? "#667eea" : "#333",
                  fontWeight: location.pathname === "/giver/form" ? "600" : "400",
                  textDecoration: "none",
                }}
              >
                ➕ Add Listing
              </Nav.Link>
            )}

            <Nav.Link
              as={Link}
              to="/giver/notifications"
              className="position-relative"
              style={{
                color: location.pathname === "/giver/notifications" ? "#667eea" : "#333",
                fontWeight: location.pathname === "/giver/notifications" ? "600" : "400",
                textDecoration: "none",
              }}
            >
              🔔 Notifications
              {unreadCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{
                    fontSize: "0.7rem",
                    padding: "2px 6px",
                    minWidth: "18px",
                  }}
                >
                  {unreadCount}
                </span>
              )}
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

export default GiverNav;
