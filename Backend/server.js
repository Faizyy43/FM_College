import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import profileRoutes from "./routes/profile.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import appliedRoutes from "./routes/applied.routes.js";
import accountRoutes from "./routes/account.routes.js";
import profileViewsRoutes from "./routes/profileViews.routes.js";

import { startDeleteCron } from "./cron/deleteDeactivatedUsers.js";

/* =======================
   ENV + DATABASE
======================= */
dotenv.config();
connectDB();

const app = express();

/* =======================
   CORS CONFIG
======================= */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://fm-college-cvv5.onrender.com",
    ],
    credentials: true,
  })
);

/* Handle preflight requests safely */
app.options(/.*/, cors());

/* =======================
   MIDDLEWARE
======================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

/* =======================
   ROUTES
======================= */
app.use("/api/profile", profileRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/applied-colleges", appliedRoutes);
app.use("/api", accountRoutes);
app.use("/api/profile-views", profileViewsRoutes);

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
   CRON JOB
======================= */
startDeleteCron();

/* =======================
   START SERVER
======================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
