import express from "express";
import mongoose from "mongoose";
import AppliedCollege from "../models/AppliedCollege.js";

const router = express.Router();

/* ================= GET APPROVED ================= */
router.get("/approved", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const objectId = new mongoose.Types.ObjectId(userId);

    const data = await AppliedCollege.find({
      userId: objectId,
      status: "Approved",
    });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

/* ================= APPLY COLLEGE ================= */
router.post("/", async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body);

    const { userId, ...rest } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const data = await AppliedCollege.create({
      ...rest,
      userId: new mongoose.Types.ObjectId(userId),
    });

    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});


export default router;
