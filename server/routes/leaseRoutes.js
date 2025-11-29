import express from "express";
import Lease from "../models/Lease.js";

const router = express.Router();

/* ========================================================
   GET /api/leases/random
   Returns a random sample of leases (up to 12)
======================================================== */
router.get("/random", async (req, res) => {
  try {
    // Get a random sample of leases (up to 12)
    const sampleSize = 12;
    const totalLeases = await Lease.countDocuments();
    
    if (totalLeases === 0) {
      return res.json([]);
    }

    // Get random leases using aggregation
    const randomLeases = await Lease.aggregate([
      { $sample: { size: Math.min(sampleSize, totalLeases) } }
    ]);

    // Sort by price (cheapest first) for consistency
    randomLeases.sort((a, b) => {
      if (a.amount !== b.amount) return a.amount - b.amount;
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    res.json(randomLeases);
  } catch (err) {
    console.error("🔥 Error fetching random leases:", err);
    res.status(500).json({ message: "Error fetching random leases" });
  }
});

/* ========================================================
   GET /api/leases
   Optional query params:
   - location (string)
   - startDate (ISO date string)
   - endDate (ISO date string)
   - sort: "cheapest" | "newest"
   
   Logic:
   1. If dates provided, find exact matches (overlapping dates) first
   2. If no exact matches or location provided, show area matches sorted by price
   3. Return both exact matches and area matches with search info
======================================================== */
router.get("/", async (req, res) => {
  try {
    const { location, startDate, endDate, sort } = req.query;

    let exactMatches = [];
    let areaMatches = [];
    let searchInfo = null;

    // If dates are provided, try to find exact matches first
    if (startDate && endDate) {
      const searchStart = new Date(startDate);
      const searchEnd = new Date(endDate);

      // Build query for exact date matches (overlapping dates)
      const exactQuery = {
        startDate: { $lte: searchEnd },
        endDate: { $gte: searchStart }
      };

      // Add location filter if provided
      if (location && location.trim() !== "") {
        exactQuery.location = { $regex: location, $options: "i" };
      }

      // Find exact matches (dates overlap)
      exactMatches = await Lease.find(exactQuery);

      // If location provided, also find area matches (same location, different dates)
      if (location && location.trim() !== "") {
        const areaQuery = {
          location: { $regex: location, $options: "i" },
          _id: { $nin: exactMatches.map(l => l._id) } // Exclude exact matches
        };
        areaMatches = await Lease.find(areaQuery);
      }

      searchInfo = {
        exactMatches: exactMatches.length,
        areaMatches: areaMatches.length,
        hasExactMatches: exactMatches.length > 0
      };
    } else {
      // No dates provided, just search by location
      const query = {};
      if (location && location.trim() !== "") {
        query.location = { $regex: location, $options: "i" };
      }
      areaMatches = await Lease.find(query);
      searchInfo = {
        exactMatches: 0,
        areaMatches: areaMatches.length,
        hasExactMatches: false
      };
    }

    // Combine results: exact matches first, then area matches
    let allLeases = [...exactMatches, ...areaMatches];

    // Sort the combined results
    let sortOption = {};
    if (sort === "newest") {
      sortOption = { createdAt: -1 };
    } else {
      // default: cheapest first, then oldest first
      sortOption = { amount: 1, createdAt: 1 };
    }

    // Sort exact matches and area matches separately, then combine
    exactMatches.sort((a, b) => {
      if (sort === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        if (a.amount !== b.amount) return a.amount - b.amount;
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

    areaMatches.sort((a, b) => {
      if (sort === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        if (a.amount !== b.amount) return a.amount - b.amount;
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

    allLeases = [...exactMatches, ...areaMatches];

    // If no location or dates, return all leases sorted
    if (!location && !startDate && !endDate) {
      allLeases = await Lease.find({}).sort(sortOption);
      searchInfo = {
        exactMatches: 0,
        areaMatches: allLeases.length,
        hasExactMatches: false
      };
    }

    res.json({
      leases: allLeases,
      searchInfo: searchInfo || {
        exactMatches: 0,
        areaMatches: allLeases.length,
        hasExactMatches: false
      }
    });
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
    const { takerEmail, takerId } = req.body;

    if (!takerEmail || !takerId) {
      return res.status(400).json({ message: "Missing taker information" });
    }

    const lease = await Lease.findById(req.params.leaseId).populate("giver");
    if (!lease) return res.status(404).json({ message: "Lease not found" });

    const giver = lease.giver;

    // Check EXACT duplicate (safer)
    const alreadyExists = giver.notifications.some(
      (note) =>
        note.message.includes(takerEmail) &&
        note.message.includes(`"${lease.title}"`)
    );

    if (alreadyExists) {
      return res.json({
        alreadySent: true,
        message: "Notification already sent earlier",
      });
    }

    // Create notification
    giver.notifications.push({
      message: `${takerEmail} is interested in your listing "${lease.title}".`,
      takerId
    });

    await giver.save();

    return res.json({ success: true, message: "Notification sent to giver!" });
  } catch (err) {
    console.error("❌ Error sending notification:", err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
