const express = require("express");
const router = express.Router();
const Lease = require("../models/Lease");

// Get available leases, optionally filtered by location
router.get("/", async (req, res) => {
  try {
    const { location } = req.query;
    const query = { isAvailable: true };
    if (location) {
      query.location = new RegExp(location, "i");
    }

    const leases = await Lease.find(query).sort({ amount: 1 });
    res.json(leases);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leases" });
  }
});

module.exports = router;
