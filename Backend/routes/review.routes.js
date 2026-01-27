import express from "express";
import Review from "../models/Review.js";

const router = express.Router();

/* ✅ GET MY REVIEWS (no login -> return all) */
router.get("/my", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ✅ GET ALL REVIEWS */
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ✅ POST REVIEW */
router.post("/", async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
