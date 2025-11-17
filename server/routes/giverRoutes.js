import express from "express";
import Lease from "../models/Lease.js";
import User from "../models/User.js";

const router = express.Router();

/* -----------------------------------------------------
   1) CREATE NEW LISTING
----------------------------------------------------- */
router.post("/create", async (req, res) => {
  try {
    const { title, location, amount, duration, description, giverId } = req.body;

    if (!giverId) {
      return res.status(400).json({ message: "Missing giverId" });
    }

    // 1) Create Lease
    const lease = await Lease.create({
      title,
      location,
      amount,
      duration,
      description,
      giver: giverId,
    });

    console.log("✅ Lease created:", lease._id);

    // 2) Add lease reference to User.listings
    await User.findByIdAndUpdate(giverId, {
      $push: { listings: lease._id },
    });

    res.status(201).json({
      message: "Lease created successfully",
      lease,
    });

  } catch (err) {
    console.error("🔥 Error creating lease:", err);
    res.status(500).json({ message: "Error creating lease" });
  }
});

/* -----------------------------------------------------
   2) UPDATE LISTING
----------------------------------------------------- */
router.put("/update/:leaseId", async (req, res) => {
  try {
    const { leaseId } = req.params;
    const updateFields = req.body;

    const lease = await Lease.findByIdAndUpdate(leaseId, updateFields, { new: true });

    if (!lease) return res.status(404).json({ message: "Lease not found" });

    res.json({ message: "Lease updated successfully", lease });
  } catch (err) {
    console.error("🔥 Error updating lease:", err);
    res.status(500).json({ message: "Error updating lease" });
  }
});

/* -----------------------------------------------------
   3) DELETE LISTING
----------------------------------------------------- */
router.delete("/delete/:leaseId", async (req, res) => {
  try {
    const { leaseId } = req.params;

    const lease = await Lease.findByIdAndDelete(leaseId);
    if (!lease) return res.status(404).json({ message: "Lease not found" });

    // Remove from giver listings
    await User.findByIdAndUpdate(lease.giver, {
      $pull: { listings: leaseId },
    });

    res.json({ message: "Lease deleted successfully" });
  } catch (err) {
    console.error("🔥 Error deleting lease:", err);
    res.status(500).json({ message: "Error deleting lease" });
  }
});

/* -----------------------------------------------------
   4) GET GIVER'S LISTINGS
----------------------------------------------------- */
router.get("/my-leases/:giverId", async (req, res) => {
  try {
    const leases = await Lease.find({ giver: req.params.giverId })
      .sort({ createdAt: -1 });

    res.json(leases);
  } catch (err) {
    console.error("🔥 Error fetching leases:", err);
    res.status(500).json({ message: "Error fetching leases" });
  }
});

/* -----------------------------------------------------
   5) NOTIFICATIONS
----------------------------------------------------- */
// Get notifications
router.get("/:giverId/notifications", async (req, res) => {
  try {
    const giver = await User.findById(req.params.giverId);
    if (!giver) return res.status(404).json({ message: "Giver not found" });

    const sorted = giver.notifications.sort((a, b) => b.createdAt - a.createdAt);
    res.json(sorted);
  } catch (err) {
    console.error("🔥 Error fetching notifications:", err);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
});

// Mark notifications as read
router.post("/:giverId/notifications/mark-read", async (req, res) => {
  try {
    const giver = await User.findById(req.params.giverId);
    if (!giver) return res.status(404).json({ message: "Giver not found" });

    giver.notifications.forEach((n) => (n.isRead = true));
    await giver.save();

    res.json({ success: true });
  } catch (err) {
    console.error("🔥 Error marking notifications:", err);
    res.status(500).json({ message: "Failed to mark notifications read" });
  }
});

export default router;
