import React, { useEffect, useState } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import LeaseCard from "./LeaseCard";

const AvailableLeases = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [leases, setLeases] = useState([]);

  const handleSearch = () => {
    fetch(`/api/leases?location=${searchTerm}`)
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a, b) => a.amount - b.amount);
        setLeases(sorted);
      })
      .catch(err => console.error(err));
  };

  return (
    <Container className="mt-5">
      <h3 className="text-center mb-4">Available Leases</h3>

      <Row className="justify-content-center mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search by location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md="auto">
          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
        </Col>
      </Row>

      <Row>
        {leases.map((lease) => (
          <Col md={4} key={lease.id}>
            <LeaseCard lease={lease} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AvailableLeases;
