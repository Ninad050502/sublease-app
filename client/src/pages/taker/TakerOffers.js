import React, { useEffect, useState } from "react";
import { Container, Table, Spinner } from "react-bootstrap";
import LeaseTakerNav from "./LeaseTakerNav";

const TakerOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const res = await fetch(`/api/lease-taker/${userId}/offers`);
        const data = await res.json();
        setOffers(data);
      } catch (err) {
        console.error("Error fetching taker offers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );

  return (
    <>
      <LeaseTakerNav />
      <Container className="mt-5">
        <h3 className="text-center mb-4">My Lease Offers</h3>
        {offers.length === 0 ? (
          <p className="text-center text-muted">You haven’t made any offers yet.</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Lease Title</th>
                <th>Location</th>
                <th>Amount</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Giver</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer, idx) => (
                <tr key={idx}>
                  <td>{offer.leaseTitle}</td>
                  <td>{offer.location}</td>
                  <td>${offer.amount}</td>
                  <td>{offer.duration} months</td>
                  <td>
                    {offer.status === "pending" && (
                      <span className="text-warning fw-semibold">Pending</span>
                    )}
                    {offer.status === "accepted" && (
                      <span className="text-success fw-semibold">Accepted</span>
                    )}
                    {offer.status === "rejected" && (
                      <span className="text-danger fw-semibold">Rejected</span>
                    )}
                  </td>
                  <td>{offer.giverEmail}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
};

export default TakerOffers;
