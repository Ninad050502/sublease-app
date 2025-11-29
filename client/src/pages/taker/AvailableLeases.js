import React, { useState, useEffect } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import LeaseCard from "./LeaseCard";
import LeaseTakerNav from "./LeaseTakerNav";

const AvailableLeases = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sort, setSort] = useState("cheapest");
  const [leases, setLeases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchInfo, setSearchInfo] = useState(null);
  const [isSearchMode, setIsSearchMode] = useState(false);

  // Load random sample leases on initial page load
  const loadRandomLeases = async () => {
    try {
      setLoading(true);
      setError("");
      setIsSearchMode(false);

      const res = await fetch(`http://localhost:5000/api/leases/random`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch leases");

      setLeases(Array.isArray(data) ? data : data.leases || []);
      setSearchInfo(null);
    } catch (err) {
      console.error("Error fetching random leases:", err);
      setError("Something went wrong while loading listings.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError("");

      // Validate dates if provided
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (end <= start) {
          alert("End date must be after start date");
          setLoading(false);
          return;
        }
      }

      const params = new URLSearchParams();
      if (searchTerm) params.append("location", searchTerm);
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);
      if (sort) params.append("sort", sort);

      const res = await fetch(`http://localhost:5000/api/leases?${params.toString()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch leases");

      // Handle both new format (with searchInfo) and old format (just array)
      if (Array.isArray(data)) {
        setLeases(data);
        setSearchInfo(null);
      } else {
        setLeases(data.leases || []);
        setSearchInfo(data.searchInfo || null);
      }
      setIsSearchMode(true); // Mark that user has performed a search
    } catch (err) {
      console.error("Error fetching leases:", err);
      setError("Something went wrong while fetching leases.");
    } finally {
      setLoading(false);
    }
  };

  // Load random sample leases on mount
  useEffect(() => {
    loadRandomLeases();
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

        <div className="card shadow-sm mb-4 search-card" style={{ background: "rgba(255, 255, 255, 0.8)" }}>
          <div className="card-body p-4">
            <Row className="g-3">
              <Col md={12}>
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
            </Row>
            <Row className="g-3 mt-2">
              <Col md={4}>
                <label className="form-label fw-semibold" style={{ color: "#333" }}>
                  Desired Start Date
                </label>
                <Form.Control
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
                <small className="text-muted">Optional - when you need the sublease</small>
              </Col>
              <Col md={4}>
                <label className="form-label fw-semibold" style={{ color: "#333" }}>
                  Desired End Date
                </label>
                <Form.Control
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate || new Date().toISOString().split('T')[0]}
                />
                <small className="text-muted">Optional - when you'll move out</small>
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
            </Row>
            <Row className="mt-3">
              <Col>
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
                    "🔎 Search Listings"
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
              {isSearchMode ? (
                <>
                  <p className="text-muted">
                    Found <strong>{leases.length}</strong> {leases.length === 1 ? "listing" : "listings"}
                  </p>
                  {searchInfo && (
                    <div className="alert alert-info" role="alert" style={{ marginTop: "12px" }}>
                      {searchInfo.exactMatches > 0 ? (
                        <span>
                          ✅ <strong>{searchInfo.exactMatches}</strong> exact date match{searchInfo.exactMatches === 1 ? "" : "es"} found
                          {searchInfo.areaMatches > 0 && (
                            <span>, plus <strong>{searchInfo.areaMatches}</strong> listing{searchInfo.areaMatches === 1 ? "" : "s"} in the area</span>
                          )}
                        </span>
                      ) : (
                        <span>
                          ℹ️ No exact date matches found. Showing <strong>{searchInfo.areaMatches}</strong> listing{searchInfo.areaMatches === 1 ? "" : "s"} in the area sorted by price.
                        </span>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <p className="text-muted">
                  Showing <strong>{leases.length}</strong> sample {leases.length === 1 ? "listing" : "listings"}. Use the search above to find specific listings.
                </p>
              )}
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
