import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import profileRoutes from "./routes/profile.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import appliedRoutes from "./routes/applied.routes.js";
import accountRoutes from "./routes/account.routes.js";

import { startDeleteCron } from "./cron/deleteDeactivatedUsers.js";

/* =======================
   ENV + DATABASE
======================= */
dotenv.config({ path: "./.env" });
connectDB();

const app = express();

/* =======================
   CORS CONFIG
======================= */
const allowedOrigins = [
  "http://localhost:5173",
  "https://fm-college.onrender.com", // frontend URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow Postman or server calls
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ Blocked by CORS:", origin);
      return callback(null, false);
    },
    credentials: true,
  }),
);

// Handle preflight requests
app.options("*", cors());

/* =======================
   MIDDLEWARE
======================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads folder
app.use("/uploads", express.static("uploads"));

/* =======================
   ROUTES
======================= */
app.use("/api/profile", profileRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/applied-colleges", appliedRoutes);
app.use("/api", accountRoutes);

/* =======================
   HEALTH CHECK
======================= */
app.get("/", (req, res) => {
  res.send("Backend running successfully");
});

/* =======================
   404 HANDLER
======================= */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/* =======================
   CRON JOBS
======================= */
startDeleteCron();

/* =======================
   START SERVER
======================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
