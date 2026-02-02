import express from "express";
import mongoose from "mongoose";
import ProfileView from "../models/ProfileView.js";

const router = express.Router();

/* ✅ GET profile views by userId */
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const objectId = new mongoose.Types.ObjectId(userId);

    const views = await ProfileView.find({ userId: objectId })
      .sort({ viewedAt: -1 })
      .lean();

    const totalViews = views.length;
    const lastViewed = views.length > 0 ? views[0].viewedAt : null;

    res.json({
      totalViews,
      lastViewed,
      viewers: views.map((v) => ({
        id: v._id,
        name: v.viewerName || "Unknown",
        source: v.source || "Unknown",
        date: v.viewedAt,
      })),
    });
  } catch (err) {
    console.error("Profile views fetch error:", err);
    res.status(500).json({ message: err.message });
  }
});

/* ✅ POST add dummy view (testing from Postman) */
router.post("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { viewerName, source } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const created = await ProfileView.create({
      userId: new mongoose.Types.ObjectId(userId),
      viewerName: viewerName || "Guest",
      source: source || "Unknown",
      viewedAt: new Date(),
    });

    res.status(201).json(created);
  } catch (err) {
    console.error("Profile view create error:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
