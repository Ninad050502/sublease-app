import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["giver", "taker"], required: true },
  currentLease: { type: mongoose.Schema.Types.ObjectId, ref: "Lease", default: null },
});

export default mongoose.model("User", userSchema);
// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ["giver", "taker"], required: true },
//   currentLease: { type: mongoose.Schema.Types.ObjectId, ref: "Lease", default: null },
// });

// module.exports = mongoose.model("User", userSchema);
