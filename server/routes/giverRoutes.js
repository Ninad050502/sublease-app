import express from "express";
import multer from "multer";
import path from "path";
import Lease from "../models/Lease.js";
import User from "../models/User.js";

const router = express.Router();

/* ======================================================
   Multer Storage: Save photos to /uploads
====================================================== */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/* ======================================================
   CREATE NEW LISTING WITH MULTIPLE PHOTOS
   POST /api/giver/create
   NOTE: A giver can only have ONE listing at a time
====================================================== */
router.post("/create", upload.array("photos", 10), async (req, res) => {
  try {
    const { title, location, amount, duration, startDate, endDate, description, giverId } = req.body;

    if (!giverId) {
      return res.status(400).json({ message: "Missing giverId" });
    }

    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Start date and end date are required" });
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    if (start < today) {
      return res.status(400).json({ message: "Start date cannot be in the past" });
    }

    if (end <= start) {
      return res.status(400).json({ message: "End date must be after start date" });
    }

    // Check if giver already has a listing
    const existingLeases = await Lease.find({ giver: giverId });
    if (existingLeases.length > 0) {
      return res.status(400).json({ 
        success: false,
        message: "You already have an active listing. Please delete your existing listing before creating a new one." 
      });
    }

    const photoPaths =
      req.files?.map((file) => "/uploads/" + file.filename) || [];

    // Create lease
    const lease = new Lease({
      title,
      location,
      amount: Number(amount),
      duration: Number(duration),
      startDate: start,
      endDate: end,
      description,
      giver: giverId,
      photos: photoPaths,
    });

    await lease.save();

    // Push lease into giver listings
    await User.findByIdAndUpdate(giverId, {
      $push: { listings: lease._id },
    });

    res.status(201).json({ success: true, lease });
  } catch (err) {
    console.error("Error creating lease:", err);
    res.status(500).json({ message: "Error creating lease" });
  }
});

/* ======================================================
   GET ALL LISTINGS FOR A GIVER
   GET /api/giver/my-leases/:giverId
====================================================== */
router.get("/my-leases/:giverId", async (req, res) => {
  try {
    const leases = await Lease.find({ giver: req.params.giverId }).sort({
      createdAt: -1,
    });
    res.json(leases);
  } catch (err) {
    console.error("Error fetching leases:", err);
    res.status(500).json({ message: "Error fetching leases" });
  }
});

/* ======================================================
   DELETE A LEASE LISTING
   DELETE /api/giver/delete/:leaseId
====================================================== */
router.delete("/delete/:leaseId", async (req, res) => {
  try {
    const lease = await Lease.findById(req.params.leaseId);
    
    if (!lease) {
      return res.status(404).json({ message: "Lease not found" });
    }

    const giverId = lease.giver;

    // Remove lease from database
    await Lease.findByIdAndDelete(req.params.leaseId);

    // Remove lease from giver's listings array
    await User.findByIdAndUpdate(giverId, {
      $pull: { listings: req.params.leaseId },
    });

    res.json({ success: true, message: "Lease deleted successfully" });
  } catch (err) {
    console.error("Error deleting lease:", err);
    res.status(500).json({ message: "Error deleting lease" });
  }
});

/* ======================================================
   GET NOTIFICATIONS
   GET /api/giver/:giverId/notifications
====================================================== */
router.get("/:giverId/notifications", async (req, res) => {
  try {
    const giver = await User.findById(req.params.giverId);

    if (!giver) {
      return res.status(404).json({ message: "Giver not found" });
    }

    const sorted = [...giver.notifications].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    res.json(sorted);
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
});

/* ======================================================
   MARK ALL NOTIFICATIONS AS READ
   POST /api/giver/:giverId/notifications/mark-read
====================================================== */
router.post("/:giverId/notifications/mark-read", async (req, res) => {
  try {
    const giver = await User.findById(req.params.giverId);

    if (!giver) {
      return res.status(404).json({ message: "Giver not found" });
    }

    giver.notifications.forEach((n) => {
      n.isRead = true;
    });

    await giver.save();

    res.json({ success: true });
  } catch (err) {
    console.error("Error marking notifications read:", err);
    res.status(500).json({ message: "Failed to mark as read" });
  }
});

export default router;
