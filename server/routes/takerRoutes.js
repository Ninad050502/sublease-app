import express from "express";
import User from "../models/User.js";
import Lease from "../models/Lease.js";

const router = express.Router();

/* ========================================================
   ✅ 1. Get Taker Data (Home page)
======================================================== */
router.get("/:takerId", async (req, res) => {
  try {
    const { takerId } = req.params;
    console.log("📡 Fetching taker data for:", takerId);

    // Populate currentLease fully
    const taker = await User.findById(takerId).populate("currentLease");

    if (!taker) {
      console.log("❌ No taker found");
      return res.status(404).json({ message: "Taker not found" });
    }

    res.status(200).json({
      _id: taker._id,
      name: taker.email.split("@")[0],
      role: taker.role,
      currentLease: taker.currentLease || null,
    });
  } catch (err) {
    console.error("🔥 Error fetching taker data:", err);
    res.status(500).json({ message: "Error fetching taker data" });
  }
});

/* ========================================================
   ✅ 2. Taker chooses a lease (sends offer)
======================================================== */
router.post("/select/:leaseId", async (req, res) => {
  try {
    const { leaseId } = req.params;
    const { userId } = req.body;

    console.log(`📩 Taker ${userId} is sending offer for lease ${leaseId}`);

    const lease = await Lease.findById(leaseId);
    if (!lease) return res.status(404).json({ message: "Lease not found" });

    // Prevent duplicate offers
    const existingOffer = lease.offers.find(
      (offer) => offer.taker.toString() === userId
    );
    if (existingOffer)
      return res.status(400).json({ message: "You have already sent an offer" });

    lease.offers.push({ taker: userId, status: "pending" });
    await lease.save();

    console.log("✅ Offer created successfully");
    res.status(200).json({ message: "Offer sent successfully!" });
  } catch (err) {
    console.error("🔥 Error sending offer:", err);
    res.status(500).json({ message: "Error sending offer" });
  }
});

/* ========================================================
   ✅ 3. Give up an active lease
======================================================== */
router.post("/release/:leaseId", async (req, res) => {
  try {
    const { leaseId } = req.params;
    const { userId } = req.body;

    console.log(`🔄 Taker ${userId} releasing lease ${leaseId}`);

    const user = await User.findById(userId);
    const lease = await Lease.findById(leaseId);

    if (!user || !lease)
      return res.status(404).json({ message: "User or Lease not found" });

    // Make lease available again
    lease.isAvailable = true;
    lease.taker = null;
    await lease.save();

    // Remove reference from taker
    user.currentLease = null;
    await user.save();

    console.log("✅ Lease released successfully");
    res.json({ message: "Lease released successfully" });
  } catch (err) {
    console.error("🔥 Error releasing lease:", err);
    res.status(500).json({ message: "Error releasing lease" });
  }
});

/* ========================================================
   ✅ 4. Get all offers made by this taker
   - Useful for "My Offers" page
======================================================== */
router.get("/:takerId/offers", async (req, res) => {
  try {
    const { takerId } = req.params;
    console.log(`📡 Fetching all offers for taker ${takerId}`);

    // Find all leases that include this taker in offers
    const leases = await Lease.find({ "offers.taker": takerId })
      .populate("giver", "email role")
      .exec();

    // Extract offers belonging to this taker
    const offers = leases.flatMap((lease) =>
      lease.offers
        .filter((offer) => offer.taker.toString() === takerId)
        .map((offer) => ({
          leaseId: lease._id,
          leaseTitle: lease.title,
          location: lease.location,
          amount: lease.amount,
          duration: lease.duration,
          giverEmail: lease.giver?.email || "Unknown",
          status: offer.status,
          message: offer.message || "",
          createdAt: offer.createdAt,
        }))
    );

    res.json(offers);
  } catch (err) {
    console.error("🔥 Error fetching taker offers:", err);
    res.status(500).json({ message: "Error fetching taker offers" });
  }
});


export default router;
