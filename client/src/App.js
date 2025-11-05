// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import GiverHome from "./pages/giver/GiverHome";
// import GiverForm from "./pages/giver/GiverForm";
// import GiverOffers from "./pages/giver/GiverOffers";
// import TakerHome from "./pages/taker/LeaseTakerHome";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Public routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* GIVER ROUTES */}
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
//           path="/giver/offers"
//           element={
//             <ProtectedRoute allowedRoles={["giver"]}>
//               <GiverOffers />
//             </ProtectedRoute>
//           }
//         />

//         {/* TAKER ROUTES */}
//         <Route
//           path="/taker"
//           element={
//             <ProtectedRoute allowedRoles={["taker"]}>
//               <TakerHome />
//             </ProtectedRoute>
//           }
//         />

//         {/* Fallback */}
//         <Route path="*" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GiverHome from "./pages/giver/GiverHome";
import GiverForm from "./pages/giver/GiverForm";
import GiverOffers from "./pages/giver/GiverOffers";
import TakerHome from "./pages/taker/LeaseTakerHome";
import AvailableLeases from "./pages/taker/AvailableLeases";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* GIVER routes */}
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
          path="/giver/offers"
          element={
            <ProtectedRoute allowedRoles={["giver"]}>
              <GiverOffers />
            </ProtectedRoute>
          }
        />

        {/* TAKER routes */}
        <Route
          path="/taker"
          element={
            <ProtectedRoute allowedRoles={["taker"]}>
              <TakerHome />
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

        {/* Fallback */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
