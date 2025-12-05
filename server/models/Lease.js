// import mongoose from "mongoose";

// const leaseSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   location: { type: String, required: true },
//   amount: { type: Number, required: true },
//   duration: { type: Number, required: true },
//   description: { type: String },
//   giver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

//   photos: [{ type: String }],  // store URLs of uploaded photos

//   createdAt: { type: Date, default: Date.now }
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
  title: { type: String, required: true },
  location: { type: String, required: true },
  amount: { type: Number, required: true },
  duration: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: { type: String },
  giver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  photos: [String],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Lease", leaseSchema);
