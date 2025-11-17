// // server/models/Lease.js
// import mongoose from "mongoose";

// const leaseSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   location: { type: String, required: true },
//   amount: { type: Number, required: true },
//   duration: { type: Number, required: true },
//   description: { type: String },
//   giver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   takenBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
//   isAvailable: { type: Boolean, default: true },
//   isComplete: { type: Boolean, default: false },     // ← added
//   offers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Offer" }], // ← added
// });

// export default mongoose.model("Lease", leaseSchema);
import mongoose from "mongoose";

const leaseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  amount: { type: Number, required: true }, // monthly rent
  duration: { type: Number, required: true }, // in months
  description: { type: String },
  giver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Lease", leaseSchema);
