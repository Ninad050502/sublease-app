// import React, { useEffect, useState } from "react";
// import { Container, Card, Button } from "react-bootstrap";
// import GiverNav from "./GiverNav";

// const NotificationsPage = () => {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       const userId = localStorage.getItem("userId");
//       if (!userId) return;

//       const res = await fetch(`http://localhost:5000/api/giver/${userId}/notifications`);
//       const data = await res.json();
//       setNotifications(data);
//       console.log(notifications)

//       // Mark notifications read
//       await fetch(`http://localhost:5000/api/giver/${userId}/notifications/mark-read`, {
//         method: "POST"
//       });
//     };

//     fetchNotifications();
//   }, []);

//   return (
//     <>
//       <GiverNav />

//       <Container className="mt-4">
//         <h3>Your Notifications</h3>

//         {notifications.length === 0 && (
//           <p className="text-muted mt-3">No notifications yet.</p>
//         )}

//         {notifications.map((note, index) => (
//           <Card key={index} className="mt-3 shadow-sm">
//             <Card.Body>
//               <Card.Text>{note.message}</Card.Text>
//               <small className="text-muted">
//                 {new Date(note.createdAt).toLocaleString()}
//               </small>
//             </Card.Body>
//           </Card>
//         ))}
//       </Container>
//     </>
//   );
// };

// export default NotificationsPage;
// import React, { useEffect, useState } from "react";
// import { Container, Card } from "react-bootstrap";
// import GiverNav from "./GiverNav";

// const NotificationsPage = () => {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const userId = localStorage.getItem("userId");
//         if (!userId) return;

//         const res = await fetch(`http://localhost:5000/api/giver/${userId}/notifications`);
//         const data = await res.json();

//         console.log("Fetched Notifications:", data); // FIXED: correct logging
//         setNotifications(data);

//         // Mark as read AFTER loading
//         await fetch(`http://localhost:5000/api/giver/${userId}/notifications/mark-read`, {
//           method: "POST",
//         });
//       } catch (err) {
//         console.error("❌ Error loading notifications page:", err);
//       }
//     };

//     fetchNotifications();
//   }, []);

//   return (
//     <>
//       <GiverNav />

//       <Container className="mt-4">
//         <h3>Your Notifications</h3>

//         {notifications.length === 0 && (
//           <p className="text-muted mt-3">No notifications yet.</p>
//         )}

//         {notifications.map((note) => (
//           <Card key={note._id} className="mt-3 shadow-sm">
//             <Card.Body>
//               <Card.Text>{note.message}</Card.Text>
//               <small className="text-muted">
//                 {new Date(note.createdAt).toLocaleString()}
//               </small>
//             </Card.Body>
//           </Card>
//         ))}
//       </Container>
//     </>
//   );
// };

// export default NotificationsPage;
import React, { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import GiverNav from "./GiverNav";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const userId = sessionStorage.getItem("userId");
      if (!userId) return;

      const res = await fetch(`http://localhost:5000/api/giver/${userId}/notifications`);
      const data = await res.json();

      console.log("Fetched notifications:", data); // ✅ correct log
      setNotifications(data);

      // mark as read
      const markRes = await fetch(
        `http://localhost:5000/api/giver/${userId}/notifications/mark-read`,
        { method: "POST" }
      );
      console.log("Mark read status:", markRes.status);
    };

    fetchNotifications();
  }, []);

  return (
    <div style={{ background: "rgba(255, 255, 255, 0.95)", minHeight: "100vh" }}>
      <GiverNav />
      <Container className="py-5 fade-in" style={{ maxWidth: "900px" }}>
        <div className="mb-4">
          <h2 style={{ fontWeight: "700", color: "#333", marginBottom: "8px" }}>
            🔔 Notifications
          </h2>
          <p className="text-muted mb-0">
            See who's interested in your listings
          </p>
        </div>

        {notifications.length === 0 ? (
          <div className="text-center py-5">
            <div style={{ fontSize: "4rem", marginBottom: "20px" }}>📭</div>
            <h4 style={{ color: "#666", marginBottom: "12px" }}>No Notifications Yet</h4>
            <p className="text-muted">
              When someone shows interest in your listings, you'll see it here.
            </p>
          </div>
        ) : (
          <div>
            {notifications.map((note, index) => (
              <Card
                key={index}
                className="mb-3 shadow-sm"
                style={{
                  borderLeft: "4px solid #667eea",
                  transition: "all 0.3s ease",
                }}
              >
                <Card.Body className="p-4">
                  <div className="d-flex align-items-start">
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: "bold",
                        marginRight: "16px",
                        flexShrink: 0,
                      }}
                    >
                      👤
                    </div>
                    <div style={{ flexGrow: 1 }}>
                      <Card.Text
                        style={{
                          fontSize: "1.1rem",
                          color: "#333",
                          marginBottom: "8px",
                          fontWeight: "500",
                        }}
                      >
                        {note.message}
                      </Card.Text>
                      <small
                        className="text-muted"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <span>🕒</span>
                        {new Date(note.createdAt).toLocaleString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default NotificationsPage;
