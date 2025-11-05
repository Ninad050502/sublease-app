// const express = require("express");
// const router = express.Router();
// const Lease = require("../models/Lease");

// // Get available leases, optionally filtered by location
// router.get("/", async (req, res) => {
//   try {
//     const { location } = req.query;
//     const query = { isAvailable: true };
//     if (location) {
//       query.location = new RegExp(location, "i");
//     }

//     const leases = await Lease.find(query).sort({ amount: 1 });
//     res.json(leases);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching leases" });
//   }
// });

// module.exports = router;
import express from "express";
import Lease from "../models/Lease.js";

const router = express.Router();

/**
 * ✅ GET /api/leases
 * Returns all available leases, optionally filtered by location (case-insensitive)
 * Sorted by amount (lowest → highest)
 *
 * Example calls:
 *   /api/leases
 *   /api/leases?location=Texas
 */
router.get("/", async (req, res) => {
  try {
    const { location } = req.query;

    // Build query
    const query = { isAvailable: true };
    if (location) {
      query.location = { $regex: location, $options: "i" }; // case-insensitive search
    }

    console.log("📥 [GET] /api/leases — query:", query);

    // Sort by lowest rent
    const leases = await Lease.find(query).sort({ amount: 1 });

    if (!leases || leases.length === 0) {
      console.log("ℹ️ No matching leases found");
      return res.status(200).json([]);
    }

    res.status(200).json(leases);
  } catch (error) {
    console.error("🔥 Error fetching leases:", error);
    res.status(500).json({
      message: "Error fetching leases",
      error: error.message,
    });
  }
});

export default router;
