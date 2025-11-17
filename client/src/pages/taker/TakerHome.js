import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LeaseTakerNav from "./LeaseTakerNav";

const TakerHome = () => {
  const navigate = useNavigate();

  return (
    <>
      <LeaseTakerNav />
      <Container className="mt-5 text-center">
        <h3>Welcome to the Sublease Platform</h3>
        <p className="mt-3">
          Browse available sublease listings and contact givers directly.
        </p>
        <Button variant="primary" onClick={() => navigate("/available-leases")}>
          View Available Leases
        </Button>
      </Container>
    </>
  );
};

export default TakerHome;
