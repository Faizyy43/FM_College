import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import profileRoutes from "./routes/profile.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import cafRoutes from "./routes/caf.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import pendingRoutes from "./routes/pendingApplications.routes.js";
import appliedRoutes from "./routes/applied.routes.js";
import accountSettingsRoutes from "./routes/accountSettings.routes.js";
import profileViewsRoutes from "./routes/profileViews.routes.js";
import accountRoutes from "./routes/account.routes.js";

import { startDeleteCron } from "./cron/deleteDeactivatedUsers.js";

dotenv.config({ path: "./.env" });

connectDB();

const app = express();

/* =======================
   ✅ CORS (CORRECT & SAFE)
======================= */
app.use(
  cors({
    origin: true, // 👈 ALLOW ALL ORIGINS TEMPORARILY
    credentials: true,
  })
);

app.options("/*", cors());


/* =======================
   Middleware
======================= */
app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* =======================
   Routes
======================= */
app.use("/api/profile", profileRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/caf-applications", cafRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/pending-applications", pendingRoutes);
app.use("/api/applied-colleges", appliedRoutes);
app.use("/api/account-settings", accountSettingsRoutes);
app.use("/api/profile-views", profileViewsRoutes);
app.use("/api", accountRoutes);

/* =======================
   Cron
======================= */
startDeleteCron();

/* =======================
   Server
======================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
