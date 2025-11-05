import express from "express";
import Lease from "../models/Lease.js";
import Offer from "../models/Offer.js";

const router = express.Router();

/**
 * ✅ 1. Get Giver Dashboard Status
 * Determines whether the giver is in: 'partial', 'complete', or 'offers' mode
 */
router.get("/:giverId/status", async (req, res) => {
  try {
    const { giverId } = req.params;
    console.log("📥 [GET] /api/giver/status for:", giverId);

    // Find lease created by this giver
    const lease = await Lease.findOne({ giver: giverId }).populate("offers");

    // No lease found yet → partial (not completed)
    if (!lease) {
      return res.json({ status: "partial", lease: null });
    }

    // Lease has offers → 'offers' mode
    if (lease.offers && lease.offers.length > 0) {
      return res.json({ status: "offers", lease });
    }

    // Lease completed but no offers → 'complete'
    if (lease.isComplete) {
      return res.json({ status: "complete", lease });
    }

    // Lease exists but incomplete → 'partial'
    return res.json({ status: "partial", lease });
  } catch (error) {
    console.error("🔥 Error fetching giver status:", error);
    res.status(500).json({ message: "Error fetching giver status", error: error.message });
  }
});

/**
 * ✅ 2. Create or Update Lease Form
 * Called from GiverForm.js when giver submits or edits form
 */
router.post("/:giverId/form", async (req, res) => {
  try {
    const { giverId } = req.params;
    const { title, location, amount, duration, description, isComplete } = req.body;

    console.log("📝 [POST] /api/giver/form for:", giverId);

    let lease = await Lease.findOne({ giver: giverId });

    if (!lease) {
      lease = new Lease({ giver: giverId });
    }

    // Update or create new details
    lease.title = title;
    lease.location = location;
    lease.amount = amount;
    lease.duration = duration;
    lease.description = description;
    lease.isComplete = isComplete ?? true;
    lease.isAvailable = true;

    await lease.save();

    res.json({ message: "Lease saved successfully", lease });
  } catch (error) {
    console.error("🔥 Error saving lease form:", error);
    res.status(500).json({ message: "Error saving lease form", error: error.message });
  }
});

/**
 * ✅ 3. Fetch All Offers for Giver
 * Called from GiverOffers.js page
 */
router.get("/:giverId/offers", async (req, res) => {
  try {
    const { giverId } = req.params;
    console.log("📥 [GET] /api/giver/offers for:", giverId);

    const lease = await Lease.findOne({ giver: giverId }).populate({
      path: "offers",
      populate: { path: "taker", select: "email role" },
    });

    if (!lease) {
      return res.status(404).json({ message: "Lease not found for this giver" });
    }

    res.json({ offers: lease.offers });
  } catch (error) {
    console.error("🔥 Error fetching offers:", error);
    res.status(500).json({ message: "Error fetching offers", error: error.message });
  }
});

/**
 * ✅ 4. (Keep your existing endpoints)
 * Create a new lease directly (legacy use)
 */
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
      isComplete: true,
      isAvailable: true,
    });

    await lease.save();
    res.status(201).json({ message: "Lease created successfully", lease });
  } catch (error) {
    console.error("🔥 Error creating lease:", error);
    res.status(500).json({ message: "Error creating lease", error: error.message });
  }
});

/**
 * ✅ 5. Get all leases by this giver (legacy use)
 */
router.get("/:giverId/leases", async (req, res) => {
  try {
    const leases = await Lease.find({ giver: req.params.giverId });
    res.json(leases);
  } catch (error) {
    console.error("🔥 Error fetching giver leases:", error);
    res.status(500).json({ message: "Error fetching giver leases", error: error.message });
  }
});

export default router;
