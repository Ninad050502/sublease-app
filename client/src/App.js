// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import GiverHome from "./pages/giver/GiverHome";
// import GiverForm from "./pages/giver/GiverForm";
// // import TakerHome from "./pages/taker/TakerHome";
// import AvailableLeases from "./pages/taker/AvailableLeases";
// import ProtectedRoute from "./components/ProtectedRoute";
// import NotificationsPage from "./pages/giver/NotificationsPage";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Public */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* Giver routes */}
//         <Route
//           path="/giver"
//           element={
//             <ProtectedRoute allowedRoles={["giver"]}>
//               <GiverHome />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/giver/form"
//           element={
//             <ProtectedRoute allowedRoles={["giver"]}>
//               <GiverForm />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/notifications"
//           element={
//             <ProtectedRoute allowedRoles={["giver"]}>
//               <NotificationsPage />
//             </ProtectedRoute>
//           }
//         />
//         {/* Taker routes */}
//         <Route
//           path="/taker"
//           element={
//             <ProtectedRoute allowedRoles={["taker"]}>
//               <TakerHome />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/available-leases"
//           element={
//             <ProtectedRoute allowedRoles={["taker"]}>
//               <AvailableLeases />
//             </ProtectedRoute>
//           }
//         />

//         {/* Default → login */}
//         <Route path="*" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";

// Giver pages
import GiverHome from "./pages/giver/GiverHome";
import GiverForm from "./pages/giver/GiverForm";
import NotificationsPage from "./pages/giver/NotificationsPage";

// Taker pages
import LeaseTakerHome from "./pages/taker/LeaseTakerHome";
import AvailableLeases from "./pages/taker/AvailableLeases";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* GIVER ROUTES */}
        <Route
          path="/giver"
          element={
            <ProtectedRoute allowedRoles={["giver"]}>
              <GiverHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/giver/form"
          element={
            <ProtectedRoute allowedRoles={["giver"]}>
              <GiverForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/giver/notifications"
          element={
            <ProtectedRoute allowedRoles={["giver"]}>
              <NotificationsPage />
            </ProtectedRoute>
          }
        />

        {/* TAKER ROUTES */}
        <Route
          path="/taker"
          element={
            <ProtectedRoute allowedRoles={["taker"]}>
              <LeaseTakerHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/available-leases"
          element={
            <ProtectedRoute allowedRoles={["taker"]}>
              <AvailableLeases />
            </ProtectedRoute>
          }
        />

        {/* DEFAULT → Redirect to Login */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
