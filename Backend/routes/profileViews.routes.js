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

    const views = await ProfileView.find({ userId }).sort({ viewedAt: -1 });

    const totalViews = views.length;
    const lastViewed = views[0]?.viewedAt || null;

    res.json({
      totalViews,
      lastViewed,
      viewers: views.map((v) => ({
        id: v._id,
        name: v.viewerName,
        source: v.source,
        date: v.viewedAt,
      })),
    });
  } catch (err) {
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
      userId,
      viewerName,
      source,
      viewedAt: new Date(),
    });

    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
