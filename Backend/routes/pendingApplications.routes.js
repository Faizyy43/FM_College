import express from "express";
import PendingApplication from "../models/PendingApplication.js";
import mongoose from "mongoose";
// import Profile from "../models/profile.js";


const router = express.Router();

// GET all pending applications
router.get("/", async (req, res) => {
  try {
    const apps = await PendingApplication.find({ status: "Pending" }).sort({
      createdAt: -1,
    });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all
router.get("/approved", async (req, res) => {
  try {
    const apps = await PendingApplication.find({ status: "Approved" }).sort({
      createdAt: -1,
    });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create new pending application
router.post("/", async (req, res) => {
  try {
    const { college, course, appliedOn, reason } = req.body;

    if (!college || !course) {
      return res.status(400).json({ message: "college and course are required" });
    }

    const newApp = await PendingApplication.create({
      college,
      course,
      appliedOn: appliedOn || new Date(),
      reason,
      status: "Pending",
    });

    res.status(201).json(newApp);
  } catch (err) {
    console.log("CREATE PENDING ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});


// PATCH status
router.patch("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // ✅ add this validation here
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid application id" });
    }

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updated = await PendingApplication.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(updated);
  } catch (err) {
    console.log("STATUS UPDATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});
export default router;