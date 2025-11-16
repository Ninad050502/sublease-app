// // // server/models/Lease.js
// // import mongoose from "mongoose";

// // const leaseSchema = new mongoose.Schema({
// //   title: { type: String, required: true },
// //   location: { type: String, required: true },
// //   amount: { type: Number, required: true },
// //   duration: { type: Number, required: true },
// //   description: { type: String },
// //   giver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
// //   takenBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
// //   isAvailable: { type: Boolean, default: true },
// //   isComplete: { type: Boolean, default: false },     // ← added
// //   offers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Offer" }], // ← added
// // });

// // export default mongoose.model("Lease", leaseSchema);
// import mongoose from "mongoose";

// const leaseSchema = new mongoose.Schema({
//   title: String,
//   location: String,
//   amount: Number,
//   duration: Number,
//   description: String,
//   giver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   taker: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // assigned taker
//   isAvailable: { type: Boolean, default: true },

//   // ✅ New: list of offers
//   offers: [
//     {
//       taker: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//       message: String,
//       status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
//       createdAt: { type: Date, default: Date.now },
//     },
//   ],
// });

// export default mongoose.model("Lease", leaseSchema);
import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  taker: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const leaseSchema = new mongoose.Schema({
  title: String,
  location: String,
  amount: Number,
  duration: Number,
  description: String,
  giver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  taker: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  isAvailable: { type: Boolean, default: true },
  offers: [offerSchema],
});

export default mongoose.model("Lease", leaseSchema);
