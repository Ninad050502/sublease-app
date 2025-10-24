// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import LeaseTakerHome from "./pages/taker/LeaseTakerHome";
// import AvailableLeases from "./pages/taker/AvailableLeases";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import GiverHome from "./pages/giver/GiverHome";
// import GiverForm from "./pages/giver/GiverForm";
// import GiverOffers from "./pages/giver/GiverOffers";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/giver/home" element={<GiverHome />} />
//         <Route path="/giver/form" element={<GiverForm />} />
//         <Route path="/giver/offers" element={<GiverOffers />} />
//         <Route path="*" element={<Navigate to="/login" />} />
//         <Route path="/taker/home" element={<LeaseTakerHome />} />
//         <Route path="/available-leases" element={<AvailableLeases />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GiverHome from "./pages/giver/GiverHome";
import TakerHome from "./pages/taker/LeaseTakerHome";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/giver"
          element={
            <ProtectedRoute allowedRoles={["giver"]}>
              <GiverHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/taker"
          element={
            <ProtectedRoute allowedRoles={["taker"]}>
              <TakerHome />
            </ProtectedRoute>
          }
        />

        {/* Optional: redirect root to login */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
