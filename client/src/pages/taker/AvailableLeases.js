import React, { useState, useEffect } from "react";
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

      const res = await fetch(`http://localhost:5000/api/leases?${params.toString()}`);
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

  // Auto-search on mount
  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ background: "rgba(255, 255, 255, 0.95)", minHeight: "100vh" }}>
      <LeaseTakerNav />
      <Container className="py-5 fade-in">
        <div className="text-center mb-5">
          <h2 style={{ fontWeight: "700", color: "#333", marginBottom: "8px" }}>
            🔍 Find Your Perfect Sublease
          </h2>
          <p className="text-muted">Browse available listings and connect with givers</p>
        </div>

        <div className="card shadow-sm mb-4" style={{ background: "rgba(255, 255, 255, 0.8)" }}>
          <div className="card-body p-4">
            <Row className="g-3 align-items-end">
              <Col md={5}>
                <label className="form-label fw-semibold" style={{ color: "#333" }}>
                  Search by Location
                </label>
                <Form.Control
                  type="text"
                  placeholder="e.g., College Station, TX"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </Col>
              <Col md={4}>
                <label className="form-label fw-semibold" style={{ color: "#333" }}>
                  Sort By
                </label>
                <Form.Select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="cheapest">💰 Cheapest First</option>
                  <option value="newest">🆕 Newest First</option>
                </Form.Select>
              </Col>
              <Col md={3}>
                <Button
                  variant="primary"
                  onClick={handleSearch}
                  disabled={loading}
                  className="w-100"
                  style={{ fontWeight: "600" }}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Searching...
                    </>
                  ) : (
                    "🔎 Search"
                  )}
                </Button>
              </Col>
            </Row>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {loading && leases.length === 0 ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Searching for listings...</p>
          </div>
        ) : leases.length === 0 ? (
          <div className="text-center py-5">
            <div style={{ fontSize: "4rem", marginBottom: "20px" }}>🏠</div>
            <h4 style={{ color: "#666", marginBottom: "12px" }}>No Listings Found</h4>
            <p className="text-muted">Try adjusting your search criteria or check back later.</p>
          </div>
        ) : (
          <>
            <div className="mb-3">
              <p className="text-muted">
                Found <strong>{leases.length}</strong> {leases.length === 1 ? "listing" : "listings"}
              </p>
            </div>
            <Row>
              {leases.map((lease) => (
                <Col md={4} key={lease._id} className="mb-4">
                  <LeaseCard lease={lease} />
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default AvailableLeases;
