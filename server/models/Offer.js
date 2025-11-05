// server/models/Offer.js
import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  lease: { type: mongoose.Schema.Types.ObjectId, ref: "Lease", required: true },
  taker: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  message: { type: String },
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
});

export default mongoose.model("Offer", offerSchema);
