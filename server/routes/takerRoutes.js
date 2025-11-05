// // const express = require("express");
// // const router = express.Router();
// // const User = require("../models/User");
// // const Lease = require("../models/Lease");

// // // Get taker details and current lease
// // router.get("/:userId", async (req, res) => {
// //   try {
// //     const user = await User.findById(req.params.userId).populate("currentLease");
// //     res.json(user);
// //   } catch (error) {
// //     res.status(500).json({ message: "Error fetching taker details" });
// //   }
// // });

// // // Taker selects a lease
// // router.post("/select/:leaseId", async (req, res) => {
// //   try {
// //     const { userId } = req.body;
// //     const lease = await Lease.findById(req.params.leaseId);
// //     if (!lease || !lease.isAvailable) {
// //       return res.status(400).json({ message: "Lease not available" });
// //     }

// //     // Assign lease
// //     lease.isAvailable = false;
// //     lease.takenBy = userId;
// //     await lease.save();

// //     // Update user
// //     await User.findByIdAndUpdate(userId, { currentLease: lease._id });

// //     res.json({ message: "Lease successfully taken", lease });
// //   } catch (error) {
// //     res.status(500).json({ message: "Error selecting lease" });
// //   }
// // });

// // // Taker releases a lease
// // router.post("/release/:leaseId", async (req, res) => {
// //   try {
// //     const { userId } = req.body;

// //     // Mark lease as available again
// //     await Lease.findByIdAndUpdate(req.params.leaseId, {
// //       isAvailable: true,
// //       takenBy: null,
// //     });

// //     // Remove currentLease from user
// //     await User.findByIdAndUpdate(userId, { currentLease: null });

// //     res.json({ message: "Lease released successfully" });
// //   } catch (error) {
// //     res.status(500).json({ message: "Error releasing lease" });
// //   }
// // });

// // module.exports = router;
// import express from "express";
// import User from "../models/User.js";
// import Lease from "../models/Lease.js";

// const router = express.Router();

// /**
//  * GET /api/lease-taker/:userId
//  * Fetch taker info and their current lease
//  */
// router.get("/:userId", async (req, res) => {
//   const { userId } = req.params;
//   console.log("📥 [GET] /api/lease-taker/", userId);

//   try {
//     // Basic sanity check
//     if (!userId || userId === "undefined") {
//       console.warn("⚠️ Invalid or missing userId parameter");
//       return res.status(400).json({ message: "Invalid user ID" });
//     }

//     // Attempt to fetch user
//     const user = await User.findById(userId).populate("currentLease");

//     if (!user) {
//       console.warn(`❌ No user found with ID: ${userId}`);
//       return res.status(404).json({ message: "User not found" });
//     }

//     console.log("✅ User found:", {
//       _id: user._id.toString(),
//       email: user.email,
//       role: user.role,
//       hasLease: !!user.currentLease,
//     });

//     // Log lease info if available
//     if (user.currentLease) {
//       console.log("🏠 Current lease:", {
//         leaseId: user.currentLease._id.toString(),
//         location: user.currentLease.location,
//         amount: user.currentLease.amount,
//       });
//     } else {
//       console.log("ℹ️ No current lease assigned to this user.");
//     }

//     // Respond to frontend
//     res.json(user);
//   } catch (err) {
//     console.error("🔥 Error fetching taker details:", err.message);
//     console.error(err.stack);
//     res.status(500).json({ message: err.message });
//   }
// });

// export default router;
import express from "express";
import User from "../models/User.js";
import Lease from "../models/Lease.js";

const router = express.Router();

/**
 * ✅ 1. Get taker details + current lease
 */
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("📥 [GET] /api/lease-taker/", userId);

    const user = await User.findById(userId).populate("currentLease");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      name: user.email.split("@")[0], // simple display name
      currentLease: user.currentLease,
    });
  } catch (error) {
    console.error("🔥 Error fetching taker data:", error);
    res.status(500).json({ message: "Error fetching taker data", error: error.message });
  }
});

/**
 * ✅ 2. Select a lease (taker chooses one)
 */
router.post("/select/:leaseId", async (req, res) => {
  try {
    const { leaseId } = req.params;
    const { userId } = req.body;

    console.log("🏠 [POST] taker selects lease:", leaseId, "by user:", userId);

    const user = await User.findById(userId);
    const lease = await Lease.findById(leaseId);

    if (!user || !lease)
      return res.status(404).json({ message: "User or lease not found" });

    if (user.currentLease)
      return res.status(400).json({ message: "You already have a lease." });

    if (!lease.isAvailable)
      return res.status(400).json({ message: "Lease not available." });

    // Assign lease to taker
    lease.takenBy = user._id;
    lease.isAvailable = false;
    user.currentLease = lease._id;

    await lease.save();
    await user.save();

    res.json({ message: "Lease claimed successfully", lease });
  } catch (error) {
    console.error("🔥 Error selecting lease:", error);
    res.status(500).json({ message: "Error selecting lease", error: error.message });
  }
});

/**
 * ✅ 3. Release (give up) a lease
 */
router.post("/release/:leaseId", async (req, res) => {
  try {
    const { leaseId } = req.params;
    const { userId } = req.body;

    console.log("🗑️ [POST] taker releases lease:", leaseId, "by user:", userId);

    const user = await User.findById(userId);
    const lease = await Lease.findById(leaseId);

    if (!user || !lease)
      return res.status(404).json({ message: "User or lease not found" });

    if (String(user.currentLease) !== String(lease._id))
      return res.status(400).json({ message: "This lease isn’t assigned to you" });

    // Unlink lease and user
    lease.takenBy = null;
    lease.isAvailable = true;
    await lease.save();

    user.currentLease = null;
    await user.save();

    res.json({ message: "Lease released successfully" });
  } catch (error) {
    console.error("🔥 Error releasing lease:", error);
    res.status(500).json({ message: "Error releasing lease", error: error.message });
  }
});

export default router;
