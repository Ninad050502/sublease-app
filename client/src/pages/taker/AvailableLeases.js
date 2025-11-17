import React, { useState } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import LeaseCard from "./LeaseCard";
import LeaseTakerNav from "./LeaseTakerNav";

const AvailableLeases = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("cheapest");
  const [leases, setLeases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();
      if (searchTerm) params.append("location", searchTerm);
      if (sort) params.append("sort", sort);

      const res = await fetch(`/api/leases?${params.toString()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch leases");

      setLeases(data);
    } catch (err) {
      console.error("Error fetching leases:", err);
      setError("Something went wrong while fetching leases.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LeaseTakerNav />
      <Container className="mt-5">
        <h3 className="text-center mb-4">Available Leases</h3>

        <Row className="justify-content-center mb-3">
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Search by location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Form.Select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="cheapest">Cheapest first</option>
              <option value="newest">Newest first</option>
            </Form.Select>
          </Col>
          <Col md="auto">
            <Button variant="primary" onClick={handleSearch} disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </Col>
        </Row>

        {error && <p className="text-danger text-center">{error}</p>}

        <Row>
          {leases.map((lease) => (
            <Col md={4} key={lease._id} className="mb-3">
              <LeaseCard lease={lease} />
            </Col>
          ))}
          {leases.length === 0 && !loading && (
            <p className="text-center text-muted mt-3">No leases found.</p>
          )}
        </Row>
      </Container>
    </>
  );
};

export default AvailableLeases;
