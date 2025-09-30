import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import GiverHome from "./pages/giver/GiverHome";
// import GiverForm from "./pages/giver/GiverForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/giver" element={<GiverHome />} />
        {/* <Route path="/giver/form" element={<GiverForm />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
