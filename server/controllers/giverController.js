// server/controllers/giverController.js
import Lease from "../models/Lease.js";
import Offer from "../models/Offer.js";

/** Fetch giver dashboard status */
export const getGiverStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    const lease = await Lease.findOne({ giver: userId }).populate("offers");

    if (!lease) {
      return res.json({ status: "partial", lease: null });
    }

    if (lease.offers.length > 0) {
      return res.json({ status: "offers", lease });
    }

    if (lease.isComplete) {
      return res.json({ status: "complete", lease });
    }

    return res.json({ status: "partial", lease });
  } catch (err) {
    console.error("🔥 Error fetching giver status:", err);
    res.status(500).json({ message: err.message });
  }
};

/** Create or update the giver’s lease form */
export const upsertLeaseForm = async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, location, amount, duration, description, isComplete } = req.body;

    let lease = await Lease.findOne({ giver: userId });

    if (!lease) {
      lease = new Lease({ giver: userId });
    }

    lease.title = title;
    lease.location = location;
    lease.amount = amount;
    lease.duration = duration;
    lease.description = description;
    lease.isComplete = isComplete;
    lease.isAvailable = isComplete;

    await lease.save();

    res.json({ message: "Lease saved successfully", lease });
  } catch (err) {
    console.error("🔥 Error saving lease:", err);
    res.status(500).json({ message: err.message });
  }
};

/** Fetch all offers on giver’s lease */
export const getGiverOffers = async (req, res) => {
  try {
    const { userId } = req.params;
    const lease = await Lease.findOne({ giver: userId }).populate({
      path: "offers",
      populate: { path: "taker", select: "email" },
    });

    if (!lease) {
      return res.status(404).json({ message: "Lease not found" });
    }

    res.json({ offers: lease.offers });
  } catch (err) {
    console.error("🔥 Error fetching offers:", err);
    res.status(500).json({ message: err.message });
  }
};
