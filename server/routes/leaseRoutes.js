// // import express from "express";
// // import Lease from "../models/Lease.js";

// // const router = express.Router();

// // /**
// //  * ✅ GET /api/leases
// //  * Returns all available leases, optionally filtered by location (case-insensitive)
// //  * Sorted by amount (lowest → highest)
// //  *
// //  * Example calls:
// //  *   /api/leases
// //  *   /api/leases?location=Texas
// //  */
// // router.get("/", async (req, res) => {
// //   try {
// //     const { location } = req.query;

// //     // Build query
// //     const query = { isAvailable: true };
// //     if (location) {
// //       query.location = { $regex: location, $options: "i" }; // case-insensitive search
// //     }

// //     console.log("📥 [GET] /api/leases — query:", query);

// //     // Sort by lowest rent
// //     const leases = await Lease.find(query).sort({ amount: 1 });

// //     if (!leases || leases.length === 0) {
// //       console.log("ℹ️ No matching leases found");
// //       return res.status(200).json([]);
// //     }

// //     res.status(200).json(leases);
// //   } catch (error) {
// //     console.error("🔥 Error fetching leases:", error);
// //     res.status(500).json({
// //       message: "Error fetching leases",
// //       error: error.message,
// //     });
// //   }
// // });

// // export default router;
// import express from "express";
// import Lease from "../models/Lease.js";
// import User from "../models/User.js";

// const router = express.Router();

// // ✅ Taker makes an offer for a lease
// router.post("/offer/:leaseId", async (req, res) => {
//   try {
//     const { leaseId } = req.params;
//     const { userId } = req.body;

//     const lease = await Lease.findById(leaseId);
//     if (!lease || !lease.isAvailable)
//       return res.status(400).json({ message: "Lease not available" });

//     // check if taker already offered
//     const existingOffer = lease.offers.find(
//       (o) => o.taker.toString() === userId
//     );
//     if (existingOffer)
//       return res.status(400).json({ message: "You have already made an offer for this lease." });

//     lease.offers.push({ taker: userId });
//     await lease.save();

//     res.json({ message: "Offer submitted successfully!" });
//   } catch (err) {
//     console.error("Error creating offer:", err);
//     res.status(500).json({ message: "Server error while submitting offer" });
//   }
// });

// export default router;
// import express from "express";
// import Lease from "../models/Lease.js";

// const router = express.Router();

// /* ========================================================
//    ✅ GET /api/leases
//    - Optional ?location= query filter
//    - Returns only available leases
// ======================================================== */
// router.get("/", async (req, res) => {
//   try {
//     const { location } = req.query;

//     const query = { isAvailable: true };
//     if (location && location.trim() !== "") {
//       // Case-insensitive partial match
//       query.location = { $regex: location, $options: "i" };
//     }

//     console.log("📡 Lease search query:", query);

//     const leases = await Lease.find(query).sort({ amount: 1 });

//     console.log(`✅ Found ${leases.length} leases`);
//     res.json(leases);
//   } catch (err) {
//     console.error("🔥 Error fetching leases:", err);
//     res.status(500).json({ message: "Error fetching leases" });
//   }
// });

// export default router;

import express from "express";
import Lease from "../models/Lease.js";

const router = express.Router();

/* ========================================================
   ✅ GET  /api/leases
   Optional ?location= query
======================================================== */
router.get("/", async (req, res) => {
  try {
    const { location } = req.query;
    const query = { isAvailable: true };
    if (location && location.trim() !== "") {
      query.location = { $regex: location, $options: "i" };
    }

    console.log("📡 Searching leases with query:", query);
    const leases = await Lease.find(query).sort({ amount: 1 });
    res.json(leases);
  } catch (err) {
    console.error("🔥 Error fetching leases:", err);
    res.status(500).json({ message: "Error fetching leases" });
  }
});

/* ========================================================
   ✅ POST /api/leases/offer/:leaseId
   ->  Taker makes an offer for a lease
======================================================== */
router.post("/offer/:leaseId", async (req, res) => {
  try {
    const { leaseId } = req.params;
    const { userId } = req.body;

    console.log("📨 Offer request for lease:", leaseId, "from taker:", userId);

    // --- Basic validation ---
    if (!userId) {
      return res.status(400).json({ message: "Missing taker userId" });
    }

    const lease = await Lease.findById(leaseId);
    if (!lease) {
      return res.status(404).json({ message: "Lease not found" });
    }
    if (!lease.isAvailable) {
      return res.status(400).json({ message: "Lease is not available" });
    }

    // --- Prevent duplicate offers from same taker ---
    const alreadyOffered = lease.offers.some(
      (o) => o.taker.toString() === userId
    );
    if (alreadyOffered) {
      return res.status(400).json({
        message: "You have already made an offer for this lease.",
      });
    }

    // --- Add new offer ---
    lease.offers.push({
      taker: userId,
      message: req.body.message || "",
      status: "pending",
    });

    await lease.save();
    console.log("✅ Offer saved successfully for lease:", leaseId);

    res.json({ message: "Offer submitted successfully!" });
  } catch (err) {
    console.error("🔥 Error creating offer:", err);
    res.status(500).json({ message: "Server error while submitting offer" });
  }
});

export default router;
