// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { connectDB } from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// });


// connectDB();

// app.use("/api/auth", authRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import giverRoutes from "./routes/giverRoutes.js";
import takerRoutes from "./routes/takerRoutes.js";
import leaseRoutes from "./routes/leaseRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/giver", giverRoutes);
app.use("/api/lease-taker", takerRoutes);
app.use("/api/leases", leaseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
