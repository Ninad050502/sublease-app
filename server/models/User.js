import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  message: String,
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: { type: String, enum: ["giver", "taker"] },
  
  // Giver listings
  phone: String,
  listings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lease" }],

  // Notifications for givers
  notifications: [notificationSchema],
});

export default mongoose.model("User", userSchema);
