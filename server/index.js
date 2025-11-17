// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// // import morgan from "morgan"; // optional, for better request logs
// import { connectDB } from "./config/db.js";

// // Route imports
// import authRoutes from "./routes/authRoutes.js";
// import giverRoutes from "./routes/giverRoutes.js";
// import takerRoutes from "./routes/takerRoutes.js";
// import leaseRoutes from "./routes/leaseRoutes.js";

// dotenv.config();

// // Initialize app
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Use morgan or custom logger for clarity
// // app.use(morgan("dev")); // logs: GET /api/giver/status 200 45ms
// // If you prefer your own:
// app.use((req, res, next) => {
//   console.log(`📡 ${req.method} ${req.url}`);
//   next();
// });

// // Connect to MongoDB
// connectDB();

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/giver", giverRoutes);
// app.use("/api/lease-taker", takerRoutes);
// app.use("/api/leases", leaseRoutes);

// // Health check endpoint
// app.get("/", (req, res) => {
//   res.send("✅ Sublease backend API is running...");
// });

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error("🔥 Global error caught:", err.stack);
//   res.status(err.status || 500).json({
//     success: false,
//     message: err.message || "Internal Server Error",
//   });
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log("===============================================");
//   console.log(`🚀 Sublease Server running on port ${PORT}`);
//   console.log("✅ API Base URL:", `http://localhost:${PORT}`);
//   console.log("===============================================");
// });
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import giverRoutes from "./routes/giverRoutes.js";
import leaseRoutes from "./routes/leaseRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Simple logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/giver", giverRoutes);
app.use("/api/leases", leaseRoutes);
app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
