// // import React from "react";
// // import { Navigate } from "react-router-dom";

// // const ProtectedRoute = ({ allowedRoles, children }) => {
// //   const role = localStorage.getItem("role");
// //   const token = localStorage.getItem("token");

// //   if (!token || !allowedRoles.includes(role)) {
// //     console.warn("Unauthorized access → redirecting to login");
// //     return <Navigate to="/login" replace />;
// //   }

// //   return children;
// // };

// // export default ProtectedRoute;
// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ allowedRoles, children }) => {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   if (!token || !role) {
//     return <Navigate to="/login" replace />;
//   }

//   if (allowedRoles && !allowedRoles.includes(role)) {
//     // Redirect to the right home based on role
//     return <Navigate to={role === "giver" ? "/giver" : "/taker"} replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;

import React from "react";
import { Navigate, useParams } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { username } = useParams();
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");
  const currentUsername = sessionStorage.getItem("username");

  // Still loading sessionStorage
  if (token === null || role === null) {
    return null; // Prevent early redirect
  }

  if (!token || !role) {
    return <Navigate to="/login" replace />;
  }

  // Verify the username in URL matches logged-in user
  if (username && username !== currentUsername) {
    // Redirect to correct user's route
    if (role === "giver") {
      return <Navigate to={`/${currentUsername}/listings`} replace />;
    } else {
      return <Navigate to={`/${currentUsername}/browse`} replace />;
    }
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Redirect to correct user's route based on role
    if (role === "giver") {
      return <Navigate to={`/${currentUsername}/listings`} replace />;
    } else {
      return <Navigate to={`/${currentUsername}/browse`} replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
