const express = require("express");
const router = express.Router();
const Lease = require("../models/Lease");

// Create a new lease
router.post("/create", async (req, res) => {
  try {
    const { title, location, amount, duration, description, giverId } = req.body;

    const lease = new Lease({
      title,
      location,
      amount,
      duration,
      description,
      giver: giverId,
    });

    await lease.save();
    res.status(201).json({ message: "Lease created successfully", lease });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating lease" });
  }
});

// Get leases created by giver
router.get("/:giverId/leases", async (req, res) => {
  try {
    const leases = await Lease.find({ giver: req.params.giverId });
    res.json(leases);
  } catch (error) {
    res.status(500).json({ message: "Error fetching giver leases" });
  }
});

module.exports = router;
