import express from "express";
import CafApplication from "../models/CafApplication.js";

const router = express.Router();

// TEST ROUTE
router.get("/test", (req, res) => {
  res.json({ message: "CAF API working" });
});

// GET ALL CAF
router.get("/", async (req, res) => {
  try {
    const apps = await CafApplication.find().sort({ createdAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE CAF
router.post("/", async (req, res) => {
  try {
    const { course, colleges, date, status } = req.body;

    const newApp = await CafApplication.create({
      applicationId: `CAF-${Math.floor(10000 + Math.random() * 90000)}`,
      course,
      colleges: colleges || [],
      date,
      status: status || "Submitted",
    });

    res.status(201).json(newApp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
