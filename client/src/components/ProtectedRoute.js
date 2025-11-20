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
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Still loading localStorage
  if (token === null || role === null) {
    return null; // Prevent early redirect
  }

  if (!token || !role) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={role === "giver" ? "/giver" : "/taker"} replace />;
  }

  return children;
};

export default ProtectedRoute;
