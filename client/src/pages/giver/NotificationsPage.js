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
      const userId = localStorage.getItem("userId");
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
    <>
      <GiverNav />
      <Container className="mt-4">
        <h3>Your Notifications</h3>

        {notifications.length === 0 && (
          <p className="text-muted mt-3">No notifications yet.</p>
        )}

        {notifications.map((note, index) => (
          <Card key={index} className="mt-3 shadow-sm">
            <Card.Body>
              <Card.Text>{note.message}</Card.Text>
              <small className="text-muted">
                {new Date(note.createdAt).toLocaleString()}
              </small>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default NotificationsPage;
