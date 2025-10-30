const mongoose = require("mongoose");

const leaseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  amount: { type: Number, required: true },
  duration: { type: Number, required: true },
  description: { type: String },
  giver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  takenBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  isAvailable: { type: Boolean, default: true },
});

module.exports = mongoose.model("Lease", leaseSchema);
