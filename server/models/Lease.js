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

const leaseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  amount: { type: Number, required: true },
  duration: { type: Number, required: true },
  description: { type: String },
  giver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  photos: [String],   // ✔ added
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Lease", leaseSchema);
