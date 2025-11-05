import React, { useEffect, useState } from "react";
import GiverNav from "./GiverNav";
import { Spinner } from "react-bootstrap";

const GiverOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const res = await fetch(`http://localhost:5000/api/giver/${userId}/offers`);
        const data = await res.json();
        if (res.ok) setOffers(data.offers || []);
        else setError(data.message || "Failed to fetch offers");
      } catch (err) {
        console.error("Error fetching offers:", err);
        setError("Something went wrong while loading offers.");
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-danger mt-5">
        <h5>{error}</h5>
      </div>
    );

  return (
    <div className="container py-4">
      <GiverNav status="offers" />
      <h3 className="mt-4 mb-3 text-center">Your Sublease Offers</h3>
      {offers.length > 0 ? (
        <div className="row justify-content-center">
          {offers.map((offer, index) => (
            <div key={index} className="col-md-6 mb-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{offer.taker?.email || "Anonymous"}</h5>
                  <p className="card-text mb-1">💰 <strong>${offer.amount}</strong></p>
                  <p className="text-muted">{offer.message}</p>
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-success me-2">Accept</button>
                    <button className="btn btn-outline-danger">Reject</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted mt-4">No offers yet. Check back later!</p>
      )}
    </div>
  );
};

export default GiverOffers;
