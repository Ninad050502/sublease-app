import express from "express";
import mongoose from "mongoose";
import Lease from "../models/Lease.js";
import User from "../models/User.js";

const router = express.Router();

/* ========================================================
   ✅ 0. Create or Update a Lease (from Giver Form)
======================================================== */
router.post("/create", async (req, res) => {
  try {
    const { title, location, amount, duration, description, giverId } = req.body;

    if (!giverId) {
      return res.status(400).json({ message: "Missing giverId" });
    }

    console.log("🧾 Creating/updating lease for giver:", giverId);

    let lease = await Lease.findOne({ giver: giverId });

    if (lease) {
      lease.title = title;
      lease.location = location;
      lease.amount = amount;
      lease.duration = duration;
      lease.description = description;
      await lease.save();

      console.log("✏️ Updated existing lease for giver:", giverId);
      return res.json({ message: "Lease updated successfully", lease });
    }

    lease = new Lease({
      title,
      location,
      amount,
      duration,
      description,
      giver: giverId,
    });
    await lease.save();

    console.log("✅ Created new lease for giver:", giverId);
    res.status(201).json({ message: "Lease created successfully", lease });
  } catch (err) {
    console.error("🔥 Error creating/updating lease:", err);
    res.status(500).json({ message: "Error creating lease" });
  }
});

/* ========================================================
   ✅ 1. Get Giver Status
======================================================== */
router.get("/:giverId/status", async (req, res) => {
  try {
    const { giverId } = req.params;
    console.log("📡 Fetching status for giver:", giverId);

    const leases = await Lease.find({ giver: giverId });

    if (!leases || leases.length === 0) {
      return res.json({ status: "partial" });
    }

    const hasOffers = leases.some((l) => l.offers && l.offers.length > 0);
    if (hasOffers) return res.json({ status: "offers" });

    return res.json({ status: "complete" });
  } catch (err) {
    console.error("🔥 Error fetching giver status:", err);
    res.status(500).json({ message: "Error fetching giver status" });
  }
});

/* ========================================================
   ✅ 2. Get All Offers for a Giver’s Leases
======================================================== */
router.get("/:giverId/offers", async (req, res) => {
  try {
    const { giverId } = req.params;

    const leases = await Lease.find({ giver: giverId })
      .populate("offers.taker", "email role")
      .exec();

    const offers = leases.flatMap((lease) =>
      lease.offers.map((offer) => ({
        _id: offer._id,
        leaseId: lease._id,
        leaseTitle: lease.title,
        taker: offer.taker,
        status: offer.status,
        message: offer.message || "",
        createdAt: offer.createdAt,
      }))
    );

    res.json(offers);
  } catch (err) {
    console.error("🔥 Error fetching offers:", err);
    res.status(500).json({ message: "Error fetching offers" });
  }
});

/* ========================================================
   ✅ 3. Accept Offer
======================================================== */
router.post("/offer/:leaseId/accept/:offerId", async (req, res) => {
  try {
    const { leaseId, offerId } = req.params;
    console.log(`📩 Accepting offer ${offerId} for lease ${leaseId}`);

    const lease = await Lease.findById(leaseId);
    if (!lease) return res.status(404).json({ message: "Lease not found" });

    let acceptedTakerId = null;

    lease.offers.forEach((offer) => {
      if (offer._id.toString() === offerId) {
        offer.status = "accepted";
        acceptedTakerId = offer.taker;
        lease.taker = offer.taker;
        lease.isAvailable = false;
      } else {
        offer.status = "rejected";
      }
    });

    await lease.save();

    if (acceptedTakerId) {
      const objectId = new mongoose.Types.ObjectId(acceptedTakerId);
      const updateResult = await User.updateOne(
        { _id: objectId },
        { $set: { currentLease: leaseId } }
      );

      if (updateResult.modifiedCount === 1) {
        console.log(`✅ Updated taker ${acceptedTakerId} with lease ${leaseId}`);
      } else {
        console.warn(`⚠️ No user updated for taker ${acceptedTakerId}`);
      }

      // Reconfirm write success
      const taker = await User.findById(objectId);
      console.log("🔍 Taker currentLease after update:", taker.currentLease);
    }

    res.json({ message: "Offer accepted successfully!" });
  } catch (err) {
    console.error("🔥 Error accepting offer:", err);
    res.status(500).json({ message: "Error accepting offer" });
  }

  // Reject all other offers by this taker across other leases
  await Lease.updateMany(
    { "offers.taker": acceptedTakerId, _id: { $ne: leaseId } },
    { $set: { "offers.$[elem].status": "rejected" } },
    { arrayFilters: [{ "elem.taker": acceptedTakerId }] }
  );
  console.log(`🚫 Rejected all other offers from taker ${acceptedTakerId}`);

});

/* ========================================================
   ✅ 4. Reject Offer
======================================================== */
router.post("/offer/:leaseId/reject/:offerId", async (req, res) => {
  try {
    const { leaseId, offerId } = req.params;

    const lease = await Lease.findById(leaseId);
    if (!lease) return res.status(404).json({ message: "Lease not found" });

    const offer = lease.offers.id(offerId);
    if (!offer) return res.status(404).json({ message: "Offer not found" });

    offer.status = "rejected";
    await lease.save();

    res.json({ message: "Offer rejected successfully." });
  } catch (err) {
    console.error("🔥 Error rejecting offer:", err);
    res.status(500).json({ message: "Error rejecting offer" });
  }
});

export default router;
