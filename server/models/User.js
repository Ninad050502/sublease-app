import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  message: String,
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  username: { 
    type: String, 
    unique: true, 
    required: true,
    lowercase: true,
    trim: true,
    match: [/^[a-z0-9_-]+$/, "Username can only contain lowercase letters, numbers, hyphens, and underscores"],
    minlength: [3, "Username must be at least 3 characters"],
    maxlength: [30, "Username cannot exceed 30 characters"]
  },
  role: { type: String, enum: ["giver", "taker"] },
  
  // Giver listings
  phone: String,
  listings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lease" }],

  // Notifications for givers
  notifications: [notificationSchema],
});

export default mongoose.model("User", userSchema);
