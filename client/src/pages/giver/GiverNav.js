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

  const loadNotifications = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const res = await fetch(`http://localhost:5000/api/giver/${userId}/notifications`);
      const data = await res.json();

      const unread = data.filter((n) => !n.isRead).length;
      setUnreadCount(unread);

      console.log("Unread notifications:", unread);
    } catch (err) {
      console.error("❌ Error loading notifications:", err);
    }
  };

  // Load notifications on mount + whenever route changes (so unread badge updates)
  useEffect(() => {
    loadNotifications();
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/giver">
          Sublease Giver Portal
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="giver-nav" />
        <Navbar.Collapse id="giver-nav">
          <Nav className="ms-auto">

            {/* Home */}
            <Nav.Link as={Link} to="/giver">Home</Nav.Link>

            {/* Add Listing */}
            <Nav.Link as={Link} to="/giver/form">
              Add Listing
            </Nav.Link>

            {/* Notifications */}
            <Nav.Link as={Link} to="/giver/notifications" className="position-relative">
              Notifications
              {unreadCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle bg-danger border border-light rounded-circle"
                  style={{ width: "12px", height: "12px" }}
                ></span>
              )}
            </Nav.Link>

            {/* Logout */}
            <Nav.Link onClick={handleLogout} className="text-danger fw-bold">
              Logout
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default GiverNav;
