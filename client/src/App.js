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
