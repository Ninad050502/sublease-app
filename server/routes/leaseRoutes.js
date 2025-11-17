import express from "express";
import Lease from "../models/Lease.js";

const router = express.Router();

/* ========================================================
   GET /api/leases
   Optional query params:
   - location (string)
   - sort: "cheapest" | "newest"
======================================================== */
router.get("/", async (req, res) => {
  try {
    const { location, sort } = req.query;

    const query = {};
    if (location && location.trim() !== "") {
      query.location = { $regex: location, $options: "i" };
    }

    let sortOption = {};
    if (sort === "newest") {
      sortOption = { createdAt: -1 };
    } else {
      // default: cheapest first, then oldest first
      sortOption = { amount: 1, createdAt: 1 };
    }

    const leases = await Lease.find(query).sort(sortOption);
    res.json(leases);
  } catch (err) {
    console.error("🔥 Error fetching leases:", err);
    res.status(500).json({ message: "Error fetching leases" });
  }
});

/* Get single lease by ID (useful if needed later) */
router.get("/:id", async (req, res) => {
  try {
    const lease = await Lease.findById(req.params.id).populate("giver", "email");
    if (!lease) return res.status(404).json({ message: "Lease not found" });
    res.json(lease);
  } catch (err) {
    console.error("🔥 Error fetching lease:", err);
    res.status(500).json({ message: "Error fetching lease" });
  }
});

router.post("/contact/:leaseId", async (req, res) => {
  try {
    const { takerId, takerEmail } = req.body;

    if (!takerId || !takerEmail) {
      return res.status(400).json({ message: "Missing taker information" });
    }

    const lease = await Lease.findById(req.params.leaseId).populate("giver");

    if (!lease) return res.status(404).json({ message: "Lease not found" });

    // Add notification
    lease.giver.notifications.push({
      message: `${takerEmail} is interested in your listing "${lease.title}".`,
    });

    await lease.giver.save();

    res.json({ success: true, message: "Notification sent to giver!" });
  } catch (err) {
    console.error("❌ Error sending notification:", err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
