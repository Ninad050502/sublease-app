// src/pages/giver/GiverOffers.js
import React from "react";
import GiverNav from "./GiverNav";

const GiverOffers = () => {
  const offers = [
    { name: "John Doe", amount: 1200, message: "Can move in next week!" },
    { name: "Jane Smith", amount: 1150, message: "Looking for 4 months stay." },
  ];

  return (
    <div className="container py-4">
      <GiverNav />
      <h3 className="mt-4 mb-3 text-center">Your Sublease Offers</h3>

      {offers.length > 0 ? (
        <div className="row justify-content-center">
          {offers.map((offer, index) => (
            <div key={index} className="col-md-6 mb-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{offer.name}</h5>
                  <p className="card-text mb-1">
                    💰 <strong>${offer.amount}</strong>
                  </p>
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
